/* =========================================================
   코드 실행기: 샌드박스 iframe 안에서 사용자 코드를 실행하고
   console 출력 / 에러 / 테스트 결과를 postMessage로 받아온다.
   ========================================================= */
(function () {
  'use strict';
  let seq = 0;
  const TIMEOUT = 4000;

  /* iframe 안에서 실행될 훅 (toString()으로 주입되므로 바깥 변수를 참조하면 안 됨) */
  function hookBody(R, S, N) {
    function short(e) {
      try {
        let s = e.tagName.toLowerCase();
        if (e.id) s += '#' + e.id;
        if (e.classList && e.classList.length) s += '.' + Array.prototype.slice.call(e.classList).join('.');
        return s;
      } catch (x) { return 'node'; }
    }
    function ser(v, d, top) {
      d = d || 0;
      try {
        if (v === undefined) return 'undefined';
        if (v === null) return 'null';
        const t = typeof v;
        if (t === 'string') return top ? v : "'" + v + "'";
        if (t === 'number' || t === 'boolean') return String(v);
        if (t === 'bigint') return String(v) + 'n';
        if (t === 'symbol') return v.toString();
        if (t === 'function') {
          const src = Function.prototype.toString.call(v);
          if (/^class[\s{]/.test(src)) return 'class ' + (v.name || '');
          return 'ƒ ' + (v.name || '') + '()';
        }
        if (v === window) return 'Window';
        if (v === document) return '#document';
        if (v instanceof Error) return v.name + ': ' + v.message;
        if (v instanceof Element) {
          if (d > 0) return short(v);
          const h = v.outerHTML;
          return h.length > 600 ? h.slice(0, 600) + '…' : h;
        }
        if (v instanceof Node) return v.nodeName;
        if (v instanceof Event) {
          return (v.constructor && v.constructor.name || 'Event') + " {type: '" + v.type + "', target: " +
            (v.target && v.target.tagName ? short(v.target) : String(v.target)) + ', …}';
        }
        if (v instanceof NodeList || v instanceof HTMLCollection) {
          const items = Array.prototype.slice.call(v).map(x => x.nodeType === 1 ? short(x) : x.nodeName);
          return v.constructor.name + '(' + v.length + ') [' + items.join(', ') + ']';
        }
        if (v instanceof DOMTokenList) {
          return 'DOMTokenList(' + v.length + ') [' + Array.prototype.slice.call(v).map(x => "'" + x + "'").join(', ') + "] value: '" + v.value + "'";
        }
        if (v instanceof CSSStyleDeclaration) {
          const props = [];
          for (let i = 0; i < v.length && i < 30; i++) props.push(v[i] + ": '" + v.getPropertyValue(v[i]) + "'");
          return 'CSSStyleDeclaration {' + props.join(', ') + (v.length > 30 ? ', …' : '') + '}';
        }
        if (d > 2) return Array.isArray(v) ? '[…]' : '{…}';
        if (Array.isArray(v)) return '[' + v.map(x => ser(x, d + 1)).join(', ') + ']';
        if (v instanceof Map) return 'Map(' + v.size + ') {' + Array.from(v).map(p => ser(p[0], d + 1) + ' => ' + ser(p[1], d + 1)).join(', ') + '}';
        if (v instanceof Set) return 'Set(' + v.size + ') {' + Array.from(v).map(x => ser(x, d + 1)).join(', ') + '}';
        const name = v.constructor && v.constructor.name;
        const keys = Object.keys(v);
        const body = keys.slice(0, 30).map(k => k + ': ' + ser(v[k], d + 1)).join(', ') + (keys.length > 30 ? ', …' : '');
        return (name && name !== 'Object' ? name + ' ' : '') + '{' + body + '}';
      } catch (x) { return String(v); }
    }
    window.__ser = function (v) { return ser(v, 0, false); };
    function send(type, payload) {
      try { parent.postMessage({ __jsstudy: R, type: type, payload: payload }, '*'); } catch (x) { /* noop */ }
    }
    ['log', 'info', 'warn', 'error', 'dir', 'table'].forEach(function (lv) {
      const orig = console[lv];
      console[lv] = function () {
        const text = Array.prototype.slice.call(arguments).map(a => ser(a, 0, true)).join(' ');
        send('log', { level: (lv === 'dir' || lv === 'table') ? 'log' : lv, text: text });
        if (orig) { try { orig.apply(console, arguments); } catch (x) { /* noop */ } }
      };
    });
    window.addEventListener('error', function (e) {
      let where = '';
      if (e.lineno) where = (e.lineno >= S && e.lineno < S + N) ? ' (JS ' + (e.lineno - S + 1) + '번째 줄)' : ' (HTML 안의 스크립트)';
      send('log', { level: 'error', text: '❌ ' + (e.message || 'Error') + where });
    });
    window.addEventListener('unhandledrejection', function (e) {
      send('log', { level: 'error', text: '❌ (Promise) ' + ser(e.reason, 0, true) });
    });
    const origAlert = window.alert;
    window.alert = function (m) {
      send('log', { level: 'info', text: '🔔 alert: ' + ser(m, 0, true) });
      try { if (origAlert) origAlert.call(window, m); } catch (x) { /* noop */ }
    };
    window.__report = function (name, ok, info) { send('test', { name: name, ok: ok, info: info }); };
    window.__done = function () { send('done', {}); };
  }

  /* 테스트 실행기 (iframe 안에서 실행) */
  function testsRunner(T) {
    T.forEach(function (t) {
      const name = t.name || t.expr;
      try {
        const v = (0, eval)(t.expr);
        __report(name, !!v, v ? null : '평가 결과: ' + __ser(v));
      } catch (e) {
        __report(name, false, (e && e.name) + ': ' + (e && e.message));
      }
    });
  }

  function escScript(s) { return String(s || '').replace(/<\/script/gi, '<\\/script'); }
  function escStyle(s) { return String(s || '').replace(/<\/style/gi, '<\\/style'); }

  function build(o, rid) {
    const libs = (o.libs || []).map(u => '<script src="' + u + '"><\/script>').join('\n');
    const css = '<style>body{font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;line-height:1.5;padding:12px;margin:0;color:#1b2232;background:#fff}\n' + escStyle(o.css) + '\n</style>';
    const js = escScript(o.js);
    const jsLines = js.split('\n').length;
    const head = (start) => '<!doctype html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n' + css +
      '\n<script>(' + hookBody.toString() + ')(' + JSON.stringify(rid) + ',' + start + ',' + jsLines + ');<\/script>\n' + libs +
      '\n</head>\n<body>\n' + (o.html || '') + '\n<script>\n';
    const start = head(0).split('\n').length;
    let doc = head(start) + js + '\n<\/script>\n';
    if (o.tests && o.tests.length) {
      doc += '<script>\n(' + testsRunner.toString() + ')(' + JSON.stringify(o.tests).replace(/<\//g, '<\\/') + ');\n<\/script>\n';
    }
    doc += '<script>setTimeout(function(){__done()},0)<\/script>\n</body>\n</html>';
    return doc;
  }

  function run(iframe, o, cb) {
    cb = cb || {};
    const rid = 'r' + (++seq) + '-' + Date.now();
    const res = { logs: [], tests: [], done: false, timedOut: false };
    if (iframe.__jsstudyOff) iframe.__jsstudyOff();
    return new Promise(resolve => {
      let timer;
      function onMsg(e) {
        const d = e.data;
        if (!d || d.__jsstudy !== rid || e.source !== iframe.contentWindow) return;
        if (d.type === 'log') { res.logs.push(d.payload); if (cb.onLog) cb.onLog(d.payload); }
        else if (d.type === 'test') { res.tests.push(d.payload); if (cb.onTest) cb.onTest(d.payload); }
        else if (d.type === 'done' && !res.done) { res.done = true; clearTimeout(timer); resolve(res); }
      }
      window.addEventListener('message', onMsg);
      iframe.__jsstudyOff = () => window.removeEventListener('message', onMsg);
      timer = setTimeout(() => { res.timedOut = true; resolve(res); }, o.timeout || TIMEOUT);
      iframe.srcdoc = build(o, rid);
    });
  }

  function runHidden(o, cb) {
    const f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts');
    f.className = 'runner-hidden';
    f.setAttribute('aria-hidden', 'true');
    f.tabIndex = -1;
    document.body.appendChild(f);
    return run(f, o, cb).then(res => {
      setTimeout(() => { if (f.__jsstudyOff) f.__jsstudyOff(); f.remove(); }, 1500);
      return res;
    });
  }

  window.Runner = { run, runHidden, build };
})();
