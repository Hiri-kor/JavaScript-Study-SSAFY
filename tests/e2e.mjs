// CDP 기반 E2E 검사 (Node 22+ 내장 WebSocket 사용, npm 설치 불필요)
// 실행: BASE="file:///절대/경로/저장소" node tests/e2e.mjs
//   - CHROME: 크롬 실행 파일 경로 (기본: Windows 기본 설치 경로)
//   - SCRATCH: 임시 프로필·스크린샷(shots/) 저장 폴더 (기본: OS 임시 폴더)
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:8765';
const PORT = 9333;
const SCRATCH = process.env.SCRATCH || tmpdir();
mkdirSync(path.join(SCRATCH, 'shots'), { recursive: true });
const profile = mkdtempSync(path.join(SCRATCH, 'prof-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--allow-file-access-from-files', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

let ws, id = 0;
const pending = new Map();
const consoleMsgs = [];
async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = list.find(t => t.type === 'page');
      if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); break; }
    } catch (e) { /* retry */ }
    await sleep(200);
  }
  await new Promise(r => ws.addEventListener('open', r));
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') consoleMsgs.push('EXC ' + JSON.stringify(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') consoleMsgs.push('ERR ' + m.params.args.map(a => a.value || a.description).join(' '));
  });
}
function send(method, params = {}) {
  return new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
}
async function evalJs(expr) {
  const r = await send('Runtime.evaluate', { expression: `(async()=>{${expr}})()`, awaitPromise: true, returnByValue: true });
  if (r.result.exceptionDetails) throw new Error('eval failed: ' + JSON.stringify(r.result.exceptionDetails.exception?.description));
  return r.result.result.value;
}
async function go(url, wait = 2500) {
  consoleMsgs.length = 0;
  await send('Page.navigate', { url: BASE + url });
  await sleep(wait);
}
const results = [];
function check(name, ok, info) { results.push({ name, ok: !!ok, info }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (info ? '  → ' + info : '')); }

(async () => {
  await connect();
  await send('Runtime.enable'); await send('Page.enable');
  // 확인 대화상자는 자동 수락
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true }); });

  /* 1. 모든 페이지 로드 + 콘솔 에러 */
  const pages = ['/index.html', '/summary.html', '/exam.html', '/ai.html', '/playground.html',
    ...['01-history', '02-variables', '03-types-operators', '04-control', '05-functions', '06-objects', '07-arrays', '08-dom', '09-events'].map(t => `/topics/${t}.html`)];
  for (const p of pages) {
    await go(p, 2000);
    const info = await evalJs(`return { err: !!document.querySelector('.error-box'), cards: document.querySelectorAll('.q-card').length, code: document.querySelectorAll('.code-block').length, h2: document.querySelectorAll('.md h2').length }`);
    check('load ' + p, !info.err && consoleMsgs.length === 0, JSON.stringify(info) + (consoleMsgs.length ? ' ' + consoleMsgs.join(' | ') : ''));
  }

  /* 2. 주제 페이지: 객관식 오답 → 피드백 + 오답 노트 */
  await go('/topics/02-variables.html');
  const r2 = await evalJs(`
    const card = document.querySelector('.q-card');
    const before = card.querySelector('.q-feedback').hidden;
    const radios = card.querySelectorAll('input[type=radio]');
    radios[0].click();
    card.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 300));
    const fb = card.querySelector('.q-feedback');
    return { hiddenBefore: before, shown: !fb.hidden, wrong: card.classList.contains('is-wrong'), text: fb.textContent.slice(0, 60), store: localStorage.getItem('jsstudy:wrong') }`);
  check('topic mc: 채점 전 정답 숨김', r2.hiddenBefore === true);
  check('topic mc: 오답 채점 + 해설 표시', r2.shown && r2.wrong, r2.text);
  check('topic mc: 오답 노트 기록', r2.store && r2.store.includes('L1111-02'), r2.store);

  /* 3. 주제 페이지: 정답 맞히면 오답 노트에서 빠지는지 (같은 문제를 exam에서 다시) */
  await go('/exam.html?mode=wrong');
  const r3 = await evalJs(`
    document.querySelector('#exam-form button[type=submit]').click();
    await new Promise(r => setTimeout(r, 300));
    const card = document.querySelector('#exam-area .q-card');
    const id = card.dataset.qid;
    const ans = App.allQuestions().find(q => q.id === id).answer;
    card.querySelectorAll('input[type=radio]')[ans].click();
    card.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 300));
    return { n: document.querySelectorAll('#exam-area .q-card').length, ok: card.classList.contains('is-correct'), wrong: localStorage.getItem('jsstudy:wrong') }`);
  check('exam 오답만 풀기 → 1문항', r3.n === 1, JSON.stringify(r3));
  check('exam 정답 → 오답 노트에서 제거', r3.ok && r3.wrong === '[]', r3.wrong);

  /* 4. 모의고사 모드: 채점 전엔 정답 없음, 일괄 채점 */
  await go('/exam.html');
  const r4 = await evalJs(`
    document.querySelector('input[name=mode][value=exam]').click();
    document.querySelectorAll('input[name=type]').forEach(i => { i.checked = i.value === 'mc'; });
    document.querySelector('select[name=count]').value = '10';
    document.querySelector('#exam-form button[type=submit]').click();
    await new Promise(r => setTimeout(r, 300));
    const cards = [...document.querySelectorAll('#exam-area .q-card')];
    cards.slice(0, 5).forEach(c => { const id = c.dataset.qid; const q = App.allQuestions().find(x => x.id === id); c.querySelectorAll('input[type=radio]')[q.answer].click(); });
    const anyShown = cards.some(c => !c.querySelector('.q-feedback').hidden) || document.querySelectorAll('.is-answer').length;
    const btns = cards[0].querySelectorAll('.q-actions button').length;
    document.getElementById('grade-all').click();
    await new Promise(r => setTimeout(r, 800));
    return { n: cards.length, anyShown, btns, score: document.querySelector('.score-big')?.textContent, shownAfter: cards.every(c => !c.querySelector('.q-feedback').hidden) }`);
  check('모의고사: 10문항, 채점 전 정답·채점 버튼 없음', r4.n === 10 && !r4.anyShown && r4.btns === 0, JSON.stringify(r4));
  check('모의고사: 일괄 채점 5/10', r4.score === '5 / 10' && r4.shownAfter, r4.score);

  /* 5. AI 페이지: 4개 유형 가져오기 + 채점 */
  await go('/ai.html');
  const sample = [
    { topic: '07-arrays', type: 'mc', question: '끝에 추가?', options: ['pop()', 'push()'], answer: 1, explanation: 'push' },
    { topic: '07-arrays', type: 'short', question: '출력?', code: 'console.log([1,2,3].map(n => n * 2))', answers: ['[2, 4, 6]'] },
    { topic: '09-events', type: 'essay', question: '버블링?', modelAnswer: '부모로 전파', keywords: ['부모', '전파'] },
    { topic: '07-arrays', type: 'code', question: '짝수만', starter: 'const numbers = [1, 2, 3, 4, 5]\nconst evens = ', tests: [{ name: 'evens', expr: "JSON.stringify(evens) === '[2,4]'" }], solution: 'const numbers = [1, 2, 3, 4, 5]\nconst evens = numbers.filter(n => n % 2 === 0)' },
    { topic: 'nope', type: 'mc', question: 'x', options: ['a'], answer: 3 }
  ];
  const r5 = await evalJs(`
    document.getElementById('import-box').value = ${JSON.stringify('```json\n' + JSON.stringify(sample) + '\n```')};
    document.getElementById('do-import').click();
    await new Promise(r => setTimeout(r, 300));
    const msgs = document.getElementById('import-msg').textContent;
    const f = document.getElementById('ai-filter-topic'); f.value = ''; f.dispatchEvent(new Event('change'));
    await new Promise(r => setTimeout(r, 300));
    const cards = [...document.querySelectorAll('#ai-list .q-card')].filter(c => !c.dataset.qid.startsWith('ai-11'));
    // short (공백·세미콜론 무시)
    const sc = cards.find(c => c.querySelector('.badge-short'));
    sc.querySelector('.q-input').value = '[2,4,6];';
    sc.querySelector('.btn-primary').click();
    // essay
    const ec = cards.find(c => c.querySelector('.badge-essay'));
    ec.querySelector('textarea').value = '이벤트가 부모 요소로 전파되는 현상';
    ec.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 200));
    const kwHit = ec.querySelectorAll('.kw.hit').length;
    ec.querySelector('.self-grade button').click();
    // code: 틀린 코드 → 실패, 이후 정답 코드 카드 새로 확인
    const cc = cards.find(c => c.querySelector('.badge-code'));
    const ta = cc.querySelector('textarea');
    ta.value = 'const numbers = [1, 2, 3, 4, 5]\\nconst evens = numbers.filter(n => n % 2 === 0)\\nconsole.log(evens)';
    cc.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 2500));
    return { msgs, n: cards.length, short: sc.classList.contains('is-correct'), kwHit, essay: ec.classList.contains('is-correct'),
      code: cc.classList.contains('is-correct'), codeLog: cc.querySelector('.q-console').textContent, solShown: !!cc.querySelector('.q-feedback pre') }`);
  check('AI import: 4개 성공 + 잘못된 문제 거부', r5.n === 4 && /4문제/.test(r5.msgs) && /topic/.test(r5.msgs), r5.msgs.slice(0, 120));
  check('AI short: 공백·세미콜론 무시 채점', r5.short);
  check('AI essay: 키워드 체크 + 자기 채점', r5.kwHit === 2 && r5.essay, 'kw ' + r5.kwHit);
  check('AI code: 테스트 통과 + 콘솔 출력 + 모범 코드 공개', r5.code && /2, 4/.test(r5.codeLog) && r5.solShown, r5.codeLog);

  /* 6. 코드 문제: 오답 코드는 실패 처리 */
  await go('/ai.html');
  const r6 = await evalJs(`
    const f = document.getElementById('ai-filter-topic'); f.value = '07-arrays'; f.dispatchEvent(new Event('change'));
    await new Promise(r => setTimeout(r, 300));
    const cc = [...document.querySelectorAll('#ai-list .q-card')].find(c => c.querySelector('.badge-code'));
    cc.querySelector('textarea').value = 'const evens = [1, 3]\\nnotDefinedFn()';
    cc.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 2500));
    return { wrong: cc.classList.contains('is-wrong'), log: cc.querySelector('.q-console').textContent, tests: cc.querySelector('.test-list')?.textContent }`);
  check('AI code: 오답 코드 → 실패 + 에러 메시지', r6.wrong && /notDefinedFn/.test(r6.log), r6.log + ' / ' + r6.tests);

  /* 7. 연습장: 예제 링크로 열고 실행, DOM 예제 실행 */
  const ex = Buffer.from(JSON.stringify({ html: '<p class="content">a</p><p class="content">b</p>', js: "const p = document.querySelectorAll('.content')\nconsole.log(p)\nconsole.log(p[0])\nconsole.log({ a: 1, b: [1, 2] })\nnotHere()" })).toString('base64url');
  await go('/playground.html#p=' + ex, 3500);
  const r7 = await evalJs(`return document.getElementById('pg-console').textContent`);
  check('playground: NodeList / Element / 객체 / 에러 줄번호 출력', /NodeList\(2\)/.test(r7) && /<p class="content">a<\/p>/.test(r7) && /\{a: 1, b: \[1, 2\]\}/.test(r7) && /5번째 줄/.test(r7), r7);
  const r7b = await evalJs(`
    const sel = document.getElementById('pg-examples');
    const i = [...sel.options].findIndex(o => o.text.includes('로또'));
    sel.value = sel.options[i].value; sel.dispatchEvent(new Event('change'));
    await new Promise(r => setTimeout(r, 2500));
    document.querySelector('#pg-preview').contentWindow.postMessage('noop', '*');
    const frameOk = document.getElementById('pg-console').textContent;
    await new Promise(r => setTimeout(r, 3500));
    return { lodash: document.getElementById('pg-lodash').checked, n: sel.options.length, log: document.getElementById('pg-console').textContent }`);
  check('playground: 교안 예제 목록 + lodash 예제 자동 체크', r7b.n > 15 && r7b.lodash && !/❌/.test(r7b.log), JSON.stringify(r7b));

  const r7c = await evalJs(`
    const res = await Runner.runHidden({ js: 'const s = _.sampleSize(_.range(1, 46), 6)\\nconsole.log(s.length)', libs: ['https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'], tests: [{ name: 'lodash', expr: "typeof _.sampleSize === 'function'" }] });
    return { logs: res.logs.map(l => l.text).join('|'), tests: res.tests }`);
  check('runner: 샌드박스에서 lodash 로드', r7c.tests[0]?.ok && r7c.logs === '6', JSON.stringify(r7c));

  /* 8. 따라치기 */
  await go('/topics/03-types-operators.html');
  const r8 = await evalJs(`
    const btn = [...document.querySelectorAll('.code-actions button')].find(b => b.textContent.includes('따라치기'));
    btn.click();
    const modal = document.querySelector('.modal');
    const ta = modal.querySelector('.typing-input');
    const target = modal.querySelector('.typing-target').textContent.replace(/↵/g, '');
    ta.value = target.slice(0, 5) + 'X';
    ta.dispatchEvent(new Event('input'));
    const bad = modal.querySelectorAll('.typing-target span.bad').length;
    ta.value = target;
    ta.dispatchEvent(new Event('input'));
    const done = !modal.querySelector('.typing-done').hidden;
    return { open: !modal.hidden, bad, done, stats: modal.querySelector('.typing-stats').textContent }`);
  check('따라치기: 오타 표시 + 완성 감지', r8.open && r8.bad === 1 && r8.done, r8.stats);

  /* 9. 링크(앵커) 확인: 주제 간 링크 대상 id 존재 */
  for (const [page, anchor] of [['04-control', '03-types-operators.html#자동-형변환'], ['07-arrays', '05-functions.html#콜백-함수-함수의-확장'], ['09-events', '06-objects.html#해결책'], ['07-arrays', '03-types-operators.html#논리-연산자'], ['07-arrays', '03-types-operators.html#참조-자료형-예시']]) {
    const [file, hash] = anchor.split('#');
    await go('/topics/' + file, 2000);
    const ok = await evalJs(`return !!document.getElementById(${JSON.stringify(hash)})`);
    check(`anchor ${page} → ${anchor}`, ok);
  }

  /* 9b. 파일로 넣은 AI 문제 200개 */
  await go('/ai.html');
  const a1 = await evalJs(`
    localStorage.removeItem('jsstudy:aiImported');
    return { file: window.AI_QUESTIONS.length, def: document.getElementById('ai-filter-topic').value, shown: document.querySelectorAll('#ai-list .q-card').length }`);
  check('AI 파일 400문항 + 기본은 첫 주제만 표시', a1.file === 400 && a1.def === '01-history' && a1.shown === 14, JSON.stringify(a1));

  await go('/topics/09-events.html');
  const a2 = await evalJs(`
    const before = document.querySelectorAll('#topic-ai-list .q-card').length;
    document.getElementById('topic-ai-open').click();
    await new Promise(r => setTimeout(r, 500));
    const cards = [...document.querySelectorAll('#topic-ai-list .q-card')];
    const c44 = cards.find(c => c.dataset.qid === 'ai-1117-44');
    const optCodes = c44.querySelectorAll('.q-opt pre.q-code').length;
    const hidden = c44.querySelector('.q-feedback').hidden;
    c44.querySelectorAll('input[type=radio]')[0].click();
    c44.querySelector('.btn-primary').click();
    await new Promise(r => setTimeout(r, 200));
    return { before, n: cards.length, official: document.querySelectorAll('#topic-quiz-list .q-card').length, optCodes, hidden, ok: c44.classList.contains('is-correct'), fb: c44.querySelector('.q-feedback').textContent.slice(0, 80) }`);
  check('주제 페이지: AI 문제는 펼치기 전엔 없음 → 100개', a2.before === 0 && a2.n === 100 && a2.official === 10, JSON.stringify(a2));
  check('코드 보기 4개 렌더 + 채점 전 숨김 + 정답', a2.optCodes === 4 && a2.hidden && a2.ok, a2.fb);

  await go('/exam.html');
  const a3 = await evalJs(`return document.getElementById('pool-count').textContent`);
  check('시험 페이지 문제 수 444', /444/.test(a3), a3);

  /* 10. 모바일(390px) 가로 넘침 */
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  for (const p of pages) {
    await go(p, 2000);
    const r = await evalJs(`
      const w = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.right > w + 1 && !e.closest('pre, .table-wrap, .typing-target, .modal'); }).slice(0, 3).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right));
      return { sw: document.documentElement.scrollWidth, w, over }`);
    check('mobile no h-scroll ' + p, r.sw <= r.w, JSON.stringify(r));
  }
  const fs = await import('node:fs');
  const snap = async name => {
    const s = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(SCRATCH, 'shots', name + '.png'), Buffer.from(s.result.data, 'base64'));
  };
  const overflow = `const w = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.width && b.right > w + 1 && !e.closest('pre, .table-wrap, .typing-target, .symbol-bar, .runner-hidden'); }).slice(0, 4).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right));
      return { sw: document.documentElement.scrollWidth, w, over }`;

  /* 11. 320px 터치 기기: 모든 페이지 + 펼친 상태 */
  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }] });
  for (const p of pages) {
    await go(p, 2000);
    const r = await evalJs(overflow);
    check('320 no h-scroll ' + p, r.sw <= r.w && !r.over.length, JSON.stringify(r));
  }
  await go('/topics/09-events.html', 2000);
  await evalJs(`document.getElementById('topic-ai-open').click(); await new Promise(r => setTimeout(r, 600)); document.querySelector('[data-qid="ai-1117-44"]').scrollIntoView()`);
  const m1 = await evalJs(overflow);
  check('320 AI 문제 펼친 상태(코드 보기 포함) 넘침 없음', m1.sw <= m1.w && !m1.over.length, JSON.stringify(m1));
  await snap('m320_code_options');

  await go('/exam.html', 2000);
  await evalJs(`document.querySelector('input[name=mode][value=exam]').click(); document.querySelector('#exam-form button[type=submit]').click(); await new Promise(r => setTimeout(r, 800)); window.scrollBy(0, 300)`);
  const m2 = await evalJs(overflow);
  check('320 시험(모의고사) 진행 화면 넘침 없음', m2.sw <= m2.w && !m2.over.length, JSON.stringify(m2));
  await snap('m320_exam');

  await go('/playground.html', 2500);
  const m3 = await evalJs(`
    const ed = document.getElementById('pg-editor');
    const bar = document.querySelector('.pg-pane .symbol-bar');
    ed.value = ''; ed.focus();
    const btn = t => [...bar.querySelectorAll('button')].find(b => b.textContent === t);
    btn('{').click(); btn('⇥').click(); btn('=>').click();
    return { visible: getComputedStyle(bar).display, value: JSON.stringify(ed.value), focused: document.activeElement === ed, fs: getComputedStyle(ed).fontSize, kbd: getComputedStyle(document.querySelector('.btn kbd')).display }`);
  check('터치: 기호 입력 줄 표시 + 입력', m3.visible === 'flex' && m3.value === JSON.stringify('{   => ') && m3.focused, JSON.stringify(m3));
  check('입력칸 16px (iOS 확대 방지) + 단축키 표시 숨김', m3.fs === '16px' && m3.kbd === 'none', m3.fs + ' / ' + m3.kbd);
  const m3b = await evalJs(overflow);
  check('320 연습장 넘침 없음', m3b.sw <= m3b.w && !m3b.over.length, JSON.stringify(m3b));
  await snap('m320_playground');

  await go('/topics/05-functions.html', 2000);
  const m4 = await evalJs(`
    const t = document.querySelector('.nav-toggle');
    t.click();
    const opened = document.getElementById('site-header').classList.contains('open');
    const links = getComputedStyle(document.querySelector('.nav-links')).display;
    document.querySelector('main').click();
    const closed = !document.getElementById('site-header').classList.contains('open');
    [...document.querySelectorAll('.code-actions button')].find(b => b.textContent.includes('따라치기')).click();
    await new Promise(r => setTimeout(r, 200));
    const modal = document.querySelector('.modal');
    const box = modal.querySelector('.modal-box').getBoundingClientRect();
    const bar = modal.querySelector('.symbol-bar');
    return { opened, links, closed, boxW: Math.round(box.width), boxH: Math.round(box.height), bar: getComputedStyle(bar).display }`);
  check('모바일 메뉴 열기 → 바깥 누르면 닫힘', m4.opened && m4.links === 'flex' && m4.closed, JSON.stringify(m4));
  check('따라치기 창 전체 화면 + 기호 줄', m4.boxW === 320 && m4.boxH === 640 && m4.bar === 'flex', JSON.stringify(m4));
  await snap('m320_typing');

  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await go('/index.html', 2000); await snap('m375_home');
  await go('/topics/03-types-operators.html', 2000);
  await evalJs(`document.getElementById('단축-평가-규칙') ; window.scrollTo(0, document.querySelector('.md table').getBoundingClientRect().top + scrollY - 80)`);
  await snap('m375_topic_table');

  /* 12. AI 가져오기 후 주제 필터 문항 수 갱신 */
  await send('Emulation.clearDeviceMetricsOverride');
  await go('/ai.html', 2000);
  const m5 = await evalJs(`
    const before = document.querySelector('#ai-filter-topic option[value="07-arrays"]').textContent;
    document.getElementById('import-box').value = JSON.stringify([{ topic: '07-arrays', type: 'mc', question: 'x', options: ['a', 'b'], answer: 0 }]);
    document.getElementById('do-import').click();
    await new Promise(r => setTimeout(r, 300));
    const after = document.querySelector('#ai-filter-topic option[value="07-arrays"]').textContent;
    const keep = document.getElementById('ai-filter-topic').value;
    localStorage.removeItem('jsstudy:aiImported');
    return { before, after, keep }`);
  const cnt = t => Number((t.match(/\((\d+)\)/) || [])[1]);
  check('AI 가져오기 후 주제 필터 문항 수 갱신 + 선택 유지', cnt(m5.after) === cnt(m5.before) + 1 && m5.keep === '01-history', JSON.stringify(m5));

  /* 13. 새 유형: 빈칸 여러 개 / 자가 채점 주관식 / 채점 기준표 서술형 */
  await go('/exam.html', 2000);
  const n1 = await evalJs(`
    const box = document.getElementById('exam-area');
    const ids = ['ai-1117-b13', 'ai-1112-b02', 'ai-1111-b01', 'ai-1112-s06', 'ai-1116-s10', 'ai-1111-s20', 'ai-1116-e03', 'ai-1116-s01'];
    const qs = ids.map(id => App.allQuestions().find(q => q.id === id));
    const ctrl = Quiz.renderSet(box, qs, { mode: 'practice' });
    const card = id => ctrl.cards.find(c => c.q.id === id);
    const fill = (id, vals) => { const c = card(id); const ins = c.el.querySelectorAll('.q-blank input, input.q-input'); vals.forEach((v, i) => { ins[i].value = v; ins[i].dispatchEvent(new Event('input')); }); return c; };
    const hiddenBefore = ctrl.cards.every(c => c.el.querySelector('.q-feedback').hidden);
    const inputsB13 = card('ai-1117-b13').el.querySelectorAll('.q-blank input').length;
    const res = {};
    for (const [id, vals] of [['ai-1117-b13', ['value', 'createElement()', '.appendChild', "''"]], ['ai-1112-b02', ['\`', '\${age}', '\`']], ['ai-1111-b01', ['let', 'let']], ['ai-1112-s06', ['6 5 4 4']], ['ai-1116-s10', ['4', 'Dan']], ['ai-1116-s01', ['in', 'hasOwnProperty']]]) {
      const c = fill(id, vals); await c.submit(); res[id] = c.state.correct;
    }
    const b01 = card('ai-1111-b01').el;
    const perBlank = [...b01.querySelectorAll('.q-blank')].map(r => r.className);
    const s20 = card('ai-1111-s20');
    const ta = s20.el.querySelector('textarea');
    const template = ta.value;
    ta.value += ' undefined / ReferenceError'; ta.dispatchEvent(new Event('input'));
    await s20.submit();
    const s20model = !!s20.el.querySelector('.q-feedback .model') && s20.state.correct === null;
    [...s20.el.querySelectorAll('.self-grade button')].find(b => b.textContent.includes('맞았다')).click();
    const e03 = card('ai-1116-e03');
    const eta = e03.el.querySelector('textarea');
    eta.value = 'JSON은 문자열이다. JSON.stringify()와 JSON.parse()로 변환한다.'; eta.dispatchEvent(new Event('input'));
    await e03.submit();
    const items = [...e03.el.querySelectorAll('.rubric-list input')];
    const hints = e03.el.querySelectorAll('.rubric-list .kw.hit').length;
    items[0].click(); items[1].click();
    const score = e03.el.querySelector('.rubric-score').textContent;
    [...e03.el.querySelectorAll('.rubric button')].find(b => b.textContent.includes('이 점수로')).click();
    return { hiddenBefore, inputsB13, res, perBlank, template, s20model, s20ok: s20.state.correct, rubric: items.length, hints, score, e03ok: e03.state.correct,
      review: card('ai-1116-s01').el.querySelector('.review-note')?.textContent.slice(0, 20),
      inlineTick: App.inline('\`\` \` \`\` (백틱) **\`null\`**') }`);
  check('새 유형: 채점 전 정답 숨김 + 빈칸 4칸', n1.hiddenBefore && n1.inputsB13 === 4, JSON.stringify(n1));
  check('빈칸 자동 채점 (괄호·점·빈 문자열·백틱 표기 차이 허용)', n1.res['ai-1117-b13'] === true && n1.res['ai-1112-b02'] === true, JSON.stringify(n1.res));
  check('빈칸 오답 → 칸별 표시', n1.res['ai-1111-b01'] === false && n1.perBlank[0].includes('ok') && n1.perBlank[1].includes('bad'), JSON.stringify(n1.perBlank));
  check('단답 공백/따옴표 무시 + 검토 수정 정답 반영', n1.res['ai-1112-s06'] === true && n1.res['ai-1116-s10'] === true && n1.res['ai-1116-s01'] === false && /검토 메모/.test(n1.review || ''), JSON.stringify(n1));
  check('자가 채점 주관식: 답안 틀 + 모범 답안 + ⭕ 처리', /\[코드 A\] 결과:/.test(n1.template) && n1.s20model && n1.s20ok === true, JSON.stringify(n1));
  check('서술형 채점 기준표: 3항목 + 핵심어 표시 + 7점 정답', n1.rubric === 3 && n1.hints >= 2 && /7/.test(n1.score) && n1.e03ok === true, JSON.stringify(n1));
  check('인라인 코드: 백틱 문자 + 굵은 코드', n1.inlineTick.includes('<code>\`</code>') && n1.inlineTick.includes('<strong><code>null</code></strong>'), n1.inlineTick);

  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
  await go('/exam.html', 2000);
  await evalJs(`
    const box = document.getElementById('exam-area');
    const qs = ['ai-1111-s18', 'ai-1117-b16', 'ai-1112-e08', 'ai-1116-s02'].map(id => App.allQuestions().find(q => q.id === id));
    const ctrl = Quiz.renderSet(box, qs, { mode: 'practice' });
    for (const c of ctrl.cards) { c.el.querySelectorAll('input.q-input').forEach(i => { i.value = 'x'; }); const t = c.el.querySelector('textarea'); if (t) t.value = '답안'; await c.submit(); }
    box.scrollIntoView();`);
  const n2b = await evalJs(overflow);
  check('320 새 유형(빈칸·기준표) 채점 후 넘침 없음', n2b.sw <= n2b.w && !n2b.over.length, JSON.stringify(n2b));
  await snap('m320_new_types');
  await send('Emulation.clearDeviceMetricsOverride');

  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${results.length - failed} / ${results.length} passed`);
  ws.close(); chrome.kill();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); chrome.kill(); process.exit(2); });
