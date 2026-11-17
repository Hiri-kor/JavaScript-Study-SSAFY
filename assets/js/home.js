/* =========================================================
   홈: 학습 현황, 주제 카드
   ========================================================= */
(function () {
  'use strict';
  const all = App.allQuestions();
  const stats = App.Progress.stats();
  const wrong = App.Progress.wrong();
  const done = App.Progress.doneTopics();

  const solved = all.filter(q => stats[q.id]);
  const lastCorrect = solved.filter(q => stats[q.id].last).length;
  document.getElementById('home-stats').innerHTML = `
    <div class="stat"><b>${done.length} / ${App.topics().length}</b><span>학습 완료 주제</span></div>
    <div class="stat"><b>${solved.length} / ${all.length}</b><span>풀어 본 문제</span></div>
    <div class="stat"><b>${solved.length ? Math.round(lastCorrect / solved.length * 100) + '%' : '–'}</b><span>최근 정답률</span></div>
    <div class="stat"><b>${wrong.length}</b><span>오답 노트 <a href="exam.html?mode=wrong">다시 풀기 →</a></span></div>`;

  document.getElementById('topic-grid').innerHTML = App.topics().map(t => {
    const qs = all.filter(q => q.topic === t.id);
    const s = qs.filter(q => stats[q.id]);
    const c = s.filter(q => stats[q.id].last).length;
    const pct = qs.length ? Math.round(s.length / qs.length * 100) : 0;
    return `<a class="topic-card" href="topics/${t.id}.html">
      ${done.includes(t.id) ? '<span class="done-mark">✓ 완료</span>' : ''}
      <span class="no">주제 ${String(t.no).padStart(2, '0')}</span>
      <h3>${App.esc(t.title)}</h3>
      <p>${App.esc(t.desc)}</p>
      <div class="meta"><span>문제 ${qs.length}개</span>${s.length ? `<span>· 풀이 ${s.length} · 정답 ${c}</span>` : ''}</div>
      <div class="meter" aria-label="문제 풀이 진행률"><i style="width:${pct}%"></i></div>
    </a>`;
  }).join('');

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!confirm('학습 완료 표시, 풀이 기록, 오답 노트를 모두 지울까요? (AI 문제는 지워지지 않아요)')) return;
    App.Progress.reset();
    location.reload();
  });
})();
