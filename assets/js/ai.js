/* =========================================================
   AI 생성 문제 페이지
   - data/ai-questions.js (배포용, 처음엔 빈 배열)
   - 브라우저에 붙여넣어 가져온 문제 (localStorage)
   ========================================================= */
(function () {
  'use strict';
  const VALID_TYPES = ['mc', 'short', 'essay', 'code'];
  const promptBox = document.getElementById('prompt-box');
  const importBox = document.getElementById('import-box');
  const importMsg = document.getElementById('import-msg');
  const statusEl = document.getElementById('ai-status');
  const listEl = document.getElementById('ai-list');
  const filterTopic = document.getElementById('ai-filter-topic');
  const filterType = document.getElementById('ai-filter-type');

  /* ---------- 프롬프트 템플릿 ---------- */
  const topicLines = App.topics().map(t => `  - ${t.id} : ${t.title} (${t.desc})`).join('\n');
  promptBox.value =
`너는 JavaScript 시험 출제자야. 아래 [학습 범위]에 있는 내용만으로 시험 문제를 만들어 줘.
[학습 범위]에 없는 개념은 절대 출제하지 마.

[출제 조건]
- 주제(topic): 07-arrays          ← 원하는 주제 id로 바꾸세요
- 문제 수: 10
- 유형 비율: 객관식(mc) 4, 주관식(short) 3, 서술형(essay) 2, 코드 작성(code) 1
- 난이도(difficulty): 1~3 섞어서

[출력 형식] 아래 JSON 배열만 출력해. 설명 문장이나 코드펜스(\`\`\`) 없이 JSON만.
topic 값은 다음 중 하나여야 해:
${topicLines}

[
  {
    "topic": "07-arrays", "type": "mc", "difficulty": 1,
    "question": "배열의 끝에 요소를 추가하는 메서드는?",
    "options": ["pop()", "push()", "shift()", "unshift()"],
    "answer": 1,
    "explanation": "push()는 배열 끝에 요소를 추가하고 새 길이를 반환한다."
  },
  {
    "topic": "07-arrays", "type": "short", "difficulty": 2,
    "question": "다음 코드의 출력 결과를 쓰시오.",
    "code": "const arr = [1, 2, 3]\\nconsole.log(arr.map(n => n * 2))",
    "answers": ["[2, 4, 6]", "[2,4,6]"],
    "explanation": "map은 콜백의 반환값으로 새 배열을 만든다."
  },
  {
    "topic": "07-arrays", "type": "essay", "difficulty": 2,
    "question": "forEach와 map의 차이를 반환값 관점에서 서술하시오.",
    "modelAnswer": "forEach는 각 요소에 콜백을 실행만 하고 undefined를 반환한다. map은 콜백의 반환값을 모아 원본과 길이가 같은 새 배열을 반환한다.",
    "keywords": ["undefined", "새로운 배열", "반환"],
    "explanation": "map은 반드시 return이 필요하다."
  },
  {
    "topic": "07-arrays", "type": "code", "difficulty": 2,
    "question": "numbers 배열에서 짝수만 골라 evens 변수에 담으시오. (filter 사용)",
    "starter": "const numbers = [1, 2, 3, 4, 5]\\nconst evens = ",
    "tests": [
      { "name": "evens는 [2, 4]", "expr": "JSON.stringify(evens) === '[2,4]'" }
    ],
    "solution": "const numbers = [1, 2, 3, 4, 5]\\nconst evens = numbers.filter(num => num % 2 === 0)",
    "explanation": "filter는 콜백이 true를 반환한 요소만 모아 새 배열을 만든다."
  }
]

[규칙]
- mc: options는 4개, answer는 정답 보기의 번호(0부터 시작).
- short: answers에 정답으로 인정할 표현을 여러 개 넣어 줘. (띄어쓰기·대소문자·따옴표·끝의 세미콜론은 무시하고 비교함)
  빈칸이 여러 개면 answers 대신 "blanks": [{ "label": "A", "answers": ["let"] }, { "label": "B", "answers": ["const"] }]
  답이 문장이라 자동 채점이 어려우면 answers 대신 "modelAnswer"(모범 답안)만 넣어 줘. (스스로 채점)
- essay: modelAnswer(모범 답안)와 keywords(채점 키워드 3~5개)를 꼭 넣어 줘.
  배점이 있으면 "rubric": [{ "text": "채점 기준", "points": 3 }, ...] 도 넣어 줘. (합계 10점 기준, 7점 이상이면 정답)
- code: tests의 expr는 사용자 코드를 실행한 뒤 전역에서 평가했을 때 true가 되어야 하는 JavaScript 식이야.
  사용자 코드의 const/let 변수와 함수 이름을 그대로 쓸 수 있어. solution은 모든 테스트를 통과해야 해.
- 문자열 안의 줄바꿈은 \\n 으로, 큰따옴표는 \\" 로 이스케이프해.

[학습 범위]
(여기에 공부할 교안 내용 또는 이 사이트의 해당 주제 페이지 내용을 붙여넣으세요)
`;
  document.getElementById('copy-prompt').addEventListener('click', () => App.copyText(promptBox.value));

  /* ---------- 검증 / 가져오기 ---------- */
  function stripFence(s) {
    s = s.trim();
    const m = s.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
    return m ? m[1] : s;
  }
  function validate(q, i, topicIds) {
    const errs = [];
    const where = `${i + 1}번째 문제`;
    if (!q || typeof q !== 'object') return [`${where}: 객체가 아니에요`];
    if (!VALID_TYPES.includes(q.type)) errs.push(`${where}: type은 ${VALID_TYPES.join(', ')} 중 하나여야 해요 (현재: ${q.type})`);
    if (!topicIds.includes(q.topic)) errs.push(`${where}: topic "${q.topic}" 을(를) 알 수 없어요`);
    if (!q.question || typeof q.question !== 'string') errs.push(`${where}: question이 비어 있어요`);
    if (q.type === 'mc') {
      if (!Array.isArray(q.options) || q.options.length < 2) errs.push(`${where}: options는 2개 이상인 배열이어야 해요`);
      else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errs.push(`${where}: answer는 0~${q.options.length - 1} 사이 정수여야 해요`);
    }
    if (q.type === 'short') {
      if (typeof q.answers === 'string') q.answers = [q.answers];
      const okAnswers = Array.isArray(q.answers) && q.answers.length;
      const okBlanks = Array.isArray(q.blanks) && q.blanks.length &&
        q.blanks.every(b => b && Array.isArray(b.answers) && b.answers.length);
      if (q.blanks !== undefined && !okBlanks) errs.push(`${where}: blanks는 { label, answers: [...] } 객체 배열이어야 해요`);
      else if (!okAnswers && !okBlanks && !q.modelAnswer) errs.push(`${where}: answers(허용 답안 배열), blanks(빈칸별 정답) 또는 modelAnswer(스스로 채점용 모범 답안) 중 하나가 필요해요`);
    }
    if (q.type === 'essay' && !q.modelAnswer) errs.push(`${where}: modelAnswer(모범 답안)가 필요해요`);
    if (q.rubric !== undefined && (!Array.isArray(q.rubric) || q.rubric.some(r => !r || !r.text || !(Number(r.points) > 0)))) {
      errs.push(`${where}: rubric은 { text, points } 객체 배열이어야 해요`);
    }
    if (q.type === 'code') {
      if (!Array.isArray(q.tests) || !q.tests.length || q.tests.some(t => !t || !t.expr)) errs.push(`${where}: tests는 expr를 가진 객체 배열이어야 해요`);
      if (!q.solution) errs.push(`${where}: solution(모범 코드)가 필요해요`);
    }
    return errs;
  }

  document.getElementById('do-import').addEventListener('click', () => {
    importMsg.innerHTML = '';
    let data;
    try {
      data = JSON.parse(stripFence(importBox.value));
    } catch (e) {
      importMsg.innerHTML = `<li class="err">JSON 형식이 올바르지 않아요: ${App.esc(e.message)}</li>`;
      return;
    }
    if (data && !Array.isArray(data) && Array.isArray(data.questions)) data = data.questions;
    if (!Array.isArray(data)) data = [data];
    const topicIds = App.topics().map(t => t.id);
    const existing = App.Store.get('aiImported', []);
    const usedIds = new Set(App.allQuestions().map(q => q.id));
    const stamp = Date.now().toString(36);
    const ok = [];
    const msgs = [];
    data.forEach((q, i) => {
      const errs = validate(q, i, topicIds);
      if (errs.length) { errs.forEach(m => msgs.push(`<li class="err">${App.esc(m)}</li>`)); return; }
      if (!q.id || usedIds.has(q.id)) q.id = `ai-${stamp}-${i + 1}`;
      usedIds.add(q.id);
      q.source = 'AI';
      ok.push(q);
    });
    if (ok.length) {
      if (!App.Store.set('aiImported', existing.concat(ok))) msgs.unshift('<li class="err">브라우저 저장소에 저장하지 못했어요 (시크릿 모드인지 확인하세요).</li>');
      else msgs.unshift(`<li class="ok">✅ ${ok.length}문제를 가져왔어요.</li>`);
      importBox.value = '';
    }
    importMsg.innerHTML = msgs.join('');
    refresh();
  });

  document.getElementById('export-file').addEventListener('click', () => {
    const local = App.Store.get('aiImported', []).map(q => { const c = Object.assign({}, q); delete c.source; return c; });
    if (!local.length) { App.toast('브라우저에 가져온 AI 문제가 없어요'); return; }
    App.copyText(JSON.stringify(local, null, 2) + '\n');
  });
  document.getElementById('clear-imported').addEventListener('click', () => {
    const n = App.Store.get('aiImported', []).length;
    if (!n) { App.toast('브라우저에 저장된 AI 문제가 없어요'); return; }
    if (!confirm(`브라우저에 저장된 AI 문제 ${n}개를 모두 지울까요? (data/ai-questions.js 파일의 문제는 그대로 남아요)`)) return;
    App.Store.remove('aiImported');
    refresh();
  });

  /* ---------- 현황 / 풀기 ---------- */
  const countBy = id => App.allQuestions().filter(q => App.isAI(q) && q.topic === id).length;
  function buildTopicFilter() {
    const keep = filterTopic.value;
    filterTopic.innerHTML = `<option value="">전체 주제 (${App.allQuestions().filter(App.isAI).length})</option>` +
      App.topics().map(t => `<option value="${t.id}">${t.no}. ${App.esc(t.title)} (${countBy(t.id)})</option>`).join('');
    filterTopic.value = keep;
  }
  buildTopicFilter();
  const firstWithQ = App.topics().find(t => countBy(t.id) > 0);
  if (firstWithQ) filterTopic.value = firstWithQ.id;
  filterType.innerHTML = '<option value="">전체 유형</option>' + VALID_TYPES.map(k => `<option value="${k}">${Quiz.TYPE_LABEL[k]}</option>`).join('');
  filterTopic.addEventListener('change', renderList);
  filterType.addEventListener('change', renderList);

  function aiQuestions() { return App.allQuestions().filter(App.isAI); }

  function refresh() {
    const qs = aiQuestions();
    const fileN = (window.AI_QUESTIONS || []).length;
    const localN = App.Store.get('aiImported', []).length;
    const rows = App.topics().map(t => {
      const n = qs.filter(q => q.topic === t.id);
      const byType = VALID_TYPES.map(k => n.filter(q => q.type === k).length);
      return `<tr><td>${t.no}. ${App.esc(t.title)}</td>${byType.map(c => `<td class="num">${c || '-'}</td>`).join('')}<td class="num"><b>${n.length}</b></td></tr>`;
    }).join('');
    statusEl.innerHTML = `
      <p class="muted small">파일(data/ai-questions.js) ${fileN}개 · 이 브라우저에 가져온 문제 ${localN}개</p>
      <div class="table-wrap"><table class="count-table"><thead><tr><th>주제</th>${VALID_TYPES.map(k => `<th>${Quiz.TYPE_LABEL[k]}</th>`).join('')}<th>합계</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    if (filterTopic.options.length) buildTopicFilter();
    renderList();
  }

  function renderList() {
    let qs = aiQuestions();
    if (filterTopic.value) qs = qs.filter(q => q.topic === filterTopic.value);
    if (filterType.value) qs = qs.filter(q => q.type === filterType.value);
    if (!aiQuestions().length) {
      listEl.innerHTML = `<div class="empty-state"><div class="big">🤖</div><p><b>아직 AI 문제가 없어요.</b><br>① 위의 프롬프트를 복사해 AI에게 문제를 만들게 하고 ② 받은 JSON을 "문제 가져오기"에 붙여넣으세요.</p></div>`;
      return;
    }
    if (!qs.length) { listEl.innerHTML = '<div class="empty-state"><p>조건에 맞는 AI 문제가 없어요.</p></div>'; return; }
    Quiz.renderSet(listEl, qs, { mode: 'practice', anchorPrefix: 'aq' });
  }

  refresh();
})();
