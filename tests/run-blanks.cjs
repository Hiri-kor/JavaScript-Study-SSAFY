// 빈칸 문제의 정답을 코드에 끼워 넣어 실행하고, 주석의 기대 출력과 나란히 보여 줌
// 사용: node tests/run-blanks.cjs data/ai-questions.js
const fs = require('fs'), vm = require('vm'), util = require('util');
const ctx = {}; vm.runInNewContext(fs.readFileSync(process.argv[2], 'utf8').replace('window.AI_QUESTIONS', 'AI_QUESTIONS'), ctx);
for (const q of ctx.AI_QUESTIONS.filter(q => q.blanks && q.code)) {
  let code = q.code;
  if (/document|addEventListener|_\.|<\w/.test(code)) continue;
  const map = Object.fromEntries(q.blanks.map(b => [b.label, b.answers[0]]));
  code = code.replace(/\(\s*([A-Zㄱ-ㅎ])\s*\)/g, (m, l) => (l in map ? map[l] : m));
  const out = [];
  const c = { log: (...a) => out.push(a.map(x => typeof x === 'string' ? x : util.inspect(x, { depth: 4 })).join(' ')) };
  let err = '';
  try { vm.runInNewContext(code + (q.id === 'ai-1112-b13' ? "\ncalculateCartTotal([{price:30000,quantity:2}])" : ''), { console: c, setTimeout: f => f() }, { timeout: 500 }); } catch (e) { err = e.name + ': ' + e.message; }
  const expect = (q.code.match(/\/\/\s*(출력[^:]*:)?\s*([^\n]*)/g) || []).map(s => s.replace(/^\/\/\s*/, '')).filter(s => !/^[0-9]\.|^\d\)|이벤트|재할당|생성자|인스턴스|1\)|2\)/.test(s)).join(' ; ');
  console.log(`${q.id}: ${out.join(' | ')}${err ? ' !! ' + err : ''}\n    expect: ${expect.slice(0, 160)}`);
}
