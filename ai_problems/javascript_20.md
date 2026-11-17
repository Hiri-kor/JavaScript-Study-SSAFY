# JavaScript – Controlling Event 주관식 20문항

첨부된 강의 자료(`1117_JavaScript_Controlling_Event.md`)의 내용을 바탕으로 출제된 주관식 20문항입니다. 단답형, 코드 빈칸 채우기, 실행 결과 예측 및 핵심 개념 서술형으로 구성되어 있습니다. 문제를 모두 푼 후 하단의 **정답 및 해설**을 통해 학습 내용을 점검해 보세요.

---

## [1~5] 1. 이벤트 기본 개념 및 등록 (`event`, `event object`, `event handler`, `addEventListener`)

**1. 강의 자료의 '카페 키오스크' 비유에서 다음 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 용어를 작성하시오.**
- 손님이 키오스크에서 하는 '주문'(클릭, 입력 등)이 바로 **( ㄱ )**입니다.
- 이 주문을 감지하고 받는 키오스크가 **( ㄴ )**입니다.
- 주문에 맞춰 커피를 만드는 바리스타의 행동(특정 이벤트 발생 시 실행되는 콜백 함수)이 **( ㄷ )**입니다.

**2. DOM에서 이벤트가 발생했을 때 브라우저가 자동으로 생성하며, 이벤트 발생 순간의 상세 정보(발생 요소, 마우스 좌표, 눌린 키 등)를 담고 있어 이벤트 핸들러 함수의 첫 번째 매개변수로 자동 전달되는 것은 무엇인가?**

**3. 특정 DOM 요소에 지정한 이벤트가 발생했을 때 실행할 이벤트 핸들러를 등록(연결)하는 메서드의 이름을 작성하시오.**

**4. 다음 코드에서 버튼을 클릭했을 때 `handleClick` 함수가 실행되도록 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 알맞은 코드를 작성하시오.**
```js
const button = document.querySelector('button')

const handleClick = function () {
  window.alert('버튼이 클릭 되었습니다!')
}

// 버튼에 클릭 이벤트 핸들러 등록
button.addEventListener('( ㄱ )', ( ㄴ ))
```

**5. 일반 함수(`function (event) {}`)를 이벤트 핸들러로 사용했을 때, 함수 내부의 `this`가 가리키는 대상은 무엇인지 설명하고, 이와 동일한 요소를 가리키는 `event` 객체의 속성 이름을 함께 작성하시오.**

---

## [6~10] 2. 이벤트 버블링과 캡처링 (`Bubbling`, `Capturing`, `target`, `currentTarget`)

**6. 한 요소에 이벤트가 발생하면, 해당 요소의 핸들러가 동작한 후 이어서 부모 요소의 핸들러가 동작하며 최상단의 조상 요소(`document`, `window`)를 만날 때까지 이 과정이 반복되는 현상을 무엇이라고 하는가?**

**7. 다음과 같이 중첩된 HTML 구조에서 사용자가 가장 안쪽의 `<p id="p">` 요소를 클릭했을 때, 콘솔에 출력되는 문자열을 순서대로 작성하시오.**
```html
<form id="form">form
  <div id="div">div
    <p id="p">p</p>
  </div>
</form>
<script>
  document.querySelector('#form').addEventListener('click', () => console.log('form 클릭'))
  document.querySelector('#div').addEventListener('click', () => console.log('div 클릭'))
  document.querySelector('#p').addEventListener('click', () => console.log('p 클릭'))
</script>
```

**8. 다음 코드는 최상위 요소인 `#outerouter`에만 클릭 이벤트 핸들러가 연결되어 있다. 사용자가 가장 안쪽의 `#inner` 요소를 클릭했을 때 콘솔의 `( ㄱ )`과 `( ㄴ )`에 출력될 값을 각각 작성하시오.**
```html
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
    console.log(event.currentTarget.id) // ( ㄱ )
    console.log(event.target.id)        // ( ㄴ )
  }

  outerOuterElement.addEventListener('click', clickHandler)
</script>
```

**9. 표준 DOM 이벤트 전파 과정 중, 이벤트가 최상위 조상(`Window`)에서 시작하여 실제 이벤트가 발생한 타겟(`event.target`) 요소까지 하위로 전파되는 단계를 무엇이라고 하는가?**

**10. `<div>` 요소 내부에 각자 다른 동작을 수행하는 `<button>`이 여러 개 있을 때, 각 버튼마다 이벤트 핸들러를 개별 등록하지 않고 공통 조상인 `<div>` 요소 하나에만 이벤트 핸들러를 등록하여 효율적으로 처리할 수 있는 이유를 '이벤트 버블링'과 `event.target`을 포함하여 서술하시오.**

---

## [11~16] 3. 이벤트 핸들러 활용 실습 (`click`, `input`, `classList`, `todo`, `lodash`)

**11. 다음은 `<input>` 요소에 사용자가 값을 입력할 때마다 실시간으로 `<p>` 요소에 출력하는 코드이다. 빈칸 `( ㄱ )`에 들어갈 이벤트 타입과 `( ㄴ )`에 들어갈 속성 이름을 작성하시오.**
```html
<input type="text" id="text-input">
<p></p>
<script>
  const inputTag = document.querySelector('#text-input')
  const pTag = document.querySelector('p')

  const inputHandler = function (event) {
    pTag.textContent = event.currentTarget.( ㄴ )
  }

  inputTag.addEventListener('( ㄱ )', inputHandler)
</script>
```

**12. 이벤트 핸들러 내부에서 `console.log(event)`로 이벤트 객체 전체를 출력한 후 개발자 도구 콘솔에서 객체를 펼쳐보면, `currentTarget` 속성의 값이 `null`로 나타난다. 그 이유가 무엇인지 서술하시오.**

**13. 다음 코드에서 버튼을 클릭할 때마다 `<h1>` 요소에 `'blue'` 클래스가 있으면 제거하고, 없으면 추가하여 CSS 스타일을 번갈아 변경(토글)하려고 한다. 빈칸 `( ㄱ )`에 들어갈 `classList`의 메서드 이름을 작성하시오.**
```js
const h1Tag = document.querySelector('h1')
const btn = document.querySelector('#btn')

const clickHandler = function () {
  h1Tag.classList.( ㄱ )('blue')
}
btn.addEventListener('click', clickHandler)
```

**14. 다음은 Todo 프로그램 실습 코드이다. 사용자의 입력값을 바탕으로 새로운 `<li>` 요소를 생성하고, 이를 `<ul>` 요소의 자식 요소로 추가하기 위해 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 DOM 메서드 이름을 작성하시오.**
```js
const inputTag = document.querySelector('.input-text')
const btn = document.querySelector('#btn')
const ulTag = document.querySelector('ul')

const addTodo = function (event) {
  const inputData = inputTag.value
  const liTag = document.( ㄱ )('li')
  liTag.textContent = inputData
  ulTag.( ㄴ )(liTag)
  inputTag.value = ''
}
btn.addEventListener('click', addTodo)
```

**15. 위 14번의 Todo 프로그램에서 사용자가 빈 문자열이나 공백만 입력했을 때 리스트에 추가되는 것을 방지하려고 한다. 문자열 양끝의 공백을 제거하여 입력값 유무를 검사하는 문자열 메서드 `( ㄱ )`을 작성하시오.**
```js
const addTodo = function (event) {
  const inputData = inputTag.value
  if (inputData.( ㄱ )()) {
    // li 생성 및 추가 로직
  } else {
    alert('할 일을 입력하세요..')
  }
}
```

**16. 다음은 `lodash` 라이브러리를 활용한 로또 번호 생성기 코드의 일부이다. 1부터 45까지의 숫자 배열을 생성하는 메서드 `( ㄱ )`과, 해당 배열에서 6개의 랜덤 번호를 추출하는 메서드 `( ㄴ )`의 이름을 각각 작성하시오.**
```js
// 1부터 45까지의 배열 생성
const numbers = _.( ㄱ )(1, 46)

// 45개의 요소가 있는 배열에서 6개의 랜덤 번호 추출
const sixNumbers = _.( ㄴ )(numbers, 6)
```

---

## [17~20] 4. 이벤트 기본 동작 취소 및 화살표 함수 (`preventDefault`, `Arrow Function`)

**17. HTML 요소가 기본적으로 가지고 있는 이벤트 동작(예: `<form>` 제출 시 페이지 새로고침, `<a>` 클릭 시 이동, 텍스트 복사 등)을 실행하지 않도록 취소하는 이벤트 객체의 메서드를 작성하시오.**

**18. 다음 `<form>` 요소에서 사용자가 Submit 버튼을 클릭하여 폼을 제출할 때 페이지가 새로고침되는 기본 동작을 막으려고 한다. 빈칸 `( ㄱ )`에 들어갈 이벤트 타입과 `( ㄴ )`에 들어갈 실행 구문을 작성하시오.**
```html
<form id="my-form">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
<script>
  const formTag = document.querySelector('#my-form')
  const handleSubmit = function (event) {
    ( ㄴ )
  }
  formTag.addEventListener('( ㄱ )', handleSubmit)
</script>
```

**19. 다음 코드에서 두 버튼을 각각 클릭했을 때 콘솔의 `( ㄱ )`과 `( ㄴ )`에 출력되는 결과가 무엇인지 각각 작성하시오.**
```html
<button id="function">function</button>
<button id="arrow">arrow</button>
<script>
  const functionButton = document.querySelector('#function')
  const arrowButton = document.querySelector('#arrow')

  functionButton.addEventListener('click', function () {
    console.log(this) // ( ㄱ )
  })
  arrowButton.addEventListener('click', () => {
    console.log(this) // ( ㄴ )
  })
</script>
```

**20. `addEventListener`의 이벤트 핸들러로 화살표 함수를 사용했을 때 `this`가 이벤트 연결 요소를 가리키지 않는 이유를 설명하고, 화살표 함수 내부에서 이벤트 리스너가 연결된 DOM 요소에 접근하기 위한 해결책을 작성하시오.**

---
---

## 정답 및 해설

<details>
<summary><b>정답 및 해설 보기 (클릭하여 펼치기)</b></summary>

### [1~5] 1. 이벤트 기본 개념 및 등록

1. **정답:** (ㄱ) **이벤트 (event)**, (ㄴ) **이벤트 리스너 (event listener)**, (ㄷ) **이벤트 핸들러 (event handler)**
   - **해설:** 웹 페이지에서 발생하는 클릭, 입력 등의 신호는 '이벤트', 이를 감지하고 대기하는 장치는 '이벤트 리스너', 이벤트 발생 시 실제로 수행되는 콜백 함수는 '이벤트 핸들러'입니다.
2. **정답:** **이벤트 객체 (`event` object / `event`)**
   - **해설:** DOM에서 이벤트가 발생하면 브라우저는 해당 이벤트에 대한 상세 정보를 담은 `event` 객체를 자동으로 생성하여 핸들러의 첫 번째 인자로 전달합니다.
3. **정답:** **`addEventListener` (또는 `.addEventListener()`)**
   - **해설:** `EventTarget.addEventListener(type, handler)` 메서드를 사용해 특정 DOM 요소에 이벤트 핸들러를 등록합니다.
4. **정답:** (ㄱ) **`click`**, (ㄴ) **`handleClick`**
   - **해설:** 첫 번째 인자로는 수신할 이벤트 타입 문자열 `'click'`을, 두 번째 인자로는 실행할 핸들러 함수를 괄호 없이 `handleClick` 형태로 전달해야 합니다.
5. **정답:** **이벤트 리스너가 연결된 DOM 요소**를 가리키며, **`event.currentTarget`** 속성 값과 동일하다.
   - **해설:** 일반 함수를 핸들러로 사용할 경우 함수 내부의 `this`는 이벤트 리스너가 부착된 요소(`event.currentTarget`)와 같습니다.

---

### [6~10] 2. 이벤트 버블링과 캡처링

6. **정답:** **이벤트 버블링 (Event Bubbling / 버블링)**
   - **해설:** 가장 깊은 곳의 요소에서 시작해 부모 요소를 거슬러 올라가며 이벤트가 전파되는 현상이 물속 거품과 닮았다고 하여 버블링이라고 부릅니다.
7. **정답:** **`p 클릭` → `div 클릭` → `form 클릭`**
   - **해설:** `<p>` 요소를 클릭하면 이벤트 버블링에 의해 `<p>`의 핸들러가 먼저 동작한 후 부모인 `<div>`, 그 부모인 `<form>`의 핸들러가 순차적으로 동작합니다.
8. **정답:** (ㄱ) **`outerouter`**, (ㄴ) **`inner`**
   - **해설:** `event.currentTarget`은 언제나 이벤트 핸들러가 연결된 요소(`#outerouter`)를 참조하고, `event.target`은 실제 이벤트가 시작된 가장 안쪽의 요소(`#inner`)를 참조합니다.
9. **정답:** **캡처링 (Capturing / Capture Phase)**
   - **해설:** 캡처링은 버블링과 반대로 최상위 조상에서 타겟 요소까지 하위로 이벤트가 전파되는 단계입니다.
10. **정답:** **하위 `<button>` 요소에서 발생한 클릭 이벤트가 이벤트 버블링에 의해 공통 조상인 `<div>` 요소로 전파되며, `<div>`의 핸들러에서 `event.target` 속성을 확인하면 실제로 어떤 버튼에서 이벤트가 발생했는지 정확히 구분할 수 있기 때문이다.**
    - **해설:** 이를 이벤트 위임(Event Delegation) 패턴이라고 하며, 여러 자식 요소의 이벤트를 부모 요소 한 곳에서 효율적으로 관리할 수 있습니다.

---

### [11~16] 3. 이벤트 핸들러 활용 실습

11. **정답:** (ㄱ) **`input`**, (ㄴ) **`value`**
    - **해설:** `<input>` 요소의 입력값을 실시간으로 감지하려면 `'input'` 이벤트를 등록하고, 입력된 텍스트 데이터는 `event.currentTarget.value`(또는 `event.target.value`)로 가져옵니다.
12. **정답:** **`currentTarget`은 이벤트가 처리되는(핸들러가 실행되는) 동안에만 사용할 수 있는 속성이라서, 이벤트 처리가 끝난 후 콘솔에서 객체를 펼쳐볼 때는 값이 `null`로 초기화되어 있기 때문이다.**
    - **해설:** 따라서 값을 확인하려면 핸들러 실행 중에 `console.log(event.currentTarget)`을 직접 출력하거나, 이벤트가 끝난 후에도 유지되는 `event.target`을 참고해야 합니다.
13. **정답:** **`toggle`**
    - **해설:** `classList.toggle('클래스명')`은 요소에 해당 클래스가 존재하면 제거하고, 존재하지 않으면 추가하는 동작을 수행합니다.
14. **정답:** (ㄱ) **`createElement`**, (ㄴ) **`appendChild`**
    - **해설:** `document.createElement('li')`로 새로운 `<li>` 요소를 생성하고, `ulTag.appendChild(liTag)`로 부모 `<ul>` 요소의 자식으로 추가합니다.
15. **정답:** **`trim`**
    - **해설:** `inputData.trim()`은 문자열 앞뒤의 공백을 제거합니다. 공백만 입력된 경우 `""`(빈 문자열, falsy)이 반환되어 조건문을 통과하지 못하므로 빈 항목 추가를 막을 수 있습니다.
16. **정답:** (ㄱ) **`range`**, (ㄴ) **`sampleSize`**
    - **해설:** `_.range(1, 46)`은 1 이상 46 미만(1~45)의 숫자 배열을 생성하며, `_.sampleSize(numbers, 6)`은 배열에서 중복 없이 6개의 랜덤 요소를 추출합니다.

---

### [17~20] 4. 이벤트 기본 동작 취소 및 화살표 함수

17. **정답:** **`event.preventDefault()` (또는 `.preventDefault()`)**
    - **해설:** `.preventDefault()` 메서드는 해당 이벤트에 대한 브라우저의 기본 동작을 실행하지 않도록 취소합니다.
18. **정답:** (ㄱ) **`submit`**, (ㄴ) **`event.preventDefault()`**
    - **해설:** `<form>`이 제출될 때 발생하는 이벤트는 `'submit'`이며, 핸들러 내부에서 `event.preventDefault()`를 호출하여 페이지 새로고침을 방지합니다.
19. **정답:** (ㄱ) **`<button id="function">function</button>`**, (ㄴ) **`window` (Window 전역 객체)**
    - **해설:** 일반 함수 핸들러 내부의 `this`는 이벤트 리스너가 부착된 버튼 요소를 가리키지만, 화살표 함수 핸들러 내부의 `this`는 상위 스코프의 `this`인 전역 객체(`window`)를 가리킵니다.
20. **정답:** **화살표 함수는 자신만의 `this`를 가지지 않고 자신이 선언된 상위 스코프의 `this`를 그대로 물려받아 사용하기 때문이다. 해결책으로는 화살표 함수 대신 일반 함수를 사용하거나, 화살표 함수 내부에서 `this` 대신 `event.currentTarget`을 사용하면 된다.**
    - **해설:** 화살표 함수를 이벤트 핸들러로 쓰더라도 첫 번째 매개변수로 `event` 객체는 정상 전달되므로 `event.currentTarget`을 통해 리스너가 연결된 요소를 안전하게 참조할 수 있습니다.

</details>