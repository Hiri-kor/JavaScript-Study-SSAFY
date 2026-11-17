# 코드 연습장 예제 (교안 코드)

"## 제목" 하나가 예제 하나입니다. 각 예제 안의 ```html / ```css / ```js 코드 블록이 연습장의 같은 탭에 들어갑니다.
제목에 "lodash"가 들어가면 lodash 라이브러리를 함께 불러옵니다.

## [변수] let · const · 블록 스코프

```js
let x = 1
if (x === 1) {
  let x = 2
  console.log(x)  // 2
}
console.log(x)  // 1

const number = 10
// number = 20  // 주석을 풀면 에러가 납니다
```

## [호이스팅] var · let · 함수 선언식

```js
sayHello() // 'Hello!' 출력

function sayHello() {
  console.log('Hello!')
}

// 교안 코드는 변수 이름이 name인데, 브라우저에서 맨 바깥의 var name은
// 원래 있던 window.name과 겹쳐 undefined 대신 ''가 찍힙니다. 그래서 이름만 바꿨습니다.
console.log(userName)  // undefined (에러발생 X)
var userName = '홍길동'

console.log(age)  // ReferenceError: Cannot access 'age' before initialization
let age = 30
```

## [타입·연산자] 동등 / 일치 / 논리 연산자

```js
console.log('1' == 1)   // true
console.log('1' === 1)  // false
console.log(0 == false)  // true
console.log(0 === false) // false

console.log(1 && 0) // 0
console.log(0 && 1) // 0
console.log(4 && 7) // 7
console.log(1 || 0) // 1
console.log(0 || 1) // 1
console.log(4 || 7) // 4

const obj1 = { name: 'Alice', age: 30 }
const obj2 = obj1
obj2.age = 40
console.log(obj1.age) // 40
```

## [반복문] for…in 과 for…of

```js
const arr = ['a', 'b', 'c']
for (const i in arr) {
  console.log(i) // 0, 1, 2
}
for (const i of arr) {
  console.log(i) // a, b, c
}

const capitals = { korea: '서울', japan: '도쿄', china: '베이징' }
for (const capital in capitals) {
  console.log(capital, capitals[capital])
}
```

## [함수] 매개변수 · 전개 구문 · 화살표 함수

```js
const greeting = function (name = 'Anonymous') {
  return `Hi ${name}`
}
console.log(greeting()) // Hi Anonymous

const myFunc = function (param1, param2, ...restParams) {
  return [param1, param2, restParams]
}
console.log(myFunc(1, 2, 3, 4, 5)) // [1, 2, [3, 4, 5]]

function sum3(x, y, z) {
  return x + y + z
}
const numbers = [1, 2, 3]
console.log(sum3(...numbers)) // 6

const arrow = name => `hello, ${name}`
console.log(arrow('JS'))
```

## [콜백] calculator · setTimeout

```js
const calculator = function (a, b, action) {
  return action(a, b)
}
const add = (a, b) => a + b
const sub = (a, b) => a - b
console.log(calculator(10, 20, add)) // 30
console.log(calculator(10, 20, sub)) // -10

console.log('1. 주문 하기')
setTimeout(function () {
  console.log('2. 커피 나왔습니다! (콜백 실행)')
}, 3000)
console.log('3. 자리에 앉기')
```

## [객체] this · 중첩 함수 · 화살표 함수

```js
const person = {
  name: 'Alice',
  greeting: function () {
    return `Hello my name is ${this.name}`
  },
}
console.log(person.greeting())

const myObj2 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach(function (number) {
      console.log(this) // window
    })
  }
}
myObj2.myFunc()

const myObj3 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach((number) => {
      console.log(this) // myObj3
    })
  }
}
myObj3.myFunc()
```

## [객체] JSON · 구조 분해 · Optional chaining

```js
const jsObject = { coffee: 'Americano', iceCream: 'Cookie and cream' }
const objToJson = JSON.stringify(jsObject)
console.log(objToJson, typeof objToJson)
const jsonToObj = JSON.parse(objToJson)
console.log(jsonToObj, typeof jsonToObj)

const userInfo = { firstName: 'Alice', userId: 'alice123', email: 'alice123@gmail.com' }
const { firstName, userId, email } = userInfo
console.log(firstName, userId, email)

const userData = { name: 'Alice' }
console.log(userData.address?.street) // undefined
```

## [클래스] Member

```js
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
console.log(member1)
console.log(member1.name)
member1.sayHi()
```

## [배열] forEach · map · filter · reduce

```js
const names = ['Alice', 'Bella', 'Cathy']
names.forEach((name, index, array) => {
  console.log(`${name} / ${index} / ${array}`)
})

console.log(names.map(name => name.length)) // [5, 5, 5]

const numbers = [1, 2, 3, 4, 5]
console.log(numbers.filter(num => num % 2 === 0)) // [2, 4]

const sum = numbers.reduce((acc, cur) => {
  console.log(`누적: ${acc}, 현재: ${cur}`)
  return acc + cur
}, 0)
console.log(sum) // 15

const counts = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'].reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1
  return acc
}, {})
console.log(counts)
```

## [DOM] 선택 · classList · 속성 · textContent

```html
<h1 class="heading">DOM 조작</h1>
<a href="https://www.google.com/">google</a>
<p class="content">content1</p>
<p class="content">content2</p>
<p class="content">content3</p>
```

```css
.red {
  color: crimson;
}
```

```js
console.log(document.querySelector('.content'))
console.log(document.querySelectorAll('.content'))

const h1Tag = document.querySelector('.heading')
h1Tag.classList.toggle('red')
console.log(h1Tag.classList)

const aTag = document.querySelector('a')
aTag.setAttribute('href', 'https://www.naver.com/')
console.log(aTag.getAttribute('href'))

h1Tag.textContent = '내용 수정'
```

## [DOM] 요소 생성 · 스타일

```html
<div>
  <p>Lorem, ipsum dolor.</p>
</div>
```

```js
const h1Tag = document.createElement('h1')
h1Tag.textContent = '제목'
const divTag = document.querySelector('div')
divTag.appendChild(h1Tag)

const pTag = document.querySelector('p')
pTag.style.color = 'crimson'
pTag.style.fontSize = '2rem'
pTag.style.border = '1px solid black'
```

## [이벤트] 클릭 카운터

```html
<button id="btn">버튼</button>
<p>클릭횟수 : <span id="counter">0</span></p>
```

```js
let initialValue = 0
const btn = document.querySelector('#btn')
const clickHandler = function () {
  initialValue += 1
  const spanTag = document.querySelector('#counter')
  spanTag.textContent = initialValue
}
btn.addEventListener('click', clickHandler)
```

## [이벤트] 입력 값 실시간 출력 + 클래스 토글

```html
<h1></h1>
<button id="btn">클릭</button>
<input type="text" id="text-input">
```

```css
.blue {
  color: blue;
}
```

```js
const inputTag = document.querySelector('#text-input')
const h1Tag = document.querySelector('h1')
const inputHandler = function (event) {
  h1Tag.textContent = event.currentTarget.value
}
inputTag.addEventListener('input', inputHandler)

const btn = document.querySelector('#btn')
const clickHandler = function () {
  h1Tag.classList.toggle('blue')
}
btn.addEventListener('click', clickHandler)
```

## [이벤트] todo 목록

```html
<input type="text" class="input-text">
<button id="btn">+</button>
<ul></ul>
```

```js
const inputTag = document.querySelector('.input-text')
const btn = document.querySelector('#btn')
const ulTag = document.querySelector('ul')

const addTodo = function (event) {
  const inputData = inputTag.value
  if (inputData.trim()) {
    const liTag = document.createElement('li')
    liTag.textContent = inputData
    ulTag.appendChild(liTag)
    inputTag.value = ''
  } else {
    alert('할 일을 입력하세요..')
  }
}
btn.addEventListener('click', addTodo)
```

## [이벤트] 로또 번호 생성기 (lodash)

```html
<h1>로또 추천 번호</h1>
<button id="btn">행운 번호 받기</button>
<div></div>
```

```js
const btn = document.querySelector('#btn')
const divTag = document.querySelector('div')
const getLottery = function (event) {
  const numbers = _.range(1, 46)
  const sixNumbers = _.sampleSize(numbers, 6)
  const ulTag = document.createElement('ul')
  sixNumbers.forEach((number) => {
    const liTag = document.createElement('li')
    liTag.textContent = number
    ulTag.appendChild(liTag)
  })
  divTag.appendChild(ulTag)
}
btn.addEventListener('click', getLottery)
```

## [이벤트] 버블링 (form > div > p)

```html
<form id="form">
  form
  <div id="div">
    div
    <p id="p">p</p>
  </div>
</form>
```

```css
form, div, p { border: 1px solid #888; padding: 10px; margin: 6px; }
```

```js
const formElement = document.querySelector('#form')
const divElement = document.querySelector('#div')
const pElement = document.querySelector('#p')

formElement.addEventListener('click', function (event) {
  console.log('form이 클릭되었습니다.')
})
divElement.addEventListener('click', function (event) {
  console.log('div가 클릭되었습니다.')
})
pElement.addEventListener('click', function (event) {
  console.log('p가 클릭되었습니다.')
})
```

## [이벤트] target vs currentTarget

```html
<div id="outerouter">
  outerouter
  <div id="outer">
    outer
    <div id="inner">inner</div>
  </div>
</div>
```

```css
#outer { width: 200px; height: 200px; background-color: crimson; }
#inner { width: 100px; height: 100px; background-color: skyblue; }
#outerouter { width: 300px; height: 300px; background-color: yellowgreen; }
```

```js
const outerOuterElement = document.querySelector('#outerouter')
const clickHandler = function (event) {
  console.log('currentTarget:', event.currentTarget.id)
  console.log('target:', event.target.id)
}
outerOuterElement.addEventListener('click', clickHandler)
```

## [이벤트] preventDefault (copy · submit)

```html
<h1>중요한 내용</h1>
<form id="my-form">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
```

```js
const h1Tag = document.querySelector('h1')
h1Tag.addEventListener('copy', function (event) {
  event.preventDefault()
  alert('복사 할 수 없습니다.')
})

const formTag = document.querySelector('#my-form')
formTag.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('제출을 막았어요 (새로고침 안 됨)')
})
```

## [이벤트] 일반 함수 vs 화살표 함수의 this

```html
<button id="function">function</button>
<button id="arrow">arrow</button>
```

```js
const functionButton = document.querySelector('#function')
const arrowButton = document.querySelector('#arrow')

functionButton.addEventListener('click', function () {
  console.log(this) // <button id="function">function</button>
})
arrowButton.addEventListener('click', () => {
  console.log(this) // window
})
```
