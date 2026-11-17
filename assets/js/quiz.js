/* =========================================================
   문제 엔진
   - 유형: mc(객관식) / short(주관식 단답) / essay(서술형) / code(코드 작성)
   - 모드: practice(한 문제씩 바로 채점) / exam(모아서 한 번에 채점)
   - 정답과 해설은 "채점" 이후에만 화면에 그려진다 (풀기 전 노출 방지)
   ========================================================= */
(function () {
  'use strict';
  const TYPE_LABEL = { mc: '객관식', short: '주관식', essay: '서술형', code: '코드 작성' };
  const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let uid = 0;

  function norm(s) {
    return String(s == null ? '' : s)
      .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, '').replace(/;+$/, '').toLowerCase();
  }
  // 주관식 비교용: 감싼 백틱, 앞의 점(.toggle), 끝의 () (toggle()), 화살표 표기 차이 무시
  function normAnswer(s) {
    let t = String(s == null ? '' : s).trim();
    if (t.length > 2 && t[0] === '`' && t[t.length - 1] === '`') t = t.slice(1, -1);
    t = norm(t).replace(/->|➔|⇒/g, '→');
    if (/^\.[a-z_$]/i.test(t)) t = t.slice(1);
    t = t.replace(/([\w$])\(\)$/, '$1');
    return t;
  }
  // 따옴표·쉼표까지 무시한 느슨한 비교 ('Dan' = Dan, [1, 2] = [1 2])
  function loose(t) { return t.replace(/["'`,]/g, ''); }
  function matches(answers, value) {
    const v = normAnswer(value);
    if (!v) return false;
    return (answers || []).some(a => {
      const n = normAnswer(a);
      return n === v || (loose(n) !== '' && loose(n) === loose(v));
    });
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function btn(label, cls, onClick) {
    const b = el('button', 'btn ' + (cls || ''));
    b.type = 'button';
    b.textContent = label;
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }
  function codeBlock(code, lang) {
    const pre = el('pre', 'q-code');
    const c = el('code', lang ? 'language-' + lang : '');
    c.textContent = code;
    pre.appendChild(c);
    if (window.hljs && lang && window.hljs.getLanguage(lang)) {
      try { window.hljs.highlightElement(c); } catch (e) { /* noop */ }
    }
    return pre;
  }
  // 보기가 ```lang\n코드\n``` 형태면 코드 보기
  function codeOption(o) {
    const m = String(o).match(/^```(\w*)\n([\s\S]*?)\n?```$/);
    return m ? { lang: m[1] || 'js', code: m[2] } : null;
  }
  function optionNode(o) {
    const span = el('span', 'opt-text');
    const c = codeOption(o);
    if (c) span.appendChild(codeBlock(c.code, c.lang));
    else span.innerHTML = App.inline(o);
    return span;
  }

  function createCard(q, opts) {
    opts = opts || {};
    const mode = opts.mode || 'practice';
    const id = 'q' + (++uid);
    const card = el('article', 'q-card');
    card.dataset.qid = q.id;
    card.id = opts.anchorId || ('card-' + id);

    const t = App.topic(q.topic);
    const head = el('header', 'q-head');
    head.innerHTML =
      (opts.index != null ? `<span class="q-no">${opts.index + 1}</span>` : '') +
      `<span class="badge badge-${App.esc(q.type)}">${TYPE_LABEL[q.type] || App.esc(q.type)}</span>` +
      (t && opts.showTopic !== false ? `<span class="badge">${App.esc(t.no + '. ' + t.title)}</span>` : '') +
      `<span class="badge badge-src ${App.isAI(q) ? 'is-ai' : ''}">${App.esc(q.source || '')}${q.ref ? ' · ' + App.esc(q.ref) : ''}</span>` +
      (q.difficulty ? `<span class="badge" title="난이도">${'★'.repeat(Math.min(3, q.difficulty))}</span>` : '') +
      '<span class="q-status"></span>';
    card.appendChild(head);
    card.appendChild(el('div', 'q-text', App.inline(q.question)));
    if (q.code) card.appendChild(codeBlock(q.code, q.codeLang || 'js'));
    if (Array.isArray(q.codes)) q.codes.forEach(c => card.appendChild(codeBlock(c.code, c.lang || 'js')));

    const body = el('div', 'q-body');
    const actions = el('div', 'q-actions');
    const fb = el('div', 'q-feedback');
    fb.hidden = true;
    card.appendChild(body);
    card.appendChild(actions);
    card.appendChild(fb);

    const st = { submitted: false, revealed: false, correct: null };
    const statusEl = head.querySelector('.q-status');
    function setStatus(text, cls) { statusEl.textContent = text; statusEl.className = 'q-status ' + (cls || ''); }
    function emit() { if (opts.onChange) opts.onChange(api); }

    function textInput(placeholder) {
      const inp = el('input', 'q-input');
      inp.type = 'text';
      inp.placeholder = placeholder;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.setAttribute('autocapitalize', 'off');
      return inp;
    }
    function finishSelf(ok) {
      st.correct = ok;
      App.Progress.record(q.id, ok);
      applyResultStyle();
      emit();
    }
    // ⭕/❌ 스스로 채점
    function selfGrade() {
      const sg = el('div', 'self-grade', '스스로 채점:');
      const yes = btn('⭕ 맞았다', 'btn-sm');
      const no = btn('❌ 틀렸다', 'btn-sm');
      const pick = ok => {
        yes.disabled = no.disabled = true;
        (ok ? yes : no).classList.add(ok ? 'btn-ok' : 'btn-bad');
        finishSelf(ok);
      };
      yes.addEventListener('click', () => pick(true));
      no.addEventListener('click', () => pick(false));
      sg.appendChild(yes);
      sg.appendChild(no);
      return sg;
    }
    // 서술형 채점 기준표: 내 답안에 들어간 항목을 체크 → 70% 이상이면 정답
    function rubricNode(answerText) {
      const total = q.rubric.reduce((s, r) => s + (Number(r.points) || 0), 0);
      const max = q.points || Math.min(total, 10) || total;
      const pass = Math.ceil(max * 0.7);
      const box = el('div', 'rubric');
      box.appendChild(el('div', '', `<b>채점 기준표</b> <span class="small muted">— 내 답안에 들어간 항목을 체크하세요. 표시(✓)는 굵은 핵심어가 답안에 있는지 참고용입니다.</span>`));
      const resp = norm(answerText);
      const list = el('ul', 'rubric-list');
      const boxes = q.rubric.map(r => {
        const keys = (String(r.text).match(/\*\*([^*]+)\*\*/g) || []).map(k => norm(k.replace(/\*\*|`/g, '').replace(/\(.*?\)/g, '')));
        const hint = resp && keys.some(k => k && resp.includes(k));
        const li = el('li');
        const lab = el('label');
        const cb = el('input');
        cb.type = 'checkbox';
        lab.appendChild(cb);
        lab.appendChild(el('span', 'rubric-text', App.inline(r.text) + (hint ? ' <span class="kw hit">✓ 핵심어 있음</span>' : '')));
        lab.appendChild(el('span', 'rubric-pts', `${r.points}점`));
        li.appendChild(lab);
        list.appendChild(li);
        return cb;
      });
      box.appendChild(list);
      const foot = el('div', 'self-grade');
      const score = el('span', 'rubric-score');
      const ok = btn('이 점수로 채점', 'btn-sm btn-primary');
      const sum = () => Math.min(max, boxes.reduce((s, cb, i) => s + (cb.checked ? Number(q.rubric[i].points) || 0 : 0), 0));
      const upd = () => { score.innerHTML = `내 점수 <b>${sum()}</b> / ${max}점 <span class="small muted">(${pass}점 이상이면 정답)</span>`; };
      boxes.forEach(cb => cb.addEventListener('change', upd));
      upd();
      ok.addEventListener('click', () => {
        const s = sum();
        boxes.forEach(cb => { cb.disabled = true; });
        ok.disabled = true;
        ok.textContent = `${s} / ${max}점으로 채점함`;
        finishSelf(s >= pass);
      });
      foot.appendChild(score);
      if (st.correct === null) foot.appendChild(ok);
      box.appendChild(foot);
      return box;
    }

    let collectAnswered = () => false;
    let grade = async () => false;
    let lock = () => {};
    let answerNode = () => el('div');

    /* ---------- 객관식 ---------- */
    if (q.type === 'mc') {
      const list = el('div', 'q-options');
      (q.options || []).forEach((o, i) => {
        const lab = el('label', 'q-opt');
        lab.innerHTML = `<input type="radio" name="${id}-opt" value="${i}"><span class="opt-key">${KEYS[i]})</span>`;
        lab.appendChild(optionNode(o));
        list.appendChild(lab);
      });
      body.appendChild(list);
      list.addEventListener('change', () => {
        list.querySelectorAll('.q-opt').forEach(l => l.classList.toggle('selected', l.querySelector('input').checked));
        if (mode === 'exam') setStatus('답변함');
        emit();
      });
      const chosen = () => { const c = list.querySelector('input:checked'); return c ? Number(c.value) : null; };
      collectAnswered = () => chosen() !== null;
      grade = async () => chosen() === q.answer;
      lock = () => list.querySelectorAll('input').forEach(i => { i.disabled = true; });
      answerNode = () => {
        list.querySelectorAll('.q-opt').forEach((l, i) => {
          if (i === q.answer) l.classList.add('is-answer');
          else if (l.querySelector('input').checked) l.classList.add('is-wrong');
        });
        const right = q.options[q.answer];
        if (codeOption(right)) return el('p', '', `<b>정답:</b> ${KEYS[q.answer]}) (초록색으로 표시된 코드)`);
        return el('p', '', `<b>정답:</b> ${KEYS[q.answer]}) ${App.inline(right)}`);
      };
    }

    /* ---------- 주관식: 빈칸 여러 개 ---------- */
    else if (q.type === 'short' && Array.isArray(q.blanks) && q.blanks.length) {
      const grid = el('div', 'q-blanks');
      const inputs = q.blanks.map((b, i) => {
        const row = el('label', 'q-blank');
        const lab = el('span', 'q-blank-label', b.label ? (/^[A-Zㄱ-ㅎ0-9]$/.test(b.label) ? `( ${App.esc(b.label)} )` : App.inline(b.label)) : '답');
        const inp = textInput(i === q.blanks.length - 1 ? '정답' + (mode === 'practice' ? ' (Enter로 채점)' : '') : '정답 (Enter로 다음 칸)');
        row.appendChild(lab);
        row.appendChild(inp);
        grid.appendChild(row);
        return inp;
      });
      body.appendChild(grid);
      inputs.forEach((inp, i) => {
        inp.addEventListener('input', () => { if (mode === 'exam') setStatus(collectAnswered() ? '답변함' : ''); emit(); });
        inp.addEventListener('keydown', e => {
          if (e.key !== 'Enter' || e.isComposing) return;
          e.preventDefault();
          if (i < inputs.length - 1) inputs[i + 1].focus();
          else if (mode === 'practice') submit();
        });
      });
      const results = () => q.blanks.map((b, i) => matches(b.answers, inputs[i].value));
      collectAnswered = () => inputs.some(inp => inp.value.trim() !== '');
      grade = async () => results().every(Boolean);
      lock = () => inputs.forEach(inp => { inp.readOnly = true; });
      answerNode = () => {
        const res = results();
        inputs.forEach((inp, i) => inp.parentNode.classList.add(res[i] ? 'ok' : 'bad'));
        const ul = el('ul', 'blank-answers');
        q.blanks.forEach((b, i) => {
          const name = b.label ? (/^[A-Zㄱ-ㅎ0-9]$/.test(b.label) ? `( ${App.esc(b.label)} )` : App.inline(b.label)) : '답';
          ul.appendChild(el('li', res[i] ? 'ok' : 'bad',
            `${res[i] ? '✅' : '❌'} <b>${name}</b> ${b.answers.slice(0, 3).map(a => '<code>' + App.esc(a) + '</code>').join(' 또는 ')}` +
            (!res[i] && inputs[i].value.trim() ? ` <span class="small muted">· 내 답 <code>${App.esc(inputs[i].value)}</code></span>` : '')));
        });
        const wrap = el('div');
        wrap.appendChild(el('b', '', '정답'));
        wrap.appendChild(ul);
        wrap.appendChild(el('p', 'small muted', '띄어쓰기·대소문자·따옴표·끝의 세미콜론·쉼표는 무시하고 비교했어요. 모든 칸이 맞아야 정답입니다.'));
        return wrap;
      };
    }

    /* ---------- 주관식: 모범 답안과 비교해 스스로 채점 ---------- */
    else if (q.type === 'short' && !q.answers && q.modelAnswer) {
      const ta = el('textarea', 'q-textarea');
      ta.rows = Math.max(3, (q.template || '').split('\n').length + 1);
      ta.value = q.template || '';
      ta.placeholder = '답을 적어 보세요.';
      body.appendChild(ta);
      ta.addEventListener('input', () => { if (mode === 'exam') setStatus(collectAnswered() ? '답변함' : ''); emit(); });
      collectAnswered = () => ta.value.trim() !== '' && ta.value.trim() !== (q.template || '').trim();
      grade = async () => null;
      lock = () => { ta.readOnly = true; };
      answerNode = () => {
        const wrap = el('div');
        wrap.appendChild(el('div', 'model', `<b>정답 (모범 답안)</b><div>${App.inline(q.modelAnswer)}</div>`));
        if (st.correct === null) wrap.appendChild(selfGrade());
        return wrap;
      };
    }

    /* ---------- 주관식(단답) ---------- */
    else if (q.type === 'short') {
      const answers = Array.isArray(q.answers) ? q.answers : [q.answers];
      const inp = textInput('정답을 입력하세요' + (mode === 'practice' ? ' (Enter로 채점)' : ''));
      body.appendChild(inp);
      inp.addEventListener('input', () => { if (mode === 'exam') setStatus(inp.value.trim() ? '답변함' : ''); emit(); });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.isComposing && mode === 'practice') { e.preventDefault(); submit(); }
      });
      collectAnswered = () => inp.value.trim() !== '';
      grade = async () => matches(answers, inp.value);
      lock = () => { inp.readOnly = true; };
      answerNode = () => {
        const wrap = el('div');
        wrap.appendChild(el('p', '', `<b>정답:</b> ${answers.slice(0, 4).map(a => '<code>' + App.esc(a) + '</code>').join(' 또는 ')}`));
        if (inp.value.trim()) wrap.appendChild(el('p', 'small muted', `내 답: <code>${App.esc(inp.value)}</code> (띄어쓰기·대소문자·따옴표·끝의 세미콜론은 무시하고 비교)`));
        return wrap;
      };
    }

    /* ---------- 서술형 ---------- */
    else if (q.type === 'essay') {
      const ta = el('textarea', 'q-textarea');
      ta.rows = 5;
      ta.placeholder = '답안을 서술하세요. (정의 → 특징/이유 → 예시 순서로 쓰면 좋아요)';
      body.appendChild(ta);
      ta.addEventListener('input', () => { if (mode === 'exam') setStatus(ta.value.trim() ? '답변함' : ''); emit(); });
      collectAnswered = () => ta.value.trim() !== '';
      grade = async () => null; // 스스로 채점
      lock = () => { ta.readOnly = true; };
      answerNode = () => {
        const wrap = el('div');
        wrap.appendChild(el('div', 'model', `<b>모범 답안</b><div>${App.inline(q.modelAnswer || '')}</div>`));
        if (q.keywords && q.keywords.length) {
          const resp = norm(ta.value);
          const kws = q.keywords.map(k => {
            const hit = resp && resp.includes(norm(k));
            return `<span class="kw ${hit ? 'hit' : ''}">${hit ? '✓' : '·'} ${App.esc(k)}</span>`;
          }).join('');
          wrap.appendChild(el('div', 'kws', `<b>채점 키워드</b> <span class="small muted">(내 답안에 들어간 키워드는 ✓)</span><div>${kws}</div>`));
        }
        if (Array.isArray(q.rubric) && q.rubric.length) wrap.appendChild(rubricNode(ta.value));
        else if (st.correct === null) wrap.appendChild(selfGrade());
        return wrap;
      };
    }

    /* ---------- 코드 작성 ---------- */
    else if (q.type === 'code') {
      const ta = el('textarea', 'code-input');
      ta.value = q.starter || '';
      ta.rows = Math.max(8, (q.starter || '').split('\n').length + 3);
      ta.setAttribute('aria-label', '코드 입력');
      body.appendChild(ta);
      const out = el('div', 'console q-console');
      out.hidden = true;
      body.appendChild(out);
      const execute = async withTests => {
        out.hidden = false;
        out.innerHTML = '';
        const res = await Runner.runHidden(
          { html: q.html || '', js: ta.value, tests: withTests ? q.tests : null },
          { onLog: l => App.appendLog(out, l) }
        );
        if (res.timedOut) App.appendLog(out, { level: 'warn', text: '⏱ 실행 시간이 너무 길어 중단했어요. 무한 반복이 없는지 확인하세요.' });
        if (!res.logs.length && !withTests) App.appendLog(out, { level: 'sys', text: '(출력 없음)' });
        return res;
      };
      App.enhanceEditor(ta, { onRun: () => execute(false) });
      ta.addEventListener('input', () => { if (mode === 'exam') setStatus(collectAnswered() ? '답변함' : ''); emit(); });
      actions.appendChild(btn('▶ 실행 (Ctrl+Enter)', '', () => execute(false)));
      let lastRes = null;
      collectAnswered = () => ta.value.trim() !== '' && ta.value.trim() !== (q.starter || '').trim();
      grade = async () => {
        lastRes = await execute(true);
        const tests = q.tests || [];
        return tests.length > 0 && lastRes.tests.length === tests.length && lastRes.tests.every(r => r.ok);
      };
      lock = () => { ta.readOnly = true; };
      answerNode = () => {
        const wrap = el('div');
        if (lastRes) {
          const ul = el('ul', 'test-list');
          (q.tests || []).forEach((t, i) => {
            const r = lastRes.tests[i];
            const li = el('li', r && r.ok ? 'ok' : 'bad', `${r && r.ok ? '✅' : '❌'} ${App.esc(t.name || t.expr)}`);
            if (r && !r.ok && r.info) li.appendChild(el('small', '', App.esc(r.info)));
            if (!r) li.appendChild(el('small', '', '실행되지 않음 (코드에 오류가 있는지 확인하세요)'));
            ul.appendChild(li);
          });
          wrap.appendChild(el('b', '', '테스트 결과'));
          wrap.appendChild(ul);
        }
        if (q.solution) {
          wrap.appendChild(el('div', 'model', '<b>모범 코드</b>'));
          wrap.appendChild(codeBlock(q.solution, 'js'));
        }
        return wrap;
      };
    }

    else {
      body.appendChild(el('p', 'muted', '지원하지 않는 문제 유형입니다: ' + App.esc(q.type)));
    }

    function applyResultStyle() {
      card.classList.remove('is-correct', 'is-wrong');
      if (st.correct === true) { card.classList.add('is-correct'); setStatus('정답', 'ok'); }
      else if (st.correct === false) { card.classList.add('is-wrong'); setStatus('오답', 'bad'); }
      else setStatus('채점 대기', 'wait');
      const r = fb.querySelector('.result');
      if (r) {
        r.className = 'result ' + (st.correct === true ? 'ok' : st.correct === false ? 'bad' : 'wait');
        r.textContent = st.correct === true ? '⭕ 정답입니다!' : st.correct === false ? '❌ 오답입니다.' : '📝 모범 답안과 비교해서 스스로 채점하세요.';
      }
    }

    function reveal() {
      if (st.revealed) return;
      st.revealed = true;
      fb.hidden = false;
      fb.innerHTML = '';
      fb.appendChild(el('div', 'result'));
      fb.appendChild(answerNode());
      if (q.explanation) fb.appendChild(el('div', 'expl', `<b>해설</b> ${App.inline(q.explanation)}`));
      if (q.easy) fb.appendChild(el('div', 'extra', `💡 <b>쉽게 이해하기</b> ${App.inline(q.easy)}`));
      if (q.reviewNote) fb.appendChild(el('div', 'review-note small muted', `🔧 검토 메모: ${App.inline(q.reviewNote)}`));
      if (q.type === 'short' && st.correct === false) {
        const ov = btn('내 답도 맞는 표현이에요 → 정답 처리', 'btn-sm');
        ov.style.marginTop = '10px';
        ov.addEventListener('click', () => {
          st.correct = true;
          App.Progress.override(q.id);
          ov.remove();
          applyResultStyle();
          emit();
        });
        fb.appendChild(ov);
      }
      applyResultStyle();
    }

    async function submit() {
      if (st.submitted) return;
      if (!collectAnswered()) {
        if (q.type === 'mc' || q.type === 'short') { App.toast(q.type === 'mc' ? '먼저 보기를 선택하세요' : '먼저 답을 입력하세요'); return; }
        if (!confirm('답을 작성하지 않았어요. 그래도 채점할까요? (오답으로 기록될 수 있어요)')) return;
      }
      st.submitted = true;
      lock();
      actions.querySelectorAll('button').forEach(b => { if (!b.dataset.keep) b.disabled = true; });
      setStatus('채점 중…');
      const ok = await grade();
      st.correct = ok;
      if (ok !== null) App.Progress.record(q.id, ok);
      reveal();
      emit();
    }

    function giveUp() {
      if (st.submitted) return;
      if (!confirm('아직 풀지 않았어요. 정답을 보면 이 문제는 오답으로 기록됩니다. 정답을 볼까요?')) return;
      st.submitted = true;
      lock();
      actions.querySelectorAll('button').forEach(b => { b.disabled = true; });
      st.correct = false;
      App.Progress.record(q.id, false);
      reveal();
      emit();
    }

    // 시험 모드 일괄 채점용
    async function finalize() {
      if (st.submitted) return;
      st.submitted = true;
      lock();
      actions.querySelectorAll('button').forEach(b => { b.disabled = true; });
      let ok;
      if (collectAnswered()) ok = await grade();
      else ok = false;
      st.correct = ok;
      if (ok !== null) App.Progress.record(q.id, ok);
      reveal();
    }

    if (mode === 'practice') {
      const selfCheck = q.type === 'essay' || (q.type === 'short' && !q.answers && !q.blanks && q.modelAnswer);
      actions.appendChild(btn(selfCheck ? '답안 제출 → 모범 답안 보기' : '채점하기', 'btn-primary', submit));
      actions.appendChild(btn('모르겠어요 (정답 보기)', 'btn-ghost', giveUp));
    }

    const api = {
      el: card, q, state: st, submit, finalize, reveal,
      isAnswered: () => collectAnswered()
    };
    return api;
  }

  function renderSet(container, qs, opts) {
    opts = opts || {};
    container.innerHTML = '';
    const ctrl = {
      cards: [],
      answeredCount() { return this.cards.filter(c => c.state.submitted || c.isAnswered()).length; },
      async gradeAll() {
        for (const c of this.cards) await c.finalize();
        return this.result();
      },
      result() {
        const r = { total: this.cards.length, correct: 0, wrong: 0, pending: 0 };
        this.cards.forEach(c => {
          if (c.state.correct === true) r.correct++;
          else if (c.state.correct === false) r.wrong++;
          else r.pending++;
        });
        return r;
      }
    };
    qs.forEach((q, i) => {
      const c = createCard(q, Object.assign({}, opts, {
        index: i,
        anchorId: (opts.anchorPrefix || 'q') + '-' + (i + 1),
        onChange: () => { if (opts.onChange) opts.onChange(ctrl, c); }
      }));
      container.appendChild(c.el);
      ctrl.cards.push(c);
    });
    return ctrl;
  }

  window.Quiz = { createCard, renderSet, TYPE_LABEL };
})();
