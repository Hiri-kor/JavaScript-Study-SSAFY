## 01. JavaScript의 역사

| 키워드 | 핵심 |
|---|---|
| 1990 웹의 탄생 | Tim Berners-Lee – WWW, URL, HTTP / 정적 텍스트 페이지 |
| 1994 Netscape Navigator | 최초 상용 브라우저, 점유율 90%↑ |
| 1995 JavaScript | Brendan Eich – **Mocha → LiveScript → JavaScript**, Navigator 2.0 탑재 |
| 1996 JScript | MS IE 3.0 → **파편화의 시작** |
| 1차 브라우저 전쟁 | IE 승리(2002 약 96%) → 웹 표준의 부재 → 표준 중요성 인식 |
| 1997 ECMAScript | ECMA가 발표한 **표준 명세** |
| 2008 Chrome | 승리의 결정적 이유 = **적극적인 웹 표준 준수** (+ V8 엔진) |
| 2009 | ES5, **Node.js**(브라우저 밖 실행 → 서버 사이드) |
| 2015 ES6 | **역사상 가장 중요한 버전** |

- **ECMAScript = JavaScript의 표준(규칙)**, **JavaScript = 그 표준을 구현한 구체적인 언어**

## 02. 변수 · 스코프 · 호이스팅

- 식별자: **문자, `$`, `_`로 시작** / 대소문자 구분 / **예약어 불가**(for, if, function)
- 표기법: camelCase(변수·객체·함수), PascalCase(클래스·생성자), SNAKE_CASE(상수)

| | 재할당 | 재선언 | 스코프 | 선언 전 접근 |
|---|---|---|---|---|
| `let` | O | X | 블록 | ReferenceError (TDZ) |
| `const` | **X** | X | 블록 | ReferenceError (TDZ) |
| `var` | O | **O** | **함수** | `undefined` |
| 함수 선언식 | | | | **정상 호출** |
| 함수 표현식 / class | | | | ReferenceError (TDZ) |

- **const를 기본**, 재할당이 필요할 때만 let. const는 선언 시 반드시 초기화.
- 블록 스코프 = `if`, `for`, 함수의 **중괄호 내부** / 함수 스코프 = **함수의 중괄호 내부만**
- **모든 선언은 호이스팅된다.** 차이는 **초기화가 함께 되느냐** (선언 → 초기화 → 할당)
- **TDZ** = 스코프 시작 ~ 실제 선언부(초기화 지점)까지 접근 불가 구간
- 세미콜론은 선택(ASI가 자동 삽입), 중요한 건 **일관성**

## 03. 데이터 타입 · 연산자

| | 원시 자료형 | 참조 자료형 |
|---|---|---|
| 종류 | Number, String, Boolean, null, undefined | Object, Array, **Function** |
| 저장 | 값 자체 | 메모리 주소 |
| 할당 시 | **값 복사** (서로 영향 X) | **주소 복사** (서로 영향 O) |
| 성질 | 불변 | 가변 |

- 템플릿 리터럴: **백틱** + `${expression}` (ES6+)
- null = 개발자가 **의도적으로** 값 없음 / undefined = **값이 할당되지 않음**
- `typeof null` → **'object'** (초기 버그, 하위 호환성 때문에 유지) / `null == undefined` true, `===` false
- 산술 연산: null → 0 취급, undefined → NaN
- NaN: `NaN === NaN` → **false**, `typeof NaN` → **'number'**
- **false로 변환되는 값**: `undefined`, `null`, `0`, `-0`, `NaN`, `''`
- `x++` → 이전 값 반환 후 증가 / `++x` → 증가 후 값 반환 (명시적인 `+= 1` 권장)
- `==` 암묵적 타입 변환 후 비교 / `===` 값+타입 모두 비교 → **`===` 권장**
- 단축 평가: `A && B` → A가 거짓이면 A, 아니면 B / `A || B` → A가 참이면 A, 아니면 B

## 04. 조건문 · 반복문

- 삼항 연산자 `조건 ? 참일 때 : 거짓일 때` – 피연산자 **3개**, 간단한 로직에만
- for 동작: 초기문(1회) → 조건 평가 → 블록 실행 → 증감 → 조건 평가 …

| 반복문 | 순회 대상 | 주의 |
|---|---|---|
| `while` | 조건이 참인 동안 | |
| `for` | 횟수 제어 | 카운터는 `let` (const 쓰면 에러) |
| `for…in` | 객체의 **키** | 배열엔 X (인덱스를 **문자열**로, 순서 보장 X) |
| `for…of` | iterable의 **값** | 객체엔 X (TypeError: not iterable) |

- for…in / for…of 변수는 매번 새로 지정 → `const` 사용 가능

## 05. 함수 · 콜백

| | 선언식 | 표현식 |
|---|---|---|
| 형태 | `function f() {}` | `const f = function () {}` |
| 선언 전 호출 | **가능** (함수 전체 호이스팅) | **불가** (TDZ, ReferenceError) |
| 익명 함수 | X | O |
| 권장 | | **권장** (예측 가능성, 유연성, 스코프 관리) |

- return이 없으면 `undefined` 반환
- 기본 매개변수 `name = 'Anonymous'` / 나머지 매개변수 `...rest` (**하나만, 마지막**, 배열로 모음, 없으면 `[]`)
- 인자 부족 → `undefined`, 인자 초과 → 무시 (에러 아님)
- **전개 구문**(호출 시 `f(...arr)`) = 펼치기 / **나머지 매개변수**(정의 시) = 모으기
- 화살표 함수: ① function 지우고 `=>` ② 매개변수 1개면 `()` 생략 가능(비권장) ③ 본문 한 줄이면 `{}`와 `return` **함께** 생략
- 인자 없으면 `() =>`, 객체 반환 시 `() => ({ key: 'value' })`
- **콜백 함수** = 다른 함수의 인자로 전달되어 특정 시점에 호출되는 함수 (**실행 권한 위임**) – 유연성(calculator), 시점 제어(setTimeout)

## 06. 객체

- 구조: `{ key: value }` / key는 **문자열만**(숫자도 문자열로) / value는 모든 자료형
- 접근: `obj.key`, `obj['key']` (띄어쓰기 있는 키는 **대괄호만**) / 추가·수정은 할당, 삭제는 `delete`
- `'key' in obj` → 존재 여부 (프로토타입 체인까지 확인, 자기 속성만은 `Object.hasOwn`)
- 메서드 = 객체 속성에 정의된 함수, `this`로 자기 객체에 접근

| 호출 방법 | this |
|---|---|
| 일반 함수 단순 호출 `f()` | 전역 객체 (window) |
| 메서드 호출 `obj.f()` | 호출한 객체 (**점 앞의 객체**) |
| 화살표 함수 | 자기 this 없음 → **상위 스코프의 this** |
| 이벤트 핸들러(일반 함수) | 리스너가 연결된 요소 (= `event.currentTarget`) |

- 메서드 안 `forEach(function () { this })` → window / `forEach(() => { this })` → 객체
- JSON = Key-Value 형태의 **문자열** / `JSON.stringify(obj)` → 문자열 / `JSON.parse(str)` → 객체

| 추가 문법 | 예 |
|---|---|
| 단축 속성 | `{ name, age }` |
| 단축 메서드 | `{ myFunc() { … } }` |
| 계산된 속성 | `{ [변수]: 값 }` |
| 구조 분해 할당 | `const { firstName, email } = userInfo` / 매개변수 `function f({ a, b })` |
| 전개 구문 | `{ ...obj, a: 1 }` – **얕은 복사**, 같은 키는 뒤가 덮어씀 |
| Object 메서드 | `keys()` 키 배열 / `values()` 값 배열 / `entries()` [키, 값] 배열 |
| Optional chaining | `obj?.prop`, `obj?.[prop]`, `obj?.method()` – null/undefined면 **undefined 반환** |

- Optional chaining: 없어도 되는 대상에만(남용 X), 앞 변수는 반드시 선언되어 있어야 함
- 클래스 = 객체 생성 템플릿(붕어빵 틀), ES6, PascalCase, `constructor`는 하나만, **new**가 constructor 자동 호출, new 없이 호출하면 TypeError, 호이스팅되지만 TDZ

## 07. 배열 · Array Helper Method

| 메서드 | 위치 | 동작 | 반환 |
|---|---|---|---|
| `push()` | 끝 | 추가 | 새 길이 |
| `pop()` | 끝 | 제거 | 제거한 요소 |
| `unshift()` | 앞 | 추가 | 새 길이 (성능 저하, 가급적 X) |
| `shift()` | 앞 | 제거 | 제거한 요소 (성능 저하, 가급적 X) |

- 위 4개는 **모두 원본 배열을 직접 수정**

| 메서드 | 역할 | 반환 값 | 비고 |
|---|---|---|---|
| `forEach` | 순회 | **undefined** | break/continue 불가 |
| `map` | 변형 | 새 배열 (**길이 같음**) | 콜백에 **return 필수**, 원본 불변 |
| `filter` | 선별 | 새 배열 (길이 같거나 짧음) | 콜백이 true인 요소만, 없으면 `[]` |
| `reduce` | 집계 | 하나의 결과값 | `(acc, cur) => …, 초기값` (return이 다음 acc) |
| `find` | | 콜백이 참인 요소 | |
| `some` | | 하나라도 통과하면 true | |
| `every` | | 모두 통과하면 true | |

- 콜백 매개변수 순서: `(item, index, array)`
- 배열 전개 `['머리', ...parts, '발']` → 항상 새 배열 (안의 객체는 주소만 복사)
- 순회 선택: 인덱스 제어 → for / 중간에 멈춤 → for…of / 처음부터 끝까지 → forEach
- 배열은 **인덱스를 키로 가지고 length 속성을 갖는 특수한 객체**

## 08. DOM

- DOM = 웹 페이지를 **구조화된 객체**로 제공해 프로그래밍 언어가 접근·조작할 수 있게 하는 **API**
- `document` = DOM 트리의 **최상위 객체**, 모든 콘텐츠에 접근하는 **진입점**
- JS 실행 방법: `script` 태그 / `.js` 파일(`script src`) / 브라우저 Console
- DOM 조작 순서: **① 선택 → ② 조작**

| 분류 | 메서드 / 속성 | 핵심 |
|---|---|---|
| 선택 | `querySelector(sel)` | **첫 번째** 요소 1개 (없으면 `null`) |
| 선택 | `querySelectorAll(sel)` | **NodeList** (forEach 가능, 실시간 반영 X) |
| 클래스 | `classList.add / remove / toggle` | toggle: 있으면 제거(false), 없으면 추가(true) |
| 속성 | `getAttribute / setAttribute(name, value) / removeAttribute` | 지운 뒤 get → `null` |
| 콘텐츠 | `textContent` | 태그 빼고 **순수 텍스트** |
| 요소 | `createElement(tag)` → `appendChild()` / `removeChild()` | create는 **메모리에만** → append해야 화면에 |
| 스타일 | `style.color`, `style.fontSize` | 여러 스타일은 **클래스 활용 권장** |

- Node(기본 구성 단위: Document·Element·Text Node) ⊃ Element(HTML 요소) – **모든 Element는 Node, 역은 성립 X**
- Parsing = 브라우저가 문자열을 해석해 DOM Tree로 만드는 과정
- 다크 모드 = body 선택 → `classList.toggle('dark-mode')` → 미리 정의한 CSS 적용

## 09. 이벤트

- 이벤트 = 무언가 일어났다는 신호/사건 / 이벤트 객체 = 브라우저가 **자동 생성**한 상세 정보
- 이벤트 핸들러 = 이벤트 발생 시 실행되는 **콜백 함수** (브라우저가 대신 호출)
- `EventTarget.addEventListener(type, handler)` – type은 **문자열**('click', 'input'…), handler는 **괄호 없이** 전달, event 객체를 **첫 번째 매개변수**로 받음, 반환 값 없음
- 카페 비유: 주문 = **이벤트**, 키오스크 = **이벤트 리스너**, 바리스타 = **이벤트 핸들러**
- **버블링** = 이벤트가 발생한 요소의 핸들러 → **부모 → … → document → window** 순으로 전파 (p → div → form)
- **캡처링** = 최상위 → 타겟으로 하향 (거의 다루지 않음) / 순서: 캡처링 → 타겟 → 버블링

| | `event.target` | `event.currentTarget` |
|---|---|---|
| 의미 | 실제 이벤트가 **시작된 가장 안쪽 요소** | 핸들러가 **연결된 요소** |
| 버블링 중 | 변하지 않음 | 핸들러마다 다름 |
| this와 | | 같음 (일반 함수 핸들러) |

- 버블링 활용 = 공통 조상에 핸들러 **하나만** 등록 + `event.target`으로 실제 요소 구분
- `console.log(event)`로 찍으면 currentTarget은 **null** (처리 중에만 사용 가능)
- `event.preventDefault()` = 기본 동작 취소 (copy 막기, form 제출 시 새로고침 막기 → `'submit'` 이벤트)
- 화살표 함수 핸들러의 this → **window** → 일반 함수 쓰거나 `event.currentTarget` 사용

## ⚠️ 헷갈리는 비교 모음

| 비교 | 구분 포인트 |
|---|---|
| `let` vs `const` vs `var` | 재할당 O·X·O / 재선언 X·X·O / 블록·블록·함수 |
| 재할당 vs 재선언 | `x = 2` vs `let x = 2` 한 번 더 |
| 블록 스코프 vs 함수 스코프 | 모든 `{}` vs 함수의 `{}`만 |
| `==` vs `===` | 타입 변환 O vs X |
| null vs undefined | 의도적 값 없음 vs 할당되지 않음 |
| `for…in` vs `for…of` | 키(객체) vs 값(배열) |
| 함수 선언식 vs 표현식 | 선언 전 호출 O vs X |
| 나머지 매개변수 vs 전개 구문 | 정의 시 모으기 vs 호출 시 펼치기 |
| `forEach` vs `map` | undefined vs 새 배열 |
| `map` vs `filter` | 변형(길이 같음) vs 선별(길이 같거나 짧음) |
| `push/pop` vs `unshift/shift` | 끝 vs 앞 |
| `JSON.stringify` vs `JSON.parse` | 객체→문자열 vs 문자열→객체 |
| `querySelector` vs `querySelectorAll` | 첫 번째 1개(없으면 null) vs NodeList |
| `createElement` vs `appendChild` | 메모리에 생성 vs 문서에 삽입 |
| Node vs Element | 모든 구성 단위 vs HTML 요소 노드 |
| `target` vs `currentTarget` | 시작된 요소 vs 핸들러 연결 요소(=this) |
| 버블링 vs 캡처링 | 상향(자식→부모) vs 하향(부모→자식) |
| 일반 함수 vs 화살표 함수의 this | 호출 방식으로 결정 vs 상위 스코프의 this |

## 📝 서술형 한 줄 정의

> 📝 **ECMAScript** — Ecma International이 정의한 표준화된 스크립트 프로그래밍 언어 명세로, JavaScript는 이 표준을 구현한 구체적인 프로그래밍 언어이다.

> 📝 **블록 스코프** — if, for, 함수 등의 중괄호 내부를 가리키며, 블록 스코프를 가지는 변수(let, const)는 블록 바깥에서 접근할 수 없다.

> 📝 **호이스팅** — 코드가 실행되기 전 변수 및 함수 선언문이 스코프의 최상단으로 끌어올려지는 듯한 현상으로, 모든 선언은 호이스팅되지만 초기화가 함께 이루어지느냐에 따라 동작이 달라진다.

> 📝 **TDZ** — 스코프의 시작 지점부터 변수의 초기화가 이루어지는 실제 선언부까지의 구간으로, let·const·class는 이 구간에서 접근하면 ReferenceError가 발생한다.

> 📝 **원시 자료형 vs 참조 자료형** — 원시 자료형은 값 자체가 변수에 저장되고 불변이며 할당 시 값이 복사된다. 참조 자료형은 메모리 주소가 저장되고 가변이며 할당 시 주소가 복사되어 원본과 사본이 서로 영향을 준다.

> 📝 **== vs ===** — 동등 연산자는 암묵적 타입 변환으로 타입을 일치시킨 후 값을 비교하고, 일치 연산자는 값과 타입을 모두 엄격하게 비교하므로 예측하지 못한 결과를 막기 위해 일치 연산자 사용이 권장된다.

> 📝 **함수 표현식 권장 이유** — 선언 전에 호출할 수 없어 정의 후 호출 순서가 드러나 예측 가능성이 높고, 변수에 할당되어 함수를 값으로 다루기 쉬우며, let/const와 함께 엄격한 스코프 관리가 가능하다.

> 📝 **콜백 함수** — 다른 함수의 인자로 전달되어 특정 시점에 호출되는 함수로, 함수의 실행 권한을 다른 함수에게 위임하는 것이다.

> 📝 **this** — 함수나 메서드를 호출한 객체를 가리키는 키워드로, 함수가 호출되는 방식에 따라 결정된다. 메서드 호출 시 호출한 객체, 일반 함수 단순 호출 시 전역 객체를 가리키며, 화살표 함수는 자신만의 this가 없어 상위 스코프의 this를 사용한다.

> 📝 **JSON** — Key-Value 형태로 이루어진 자료 표기법으로 일정한 형식을 가진 문자열이며, JSON.stringify()로 객체를 문자열로, JSON.parse()로 문자열을 객체로 변환한다.

> 📝 **map과 forEach** — forEach는 각 요소에 콜백을 실행만 하고 반환 값이 없으며(undefined), map은 각 요소에 콜백을 실행한 결과를 모아 원본과 길이가 같은 새로운 배열을 반환한다.

> 📝 **DOM** — 웹 페이지(Document)를 구조화된 객체로 제공하여 프로그래밍 언어가 페이지 구조에 접근하고 문서 구조, 스타일, 내용 등을 변경할 수 있도록 하는 API이다.

> 📝 **이벤트 핸들러** — 특정 이벤트가 발생했을 때 실행되는 콜백 함수로, addEventListener로 DOM 요소에 등록하며 이벤트 발생 시 브라우저가 event 객체를 첫 번째 인자로 전달해 호출한다.

> 📝 **버블링** — 한 요소에 이벤트가 발생하면 해당 요소의 핸들러가 동작한 후 부모 요소의 핸들러가 최상단 조상까지 차례로 동작하는 현상이며, 공통 조상에 핸들러를 하나만 등록하고 event.target으로 실제 요소를 구분하는 데 활용한다.

> 📝 **target vs currentTarget** — event.target은 이벤트가 실제로 시작된 가장 안쪽 요소로 버블링 중에도 변하지 않고, event.currentTarget은 이벤트 핸들러가 연결된 현재 요소로 일반 함수 핸들러의 this와 같다.

> 📝 **preventDefault** — 해당 이벤트에 대한 기본 동작(form 제출 시 새로고침, a 태그 페이지 이동 등)을 실행하지 않도록 지정하는 메서드이다.

## 🔍 출력 결과 예측 (예제)

답을 먼저 생각한 뒤 펼쳐 보세요.

```js
let x = 3
const y = x++
console.log(x, y)
```
<details><summary>정답</summary>

`4 3`

</details>

```js
console.log('1' == 1, '1' === 1, 0 == false, 0 === false)
```
<details><summary>정답</summary>

`true false true false`

</details>

```js
console.log(1 && 0, 4 && 7, 0 || 1, 4 || 7)
```
<details><summary>정답</summary>

`0 7 1 4`

</details>

```js
const obj1 = { name: 'Alice', age: 30 }
const obj2 = obj1
obj2.age = 40
console.log(obj1.age)
```
<details><summary>정답</summary>

`40` (참조 자료형은 주소가 복사됨)

</details>

```js
const arr = ['a', 'b', 'c']
for (const i in arr) console.log(i)
for (const i of arr) console.log(i)
```
<details><summary>정답</summary>

`0`, `1`, `2` (문자열 인덱스) 그다음 `a`, `b`, `c`

</details>

```js
const myFunc = function (param1, param2, ...restParams) {
  return [param1, param2, restParams]
}
console.log(myFunc(1, 2))
```
<details><summary>정답</summary>

`[1, 2, []]`

</details>

```js
const result = [1, 2, 3].forEach(item => item * 2)
console.log(result)
```
<details><summary>정답</summary>

`undefined` (forEach는 반환 값이 없음)

</details>

```js
const obj = { a: 2, c: 3, d: 4 }
console.log({ ...obj, a: 1, e: 5 })
```
<details><summary>정답</summary>

`{a: 1, c: 3, d: 4, e: 5}` (같은 키는 뒤가 덮어씀)

</details>

```js
console.log(typeof null, typeof undefined, null == undefined, null === undefined)
```
<details><summary>정답</summary>

`object undefined true false`

</details>
