## 학습 목표

- 배열을 만들고 기본 조작 메서드(push, pop, unshift, shift)를 사용할 수 있다.
- `forEach`와 `map` 메서드의 차이를 알고 배열을 순회한다.
- `filter`로 조건에 맞는 요소만 골라낼 수 있다.
- 전개 구문을 활용하여 원본 배열을 수정하지 않고 합친다.

## 배열 기초

### 배열 (Array) – 순서가 있는 데이터 집합을 저장하는 자료구조
- 객체는 키(key)로 데이터를 관리하지만, 순서가 중요하지 않습니다.
- '첫 번째', '두 번째'처럼 순서가 중요한 데이터 묶음이 필요할 때 사용하는 것이 바로 **"순서가 있는 컬렉션, 배열(Array)"** 입니다.
- 하지만 배열의 인덱스는 숫자로만 이루어져 있어, "키 자체가 데이터의 의미를 설명해주지 못하고", 특정 값을 찾기 위해서는 배열의 모든 요소를 "처음부터 순서대로 확인"해야 하는 단점이 있습니다.

### 배열 구조
- 대괄호(`[]`)를 이용해 작성
- 요소의 자료형은 제약 없음
- `length` 속성을 사용해 배열에 담긴 요소 개수 확인 가능

```js
// array.html
const names = ['Alice', 'Bella', 'Cathy']

console.log(names[0]) // Alice
console.log(names[1]) // Bella
console.log(names[2]) // Cathy

console.log(names.length) // 3
```

### 배열 기본 조작 메서드
- `push()`, `pop()`, `unshift()`, `shift()`
- ※ **모두 원본 배열을 직접 수정하는 메서드**

| 메서드 | 동작 | 원본 수정 | 반환 값 |
|---|---|---|---|
| `push()` | 배열 **끝**에 요소를 **추가** | O | 추가된 후의 새로운 배열의 **길이** |
| `pop()` | 배열 **끝** 요소를 **제거** | O | 제거한 **요소** |
| `unshift()` | 배열 **앞**에 요소를 **추가** | O | 추가된 후의 새로운 배열의 **길이** |
| `shift()` | 배열 **앞** 요소를 **제거** | O | 제거한 **요소** |

```js
// array_method.html
const names = ['Alice', 'Bella', 'Cathy']

names.push('Dan')
console.log(names) // ['Alice', 'Bella', 'Cathy', 'Dan']

console.log(names.pop()) // Dan
console.log(names) // ['Alice', 'Bella', 'Cathy']

names.unshift('Eric')
console.log(names) // ['Eric', 'Alice', 'Bella', 'Cathy']

console.log(names.shift()) // Eric
console.log(names) // ['Alice', 'Bella', 'Cathy']
```

- `unshift()` – 배열의 모든 요소를 뒤로 한 칸씩 밀어야 하므로, 배열이 클수록 성능이 저하 (**가급적 사용 X**)
- `shift()` – 배열의 모든 요소를 당겨와야 하므로, 배열이 클수록 성능이 저하 (**가급적 사용 X**)

> 💡 **외우는 법** — **끝**에서: push(넣기) / pop(빼기), **앞**에서: unshift(넣기) / shift(빼기). "넣는 메서드는 **길이**를, 빼는 메서드는 **뺀 요소**를 돌려준다."

## 배열의 진화: Array helper method

### 배열의 진화
- 과거에는 `for (let i = 0; ...)` 처럼 **"어떻게(How) 순회할지"** 를 일일이 코딩
- 이제는 Array Helper Method를 통해 **"무엇을(What) 할지"** 만 함수(콜백)로 전달

### Array Helper Methods – 배열을 순회하며 특정 로직을 수행하는 고차 함수 모음
- 메서드의 인자로 **함수(콜백 함수)** 를 받습니다. → 콜백 함수는 [함수와 콜백](05-functions.html#콜백-함수-함수의-확장) 참고

### 주요 Array Helper Methods
1. 순회: `forEach`
2. 변형: `map`
3. 선별: `filter`
4. (심화 참고) 집계: `reduce`

| 메서드 | 콜백 함수 호출 | 반환 |
|---|---|---|
| `forEach` | 배열 내의 모든 요소 각각에 대해 호출 | **반환 값 없음** |
| `map` | 배열 내의 모든 요소 각각에 대해 호출 | 함수 호출 결과를 모아 **새로운 배열**을 반환 |

## 순회: forEach

### forEach란?
- "배열의 모든 요소를 하나씩 훑으면서, 내가 전달한 함수를 실행해줘!"
- 인자로 넘겨준 **콜백 함수**를 배열의 요소 개수만큼 반복해서 호출
- 특징
  - 가장 기본적인 순회 메서드
  - 별도의 반환 값(return)이 없음 (단순 실행용)

### 구조 및 사용법
```js
// forEach 구문
arr.forEach(callback(item[, index[, array]]))
```
```js
// 기본 구문
array.forEach(function (item, index, array) {
  // do something
})
```
- 매개변수
  1. `item` (필수): 현재 처리 중인 배열의 요소
  2. `index` (선택): 현재 처리 중인 요소의 인덱스(0, 1, 2…)
  3. `array` (선택): 메서드를 호출한 배열 본체

> 📌 **TIP** — 보통은 item 하나만 사용하는 경우가 가장 많습니다.

### forEach 사용하기 (Arrow Function)
```js
// array_helper_methods.html
const names = ['Alice', 'Bella', 'Cathy']

// [기존] 일반 함수 (function 키워드)
names.forEach(function (name) {
  console.log(name)
})

// [권장] 화살표 함수 (Arrow Function)
names.forEach((name) => {
  console.log(name)
})
```
```console
// 출력 결과
Alice
Bella
Cathy

Alice
Bella
Cathy
```

> 📌 **TIP**
> - 콜백함수는 단순한 로직이 많으므로 화살표 함수를 사용하면 코드가 훨씬 간결해집니다.
> - 타이핑이 줄어들 뿐만 아니라, this 키워드 동작 방식에서도 화살표 함수가 콜백으로 쓰기에 더 안전하고 직관적인 경우가 많습니다.

### forEach 사용하기 (매개변수 활용)
```js
// array_helper_methods.html
const names = ['Alice', 'Bella', 'Cathy']

names.forEach((name, index, array) => {
  console.log(`${name} / ${index} / ${array}`)
})
```
```console
// 출력 결과
Alice / 0 / Alice,Bella,Cathy
Bella / 1 / Alice,Bella,Cathy
Cathy / 2 / Alice,Bella,Cathy
```

> 💡 **쉽게 이해하기** — 매개변수 이름은 자유지만 **순서**가 정해져 있습니다: 1번째 = 요소, 2번째 = 인덱스, 3번째 = 배열 전체. 그래서 위에서 `name`에는 요소가, `index`에는 0·1·2가 들어갑니다.

### 주의사항
1. **반환 값이 없음 (undefined)**
   - `forEach`는 결과를 모아서 돌려주지 않음. 변수에 할당해도 `undefined`만 저장됨
   - 무언가 새로운 배열을 만들고 싶다면? → 다음 챕터인 `map`을 사용해야 함
2. **멈출 수 없음 (No break)**
   - `forEach`는 배열의 끝까지 무조건 진행. `break`나 `continue`를 사용할 수 없음
   - 중간에 멈춰야 한다면? → `for...of` 반복문을 사용하기

## 변형: map

### map이란?
- "배열의 모든 요소를 하나씩 꺼내서, 변형(가공)시킨 뒤 새로운 배열로 만들어줘!"
- 원본 배열의 요소를 **1:1로 매핑(Mapping)** 하여 새로운 배열을 반환
- 핵심 동작 원리
  - Input: 원재료 (원본 배열)
  - Process: 가공 기계 (콜백 함수)
  - Output: 완제품 (새로운 배열)
  - 특징: **원본 배열의 개수와 결과 배열의 개수는 항상 같음**

### 구조 및 차이점
```js
// map 구문
arr.map(callback(item[, index[, array]]))
```
```js
const newArr = array.map(function (item, index, array) {
  // do something
})
```
- `forEach`와 구조는 완전히 동일 (인자: `item`, `index`, `array`)
- 단, **반드시 `return`이 필요**

```js
const arr = [1, 2, 3]
// forEach: 반환값이 없음
const result1 = arr.forEach((item) => {
  return item * 2 // (의미 없음)
})
console.log(result1) // undefined

// map: 새로운 배열을 반환
const result2 = arr.map((item) => {
  return item * 2 // (필수) 이 값이 새로운 배열에 담김
})
console.log(result2) // [2, 4, 6]
```

> ⚠️ **헷갈리기 쉬운 점** — map의 콜백에서 `return`을 빠뜨리면 각 자리에 `undefined`가 담긴 배열이 됩니다. 화살표 함수에서 `{}`를 썼다면 return도 꼭 써야 합니다.

### 왜 사용할까? (1) 간결함과 직관성
- 이름표만 모으고 싶을 때
- `for...of`는 빈 배열을 만들고 push하는 과정이 필요
- `map`은 "이름만 뽑아줘"라는 목적이 코드로 바로 드러남

```js
// array_helper_methods.html
const persons = [
  { name: 'Alice', age: 20 },
  { name: 'Bella', age: 21 }
]

// for...of (명령형: 빈 배열 생성 -> 반복 -> push)
let result1 = []
for (const person of persons) {
  result1.push(person.name)
}

// map (선언형: 결과물 = 변형 로직)
const result2 = persons.map((person) => {
  return person.name
})
```
- ※ map을 사용하면 result2 변수가 "persons를 가공한 결과물"임이 한눈에 보임

### 왜 사용할까? (2) 불변성
- `map`은 **원본 배열을 절대 변경하지 않고,** 항상 새로운 배열을 반환
- 개발에서의 중요성
  - 데이터가 변경되었음을 감지할 때, "원본이 바뀌었나?"보다 "새로운 배열로 갈아끼워졌나?"를 확인하는 것이 훨씬 빠르고 효율적
  - 따라서 `push`로 원본을 수정하는 것보다, `map`으로 새로운 배열을 만드는 패턴을 훨씬 선호

### 실전 활용 1 (Arrow Function & Chaining)
- 코드가 한 줄일 때 화살표 함수를 사용하면 간결해짐

```js
const names = ['Alice', 'Bella', 'Cathy']

// 가장 많이 쓰이는 패턴
const lengths = names.map(name => name.length)
console.log(lengths) // [5, 5, 5]
```

> 📝 **체이닝**: 함수의 반환 값에, 꼬리를 물고 다음 함수를 바로 호출하는 기술

> 📌 **TIP – (참고) 메서드 체이닝 (Chaining)**
> - map은 배열을 반환하므로, 뒤이어 filter, map 등을 계속 연결할 수 있습니다.
> - `arr.map(...).filter(...).forEach(...)`

### 실전 활용 2 (커스텀 콜백 함수 사용)
- 콜백 함수를 작성해두면 map 외 다른 곳에서도 같은 로직을 사용 할 수 있어 유용

```js
// array_helper_methods.html
const numbers = [1, 2, 3]

const myCallbackFunc = function (number) {
  return number * 2
}

const doubleNumber = numbers.map(myCallbackFunc)

console.log(doubleNumber) // [2, 4, 6]
```

### Python map과의 비교
- Python의 map과 개념적으로 동일하나 문법적 차이가 존재
- **Python**: `map(함수, 리스트)` → `list()`로 형변환 필요
- **Javascript**: `배열.map(함수)` → 즉시 배열 반환

```python
numbers = [1, 2, 3]

def square(num):
    return num ** 2

new_numbers = list(map(square, numbers))
```
```js
const numbers = [1, 2, 3]

const callBackFunction = function (number) {
  return number ** 2
}

const newNumbers = numbers.map(callBackFunction)
```

## 선별: filter

### filter란?
- "배열에서 내가 원하는 조건에 맞는 요소만 걸러내줘!"
- 콜백 함수의 반환 값이 **`true`인 요소만** 모아서 새로운 배열을 만듦
- 핵심 동작
  - Input: 원본 배열 (전체 데이터)
  - Condition: 판별 기준 (콜백 함수)
  - Output: 조건을 통과한 요소들로 구성된 새로운 배열

### 구조 및 동작 원리
```js
// filter 구문
arr.filter(callback(item[, index[, array]]))
```
```js
const newArr = array.filter(function (item, index, array) {
  // do something
})
```
- `forEach`, `map`과 구조는 완전히 동일 (인자: item, index, array)
- return 값이 참(truthy)이면 유지, 거짓(falsy)이면 제외
  - `true`: 요소를 유지함 (통과)
  - `false`: 요소를 버림 (탈락)

```js
const numbers = [1, 2, 3, 4, 5]

// 짝수만 걸러내기
const evens = numbers.filter((num) => {
  return num % 2 === 0 // 조건이 true면 남기고, false면 버림
})

console.log(evens) // [2, 4]
```

### map vs filter
- 두 메서드 모두 새로운 배열을 반환하지만, 목적이 다름

| 구분 | `map` (변형) | `filter` (선별) |
|---|---|---|
| 목적 | 요소를 가공하여 형태를 바꿈 | 조건에 맞는 요소만 골라냄 |
| 길이 | 원본과 항상 같음 (1:1) | 원본보다 같거나 작음 (조건에 따라 다름) |
| 비유 | 빵 굽기 (밀가루 → 빵) | 과일 고르기 (썩은 과일 버리기) |

> 📌 **TIP – filter에서 만약 조건을 만족하는 요소가 하나도 없다면?**
> - `null`이 아니라 **빈 배열 `[]`** 을 반환합니다.

### 실전 활용 (삭제 기능)
- 만약 장바구니에서 특정 상품을 제거 한다면?
- 데이터를 파괴하는 것이 아니라, **"삭제하려는 ID를 제외한 나머지"를 남기는 방식(filter)** 을 사용

```js
// 상품 목록
const products = [
  { id: 1, name: 'Cucumber', type: 'vegetable' },
  { id: 2, name: 'Banana', type: 'fruit' },
  { id: 3, name: 'Carrot', type: 'vegetable' },
  { id: 4, name: 'Apple', type: 'fruit' },
]

// 1. 'fruit'만 필터링 (카테고리 기능)
const fruits = products.filter(product => product.type === 'fruit')
console.log(fruits)  // Banana, Apple 객체

// 2. id가 3인 상품 '삭제' (사실은 3번 빼고 남기기)
const deletedList = products.filter(product => product.id !== 3)
console.log(deletedList)  // Cucumber, Banana, Apple (Carrot 제외됨)
```

## 기타 유용한 메서드

### 기타 유용한 Array Helper Methods – MDN 문서를 참고해 사용해보기

| 메서드 | 역할 |
|---|---|
| `find` | 콜백 함수의 반환 값이 참이면 해당 요소를 반환 |
| `some` | 배열의 요소 중 **적어도 하나라도** 콜백 함수를 통과하면 true를 반환하며 즉시 배열 순회 중지. 반면에 모두 통과하지 못하면 false를 반환 |
| `every` | 배열의 **모든 요소가** 콜백 함수를 통과하면 true를 반환. 반면에 하나라도 통과하지 못하면 즉시 false를 반환하고 배열 순회 중지 |

- 참고: [MDN – Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots)

## 배열과 '전개 구문'

### 배열 with '전개 구문'
- `...` 은 배열의 괄호를 없애고 내용물만 꺼내기 때문에, 배열을 **합치거나 중간에 삽입**할 때 유용
- 전개 구문은 **항상 새로운 배열**을 만듦. 원본 배열은 전혀 변경되지 않음
- 배열 안의 객체는 데이터가 아닌, **주소 값만 복사**됨. 복사본의 객체를 수정하면 원본도 바뀜

```js
// array_with_spread_syntax.html
let parts = ['어깨', '무릎']
let lyrics = ['머리', ...parts, '발']

console.log(lyrics) // [ '머리', '어깨', '무릎', '발' ]
```

> 💡 **쉽게 이해하기** — `...parts`는 `['어깨', '무릎']`의 **대괄호를 벗겨** `'어깨', '무릎'`만 그 자리에 놓습니다. 그래서 중첩 배열이 아니라 평평한 배열 하나가 됩니다. 배열 안의 객체는 [참조 자료형](03-types-operators.html#참조-자료형-예시)이라 주소만 복사된다는 점도 함께 기억하세요.

## 배열 순회 종합

### 배열 순회 정리

| 방식 | 특징 | 상황 |
|---|---|---|
| 기본 for 문 (for loop) | 인덱스(i)로 요소에 접근 / break, continue 사용 가능 | 인덱스 제어가 복잡하게 필요할 때만 사용 |
| `for … of` | 배열의 요소(값)에 바로 접근 / break, continue 사용 가능 | 중간에 멈추거나 건너뛰어야 할 때 (제어가 필요할 때) |
| `forEach()` | 간결하고 가독성이 높음 / 콜백 함수를 이용하여 각 요소를 조작하기 용이 / **break, continue 사용 불가** | 배열을 처음부터 끝까지 순회할 때 / 데이터를 다루는 모던 웹 개발의 핵심 패턴 |

- ※ 특정 방식을 "무조건적인 사용"보다는 **"상황에 맞는 사용"이 권장**

### Array Helper Methods 정리

| 메서드 | 역할 (Keyword) | 반환 값 (Return) | 활용 예시 |
|---|---|---|---|
| `forEach` | 순회 (Loop) | 없음 (undefined) | 단순 출력, 외부 변수 갱신 |
| `map` | 변형 (Transform) | 새로운 배열 (길이 같음) | 데이터 가공, 리스트 렌더링 |
| `filter` | 선별 (Select) | 새로운 배열 (길이 같거나 짧음) | 삭제 기능, 카테고리 분류 |

## (심화) 집계: reduce

### reduce란?
- "배열의 요소를 하나씩 줄여가며(reduce), 결국 **하나의 결과값**으로 합쳐줘!"
- 배열을 숫자 하나, 문자열 하나, 혹은 **완전히 다른 형태의 객체나 배열**로 변환할 때 사용
- 핵심 비유 (눈덩이 굴리기)
  - 처음엔 작은 눈뭉치(초기값)였지만, 바닥을 구르며 눈(요소)을 계속 붙여서 거대한 눈사람(결과값)이 됨

### 구조 및 핵심 파라미터
```js
arr.reduce((acc, cur, index, array) => {
  return nextAccValue
}, initialValue)
```
- 필수 요소 3가지
  1. `acc` (Accumulator, 누적값): 이전 단계까지 계산된 결과(눈덩이). **`return`한 값이 다음 단계의 `acc`** 가 됨
  2. `cur` (Current, 현재값): 지금 처리 중인 배열의 요소 (새로 붙일 눈)
  3. `initialValue` (초기값): 눈덩이를 굴리기 시작할 때의 크기 (생략 가능하지만, **명시하는 것을 강력 권장**)

### 기초 활용: 숫자 합계 (Sum) – acc가 어떻게 변하는지 흐름을 살펴보기
```js
// reduce.html
const numbers = [1, 2, 3, 4, 5]

const sum = numbers.reduce((acc, cur) => {
  console.log(`누적: ${acc}, 현재: ${cur}`)
  return acc + cur // 이 리턴 값이 다음 번 acc가 됨!
}, 0) // 초기값 0

console.log(sum) // 15
```
```console
// 출력 결과
누적: 0, 현재: 1
누적: 1, 현재: 2
누적: 3, 현재: 3
누적: 6, 현재: 4
누적: 10, 현재: 5
15
```

| 순회 | acc (누적) | cur (현재) | return (acc + cur) |
|---|---|---|---|
| 1회차 | 0 (초기값) | 1 | 1 |
| 2회차 | 1 | 2 | 3 |
| 3회차 | 3 | 3 | 6 |
| 4회차 | 6 | 4 | 10 |
| 5회차 | 10 | 5 | **15 → 최종 결과** |

> 💡 **쉽게 이해하기** — 표를 대각선으로 보세요. **이번 줄의 return 값이 다음 줄의 acc**로 내려갑니다. 마지막 return 값이 reduce 전체의 결과입니다.

### [심화] 데이터 변형: 등장 횟수 세기 (Array → Object)
- 이름 목록을 `{ 이름: 횟수 }` 형태의 객체로 변환하기

```js
// reduce.html
const names = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob']

const nameCounts = names.reduce((acc, name) => {
  // 현재 이름이 있으면 +1, 없으면 0에서 시작해서 +1
  acc[name] = (acc[name] || 0) + 1
  return acc // 수정된 객체를 다음 단계로 넘김
}, {}) // 중요! 초기값으로 '빈 객체 {}' 설정

console.log(nameCounts) // 결과: { Alice: 2, Bob: 2, Charlie: 1 }
```

> 💡 **쉽게 이해하기** — `(acc[name] || 0)`은 [단축 평가](03-types-operators.html#논리-연산자)입니다. 처음 보는 이름이면 `acc[name]`이 undefined(거짓)라서 `0`이 선택되고, 이미 있으면 그 숫자가 선택됩니다.

> 📌 **TIP**
> - reduce는 숫자뿐만 아니라 객체(Object)를 누적값으로 가질 수 있습니다.
> - 이를 통해 데이터를 그룹핑(Grouping) 할 때 매우 유용합니다.

### [심화] 만능 도구 (Map + Filter)
- reduce 하나만 있으면 map, filter의 기능을 모두 구현할 수 있음
- 한 번의 순회로 필터링(짝수만)과 변형(2배)을 동시에 처리할 수 있어 효율적일 때가 있음

```js
// reduce.html
const nums = [1, 2, 3, 4, 5]

const result = nums.reduce((newArr, cur) => {
  if (cur % 2 === 0) {        // 1. Filter 역할 (짝수일 때만)
    newArr.push(cur * 2)      // 2. Map 역할 (2배 해서 push)
  }
  return newArr               // 3. 누적된 배열 반환
}, []) // 초기값은 빈 배열 []

console.log(result) // [4, 8]
```

> 📌 **TIP**
> - 가독성을 위해서는 `filter().map()` 체이닝이 더 좋을 수 있습니다.
> - reduce는 강력하지만 코드가 복잡해질 수 있으니 적절히 사용해야 합니다.

## forEach의 중요성 (참고)

### 왜 forEach가 중요할까
- 우리는 이미 `for...of`를 배웠고, 기능적으로는 그것만 있어도 충분
- 하지만, **모던 웹 개발(Vue, React)에서는 `forEach`와 같은 '배열 메서드' 방식을 훨씬 더 선호**
  - 곧 배우게 될 프론트엔드 프레임워크 Vue.js와 Axios(서버 통신)는 대부분이 이 구조로 되어 있음
- 바로 '콜백 함수(Callback)' 구조 및 '코드의 작성 스타일' 때문

### 1. 선언형 프로그래밍 (Declarative)
- `for...of` (명령형) – "어떻게(How)" 순회할지 하나하나 명령 (인덱스, break 등 제어 중심)
- `forEach` (선언형) – "무엇을(What)" 할지만 신경 씀 (데이터 처리 중심)
- 이점
  - 코드가 단순해지고, 데이터의 흐름이 명확히 보임. Vue나 React는 이러한 스타일을 지향.
  - 즉, forEach는 단순 반복문이 아니라 **프레임워크를 쓰기 위한 기초 체력**

### 2. Vue와 Axios 미리보기
- 우리가 곧 배우게 될 기술들은 forEach와 똑같은 구조(**메서드 + 콜백 함수**)를 가짐

```js
// 1. forEach 메서드
numbers.forEach((num) => {
  console.log(num)
})

// 2. map 메서드 (데이터 변형)
// Vue에서 데이터를 화면에 뿌릴 때 가장 많이 사용
const newNumbers = numbers.map((num) => {
  return num * 2
})

// 3. Vue에서 배우게 될 서버 통신 (Axios)
// forEach랑 구조가 동일
axios.get(url).then((response) => {
  console.log(response)
})
```
- ※ 추후 Vue 수업에서 자세히 다룰 예정

## 배열은 객체다 (참고)
- 배열도 키와 속성들을 담고 있는 참조 타입의 객체
- 배열의 요소를 대괄호 접근법을 사용해 접근하는 건 객체 문법과 같음
  - 배열의 키는 숫자
- 숫자형 키를 사용해 객체의 기본 기능 외로 "순서가 있는 컬렉션"을 제어하는 특별한 메서드를 제공
- 배열은 **인덱스를 키로 가지며 length 속성을 갖는 특수한 객체**

```js
const numbers = [1, 2, 3]
console.log(Object.getOwnPropertyDescriptors(numbers))
```
```console
{0: {…}, 1: {…}, 2: {…}, length: {…}}
  0: {value: 1, writable: true, enumerable: true, configurable: true}
  1: {value: 2, writable: true, enumerable: true, configurable: true}
  2: {value: 3, writable: true, enumerable: true, configurable: true}
  length: {value: 3, writable: true, enumerable: false, configurable: false}
```

> ⚠️ 교안 캡처에는 value가 `'Alice'`, `'Bella'`, `'Cathy'`로 찍혀 있어 코드(`[1, 2, 3]`)와 맞지 않습니다. 위 출력은 코드에 맞춘 형태입니다. 핵심은 **인덱스(0, 1, 2)가 키**이고 **length 속성**이 있다는 점입니다.

## 정리: 여러 사람의 데이터를 다루려면?

> 💡 1116 교안의 학습 시작 질문: **"여러 사람의 데이터를 다루려면 무엇부터 생각해야 할까요?"**
> 1. 먼저 한 사람의 이름, 나이, 직업을 어떻게 묶을 수 있을까요? → **객체**
> 2. 여러 사람의 데이터를 목록으로 관리하려면 어떻게 해야 할까요? → **배열**
> 3. 목록의 모든 사람에게 똑같은 작업을 시키려면 어떻게 해야 할까요? → **배열 헬퍼 메서드**

```js
// 한 사람의 데이터를 어떻게 묶을까? -> 객체
const user1 = { name: 'jayden', age: 20 }
const user2 = { name: 'harry', age: 21 }

// 여러 사람을 어떻게 목록으로 만들까? -> 배열
const users = [user1, user2]

// 목록 전체에 같은 작업을 하려면? -> 배열 헬퍼 메서드
const userNames = users.map(user => user.name) // ['jayden', 'harry']
```

## 핵심 정리
- 배열은 순서가 있는 데이터의 집합을 저장하는 자료구조
- `push()`/`pop()`은 배열의 끝에서, `unshift()`/`shift()`는 배열의 앞에서 추가/제거 – 모두 **원본 배열을 직접 수정**
- Array Helper Methods: 배열을 순회하며 특정 작업을 수행하는 고차 함수들로, 콜백 함수를 인자로 받음
- `forEach()`: 각 요소에 대해 콜백 함수를 실행, **반환 값 없음**, break/continue 불가
- `map()`: 각 요소에 콜백 함수를 실행한 결과를 모아 **새로운 배열**을 반환, 원본은 변경되지 않음
- `filter()`: 콜백이 true를 반환한 요소만 모은 새로운 배열 (없으면 `[]`)
- `reduce()`: 누적값(acc)을 이어 받아 하나의 결과로 집계

## 교안 실습 문제
- Array helper method: **3079.** 다양한 함수 표현 · **2968.** 배열 활용하기 · **2971.** 배열 순회2
