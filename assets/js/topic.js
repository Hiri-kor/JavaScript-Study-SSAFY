/* =========================================================
   마크다운 본문 페이지 (주제별 학습 / 시험 직전 개념)
   body[data-topic] 이 있으면 주제 페이지, body[data-md] 가 있으면 일반 문서
   ========================================================= */
(async function () {
  'use strict';
  const body = document.body;
  const topicId = body.dataset.topic;
  const t = topicId ? App.topic(topicId) : null;
  const mdPath = t ? App.url('content/topics/' + t.id + '.md') : App.url(body.dataset.md);
  const content = document.getElementById('content');
  const headEl = document.getElementById('topic-head');

  /* ---------- 머리말 ---------- */
  if (t && headEl) {
    const all = App.topics();
    document.title = `${String(t.no).padStart(2, '0')}. ${t.title} | JS 시험 대비 노트`;
    const done = App.Progress.doneTopics().includes(t.id);
    headEl.innerHTML = `
      <p class="eyebrow">주제 ${t.no} / ${all.length}</p>
      <h1 class="topic-title">${App.esc(t.title)}</h1>
      <p class="topic-desc">${App.esc(t.desc)}</p>
      <div class="legend"><span>💡 쉽게 이해하기</span><span>📌 TIP</span><span>📝 서술형 대비 정의</span><span>⚠️ 헷갈리기 쉬운 점</span></div>
      <div class="topic-actions">
        <a class="btn" href="#topic-quiz">확인 문제로 이동 ↓</a>
        <a class="btn" href="${App.url('exam.html?topic=' + t.id)}">이 주제만 시험 모드로</a>
        <label class="done-check"><input type="checkbox" id="done-check" ${done ? 'checked' : ''}> 학습 완료</label>
      </div>
      <details class="toc-mobile" id="toc-mobile"><summary>목차 보기</summary><div></div></details>`;
    headEl.querySelector('#done-check').addEventListener('change', e => {
      App.Progress.setDone(t.id, e.target.checked);
      App.toast(e.target.checked ? '학습 완료로 표시했어요' : '완료 표시를 해제했어요');
    });
  }

  /* ---------- 본문 ---------- */
  try {
    const md = await App.fetchText(mdPath);
    App.renderMarkdown(md, content);
  } catch (err) {
    content.innerHTML = App.loadErrorHtml(err);
  }

  /* ---------- 확인 문제 ---------- */
  const quizEl = document.getElementById('topic-quiz');
  if (t && quizEl) {
    const qs = App.allQuestions().filter(q => q.topic === t.id);
    const official = qs.filter(q => !App.isAI(q));
    const ai = qs.filter(q => App.isAI(q));
    quizEl.className = 'quiz-section';
    quizEl.innerHTML = `
      <h2 id="topic-quiz-title">✅ 확인 문제</h2>
      <p class="muted small">확인 문제 ${official.length}개${ai.length ? ` · AI 문제 ${ai.length}개` : ''} · 정답과 해설은 <b>채점한 뒤에만</b> 보여요. 결과는 오답 노트에 자동 기록됩니다.</p>
      <h3 class="quiz-sub">확인 문제</h3>
      <div class="q-list" id="topic-quiz-list"></div>
      <div id="topic-ai-wrap"></div>`;
    const list = quizEl.querySelector('#topic-quiz-list');
    if (!official.length) {
      list.innerHTML = '<div class="empty-state"><p>이 주제에 해당하는 확인 문제가 없어요.</p></div>';
    } else {
      Quiz.renderSet(list, official, { mode: 'practice', showTopic: false, anchorPrefix: 'tq' });
    }
    const aiWrap = quizEl.querySelector('#topic-ai-wrap');
    if (ai.length) {
      aiWrap.innerHTML = `
        <h3 class="quiz-sub">🤖 AI 문제 <span class="muted small">(${ai.length}문항)</span></h3>
        <div class="row"><button type="button" class="btn" id="topic-ai-open">AI 문제 ${ai.length}개 펼쳐서 풀기</button>
        <a class="btn btn-ghost" href="${App.url('exam.html?topic=' + t.id)}">시험 모드로 섞어서 풀기 →</a></div>
        <div class="q-list" id="topic-ai-list"></div>`;
      aiWrap.querySelector('#topic-ai-open').addEventListener('click', e => {
        e.target.closest('.row').querySelector('button').remove();
        Quiz.renderSet(aiWrap.querySelector('#topic-ai-list'), ai, { mode: 'practice', showTopic: false, anchorPrefix: 'tai' });
      });
    }
  }

  /* ---------- 이전 / 다음 ---------- */
  const navEl = document.getElementById('topic-nav');
  if (t && navEl) {
    const all = App.topics();
    const i = all.findIndex(x => x.id === t.id);
    const prev = all[i - 1];
    const next = all[i + 1];
    navEl.innerHTML =
      (prev ? `<a class="prev" href="${App.url('topics/' + prev.id + '.html')}"><small>← 이전 주제</small>${App.esc(prev.no + '. ' + prev.title)}</a>` : '<span></span>') +
      (next ? `<a class="next" href="${App.url('topics/' + next.id + '.html')}"><small>다음 주제 →</small>${App.esc(next.no + '. ' + next.title)}</a>`
            : `<a class="next" href="${App.url('summary.html')}"><small>마무리 →</small>시험 직전 개념 정리</a>`);
  }

  /* ---------- 목차 + 현재 위치 표시 ---------- */
  const heads = Array.from(content.querySelectorAll('h2, h3'));
  const quizTitle = document.getElementById('topic-quiz-title');
  if (quizTitle) heads.push(quizTitle);
  const linksHtml = heads.map(h => `<a href="#${h.id}" class="${h.tagName === 'H3' ? 'lv3' : ''}" data-id="${h.id}">${App.esc(h.textContent)}</a>`).join('');
  const toc = document.getElementById('toc');
  if (toc) toc.innerHTML = '<p class="toc-title">목차</p>' + linksHtml;
  const tocMobile = document.querySelector('#toc-mobile > div');
  if (tocMobile) tocMobile.innerHTML = linksHtml;

  if (toc && 'IntersectionObserver' in window && heads.length) {
    const links = new Map(Array.from(toc.querySelectorAll('a')).map(a => [a.dataset.id, a]));
    let active = null;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          if (active) active.classList.remove('active');
          active = links.get(en.target.id);
          if (active) {
            active.classList.add('active');
            const top = active.offsetTop - toc.clientHeight / 2;
            if (Math.abs(toc.scrollTop - top) > toc.clientHeight / 3) toc.scrollTop = top;
          }
        }
      });
    }, { rootMargin: '-70px 0px -70% 0px' });
    heads.forEach(h => io.observe(h));
  }

  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) setTimeout(() => target.scrollIntoView(), 50);
  }
})();
