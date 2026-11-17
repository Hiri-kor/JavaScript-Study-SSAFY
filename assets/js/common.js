/* =========================================================
   공통 기능: 저장소, 헤더, 테마, 마크다운 렌더링, 코드 블록 도구, 에디터
   ========================================================= */
(function () {
  'use strict';

  const ROOT = (document.body && document.body.dataset.root) || '.';
  const PREFIX = 'jsstudy:';

  /* ---------- 저장소 (localStorage, 실패해도 동작) ---------- */
  const Store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(PREFIX + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; } catch (e) { return false; }
    },
    remove(key) { try { localStorage.removeItem(PREFIX + key); } catch (e) { /* noop */ } }
  };

  /* ---------- 문자열 유틸 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  // 안전한 인라인 서식: HTML 이스케이프 후 `코드`, **굵게**, 줄바꿈만 지원
  // 짧은 마크다운(`코드`, ``코드 안의 ` ``, **굵게**, 줄바꿈)을 HTML로
  function inline(s) {
    s = String(s == null ? '' : s).replace(/\u0000/g, '');
    const codes = [];
    let text = '';
    let i = 0;
    let last = 0;
    while (i < s.length) {
      if (s[i] !== '`') { i++; continue; }
      let j = i;
      while (s[j] === '`') j++;
      const run = s.slice(i, j);
      let k = s.indexOf(run, j);
      while (k !== -1 && s[k + run.length] === '`') k = s.indexOf(run, k + run.length + 1);
      if (k === -1) { i = j; continue; }
      let code = s.slice(j, k);
      if (code.length > 1 && code[0] === ' ' && code[code.length - 1] === ' ') code = code.slice(1, -1);
      text += s.slice(last, i) + '\u0000' + codes.length + '\u0000';
      codes.push('<code>' + esc(code) + '</code>');
      i = last = k + run.length;
    }
    text += s.slice(last);
    return esc(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/\u0000(\d+)\u0000/g, (_, n) => codes[n]);
  }
  function url(p) { return ROOT + '/' + p; }

  function b64encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64decode(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  /* ---------- 주제 / 문제 데이터 ---------- */
  function topics() { return window.TOPICS || []; }
  function topic(id) { return topics().find(t => t.id === id); }
  function isAI(q) { return q && String(q.source || '').startsWith('AI'); }
  function allQuestions() {
    const seen = new Set();
    const out = [];
    const add = (q, src) => {
      if (!q || !q.id || seen.has(q.id)) return;
      seen.add(q.id);
      out.push(Object.assign({ source: src }, q));
    };
    (window.QUESTIONS || []).forEach(q => add(q, '확인 문제'));
    (window.AI_QUESTIONS || []).forEach(q => add(Object.assign({}, q, { source: 'AI' }), 'AI'));
    Store.get('aiImported', []).forEach(q => add(Object.assign({}, q, { source: 'AI' }), 'AI'));
    return out;
  }

  /* ---------- 학습 기록 ---------- */
  const Progress = {
    stats() { return Store.get('stats', {}); },
    record(id, ok) {
      const s = this.stats();
      const r = s[id] || { tries: 0, correct: 0 };
      r.tries += 1;
      if (ok) r.correct += 1;
      r.last = !!ok;
      r.at = Date.now();
      s[id] = r;
      Store.set('stats', s);
      const w = new Set(Store.get('wrong', []));
      if (ok) w.delete(id); else w.add(id);
      Store.set('wrong', Array.from(w));
    },
    // 단답형에서 "내 답도 정답" 처리
    override(id) {
      const s = this.stats();
      const r = s[id];
      if (r && r.last === false) { r.correct += 1; r.last = true; Store.set('stats', s); }
      const w = new Set(Store.get('wrong', []));
      w.delete(id);
      Store.set('wrong', Array.from(w));
    },
    wrong() { return Store.get('wrong', []); },
    doneTopics() { return Store.get('doneTopics', []); },
    setDone(id, done) {
      const d = new Set(this.doneTopics());
      if (done) d.add(id); else d.delete(id);
      Store.set('doneTopics', Array.from(d));
    },
    reset() { ['stats', 'wrong', 'doneTopics', 'examHistory'].forEach(k => Store.remove(k)); }
  };

  /* ---------- 테마 ---------- */
  function currentTheme() {
    const t = document.documentElement.dataset.theme;
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    Store.set('theme', next);
    const btn = document.querySelector('.theme-btn');
    if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  }

  /* ---------- 헤더 / 푸터 ---------- */
  function renderHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    header.className = 'site-header';
    const page = document.body.dataset.page || '';
    const curTopic = document.body.dataset.topic || '';
    const links = [
      ['summary.html', '시험 직전 개념', 'summary'],
      ['exam.html', '시험 직전 문제', 'exam'],
      ['ai.html', 'AI 문제', 'ai'],
      ['playground.html', '코드 연습장', 'playground']
    ];
    const topicLinks = topics().map(t =>
      `<a href="${url('topics/' + t.id + '.html')}" class="${t.id === curTopic ? 'active' : ''}"><span class="num">${String(t.no).padStart(2, '0')}</span>${esc(t.title)}</a>`
    ).join('');
    header.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="${url('index.html')}"><span class="brand-logo">JS</span><span>시험 대비 노트</span></a>
        <button class="icon-btn nav-toggle" type="button" aria-label="메뉴 열기">☰</button>
        <nav class="nav-links" aria-label="주 메뉴">
          <details class="nav-topics"><summary class="${page === 'topic' ? 'active' : ''}">주제별 학습</summary><div class="nav-menu">${topicLinks}</div></details>
          ${links.map(([href, label, key]) => `<a href="${url(href)}" class="${page === key ? 'active' : ''}">${label}</a>`).join('')}
        </nav>
        <button class="icon-btn theme-btn" type="button" aria-label="다크 모드 전환">${currentTheme() === 'dark' ? '☀️' : '🌙'}</button>
      </div>`;
    header.querySelector('.theme-btn').addEventListener('click', toggleTheme);
    const toggle = header.querySelector('.nav-toggle');
    const setOpen = open => {
      header.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setOpen(!header.classList.contains('open')));
    const det = header.querySelector('.nav-topics');
    document.addEventListener('click', e => {
      if (det.open && !det.contains(e.target)) det.open = false;
      if (header.classList.contains('open') && !header.contains(e.target)) setOpen(false);
    });
    header.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { setOpen(false); det.open = false; } });
  }
  function renderFooter() {
    if (document.querySelector('.site-footer')) return;
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = '개인 학습용 페이지 · 학습 기록은 이 브라우저에만 저장됩니다.';
    document.body.appendChild(f);
  }

  /* ---------- 토스트 / 복사 ---------- */
  let toastTimer;
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (err) { /* noop */ }
      ta.remove();
    }
    toast('복사했어요');
  }

  /* ---------- 마크다운 ---------- */
  async function fetchText(path) {
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status + ' ' + path);
    return res.text();
  }
  function loadErrorHtml(err) {
    const isFile = location.protocol === 'file:';
    return `<div class="error-box"><b>내용을 불러오지 못했어요.</b><p class="small">${esc(err && err.message)}</p>` +
      (isFile ? '<p class="small">파일을 더블클릭해서 열면(file://) 브라우저가 본문 파일 읽기를 막습니다. 폴더에서 <code>python -m http.server</code>를 실행한 뒤 <code>http://localhost:8000</code>으로 접속하거나, VS Code의 Live Server로 열어 주세요. GitHub Pages에 배포하면 그대로 동작합니다.</p>' : '') +
      '</div>';
  }
  function slugify(t) {
    return t.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';
  }
  function renderMarkdown(md, container) {
    if (!window.marked) {
      container.innerHTML = '<div class="error-box">마크다운 라이브러리(marked)를 불러오지 못했어요. 인터넷 연결을 확인해 주세요.</div>';
      return;
    }
    container.innerHTML = window.marked.parse(md, { gfm: true });
    postProcess(container);
  }
  const CALLOUTS = [['💡', 'callout-easy'], ['📌', 'callout-tip'], ['⚠', 'callout-warn'], ['📝', 'callout-def'], ['📖', 'callout-extra']];
  function postProcess(c) {
    const used = {};
    c.querySelectorAll('h1, h2, h3, h4').forEach(h => {
      let s = slugify(h.textContent);
      const base = s;
      let i = 2;
      while (used[s]) s = base + '-' + (i++);
      used[s] = true;
      h.id = s;
    });
    c.querySelectorAll('blockquote').forEach(b => {
      const t = b.textContent.trim();
      const hit = CALLOUTS.find(([mark]) => t.startsWith(mark));
      b.classList.add('callout');
      if (hit) b.classList.add(hit[1]);
    });
    c.querySelectorAll('table').forEach(t => {
      const w = document.createElement('div');
      w.className = 'table-wrap';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
    c.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
    c.querySelectorAll('pre > code').forEach(enhanceCodeBlock);
  }

  const LANG_LABEL = { js: 'JavaScript', javascript: 'JavaScript', html: 'HTML', css: 'CSS', python: 'Python', text: '텍스트', console: '실행 결과' };
  function enhanceCodeBlock(code) {
    const pre = code.parentElement;
    const m = (code.className || '').match(/language-([\w-]+)/);
    const lang = m ? m[1] : '';
    const raw = code.textContent.replace(/\n$/, '');
    if (window.hljs && lang && window.hljs.getLanguage(lang)) {
      try { window.hljs.highlightElement(code); } catch (e) { /* noop */ }
    }
    const wrap = document.createElement('div');
    wrap.className = 'code-block';
    pre.parentNode.insertBefore(wrap, pre);
    const bar = document.createElement('div');
    bar.className = 'code-bar';
    bar.innerHTML = `<span class="code-lang">${esc(LANG_LABEL[lang] || lang || '코드')}</span><span class="code-actions"></span>`;
    const actions = bar.querySelector('.code-actions');
    const addBtn = (label, title, fn) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label; b.title = title;
      b.addEventListener('click', fn);
      actions.appendChild(b);
    };
    addBtn('복사', '코드 복사', () => copyText(raw));
    if (lang !== 'console' && lang !== 'text') {
      addBtn('⌨ 따라치기', '이 코드를 직접 타이핑해 보기', () => window.Typing && window.Typing.open(raw, { lang }));
    }
    const runLang = { js: 'js', javascript: 'js', html: 'html', css: 'css' }[lang];
    if (runLang) {
      addBtn('▶ 연습장에서 실행', '코드 연습장에서 열어 실행하기', () => openPlayground({ [runLang]: raw }));
    }
    wrap.appendChild(bar);
    wrap.appendChild(pre);
  }

  function playgroundUrl(obj) {
    return url('playground.html') + '#p=' + b64encode(JSON.stringify(obj));
  }
  function openPlayground(obj) {
    window.open(playgroundUrl(obj), '_blank', 'noopener');
  }

  /* ---------- 터치 기기용 기호 입력 줄 (화면 키보드에 없는 Tab, 괄호 등) ---------- */
  const SYMBOLS = [['⇥', '  ', '들여쓰기(공백 2칸)'], ['{'], ['}'], ['('], [')'], ['['], [']'], [';'], ["'"], ['"'], ['`'], ['='], ['=>', ' => '],
    ['.'], [','], [':'], ['<'], ['>'], ['/'], ['$'], ['+'], ['!'], ['&'], ['|'], ['_']];
  function symbolBar(ta) {
    if (!ta || !ta.parentNode || ta.previousElementSibling && ta.previousElementSibling.classList.contains('symbol-bar')) return null;
    const bar = document.createElement('div');
    bar.className = 'symbol-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', '기호 입력');
    SYMBOLS.forEach(([label, text, title]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.tabIndex = -1;
      b.title = title || label + ' 입력';
      // 버튼을 눌러도 입력창 포커스(화면 키보드)가 유지되도록
      b.addEventListener('pointerdown', e => e.preventDefault());
      b.addEventListener('mousedown', e => e.preventDefault());
      b.addEventListener('click', () => {
        if (ta.readOnly || ta.disabled) return;
        ta.setRangeText(text || label, ta.selectionStart, ta.selectionEnd, 'end');
        ta.focus();
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      });
      bar.appendChild(b);
    });
    ta.parentNode.insertBefore(bar, ta);
    return bar;
  }

  /* ---------- 코드 입력용 textarea 보조 ---------- */
  function enhanceEditor(ta, opts) {
    opts = opts || {};
    if (opts.symbols !== false) symbolBar(ta);
    ta.spellcheck = false;
    ta.setAttribute('autocapitalize', 'off');
    ta.setAttribute('autocomplete', 'off');
    ta.setAttribute('autocorrect', 'off');
    ta.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (opts.onRun) opts.onRun();
        return;
      }
      if (e.isComposing) return;
      const s = ta.selectionStart;
      const v = ta.value;
      if (e.key === 'Tab') {
        e.preventDefault();
        const lineStart = v.lastIndexOf('\n', s - 1) + 1;
        if (e.shiftKey) {
          const lead = v.slice(lineStart).match(/^ {1,2}/);
          if (lead) {
            ta.setRangeText('', lineStart, lineStart + lead[0].length, 'preserve');
            const p = Math.max(lineStart, s - lead[0].length);
            ta.setSelectionRange(p, p);
          }
        } else {
          ta.setRangeText('  ', s, ta.selectionEnd, 'end');
        }
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }
      if (e.key === 'Enter' && !opts.noAutoIndent) {
        const lineStart = v.lastIndexOf('\n', s - 1) + 1;
        const line = v.slice(lineStart, s);
        let indent = (line.match(/^[ \t]*/) || [''])[0];
        if (/[{([]\s*$/.test(line)) indent += '  ';
        e.preventDefault();
        ta.setRangeText('\n' + indent, s, ta.selectionEnd, 'end');
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  /* ---------- 콘솔 로그 출력 ---------- */
  function appendLog(container, payload) {
    const d = document.createElement('div');
    d.className = 'log log-' + (payload.level || 'log');
    d.textContent = payload.text;
    container.appendChild(d);
    container.scrollTop = container.scrollHeight;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function params() { return new URLSearchParams(location.search); }

  window.App = {
    ROOT, Store, Progress, esc, inline, url, b64encode, b64decode, topics, topic, allQuestions, isAI,
    toast, copyText, fetchText, loadErrorHtml, renderMarkdown, enhanceEditor, symbolBar, appendLog, playgroundUrl, openPlayground,
    shuffle, params
  };

  renderHeader();
  renderFooter();
})();
