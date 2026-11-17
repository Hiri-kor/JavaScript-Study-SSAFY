"""
AI 문제 검토 결과 수정 사항
- 원본(ai_problems/*.md)은 그대로 두고, 변환할 때 여기 적힌 내용으로 덮어씁니다.
- set: 필드를 통째로 교체 / replace: 필드 안의 문자열 치환 / note: 해설 끝에 덧붙임
- blank: 빈칸 정답 수정 {빈칸 번호(0부터): [허용 답안…]} / add: 허용 답안 추가
"""

WINDOW_NAME_NOTE = (
    '⚠️ 참고: 브라우저(연습장)에서 그대로 실행하면 `undefined` 대신 빈 문자열이 보입니다. '
    '브라우저에는 원래 `name`이라는 전역 값(`window.name`)이 있어 겹치기 때문입니다. '
    '시험에서는 교안대로 `undefined`가 답이며, 직접 확인할 때는 변수 이름을 `userName` 등으로 바꿔 보세요.'
)


def fenced(code):
    return f'```js\n{code}\n```'


HASOWN_NOTE = (
    '⚠️ 빈칸이 `Object.( )(obj, key)` 형태이므로 `hasOwn`만 맞습니다. '
    '`hasOwnProperty`는 `obj.hasOwnProperty(key)`처럼 객체에서 직접 호출하는 메서드라서 '
    '`Object.hasOwnProperty(obj, key)`로 쓰면 의도와 다르게 동작합니다.'
)

FIXES = {
    # ---------------- 객관식: 해설 표기 (사이트 보기 표시는 a)~d) )
    'ai-1111-12': {'replace': {'explanation': [('②의', 'b)의'), ('③의', 'c)의'), ('④의', 'd)의')]},
                   'why': '해설의 보기 번호(②③④)를 사이트 표기(b·c·d)로 맞춤'},
    'ai-1111-37': {'replace': {'explanation': [('① ', 'a) '), ('② ', 'b) '), ('③ ', 'c) ')]},
                   'why': '해설의 보기 번호를 사이트 표기(a·b·c)로 맞춤'},
    'ai-1112-18': {'replace': {'explanation': [('1, 2, 3번은', 'a), b), c)는')]},
                   'why': '해설의 보기 번호를 사이트 표기(a·b·c)로 맞춤'},
    'ai-1112-47': {'set': {'options': [
        fenced('const arrow = (name) => { return `hello, ${name}` }'),
        fenced('const arrow = name => { return `hello, ${name}` }'),
        fenced('const arrow = name => `hello, ${name}`'),
        fenced('const arrow = name => { `hello, ${name}` }'),
    ]}, 'why': '보기 안의 백틱이 겹쳐 코드가 깨져 보이던 문제를 코드 블록으로 수정'},
    'ai-1111-46': {'note': WINDOW_NAME_NOTE},

    # ---------------- DOM 주관식/빈칸
    'ai-1111-s10': {'add': {'answers': ['classList, toggle', 'classList / toggle', 'classList.toggle()']}},
    'ai-1111-s19': {'blank': {1: ['선언 → 초기화 → 할당', '선언, 초기화, 할당',
                                 'Declaration → Initialization → Assignment',
                                 '선언(Declaration) → 초기화(Initialization) → 할당(Assignment)']}},
    'ai-1111-s20': {'note': WINDOW_NAME_NOTE},
    'ai-1111-b19': {'note': WINDOW_NAME_NOTE},

    # ---------------- Basic Syntax 01
    'ai-1112-s06': {'add': {'answers': ['6 5 4 4']}},
    'ai-1112-s09': {'set': {'answers': ["(age >= 18) ? '성인' : '미성년자'", "age >= 18 ? '성인' : '미성년자'",
                                        "const message = (age >= 18) ? '성인' : '미성년자'",
                                        "const message = age >= 18 ? '성인' : '미성년자'"],
                            'modelAnswer': None},
                    'note': '조건식을 감싼 소괄호는 생략해도 됩니다.'},
    'ai-1112-s19': {'add': {'answers': ['name => `hello, ${name}`']}},
    'ai-1112-s20': {'add': {'answers': ["() => ({ key: 'value' })"]}},
    'ai-1112-b10': {'add': {0: ['i <= 5'], 1: ['i = 0'], 2: ['i = i + 1']},
                    'note': '(B)는 위에서 이미 `let i`를 선언했으므로 `i = 0`으로 다시 0을 넣어도 동작합니다.'},

    # ---------------- Basic Syntax 02
    'ai-1116-s01': {'blank': {1: ['hasOwn', 'hasOwn()']}, 'note': HASOWN_NOTE,
                    'why': '원본 정답의 "또는 hasOwnProperty"는 Object.( B )(obj, key) 빈칸에는 맞지 않아 제외'},
    'ai-1116-b02': {'blank': {0: ['hasOwn', 'hasOwn()']}, 'note': HASOWN_NOTE,
                    'why': '원본 정답 표기가 혼란스러워(hasOwnProperty 허용처럼 보임) hasOwn만 정답으로 정리'},
    'ai-1116-s09': {'set': {'answers': ['unshift, shift', 'shift, unshift', 'unshift(), shift()', 'shift(), unshift()'],
                            'modelAnswer': None}},
    'ai-1116-s15': {'add': {'answers': ['filter((product) => product.id !== 3)',
                                        'products.filter(product => product.id !== 3)']}},

    # ---------------- Controlling Event
    'ai-1117-s19': {'add': {0: ['functionButton', 'button', '버튼', '버튼 요소']}},
    'ai-1117-b19': {'add': {1: ['button', '버튼', '버튼 요소']}},
    'ai-1117-b15': {'replace': {'question': [('`( ㄱ )`, `( ㄴ )`, `( ㄷ )`을 채우시오', '`( ㄱ )`, `( ㄴ )`, `( ㄷ )`, `( ㄹ )`을 채우시오')]},
                    'why': '코드에는 ( ㄹ ) 빈칸도 있는데 문제 문장에 빠져 있어 추가'},
}


def apply_fixes(questions):
    problems = []
    by_id = {q['id']: q for q in questions}
    for qid, fix in FIXES.items():
        q = by_id.get(qid)
        if q is None:
            problems.append(f'ai_fixes: {qid} 문항을 찾지 못했습니다')
            continue
        for key, value in fix.get('set', {}).items():
            if value is None:
                q.pop(key, None)
            else:
                q[key] = value
        for key, pairs in fix.get('replace', {}).items():
            for old, new in pairs:
                if old not in q.get(key, ''):
                    problems.append(f'ai_fixes: {qid}.{key} 에 "{old}" 가 없습니다')
                q[key] = q.get(key, '').replace(old, new)
        for idx, answers in fix.get('blank', {}).items():
            q['blanks'][idx]['answers'] = answers
        for idx, answers in fix.get('add', {}).items():
            target = q['answers'] if idx == 'answers' else q['blanks'][idx]['answers']
            target.extend(a for a in answers if a not in target)
        if fix.get('note'):
            q['explanation'] = (q.get('explanation', '') + ' ' + fix['note']).strip()
        if fix.get('why'):
            q['reviewNote'] = fix['why']
    return problems
