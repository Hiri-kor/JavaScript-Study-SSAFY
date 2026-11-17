# JavaScript 시험 대비 노트

SSAFY JavaScript 교안(1111 DOM · 1112 Basic Syntax 01 · 1116 Basic Syntax 02 · 1117 Controlling Event)으로
객관식 · 주관식 · 서술형 시험을 준비하는 정적 웹사이트입니다. 빌드 과정 없이 GitHub Pages에 그대로 올리면 동작합니다.

## 페이지 구성

| 페이지 | 파일 | 내용 |
|---|---|---|
| 홈 | `index.html` | 학습 현황, 주제 목록, 학습 순서 안내 |
| 주제별 학습 (9개) | `topics/*.html` + `content/topics/*.md` | 교안 전체 개념 + 💡 풀이 + 주제별 확인 문제 |
| 시험 직전 개념 | `summary.html` + `content/summary.md` | 한 장 요약, 헷갈리는 비교, 서술형 한 줄 정의, 출력 예측 |
| 시험 직전 문제 | `exam.html` | 확인 문제만 풀기 · 연습/모의고사 모드 · 오답 노트 · 풀이 기록 |
| AI 문제 | `ai.html` + `data/ai-questions.js` | AI 출제용 프롬프트, JSON 붙여넣기로 문제 추가, 풀기 |
| 코드 연습장 | `playground.html` + `content/playground-examples.md` | HTML/CSS/JS 직접 입력·실행, 교안 예제 불러오기 |

모든 코드 블록에는 **복사 · ⌨ 따라치기(직접 타이핑 연습) · ▶ 연습장에서 실행** 버튼이 붙습니다.
정답과 해설은 채점한 뒤에만 화면에 그려집니다.

## 로컬에서 보기

본문(md)을 `fetch`로 읽기 때문에 파일을 더블클릭(`file://`)하면 본문이 보이지 않습니다. 간단한 서버로 여세요.

```bash
python -m http.server 8000
# http://localhost:8000 접속
```

VS Code의 Live Server 확장으로 열어도 됩니다.

## GitHub Pages 배포

```bash
git init
git add .
git commit -m "JS 시험 대비 노트"
git branch -M main
git remote add origin https://github.com/<계정>/<저장소>.git
git push -u origin main
```

GitHub 저장소 → **Settings → Pages → Build and deployment**에서 Source를 `Deploy from a branch`,
Branch를 `main` / `/ (root)`로 지정하면 몇 분 뒤 `https://<계정>.github.io/<저장소>/`에서 열립니다.

> 교안 PDF와 루트의 강의별 정리 md는 `.gitignore`로 제외되어 올라가지 않습니다.
> 다만 사이트 본문(`content/`)에도 교안 내용이 들어 있으므로, 공개 저장소로 올릴지는 판단해서 정하세요.

## 내용 수정하기

- **개념 본문**: `content/topics/<주제id>.md`를 마크다운으로 수정합니다.
  - 강조 상자: 문단 앞에 `> 💡`(쉽게 이해하기), `> 📌`(교안 TIP), `> 📝`(정의/서술형), `> ⚠️`(주의)를 붙이면 색이 입혀집니다.
- **교안 확인 문제**: `data/questions.js`
- **AI 문제**: `ai_problems/` 폴더에 문제 파일을 넣고 `python tools/import_ai_problems.py`를 실행하면 `data/ai-questions.js`가 다시 만들어집니다.
  - md(객관식 50제 형식): 스크립트 상단 `FILES`에 파일 이름과 문항 번호별 주제 배치 규칙을 추가해야 읽습니다.
  - md(서술형·주관식·빈칸 형식): `WRITTEN`에 파일 이름, 종류(`essay`/`subj`/`blank`), 주제 배치 규칙을 추가합니다. 읽을 수 있는 형식은 `tools/ai_written.py` 맨 위 설명 참고.
    - 서술형: 모범 답안 + 배점표 → 사이트에서 채점 기준표를 체크해 점수를 매깁니다(7점 이상 정답).
    - 주관식·빈칸: 짧은 정답은 자동 채점(빈칸이 여러 개면 칸마다 입력), 문장형 정답은 모범 답안과 비교해 스스로 채점합니다.
  - 검토하면서 고친 정답·해설은 원본 md를 건드리지 않고 `tools/ai_fixes.py`에 모아 두었습니다. 변환할 때 자동으로 적용되고, 화면에 "🔧 검토 메모"로 표시됩니다.
  - json: `ai.html`의 "배포용 JSON 복사"로 받은 형식은 규칙 없이 그대로 읽습니다.
  - `data/ai-questions.js`는 자동 생성 파일이므로 직접 고치지 말고 원본을 고친 뒤 스크립트를 다시 실행하세요.
- **작업 기록·폴더 구조·검사 방법**: [CLAUDE.md](CLAUDE.md) 참고 (다른 컴퓨터에서 이어서 작업할 때)
- **주제 추가**: `data/topics.js`에 항목 추가 → `content/topics/<id>.md` 작성 → `topics/<id>.html`은 기존 파일을 복사해 `data-topic`만 바꿉니다.

## 학습 기록

푼 문제, 오답 노트, 학습 완료 표시, 연습장 코드는 브라우저 `localStorage`에만 저장됩니다.
다른 기기와 공유되지 않으며, 홈 화면의 "기록 초기화"로 지울 수 있습니다.
