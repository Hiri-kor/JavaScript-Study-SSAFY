# JavaScript – Basic Syntax 02 주관식 20문항

> **문제 유형**: 단답형(핵심 용어 및 메서드명), 코드 빈칸 채우기, 실행 결과 예측, 핵심 개념 서술형

---

## [파트 1] 객체와 `this`, JSON, 추가 객체 문법 (1~8번)

**1. [단답형] 객체에 특정 속성이 존재하는지 여부를 확인할 때 사용하는 연산자 `( A )`와, 프로토타입 체인을 통해 상속받은 속성은 제외하고 객체 자기 자신의 고유 속성만 확인할 때 사용하는 정적 메서드 `Object.( B )(obj, key)`의 빈칸에 들어갈 알맞은 말을 쓰시오.**

**2. [실행 결과 예측] 브라우저 환경에서 다음 코드를 실행했을 때 콘솔에 출력되는 결과 2가지를 순서대로 쓰시오.**
```js
const myObj = {
  numbers: [1],
  myFunc1: function () {
    this.numbers.forEach(function (num) {
      console.log(this) // (1) 첫 번째 출력
    })
  },
  myFunc2: function () {
    this.numbers.forEach((num) => {
      console.log(this) // (2) 두 번째 출력
    })
  }
}

myObj.myFunc1()
myObj.myFunc2()
```

**3. [서술형] 2번 문제의 `myFunc1`과 `myFunc2`에서 `this`의 출력 결과가 서로 다르게 나타나는 이유를 '일반 함수'와 '화살표 함수'의 `this` 바인딩 특징을 비교하여 간단히 서술하시오.**

**4. [단답형] 네트워크 통신 등을 위해 JavaScript 객체를 JSON 형식의 문자열로 변환하는 메서드 `( A )`와, 반대로 JSON 형식의 문자열을 JavaScript 객체로 변환하는 메서드 `( B )`의 전체 이름(예: `JSON.xxx`)을 쓰시오.**

**5. [코드 작성] 다음 코드에서 함수 `printInfo`의 매개변수 자리에 '객체 구조 분해 할당' 문법을 적용하여 빈칸 `(   A   )`에 들어갈 알맞은 코드를 작성하시오.**
```js
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}

function printInfo(   A   ) {
  console.log(`이름: ${firstName}, 이메일: ${email}`)
}

printInfo(userInfo) // 출력: 이름: Alice, 이메일: alice123@gmail.com
```

**6. [단답형] 객체를 정의할 때 대괄호(`[]`)를 사용하여 고정된 문자열이 아닌 변수의 값이나 표현식의 연산 결과를 동적으로 객체의 키(Key)로 생성하는 문법(예: `{ [prefix + suffix]: 'value' }`)을 무엇이라고 하는지 쓰시오.**

**7. [실행 결과 예측] 다음 코드에서 `Object`의 정적 메서드를 호출했을 때 콘솔에 출력되는 `(1)`, `(2)`, `(3)`의 결과를 배열 형태로 정확히 쓰시오.**
```js
const profile = { name: 'Alice', age: 30 }

console.log(Object.keys(profile))    // (1)
console.log(Object.values(profile))  // (2)
console.log(Object.entries(profile)) // (3)
```

**8. [단답형] 중첩된 객체의 속성에 접근할 때 참조 대상이 `null` 또는 `undefined`인 경우 에러(`TypeError`)를 발생시키는 대신 평가를 멈추고 `undefined`를 반환하는 연산자의 기호 `( A )`와, 이처럼 중간 평가 대상이 없을 때 뒤쪽 코드를 실행하지 않고 멈추는 평가 방식을 뜻하는 용어 `( B )`를 쓰시오.**

---

## [파트 2] 배열 기초 및 콜백 함수 (9~12번)

**9. [단답형] 배열의 기본 조작 메서드 4가지(`push`, `pop`, `unshift`, `shift`) 중, 배열의 맨 앞 요소를 추가하거나 제거하기 때문에 나머지 모든 요소를 한 칸씩 밀거나 당겨와야 해서 배열이 클수록 성능이 저하되는 메서드 2가지를 모두 쓰시오.**

**10. [실행 결과 예측] 다음 코드를 실행했을 때 콘솔에 출력되는 `(1)`과 `(2)`의 값을 쓰시오.**
```js
const names = ['Alice', 'Bella', 'Cathy']
const returnVal1 = names.push('Dan')
const returnVal2 = names.pop()

console.log(returnVal1) // (1)
console.log(returnVal2) // (2)
```

**11. [단답형] 다른 함수의 인자로 전달되어, 당장 실행되지 않고 특정 작업이 완료된 후나 특정 시점에 외부 함수에 의해 호출되는 함수를 무엇이라고 하는지 쓰시오. (카페의 '진동벨'에 비유되는 개념)**

**12. [실행 결과 예측] 다음 비동기 타이머 코드를 실행했을 때 콘솔에 출력되는 문자열의 순서를 쓰시오.**
```js
console.log('1. 주문 하기')

setTimeout(function () {
  console.log('2. 커피 나왔습니다!')
}, 3000)

console.log('3. 자리에 앉기')
```

---

## [파트 3] Array Helper Methods 및 전개 구문 (13~17번)

**13. [실행 결과 예측] `forEach`와 `map`의 차이를 보여주는 다음 코드에서 `result1`과 `result2`에 저장되어 콘솔에 출력되는 값을 각각 쓰시오.**
```js
const arr = [1, 2, 3]

const result1 = arr.forEach((item) => {
  return item * 2
})

const result2 = arr.map((item) => {
  return item * 2
})

console.log(result1) // (1)
console.log(result2) // (2)
```

**14. [서술형] 배열을 순회하는 `forEach()` 메서드의 주의사항 2가지를 '반환 값(return)'과 '반복 제어(`break`, `continue`)' 관점에서 서술하고, 만약 순회 도중 멈춰야 할 때는 어떤 반복문을 사용해야 하는지 함께 쓰시오.**

**15. [코드 작성] 다음 상품 목록 배열 `products`에서 `id`가 `3`인 상품을 제거한 새로운 배열 `deletedList`를 만들고자 한다. 원본 배열을 훼손하지 않는 배열 헬퍼 메서드를 사용하여 빈칸 `(   A   )`를 완성하시오. (화살표 함수 사용)**
```js
const products = [
  { id: 1, name: 'Cucumber' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Carrot' },
  { id: 4, name: 'Apple' },
]

const deletedList = products.(   A   )
```

**16. [단답형] 다음 설명에 해당하는 Array Helper Method의 이름을 각각 쓰시오.**
- `( A )`: 배열에서 콜백 함수의 반환 값이 `true`인 모든 요소를 모아 새로운 배열로 반환하되, 조건을 만족하는 요소가 하나도 없으면 빈 배열(`[]`)을 반환한다.
- `( B )`: 배열의 요소 중 적어도 하나라도 콜백 함수를 통과하면 즉시 배열 순회를 중지하고 `true`를 반환한다.
- `( C )`: 배열의 모든 요소가 콜백 함수를 통과해야만 `true`를 반환하며, 하나라도 통과하지 못하면 즉시 `false`를 반환하고 순회를 중지한다.

**17. [서술형] 객체나 배열에서 전개 구문(`...`)을 사용하여 복사본을 만들 때 수행되는 '얕은 복사(Shallow Copy)'의 개념을 설명하고, 배열 안에 객체가 들어있는 경우 복사본의 내부 객체 속성을 수정하면 원본 배열에는 어떤 영향이 발생하는지 서술하시오.**

---

## [파트 4] 심화 및 참고: `reduce`, 선언형 프로그래밍, 클래스 (18~20번)

**18. [코드 빈칸 및 결과 예측] `reduce` 메서드를 사용하여 배열 내 각 이름의 등장 횟수를 세어 객체로 변환하는 코드이다. 빈칸 `( A )`에 들어갈 알맞은 초기값(initialValue)과, 최종적으로 콘솔에 출력되는 `nameCounts`의 결과 `( B )`를 쓰시오.**
```js
const names = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob']

const nameCounts = names.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1
  return acc
}, ( A ))

console.log(nameCounts) // ( B )
```

**19. [단답형] `for...of`처럼 "어떻게(How)" 순회할지 하나하나 명령하는 방식을 '명령형 프로그래밍'이라고 한다면, `forEach`나 `map`처럼 콜백 함수를 전달하여 "무엇을(What)" 할지만 신경 쓰는 프로그래밍 스타일(Vue, React가 지향하는 방식)을 무엇이라고 부르는지 쓰시오.**

**20. [단답형] ES6에서 도입된 클래스(Class) 문법과 관련하여 다음 빈칸에 들어갈 알맞은 키워드 및 용어를 쓰시오.**
- 클래스로부터 새로운 객체를 생성할 때 사용하는 연산자는 `( A )`이며, 이 연산자 없이 클래스를 호출하면 `TypeError`가 발생한다.
- 클래스 내부에서 객체가 생성될 때 자동으로 호출되어 속성 값의 초기 설정을 담당하며, 클래스 내에 단 하나만 존재할 수 있는 메서드의 이름은 `( B )`이다.
- 클래스는 호이스팅되지만 선언 전에 접근하면 에러가 발생하는데, 이처럼 선언 전 접근을 막는 일시적 사각 지대를 가리키는 약어는 `( C )`이다.

---
---

## 정답 및 해설

### [파트 1] 객체와 `this`, JSON, 추가 객체 문법
1. **(A) `in` / (B) `hasOwn` (또는 `hasOwnProperty`)**
   - **해설**: `'key' in obj`는 프로토타입 체인을 따라 상속된 속성까지 확인합니다. 객체 고유의 속성만 확인하려면 `Object.hasOwn(obj, key)`를 사용합니다.
2. **(1) `window` (전역 객체) / (2) `myObj` (`{ numbers: [1], myFunc1: ƒ, myFunc2: ƒ }`)**
   - **해설**: 첫 번째는 전역 객체인 `window`가 출력되고, 두 번째는 메서드를 호출한 객체인 `myObj`가 출력됩니다.
3. **[모범 답안] `myFunc1`의 `forEach` 콜백은 일반 함수로 작성되어 단순 호출되었기 때문에 `this`가 전역 객체(`window`)를 가리키지만, `myFunc2`의 `forEach` 콜백은 화살표 함수로 작성되었으며 화살표 함수는 자신만의 `this`를 가지지 않고 상위(외부) 스코프인 `myFunc2`의 `this`(`myObj`)를 그대로 가져와 참조하기 때문이다.**
4. **(A) `JSON.stringify` (또는 `JSON.stringify()`) / (B) `JSON.parse` (또는 `JSON.parse()`)**
   - **해설**: 객체를 JSON 문자열로 직렬화할 때는 `JSON.stringify()`, JSON 문자열을 객체로 역직렬화할 때는 `JSON.parse()`를 사용합니다.
5. **`{ firstName, email }`**
   - **해설**: 객체를 통째로 인자로 넘길 때 매개변수 자리에서 `{ firstName, email }`과 같이 중괄호를 사용하면 필요한 속성만 즉시 구조 분해하여 변수로 꺼내 쓸 수 있습니다.
6. **계산된 속성 (Computed property name)**
   - **해설**: 대괄호(`[]`)로 둘러싸여 변수 값이나 연산 결과를 동적으로 객체의 키로 사용하는 문법입니다.
7. **(1) `['name', 'age']` / (2) `['Alice', 30]` / (3) `[['name', 'Alice'], ['age', 30]]`**
   - **해설**: `Object.keys()`는 키 목록 배열, `Object.values()`는 값 목록 배열, `Object.entries()`는 `[키, 값]` 쌍의 배열들을 담은 2차원 배열을 반환합니다.
8. **(A) `?.` (옵셔널 체이닝, Optional chaining) / (B) 단락 평가 (Short-circuit evaluation)**
   - **해설**: `?.` 연산자는 왼쪽 평가 대상이 `null`이나 `undefined`일 때 뒤쪽 코드를 실행하지 않고 즉시 평가를 멈추어 `undefined`를 반환합니다(단락 평가).

### [파트 2] 배열 기초 및 콜백 함수
9. **`unshift` (또는 `unshift()`), `shift` (또는 `shift()`)**
   - **해설**: 배열의 앞부분에 요소를 추가(`unshift`)하거나 제거(`shift`)하면 뒤따르는 모든 요소의 인덱스를 재조정해야 하므로 성능이 저하됩니다.
10. **(1) `4` / (2) `'Dan'`**
    - **해설**: `push()`는 요소가 추가된 후의 **새로운 배열의 길이**(`4`)를 반환하고, `pop()`은 배열 끝에서 **제거한 요소 그 자체**(`'Dan'`)를 반환합니다.
11. **콜백 함수 (Callback function)**
    - **해설**: 함수의 인자로 전달되어 특정 시점에 호출되는 함수로, 함수의 실행 권한을 다른 함수에게 위임하는 개념입니다.
12. **`1. 주문 하기` → `3. 자리에 앉기` → `2. 커피 나왔습니다!`**
    - **해설**: `setTimeout`에 전달된 콜백 함수는 비동기로 동작하여 3초 뒤에 실행되므로, 그 아래에 있는 `'3. 자리에 앉기'`가 먼저 출력됩니다.

### [파트 3] Array Helper Methods 및 전개 구문
13. **(1) `undefined` / (2) `[2, 4, 6]`**
    - **해설**: `forEach`는 콜백 내부에서 `return`을 작성하더라도 아무런 의미가 없으며 항상 `undefined`를 반환합니다. 반면 `map`은 콜백이 `return`한 값들을 모아 새로운 배열 `[2, 4, 6]`을 반환합니다.
14. **[모범 답안] (1) 별도의 반환 값이 없어 변수에 할당해도 항상 `undefined`만 저장된다. (2) 배열의 끝까지 무조건 순회하므로 중간에 `break`나 `continue`를 사용하여 멈추거나 건너뛸 수 없다. 중간에 반복을 멈춰야 한다면 `for...of` 반복문(또는 기본 `for` 문)을 사용해야 한다.**
15. **`filter(product => product.id !== 3)` (또는 `filter((product) => { return product.id !== 3 })`)**
    - **해설**: 특정 요소를 삭제할 때는 원본을 직접 파괴하는 대신 `filter`를 사용하여 삭제하려는 조건(`id === 3`)을 제외한 나머지(`id !== 3`)만 남기는 방식을 사용합니다.
16. **(A) `filter` / (B) `some` / (C) `every`**
    - **해설**: 조건에 맞는 요소를 걸러내어 새 배열로 만드는 것은 `filter`, 하나라도 통과하는지 확인하는 것은 `some`, 모두 통과하는지 확인하는 것은 `every`입니다.
17. **[모범 답안] 얕은 복사란 객체나 배열의 겉(최상위 속성/요소)만 새롭게 복사하고, 그 안에 들어있는 중첩 객체는 데이터가 아닌 메모리 주소값만 복사(공유)하는 방식이다. 따라서 배열 안의 내부 객체 속성을 복사본에서 수정하면 같은 주소를 바라보고 있는 원본 배열의 객체 속성도 함께 바뀌게 된다.**

### [파트 4] 심화 및 참고: `reduce`, 선언형 프로그래밍, 클래스
18. **(A) `{}` (빈 객체) / (B) `{ Alice: 2, Bob: 2, Charlie: 1 }`**
    - **해설**: 배열을 객체 형태로 집계할 때는 `reduce`의 초기값(`initialValue`)으로 빈 객체 `{}`를 설정해야 하며, 순회가 끝나면 각 이름의 빈도수가 담긴 객체가 반환됩니다.
19. **선언형 프로그래밍 (Declarative Programming)**
    - **해설**: 어떻게(How) 순회할지 제어하는 명령형(Imperative)과 달리, 무엇을(What) 처리할지에 집중하는 스타일을 선언형(Declarative) 프로그래밍이라고 합니다.
20. **(A) `new` / (B) `constructor` (또는 `constructor()`) / (C) `TDZ` (Temporal Dead Zone)**
    - **해설**: 클래스 인스턴스 생성 시 `new` 연산자를 사용하며, 이때 `constructor()` 메서드가 자동 호출됩니다. 클래스 선언 전 접근이 금지되는 구간을 TDZ라고 합니다.