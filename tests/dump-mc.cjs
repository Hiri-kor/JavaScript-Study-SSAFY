// AI 객관식 검토용 목록 출력 (순수 JS 코드는 실행 결과 >> 도 함께)
// 사용: node tests/dump-mc.cjs data/ai-questions.js > mc.txt
const fs = require('fs'), vm = require('vm'), util = require('util');
const src = fs.readFileSync(process.argv[2], 'utf8');
const ctx = {}; vm.runInNewContext(src.replace('window.AI_QUESTIONS', 'AI_QUESTIONS'), ctx);
const qs = ctx.AI_QUESTIONS.filter(q => q.type === 'mc');
function run(code) {
  if (/document|window|addEventListener|setTimeout|_\.|<\w/.test(code)) return null;
  const out = [];
  const c = { log: (...a) => out.push(a.map(x => typeof x === 'string' ? x : util.inspect(x, { depth: 4 })).join(' ')) };
  try { vm.runInNewContext(code, { console: c }, { timeout: 500 }); } catch (e) { out.push('!! ' + e.name + ': ' + e.message); }
  return out.join(' | ');
}
const K = 'abcd';
for (const q of qs) {
  let s = `## ${q.id} [${q.topic}] ${q.question.replace(/\n/g, ' / ')}\n`;
  const codes = q.code ? [q.code] : (q.codes || []).map(c => c.code);
  codes.forEach(c => { s += '```\n' + c + '\n```\n'; const r = run(c); if (r !== null) s += `>> ${r}\n`; });
  q.options.forEach((o, i) => { s += `${i === q.answer ? '*' : ' '}${K[i]}) ${o.replace(/\n/g, '⏎')}\n`; });
  s += `E: ${q.explanation || ''}\n`;
  process.stdout.write(s);
}
