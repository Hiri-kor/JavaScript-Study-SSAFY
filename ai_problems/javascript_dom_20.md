# JavaScript & DOM 주관식 20문항

> 본 문제는 제공된 `1111_JavaScript_DOM.md` 강의록 내용을 기반으로 출제되었습니다. (단답형, 빈칸 채우기, 코드 결과 예측 및 서술형 포함)

---

## Part 1. 핵심 개념 및 용어 (1~7번)

**1. JavaScript의 파편화를 막기 위해 1997년 Ecma International이 정의한 '표준화된 스크립트 프로그래밍 언어 명세'의 이름은 무엇인가요?**
- 답: 

**2. 2008년 출시된 Google Chrome 브라우저에 탑재되어 웹을 단순 문서에서 애플리케이션 플랫폼으로 바꾸는 데 결정적인 역할을 한 고성능 자바스크립트 엔진의 이름은 무엇인가요?**
- 답: 

**3. 식별자(변수명) Naming Convention 중 변수, 객체, 함수 이름을 작성할 때 사용하는 표기법(예: `userName`, `phoneNumber`)과 상수(constants)를 작성할 때 사용하는 표기법을 각각 쓰시오.**
- 변수/객체/함수 표기법: 
- 상수(constants) 표기법: 

**4. ES6에서 추가된 변수 선언 키워드 2가지를 쓰고, 두 키워드의 '재할당 가능 여부' 차이를 간단히 서술하시오.**
- 키워드 2가지: 
- 차이점: 

**5. 웹 페이지(Document)를 구조화된 객체 트리 구조로 제공하여, 프로그래밍 언어가 페이지의 구조, 스타일, 내용 등에 접근하고 동적으로 조작할 수 있도록 하는 모델을 무엇이라고 부르나요? (약어 또는 전체 영문명)**
- 답: 

**6. DOM 트리의 최상위 객체이자, HTML 문서의 모든 콘텐츠에 접근하고 조작할 수 있는 진입점 역할을 하는 객체의 이름은 무엇인가요?**
- 답: 

**7. 브라우저가 문자열로 작성된 HTML 문서를 읽고 해석(구문 분석)하여 DOM Tree로 만드는 과정을 무엇이라고 부르나요?**
- 답: 

---

## Part 2. DOM 선택 및 조작 메서드 (8~15번)

**8. 제공한 CSS 선택자(selector)를 만족하는 첫 번째 `element` 객체 하나를 반환하며, 일치하는 요소가 없다면 `null`을 반환하는 `document` 객체의 메서드는 무엇인가요?**
- 답: 

**9. `document.querySelectorAll(selector)` 메서드를 실행했을 때 반환되는 객체의 타입(자료형 이름)은 무엇이며, 이 반환값이 DOM의 추후 변경사항을 실시간으로 반영하는지 여부(O/X)를 쓰시오.**
- 반환 객체 이름: 
- 실시간 반영 여부(O/X): 

**10. 다음 코드에서 `h1Tag` 요소에 `'dark-mode'`라는 클래스가 있으면 제거하고(반환값 `false`), 없으면 추가하는(반환값 `true`) 메서드를 빈칸에 알맞게 채우시오.**
```js
const h1Tag = document.querySelector('.heading')
h1Tag.____________.____________('dark-mode')
```
- 답: 

**11. 다음은 `<a>` 태그의 `href` 속성 값을 조회, 수정, 삭제하는 코드입니다. 빈칸 `( A )`, `( B )`, `( C )`에 들어갈 알맞은 메서드 이름을 각각 쓰시오.**
```js
const aTag = document.querySelector('a')

// 1. href 속성 값 조회
console.log(aTag.(   A   )('href'))

// 2. href 속성 값을 'https://www.naver.com/'으로 설정(수정)
aTag.(   B   )('href', 'https://www.naver.com/')

// 3. href 속성 제거
aTag.(   C   )('href')
```
- ( A ): 
- ( B ): 
- ( C ): 

**12. 다음과 같은 HTML 요소가 있을 때, 아래 JavaScript 코드를 실행하면 콘솔에 출력되는 문자열은 무엇인가요?**
```html
<p class="greeting">Hello <b>World</b>!</p>
<script>
  const pTag = document.querySelector('.greeting')
  console.log(pTag.textContent)
</script>
```
- 답: 

**13. 메모리에 새로운 `<h1>` 요소를 생성한 뒤, 이를 선택한 `<div>` 요소의 마지막 자식 노드로 삽입하려고 합니다. 빈칸 `( A )`와 `( B )`에 들어갈 알맞은 메서드 이름을 쓰시오.**
```js
const h1Tag = document.(   A   )('h1')
h1Tag.textContent = '제목'

const divTag = document.querySelector('div')
divTag.(   B   )(h1Tag)
```
- ( A ): 
- ( B ): 

**14. 부모 노드(`divTag`)에서 특정 자식 노드(`pTag`)를 제거하는 메서드는 무엇이며, 이 메서드로 제거된 노드를 변수에 담아두었을 때 재사용이 가능한지 여부(가능/불가능)를 쓰시오.**
- 메서드 이름: 
- 재사용 가능 여부: 

**15. JavaScript의 `style` 프로퍼티를 사용하여 `pTag` 요소의 CSS `font-size` 속성을 `'2rem'`으로 직접 변경하는 코드를 작성하시오.**
```js
const pTag = document.querySelector('p')
// 아래에 한 줄의 코드를 작성하시오.
```
- 답: 

---

## Part 3. 참고 및 심화 개념 (16~20번)

**16. DOM 트리의 기본 구성 단위는 `Node`이고, HTML 태그 요소를 나타내는 특별한 유형의 노드는 `Element`입니다. 다음 문장의 빈칸에 `Node`와 `Element`를 알맞게 넣으시오.**
> "모든 `(   A   )`는 `(   B   )`이지만, 모든 `(   B   )`가 `(   A   )`인 것은 아니다."
- ( A ): 
- ( B ): 

**17. 자바스크립트에서 문장 마지막에 세미콜론(`;`)을 작성하지 않아도 엔진이 규칙에 따라 자동으로 세미콜론을 삽입해 주는 기능의 약어(또는 명칭)는 무엇인가요?**
- 답: 

**18. `let`, `const` 키워드로 선언한 변수가 가지는 스코프(유효 범위)와 `var` 키워드로 선언한 변수가 가지는 스코프의 이름을 각각 쓰시오.**
- `let`, `const`의 스코프: 
- `var`의 스코프: 

**19. 코드가 실행되기 전, 변수 및 함수 선언문이 해당 스코프의 최상단으로 끌어올려지는 듯한 현상을 무엇이라고 부르며, 자바스크립트 엔진이 변수를 생성하는 3단계를 순서대로 쓰시오.**
- 현상 이름: 
- 변수 생성 3단계: `(       ) ➔ (       ) ➔ (       )`

**20. 다음 두 코드(A, B)를 실행했을 때 콘솔에 출력되는 결과(또는 발생하는 에러)를 각각 쓰고, 코드 B에서 그러한 결과가 나타나는 이유를 'TDZ(일시적 사각지대)' 개념을 포함하여 간단히 서술하시오.**
```js
// [코드 A]
console.log(name)
var name = '홍길동'

// [코드 B]
console.log(age)
let age = 30
```
- [코드 A] 결과: 
- [코드 B] 결과: 
- [코드 B]의 이유 서술: 

---
---

## 정답 및 해설

### Part 1. 핵심 개념 및 용어
1. **ECMAScript**
   - **해설**: 1997년 ECMA 재단(Ecma International)에서 JavaScript의 파편화를 막기 위해 정의한 표준 언어 명세입니다.
2. **V8 (또는 V8 자바스크립트 엔진)**
   - **해설**: 구글이 자체 개발한 고성능 자바스크립트 엔진으로, Chrome의 시장 우위와 웹 애플리케이션 발전에 핵심적인 역할을 했습니다.
3. **변수/객체/함수: 카멜 케이스(`camelCase`) / 상수: 대문자 스네이크 케이스(`SNAKE_CASE`)**
   - **해설**: 참고로 클래스와 생성자는 파스칼 케이스(`PascalCase`)를 사용합니다.
4. **키워드: `let`, `const` / 차이점: `let`은 재할당이 가능하고, `const`는 재할당이 불가능하다.**
   - **해설**: 두 키워드 모두 재선언은 불가능하며 블록 스코프를 가집니다. 실무에서는 기본적으로 `const`를 사용하고 재할당이 필요한 경우에만 `let`을 사용하는 것을 권장합니다.
5. **DOM (또는 Document Object Model)**
   - **해설**: HTML 문서를 객체 트리 구조로 표현하여 자바스크립트가 웹 페이지를 동적으로 조작할 수 있게 해줍니다.
6. **`document` (또는 `document` 객체)**
   - **해설**: DOM에서 모든 요소, 속성, 텍스트는 `document` 객체의 하위 객체로 구성됩니다.
7. **Parsing (파싱)**
   - **해설**: 브라우저가 문자열(HTML)을 해석하여 DOM Tree로 만드는 구문 분석 과정을 Parsing이라고 합니다.

---

### Part 2. DOM 선택 및 조작 메서드
8. **`querySelector` (또는 `document.querySelector()`)**
   - **해설**: 선택자와 일치하는 첫 번째 요소를 하나 선택하여 반환합니다.
9. **반환 객체 이름: `NodeList` / 실시간 반영 여부: X**
   - **해설**: `querySelectorAll()`이 반환하는 `NodeList`는 유사 배열이며, DOM이 나중에 변경되더라도 이전에 선택한 `NodeList` 값은 실시간으로 변하지 않습니다.
10. **`classList.toggle` (전체 코드: `h1Tag.classList.toggle('dark-mode')`)**
    - **해설**: `classList` 프로퍼티의 `toggle()` 메서드는 클래스가 존재하면 제거(`false`)하고, 존재하지 않으면 추가(`true`)합니다.
11. **( A ): `getAttribute` / ( B ): `setAttribute` / ( C ): `removeAttribute`**
    - **해설**: 일반 HTML 속성을 조회, 설정(갱신), 제거하는 표준 DOM 메서드들입니다.
12. **`Hello World!`**
    - **해설**: `textContent` 프로퍼티는 내부의 HTML 태그(`<b>`, `</b>`)를 완전히 제거하고 순수한 텍스트 데이터만 반환합니다.
13. **( A ): `createElement` / ( B ): `appendChild`**
    - **해설**: `document.createElement(tagName)`로 메모리에 요소를 생성하고, `parentNode.appendChild(childNode)`로 문서 트리의 마지막 자식으로 삽입해야 화면에 나타납니다.
14. **메서드 이름: `removeChild` (또는 `Node.removeChild()`) / 재사용 가능 여부: 가능**
    - **해설**: `removeChild()`는 DOM 트리에서만 자식 노드를 분리하여 반환할 뿐 메모리에는 남아있으므로, 변수에 담아두면 언제든 재사용할 수 있습니다.
15. **`pTag.style.fontSize = '2rem'`**
    - **해설**: JavaScript의 `style` 프로퍼티로 CSS 속성에 접근할 때는 하이픈(`-`)을 제거하고 카멜 케이스(`fontSize`)로 작성해야 합니다.

---

### Part 3. 참고 및 심화 개념
16. **( A ): `Element` / ( B ): `Node`**
    - **해설**: `Element`는 `Node`의 하위 유형입니다. `Node`에는 `Document Node`, `Element Node`, `Text Node` 등이 있으므로 모든 `Element`는 `Node`이지만, 텍스트 노드처럼 `Element`가 아닌 `Node`도 존재합니다.
17. **ASI (Automatic Semicolon Insertion, 자동 세미콜론 삽입 규칙)**
    - **해설**: 자바스크립트는 세미콜론이 선택적이며, 생략 시 ASI에 의해 자동으로 세미콜론이 삽입됩니다.
18. **`let`, `const`의 스코프: 블록 스코프(block scope) / `var`의 스코프: 함수 스코프(function scope)**
    - **해설**: 블록 스코프는 `if`, `for`, 함수 등의 모든 중괄호(`{}`) 내부를 기준으로 하며, 함수 스코프는 오직 함수의 중괄호 내부만을 기준으로 합니다.
19. **현상 이름: 호이스팅(Hoisting) / 변수 생성 3단계: `선언(Declaration) ➔ 초기화(Initialization) ➔ 할당(Assignment)`**
    - **해설**: 모든 선언문은 호이스팅되지만, 선언 이후 '초기화' 단계가 언제 진행되느냐에 따라 선언 전 접근 가능 여부가 달라집니다.
20. **[코드 A] 결과: `undefined` / [코드 B] 결과: `ReferenceError` (참조 에러: `Cannot access 'age' before initialization`)**
    - **[코드 B]의 이유 서술**: `var`는 선언과 동시에 `undefined`로 초기화되어 에러가 나지 않지만, `let`(및 `const`)은 선언만 최상단으로 호이스팅되고 실제 코드 선언 줄에 도달하기 전까지 초기화되지 않는다. 따라서 스코프 시작 지점부터 초기화 지점까지의 구간인 **TDZ(일시적 사각지대)**에 갇혀 있어 초기화 전에 접근하면 참조 에러(`ReferenceError`)가 발생한다.