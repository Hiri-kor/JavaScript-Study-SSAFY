## 학습 목표

- `addEventListener`를 사용해 이벤트 핸들러를 등록할 수 있다.
- 이벤트 핸들러의 event 객체를 활용해 정보를 얻을 수 있다.
- 이벤트 버블링의 개념과 전파 과정을 설명할 수 있다.
- `event.target`과 `event.currentTarget`의 차이점을 이해한다.
- 이벤트 버블링을 활용하여 상위 요소에 이벤트를 위임한다.
- `event.preventDefault()`로 요소의 기본 동작을 취소한다.
- DOM 조작과 이벤트를 결합하여 동적인 웹을 구현한다.

## 학습 시작

> 💡 **웹 페이지를 하나의 '카페'라고 상상해봅시다. 손님의 주문은 어떻게 처리될까요?**
> 1. 손님이 키오스크에서 하는 '주문'(클릭, 입력 등)이 바로 ( ? )입니다.
> 2. 이 주문을 받는 키오스크가 ( ? )입니다.
> 3. 주문에 맞춰 커피를 만드는 바리스타의 행동이 ( ? )입니다.
>
> 웹 페이지에서 다양한 클릭, 입력을 받아 처리하는 방식을 학습합니다. 정답은 이 페이지 맨 아래 "정리"에 있어요.

## 이벤트

### 일상속의 이벤트
- 컴퓨터 키보드를 눌러 텍스트를 입력하는 것
- 전화벨이 울려 전화가 왔음을 알리는 것
- 손을 흔들어 인사하는 것
- 전화기의 버튼을 눌러서 통화를 시작하는 것
- 리모컨을 사용하여 채널을 변경하는 것

### 웹에서의 이벤트
- 화면을 스크롤하는 것
- 버튼을 클릭했을 때 팝업 창이 출력되는 것
- 마우스 커서의 위치에 따라 드래그 앤 드롭하는 것
- 사용자의 키보드 입력 값에 따라 새로운 요소를 생성하는 것
- ➤ 웹에서의 거의 **모든 상호작용은 이벤트와 함께 함**

## event

### event – 웹 페이지 상에서 '무언가 일어났다는 신호 또는 사건'

> 💡 **JS 이벤트는 '영화 서비스'와 같습니다.** 우리가 보고 싶은 영화 포스터에 마우스를 올리면(**이벤트**), 시스템은 마우스의 움직임을 감지(**리스너**)하고, 작은 미리보기 영상이나 설명을 보여주는(**핸들러**) 반응을 보입니다. 마우스 움직임 하나하나가 이벤트가 될 수 있고, 이러한 다양한 클릭, 입력, 변경하는 행위가 이벤트에 해당합니다.

### DOM 요소와 이벤트
- 모든 DOM 요소는 다양한 형태의 이벤트를 발생시킬 수 있음
- 예) button 을 클릭하면 **click** 이벤트, input 값 변경 시 **input** 이벤트, …

> 📝 **DOM 요소**: HTML 문서의 각 태그를 하나의 객체로 변환한 것

## event object

### event object
- DOM에서 이벤트가 발생하면, 브라우저는 해당 이벤트에 관한 정보를 담은 **'event object'를 자동으로 생성**
- 이벤트 종류
  - mouse
  - input
  - keyboard
  - …
- 참고: [MDN – Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) (InputEvent, KeyboardEvent, MouseEvent …)

> 📌 **TIP**
> - 이벤트 객체는 이벤트 발생 순간의 상황(어떤 요소에서 이벤트가 발생했는지, 마우스 좌표는 어디인지, 눌린 키는 무엇인지 등)과 관련된 상세 정보를 담고 있습니다.
> - 이를 통해 이벤트와 관련된 구체적인 정보를 참조할 수 있습니다.

- DOM 요소에서 event가 발생하면, 해당 event는 연결된 이벤트 처리기(**event handler**)에 의해 처리 됨
- (교안 그림) 손님 `Event (Order)` → 바리스타 `Event Handler (Barista)`

## event handler

### event handler – 특정 이벤트가 발생했을 때 실행되는 (콜백)함수

> 💡 **이벤트 핸들러는 카페의 '바리스타'와 같습니다.** 손님이 키오스크에서 아메리카노를 주문하면(이벤트), 바리스타는 정해 둔 레시피대로 커피를 만듭니다(**핸들러 실행**). 바리스타는 주문이 들어오기 전에는 커피를 만들지 않고 기다리다가, 주문이 들어온 순간에만 움직입니다. 이처럼 핸들러는 우리가 직접 호출하는 함수가 아니라, **이벤트가 발생했을 때 브라우저가 대신 호출해 주는 (콜백)함수**입니다.

- ※ 보통 `addEventListener`를 통해 DOM 요소에 event handler를 등록합니다.

### `.addEventListener()` – 특정 DOM 요소에, 지정한 이벤트가 발생했을 때 실행할 이벤트 핸들러를 **등록하는 메서드**

> 💡 **addEventListener는 키오스크에 '주문 처리 규칙'을 등록하는 것과 같습니다.** "아메리카노 버튼이 눌리면(click), 바리스타(handler)를 불러 주세요"라고 키오스크(리스너)에 미리 등록해 둡니다. 한 번만 등록해 두면, 이후 주문이 들어올 때마다 키오스크가 알아서 바리스타를 부릅니다. 등록할 때는 바리스타를 지금 부르는 것이 아니라 '누구를 부를지' 알려 주는 것이므로, **`handleClick()`이 아닌 `handleClick`처럼 괄호 없이** 함수를 전달합니다.

- ※ 이벤트 핸들러(콜백 함수)를 DOM 요소에 연결하는 역할을 담당합니다.

### `.addEventListener()` 예시
- `handleClick` 함수가 **이벤트 핸들러**이며, `button.addEventListener()`는 그 핸들러를 click 이벤트에 연결해주는 역할

```html
<!-- addEventListener.html -->
<button>버튼</button>
<script>
  const button = document.querySelector('button')

  // 이벤트 핸들러
  const handleClick = function () {
    window.alert('버튼이 클릭 되었습니다!')
  }

  // addEventListener 메서드를 이용해 버튼에 이벤트 핸들러를 등록
  button.addEventListener('click', handleClick)
</script>
```

### 이벤트 등록 (addEventListener)

```text
EventTarget.addEventListener(type, handler)
└─ DOM 요소   └─ 리스너         └─ 수신할 이벤트  └─ 핸들러
```

- **DOM 요소**: HTML 문서의 각 태그를 하나의 객체로 변환한 것
- **수신할 이벤트**: 무언가 일어났다는 신호 또는 사건
- **핸들러**: 특정 이벤트가 발생했을 때 실행되는 (콜백)함수

### addEventListener 구조
- 메서드 구문: `.addEventListener(type, handler)`
- `type`
  - 수신할 이벤트 유형
  - **문자열**로 작성 (ex. `'click'`, `'mouseover'` 등)
- `handler`
  - 이벤트 발생 시 호출되는 **콜백 함수**
  - 자동으로 **event 객체를 첫번째 매개변수**로 받음
  - 반환 값 없음

```js
element.addEventListener('click', function (event) {
  // 이벤트 처리 로직
})
```

### 이벤트 객체 전달
- 이벤트 발생 시, 이벤트 객체는 **자동으로** 이벤트 핸들러 함수에 인자로 전달됨
- 핸들러 함수는 이 인자를 통해 이벤트에 대한 상세 정보(이벤트 발생 요소, 이벤트 타입, 추가 데이터 등)에 접근하고 적절한 동작을 수행

```html
<!-- event.html -->
<button id="btn">버튼</button>
<script>
  // 1. 버튼 요소 선택
  const btn = document.querySelector('#btn')

  // 2. 이벤트 핸들러
  const detectClick = function (event) {
    console.log(event) // PointerEvent
    console.log(event.type) // click
  }

  // 3. 버튼에 이벤트 핸들러를 등록
  btn.addEventListener('click', detectClick)
</script>
```

> 💡 **쉽게 이해하기** — `detectClick`을 우리가 직접 호출하지 않았는데도 `event`에 값이 들어 있는 이유: 클릭이 일어나면 **브라우저가 event 객체를 만들어 핸들러의 첫 번째 인자로 넣어서 호출**해 주기 때문입니다.

### 이벤트 핸들러에서의 this
- **일반 함수**를 핸들러로 사용 시, `this`는 **이벤트 리스너가 연결된 요소**를 가리킴 (event 객체의 **`currentTarget`** 속성 값과 동일)

```html
<!-- event.html -->
<button id="btn">버튼</button>
<script>
  // 1. 버튼 선택
  const btn = document.querySelector('#btn')

  // 2. 이벤트 핸들러
  const detectClick = function (event) {
    console.log(event.currentTarget) // <button id="btn">버튼</button>
    console.log(this) // <button id="btn">버튼</button>
  }

  // 3. 버튼에 이벤트 핸들러를 등록
  btn.addEventListener('click', detectClick)
</script>
```

## 버블링

### 버블링 개요
- `form > div > p` 형태의 중첩된 구조에 각각 이벤트 핸들러가 연결되어 있을 때, 만약 `<p>` 요소를 클릭하면 어떻게 될까?

```html
<!-- bubbling.html -->
<form id="form">
  form
  <div id="div">
    div
    <p id="p">p</p>
  </div>
</form>
<script>
  const formElement = document.querySelector('#form')
  const divElement = document.querySelector('#div')
  const pElement = document.querySelector('#p')

  const clickHandler1 = function (event) {
    console.log('form이 클릭되었습니다.')
  }
  const clickHandler2 = function (event) {
    console.log('div가 클릭되었습니다.')
  }
  const clickHandler3 = function (event) {
    console.log('p가 클릭되었습니다.')
  }

  formElement.addEventListener('click', clickHandler1)
  divElement.addEventListener('click', clickHandler2)
  pElement.addEventListener('click', clickHandler3)
</script>
```
`p`를 클릭했을 때 콘솔:
```console
p가 클릭되었습니다.
div가 클릭되었습니다.
form이 클릭되었습니다.
```
- `<p>` 요소만 클릭했는데도 불구하고 **모든 핸들러가 동작**함
- ➤ 왜 p만을 클릭했는데 부모 요소 `<div>`와 `<form>`에 할당된 핸들러까지 동작할까?

### 버블링 (Bubbling)
- 한 요소에 이벤트가 발생하면, **해당 요소의 핸들러가 동작한 후 이어서 부모 요소의 핸들러가 동작**하는 현상
- 가장 최상단의 조상 요소(`document`, 그리고 `window`)를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작
- ➤ 최하위의 `<p>` 요소를 클릭하면 **`p → div → form`** 순서로 3개의 이벤트 핸들러가 모두 순차적으로 동작했던 것

> 📌 **TIP** — 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생하는 것이 마치 **물속 거품**과 닮았기 때문에 버블링이라고 합니다.

### 이벤트가 정확히 어디서 발생했는지 접근할 수 있는 방법

| 속성 | 가리키는 것 | 특징 |
|---|---|---|
| `event.currentTarget` | **'현재' 요소** – 항상 이벤트 핸들러가 연결된 요소만을 참조 | `'this'` 와 같음 |
| `event.target` | 이벤트가 발생한 **가장 안쪽의 요소(target)** – 실제 이벤트가 시작된 요소 | 버블링이 진행 되어도 **변하지 않음** |

### 'target' & 'currentTarget' 예시
- 세 요소 중 가장 최상위 요소인 **outerouter 요소에만** 핸들러가 연결
- 각 요소를 클릭 했을 때 event의 target과 currentTarget의 차이 비교
- 핸들러는 outerouter에만 연결되어 있지만, 하위 요소 outer와 inner를 클릭해도 해당 핸들러가 동작함
- 클릭 이벤트가 어디서 발생했든 상관없이 outerouter까지 이벤트가 버블링 되어 핸들러를 실행시키기 때문

```html
<!-- target_currentTarget.html -->
<style>
  #outer {
    width: 200px;
    height: 200px;
    background-color: crimson;
  }
  #inner {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
  #outerouter {
    width: 300px;
    height: 300px;
    background-color: yellowgreen;
  }
</style>
<div id="outerouter">
  outerouter
  <div id="outer">
    outer
    <div id="inner">inner</div>
  </div>
</div>
<script>
  const outerOuterElement = document.querySelector('#outerouter')

  const clickHandler = function (event) {
    console.log('currentTarget:', event.currentTarget.id)
    console.log('target:', event.target.id)
  }

  outerOuterElement.addEventListener('click', clickHandler)
</script>
```

| 클릭한 요소 | currentTarget | target |
|---|---|---|
| inner (하늘색) | outerouter | inner |
| outer (빨간색) | outerouter | outer |
| outerouter (연두색) | outerouter | outerouter |

> 📝 **용어**
> - **currentTarget**: 핸들러가 연결된 outerouter 요소만을 가리킴
> - **target**: 실제 이벤트가 발생하는 요소를 가리킴

> 💡 **쉽게 이해하기** — 학교 방송실(outerouter)에만 전화기(핸들러)가 있다고 해 봅시다. 1반(inner) 학생이 전화를 걸든 2반(outer) 학생이 걸든, **전화를 받는 곳(currentTarget)은 항상 방송실**이고, **전화를 건 사람(target)은 매번 다릅니다.** 위 표에서 currentTarget 열이 모두 같은 이유입니다.

## 캡처링과 버블링

### 캡처링 (capturing)
- 이벤트가 최상위 조상에서 타겟 요소까지 **하위로 전파**되는 단계 (버블링과 반대)
- table 의 하위 요소 td를 클릭하면, 이벤트는 먼저 **최상위 요소부터 아래로 전파**됨 (**캡처링**)
- 실제 이벤트가 발생한 지점(`event.target`)에서 실행된 후 **다시 위로 전파** (**버블링**)

```text
(1) Capture Phase  : Window → Document → <html> → <body> → <table> → <tbody> → <tr> → <td>
(2) Target Phase   : <td> (실제로 클릭한 요소 = event.target)
(3) Bubbling Phase : <td> → <tr> → <tbody> → <table> → <body> → <html> → Document → Window
```

> 📌 **TIP** — 캡처링은 실제 개발자가 다루는 경우가 거의 없으므로 **버블링을 집중해서** 학습하는 것이 좋습니다.

## 버블링의 필요성

### 버블링이 필요한 이유
- 만약 다음과 같이 각자 다른 동작을 수행하는 버튼이 여러 개가 있다고 가정하면, 각 버튼마다 서로 다른 이벤트 핸들러를 등록해야 할까?
- ➤ **각 버튼의 공통 조상인 div 요소에 이벤트 핸들러 단 하나만 할당하기**
- **요소들의 공통 조상에** 이벤트 핸들러를 **하나만 등록**하면, 여러 자식 요소에서 발생하는 이벤트를 한곳에서 효율적으로 다룰 수 있음
- 공통 조상(div)에 할당한 핸들러에서 **`event.target`을 이용하면 실제 어떤 버튼에서 이벤트가 발생했는지** 알 수 있기 때문

```html
<!-- bubbling_example.html -->
<div>
  <button>버튼1</button>
  <button>버튼2</button>
  <button>버튼3</button>
</div>
<script>
  const divTag = document.querySelector('div')
  const clickHandler = function (event) {
    console.log(event.target)
  }
  divTag.addEventListener('click', clickHandler)
</script>
```

> 📝 **서술형 대비** — "버블링은 한 요소에서 이벤트가 발생하면 그 요소의 핸들러가 동작한 뒤 부모 요소의 핸들러가 차례로 동작하는 현상이다. 이를 활용하면 여러 자식 요소의 공통 조상에 핸들러를 하나만 등록하고, event.target으로 실제 이벤트가 발생한 자식을 구분해 효율적으로 처리할 수 있다."

## event handler 활용

### event handler 활용 실습 목록
1. 버튼을 클릭하면 숫자를 1씩 증가해서 출력하기
2. 사용자 입력 값을 실시간으로 출력하기
3. 사용자 입력 값을 실시간으로 출력하기 + 버튼을 클릭하면 출력된 값의 CSS 스타일을 변경하기
4. todo 프로그램 구현
5. 로또 번호 생성기 구현

### 1. click 이벤트 실습 – 버튼을 클릭하면 숫자를 1씩 증가
```html
<!-- practice_click_event.html -->
<button id="btn">버튼</button>
<p>클릭횟수 : <span id="counter">0</span></p>
<script>
  // 1. 초기값 할당
  let initialValue = 0

  // 2. 버튼 요소 선택
  const btn = document.querySelector('#btn')

  // 3. 콜백 함수 (버튼에 클릭 이벤트가 발생할때마다 실행할 코드)
  const clickHandler = function () {
    // 3.1 초기값 += 1
    initialValue += 1

    // 3.2 span 요소를 선택
    const spanTag = document.querySelector('#counter')
    // 3.3 span 요소의 컨텐츠를 1 증가한 초기값으로 설정
    spanTag.textContent = initialValue
  }

  // 4. 버튼에 이벤트 핸들러 등록 (클릭 이벤트)
  btn.addEventListener('click', clickHandler)
</script>
```

> 💡 **쉽게 이해하기** — `initialValue`는 값을 바꿔야 하므로 `let`입니다. 핸들러 **바깥**에 있어야 클릭할 때마다 0으로 초기화되지 않고 누적됩니다.

### 2. input 이벤트 실습 – 사용자의 입력 값을 실시간으로 출력하기
```html
<!-- practice_input_event.html -->
<input type="text" id="text-input">
<p></p>
<script>
  // 1. input 요소 선택
  const inputTag = document.querySelector('#text-input')

  // 2. p 요소 선택
  const pTag = document.querySelector('p')

  // 3. 콜백 함수
  // (input 요소에 input 이벤트가 발생할때마다 실행할 코드)
  const inputHandler = function (event) {
    // 3.1 작성하는 데이터가 어디에 누적되고 있는지 찾기
    // console.log(event.currentTarget)
    console.log(event.currentTarget.value)

    // 3.2 p요소의 컨텐츠에 작성하는 데이터를 추가
    pTag.textContent = event.currentTarget.value
  }

  // 4. input 요소에 이벤트 핸들러 등록 (input 이벤트)
  inputTag.addEventListener('input', inputHandler)
</script>
```
- `hello`를 입력하면 콘솔에 `h`, `he`, `hel`, `hell`, `hello`가 차례로 출력 (글자 하나 입력할 때마다 input 이벤트 발생)

### 'currentTarget' 주의사항
- `console.log()`로 event 객체를 출력할 경우, **currentTarget 키의 값은 `null`** 을 가짐
- currentTarget은 이벤트가 **처리되는 동안에만** 사용할 수 있기 때문
- 대신 `console.log(event.currentTarget)`로 확인 가능
- currentTarget 이후의 속성 값들은 **'target'을 참고해서 사용하기**

### 3. click & input 이벤트 실습 – 입력 값을 실시간으로 출력하고, 클릭 버튼을 클릭 시 출력 값의 CSS 변경하기
```html
<!-- practice_click_input_event.html -->
<style>
  .blue {
    color: blue;
  }
</style>
<h1></h1>
<button id="btn">클릭</button>
<input type="text" id="text-input">
<script>
  // input 구현
  const inputTag = document.querySelector('#text-input')
  const h1Tag = document.querySelector('h1')
  const inputHandler = function (event) {
    h1Tag.textContent = event.currentTarget.value
  }
  inputTag.addEventListener('input', inputHandler)

  // click 구현 (세 방법 중 하나를 골라 주석을 풀어 실행)
  const btn = document.querySelector('#btn')
  const clickHandler = function () {
    // 1. add 방법
    // h1Tag.classList.add('blue')
    // 2. toggle 방법
    h1Tag.classList.toggle('blue')
    // 3. if 방법
    // if (h1Tag.classList.contains('blue')) {
    //   h1Tag.classList.remove('blue')
    // } else {
    //   h1Tag.classList.add('blue')
    // }
  }
  btn.addEventListener('click', clickHandler)
</script>
```
- 교안 원문은 세 방법 모두 주석 처리되어 있습니다. 바로 실행해 볼 수 있도록 여기서는 2번(toggle)만 주석을 풀었습니다.

> 💡 **쉽게 이해하기** — 1번(add)은 한 번 파랗게 되면 다시 돌아오지 않고, 2번(toggle)과 3번(if)은 누를 때마다 파랑 ↔ 기본색이 바뀝니다. 3번은 toggle이 하는 일을 직접 풀어 쓴 것입니다.

### 4. todo 실습 – 입력 후 '+' 버튼 클릭 시, 실시간으로 리스트에 출력
```html
<!-- practice_todo.html -->
<input type="text" class="input-text">
<button id="btn">+</button>
<ul></ul>
<script>
  // 1. 필요한 요소 선택
  const inputTag = document.querySelector('.input-text')
  const btn = document.querySelector('#btn')
  const ulTag = document.querySelector('ul')
  // 2. 할 일을 추가하는 함수 (이벤트 핸들러)
  const addTodo = function (event) {
    // 2.1 사용자 입력 데이터 저장
    const inputData = inputTag.value
    // 2.2 데이터를 저장할 li 요소를 생성
    const liTag = document.createElement('li')
    // 2.3 li 요소 컨텐츠에 데이터 입력
    liTag.textContent = inputData
    // 2.4 li 요소를 부모 ul 요소의 자식 요소로 추가
    ulTag.appendChild(liTag)
    // 2.5 todo 추가 후 input의 입력 데이터는 초기화
    inputTag.value = ''
  }
  // 3. 버튼에 이벤트 핸들러를 등록
  btn.addEventListener('click', addTodo)
</script>
```

- **추가 기능 구현** – 1. 빈 문자열 입력 방지 2. 입력이 없을 경우 경고 대화상자를 띄움

```js
// practice_todo.html
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
```

> 💡 **쉽게 이해하기** — `inputData.trim()`은 앞뒤 공백을 지운 문자열입니다. 공백만 입력하면 `''`(빈 문자열)이 되고, 빈 문자열은 [자동 형변환](03-types-operators.html#자동-형변환)에서 **false**라서 else로 갑니다.

### 5. 로또 번호 생성기 실습 – '행운 번호 받기' 버튼 클릭 시, 6개의 랜덤 번호가 실시간으로 리스트에 출력
```html
<!-- practice_lottery.html -->
<h1>로또 추천 번호</h1>
<button id="btn">행운 번호 받기</button>
<div></div>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script>
  // 1. 필요한 요소 선택
  const btn = document.querySelector('#btn')
  const divTag = document.querySelector('div')
  // 2. 로또 번호를 화면에 출력하는 함수 (이벤트 핸들러)
  const getLottery = function (event) {
    // 2.1 1부터 45까지의 배열 생성
    const numbers = _.range(1, 46)
    // 2.2 45개의 요소가 있는 배열에서 6개의 랜덤 번호 추출
    const sixNumbers = _.sampleSize(numbers, 6)
    // 2.3 6개의 li 요소를 담을 ul 요소 생성
    const ulTag = document.createElement('ul')
    // 2.4 추출한 번호 배열을 "반복"하면서 li 요소를 생성
    sixNumbers.forEach((number) => {
      // 2.5 번호를 담을 li 요소 생성 후 입력
      const liTag = document.createElement('li')
      // 2.6 번호를 li 요소에 입력
      liTag.textContent = number
      // 2.7 만들어진 li를 ul 요소에 추가
      ulTag.appendChild(liTag)
    })
    // 2.8 완성한 ul 요소를 div 요소에 추가
    divTag.appendChild(ulTag)
  }
  // 3. 버튼 요소에 이벤트 핸들러를 등록
  btn.addEventListener('click', getLottery)
</script>
```

### lodash
- 모듈성, 성능 및 추가 기능을 제공하는 **JavaScript 유틸리티 라이브러리**
- array/object 등 자료구조를 다룰 때, 간편하고 유용한 함수들을 제공
- 참고 링크: [lodash.com](https://lodash.com/)
- 교안 그림의 예: `_.sampleSize([1, 2, 3], 2) // => [3, 1]`

> 💡 **쉽게 이해하기** — `_.range(1, 46)`은 1부터 45까지(46은 포함 안 함) 배열을 만들고, `_.sampleSize(배열, 6)`은 그중 6개를 무작위로 뽑습니다. 이 실습은 이벤트 + 배열(forEach) + DOM 조작(createElement, appendChild)을 한 번에 연습합니다.

## 이벤트 기본 동작 취소하기

### 이벤트 기본 동작 취소하기
- HTML의 각 요소가 기본적으로 가지고 있는 이벤트가 때로는 방해가 되는 경우가 있어 이벤트의 기본 동작을 취소할 필요가 있음
- 예시
  - `form` 요소의 제출 이벤트를 취소하여 **페이지 새로고침을 막을** 수 있음
  - `<a>` 태그를 클릭했을 때 **페이지 이동을 막고**, 대신 다른 로직을 수행하게 할 수 있음

### `.preventDefault()` – 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정

> 💡 **preventDefault는 택배 기사님의 기본 동작**은 '문 앞에 두기'인데, '경비실에 맡겨 주세요'라고 요청하면 기본 동작은 취소되고 내가 정한 방식으로 처리된다. **기본 동작 취소 + 대신 내 로직**을 위해 사용한 기능이 preventDefault 입니다.

### 이벤트 동작 취소 실습 목록
1. `copy` 이벤트 동작 취소
2. `form` 제출 시 페이지 새로고침 동작 취소

### 1. copy 이벤트 동작 취소 – 복사 이벤트를 실행하지 못하도록 하기 (콘텐츠를 복사 하는 것을 방지)
```html
<!-- prevent_event.html -->
<h1>중요한 내용</h1>
<script>
  const h1Tag = document.querySelector('h1')
  h1Tag.addEventListener('copy', function (event) {
    console.log(event)
    event.preventDefault()
    alert('복사 할 수 없습니다.')
  })
</script>
```

### 2. form 제출 시 페이지 새로고침 동작 취소
- form 요소의 submit 동작(action 값으로 요청)을 취소 시킴
- 실습 시 submit 버튼을 눌러도 새로고침이 안되는 것을 확인할 수 있음
- ※ **form 제출 시 기본적으로 새로고침 실행**

```html
<!-- prevent_event.html -->
<form id="my-form">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
<script>
  const formTag = document.querySelector('#my-form')
  const handleSubmit = function (event) {
    event.preventDefault()
  }

  formTag.addEventListener('submit', handleSubmit)
</script>
```

> ⚠️ **헷갈리기 쉬운 점** — form에서 막을 이벤트는 버튼의 `'click'`이 아니라 **form의 `'submit'`** 입니다.

## 참고: addEventListener와 화살표 함수 관계

### addEventListener에서의 화살표 함수 주의사항
- 화살표 함수는 **자신만의 this를 가지지 않음**
- 대신, 자신이 선언된 **상위 스코프의 this**를 그대로 물려받아 사용
- 따라서 이벤트 핸들러로 화살표 함수를 사용하면, this는 대부분 **전역 객체(window)** 를 가리키게 됨
- 해결책
  - 일반 함수로 사용하기
  - 화살표 함수일 경우 **`event.currentTarget`** 을 사용하기

> 📝 **화살표 함수**: function 키워드 대신 `=>`를 사용해 함수를 간결하게 표현하는 문법.

```html
<!-- listener_with_this.html -->
<button id="function">function</button>
<button id="arrow">arrow</button>
<script>
  const functionButton = document.querySelector('#function')
  const arrowButton = document.querySelector('#arrow')

  functionButton.addEventListener('click', function () {
    console.log(this) // <button id="function">function</button>
  })
  arrowButton.addEventListener('click', () => {
    console.log(this) // window
  })
</script>
```

> 💡 **쉽게 이해하기** — [객체](06-objects.html#해결책) 주제에서는 화살표 함수가 this 문제를 **해결**했는데, 여기서는 오히려 **문제**가 됩니다. 이유는 같습니다: 화살표 함수는 자기 this 없이 **바깥 this**를 쓰기 때문입니다. 메서드 안의 forEach에선 바깥 this가 객체라서 좋았고, 이벤트 핸들러에선 바깥 this가 window라서 곤란합니다.

## 정리: 카페 비유 정답

> 💡 웹 페이지를 하나의 '카페'라고 상상해봅시다. 손님의 주문은 어떻게 처리될까요?
> 1. 손님이 키오스크에서 하는 '주문'(클릭, 입력 등)이 바로 **이벤트**입니다.
> 2. 이 주문을 받는 키오스크가 **이벤트 리스너** 입니다.
> 3. 주문에 맞춰 커피를 만드는 바리스타의 행동이 **이벤트 핸들러**입니다.

```html
<button id="order-btn">아메리카노 주문</button>
<script>
  // '주문'을 받을 키오스크(버튼) 선택
  const button = document.querySelector('#order-btn')

  // '바리스타'의 행동(핸들러) 정의
  const makeCoffee = function (event) {
    console.log('커피 제조', event) // event 객체를 통해 주문 정보 확인 가능
  }

  // 키오스크에 '주문'이 들어오면 '바리스타'가 행동하도록 연결
  button.addEventListener('click', makeCoffee)
</script>
```

## 핵심 정리

| 개념 | 설명 | 예시 |
|---|---|---|
| 이벤트 (event) | 웹페이지에서 일어나는 신호 또는 사건 | click, input 등 |
| 이벤트 핸들러 | 이벤트 발생 시 실행되는 콜백 함수 | `btn.addEventListener('click', func)` |
| addEventListener | DOM 요소에 이벤트 핸들러를 등록 | `btn.addEventListener('click', func)` |
| 이벤트 버블링 | 이벤트가 부모 요소로 전파되는 현상 | 하위 요소 클릭 시 상위 핸들러 동작 |
| event.target | 실제 이벤트가 시작된 요소를 참조 | `console.log(event.target)` |
| event.currentTarget | 핸들러가 연결된 요소를 참조 | `console.log(event.currentTarget)` |
| preventDefault | 이벤트의 기본 동작을 취소 | `event.preventDefault()` |

## 교안 실습 문제
- 이벤트: **1917.** input Event - Bad Word Filter · **1923.** Click Event - ThemeSwitcher · **1919.** change Event - Form Validator · **1920.** submit Event - Card Maker · **3083.** 이벤트 핸들러와 DOM 조작 - 기초
- 버블링: **3082.** 버블링과 캡처링
