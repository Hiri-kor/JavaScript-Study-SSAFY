/* =========================================================
   코드 연습장: HTML / CSS / JS를 직접 입력하고 실행
   ========================================================= */
(async function () {
  'use strict';
  const LODASH = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';
  const editor = document.getElementById('pg-editor');
  const tabs = document.querySelectorAll('.pg-tabs button[data-tab]');
  const frame = document.getElementById('pg-preview');
  const out = document.getElementById('pg-console');
  const sel = document.getElementById('pg-examples');
  const lodashBox = document.getElementById('pg-lodash');
  const autoBox = document.getElementById('pg-auto');

  const state = { html: '', css: '', js: '', active: 'js' };
  let examples = [];

  function setActive(tab) {
    state[state.active] = editor.value;
    state.active = tab;
    editor.value = state[tab];
    tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    editor.setAttribute('aria-label', tab.toUpperCase() + ' 코드 입력');
    editor.focus();
  }
  function markDots() {
    tabs.forEach(b => {
      const has = (b.dataset.tab === state.active ? editor.value : state[b.dataset.tab]).trim() !== '';
      b.querySelector('.dot').hidden = !has;
    });
  }
  function load(obj, opts) {
    state.html = obj.html || '';
    state.css = obj.css || '';
    state.js = obj.js || '';
    if (obj.lodash != null) lodashBox.checked = !!obj.lodash;
    const first = state.js ? 'js' : state.html ? 'html' : state.css ? 'css' : 'js';
    state.active = first;
    editor.value = state[first];
    tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === first));
    markDots();
    if (!opts || opts.run !== false) run();
  }
  function snapshot() {
    state[state.active] = editor.value;
    return { html: state.html, css: state.css, js: state.js, lodash: lodashBox.checked };
  }
  function save() { App.Store.set('playground', snapshot()); }

  async function run() {
    const s = snapshot();
    save();
    out.innerHTML = '';
    const usesLodash = s.lodash || /\b_\.\w+\(/.test(s.js + s.html);
    if (usesLodash && !s.lodash) { lodashBox.checked = true; }
    App.appendLog(out, { level: 'sys', text: '▶ 실행 ' + new Date().toLocaleTimeString() });
    const res = await Runner.run(frame, { html: s.html, css: s.css, js: s.js, libs: usesLodash ? [LODASH] : [] }, { onLog: l => App.appendLog(out, l) });
    if (res.timedOut) App.appendLog(out, { level: 'warn', text: '⏱ 실행 완료 신호를 받지 못했어요. 무한 반복이나 오류가 없는지 확인하세요.' });
  }

  tabs.forEach(b => b.addEventListener('click', () => setActive(b.dataset.tab)));
  App.enhanceEditor(editor, { onRun: run });
  let autoTimer;
  editor.addEventListener('input', () => {
    markDots();
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => { if (autoBox.checked) run(); else save(); }, 700);
  });
  document.getElementById('pg-run').addEventListener('click', run);
  document.getElementById('pg-clear-console').addEventListener('click', () => { out.innerHTML = ''; });
  document.getElementById('pg-reset').addEventListener('click', () => {
    if (!confirm('HTML / CSS / JS 입력 내용을 모두 비울까요?')) return;
    load({ html: '', css: '', js: '' }, { run: false });
    save();
  });
  document.getElementById('pg-share').addEventListener('click', () => {
    const link = location.href.split('#')[0] + '#p=' + App.b64encode(JSON.stringify(snapshot()));
    App.copyText(link);
  });
  document.getElementById('pg-typing').addEventListener('click', () => {
    const code = editor.value.trim();
    if (!code) { App.toast('따라칠 코드가 없어요'); return; }
    Typing.open(code, { lang: state.active });
  });
  sel.addEventListener('change', () => {
    const ex = examples[Number(sel.value)];
    if (!ex) return;
    const cur = snapshot();
    if ((cur.html + cur.css + cur.js).trim() && !confirm(`"${ex.title}" 예제를 불러오면 지금 입력한 코드가 바뀌어요. 계속할까요?`)) { sel.value = ''; return; }
    load(ex);
    sel.value = '';
  });

  /* ---------- 예제 불러오기 (content/playground-examples.md) ---------- */
  try {
    const md = await App.fetchText(App.url('content/playground-examples.md'));
    examples = md.split(/^## /m).slice(1).map(sec => {
      const title = sec.split('\n')[0].trim();
      const ex = { title };
      const re = /```(\w+)\n([\s\S]*?)```/g;
      let m;
      while ((m = re.exec(sec))) {
        const lang = m[1] === 'javascript' ? 'js' : m[1];
        if (['html', 'css', 'js'].includes(lang)) ex[lang] = m[2].replace(/\n$/, '');
      }
      ex.lodash = /lodash/i.test(title);
      return ex;
    });
    sel.innerHTML = '<option value="">📚 교안 예제 불러오기…</option>' + examples.map((e, i) => `<option value="${i}">${App.esc(e.title)}</option>`).join('');
  } catch (err) {
    sel.innerHTML = '<option value="">(예제를 불러오지 못했어요)</option>';
  }

  /* ---------- 시작 상태: 링크로 전달된 코드 → 저장된 코드 → 빈 연습장 ---------- */
  const m = location.hash.match(/#p=([\w-]+)/);
  if (m) {
    try { load(JSON.parse(App.b64decode(m[1]))); history.replaceState(null, '', location.pathname); return; } catch (e) { App.toast('링크의 코드를 읽지 못했어요'); }
  }
  const saved = App.Store.get('playground', null);
  if (saved && (saved.html || saved.css || saved.js)) load(saved, { run: false });
  else load({ js: "// 여기에 JavaScript를 입력하고 Ctrl+Enter(또는 ▶ 실행)를 누르세요.\nconst message = '안녕하세요'\nconsole.log(message)" });
})();
