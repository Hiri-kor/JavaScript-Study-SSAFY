/* =========================================================
   시험 직전 문제 페이지
   ========================================================= */
(function () {
  'use strict';
  const form = document.getElementById('exam-form');
  const topicBox = document.getElementById('topic-checks');
  const poolCount = document.getElementById('pool-count');
  const area = document.getElementById('exam-area');
  const bar = document.getElementById('exam-bar');
  const resultEl = document.getElementById('exam-result');
  const historyEl = document.getElementById('history');
  let ctrl = null;
  let current = null;

  /* ---------- 필터 UI ---------- */
  const all = App.allQuestions();
  topicBox.innerHTML = App.topics().map(t => {
    const n = all.filter(q => q.topic === t.id).length;
    return `<label class="chip"><input type="checkbox" name="topic" value="${t.id}" checked> ${t.no}. ${App.esc(t.title)} <span class="muted">(${n})</span></label>`;
  }).join('');

  const p = App.params();
  if (p.get('topic')) {
    form.querySelectorAll('input[name=topic]').forEach(i => { i.checked = i.value === p.get('topic'); });
  }
  if (p.get('mode') === 'wrong') form.querySelector('[name=onlyWrong]').checked = true;

  document.getElementById('topic-all').addEventListener('click', () => { form.querySelectorAll('input[name=topic]').forEach(i => { i.checked = true; }); updatePool(); });
  document.getElementById('topic-none').addEventListener('click', () => { form.querySelectorAll('input[name=topic]').forEach(i => { i.checked = false; }); updatePool(); });

  function values(name) { return Array.from(form.querySelectorAll(`input[name=${name}]:checked`)).map(i => i.value); }

  function pool() {
    const sources = values('source');
    const topics = values('topic');
    const types = values('type');
    const onlyWrong = form.querySelector('[name=onlyWrong]').checked;
    const onlyNew = form.querySelector('[name=onlyNew]').checked;
    const wrong = new Set(App.Progress.wrong());
    const stats = App.Progress.stats();
    return App.allQuestions().filter(q =>
      sources.includes(App.isAI(q) ? 'ai' : 'official') &&
      topics.includes(q.topic) &&
      types.includes(q.type) &&
      (!onlyWrong || wrong.has(q.id)) &&
      (!onlyNew || !stats[q.id])
    );
  }
  function updatePool() {
    const n = pool().length;
    const aiCount = App.allQuestions().filter(App.isAI).length;
    poolCount.textContent = `조건에 맞는 문제 ${n}개` + (aiCount ? '' : ' · (아직 AI 문제가 없어요)');
  }
  form.addEventListener('change', updatePool);
  updatePool();

  /* ---------- 시작 ---------- */
  form.addEventListener('submit', e => {
    e.preventDefault();
    let qs = pool();
    if (!qs.length) {
      area.innerHTML = '<div class="empty-state"><div class="big">🔍</div><p>조건에 맞는 문제가 없어요. 필터를 바꿔 보세요.</p></div>';
      bar.hidden = true;
      resultEl.innerHTML = '';
      return;
    }
    if (form.querySelector('[name=shuffle]').checked) qs = App.shuffle(qs);
    const limit = Number(form.querySelector('[name=count]').value);
    if (limit) qs = qs.slice(0, limit);
    const mode = form.querySelector('[name=mode]:checked').value;
    current = { mode, total: qs.length, topics: values('topic') };
    resultEl.innerHTML = '';
    ctrl = Quiz.renderSet(area, qs, { mode, anchorPrefix: 'eq', onChange: onChange });
    setupBar(mode);
    bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function setupBar(mode) {
    bar.hidden = false;
    bar.innerHTML = `
      <span class="count" id="bar-count"></span>
      <div class="progress"><div class="meter"><i id="bar-meter" style="width:0%"></i></div></div>
      ${mode === 'exam' ? '<button type="button" class="btn btn-primary" id="grade-all">제출·채점</button>' : ''}
      <button type="button" class="btn btn-ghost" id="to-top" title="풀이 설정으로 이동">↑ 설정</button>`;
    bar.querySelector('#to-top').addEventListener('click', () => form.scrollIntoView({ behavior: 'smooth' }));
    const g = bar.querySelector('#grade-all');
    if (g) g.addEventListener('click', gradeAll);
    onChange();
  }

  function onChange() {
    if (!ctrl) return;
    const total = ctrl.cards.length;
    const done = current.mode === 'exam' ? ctrl.answeredCount() : ctrl.cards.filter(c => c.state.submitted).length;
    const countEl = document.getElementById('bar-count');
    const meter = document.getElementById('bar-meter');
    if (countEl) countEl.textContent = `${done} / ${total} ${current.mode === 'exam' ? '답변' : '채점'}`;
    if (meter) meter.style.width = Math.round(done / total * 100) + '%';
    if (current.graded) renderResult();
    else if (current.mode === 'practice' && done === total) renderResult();
  }

  async function gradeAll() {
    const unanswered = ctrl.cards.length - ctrl.answeredCount();
    if (unanswered > 0 && !confirm(`아직 답하지 않은 문제가 ${unanswered}개 있어요. 그대로 제출할까요? (미답변은 오답 처리)`)) return;
    const g = document.getElementById('grade-all');
    if (g) { g.disabled = true; g.textContent = '채점 중…'; }
    await ctrl.gradeAll();
    current.graded = true;
    if (g) g.remove();
    renderResult();
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderResult() {
    const r = ctrl.result();
    const scored = r.correct + r.wrong;
    const pct = scored ? Math.round(r.correct / scored * 100) : 0;
    const jumps = ctrl.cards.map((c, i) => {
      const cls = c.state.correct === true ? 'ok' : c.state.correct === false ? 'bad' : 'wait';
      return `<a class="${cls}" href="#${c.el.id}" title="${cls === 'ok' ? '정답' : cls === 'bad' ? '오답' : '채점 대기'}">${i + 1}</a>`;
    }).join('');
    resultEl.innerHTML = `
      <section class="panel result-panel">
        <p class="eyebrow">채점 결과</p>
        <div class="score-big">${r.correct} / ${r.total}</div>
        <p class="muted">정답률 ${pct}% (채점된 ${scored}문항 기준)${r.pending ? ` · ${r.pending}문항은 모범 답안과 비교해 스스로 채점하세요` : ''}</p>
        <div class="jump-list">${jumps}</div>
        <div class="row" style="margin-top:12px">
          <a class="btn" href="exam.html?mode=wrong">오답만 다시 풀기</a>
          <a class="btn" href="summary.html">시험 직전 개념 다시 보기</a>
        </div>
      </section>`;
    if (!current.saved && r.pending === 0) {
      current.saved = true;
      const h = App.Store.get('examHistory', []);
      h.unshift({ at: Date.now(), mode: current.mode, total: r.total, correct: r.correct });
      App.Store.set('examHistory', h.slice(0, 20));
      renderHistory();
    }
  }

  /* ---------- 기록 ---------- */
  function renderHistory() {
    const h = App.Store.get('examHistory', []);
    const wrongN = App.Progress.wrong().length;
    historyEl.innerHTML = `<h2>📈 풀이 기록</h2>
      <p class="small muted">오답 노트에 ${wrongN}문항이 있어요. 맞히면 오답 노트에서 자동으로 빠집니다.</p>` +
      (h.length
        ? '<ul class="history-list">' + h.map(x => {
            const d = new Date(x.at);
            const date = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
            return `<li><span>${date} · ${x.mode === 'exam' ? '모의고사' : '연습'}</span><b>${x.correct} / ${x.total} (${Math.round(x.correct / x.total * 100)}%)</b></li>`;
          }).join('') + '</ul>'
        : '<p class="muted">아직 기록이 없어요.</p>');
  }
  renderHistory();
})();
