## 학습 목표

- `if`와 삼항 연산자로 조건을 표현할 수 있다.
- `while`, `for`의 동작 순서를 설명할 수 있다.
- `for...in`과 `for...of` 반복문의 차이와 용도를 안다.

## 조건문

### if 조건문
- 조건 표현식의 결과값을 **boolean 타입으로 변환 후** 참/거짓을 판단

```js
// if_statement.html

const name = 'customer'
if (name === 'admin') {
  console.log('관리자님 환영해요')
} else if (name === 'customer') {
  console.log('고객님 환영해요')
} else {
  console.log(`반갑습니다. ${name}님`)
}
```

> 💡 **쉽게 이해하기** — 조건 자리에 boolean이 아닌 값이 오면 [자동 형변환](03-types-operators.html#자동-형변환) 규칙으로 true/false가 정해집니다. 예: `if (0)`은 거짓, `if ('hello')`는 참.

### 삼항 연산자
- 간단한 조건부 로직을 간결하게 표현할 때 유용
- 복잡한 로직이나 대다수의 경우에는 가독성이 떨어질 수 있으므로 **적절한 상황에서만** 사용할 것

> 📝 **삼항 연산자 표현식**: `condition ? expression1 : expression2`
> - `condition` – 평가할 조건 (true 또는 false로 평가)
> - `expression1` – 조건이 **true**일 경우 반환할 값 또는 표현식
> - `expression2` – 조건이 **false**일 경우 반환할 값 또는 표현식

```js
// if_statement.html
const age = 20
const message = (age >= 18) ? '성인' : '미성년자'
console.log(message) // '성인'
```

> 💡 **쉽게 이해하기** — "삼항"은 피연산자가 **세 개**(조건, 참일 때 값, 거짓일 때 값)라는 뜻입니다. `?` 앞이 질문, `:` 앞이 "예", 뒤가 "아니오"라고 읽으면 쉽습니다.

## 반복문

### 반복문 종류
- `while`
- `for`
- `for … in`
- `for … of`

### while 반복문 – 조건문이 참이면 문장을 계속해서 수행
```js
while (조건문) {
  // do something
}
```
```js
// loops_and_iteration.html

let i = 0
while (i < 6) {
  console.log(i)
  i += 1
}
```

### for 반복문 – 특정한 조건이 거짓으로 판별될 때까지 반복
```js
for ([초기문]; [조건문]; [증감문]) {
  // do something
}
```
```js
// loops_and_iteration.html

for (let i = 0; i < 6; i++) {
  console.log(i)
}
```

### for 동작 원리
```js
for (let i = 0; i < 6; i++) {
  console.log(i)
}
```
1. 반복문 진입 및 변수 `i` 선언 (`let i = 0`) — **딱 한 번**
2. 조건문 평가 후 코드 블록 실행 (`i < 6` → `console.log(i)` → 0 출력)
3. 코드 블록 실행 이후 `i` 값 증가 (`i++`)
4. 다시 2번으로 → 조건이 거짓(`i`가 6)이 될 때까지 **2 ↔ 3 반복**

> 💡 **쉽게 이해하기** — 출력은 0, 1, 2, 3, 4, 5 (6번)입니다. i가 6이 되는 순간 조건 `i < 6`이 거짓이라 블록을 실행하지 않고 끝납니다.

## for … in

### for … in – 객체의 열거 가능한(enumerable) 속성(property)의 **키(key)** 에 대해 반복
```js
for (variable in object) {
  statement
}
```
```js
// loops_and_iteration.html

const fruits = { a: 'apple', b: 'banana' }

for (const property in fruits) {
  console.log(property) // a, b
  console.log(fruits[property]) // apple, banana
}
```

## for … of

### for … of – 반복 가능한(iterable) 객체(배열, 문자열 등)의 **값(value)** 에 대해 반복합니다.
```js
for (variable of iterable) {
  statement
}
```
```js
// loops_and_iteration.html

const numbers = [0, 1, 2, 3]
for (const number of numbers) {
  console.log(number) // 0, 1, 2, 3
}
```

> 💡 **외우는 법** — **in → 키(key)·인덱스**, **of → 값(value)**. "객체엔 in, 배열엔 of".

## for … in 과 for … of

### 배열과 객체에 각각 써 보기
```js
// forin_and_forof.html
// Array
const arr1 = ['a', 'b', 'c']
for (const elem in arr1) {
  console.log(elem) // 0 1 2
}
// Object
const capitals1 = {
  korea: '서울',
  japan: '도쿄',
  china: '베이징'
}
for (const capital in capitals1) {
  console.log(capital) // korea japan china
}
```
```js
// Array
const arr2 = ['a', 'b', 'c']
for (const elem of arr2) {
  console.log(elem) // a b c
}
// Object
const capitals2 = {
  korea: '서울',
  japan: '도쿄',
  china: '베이징'
}
for (const capital of capitals2) {
  console.log(capital)
  // TypeError: capitals2 is not iterable
}
```

> 💡 **쉽게 이해하기** — 교안이 강조한 조합은 **for…in + 객체(키 순회)**, **for…of + 배열(값 순회)** 입니다. 객체는 반복 가능한(iterable) 객체가 아니라서 for…of에 넣으면 TypeError가 납니다.

### 배열 반복과 for…in
- 객체의 관점에서 보면, 배열의 인덱스도 "정수 형태의 이름을 가진 열거 가능한 속성"
- `for…in`은 정수가 아닌 이름과 속성을 포함하여 열거 가능한 모든 속성을 반환
- 내부적으로 `for…in`은 배열의 반복자가 아닌 속성 열거를 사용하기 때문에 **특정 순서에 따라 인덱스를 반환하는 것을 보장할 수 없음**
- ➤ 따라서 `for...in`은 인덱스의 순서가 중요한 **배열에서는 사용하지 않음**
- ➤ 배열에서는 **`for` 문, `for…of`를 사용**
- 객체 관점에서 배열의 인덱스는 정수 이름을 가진 속성이기 때문에 인덱스가 출력됨 (순서 보장 X)

```js
// loops_and_iteration.html
const arr = ['a', 'b', 'c']

for (const i in arr) {
  console.log(i) // 0, 1, 2
}

for (const i of arr) {
  console.log(i) // a, b, c
}
```

> 📌 **TIP**
> - `for … in` 은 배열의 값이 아닌 인덱스를, 그것도 숫자가 아닌 **'문자열'** 로 반환하니 주의해야 합니다.
> - 배열의 프로토타입에 추가된 속성까지 순회할 수 있어, 예기치 않은 버그를 유발할 수 있습니다.

### 반복문 사용 시 const 사용 여부
- **for 문**
  - `for (let i = 0; i < arr.length; i++) { ... }`의 경우에는 최초 정의한 `i`를 **"재할당"** 하면서 사용하기 때문에 **`const`를 사용하면 에러 발생**
- **for…in, for…of**
  - 재할당이 아니라, 매 반복마다 다른 속성 이름이 변수에 지정되는 것이므로 **`const`를 사용해도 에러가 발생하지 않음**
  - 단, `const` 특징에 따라 블록 내부에서 변수를 수정할 수 없음

> 💡 **쉽게 이해하기** — 일반 for 문은 `i++`로 **같은 변수 i의 값을 바꾸는(재할당)** 구조라 const가 안 됩니다. for…in / for…of는 반복할 때마다 **새 변수가 만들어지는** 구조라 const가 됩니다.

### 반복문 종합

| 키워드 | 특징 | 스코프 |
|---|---|---|
| `while` | 조건이 참인 동안 | 블록 스코프 (let, const 사용 시) |
| `for` | 횟수 제어 | 블록 스코프 (let, const 사용 시) |
| `for … in` | object 순회 | 블록 스코프 (let, const 사용 시) |
| `for … of` | iterable 순회 | 블록 스코프 (let, const 사용 시) |

## 핵심 정리
- `if`는 조건을 boolean으로 변환해 판단, 삼항 연산자는 `조건 ? 참일 때 : 거짓일 때` (피연산자 3개)
- `for...in`: 객체의 키(key)를 순회, 배열에는 부적합 (인덱스를 문자열로 반환하고 순서를 보장하지 않음)
- `for...of`: 배열 등 반복 가능한 객체의 값(value)을 순회, 객체는 반복 가능하지 않으므로 직접 사용할 수 없음
- 일반 `for`문의 카운터는 `let`, `for...in`/`for...of`의 변수는 `const` 가능

## 교안 실습 문제
- 조건문: **2960.** 기초 문법 디버깅 - 조건문과 변수 선언 · **2965.** 제어문
- 반복문: **2964.** 배열 순회 · **3077.** 배열과 객체 순회 · **3078.** 반복문과 제어문 · **2961.** 기초 문법 디버깅 - 반복문
