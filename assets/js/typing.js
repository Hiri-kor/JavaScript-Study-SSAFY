/* =========================================================
   코드 따라치기: 교안 코드를 그대로 타이핑하며 손에 익히기
   ========================================================= */
(function () {
  'use strict';
  let modal, targetEl, input, statsEl, doneEl, target = '', spans = [], startAt = 0, lang = 'js', lastFocus = null;

  function normalize(code) {
    return code.replace(/\t/g, '  ').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
  }

  function build() {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', '코드 따라치기');
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3>⌨ 코드 따라치기</h3>
          <button type="button" class="icon-btn" data-act="close" aria-label="닫기">✕</button>
        </div>
        <p class="small muted" style="margin:6px 0 0">위 코드를 아래 칸에 그대로 입력해 보세요. 줄을 바꾸면 다음 줄 들여쓰기가 자동으로 들어갑니다.<span class="kbd-hint"> <kbd>Tab</kbd>은 공백 2칸입니다.</span> 붙여넣기는 막혀 있어요.</p>
        <div class="typing-stats"></div>
        <pre class="typing-target"></pre>
        <textarea class="code-input typing-input" rows="10" aria-label="따라칠 코드 입력"></textarea>
        <div class="typing-done" hidden></div>
        <div class="modal-foot">
          <button type="button" class="btn" data-act="restart">다시 하기</button>
          <button type="button" class="btn" data-act="run">▶ 입력한 코드 연습장에서 실행</button>
          <button type="button" class="btn btn-ghost" data-act="close">닫기 (Esc)</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    targetEl = modal.querySelector('.typing-target');
    input = modal.querySelector('.typing-input');
    statsEl = modal.querySelector('.typing-stats');
    doneEl = modal.querySelector('.typing-done');

    modal.addEventListener('click', e => {
      if (e.target === modal) close();
      const act = e.target.closest('[data-act]');
      if (!act) return;
      if (act.dataset.act === 'close') close();
      if (act.dataset.act === 'restart') reset();
      if (act.dataset.act === 'run') {
        const key = lang === 'html' ? 'html' : lang === 'css' ? 'css' : 'js';
        App.openPlayground({ [key]: input.value });
      }
    });
    document.addEventListener('keydown', e => { if (!modal.hidden && e.key === 'Escape') close(); });
    input.addEventListener('paste', e => { e.preventDefault(); App.toast('따라치기에서는 붙여넣기를 쓸 수 없어요'); });
    input.addEventListener('drop', e => e.preventDefault());
    input.addEventListener('keydown', e => {
      if (e.isComposing) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        input.setRangeText('  ', input.selectionStart, input.selectionEnd, 'end');
        update();
      } else if (e.key === 'Enter') {
        // 원본 코드의 다음 줄 들여쓰기를 그대로 넣어 준다
        e.preventDefault();
        const before = input.value.slice(0, input.selectionStart);
        const lineIdx = (before.match(/\n/g) || []).length + 1;
        const nextLine = target.split('\n')[lineIdx] || '';
        const indent = (nextLine.match(/^ */) || [''])[0];
        input.setRangeText('\n' + indent, input.selectionStart, input.selectionEnd, 'end');
        update();
      }
    });
    input.addEventListener('input', update);
    App.symbolBar(input);
  }

  function renderTarget() {
    targetEl.innerHTML = '';
    spans = [];
    const frag = document.createDocumentFragment();
    for (const ch of target) {
      const s = document.createElement('span');
      if (ch === '\n') { s.className = 'nl'; s.textContent = '↵\n'; } else { s.textContent = ch; }
      frag.appendChild(s);
      spans.push(s);
    }
    targetEl.appendChild(frag);
  }

  function update() {
    const typed = input.value;
    const chars = Array.from(target);
    const typedChars = Array.from(typed);
    if (!startAt && typed.length) startAt = Date.now();
    let errors = 0;
    let curSpan = null;
    for (let i = 0; i < spans.length; i++) {
      const base = chars[i] === '\n' ? 'nl' : '';
      let cls = base;
      if (i < typedChars.length) {
        const ok = typedChars[i] === chars[i];
        if (!ok) errors++;
        cls = (base ? base + ' ' : '') + (ok ? 'ok' : 'bad');
      } else if (i === typedChars.length) {
        cls = (base ? base + ' ' : '') + 'cur';
        curSpan = spans[i];
      }
      spans[i].className = cls;
    }
    const extra = Math.max(0, typedChars.length - chars.length);
    errors += extra;
    const progress = Math.min(100, Math.round(Math.min(typedChars.length, chars.length) / chars.length * 100));
    const acc = typedChars.length ? Math.max(0, Math.round((typedChars.length - errors) / typedChars.length * 100)) : 100;
    const sec = startAt ? Math.max(1, Math.round((Date.now() - startAt) / 1000)) : 0;
    const cpm = sec ? Math.round(typedChars.length / sec * 60) : 0;
    statsEl.innerHTML = `<span>진행 <b>${progress}%</b></span><span>정확도 <b>${acc}%</b></span><span>틀린 글자 <b>${errors}</b></span><span>시간 <b>${sec}s</b></span><span>속도 <b>${cpm}</b>타/분</span>`;
    if (curSpan) {
      const top = curSpan.offsetTop - targetEl.offsetTop;
      if (top < targetEl.scrollTop || top > targetEl.scrollTop + targetEl.clientHeight - 30) targetEl.scrollTop = Math.max(0, top - 60);
    }
    if (typed === target) {
      doneEl.hidden = false;
      doneEl.textContent = `🎉 완성! ${sec}초, 분당 ${cpm}타. 손으로 쳐 본 코드는 오래 기억에 남아요.`;
    } else {
      doneEl.hidden = true;
    }
  }

  function reset() {
    input.value = '';
    startAt = 0;
    update();
    input.focus();
  }

  function open(code, opts) {
    if (!modal) build();
    lastFocus = document.activeElement;
    lang = (opts && opts.lang) || 'js';
    target = normalize(code);
    renderTarget();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    reset();
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.Typing = { open, close };
})();
