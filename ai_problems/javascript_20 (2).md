# JavaScript – Basic Syntax 01 코드 빈칸 채우기 20문항

첨부된 강의 자료(`1112_JavaScript_Basic_Syntax_01.md`)의 예제 코드를 바탕으로 제작된 **코드 빈칸 채우기** 전용 20문항입니다. 주석으로 제시된 실행 결과나 설명에 맞도록 `(   )` 또는 `______` 빈칸에 알맞은 코드나 키워드를 작성해 보세요.

---

## [1~4] 데이터 타입과 템플릿 리터럴

**1. 다음은 참조 자료형(객체)의 주소 복사 특성을 확인하는 코드입니다. 마지막 두 줄의 `console.log` 결과가 모두 `40`이 출력되도록 빈칸 `( A )`, `( B )`를 채우시오.**
```js
const obj1 = { name: 'Alice', age: 30 }
const obj2 = (  A  )

obj2.(  B  ) = 40

console.log(obj1.age) // 40
console.log(obj2.age) // 40
```

**2. 템플릿 리터럴(Template literals)을 사용하여 콘솔에 `'홍길동은 100세입니다.'`가 출력되도록 빈칸 `( A )`, `( B )`, `( C )`에 알맞은 기호와 표현식을 채우시오.**
```js
const age = 100
const message = ( A )홍길동은 (   B   )세입니다.( C )

console.log(message) // 홍길동은 100세입니다.
```

**3. 변수 `x`에는 개발자가 의도적으로 '값이 없음'을 나타내는 값을 할당하고, 변수 `y`는 선언만 하여 시스템이 '값이 할당되지 않음'을 나타내도록 빈칸 `( A )`와 주석의 출력 결과 `( B )`를 채우시오.**
```js
let x = (   A   )
let y

console.log(x) // null
console.log(y) // (   B   )
```

**4. `null`과 `undefined`의 타입을 확인하는 코드입니다. 실행 결과 주석의 빈칸 `( A )`, `( B )`를 채우시오.**
```js
console.log(typeof null)      // "(   A   )"
console.log(typeof undefined) // "(   B   )"
```

---

## [5~9] 연산자와 조건문

**5. 단축 할당 연산자를 사용하여 주석에 적힌 순서대로 변수 `a`의 값이 출력되도록 빈칸 `( A )` ~ `( D )`에 알맞은 연산자를 채우시오.**
```js
let a = 0

a ( A ) 10
console.log(a) // 10

a ( B ) 3
console.log(a) // 7

a ( C ) 10
console.log(a) // 70

a ( D ) 7
console.log(a) // 0
```

**6. 전위/후위 증가 연산자의 위치에 따라 주석과 같은 결과가 출력되도록 빈칸 `( A )`, `( B )`를 채우시오. (변수 `x`와 `m`에 각각 `++` 연산자를 결합하여 작성)**
```js
let x = 3
const y = (  A  )
console.log(x, y) // 4 3

let m = 3
const n = (  B  )
console.log(m, n) // 4 4
```

**7. 첫 번째 줄은 암묵적 타입 변환이 일어나는 '동등 연산자'를 사용하고, 두 번째 줄은 타입까지 엄격하게 비교하는 '일치 연산자'를 사용하도록 빈칸 `( A )`, `( B )`에 알맞은 연산자를 채우시오.**
```js
console.log('1' (  A  ) 1) // true
console.log('1' (  B  ) 1) // false
```

**8. 다음은 `name` 변수의 값에 따라 다른 환영 메시지를 출력하는 조건문입니다. 빈칸 `( A )`, `( B )`에 알맞은 조건문 키워드를 채우시오.**
```js
const name = 'customer'

if (name === 'admin') {
  console.log('관리자님 환영해요')
} (   A   ) (name === 'customer') {
  console.log('고객님 환영해요')
} (  B  ) {
  console.log(`반갑습니다. ${name}님`)
}
```

**9. 변수 `age`가 `18` 이상이면 `'성인'`, 그렇지 않으면 `'미성년자'`를 반환하는 삼항 연산자 식을 완성하기 위해 빈칸 `( A )`, `( B )`에 알맞은 기호를 채우시오.**
```js
const age = 20
const message = (age >= 18) ( A ) '성인' ( B ) '미성년자'
console.log(message) // '성인'
```

---

## [10~13] 반복문

**10. `0`부터 `5`까지의 숫자를 순서대로 콘솔에 출력하는 `while` 반복문과 `for` 반복문입니다. 빈칸 `( A )`, `( B )`, `( C )`에 알맞은 코드를 채우시오.**
```js
// 1) while 문
let i = 0
while ((   A   )) {
  console.log(i)
  i += 1
}

// 2) for 문
for ((   B   ); i < 6; (  C  )) {
  console.log(i)
}
```

**11. 객체 `fruits`의 키(`a`, `b`)와 값(`apple`, `banana`)을 모두 출력하기 위해 빈칸 `( A )`에 알맞은 반복문 키워드를 넣고, 빈칸 `( B )`에 객체의 값에 접근하는 표현식을 채우시오.**
```js
const fruits = { a: 'apple', b: 'banana' }

for (const property ( A ) fruits) {
  console.log(property)   // a, b
  console.log((    B    )) // apple, banana
}
```

**12. 배열 `numbers`의 요소 값(`0, 1, 2, 3`)을 순서대로 순회하며 출력하도록 빈칸 `( A )`, `( B )`를 채우시오. (단, 블록 내부에서 재할당하지 않으므로 상수 선언 키워드를 사용할 것)**
```js
const numbers = [0, 1, 2, 3]

for ((  A  ) number ( B ) numbers) {
  console.log(number) // 0, 1, 2, 3
}
```

**13. 다음은 장바구니 상품 목록(`items`)을 순회하며 총액을 계산하는 함수입니다. 빈칸 `( A )`, `( B )`, `( C )`에 알맞은 코드를 채우시오.**
```js
const calculateCartTotal = function (items) {
  let total = 0

  for (const item ( A ) items) {
    total ( B ) item.price * item.quantity
  }

  if (total ( C ) 50000) {
    console.log(`총액: ${total}원 (무료 배송)`)
  } else {
    console.log(`총액: ${total}원`)
  }
}
```

---

## [14~20] 함수 (선언/표현식, 매개변수, 전개 구문, 화살표 함수)

**14. 두 수를 더하는 `add` 함수를 '함수 선언식'으로 정의하고, 두 수를 빼는 `sub` 함수를 익명 함수를 활용한 '함수 표현식'으로 정의하려고 합니다. 빈칸 `( A )`, `( B )`를 채우시오.**
```js
// 1) 함수 선언식
(       A       ) (num1, num2) {
  return num1 + num2
}

// 2) 함수 표현식
const sub = (       B       ) (num1, num2) {
  return num1 - num2
}
```

**15. 함수 호출 시 인자를 전달하지 않았을 때 `'Anonymous'`라는 기본값이 사용되도록 기본 함수 매개변수(Default function parameter)를 설정하는 빈칸 `( A )`를 채우시오.**
```js
const greeting = function ((          A          )) {
  return `Hi ${name}`
}

console.log(greeting()) // Hi Anonymous
```

**16. 첫 번째와 두 번째 인자는 각각 `param1`, `param2`로 받고, 그 외에 정해지지 않은 개수의 나머지 인자들은 `restParams`라는 배열로 모아서 받도록 빈칸 `( A )`를 채우시오.**
```js
const myFunc = function (param1, param2, (       A       )) {
  return [param1, param2, restParams]
}

console.log(myFunc(1, 2, 3, 4, 5)) // [1, 2, [3, 4, 5]]
console.log(myFunc(1, 2))          // [1, 2, []]
```

**17. 배열 `numbers`의 요소들을 전개 구문(Spread syntax)을 사용해 함수 `myFunc`의 개별 인자로 확장하여 전달하도록 빈칸 `( A )`를 채우시오.**
```js
function myFunc(x, y, z) {
  return x + y + z
}

let numbers = [1, 2, 3]

console.log(myFunc((     A     ))) // 6
```

**18. 일반 함수 표현식을 3단계에 걸쳐 가장 간결한 화살표 함수로 줄이는 과정입니다. 빈칸 `( A )`, `( B )`, `( C )`를 채우시오.**
```js
const arrow1 = function (name) {
  return `hello, ${name}`
}

// 1단계: function 키워드 제거 후 화살표 작성
const arrow2 = (name) ( A ) { return `hello, ${name}` }

// 2단계: 인자가 1개이므로 소괄호 제거
const arrow3 = (  B  ) => { return `hello, ${name}` }

// 3단계: 본문이 표현식 1줄이므로 중괄호와 return 제거
const arrow4 = name => (       C       )
```

**19. 매개변수가 없는 화살표 함수를 정의하는 두 가지 방법입니다. 빈칸 `( A )`에는 소괄호를 사용하고, 빈칸 `( B )`에는 관례상 쓰지 않는 매개변수를 나타내는 기호(식별자) 1개를 사용하여 채우시오.**
```js
// 1) 소괄호 사용
const noArgs1 = ( A ) => 'No args'

// 2) 쓰지 않는 매개변수 표기 관례 사용
const noArgs2 = ( B ) => 'No args'
```

**20. 화살표 함수에서 `{ key: 'value' }` 객체를 반환하는 두 가지 방법입니다. `returnObject1`은 `return` 키워드를 명시하고, `returnObject2`는 `return` 키워드를 생략하는 방식으로 빈칸 `( A )`, `( B )`를 채우시오.**
```js
// 1) return 키워드를 명시하는 경우
const returnObject1 = () => { (          A          ) }

// 2) return 키워드와 블록 중괄호를 생략하는 경우
const returnObject2 = () => (          B          )
```

---

## 정답 및 해설

| 문항 | 정답 | 해설 |
|:---:|---|---|
| **1** | `(A)`: `obj1`<br>`(B)`: `age` | `const obj2 = obj1`으로 객체의 메모리 주소를 복사한 후 `obj2.age = 40`으로 속성을 변경하면, 같은 객체를 바라보는 `obj1.age`도 `40`이 됩니다. |
| **2** | `(A)`: `` ` `` (백틱)<br>`(B)`: `${age}`<br>`(C)`: `` ` `` (백틱) | 템플릿 리터럴은 문자열 전체를 백틱(`` ` ``)으로 감싸고, 변수는 `${변수명}` 형태로 삽입합니다. |
| **3** | `(A)`: `null`<br>`(B)`: `undefined` | 의도적인 '값 없음'은 `null`을 할당하고, 변수를 선언만 하고 초기화하지 않으면 자동으로 `undefined`가 할당됩니다. |
| **4** | `(A)`: `object`<br>`(B)`: `undefined` | JavaScript 초기 버전의 설계 오류(버그)로 인해 `typeof null`은 `"object"`를 반환합니다. |
| **5** | `(A)`: `+=`<br>`(B)`: `-=`<br>`(C)`: `*=`<br>`(D)`: `%=` | 각각 덧셈(`+=`), 뺄셈(`-=`), 곱셈(`*=`), 나머지(`%=`) 연산 후 왼쪽 변수에 결과를 재할당하는 단축 연산자입니다. |
| **6** | `(A)`: `x++`<br>`(B)`: `++m` | `y`에 증가 전의 값 `3`이 들어가려면 후위 증가 연산자(`x++`)를 써야 하고, `n`에 증가 후의 값 `4`가 들어가려면 전위 증가 연산자(`++m`)를 써야 합니다. |
| **7** | `(A)`: `==`<br>`(B)`: `===` | 동등 연산자(`==`)는 문자열 `'1'`을 숫자 `1`로 변환하여 `true`를 반환하고, 일치 연산자(`===`)는 타입이 다르므로 `false`를 반환합니다. |
| **8** | `(A)`: `else if`<br>`(B)`: `else` | 다중 조건문에서는 첫 조건 뒤에 `else if (조건)`로 추가 조건을 검사하고, 모든 조건이 거짓일 때 실행할 블록은 `else`로 작성합니다. |
| **9** | `(A)`: `?`<br>`(B)`: `:` | 삼항 연산자는 `조건식 ? 참일_때_값 : 거짓일_때_값` 형태로 작성합니다. |
| **10** | `(A)`: `i < 6`<br>`(B)`: `let i = 0`<br>`(C)`: `i++` (또는 `i += 1`) | `for` 문은 `[초기문]; [조건문]; [증감문]`으로 구성되며, 재할당이 일어나므로 초기문 변수는 반드시 `let`으로 선언해야 합니다. |
| **11** | `(A)`: `in`<br>`(B)`: `fruits[property]` | 객체의 키를 순회할 때는 `for...in`을 사용하며, 변수 `property`에 담긴 키로 값에 접근할 때는 대괄호 표기법 `fruits[property]`를 사용합니다. |
| **12** | `(A)`: `const`<br>`(B)`: `of` | 배열과 같은 반복 가능한(iterable) 객체의 값을 순회할 때는 `for...of`를 사용하며, 매 반복마다 새로운 변수에 지정되므로 `const`를 사용할 수 있습니다. |
| **13** | `(A)`: `of`<br>`(B)`: `+=`<br>`(C)`: `>=` | 배열 `items`의 요소를 순회하므로 `of`, `total`에 금액을 누적 합산하므로 `+=`, 50,000원 이상 조건이므로 `>=`가 들어갑니다. |
| **14** | `(A)`: `function add`<br>`(B)`: `function` | 함수 선언식은 `function 함수명()` 형태로 작성하고, 함수 표현식은 변수에 익명 함수 `function ()`을 할당하는 형태로 작성합니다. |
| **15** | `(A)`: `name = 'Anonymous'` | 매개변수 자리에 `매개변수명 = 기본값` 형태로 작성하면 인자가 전달되지 않거나 `undefined`일 때 기본값으로 초기화됩니다. |
| **16** | `(A)`: `...restParams` | 나머지 매개변수(Rest parameter)는 매개변수 이름 앞에 점 3개(`...`)를 붙여 작성하며, 항상 마지막 위치에 와야 합니다. |
| **17** | `(A)`: `...numbers` | 함수 호출 시 인자 자리에 `...배열명`을 작성하면 배열의 요소들이 개별 인자로 펼쳐져서(전개되어) 전달됩니다. |
| **18** | `(A)`: `=>`<br>`(B)`: `name`<br>`(C)`: `` `hello, ${name}` `` | 화살표(`=>`)를 추가한 뒤, 인자가 1개면 소괄호를 생략(`name`)할 수 있고, 본문이 반환문 1줄이면 `{}`와 `return`을 함께 생략할 수 있습니다. |
| **19** | `(A)`: `()`<br>`(B)`: `_` | 인자가 없을 때는 빈 소괄호 `()`를 사용하거나, 관례적으로 사용하지 않는 매개변수 1개를 의미하는 언더바 `_`를 사용할 수 있습니다. |
| **20** | `(A)`: `return { key: 'value' }`<br>`(B)`: `({ key: 'value' })` | 화살표 함수에서 객체를 반환할 때 중괄호와 `return`을 생략하려면, 객체의 중괄호가 함수 블록으로 해석되지 않도록 소괄호 `()`로 감싸야 합니다. |