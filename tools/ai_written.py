"""
서술형 / 주관식 / 빈칸 채우기 md 파일 파서 (import_ai_problems.py 에서 사용)

문제 부분
    **3. 문제 내용**            또는   ### 3. 문제 제목
    (설명 줄, 코드 블록)        - 답: / - ( A ): 처럼 ':' 로 끝나는 줄은 답안 칸이라 건너뜀
정답 부분 ("## 정답 …", "## [정답 …", "## 모범 답안 …" 아래)
    | **3** | 정답 | 해설 |                         (표 형식)
    3. **( A ): `x` / ( B ): `y`**  + - **해설**: …   (목록 형식)
    ### 3. 제목 / ### 3번 채점 기준                   (서술형: 모범 답안 + 배점표)
"""
import re

Q_RE = re.compile(r'^(?:\*\*|###\s*)(\d+)\.\s*(.*?)\s*$')
ANS_SPLIT_RE = re.compile(r'^##\s*\[?\s*(정답|모범)')
CHUNK_RE = re.compile(r'^(?:###\s*(\d+)\s*(?:\.|번)|(\d+)\.\s)')
TABLE_ROW_RE = re.compile(r'^\|\s*\*\*(\d+)\*\*\s*\|(.*)\|(.*)\|\s*$')
EXPL_RE = re.compile(r'^\s*[-*]\s*\*\*해설\s*:?\s*\*\*\s*:?\s*(.*)$')
MODEL_RE = re.compile(r'^\s*[-*]\s*\*\*모범\s*답안(?:\s*예시)?\s*:?\s*\*\*\s*:?\s*(.*)$')
RUBRIC_HEAD_RE = re.compile(r'^\s*[-*]\s*\*\*(?:키워드\s*)?(?:채점\s*기준|배점)')
RUBRIC_TABLE_RE = re.compile(r'^\s*\|(.+)\|\s*\**\s*(\d+)\s*점\s*\**\s*\|\s*$')
RUBRIC_BULLET_RE = re.compile(r'^\s*[-*]\s*(?:`\[(\d+)점\]`|\*\*\[(\d+)점\]\*\*|\[(\d+)점\])\s*(.*)$')
LABEL_RE = re.compile(r'`?\(\s*([A-Z]|[ㄱ-ㅎ]|[1-9])\s*\)`?\s*:?')
POINTS_RE = re.compile(r'\s*[\[(]\s*\d+\s*점\s*[\])]\s*')


# ---------------------------------------------------------------- 공통 유틸
def code_spans(s):
    """`code` / `` co`de `` 구간 목록: [(start, end, content)]"""
    out, i = [], 0
    while i < len(s):
        if s[i] == '`':
            j = i
            while j < len(s) and s[j] == '`':
                j += 1
            run = s[i:j]
            k = s.find(run, j)
            while k != -1 and (k + len(run) < len(s) and s[k + len(run)] == '`'):
                k = s.find(run, k + len(run) + 1)
            if k == -1:
                i = j
                continue
            content = s[j:k]
            if len(content) > 1 and content.startswith(' ') and content.endswith(' '):
                content = content[1:-1]
            out.append((i, k + len(run), content))
            i = k + len(run)
        else:
            i += 1
    return out


def unbold(s):
    return s.replace('**', '')


def plain(s):
    """코드 표시를 벗긴 일반 텍스트"""
    res, last = '', 0
    for a, b, c in code_spans(s):
        res += s[last:a] + c
        last = b
    return (res + s[last:]).strip()


def top_parens(s):
    """코드 밖의 최상위 괄호 그룹을 떼어 낸다 → (괄호 밖 텍스트, [괄호 안 텍스트…])"""
    spans = code_spans(s)
    in_code = set()
    for a, b, _ in spans:
        in_code.update(range(a, b))
    main, groups, depth, buf = '', [], 0, ''
    for i, ch in enumerate(s):
        if i not in in_code and ch == '(':
            depth += 1
            if depth == 1:
                buf = ''
                continue
        elif i not in in_code and ch == ')' and depth > 0:
            depth -= 1
            if depth == 0:
                groups.append(buf)
                continue
        if depth:
            buf += ch
        else:
            main += ch
    return main.strip(), groups


SENTENCE_RE = re.compile(r'(다\.|다$|때문|합니다|입니다|이며|하고,)')


def value_answers(v):
    """'`x` (또는 `y`)' 같은 한 칸의 정답 표현 → (허용 답안 목록, 자동 채점 가능 여부)"""
    v = unbold(v).strip().strip('/,•').strip()
    main, groups = top_parens(v)
    main = main.strip().rstrip('.,').strip()
    spans = code_spans(main)
    answers = []
    outside = main
    for a, b, _ in reversed(spans):
        outside = outside[:a] + outside[b:]
    outside = outside.replace(',', '').replace('→', '').replace('➔', '').strip()
    if spans and not outside:
        if len(spans) > 1:
            return [], False          # 여러 값을 순서대로 쓰는 답 → 자가 채점
        answers.append(spans[0][2])
    elif main:
        if SENTENCE_RE.search(main) or len(plain(main)) > 40:
            return [], False
        answers.append(plain(main))
    else:
        return [], False
    for g in groups:
        g = re.sub(r'^또는\s*', '', g.strip())
        sp = code_spans(g)
        if sp:                                   # 괄호 안에 코드가 있으면 코드만 허용 답안으로
            answers.extend(c for _, _, c in sp)
            continue
        for piece in re.split(r'\s*/\s*|\s*,\s*|\s+또는\s+', g):
            piece = piece.strip()
            if piece and len(piece) <= 30 and not SENTENCE_RE.search(piece):
                answers.append(piece)
    full = plain(v)
    if full and len(full) <= 60 and '또는' not in full and full not in answers:
        answers.append(full)
    seen, uniq = set(), []
    for a in answers:
        a = a.strip()
        if a and a not in seen:
            seen.add(a)
            uniq.append(a)
    return uniq, bool(uniq)


def split_top(t):
    """코드·괄호 밖의 ' / ' 와 줄바꿈으로만 나눈다"""
    in_code = set()
    for a, b, _ in code_spans(t):
        in_code.update(range(a, b))
    parts, buf, depth, i = [], '', 0, 0
    while i < len(t):
        ch = t[i]
        if i not in in_code:
            if ch == '(':
                depth += 1
            elif ch == ')' and depth:
                depth -= 1
            elif depth == 0 and (ch == '\n' or t.startswith(' / ', i)):
                parts.append(buf)
                buf = ''
                i += 1 if ch == '\n' else 3
                continue
        buf += ch
        i += 1
    parts.append(buf)
    return parts


def table_cells(line):
    """| a | b | c | → ['a', 'b', 'c'] (코드 안의 | 는 무시)"""
    line = line.strip()
    in_code = set()
    for a, b, _ in code_spans(line):
        in_code.update(range(a, b))
    cells, buf = [], ''
    for i, ch in enumerate(line):
        if ch == '|' and i not in in_code:
            cells.append(buf)
            buf = ''
        else:
            buf += ch
    cells.append(buf)
    return [c.strip() for c in cells[1:-1]]


def parse_blanks(text):
    """정답 문자열 → blanks [{label, answers}] 또는 None(자가 채점)"""
    t = unbold(text).replace('<br>', '\n')
    t = re.sub(r'^\s*정답\s*:\s*', '', t.strip())
    marks = [m for m in LABEL_RE.finditer(t) if not any(a <= m.start() < b for a, b, _ in code_spans(t))
             or t[m.start()] == '`']
    blanks = []
    if marks and not t[:marks[0].start()].strip(' -•\n'):
        for i, m in enumerate(marks):
            end = marks[i + 1].start() if i + 1 < len(marks) else len(t)
            val = t[m.end():end].strip().strip('-•/,').strip()
            ans, ok = value_answers(val)
            if not ok:
                return None
            blanks.append({'label': m.group(1), 'answers': ans})
        return blanks
    # "이름: 값 / 이름: 값" 형식
    parts = [p.strip(' -•') for p in split_top(t) if p.strip(' -•')]
    if len(parts) >= 2 and all(re.match(r'^[^:]{1,30}:\s*\S', p) and p.split(':', 1)[0].count('`') % 2 == 0
                               for p in parts):
        for p in parts:
            label, val = p.split(':', 1)
            ans, ok = value_answers(val)
            if not ok:
                return None
            blanks.append({'label': label.strip(), 'answers': ans})
        return blanks
    if len(parts) == 1:
        ans, ok = value_answers(parts[0])
        if ok:
            return [{'label': '', 'answers': ans}]
    return None


def tidy(text):
    """정답 표시용 텍스트 정리 (<br>, 굵게 정답: 접두어 등)"""
    t = text.replace('<br>', '\n')
    t = re.sub(r'^\s*\*\*정답\s*:\s*\*\*\s*', '', t)
    t = re.sub(r'^\s*\*\*\[모범 답안\]\s*', '**', t)
    t = re.sub(r'\*\*\s*\*\*', '', t)
    lines = [re.sub(r'^\s*[-*]\s+', '• ', l.rstrip()) for l in t.split('\n')]
    return '\n'.join(l for l in lines if l.strip()).strip()


# ---------------------------------------------------------------- 문제 부분
def parse_questions(lines):
    qs, cur, fence = {}, None, None
    for line in lines:
        if fence is not None:
            if line.strip() == '```':
                cur['codes'].append({'lang': fence[0] or 'js', 'code': '\n'.join(fence[1])})
                fence = None
            else:
                fence[1].append(line)
            continue
        m = Q_RE.match(line)
        if m and (line.startswith('**') or line.startswith('###')):
            n = int(m.group(1))
            head = m.group(2)
            if head.endswith('**'):
                head = head[:-2]
            head = POINTS_RE.sub(' ', head).strip()
            cur = {'n': n, 'lines': [head] if head else [], 'codes': [], 'slots': []}
            qs[n] = cur
            continue
        if cur is None:
            continue
        if line.startswith('## ') or line.strip() in ('---', '<details>'):
            cur = None
            continue
        fm = re.match(r'^```(\w*)\s*$', line)
        if fm:
            fence = (fm.group(1), [])
            continue
        s = line.strip()
        if not s:
            continue
        slot = re.match(r'^-\s*(.+?):\s*$', s)
        if slot:                                # 답안 칸 (- 답: / - ( A ): )
            label = slot.group(1).strip()
            if not re.fullmatch(r'답(안)?', label):
                cur['slots'].append(label)
            continue
        if s.startswith('>'):
            s = s.lstrip('>').strip()
        cur['lines'].append(s)
    for q in qs.values():
        q['text'] = '\n'.join(q['lines']).strip()
    return qs


# ---------------------------------------------------------------- 정답 부분
def parse_answer_chunks(lines):
    """번호 → {'answer': 텍스트, 'expl': 텍스트, 'raw': [줄…]}"""
    out = {}
    cur = None
    for line in lines:
        if line.strip() in ('<details>', '</details>') or line.strip().startswith('<summary'):
            continue
        t = TABLE_ROW_RE.match(line)
        if t:
            cells = table_cells(line)
            n = int(t.group(1))
            out[n] = {'answer': cells[1], 'expl': cells[2] if len(cells) > 2 else '', 'raw': []}
            cur = None
            continue
        m = CHUNK_RE.match(line)
        if m:
            n = int(m.group(1) or m.group(2))
            cur = {'answer': '', 'expl': '', 'raw': []}
            out[n] = cur
            first = line[m.end():].strip()
            if line.startswith('###'):
                cur['title'] = first
            else:
                cur['raw'].append(first)
            continue
        if cur is None:
            continue
        if line.startswith('### ') or line.startswith('## ') or line.strip() == '---':
            cur = None
            continue
        cur['raw'].append(line)
    for c in out.values():
        if not c['raw']:
            continue
        ans, expl, extra, mode = [], [], [], 'ans'
        for line in c['raw']:
            e = EXPL_RE.match(line)
            if e:
                mode = 'expl'
                expl.append(e.group(1))
                continue
            sub = re.match(r'^\s*[-*]\s*\*\*(.+?)\*\*\s*:?\s*(.*)$', line)
            if sub and mode == 'expl' and not sub.group(1).startswith('('):
                mode = 'extra'
                extra.append(f'**{sub.group(1).rstrip(":")}**: {sub.group(2)}')
                continue
            if not line.strip():
                continue
            {'ans': ans, 'expl': expl, 'extra': extra}[mode].append(line.strip())
        c['answer'] = '\n'.join(ans)
        c['expl'] = ' '.join(expl)
        c['extra'] = '\n'.join(extra)
    return out


def parse_essay_chunk(raw):
    model, rubric, mode = [], [], None
    for line in raw:
        mm = MODEL_RE.match(line)
        if mm:
            mode = 'model'
            if mm.group(1).strip():
                model.append(mm.group(1).strip())
            continue
        if RUBRIC_HEAD_RE.match(line):
            mode = 'rubric'
            continue
        if mode == 'model':
            if line.strip():
                model.append(line.strip())
            continue
        if mode == 'rubric':
            tr = RUBRIC_TABLE_RE.match(line)
            if tr:
                crit = tr.group(1).split('|')[0].strip()
                if not re.match(r'^:?-+', crit):
                    rubric.append({'text': crit, 'points': int(tr.group(2))})
                continue
            rb = RUBRIC_BULLET_RE.match(line)
            if rb:
                pts = int(next(g for g in rb.groups()[:3] if g))
                rubric.append({'text': rb.group(4).strip(), 'points': pts})
                continue
            if rubric and line.strip() and not line.strip().startswith('|'):
                rubric[-1]['text'] += ' ' + re.sub(r'^\d+\.\s*', '· ', line.strip())
    return '\n'.join(model).strip(), rubric


# ---------------------------------------------------------------- 파일 단위
def parse_file(text, kind):
    """kind: 'essay' | 'subj' | 'blank' → {번호: 문제 dict(일부)} , [문제점]"""
    lines = text.splitlines()
    split = next((i for i, l in enumerate(lines) if ANS_SPLIT_RE.match(l)), None)
    if split is None:
        return {}, ['정답 구역(## 정답 … / ## 모범 답안 …)을 찾지 못했습니다']
    qs = parse_questions(lines[:split])
    chunks = parse_answer_chunks(lines[split + 1:])
    items, problems = {}, []
    for n in sorted(qs):
        q = qs[n]
        item = {'question': q['text']}
        if len(q['codes']) == 1:
            item['code'] = q['codes'][0]['code']
            item['codeLang'] = q['codes'][0]['lang']
        elif q['codes']:
            item['codes'] = q['codes']
        c = chunks.get(n)
        if not c:
            problems.append(f'{n}번: 정답이 없습니다')
            continue
        if kind == 'essay':
            model, rubric = parse_essay_chunk(c['raw'])
            if not model:
                problems.append(f'{n}번: 모범 답안이 없습니다')
            item.update(type='essay', modelAnswer=tidy(model))
            if rubric:
                item['rubric'] = rubric
            else:
                problems.append(f'{n}번: 채점 기준이 없습니다')
        else:
            answer_text = c['answer']
            blanks = parse_blanks(answer_text) if not c.get('extra') else None
            item['type'] = 'short'
            if blanks and (kind == 'blank' or all(b['answers'] for b in blanks)):
                if len(blanks) == 1 and not blanks[0]['label']:
                    item['answers'] = blanks[0]['answers']
                else:
                    item['blanks'] = blanks
            else:
                if kind == 'blank':
                    problems.append(f'{n}번: 빈칸 정답을 해석하지 못해 자가 채점으로 둡니다')
                model = tidy(answer_text)
                if c.get('extra'):
                    model += '\n' + tidy(c['extra'])
                item['modelAnswer'] = model
                if q['slots']:
                    item['template'] = '\n'.join(f'{s}: ' for s in q['slots'])
            if c['expl']:
                item['explanation'] = c['expl'].strip()
            elif 'modelAnswer' not in item:
                problems.append(f'{n}번: 해설이 없습니다')
        items[n] = item
    missing = sorted(set(range(1, max(qs) + 1)) - set(qs)) if qs else []
    if missing:
        problems.append(f'빠진 문항 {missing}')
    return items, problems
