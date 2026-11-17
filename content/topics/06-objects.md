## 학습 목표

- 객체의 메서드 안에서 `this`를 사용해 속성에 접근한다.
- 화살표 함수에서 `this`가 상위 스코프를 참조함을 안다.
- 구조 분해 할당을 사용해 객체의 속성을 변수로 할당한다.
- `JSON.stringify`와 `JSON.parse`로 객체와 JSON을 변환한다.

## 객체 기초 (정의, 구조, 접근)

### Object – 키로 구분된 데이터 집합을 저장하는 자료형 (data collection)

> 💡 **쉽게 이해하기** — 그림으로 보면 객체는 **이름표가 붙은 서랍장**입니다. `name` 서랍, `age` 서랍, `getItems` 서랍(함수)… 서랍 이름이 key, 안에 든 것이 value입니다.

### 객체 구조
- 중괄호(`{}`)를 이용해 작성
- 중괄호 안에는 **`key: value`** 쌍으로 구성된 속성(property)를 여러 개 작성 가능
- `key`는 **문자열만 허용**, 숫자 키도 문자열로 변환됨
- `value`는 모든 자료형 허용

```js
// object.html
const user = {
  name: 'Alice',
  'key with space': true,
  greeting: function () {
    return 'hello'
  }
}
```

### 속성 참조
- 점(`.`) 표기법 또는 대괄호(`[]`) 표기법으로 객체 속성에 접근
- key 이름에 띄어쓰기 같은 구분자가 있으면 **대괄호 접근만** 가능

```js
// object.html
// 조회
console.log(user.name) // Alice
console.log(user['key with space']) // true

// 추가
user.address = 'korea'
console.log(user) // {name: 'Alice', key with space: true, greeting: ƒ, address: 'korea'}

// 수정
user.name = 'Bella'
console.log(user.name) // Bella

// 삭제
delete user.name
console.log(user) // {key with space: true, greeting: ƒ, address: 'korea'}
```

> 💡 **쉽게 이해하기** — `user`는 `const`인데도 속성을 추가·수정·삭제할 수 있습니다. const가 막는 것은 `user = 다른값` 같은 **변수 재할당**이고, 객체는 참조 자료형이라 **가변(Mutable)** 이기 때문입니다.

### `in` 연산자
- 속성이 객체에 존재하는지 여부를 확인
- 객체의 키나 배열의 인덱스 존재 여부를 확인하는 연산자

```js
// object.html
console.log('greeting' in user) // true
console.log('country' in user) // false
```

> 📝 **용어**
> - **프로토타입**: 객체들이 기능을 물려받는 원본, 즉 '부모' 역할을 하는 객체
> - **프로토타입 체인**: 자신에게 없는 속성이나 기능을 부모, 조상 순으로 찾아가는 것

> 📌 **TIP**
> - 프로토타입 체인을 따라 상속된 속성까지 확인하므로, 의도치 않게 true가 나올 수 있어 주의해야 합니다.
> - 상속받은 속성을 빼고 **자기 속성만** 확인하려면 `Object.hasOwn(obj, key)` (또는 `hasOwnProperty`)를 사용합니다.

## 메서드와 this

### Method – 객체 속성에 정의된 함수
- `object.method()` 방식으로 호출
- 메서드는 객체가 **'행동'** 할 수 있게 함

```js
console.log(user.greeting()) // hello
```

### Method 기본 문법
- 메서드도 값이 함수인 속성

```js
// this_keyword.html
const person = {
  name: 'Alice',
  greeting: function () {
    return `Hello my name is ${this.name}`
  },
}

console.log(person.greeting()) // Hello my name is Alice
```

- 메서드와 일반 함수의 차이는?
  - 메서드는 자신이 속한 객체의 다른 속성들에 접근할 수 있음
  - ➤ 이를 위한 방법이 바로 **`this`**

> 📝 **Method** — 객체 속성에 정의된 함수. `'this'` 키워드를 사용해 객체 자신의 속성이나 메서드에 접근하여 특정 작업을 수행 할 수 있음

### 'this' keyword – 함수나 메서드를 호출한 객체를 가리키는 키워드
- ➤ `'this'` 키워드를 사용해 객체에 대한 특정한 작업을 수행 할 수 있음

> 💡 **쉽게 이해하기** — 그림으로 보면 this는 **스포트라이트**입니다. person1, person2, person3 중 **지금 호출한 사람**을 비춥니다. 위 예제에서는 `person.greeting()`으로 불렀으니 this = person, `this.name` = 'Alice'.

### JavaScript에서 this는 함수를 **"호출하는 방법"** 에 따라 가리키는 대상이 달라짐

| 호출 방법 | 대상 |
|---|---|
| 일반 함수에서의 단순 호출 | **전역 객체** |
| 객체에서의 메서드 호출 | **메서드를 호출한 객체** |

```js
// this_keyword.html – 단순 호출 this: 가리키는 대상 ➔ 전역 객체

const myFunc = function () {
  return this
}

console.log(myFunc()) // window
```
```js
// this_keyword.html – 메서드 호출 시 this: 가리키는 대상 ➔ 메서드를 호출한 객체

const myObj = {
  data: 1,
  myFunc: function () {
    return this
  }
}

console.log(myObj.myFunc()) // myObj
```

### 중첩된 함수에서의 this 문제점 – "왜 window일까?"
```js
// this_keyword.html

const myObj2 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach(function (number) {
      console.log(this) // window
    })
  }
}

console.log(myObj2.myFunc())
```
- `forEach`의 인자로 작성된 함수는 **일반적인 함수 호출**이기 때문에 `this`가 전역 객체를 가리킴

### 해결책
- **화살표 함수는 자신만의 this를 가지지 않음**
- 따라서 외부 함수(`myFunc`)에서의 `this` 값을 가져옴

```js
const myObj3 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach((number) => {
      console.log(this) // myObj3
    })
  }
}

console.log(myObj3.myFunc())
```

> 💡 **쉽게 이해하기 – 왜 window였다가 myObj3가 될까?**
> 1. `myObj3.myFunc()` → 점 앞이 myObj3이므로 **myFunc 안의 this = myObj3**
> 2. forEach에 넘긴 `function (number) {...}`은 forEach가 내부에서 **그냥 호출**(점 없이) → 일반 함수 단순 호출 → this = window
> 3. 화살표 함수는 자기 this가 없어서 **바깥(myFunc)의 this를 그대로 빌려 씀** → myObj3

### JavaScript 'this' 정리
- JavaScript의 함수는 호출될 때 this를 암묵적으로 전달 받음
- JavaScript에서 `this`는 함수가 **"호출되는 방식"** 에 따라 결정되는 현재 객체를 나타냄
- 같은 함수라도 **"누가 호출했는가"** 에 따라 this가 달라짐
- 장점
  - 함수(메서드)를 하나만 만들어 여러 객체가 공유하여 각자 자신의 데이터로 동작하게 할 수 있음
- 단점
  - 이런 유연함이 실수로 이어질 수 있다는 것

> 📌 **TIP**
> - 개발자는 this 의 동작 방식을 충분히 이해하고 장점을 취하면서 실수를 피하는 데에 집중해야 합니다.
> - this 가 헷갈릴 땐 **'누가 점(.)을 찍어 호출했는가?'** 에 집중해보세요. 점 앞의 객체가 this가 됩니다.

> 💡 **this 판별 순서 (정리)**
> 1. 화살표 함수인가? → 자기 this 없음, **바깥 스코프의 this**
> 2. `객체.메서드()`처럼 점을 찍어 호출했나? → **점 앞의 객체**
> 3. 그냥 `함수()`로 호출했나? → **전역 객체(window)**
> 4. (이벤트 주제) 일반 함수 이벤트 핸들러 → **이벤트 리스너가 연결된 요소(currentTarget)**

## JSON

### JSON (JavaScript Object Notation) – Key-Value 형태로 이루어진 자료 표기법
- JavaScript의 Object와 유사한 구조를 가지고 있지만 JSON은 일정한 형식을 가진 **"문자열"** 입니다.
- JavaScript에서 JSON을 사용하기 위해서는 Object 자료형으로 변경해야 합니다.
- 특정 언어에 종속되지 않는 데이터 형식으로, API 통신 등에서 널리 사용됩니다.

### Object ⇨ JSON / JSON ⇨ Object
- `JSON.stringify()` 를 사용해 **객체를 문자열로** 변환
- `JSON.parse()`를 사용해 **문자열을 객체로** 변환

```js
// json.html
const jsObject = {
  coffee: 'Americano',
  iceCream: 'Cookie and cream',
}

// Object -> JSON
const objToJson = JSON.stringify(jsObject)
// {"coffee":"Americano","iceCream":"Cookie and cream"}
console.log(objToJson)
// string
console.log(typeof objToJson)

// JSON -> Object
const jsonToObj = JSON.parse(objToJson)
// { coffee: 'Americano', iceCream: 'Cookie and cream' }
console.log(jsonToObj)
// object
console.log(typeof jsonToObj)
```

> 💡 **외우는 법** — **stringify** = string(문자열)으로 만든다 → 결과 타입 `'string'`. **parse** = 문자열을 해석(분석)해서 객체로 → 결과 타입 `'object'`.

## 추가 객체 문법

1. 단축 속성
2. 단축 메서드
3. 계산된 속성 (computed property name)
4. 구조 분해 할당 (destructuring assignment)
5. 객체와 전개 구문 (Spread Syntax)
6. `Object.keys()` / `values()` / `entries()`
7. Optional chaining (`?.`)

### 1. 단축 속성
- 키 이름과 값으로 쓰이는 변수의 이름이 같은 경우 단축 구문을 사용할 수 있음

```js
const name = 'Alice'
const age = 30
const user = {
  name: name,
  age: age
}
```
➡
```js
const name = 'Alice'
const age = 30
const user = {
  name, age
}
```

### 2. 단축 메서드
- 메서드 선언 시 `function` 키워드 생략 가능

```js
const myObj1 = {
  myFunc: function () {
    return 'Hello'
  }
}
```
➡
```js
const myObj1 = {
  myFunc() {
    return 'Hello'
  }
}
```

### 3. 계산된 속성 (computed property name)
- 키가 대괄호(`[]`)로 둘러싸여 있는 속성
- ➤ 고정된 값이 아닌 **변수 값**을 사용할 수 있음

```js
// extra_object_syntax.html
const product = prompt('물건 이름을 입력해주세요')
const prefix = 'my'
const suffix = 'property'
const bag = {
  [product]: 5,
  [prefix + suffix]: 'value'
}
console.log(bag) // {연필: 5, myproperty: 'value'}
```

> 💡 **쉽게 이해하기** — `[product]`는 "product라는 글자"가 아니라 "product 변수에 **들어 있는 값**"을 키로 씁니다. 연필을 입력하면 키가 `연필`이 됩니다.

> 📌 **TIP**
> - 대괄호 안의 표현식이 너무 복잡해지면, 어떤 키가 생성될 지 파악하기 어려워 가독성이 떨어질 수 있습니다.
> - 동적으로 키를 만들다 보면 의도치 않게 같은 이름의 키가 생성되어, 기존 값이 덮어써질 위험이 있습니다.

### 4. 구조 분해 할당 (destructuring assignment)
- 배열 또는 객체를 분해하여 객체 속성을 변수에 쉽게 할당할 수 있는 문법

```js
// extra_object_syntax.html
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}

const firstName = userInfo.firstName
const userId = userInfo.userId
const email = userInfo.email
```
➡
```js
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}
// 세 줄 중 하나만 사용 (같은 이름을 다시 선언하면 에러)
// const { firstName } = userInfo
// const { firstName, userId } = userInfo
const { firstName, userId, email } = userInfo
// Alice alice123 alice123@gmail.com
console.log(firstName, userId, email)
```

- **'함수의 매개변수'** 로 객체 구조 분해 할당 활용 가능

```js
// extra_object_syntax.html
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}
function printInfo({ firstName, email }) {
  console.log(`이름: ${firstName}, 이메일: ${email}`)
}

// 객체를 통째로 넘기면, 매개변수 자리에서 필요한 속성만 꺼내 씀
printInfo(userInfo) // 이름: Alice, 이메일: alice123@gmail.com
```

> 💡 **쉽게 이해하기** — `const { firstName } = userInfo`는 "userInfo에서 **firstName이라는 키**를 꺼내 **같은 이름의 변수**에 담아라"라는 뜻입니다. 중괄호 안 이름이 객체의 키와 같아야 꺼내집니다.

### 5. 객체와 전개 구문 (Spread Syntax, `...`)
- **"객체 복사"** – 객체 내부에서 객체 전개
- **얕은 복사**에 활용 가능

> 📝 **얕은 복사**: 겉(최상위 속성)만 복사하고, 속(중첩 객체)은 공유하는 복사

```js
// extra_object_syntax.html
const obj = { a: 2, c: 3, d: 4 }
// 같은 key(a)가 있으면 뒤에 쓴 값이 앞의 값을 덮어씀
const newObj = { ...obj, a: 1, e: 5 }
console.log(newObj) // {a: 1, c: 3, d: 4, e: 5}
```

> 💡 **쉽게 이해하기** — `{ ...obj, a: 1 }` 은 ① obj의 속성(a:2, c:3, d:4)을 먼저 펼쳐 넣고 ② 뒤의 `a: 1`이 같은 키 a를 덮어쓴 결과입니다. **뒤에 쓴 것이 이깁니다.**

### 6. 유용한 객체 메서드

| 메서드 | 설명 | `profile` 예시 결과 |
|---|---|---|
| `Object.keys()` | Object 의 **Key** 값들을 배열로 반환 | `['name', 'age']` |
| `Object.values()` | Object 의 **Value** 값들을 배열로 반환 | `['Alice', 30]` |
| `Object.entries()` | Object 의 key와 Value 값들을 **한 쌍으로 묶은 배열**로 반환 | `[['name', 'Alice'], ['age', 30]]` |

```js
// extra_object_syntax.html
const profile = {
  name: 'Alice',
  age: 30
}
// ['name', 'age']
console.log(Object.keys(profile))

// ['Alice', 30]
console.log(Object.values(profile))

// [['name', 'Alice'], ['age', 30]]
console.log(Object.entries(profile))
```

### 7. Optional chaining (`?.`)
- 속성이 없는 중첩 객체에 접근하려 할 때 **에러 발생 없이 안전하게 접근**하는 방법
- 만약 참조 대상이 `null` 또는 `undefined`라면 에러가 발생하는 것 대신 **평가를 멈추고 `undefined`를 반환**

```js
// extra_object_syntax.html
const userData = {
  name: 'Alice',
  greeting: function () {
    return 'hello'
  }
}

console.log(userData.address.street) // Uncaught TypeError
console.log(userData.address?.street) // undefined

console.log(userData.nonMethod()) // Uncaught TypeError
console.log(userData.nonMethod?.()) // undefined
```

> 💡 **쉽게 이해하기** — `userData.address`는 undefined입니다. undefined에서 `.street`를 꺼내려 하니 TypeError. `?.`는 "**앞이 null/undefined면 거기서 멈추고 undefined를 줘**"라는 뜻입니다.

### Optional chaining 장점
- 참조가 누락될 가능성이 있는 경우 연결된 속성으로 접근할 때 더 짧고 간단한 표현식을 작성할 수 있음
- 어떤 속성이 필요한지에 대한 보증이 확실하지 않는 경우에 객체의 내용을 보다 편리하게 탐색할 수 있음
- 만약 Optional chaining을 사용하지 않는다면 다음과 같이 `&&` 연산자를 사용해야 함

```js
// extra_object_syntax.html
console.log(userData.address && userData.address.street) // undefined
```

### Optional chaining 주의사항
1. Optional chaining은 **존재하지 않아도 괜찮은 대상에만** 사용해야 함 (남용 X)
   - 왼쪽 평가대상이 없어도 괜찮은 경우에만 선택적으로 사용
   - 중첩 객체를 에러 없이 접근하는 것이 사용 목적이기 때문
   ```js
   // extra_object_syntax.html
   // 이전 예시 코드에서 userData 객체는 논리상 반드시 있어야 하지만 address는 필수 값이 아님
   // userData에 값을 할당하지 않은 문제가 있을 때 바로 알아낼 수 있어야 하기 때문

   // Bad
   userData?.address?.street
   // Good
   userData.address?.street
   ```
2. Optional chaining **앞의 변수는 반드시 선언**되어 있어야 함
   ```js
   console.log(myObj?.address) // Uncaught ReferenceError: myObj is not defined
   ```

### Optional chaining 정리
1. `obj?.prop` – obj가 존재하면 `obj.prop`을 반환하고, 그렇지 않으면 `undefined`를 반환
2. `obj?.[prop]` – obj가 존재하면 `obj[prop]`을 반환하고, 그렇지 않으면 `undefined`를 반환
3. `obj?.method()` – obj가 존재하면 `obj.method()`를 호출하고, 그렇지 않으면 `undefined`를 반환

> 📌 **TIP**
> - null과 undefined일 때만 동작합니다.
> - 체인 중간이 null인 경우, 그 뒤의 코드는 실행되지 않습니다. 이를 **'단락 평가'** 라고 부릅니다.

## 클래스 (참고)

### 클래스 (class) – 객체를 생성하기 위한 템플릿
- 객체의 속성, 메서드를 정의하는 **청사진** 역할
- '붕어빵'을 하나 만들 때마다 손으로 직접 모양을 빚는다고 상상해보세요. 100개를 만들려면 100번의 고된 수작업이 필요하겠죠? 객체를 하나씩 선언하는 것은 이와 같습니다. 만약 우리에게 '붕어빵 틀'이 있다면 어떨까요? 이 **'붕어빵 틀'이 바로 "클래스(class)"** 입니다.

### 클래스 기본 문법
1. **class 키워드**
   - 객체의 '설계도'인 클래스를 정의하기 위해 사용하는 예약어
   - 호이스팅 되지만, 선언 전에 접근하면 에러가 발생합니다. (TDZ)
2. **클래스 이름**
   - 일반적으로 **파스칼 케이스(PascalCase)** 로 작성
   - 함수처럼 이름을 생략한 '익명 클래스 표현식'으로 작성하는 것도 가능
3. **생성자 메서드 (`constructor()`)**
   - new로 객체 생성 시 **자동으로 호출**되며, 속성 값의 초기 설정을 담당
   - 'constructor'라는 이름을 가진 메서드가 **단 하나만** 존재할 수 있음

```js
class MyClass {
  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
}
```

> 📝 **용어**
> - **호이스팅**: 코드를 실행하기 전에 함수, 변수, 클래스 등의 선언이 스코프 맨 위로 끌어올려지는 것처럼 보이는 현상
> - **TDZ (Temporal Dead Zone)**: let, const, class 선언 전, 접근을 막는 일시적 사각 지대

### 클래스 특징
- **ES6**에서 도입
- 생성자 함수를 사용하던 기존의 객체 생성 방식을 더 명확하고 객체 지향적으로 표현하기 위해 도입
- 그래서 클래스는 내부적으로 생성자 함수를 기반으로 동작함

```js
// class.html
// 생성자 함수

function Member(name, age) {
  this.name = name
  this.age = age
  this.sayHi = function () {
    console.log(`Hi, I am ${this.name}`)
  }
}
```
```js
// 클래스

class Member {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}
```

### 클래스 활용
- `new` 키워드는 새 객체를 만들고, constructor를 호출하여 초기 속성 값을 설정
- 메서드 안의 `this`는 메서드를 호출한 member1 자신을 가리킴

```js
// class.html
class Member {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}

const member1 = new Member('Alice', 20)

console.log(member1) // Member { name: 'Alice', age: 20 }
console.log(member1.name) // Alice
member1.sayHi() // Hi, I am Alice
```

### 'new' 연산자 – 클래스나 생성자 함수를 사용하여 새로운 객체를 생성
```js
const instance = new ClassName(arg1, arg2)
```
- 클래스의 `constructor()`는 new 연산자에 의해 자동으로 호출되며 특별한 절차 없이 객체를 초기화 할 수 있음
- **new 없이 클래스를 호출하면 TypeError 발생**

> 💡 **쉽게 이해하기** — `new Member('Alice', 20)`을 실행하면 ① 빈 객체를 만들고 ② `constructor('Alice', 20)`이 자동 실행되어 `this.name = 'Alice'`, `this.age = 20`이 채워진 객체가 member1이 됩니다.

## 핵심 정리
- 객체는 키(key)와 값(value)으로 구성된 속성(property)들의 집합. 점(`.`)이나 대괄호(`[]`)로 접근·추가·수정·삭제
- 메서드는 객체의 속성에 할당된 함수, this는 메서드를 호출한 객체
- 일반 함수 안에서 this는 전역 객체(window), 화살표 함수는 자신만의 this가 없고 상위 스코프의 this를 참조 → 메서드 안의 중첩 함수에서 유용
- 구조 분해 할당 `{ a, b } = obj`, 전개 구문 `{ ...oldObj }`(얕은 복사), Optional Chaining `user.address?.street`
- JSON은 문자열 형식. `JSON.stringify()` 객체 → 문자열, `JSON.parse()` 문자열 → 객체
- 클래스는 객체를 만드는 템플릿, `new`가 constructor를 자동 호출

## 실습 문제
- 객체: **3080.** 함수와 객체 활용하기 · **2972.** 객체와 메서드 · **2973.** 객체 활용하기
