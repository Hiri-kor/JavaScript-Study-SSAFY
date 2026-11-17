# 작업 기록 / 인수인계 (JavaScript 시험 대비 학습 사이트)

> 다른 컴퓨터에서 이어서 작업할 때 먼저 읽는 파일입니다. Claude Code는 이 파일을 자동으로 읽습니다.
> 사이트 사용법·배포 방법은 [README.md](README.md)에 있습니다.

## 작업 규칙
- 대답과 문서는 **한국어**로 작성한다.
- 학습 내용(개념 본문·요약·설명)은 **폴더 안의 강의 교안 범위만** 다룬다. 쉬운 설명을 덧붙이더라도 교안 내용을 풀어 쓴 것이어야 한다.
- 문제를 풀기 전에는 정답·해설이 화면(DOM)에 없어야 한다. 정답 노드는 채점 후에만 만든다.
- 빌드 도구 없음. 순수 HTML/CSS/JS + CDN(marked 12.0.2, highlight.js 11.9.0). GitHub Pages에 그대로 배포한다.
- 작은 화면(320px)에서도 가로 스크롤이 생기지 않아야 한다.

## 저장소에 없는 파일 (중요)
`.gitignore`로 아래 파일은 커밋하지 않는다. 다른 컴퓨터에서 교안 대조 작업을 하려면 **직접 복사해 와야 한다.**
- 교안 PDF 4개 (`*.pdf`)
- 교안을 옮겨 적은 정리본 4개 (루트): `1111_JavaScript_DOM.md`, `1112_JavaScript_Basic_Syntax_01.md`, `1116_JavaScript_Basic_Syntax_02.md`, `1117_JavaScript_Controlling_Event.md`
  - PDF가 이미지로만 되어 있어 페이지 이미지를 보고 옮겨 적은 것이며, 각 파일 끝에 "정리하기 힘들었던 부분(그림·작은 글씨 등)" 표가 있다.
  - 사이트 본문(`content/`)은 이 정리본을 바탕으로 만들었다.

## 폴더 구조
```
index.html            홈 (진도·통계·주제 목록, 기록 초기화)
summary.html          시험 직전 개념 요약 (content/summary.md 렌더)
exam.html             시험 직전 문제 풀이 (출처·주제·유형 필터, 연습/모의고사 모드, 오답만, 기록)
ai.html               AI 문제 페이지 (프롬프트 템플릿, JSON 가져오기·검증, 배포용 JSON 복사)
playground.html       코드 연습장 (HTML/CSS/JS 탭, 예제, 공유 링크, 자동 저장)
topics/<id>.html      주제별 페이지 껍데기 (data-topic 속성만 다름) → assets/js/topic.js 가 채움

content/topics/*.md   주제별 개념 본문 (9개)         content/summary.md   요약
content/playground-examples.md   연습장 예제 (## 제목 단위로 분리)

data/topics.js        주제 9개 정의 (01-history ~ 09-events)
data/questions.js     교안 확인 문제 44개 (객관식, 해설 + 쉬운 설명)
data/ai-questions.js  AI 문제 400개 — 자동 생성 파일, 직접 수정 금지

assets/js/common.js   App 전역: Store(localStorage 'jsstudy:' 접두어), Progress, inline 마크다운,
                      renderMarkdown(콜아웃·코드 복사/따라치기/연습장 버튼), enhanceEditor, symbolBar(터치 기호 줄)
assets/js/quiz.js     문제 엔진: mc / short(단답·빈칸 blanks·자가채점 modelAnswer) / essay(rubric 채점표) / code
assets/js/runner.js   샌드박스 iframe 코드 실행기 (console 가로채기, 테스트 식 평가)
assets/js/typing.js   코드 따라치기 모달
assets/js/topic.js · exam.js · ai.js · home.js · playground.js   각 페이지 스크립트
assets/css/style.css  전체 스타일 (라이트/다크, ≤768·≤640·≤360 반응형)

ai_problems/          AI로 만든 원본 문제 md 16개 (원본 그대로 보관, 수정하지 않음)
tools/import_ai_problems.py   ai_problems → data/ai-questions.js 변환 (FILES=객관식, WRITTEN=서술/주관식/빈칸)
tools/ai_written.py           서술형·주관식·빈칸 md 파서
tools/ai_fixes.py             검토로 찾은 정답·해설 수정 목록 (변환 시 덮어씀, 화면에 "🔧 검토 메모")
tests/e2e.mjs                 헤드리스 크롬 E2E 검사 (83개 항목)
tests/dump-mc.cjs · dump-written.cjs · run-blanks.cjs   AI 문제 검토용 출력 스크립트
```

## 문제 데이터 형식 (요약)
공통: `id, topic, type, question, code|codes, explanation, ref`
- `mc`: `options[]`(```lang 로 감싼 문자열이면 코드 보기), `answer`(0부터)
- `short`: 셋 중 하나 — `answers[]`(자동) / `blanks:[{label, answers[]}]`(빈칸별 자동) / `modelAnswer`(+`template`, 자가 채점)
- `essay`: `modelAnswer`, `keywords[]` 또는 `rubric:[{text, points}]`(합계 10점, 70% 이상 정답)
- `code`: `starter, tests:[{name, expr}], solution, html`
- 단답 비교: 공백·대소문자·따옴표·쉼표·끝의 `;`·끝의 `()`·앞의 `.` 무시 (quiz.js `matches`)

## 자주 하는 작업
```bash
# AI 문제 다시 변환 (ai_problems 파일 추가 시 import_ai_problems.py 의 FILES/WRITTEN 에 규칙 추가)
python tools/import_ai_problems.py

# 로컬 확인 (md를 fetch 하므로 file:// 로는 안 열림)
python -m http.server 8000

# E2E 검사 (서버 없이 file:// + 크롬 플래그로 실행 가능)
BASE="file:///C:/경로/저장소" node tests/e2e.mjs        # CHROME, SCRATCH 환경변수로 경로 변경 가능

# 문제 검토
node tests/dump-mc.cjs data/ai-questions.js > mc.txt
node tests/run-blanks.cjs data/ai-questions.js
```
- E2E 기대값에 문항 수가 들어 있다(AI 400, 시험 페이지 444, 01-history AI 14, 09-events AI 100). 문제를 추가하면 함께 고친다.

## 지금까지 한 일
1. 교안 PDF 4개 → 정리본 md (gitignore)
2. 학습 사이트 구축: 주제별 페이지 9개, 개념 요약, 시험 직전 문제, AI 문제 페이지, 연습장, 코드 따라치기, 오답 노트, 다크 모드
3. 교안 범위만 남기도록 정리 (07-arrays의 getOwnPropertyDescriptors 출력은 코드에 맞게 고치고 ⚠️ 표시)
4. AI 객관식 200문항(4개 강의 × 50) 반영
5. 전체 오류 점검 + 모바일(320/375px) 대응
6. AI 서술형 40 · 주관식 80 · 빈칸 80 반영, 400문항 정답·해설 검토
   - 정답 오류: Basic Syntax 02 주관식 #1·빈칸 #2 (`Object.( )(obj, key)`에 hasOwnProperty 허용 → hasOwn만)
   - 문제 누락: Controlling Event 빈칸 #15 ( ㄹ )
   - 해설 표기: 보기 번호 ②/1번 → a)~d), 백틱 겹친 보기 → 코드 블록
   - `var name` 문제: 교안 답은 `undefined`, 브라우저에서는 window.name 때문에 빈 문자열 → 해설에 안내
   - 세부 내용은 tools/ai_fixes.py 참고

## 알아 둘 점
- 교안 원본 자체의 불일치(1111 p.53, 1116 p.96)는 정리본 md 끝에 기록해 두었다.
- `var name` 예제는 브라우저에서 window.name과 겹친다 → 연습장 예제는 `userName`으로 바꿨고, 개념 본문에는 ⚠️ 안내.
- 이 작업 환경에서는 `npm install`과 로컬 서버 실행이 권한상 막혀 있었기 때문에, E2E는 `file://` + `--allow-file-access-from-files`로 돌렸다.
