## 학습 목표

- 원시 자료형과 참조 자료형의 차이점을 설명할 수 있다.
- 템플릿 리터럴을 사용해 변수를 포함한 문자열을 만든다.
- 동등(`==`) 연산자와 일치(`===`) 연산자의 차이를 안다.
- 논리 연산자의 단축 평가 결과를 예측할 수 있다.

## 데이터 타입

### 원시 자료형 vs 참조 자료형

| 구분 | 원시 자료형 (Primitive type) | 참조 자료형 (Reference type) |
|---|---|---|
| 저장 방식 | 값(value) 자체가 변수에 직접 저장되는 자료형 | 데이터가 저장된 메모리의 **주소**가 변수에 저장되는 자료형 |
| 변경 / 할당 | **불변(immutable)** 이며, 변수 간 할당 시 **값이 복사** | **가변(Mutable)** 이며, 변수 간 할당 시 **주소가 복사** |
| 종류 | `Number`, `String`, `Boolean`, `null`, `undefined` (+ `Symbol`, `BigInt`는 이번 과정에서 다루지 않음) | `Objects` (`Object`, `Array`, `Function`) |

> 📌 **TIP**
> - 참조 자료형은 주소를 복사하므로, 복사본을 수정하면 원본의 값도 함께 변경될 수 있어 주의해야 합니다.
> - 값이 불변이라는 것은, 값의 일부를 직접 수정할 수 없다는 의미입니다. (`let text = 'apple'; text[0] = 'S';`) 처럼 할당하는 것은 에러 없이 무시되어 값이 바뀌지 않음

### 원시 자료형 예시
- 변수에 할당될 때 **값이 복사**됨
- ➤ 변수 간에 서로 영향을 미치지 않음

```js
// data_types.html
const a = 'bar'
console.log(a) // bar

console.log(a.toUpperCase()) // BAR
console.log(a) // bar
```
```js
let b = 10
let c = b

c = 20

console.log(b) // 10
console.log(c) // 20
```

> 💡 **쉽게 이해하기** — `a.toUpperCase()`는 `'BAR'`라는 **새 문자열**을 돌려줄 뿐, `a` 자체를 바꾸지 않습니다(불변). `let c = b`는 10이라는 **값을 복사**해 넣었기 때문에 c를 바꿔도 b는 그대로입니다.

### 참조 자료형 예시
- 객체를 생성하면 객체의 **메모리 주소**를 변수에 할당
- ➤ 변수 간에 서로 영향을 미침

```js
// data_types.html
const obj1 = { name: 'Alice', age: 30 }
const obj2 = obj1

obj2.age = 40

console.log(obj1.age) // 40
console.log(obj2.age) // 40
```

> 💡 **쉽게 이해하기** — `obj2 = obj1`은 객체를 하나 더 만든 것이 아니라 **같은 객체를 가리키는 주소(열쇠)를 하나 더 복사**한 것입니다. 열쇠가 두 개여도 방은 하나이므로, obj2로 바꾸면 obj1에서도 바뀐 값이 보입니다.

## 원시 자료형

### 원시 자료형 종류
- Number
- String
- null
- undefined
- Boolean
- 그 외 Symbol, BigInt (이번 과정에서는 다루지 않음)

### Number – 정수 또는 실수형 숫자를 표현하는 자료형
- 사칙연산 및 나머지 연산 가능
- 문자열과 `+` 연산 시, 숫자가 문자열로 자동 형 변환되어 연결
- 정수와 실수 구분이 없고, 모든 숫자를 단일 타입으로 처리

```js
// primitive_types.html
const a = 13
const b = -5
const c = 3.14
const d = 2.998e8   // 2.998 * 10^8 = 299,800,000
const e = Infinity
const f = -Infinity
const g = NaN       // Not a Number를 나타내는 값
```

### NaN을 반환하는 경우 예시 (참고)
1. 숫자로서 읽을 수 없음 (`Number(undefined)`)
2. 결과가 허수인 수학 계산식 (`Math.sqrt(-1)`)
3. 피연산자가 NaN (`7 ** NaN`)
4. 정의할 수 없는 계산식 (`0 * Infinity`)
5. 문자열을 포함하면서 덧셈이 아닌 계산식 (`'가' / 3`)

> 📌 **TIP**
> - NaN은 자기 자신과 비교해도 `false`가 나오는 유일한 값입니다. (`NaN === NaN // false`)
> - NaN은 '숫자가 아님'이라는 뜻이지만, 타입을 확인하면 `'number'`가 반환됩니다.

### String – 텍스트 데이터를 표현하는 자료형
- `+` 연산자를 사용해 문자열끼리 결합
- 뺄셈, 곱셈, 나눗셈 불가능

```js
// primitive_types.html
const firstName = 'Tony'
const lastName = 'Stark'
const fullName = firstName + lastName

console.log(fullName) // TonyStark
```

### Template literals (템플릿 리터럴)
- 내장된 표현식을 허용하는 향상된 문자열 작성 방식
- **Backtick(`` ` ``)** 을 이용하며, 여러 줄에 걸쳐 문자열을 정의할 수도 있고 JavaScript의 변수를 문자열 안에 바로 연결할 수 있음
- 표현식은 **`${expression}`** 으로 표기
- ES6+ 부터 지원

```js
// primitive_types.html
const age = 100
const message = `홍길동은 ${age}세입니다.`
console.log(message) // 홍길동은 100세입니다.
```

> ⚠️ **헷갈리기 쉬운 점** — 따옴표(`'…'`)로 감싸면 `${age}`가 그대로 글자로 출력됩니다. 반드시 **백틱**으로 감싸야 변수가 들어갑니다.

### null / undefined

| null | undefined |
|---|---|
| 프로그래머가 **의도적으로 '값이 없음'** 을 나타낼 때 사용 | 시스템이나 JavaScript 엔진이 **'값이 할당되지 않음'** 을 나타낼 때 사용 |
| `let x = null` → `console.log(x) // null` | `let y` → `console.log(y) // undefined` |

> 📌 **TIP**
> - `null`의 타입은 `'object'`, `undefined`의 타입은 `'undefined'` 이므로 타입 검사 시 주의하세요. (null의 타입이 object인 이유는 초기 버전의 버그 – 아래 참고)
> - return 이 없는 함수나, 인자가 전달되지 않은 매개변수는 기본적으로 `undefined`가 할당됩니다.
> - 산술 연산 시 `null` 은 0으로 취급되지만, `undefined`는 계산 불가능한 `NaN` 값을 만듭니다.

### '값이 없음' 에 대한 표현이 null과 undefined 2가지인 이유 (참고)
1. **역사적 맥락**
   - JavaScript가 처음 만들어질 때, `null`은 '객체가 없음'을 나타내기 위해 도입
   - `undefined`는 나중에 추가되어 '값이 할당되지 않음'을 나타내게 됨
2. **typeof null의 결과가 "object"인 이유 (역사적 배경)**
   - 초기 버전에서 값의 타입을 나타내는 데 32비트 시스템을 사용
   - 타입 태그로 하위 3비트를 사용했는데, '000'은 객체를 나타냄
   - `null`은 모든 비트가 0인 특별한 값(NULL 포인터)으로 표현되었는데, 하필 객체 타입을 나타내는 태그 또한 `000`이었기 때문에 `null`을 객체로 잘못 판별하게 됨
3. **ECMAScript의 표준화**
   - ECMAScript 명세에서는 `null`을 원시 자료형으로 정의
   - 그러나 `typeof null`의 결과는 역사적인 이유로 "object"를 유지
   - ECMAScript 6 개발 중 이 문제를 수정하려는 시도가 있었지만, 이미 `typeof null === 'object'`라는 전제하에 만들어진 수많은 웹 사이트와의 **하위 호환성 문제** 때문에 수정되지 못함

```js
typeof null        // "object"
typeof undefined   // "undefined"

null == undefined  // true
null === undefined // false
```

> 💡 **쉽게 이해하기** — null은 **원시 자료형**이 맞습니다. `typeof null`이 `'object'`인 건 "버그가 굳어진 것"일 뿐입니다. 시험에서 "typeof null의 결과는 'null'이다"는 **틀린 문장**입니다.

### Boolean – 참과 거짓을 나타내는 논리적인 자료형
- 조건문 또는 반복문에서 Boolean이 아닌 데이터 타입은
- **"자동 형변환 규칙"** 에 따라 `true` 또는 `false`로 변환됨

### 자동 형변환

| 데이터 타입 | false | true |
|---|---|---|
| undefined | 항상 false | X |
| null | 항상 false | X |
| Number | `0`, `-0`, `NaN` | 나머지 모든 경우 |
| String | `''` (빈 문자열) | 나머지 모든 경우 |

> 💡 **쉽게 이해하기** — false가 되는 값만 외우면 됩니다: **`undefined`, `null`, `0`, `-0`, `NaN`, `''`**. 나머지는 모두 true입니다. 예를 들어 문자열 `'0'`은 빈 문자열이 아니므로 true입니다.

## 연산자

### 연산자 종류
- 할당 연산자
- 증가 & 감소 연산자
- 비교 연산자
- 동등 연산자
- 일치 연산자
- 논리 연산자

### 할당 연산자
- 오른쪽에 있는 피연산자의 평가 결과를 왼쪽 피연산자에 할당하는 연산자
- **단축 연산자** 지원

> 📝 **단축 연산자**: `x = x + 1` 을 `x += 1` 처럼 코드를 짧게 줄여주는 연산자

```js
// operators.html
let a = 0

a += 10
console.log(a) // 10

a -= 3
console.log(a) // 7

a *= 10
console.log(a) // 70

a %= 7
console.log(a) // 0
```

### 증가 & 감소 연산자
- 증가 연산자 (`++`)
  - 피연산자를 증가(1을 더함)시키고 연산자의 위치에 따라 증가하기 전이나 후의 값을 반환
- 감소 연산자 (`--`)
  - 피연산자를 감소(1을 뺌)시키고 연산자의 위치에 따라 감소하기 전이나 후의 값을 반환
- ➤ 코드의 가독성을 위해 `a += 1`, `a -= 1`과 같이 더 명시적인 표현을 권장

```js
// operators.html
let x = 3
const y = x++
console.log(x, y) // 4 3
let m = 3
const n = ++m
console.log(m, n) // 4 4
```

> 💡 **쉽게 이해하기** — 연산자가 **뒤에(`x++`)** 있으면 "먼저 현재 값을 주고, 나중에 1 증가" → y는 3. 연산자가 **앞에(`++m`)** 있으면 "먼저 1 증가하고, 그 값을 준다" → n은 4. 두 경우 모두 변수 자체(x, m)는 4가 됩니다.

### 비교 연산자
- 피연산자들(숫자, 문자, Boolean 등)을 비교하고 결과 값을 boolean으로 반환하는 연산자

```js
// operators.html
console.log(3 > 2) // true
console.log(3 < 2) // false
console.log('A' < 'B') // true
console.log('Z' < 'a') // true
console.log('가' < '나') // true
```

> 💡 **쉽게 이해하기** — 문자열은 사전 순서로 비교합니다. 대문자가 소문자보다 앞에 있어서 `'Z' < 'a'`도 true입니다.

### 동등 연산자 (`==`)
- 두 피연산자가 같은 값으로 평가되는지 비교한 후 boolean 값을 반환
- **'암묵적 타입 변환'** 통해 타입을 일치시킨 후 같은 값인지 비교
- 두 피연산자가 모두 객체일 경우 메모리의 같은 객체를 바라보는지 판별

```js
// operators.html
console.log(1 == 1) // true
console.log('hello' == 'hello') // true
console.log('1' == 1) // true
console.log(0 == false) // true
```

> 📌 **TIP**
> - `0 == false`, `'' == []` 가 `true` 가 되는 등, 직관과 다른 암묵적 타입 변환이 일어나니 주의하세요.
> - 내용이 같아도 다른 객체이면 `false` 입니다. `[1] == [1]` 은 `false` 이니 주의하세요.

### 일치 연산자 (`===`)
- 두 피연산자의 **값과 타입이 모두 같은 경우** true를 반환
- 같은 객체를 가리키거나, 같은 타입이면서 같은 값인지를 비교
- 엄격한 비교가 이뤄지며 **암묵적 타입 변환이 발생하지 않음**
- 특별한 경우를 제외하고는, 예측하지 못한 결과를 방지하기 위해 **일치 연산자(`===`) 사용을 권장**

```js
// operators.html
console.log(1 === 1) // true
console.log('hello' === 'hello') // true
console.log('1' === 1) // false
console.log(0 === false) // false
```

> 💡 **쉽게 이해하기 – 같은 식, 다른 결과**
>
> | 식 | `==` | `===` | 이유 |
> |---|---|---|---|
> | `'1'` vs `1` | true | false | 문자열 vs 숫자 (타입 다름) |
> | `0` vs `false` | true | false | 숫자 vs 불리언 |
> | `null` vs `undefined` | true | false | 타입 다름 |
> | `[1]` vs `[1]` | false | false | 서로 다른 객체(주소가 다름) |

### 논리 연산자
- and 연산 – `&&`
- or 연산 – `||`
- not 연산 – `!`
- **단축 평가** 지원

```js
// operators.html

console.log(true && false) // false
console.log(true && true) // true

console.log(false || true) // true
console.log(false || false) // false

console.log(!true) // false

console.log(1 && 0) // 0
console.log(0 && 1) // 0
console.log(4 && 7) // 7
console.log(1 || 0) // 1
console.log(0 || 1) // 1
console.log(4 || 7) // 4
```

> 💡 **쉽게 이해하기 – 단축 평가 규칙** (위 교안 예제의 결과를 설명하는 규칙)
> - `A && B` : A가 **거짓**이면 더 볼 필요 없이 **A를 반환**, A가 참이면 **B를 반환** → `0 && 1`은 0, `4 && 7`은 7
> - `A || B` : A가 **참**이면 더 볼 필요 없이 **A를 반환**, A가 거짓이면 **B를 반환** → `4 || 7`은 4, `0 || 1`은 1
> - 결과가 `true`/`false`가 아니라 **피연산자 값 그 자체**라는 점이 포인트입니다. (참/거짓 판단은 위의 자동 형변환 표를 따름)

## 핵심 정리
- JavaScript의 데이터 타입은 크게 두 가지(원시 자료형, 참조 자료형)
- **원시 자료형**: 변수에 값이 직접 저장 / Number, String, Boolean, null, undefined / 불변, 할당 시 값이 복사
- **참조 자료형**: 객체의 메모리 주소가 변수에 저장 / Object, Array, Function / 가변, 할당 시 주소가 복사되어 원본과 사본이 서로 영향을 줌
- 템플릿 리터럴: 백틱(`` ` ``)을 사용해 변수를 `${}` 형태로 문자열에 쉽게 삽입
- null은 개발자가 의도적으로 '값이 없음', undefined는 '값이 할당되지 않음'을 시스템이 나타낼 때 사용
- `==`는 타입을 일치시킨 후 값을 비교(예측하기 어려운 결과 주의), `===`는 값과 타입을 모두 비교(사용 권장)
- 논리 연산자 `&&`(AND), `||`(OR), `!`(NOT)는 단축 평가를 지원

## 교안 실습 문제
- 연산자: **2963.** 다양한 연산자 · **3076.** 연산자와 제어문
