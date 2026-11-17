"""
ai_problems/*.md (AI로 만든 문제)를 읽어 data/ai-questions.js 로 변환합니다.
- 객관식: 아래 FILES / 서술형·주관식·빈칸: WRITTEN (형식은 tools/ai_written.py 참고)
- 검토 후 고친 내용: tools/ai_fixes.py (원본 md는 그대로 두고 변환할 때 덮어씀)

사용법 (저장소 루트에서):
    python tools/import_ai_problems.py

- 문제 줄:   **12. 문제 내용**
- 보기 줄:   ①~④ / a)~d) / 1)~4)  (보기 표시만 있는 줄 다음에 코드 블록이 오면 코드 보기)
- 정답:      "## 정답 및 해설" 아래
             12. **③** / 12. **정답: b** / 12. **③ 보기 내용** / | **12** | **3** | 해설 |
- 해설:      - **해설**: … 또는 - **해설:** …
새 파일을 추가했다면 아래 FILES 에 파일 이름과 주제 배치 규칙을 추가하세요.
"""
import json
import re
import sys
from pathlib import Path

from ai_written import parse_file
from ai_fixes import apply_fixes

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'ai_problems'
OUT = ROOT / 'data' / 'ai-questions.js'


def ranges(*pairs):
    """[(시작, 끝, 주제), ...] → 문항 번호로 주제를 찾는 함수"""
    def pick(n):
        for a, b, topic in pairs:
            if a <= n <= b:
                return topic
        raise ValueError(f'문항 {n}의 주제 배치 규칙이 없습니다')
    return pick


# 파일 이름: (id 접두어, 표시 이름, 주제 배치)
FILES = {
    'javascript_dom_50.md': ('ai-1111', 'DOM 50제', ranges(
        (1, 10, '01-history'), (11, 20, '02-variables'), (21, 42, '08-dom'), (43, 50, '02-variables'))),
    'javascript_50.md': ('ai-1112', 'Basic Syntax 01 50제', ranges(
        (1, 22, '03-types-operators'), (23, 36, '04-control'), (37, 50, '05-functions'))),
    'javascript_02_50.md': ('ai-1116', 'Basic Syntax 02 50제', ranges(
        (1, 24, '06-objects'), (25, 28, '07-arrays'), (29, 31, '05-functions'),
        (32, 46, '07-arrays'), (47, 49, '06-objects'), (50, 50, '07-arrays'))),
    'javascript_50 (1).md': ('ai-1117', 'Controlling Event 50제', ranges(
        (1, 50, '09-events'))),
}

# 서술형/주관식/빈칸: 파일 이름: (id 접두어, 표시 이름, 종류, 주제 배치)
WRITTEN = {
    'javascript_dom_10.md': ('ai-1111-e', 'DOM 서술 10제', 'essay', ranges(
        (1, 2, '01-history'), (3, 4, '02-variables'), (5, 9, '08-dom'), (10, 10, '02-variables'))),
    'javascript_dom_20.md': ('ai-1111-s', 'DOM 주관식 20제', 'subj', ranges(
        (1, 2, '01-history'), (3, 4, '02-variables'), (5, 16, '08-dom'), (17, 20, '02-variables'))),
    'javascript_dom_20 (1).md': ('ai-1111-b', 'DOM 빈칸 20제', 'blank', ranges(
        (1, 3, '02-variables'), (4, 17, '08-dom'), (18, 20, '02-variables'))),
    'javascript_10.md': ('ai-1112-e', 'Basic Syntax 01 서술 10제', 'essay', ranges(
        (1, 4, '03-types-operators'), (5, 7, '04-control'), (8, 10, '05-functions'))),
    'javascript_20 (1).md': ('ai-1112-s', 'Basic Syntax 01 주관식 20제', 'subj', ranges(
        (1, 8, '03-types-operators'), (9, 14, '04-control'), (15, 20, '05-functions'))),
    'javascript_20 (2).md': ('ai-1112-b', 'Basic Syntax 01 빈칸 20제', 'blank', ranges(
        (1, 7, '03-types-operators'), (8, 13, '04-control'), (14, 20, '05-functions'))),
    'javascript_02_10.md': ('ai-1116-e', 'Basic Syntax 02 서술 10제', 'essay', ranges(
        (1, 4, '06-objects'), (5, 5, '07-arrays'), (6, 6, '05-functions'), (7, 10, '07-arrays'))),
    'javascript_02_20.md': ('ai-1116-s', 'Basic Syntax 02 주관식 20제', 'subj', ranges(
        (1, 8, '06-objects'), (9, 10, '07-arrays'), (11, 12, '05-functions'), (13, 19, '07-arrays'),
        (20, 20, '06-objects'))),
    'javascript_02_20 (1).md': ('ai-1116-b', 'Basic Syntax 02 빈칸 20제', 'blank', ranges(
        (1, 10, '06-objects'), (11, 11, '07-arrays'), (12, 12, '05-functions'), (13, 19, '07-arrays'),
        (20, 20, '06-objects'))),
    'javascript_10 (1).md': ('ai-1117-e', 'Controlling Event 서술 10제', 'essay', ranges((1, 10, '09-events'))),
    'javascript_20.md': ('ai-1117-s', 'Controlling Event 주관식 20제', 'subj', ranges((1, 20, '09-events'))),
    'javascript_20 (3).md': ('ai-1117-b', 'Controlling Event 빈칸 20제', 'blank', ranges((1, 20, '09-events'))),
}

MARK = {'①': 0, '②': 1, '③': 2, '④': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3, '1': 0, '2': 1, '3': 2, '4': 3}
Q_RE = re.compile(r'^\*\*(\d+)\.\s*(.+?)\s*$')
OPT_RE = re.compile(r'^(①|②|③|④|[a-d]\)|[1-4]\))\s*(.*)$')
FENCE_RE = re.compile(r'^```(\w*)\s*$')
ANS_RE = re.compile(r'^(\d+)\.\s*\*\*(?:정답\s*:\s*)?([①②③④a-d1-4])')
TABLE_RE = re.compile(r'^\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*([1-4①②③④a-d])\*\*\s*\|(.*)\|\s*$')
EXPL_RE = re.compile(r'^\s*-\s*\*\*해설\s*:?\s*\*\*\s*:?\s*(.*)$')


def clean(text):
    """LaTeX 수식 표기($6 \\times 3 = 18$)를 일반 텍스트로"""
    text = re.sub(r'\$([^$\n]+)\$', lambda m: m.group(1).replace('\\times', '×').replace('\\div', '÷')
                  .replace('\\rightarrow', '→').replace('\\leftarrow', '←').strip(), text)
    return text.strip()


def strip_bold(s):
    s = s.strip()
    if s.endswith('**'):
        s = s[:-2]
    return s.strip()


def parse_body(lines):
    questions = {}
    cur = None
    opt = None          # 현재 보기(코드 보기 대기 중일 수 있음)
    fence = None        # (lang, [lines], target)
    for line in lines:
        if fence is not None:
            if line.strip() == '```':
                lang, buf, target = fence
                code = '\n'.join(buf)
                if target == 'option':
                    opt['code'] = (lang or 'js', code)
                else:
                    cur['codes'].append({'lang': lang or 'js', 'code': code})
                fence = None
            else:
                fence[1].append(line)
            continue
        m = Q_RE.match(line)
        if m and line.startswith('**'):
            n = int(m.group(1))
            cur = {'n': n, 'text': strip_bold(m.group(2)), 'codes': [], 'options': []}
            questions[n] = cur
            opt = None
            continue
        if cur is None:
            continue
        if line.startswith('## ') or line.strip() == '---':
            cur, opt = None, None
            continue
        fm = FENCE_RE.match(line)
        if fm:
            target = 'option' if (opt is not None and not opt['text'] and 'code' not in opt) else 'question'
            fence = (fm.group(1), [], target)
            continue
        om = OPT_RE.match(line)
        if om:
            opt = {'text': om.group(2).strip()}
            cur['options'].append(opt)
            continue
        if line.startswith('>'):
            line = line.lstrip('>').strip()
        if line.strip():
            if opt is not None:
                opt['text'] = (opt['text'] + ' ' + line.strip()).strip()
            else:
                cur['text'] += '\n' + line.strip()
    return questions


def parse_key(lines):
    answers, expls = {}, {}
    last = None
    for line in lines:
        t = TABLE_RE.match(line)
        if t:
            n = int(t.group(1))
            answers[n] = MARK[t.group(2)]
            expls[n] = t.group(3).strip()
            last = None
            continue
        a = ANS_RE.match(line.strip())
        if a:
            last = int(a.group(1))
            answers[last] = MARK[a.group(2)]
            continue
        e = EXPL_RE.match(line)
        if e and last is not None:
            expls[last] = e.group(1).strip()
            continue
        if last is not None and last in expls and line.startswith('    ') and line.strip() and not line.strip().startswith('-'):
            expls[last] += ' ' + line.strip()
    return answers, expls


def option_string(o):
    if 'code' in o:
        lang, code = o['code']
        return f'```{lang}\n{code}\n```'
    return clean(o['text'])


def main():
    out, problems = [], []
    for name, (prefix, label, topic_of) in FILES.items():
        path = SRC / name
        if not path.exists():
            problems.append(f'{name}: 파일이 없습니다')
            continue
        lines = path.read_text(encoding='utf-8').splitlines()
        split = next(i for i, l in enumerate(lines) if l.startswith('## 정답'))
        qs = parse_body(lines[:split])
        answers, expls = parse_key(lines[split:])
        for n in sorted(qs):
            q = qs[n]
            if len(q['options']) != 4:
                problems.append(f'{name} {n}번: 보기가 {len(q["options"])}개')
            if n not in answers:
                problems.append(f'{name} {n}번: 정답이 없습니다')
                continue
            item = {
                'id': f'{prefix}-{n:02d}',
                'ref': f'{label} #{n}',
                'topic': topic_of(n),
                'type': 'mc',
                'question': clean(q['text']),
            }
            if len(q['codes']) == 1:
                item['code'] = q['codes'][0]['code']
                item['codeLang'] = q['codes'][0]['lang']
            elif q['codes']:
                item['codes'] = q['codes']
            item['options'] = [option_string(o) for o in q['options']]
            item['answer'] = answers[n]
            if n in expls:
                item['explanation'] = clean(expls[n])
            else:
                problems.append(f'{name} {n}번: 해설이 없습니다')
            out.append(item)
        missing = sorted(set(range(1, max(qs) + 1)) - set(qs))
        if missing:
            problems.append(f'{name}: 빠진 문항 {missing}')

    for name, (prefix, label, kind, topic_of) in WRITTEN.items():
        path = SRC / name
        if not path.exists():
            problems.append(f'{name}: 파일이 없습니다')
            continue
        items, probs = parse_file(path.read_text(encoding='utf-8'), kind)
        problems.extend(f'{name} {p}' for p in probs)
        for n, item in items.items():
            q = {'id': f'{prefix}{n:02d}', 'ref': f'{label} #{n}', 'topic': topic_of(n)}
            q.update(item)
            for k in ('question', 'modelAnswer', 'explanation'):
                if k in q:
                    q[k] = clean(q[k])
            for r in q.get('rubric', []):
                r['text'] = clean(r['text'])
            out.append(q)

    problems.extend(apply_fixes(out))

    # 규칙이 없는 md 파일 경고
    for path in sorted(SRC.glob('*.md')):
        if path.name not in FILES and path.name not in WRITTEN:
            problems.append(f'{path.name}: FILES 에 주제 배치 규칙이 없어 건너뛰었습니다')

    # ai.html "배포용 JSON 복사"로 저장한 JSON 파일 (형식은 이미 사이트 형식)
    used = {q['id'] for q in out}
    for path in sorted(SRC.glob('*.json')):
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
        except json.JSONDecodeError as e:
            problems.append(f'{path.name}: JSON 형식 오류 ({e})')
            continue
        if isinstance(data, dict):
            data = data.get('questions', [])
        for i, q in enumerate(data, 1):
            if not isinstance(q, dict) or 'topic' not in q or 'type' not in q or 'question' not in q:
                problems.append(f'{path.name} {i}번째: topic/type/question 이 필요합니다')
                continue
            if not q.get('id') or q['id'] in used:
                q['id'] = f'ai-{path.stem}-{i:02d}'
            q.pop('source', None)
            used.add(q['id'])
            out.append(q)

    header = (
        '/* =========================================================\n'
        '   AI로 생성한 문제\n'
        '   - 이 파일은 tools/import_ai_problems.py 가 ai_problems/*.md 에서 자동 생성합니다.\n'
        '     직접 고치기보다 원본 md를 고친 뒤 스크립트를 다시 실행하세요.\n'
        '   - ai.html 에서 브라우저로 가져온 문제는 이 파일과 별도로 브라우저에 저장됩니다.\n'
        '   - 형식: README.md 또는 ai.html 의 프롬프트 참고\n'
        '   ========================================================= */\n'
    )
    OUT.write_text(header + 'window.AI_QUESTIONS = ' + json.dumps(out, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print(f'{len(out)}문항을 {OUT.relative_to(ROOT)} 에 저장했습니다.')
    if problems:
        print('확인이 필요한 항목:')
        for p in problems:
            print(' -', p)
        sys.exit(1)


if __name__ == '__main__':
    main()
