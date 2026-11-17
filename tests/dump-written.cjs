// 서술형·주관식·빈칸 변환 결과 요약 출력 (BLANKS=빈칸 자동채점, AUTO=단답 자동채점, SELF=스스로 채점)
// 사용: node tests/dump-written.cjs data/ai-questions.js [full]
const fs = require('fs'), vm = require('vm');
const ctx = {}; vm.runInNewContext(fs.readFileSync(process.argv[2], 'utf8').replace('window.AI_QUESTIONS', 'AI_QUESTIONS'), ctx);
const mode = process.argv[3];
for (const q of ctx.AI_QUESTIONS.filter(q => q.type !== 'mc')) {
  const sh = s => String(s).replace(/\n/g, '⏎');
  let s = `## ${q.id} [${q.topic}] ${q.type} ${q.blanks ? 'BLANKS' : q.answers ? 'AUTO' : 'SELF'}\n`;
  if (mode === 'full') { s += `Q: ${sh(q.question).slice(0, 150)}\n`; if (q.code) s += `C: ${sh(q.code).slice(0, 100)}\n`; }
  if (q.blanks) q.blanks.forEach(b => s += `  [${b.label}] ${JSON.stringify(b.answers)}\n`);
  if (q.answers) s += `  A ${JSON.stringify(q.answers)}\n`;
  if (q.modelAnswer) s += `  M ${sh(q.modelAnswer).slice(0, mode === 'full' ? 400 : 120)}\n`;
  if (q.template) s += `  T ${sh(q.template)}\n`;
  if (q.rubric) s += `  R ${q.rubric.map(r => r.points + ':' + r.text.slice(0, 40)).join(' | ')} (sum ${q.rubric.reduce((a, r) => a + r.points, 0)})\n`;
  if (q.explanation) s += `  E ${sh(q.explanation).slice(0, 80)}\n`;
  process.stdout.write(s);
}
