# JavaScript – Basic Syntax 02 코드 빈칸 채우기 20문항

> **문제 안내**
> - 주석으로 제시된 **실행 결과(출력값)** 또는 **요구사항**을 만족하도록 코드의 빈칸 `( A )`, `( B )` 등에 들어갈 알맞은 JavaScript 코드나 키워드를 작성하시오.

---

## [파트 1] 객체 기초, `this`, JSON (1~6번)

### 1. 객체 속성 접근 및 삭제
띄어쓰기가 포함된 객체의 속성을 조회하고, 특정 속성을 삭제하는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 알맞은 코드를 작성하시오.
```js
const user = {
  name: 'Alice',
  'key with space': true,
}

// 1. 'key with space' 속성 조회하기
console.log(user( A )) // 출력: true

// 2. user 객체에서 name 속성 삭제하기
( B ) user.name
console.log(user) // 출력: { 'key with space': true }
```

---

### 2. 객체 고유 속성 확인
프로토타입 체인을 통해 상속받은 속성은 제외하고, `user` 객체 **자기 자신의 고유 속성**으로 `'name'`이 존재하는지 확인하는 코드이다. 빈칸 `( A )`에 들어갈 알맞은 메서드명을 작성하시오.
```js
const user = { name: 'Alice' }

console.log(Object.( A )(user, 'name')) // 출력: true
```

---

### 3. 메서드와 `this` 키워드
객체의 메서드 내부에서 자신이 속한 객체의 `name` 속성에 접근하여 인사말을 반환하는 코드이다. 빈칸 `( A )`에 들어갈 알맞은 코드를 작성하시오.
```js
const person = {
  name: 'Alice',
  greeting: function () {
    return `Hello my name is ${( A )}`
  },
}

console.log(person.greeting()) // 출력: Hello my name is Alice
```

---

### 4. 중첩 함수에서의 `this` 문제 해결 (화살표 함수)
`myObj.myFunc()` 실행 시 `forEach` 내부에서 `this`가 전역 객체(`window`)가 아닌 `myObj`를 가리키도록 콜백 함수를 작성하려고 한다. 빈칸 `( A )`에 들어갈 화살표 함수 선언부를 작성하시오. (매개변수 이름은 `number` 사용)
```js
const myObj = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach(( A ) {
      console.log(this) // 출력: myObj (3번 반복)
    })
  }
}

myObj.myFunc()
```

---

### 5. 객체와 JSON 상호 변환
JavaScript 객체를 JSON 문자열로 변환하고, 이를 다시 JavaScript 객체로 되돌리는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 알맞은 메서드를 작성하시오.
```js
const jsObject = { coffee: 'Americano', iceCream: 'Cookie and cream' }

// 1. Object -> JSON 문자열 변환
const objToJson = JSON.( A )(jsObject)
console.log(typeof objToJson) // 출력: string

// 2. JSON 문자열 -> Object 변환
const jsonToObj = JSON.( B )(objToJson)
console.log(typeof jsonToObj) // 출력: object
```

---

### 6. 계산된 속성 (Computed Property Name)
변수 `prefix`와 `suffix`를 결합한 문자열을 객체 `bag`의 동적 키(Key)로 설정하는 코드이다. 빈칸 `( A )`에 들어갈 알맞은 코드를 작성하시오.
```js
const prefix = 'my'
const suffix = 'property'

const bag = {
  ( A ): 'value'
}

console.log(bag) // 출력: { myproperty: 'value' }
```

---

## [파트 2] 추가 객체 문법 (7~10번)

### 7. 객체 구조 분해 할당 (기본 및 매개변수)
객체의 속성을 분해하여 변수에 할당하고, 함수의 매개변수 자리에서도 구조 분해 할당을 활용하는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 알맞은 코드를 작성하시오.
```js
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}

// 1. userInfo에서 firstName과 userId만 추출하여 동명의 상수에 할당
const ( A ) = userInfo
console.log(firstName, userId) // 출력: Alice alice123

// 2. 함수의 매개변수에서 구조 분해 할당을 사용하여 firstName과 email만 추출
function printInfo(( B )) {
  console.log(`이름: ${firstName}, 이메일: ${email}`)
}
printInfo(userInfo) // 출력: 이름: Alice, 이메일: alice123@gmail.com
```

---

### 8. 객체 전개 구문과 속성 덮어쓰기
전개 구문(`...`)을 사용하여 `obj`를 얕은 복사하면서 동시에 기존 속성 `a`의 값을 `1`로 수정하고 새 속성 `e: 5`를 추가하는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 코드를 작성하시오.
```js
const obj = { a: 2, c: 3, d: 4 }

const newObj = { ( A ), ( B ), e: 5 }
console.log(newObj) // 출력: { a: 1, c: 3, d: 4, e: 5 }
```

---

### 9. 유용한 객체 정적 메서드 (`keys`, `values`, `entries`)
주어진 `profile` 객체에서 키 배열, 값 배열, `[키, 값]` 쌍의 배열을 각각 추출하는 코드이다. 빈칸 `( A )`, `( B )`, `( C )`에 들어갈 알맞은 메서드명을 작성하시오.
```js
const profile = { name: 'Alice', age: 30 }

console.log(Object.( A )(profile)) // 출력: ['name', 'age']
console.log(Object.( B )(profile)) // 출력: ['Alice', 30]
console.log(Object.( C )(profile)) // 출력: [['name', 'Alice'], ['age', 30]]
```

---

### 10. Optional Chaining (`?.`)
존재하지 않는 중첩 속성(`address.street`)과 존재하지 않는 메서드(`nonMethod`)에 접근할 때 에러(`TypeError`) 대신 `undefined`가 반환되도록 안전하게 접근하는 코드이다. 빈칸 `( A )`와 `( B )`를 완성하시오.
```js
const userData = {
  name: 'Alice'
}

// 1. 중첩 속성에 안전하게 접근
console.log(userData.address( A )street) // 출력: undefined

// 2. 존재하지 않을 수 있는 메서드를 안전하게 호출
console.log(userData.nonMethod( B )) // 출력: undefined
```

---

## [파트 3] 배열 기초, 콜백 함수, Array Helper Methods (11~17번)

### 11. 배열 기본 조작 메서드 (`push`, `pop`, `unshift`, `shift`)
주석의 배열 상태 변화에 맞게 빈칸 `( A )`, `( B )`, `( C )`, `( D )`에 들어갈 배열 조작 메서드명을 각각 작성하시오.
```js
const names = ['Alice', 'Bella']

names.( A )('Cathy') // 배열 끝에 추가 -> ['Alice', 'Bella', 'Cathy']
names.( B )()        // 배열 끝 요소 제거 -> ['Alice', 'Bella']
names.( C )('Eric')  // 배열 앞에 추가 -> ['Eric', 'Alice', 'Bella']
names.( D )()        // 배열 앞 요소 제거 -> ['Alice', 'Bella']
```

---

### 12. 콜백 함수 기본 동작 원리
함수를 다른 함수의 인자로 전달하여 호출하는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 알맞은 코드를 작성하시오.
```js
const calculator = function (a, b, action) {
  // 넘겨받은 콜백 함수를 인자 a, b와 함께 호출하여 결과 반환
  return ( A )
}

const add = (a, b) => a + b

// calculator 함수에 10, 20과 함께 add 함수를 콜백으로 전달
console.log(calculator(10, 20, ( B ))) // 출력: 30
```

---

### 13. `forEach` 매개변수 활용
`forEach` 메서드의 콜백 함수가 제공하는 3가지 기본 매개변수를 모두 받아 출력하는 코드이다. 출력 결과에 맞게 빈칸 `( A )`, `( B )`, `( C )`에 들어갈 매개변수를 순서대로 작성하시오.
```js
const names = ['Alice', 'Bella']

names.forEach((( A ), ( B ), ( C )) => {
  console.log(`${name} / ${index} / ${array}`)
})
/* 출력 결과:
Alice / 0 / Alice,Bella
Bella / 1 / Alice,Bella
*/
```

---

### 14. `map`을 활용한 데이터 변형
객체 배열 `persons`에서 각 사람의 `name` 속성만 추출하여 새로운 배열을 만들고, 문자열 배열 `names`에서 각 문자열의 길이를 담은 새로운 배열을 만드는 코드이다. 빈칸 `( A )`와 `( B )`를 완성하시오.
```js
const persons = [
  { name: 'Alice', age: 20 },
  { name: 'Bella', age: 21 }
]

// 1. 이름만 모은 새 배열 생성 (return 문 작성)
const personNames = persons.map((person) => {
  ( A )
})
console.log(personNames) // 출력: ['Alice', 'Bella']

// 2. 한 줄 화살표 함수를 사용해 각 이름의 길이 배열 생성
const lengths = personNames.map(( B ))
console.log(lengths) // 출력: [5, 5]
```

---

### 15. `filter`를 활용한 조건 선별 및 삭제 구현
숫자 배열에서 짝수만 걸러내고, 상품 배열에서 특정 ID를 제외한 나머지 상품만 남기는 코드이다. 빈칸 `( A )`와 `( B )`에 들어갈 조건식을 작성하시오.
```js
// 1. 짝수만 걸러내기
const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter((num) => {
  return ( A )
})
console.log(evens) // 출력: [2, 4]

// 2. id가 3인 상품을 제외(삭제)한 새 배열 만들기
const products = [
  { id: 1, name: 'Cucumber' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Carrot' }
]
const deletedList = products.filter(product => ( B ))
console.log(deletedList) // 출력: [{ id: 1, name: 'Cucumber' }, { id: 2, name: 'Banana' }]
```

---

### 16. 기타 배열 헬퍼 메서드 (`find`, `some`, `every`)
주석의 설명과 출력 결과에 맞게 빈칸 `( A )`, `( B )`, `( C )`에 들어갈 알맞은 배열 헬퍼 메서드명을 작성하시오.
```js
const nums = [1, 2, 3, 4, 5]

// 1. 3보다 큰 첫 번째 요소 자체를 반환
const found = nums.( A )(n => n > 3)
console.log(found) // 출력: 4

// 2. 요소 중 짝수가 하나라도 있는지 확인
const hasEven = nums.( B )(n => n % 2 === 0)
console.log(hasEven) // 출력: true

// 3. 모든 요소가 0보다 큰지 확인
const allPositive = nums.( C )(n => n > 0)
console.log(allPositive) // 출력: true
```

---

### 17. 배열과 전개 구문 (Spread Syntax)
원본 배열 `parts`를 수정하지 않고 배열 중간에 `parts`의 요소들을 펼쳐서 삽입한 새로운 배열 `lyrics`를 만드는 코드이다. 빈칸 `( A )`에 들어갈 코드를 작성하시오.
```js
const parts = ['어깨', '무릎']
const lyrics = ['머리', ( A ), '발']

console.log(lyrics) // 출력: ['머리', '어깨', '무릎', '발']
```

---

## [파트 4] 심화 및 참고: `reduce`와 클래스 (18~20번)

### 18. `reduce` 기초: 숫자 합계 구하기
`reduce` 메서드를 사용하여 배열의 모든 숫자의 합을 구하는 코드이다. 누적값 매개변수 `acc`와 현재값 매개변수 `cur`를 활용하여 빈칸 `( A )`와 초기값 `( B )`를 작성하시오.
```js
const numbers = [1, 2, 3, 4, 5]

const sum = numbers.reduce((acc, cur) => {
  return ( A )
}, ( B ))

console.log(sum) // 출력: 15
```

---

### 19. `reduce` 심화: 배열을 객체로 집계 (등장 횟수 세기)
이름 목록 배열을 순회하며 `{ 이름: 등장횟수 }` 형태의 객체로 변환하는 코드이다. 빈칸 `( A )`, `( B )`, `( C )`에 들어갈 알맞은 코드를 작성하시오.
```js
const names = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob']

const nameCounts = names.reduce((acc, name) => {
  acc[name] = (acc[name] || ( A )) + 1
  return ( B )
}, ( C ))

console.log(nameCounts) // 출력: { Alice: 2, Bob: 2, Charlie: 1 }
```

---

### 20. 클래스(Class) 정의 및 인스턴스 생성
객체를 생성하기 위한 템플릿인 `Member` 클래스를 정의하고, 이를 바탕으로 새로운 인스턴스를 생성하는 코드이다. 빈칸 `( A )`, `( B )`, `( C )`, `( D )`에 들어갈 알맞은 키워드나 코드를 작성하시오.
```js
( A ) Member {
  // 생성자 메서드
  ( B )(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log(`Hi, I am ${( C )}`)
  }
}

// 인스턴스 생성
const member1 = ( D ) Member('Alice', 20)
member1.sayHi() // 출력: Hi, I am Alice
```

---
---

## [정답 및 해설]

### [파트 1] 객체 기초, `this`, JSON

1. **(A) `['key with space']` / (B) `delete`**
   * **해설**: 키 이름에 띄어쓰기가 있을 때는 대괄호 표기법(`user['key with space']`)으로만 접근할 수 있습니다. 객체의 속성을 삭제할 때는 `delete` 키워드를 사용합니다.

2. **(A) `hasOwn` (또는 `hasOwnProperty`는 인스턴스 메서드이므로 `Object.hasOwn`이 정확함)**
   * **해설**: `in` 연산자와 달리 프로토타입 체인을 제외한 객체 자신의 고유 속성만 확인하려면 `Object.hasOwn(obj, key)`를 사용합니다.

3. **(A) `this.name`**
   * **해설**: 메서드 내부에서 자신이 속한 객체의 다른 속성에 접근할 때는 `this` 키워드를 사용합니다.

4. **(A) `(number) =>` (또는 `number =>`)**
   * **해설**: 화살표 함수는 자신만의 `this`를 가지지 않고 외부 함수(`myFunc`)의 `this`(`myObj`)를 그대로 가져오므로, 콜백을 화살표 함수로 작성해야 `this`가 `myObj`를 가리킵니다.

5. **(A) `stringify` / (B) `parse`**
   * **해설**: 객체를 JSON 문자열로 변환할 때는 `JSON.stringify()`, JSON 문자열을 다시 객체로 변환할 때는 `JSON.parse()`를 사용합니다.

6. **(A) `[prefix + suffix]`**
   * **해설**: 객체 리터럴 내부에서 대괄호(`[]`)로 표현식을 감싸면 계산된 속성(Computed property name)으로 동작하여 동적으로 키를 생성할 수 있습니다.

---

### [파트 2] 추가 객체 문법

7. **(A) `{ firstName, userId }` / (B) `{ firstName, email }`**
   * **해설**: 객체 구조 분해 할당은 중괄호(`{}`) 안에 추출하고자 하는 객체의 키 이름을 적어 사용하며, 함수의 매개변수 자리에서도 동일하게 사용할 수 있습니다.

8. **(A) `...obj` / (B) `a: 1`**
   * **해설**: `{ ...obj, a: 1, e: 5 }`처럼 전개 구문 뒤에 동일한 키(`a: 1`)를 작성하면 기존 `obj`의 `a: 2` 값이 `1`로 덮어써집니다.

9. **(A) `keys` / (B) `values` / (C) `entries`**
   * **해설**: `Object.keys()`는 키 배열, `Object.values()`는 값 배열, `Object.entries()`는 `[key, value]` 쌍의 2차원 배열을 반환합니다.

10. **(A) `?.` / (B) `?.()`**
    * **해설**: 중첩 속성에 안전하게 접근할 때는 `obj.prop?.subProp`를 사용하고, 존재하지 않을 수 있는 메서드를 호출할 때는 `obj.method?.()` 형태를 사용합니다.

---

### [파트 3] 배열 기초, 콜백 함수, Array Helper Methods

11. **(A) `push` / (B) `pop` / (C) `unshift` / (D) `shift`**
    * **해설**: 배열 끝 추가는 `push`, 끝 제거는 `pop`, 배열 앞 추가는 `unshift`, 앞 제거는 `shift`입니다.

12. **(A) `action(a, b)` / (B) `add`**
    * **해설**: 매개변수 `action`으로 전달받은 함수를 `action(a, b)`로 실행하고, 호출 시에는 함수 실행 결과가 아닌 함수 자체(`add`)를 인자로 넘깁니다.

13. **(A) `name` / (B) `index` / (C) `array`**
    * **해설**: `forEach`, `map`, `filter`의 콜백 함수는 공통적으로 `(현재 요소, 인덱스, 원본 배열)` 순서로 인자를 전달받습니다.

14. **(A) `return person.name` / (B) `name => name.length` (또는 `(name) => name.length`)**
    * **해설**: `map`에서 중괄호 블록을 열었을 때는 반드시 `return` 키워드를 적어주어야 새로운 배열에 값이 담깁니다. 한 줄 화살표 함수로 작성하면 `return`과 중괄호를 생략할 수 있습니다.

15. **(A) `num % 2 === 0` / (B) `product.id !== 3`**
    * **해설**: `filter`는 조건식이 `true`를 반환하는 요소만 남깁니다. 특정 요소를 삭제할 때는 해당 ID가 아닌 요소(`product.id !== 3`)만 남기는 방식을 사용합니다.

16. **(A) `find` / (B) `some` / (C) `every`**
    * **해설**: 조건을 만족하는 첫 번째 요소 자체를 찾을 때는 `find`, 하나라도 만족하는지 볼 때는 `some`, 모두 만족하는지 볼 때는 `every`를 사용합니다.

17. **(A) `...parts`**
    * **해설**: 배열 내부에서 전개 구문(`...parts`)을 사용하면 배열의 괄호를 벗겨내고 요소들만 펼쳐서 삽입할 수 있습니다.

---

### [파트 4] 심화 및 참고: `reduce`와 클래스

18. **(A) `acc + cur` / (B) `0`**
    * **해설**: 숫자 합계를 구할 때는 초기값을 `0`으로 설정하고, 매 순회마다 누적값(`acc`)에 현재값(`cur`)을 더한 `acc + cur`를 반환하여 다음 단계의 `acc`로 넘겨줍니다.

19. **(A) `0` / (B) `acc` / (C) `{}`**
    * **해설**: 배열을 객체로 집계할 때는 초기값 `( C )`에 빈 객체 `{}`를 넣고, 기존 카운트가 없으면 `0`에서 시작해 1을 더한 뒤(`(acc[name] || 0) + 1`), 수정된 누적 객체 `acc`를 매번 `return` 해야 합니다.

20. **(A) `class` / (B) `constructor` / (C) `this.name` / (D) `new`**
    * **해설**: 클래스는 `class` 키워드로 선언하며, 초기 속성 설정은 `constructor` 메서드가 담당합니다. 메서드 내부에서는 `this.name`으로 인스턴스 속성에 접근하고, 인스턴스를 생성할 때는 반드시 `new` 연산자를 붙여서 호출합니다.