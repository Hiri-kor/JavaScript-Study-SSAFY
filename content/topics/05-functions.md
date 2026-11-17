## 학습 목표

- 함수 선언식과 표현식의 차이를 알고 함수를 정의한다.
- 나머지 매개변수와 전개 구문을 함수에 활용할 수 있다.
- 화살표 함수 표현식을 사용하여 간결하게 함수를 정의한다.
- 콜백 함수를 이해하고 다른 함수의 인자로 전달할 수 있다.

## Function

- 참조 자료형에 속하며 **모든 함수는 Function object**

| 원시 자료형 (Primitive type) | 참조 자료형 (Reference type) |
|---|---|
| 변수에 값이 직접 저장되는 자료형 | 객체의 주소가 저장되는 자료형 |
| 불변이며, 값이 복사 됨 | 가변이며, 주소가 복사 됨 |
| Number, String, Boolean, null, undefined | **Objects (Object, Array, Function)** |

## 함수 정의

### 함수 구조
```js
function name ([param[, param,[..., param]]]) {
  statements
  return value
}
```
- `function` 키워드
- 함수의 이름
- 함수의 매개변수
- 함수의 body를 구성하는 statements
- ❖ return 문이 없거나 return 뒤에 값이 없으면, 함수는 **`undefined`를 반환**합니다.

### 함수 정의 2가지 방법

| 선언식 (function declaration) | 표현식 (function expression) |
|---|---|
| `function funcName () { statements }` | `const funcName = function () { statements }` |

```js
// 선언식
function add (num1, num2) {
  return num1 + num2
}
add(1, 2) // 3
```
```js
// 표현식
const sub = function (num1, num2) {
  return num1 - num2
}
sub(2, 1) // 1
```

### 함수 선언식 특징
- **선언 전에 호출할 수 있음** (함수 전체가 호이스팅 됨)
- 코드의 구조와 가독성 면에서는 표현식에 비해 장점이 있음

```js
add(1, 2) // 3

function add (num1, num2) {
  return num1 + num2
}
```

> 📌 **TIP – 호이스팅** — 자바스크립트 엔진이 코드 실행 전 변수와 함수 선언을 먼저 등록해서, 선언이 스코프 최상단으로 끌어올려진 것처럼 보이는 현상

### 함수 표현식 특징
- **선언 전에 호출할 수 없음**
  - 변수(`sub`)는 호이스팅 되지만, 함수가 할당되는 줄에 도달하기 전까지 **TDZ**에 있어 접근하면 `ReferenceError` 발생
- 함수 이름이 없는 **'익명 함수'** 를 사용할 수 있음

```js
sub(2, 1) // ReferenceError: Cannot access 'sub' before initialization

const sub = function (num1, num2) {
  return num1 - num2
}
```

> 📝 **용어**
> - **TDZ (Temporal Dead Zone)**: 호이스팅 되었지만, 선언한 줄에 도달하기 전까지는 접근할 수 없는 구간
> - **익명 함수**: 이름 없이, 필요할 때 즉시 만들어서 사용하는 일회용 함수

> 💡 **쉽게 이해하기** — 함수 표현식은 결국 **"const 변수에 함수 값을 넣은 것"** 입니다. 그래서 const의 규칙(TDZ)을 그대로 따라 선언 전에 부를 수 없습니다. 선언식은 함수 전체가 미리 준비돼 있어 어디서든 부를 수 있습니다.

### 함수 표현식 사용을 권장하는 이유
- **예측 가능성**
  - 선언 전에 호출할 수 없으므로 "정의 후 호출" 순서가 코드에 그대로 드러나 실행 흐름을 예측하기 쉬움
- **유연성**
  - 변수에 할당되므로 함수를 값으로 다루기 쉬움
- **스코프 관리**
  - 블록 스코프를 가지는 `let`이나 `const`와 함께 사용하여 더 엄격한 스코프 관리가 가능

> 📝 **서술형 대비** — "함수 선언식은 함수 전체가 호이스팅되어 선언 전에 호출할 수 있지만, 함수 표현식은 변수가 TDZ에 있어 선언 전에 호출할 수 없다. 표현식은 정의 후 호출 순서가 드러나 예측 가능성이 높고, 함수를 값으로 다루기 쉬우며, let/const와 함께 엄격한 스코프 관리가 가능해 사용이 권장된다."

## 매개변수

### 매개변수 정의 방법
1. 기본 함수 매개 변수
2. 나머지 매개 변수

> 📝 **매개 변수**: 함수가 외부로부터 값을 전달받기 위해 만들어 놓은 변수

### 1. 기본 함수 매개변수 (Default function parameter)
- 함수 호출 시 인자를 전달하지 않거나 `undefined`를 전달할 경우, 지정된 기본값으로 매개변수를 초기화

```js
// function_parameters.html

const greeting = function (name = 'Anonymous') {
  return `Hi ${name}`
}

console.log(greeting()) // Hi Anonymous
```

### 2. 나머지 매개변수 (Rest parameter)
- 정해지지 않은 개수의 인자들을 **배열로 모아서** 받는 방법
- 작성 규칙
  - 함수 정의 시 나머지 매개변수는 **하나만** 작성할 수 있음
  - 나머지 매개변수는 함수 정의에서 매개변수 **마지막에 위치**해야 함

```js
// function_parameters.html
const myFunc = function (param1, param2, ...restParams) {
  return [param1, param2, restParams]
}

console.log(myFunc(1, 2, 3, 4, 5)) // [1, 2, [3, 4, 5]]
console.log(myFunc(1, 2)) // [1, 2, []]
```

> 💡 **쉽게 이해하기** — 앞에서부터 param1, param2가 1, 2를 가져가고 **남은 것(rest)** 이 전부 배열로 묶입니다. 남은 게 없으면 `undefined`가 아니라 **빈 배열 `[]`** 입니다.

### 매개변수와 인자 개수가 불일치 할 때
- **매개변수 개수 > 인자 개수** → 누락된 인자는 `undefined`로 할당

```js
// function_parameters.html

const threeArgs = function (param1, param2, param3) {
  return [param1, param2, param3]
}

console.log(threeArgs()) // [undefined, undefined, undefined]
console.log(threeArgs(1)) // [1, undefined, undefined]
console.log(threeArgs(2, 3)) // [2, 3, undefined]
```

- **매개변수 개수 < 인자 개수** → 초과 입력한 인자는 사용하지 않음

```js
// function_parameters.html

const noArgs = function () {
  return 0
}
console.log(noArgs(1, 2, 3)) // 0

const twoArgs = function (param1, param2) {
  return [param1, param2]
}
console.log(twoArgs(1, 2, 3)) // [1, 2]
```

> ⚠️ **헷갈리기 쉬운 점** — 인자가 모자라거나 남아도 **에러가 나지 않습니다.** 모자라면 `undefined`, 남으면 무시됩니다.

## Spread syntax

### Spread syntax `...` (전개 구문)
- 배열이나 문자열처럼 반복 가능한(iterable) 항목들을 **개별 요소로 펼치는 것**
- 전개 대상에 따라 역할이 다름
  - ➤ 배열이나 객체의 요소를 개별적인 값으로 분리하거나 다른 배열이나 객체의 요소를 현재 배열이나 객체에 추가하는 등

### 전개 구문 활용처
1. 함수와의 사용
   1. 함수 호출 시 인자 확장
   2. 나머지 매개변수 (압축)
2. 객체와의 사용 → [객체](06-objects.html) 주제
3. 배열과의 활용 → [배열](07-arrays.html) 주제

### 함수와의 사용 1. 인자 확장 (함수 호출 시)
```js
// spread_syntax.html

function myFunc(x, y, z) {
  return x + y + z
}

let numbers = [1, 2, 3]

console.log(myFunc(...numbers)) // 6
```

### 함수와의 사용 2. 나머지 매개변수 (압축)
```js
// spread_syntax.html

function myFunc2(x, y, ...restArgs) {
  return [x, y, restArgs]
}

console.log(myFunc2(1, 2, 3, 4, 5)) // [1, 2, [3, 4, 5]]
console.log(myFunc2(1, 2)) // [1, 2, []]
```

> 💡 **쉽게 이해하기 – 같은 `...`, 반대 역할**
>
> | 위치 | 이름 | 하는 일 | 예 |
> |---|---|---|---|
> | 함수를 **부를 때**(인자 자리) | 전개 구문 | 배열을 **펼친다** | `myFunc(...numbers)` → `myFunc(1, 2, 3)` |
> | 함수를 **만들 때**(매개변수 자리) | 나머지 매개변수 | 여러 값을 배열로 **모은다** | `function (x, y, ...restArgs)` |

## 화살표 함수 표현식

### 화살표 함수 표현식 (Arrow function expressions) – 함수 표현식의 간결한 표현법
```js
const arrow = function (name) {
  return `hello, ${name}`
}
```
➡
```js
const arrow = name => `hello, ${name}`
```

### 화살표 함수 작성 과정
1. `function` 키워드 제거 후 매개변수와 중괄호 사이에 화살표(`=>`) 작성
2. 함수의 매개변수가 **하나 뿐**이라면, 매개변수의 `()` 제거 가능 (단, 생략하지 않는 것을 권장)
3. 함수 본문의 표현식이 **한 줄**이라면, `{}` 와 `return` 제거 가능

```js
const arrow1 = function (name) {
  return `hello, ${name}`
}

// 1. function 키워드 삭제 후 화살표 작성
const arrow2 = (name) => { return `hello, ${name}` }

// 2. 인자의 소괄호 삭제 (인자가 1개일 경우에만 가능)
const arrow3 = name => { return `hello, ${name}` }

// 3. 중괄호와 return 삭제 (함수 본문이 return을 포함한 표현식 1개일 경우에만 가능)
const arrow4 = name => `hello, ${name}`
```

> ⚠️ **헷갈리기 쉬운 점** — `{}`와 `return`은 **둘 다 같이** 지우거나 **둘 다 같이** 남겨야 합니다.
> - `name => { 'hello, ' + name }` : 중괄호만 남고 return이 없음 → 값을 돌려주지 않음(undefined)
> - `(name) => return 'hello, ' + name` : 중괄호 없이 return만 있음 → 문법 오류

### 화살표 함수 심화 (참고)
```js
// arrow_function.html

// 1. 인자가 없다면 () 로 표시 가능
const noArgs1 = () => 'No args'

// 2. 관례상 쓰지 않는 매개변수를 _로 표시하기도 함 (`_`는 이름이 `_`인 매개변수 1개)
const noArgs2 = _ => 'No args'

// 3-1. object를 return 한다면 return 을 명시적으로 작성해야 함
const returnObject1 = () => { return { key: 'value' } }

// 3-2. return을 작성하지 않으려면 객체를 소괄호로 감싸야 함
const returnObject2 = () => ({ key: 'value' })
```

> 💡 **쉽게 이해하기** — 3-2에서 소괄호가 필요한 이유: 화살표 뒤의 `{`는 "함수 본문의 시작"으로 읽히기 때문에, 객체라는 걸 알려 주려고 `( )`로 감쌉니다.

## 콜백 함수 (함수의 확장)

### 콜백 함수 (Callback function) – 함수의 인자로 전달되어, 특정 시점에 호출되는 함수
- 어떤 작업이 완료된 후, "나중에 호출(Call back)해줘!"라고 넘겨주는 함수
- 특정 작업(1초 기다리기, …)이 완료된 후, 시스템에 의해 나중에 호출(call back)되는 함수
- ➤ **"함수의 실행 권한"을 다른 함수에게 위임**하는 것

### 콜백 함수 쉽게 이해하기 – 비유: 진동벨
1. 카페에서 커피를 주문 (요청)
2. 직원이 진동벨을 줌 (콜백 함수 전달)
   - "커피 다 되면(이벤트 발생 시), 이 벨을 울려주세요(함수 실행)."
3. 우리는 자리에 앉아 다른 일을 진행
4. 커피가 완성되면 직원이 진동벨을 울림 (콜백 함수 실행)

> 📌 **TIP** — 우리가 계속 카운터 앞에 서서 기다릴 필요가 없는 것처럼, 콜백 함수는 **"특정 시점"** 에 실행되어야 할 일을 미리 등록해두는 개념입니다.

### 기본 동작 원리
- 콜백 함수는 배열이 아닌 일반적인 함수에서도 사용됨

```js
// 1. 인자로 받을 콜백 함수 정의
const greeting = function (name) {
  console.log(`Hello, ${name}!`)
}

// 2. 함수를 인자로 받는 메인 함수
const processUserInput = function (callback) {
  const name = 'Anna'
  // 넘겨받은 함수(callback)를 여기서 실행
  callback(name)
}

// 3. 실행 (함수를 데이터처럼 전달)
processUserInput(greeting) // 출력: Hello, Anna!
```

> ⚠️ **헷갈리기 쉬운 점** — 넘길 때는 `processUserInput(greeting)` 처럼 **괄호 없이** 함수 자체를 넘깁니다. `greeting()`으로 쓰면 그 자리에서 실행된 결과(undefined)가 넘어갑니다.

### 왜 사용할까? (1) 기능의 유연성
- 상황: 숫자를 계산하는 함수를 만들기
- 문제: 더하기, 빼기, 곱하기… 모든 경우의 수를 함수 하나에 다 넣으면 복잡해짐
- 해결: "계산하는 로직(콜백)"만 쏙 바꿔 끼우면 해결

```js
// 뼈대 함수 (외부 함수)
const calculator = function (a, b, action) {
  return action(a, b)
}

// 부품 함수들 (콜백 함수)
const add = (a, b) => a + b
const sub = (a, b) => a - b

console.log(calculator(10, 20, add)) // 30 (더하기 기능으로 동작)
console.log(calculator(10, 20, sub)) // -10 (빼기 기능으로 동작)
```
- ※ 뼈대(calculator)는 그대로 두고, 부품(add, sub)만 교체해서 전혀 다른 동작을 수행할 수 있음

### 왜 사용할까? (2) 시점 제어 (맛보기)
- 비동기 처리 (Asynchronous)
  - 어떤 작업이 시간이 걸릴 때, 그 작업이 끝난 직후에 실행하고 싶을 때 사용
  - **대표적인 예시: `setTimeout` (타이머)**

```js
console.log('1. 주문 하기')

// "3초 뒤에 이 함수를 실행해줘"라고 콜백을 전달
setTimeout(function () {
  console.log('2. 커피 나왔습니다! (콜백 실행)')
}, 3000)

console.log('3. 자리에 앉기')
```
```console
// 실행 결과:
1. 주문 하기
3. 자리에 앉기
2. 커피 나왔습니다! (콜백 실행) (3초 뒤에 출력)
```

> 📌 **TIP**
> - 비동기 처리는 JavaScript의 핵심 개념으로, 추후 비동기 Javascript 수업에서 아주 자세히 다룰 예정입니다.
> - 지금은 **"시간차를 두고 실행할 때도 콜백을 쓰는구나"** 정도만 기억하면 됩니다.

### 배열과 콜백 함수
- 지금까지 배운 콜백 함수의 특징
  1. 함수를 인자로 넘긴다.
  2. 받은 쪽에서 그 함수를 실행한다.
  3. **반복적인 작업**을 시킬 때 아주 유용하다. → [배열과 Array Helper Method](07-arrays.html)

## 종합 예제 – 장바구니 총액과 무료 배송

> 💡 학습 시작 질문: **"장바구니 총액을 계산하고, 특정 금액이 넘으면 '무료 배송'을 적용하는 기능은 어떻게 만들까요?"**
> 1. 상품 정보를 **데이터**로 담고, **연산자**로 가격을 계산한 뒤, **반복문**으로 모든 상품의 가격을 합산해야 합니다.
> 2. 마지막으로 **조건문**을 통해 무료 배송 여부를 판단하고, 이 모든 과정을 하나의 **함수**로 묶어 완성할 수 있습니다.

```js
const calculateCartTotal = function (items) {
  let total = 0

  for (const item of items) {
    total += item.price * item.quantity
  }

  if (total >= 50000) {
    console.log(`총액: ${total}원 (무료 배송)`)
  } else {
    console.log(`총액: ${total}원`)
  }
}
```

## 핵심 정리
- **함수 선언식**: `function funcName() {}` 형태, 호이스팅되어 선언 전에도 호출 가능
- **함수 표현식**: `const funcName = function() {}` 형태, 선언 전 호출 불가 → 예측 가능성이 높아 사용 권장
- **화살표 함수**: `const arrow = () => {}`, 본문이 한 줄이면 `{}`와 `return` 생략 가능
- **기본 매개변수**: `function (name = 'Anonymous')` – 인자가 없을 때 기본값
- **나머지 매개변수**: `function (...args) {}` – 정해지지 않은 수의 인자를 배열로 받음 (하나만, 맨 마지막)
- **전개 구문 (`...`)**: `myFunc(...numbers)` – 배열을 펼쳐 인자로 전달
- **콜백 함수**: 다른 함수의 인자로 전달되어 외부 함수 안에서(특정 시점에) 호출되는 함수
