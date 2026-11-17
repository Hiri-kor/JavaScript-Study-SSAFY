# JavaScript – Controlling Event 코드 빈칸 채우기 20문항

첨부된 강의 자료(`1117_JavaScript_Controlling_Event.md`)의 모든 예제 코드와 실습 로직을 완벽히 체화할 수 있도록 구성된 **코드 빈칸 채우기 전용 20문항**입니다. 주석과 설명을 참고하여 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 정확한 코드(메서드, 속성, 키워드 등)를 작성해 보세요.

---

## [1~4] 1. 이벤트 등록 및 이벤트 객체 (`addEventListener`, `event`, `this`)

**1. 다음은 `<button>` 요소를 선택하고, 클릭 이벤트가 발생했을 때 알림창을 띄우는 이벤트 핸들러를 등록하는 기본 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 코드를 작성하시오.**
```js
const button = document.querySelector('button')

const handleClick = function () {
  window.alert('버튼이 클릭 되었습니다!')
}

// 버튼에 click 이벤트 핸들러를 등록 (괄호 없이 함수 전달)
button.( ㄱ )('( ㄴ )', ( ㄷ ))
```

**2. 다음은 강의 자료의 '카페 키오스크' 비유를 코드로 구현한 것이다. `#order-btn` 버튼을 선택하여 클릭 시 `makeCoffee` 핸들러가 실행되도록 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`을 채우시오.**
```js
// 1. '주문'을 받을 키오스크(id가 order-btn인 요소) 선택
const button = document.querySelector('( ㄱ )')

// 2. '바리스타'의 행동(핸들러) 정의 - 첫 번째 매개변수로 이벤트 객체를 받음
const makeCoffee = function (( ㄴ )) {
  console.log('커피 제조', ( ㄴ ))
}

// 3. 키오스크에 클릭 '주문'이 들어오면 '바리스타'가 행동하도록 연결
button.addEventListener('click', ( ㄷ ))
```

**3. 다음은 버튼을 클릭했을 때 전달받은 이벤트 객체와 발생한 이벤트의 유형(`'click'`)을 콘솔에 출력하는 코드이다. 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 알맞은 코드를 작성하시오.**
```html
<button id="btn">버튼</button>
<script>
  const btn = document.querySelector('#btn')

  // 이벤트 객체를 첫 번째 매개변수로 받음
  const detectClick = function (( ㄱ )) {
    console.log(( ㄱ ))          // PointerEvent 객체 출력
    console.log(( ㄱ ).( ㄴ ))   // 'click' (이벤트 유형 문자열 출력)
  }

  btn.addEventListener('click', detectClick)
</script>
```

**4. 일반 함수를 이벤트 핸들러로 사용했을 때, 이벤트 리스너가 연결된 DOM 요소(`<button id="btn">버튼</button>`)를 콘솔에 출력하는 두 가지 방법이다. 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 알맞은 속성 및 키워드를 작성하시오.**
```js
const btn = document.querySelector('#btn')

const detectClick = function (event) {
  console.log(event.( ㄱ )) // <button id="btn">버튼</button>
  console.log(( ㄴ ))       // <button id="btn">버튼</button>
}

btn.addEventListener('click', detectClick)
```

---

## [5~8] 2. 버블링과 `target` vs `currentTarget`

**5. 다음은 `form > div > p` 중첩 구조에서 각 요소에 클릭 이벤트를 연결하여 버블링을 확인하는 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 코드를 작성하시오.**
```js
const formElement = document.querySelector('#form')
const divElement = document.querySelector('#div')
const pElement = document.querySelector('#p')

const clickHandler1 = function (event) { console.log('form이 클릭되었습니다.') }
const clickHandler2 = function (event) { console.log('div가 클릭되었습니다.') }
const clickHandler3 = function (event) { console.log('p가 클릭되었습니다.') }

formElement.( ㄱ )('click', clickHandler1)
divElement.addEventListener('( ㄴ )', clickHandler2)
pElement.addEventListener('click', ( ㄷ ))
```

**6. 최상위 요소인 `#outerouter`에만 핸들러를 등록하고, 클릭 시 핸들러가 연결된 요소의 `id`와 실제 클릭이 발생한 가장 안쪽 요소의 `id`를 각각 출력하려고 한다. 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 속성을 작성하시오.**
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
    // 1. 핸들러가 연결된 요소(outerouter)의 id 출력
    console.log('currentTarget:', event.( ㄱ ).id)
    // 2. 실제 이벤트가 발생한 요소의 id 출력
    console.log('target:', event.( ㄴ ).id)
  }

  outerOuterElement.addEventListener('click', clickHandler)
</script>
```

**7. 위 6번 코드에서 사용자가 각 요소를 클릭했을 때 콘솔에 출력될 문자열을 주석의 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 알맞게 작성하시오.**
```js
// [상황 1] 하늘색 상자인 #inner 요소를 클릭했을 때:
// currentTarget: ( ㄱ )
// target: ( ㄴ )

// [상황 2] 빨간색 상자인 #outer 요소를 클릭했을 때:
// currentTarget: outerouter
// target: ( ㄷ )
```

**8. 여러 개의 `<button>`을 가진 부모 `<div>` 요소 하나에만 이벤트 핸들러를 등록(이벤트 위임)하여, 실제로 어떤 자식 버튼이 클릭되었는지 콘솔에 출력하는 코드이다. 빈칸 `( ㄱ )`과 `( ㄴ )`을 채우시오.**
```html
<div>
  <button>버튼1</button>
  <button>버튼2</button>
</div>
<script>
  const divTag = document.querySelector('( ㄱ )')
  const clickHandler = function (event) {
    // 실제 클릭이 발생한 버튼 요소를 출력
    console.log(event.( ㄴ ))
  }
  divTag.addEventListener('click', clickHandler)
</script>
```

---

## [9~16] 3. event handler 활용 실습 (카운터, 실시간 입력, CSS 변경, Todo, 로또)

**9. [실습 1] 버튼을 클릭할 때마다 숫자를 1씩 증가시켜 `<span id="counter">`에 출력하는 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 코드를 작성하시오.**
```html
<button id="btn">버튼</button>
<p>클릭횟수 : <span id="counter">0</span></p>
<script>
  // 1. 초기값 0 할당 (재할당이 가능해야 함)
  ( ㄱ ) initialValue = 0
  const btn = document.querySelector('#btn')

  const clickHandler = function () {
    // 2. 초기값을 1 증가시킴
    initialValue ( ㄴ ) 1
    const spanTag = document.querySelector('#counter')
    // 3. span 요소의 텍스트 컨텐츠를 증가된 값으로 설정
    spanTag.( ㄷ ) = initialValue
  }

  btn.addEventListener('click', clickHandler)
</script>
```

**10. [실습 2] 사용자가 `<input>`에 입력하는 값을 실시간으로 `<p>` 요소에 출력하는 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 코드를 작성하시오.**
```html
<input type="text" id="text-input">
<p></p>
<script>
  const inputTag = document.querySelector('#text-input')
  const pTag = document.querySelector('p')

  const inputHandler = function (event) {
    // 1. input 요소에 작성 중인 데이터를 콘솔에 출력
    console.log(event.currentTarget.( ㄱ ))
    // 2. p 요소의 텍스트 컨텐츠에 작성 중인 데이터를 실시간 반영
    pTag.( ㄴ ) = event.currentTarget.( ㄱ )
  }

  // 3. input 요소에 실시간 입력 이벤트 등록
  inputTag.addEventListener('( ㄷ )', inputHandler)
</script>
```

**11. [실습 3-1] 버튼을 클릭했을 때 `<h1>` 요소에 `.blue` 클래스를 단방향으로 추가하거나(방법 1), 클릭할 때마다 클래스를 넣었다 뺐다 토글하는(방법 2) 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`을 채우시오.**
```js
const h1Tag = document.querySelector('h1')
const btn = document.querySelector('#btn')

const clickHandler = function () {
  // [방법 1] add 방법: 'blue' 클래스 추가
  h1Tag.( ㄱ ).( ㄴ )('blue')

  // [방법 2] toggle 방법: 'blue' 클래스 토글
  h1Tag.( ㄱ ).( ㄷ )('blue')
}
btn.addEventListener('click', clickHandler)
```

**12. [실습 3-2] 위 11번의 `toggle` 메서드를 사용하지 않고 `if ~ else` 조건문으로 동일한 토글 동작을 직접 구현한 코드(방법 3)이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 `classList`의 메서드 이름을 작성하시오.**
```js
const clickHandler = function () {
  // [방법 3] if 방법: 'blue' 클래스 포함 여부에 따라 제거 또는 추가
  if (h1Tag.classList.( ㄱ )('blue')) {
    h1Tag.classList.( ㄴ )('blue')
  } else {
    h1Tag.classList.( ㄷ )('blue')
  }
}
```

**13. [실습 4-1] Todo 프로그램의 기본 추가 로직이다. 입력창의 데이터를 가져와 새로운 `<li>` 요소를 만들고 `<ul>`에 추가한 뒤 입력창을 비우는 코드의 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`, `( ㄹ )`을 채우시오.**
```html
<input type="text" class="input-text">
<button id="btn">+</button>
<ul></ul>
<script>
  const inputTag = document.querySelector('.input-text')
  const btn = document.querySelector('#btn')
  const ulTag = document.querySelector('ul')

  const addTodo = function (event) {
    // 2.1 사용자 입력 데이터 저장
    const inputData = inputTag.( ㄱ )
    // 2.2 데이터를 저장할 li 요소를 생성
    const liTag = document.( ㄴ )('li')
    // 2.3 li 요소 컨텐츠에 데이터 입력
    liTag.textContent = inputData
    // 2.4 li 요소를 부모 ul 요소의 자식 요소로 추가
    ulTag.( ㄷ )(liTag)
    // 2.5 todo 추가 후 input의 입력 데이터는 빈 문자열로 초기화
    inputTag.( ㄱ ) = ( ㄹ )
  }

  btn.addEventListener('click', addTodo)
</script>
```

**14. [실습 4-2] Todo 프로그램에서 빈 문자열이나 공백만 입력되었을 때 추가를 막고 경고 대화상자를 띄우는 개선된 코드이다. 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 메서드/함수 이름을 작성하시오.**
```js
const addTodo = function (event) {
  const inputData = inputTag.value
  // 앞뒤 공백을 제거한 문자열이 비어있지 않은지 확인
  if (inputData.( ㄱ )()) {
    const liTag = document.createElement('li')
    liTag.textContent = inputData
    ulTag.appendChild(liTag)
    inputTag.value = ''
  } else {
    // 입력이 없을 경우 경고 대화상자를 띄움
    ( ㄴ )('할 일을 입력하세요..')
  }
}
```

**15. [실습 5-1] `lodash` 라이브러리를 사용하여 1부터 45까지의 배열을 생성하고, 그중 6개의 랜덤 번호를 추출하는 로또 번호 생성기 코드의 앞부분이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`을 채우시오.**
```js
const getLottery = function (event) {
  // 2.1 1부터 45까지의 숫자 배열 생성
  const numbers = _.( ㄱ )(( ㄴ ), ( ㄷ ))
  // 2.2 45개의 요소가 있는 배열에서 6개의 랜덤 번호 추출
  const sixNumbers = _.( ㄹ )(numbers, 6)
  // ...
}
```

**16. [실습 5-2] 위 15번에서 추출한 6개의 번호 배열(`sixNumbers`)을 순회하면서 `<li>` 요소를 만들어 `<ul>`에 추가하고, 완성된 `<ul>`을 `<div>`에 추가하는 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`, `( ㄹ )`을 채우시오.**
```js
const getLottery = function (event) {
  const numbers = _.range(1, 46)
  const sixNumbers = _.sampleSize(numbers, 6)
  // 2.3 6개의 li 요소를 담을 ul 요소 생성
  const ulTag = document.( ㄱ )('ul')

  // 2.4 추출한 번호 배열을 반복하면서 li 요소를 생성
  sixNumbers.( ㄴ )((number) => {
    const liTag = document.( ㄱ )('li')
    liTag.( ㄷ ) = number
    ulTag.( ㄹ )(liTag)
  })
  // 2.8 완성한 ul 요소를 div 요소에 추가
  divTag.( ㄹ )(ulTag)
}
```

---

## [17~20] 4. 이벤트 기본 동작 취소 및 화살표 함수 (`preventDefault`, `Arrow Function`)

**17. 사용자가 `<h1>중요한 내용</h1>`의 텍스트를 복사하려 할 때, 복사 기본 동작을 취소하고 경고창을 띄우는 코드이다. 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 알맞은 코드를 작성하시오.**
```html
<h1>중요한 내용</h1>
<script>
  const h1Tag = document.querySelector('h1')
  h1Tag.addEventListener('( ㄱ )', function (event) {
    event.( ㄴ )()
    alert('복사 할 수 없습니다.')
  })
</script>
```

**18. `<form>` 요소가 제출(submit)될 때 페이지가 새로고침되는 기본 동작을 취소하는 코드이다. 빈칸 `( ㄱ )`, `( ㄴ )`, `( ㄷ )`에 들어갈 알맞은 코드를 작성하시오.**
```html
<form id="my-form">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
<script>
  const formTag = document.querySelector('( ㄱ )')
  const handleSubmit = function (event) {
    event.( ㄴ )()
  }

  formTag.addEventListener('( ㄷ )', handleSubmit)
</script>
```

**19. 일반 함수와 화살표 함수를 각각 이벤트 핸들러로 등록했을 때의 차이를 비교하는 코드이다. 빈칸 `( ㄱ )`에 화살표 함수 기호를 작성하고, 두 버튼을 클릭했을 때 콘솔에 출력되는 대상을 `( ㄴ )`과 `( ㄷ )`에 작성하시오.**
```js
functionButton.addEventListener('click', function () {
  console.log(this) // 출력 결과: ( ㄴ )
})

arrowButton.addEventListener('click', () ( ㄱ ) {
  console.log(this) // 출력 결과: ( ㄷ )
})
```

**20. 화살표 함수를 이벤트 핸들러로 사용하면서, `this` 대신 이벤트 리스너가 연결된 `arrowButton` 요소를 콘솔에 정상적으로 출력하도록 빈칸 `( ㄱ )`과 `( ㄴ )`을 채워 코드를 수정하시오.**
```js
arrowButton.addEventListener('click', (( ㄱ )) => {
  console.log(( ㄱ ).( ㄴ )) // <button id="arrow">arrow</button> 출력
})
```

---
---

## 정답 및 해설

<details>
<summary><b>정답 및 해설 보기 (클릭하여 펼치기)</b></summary>

### [1~4] 1. 이벤트 등록 및 이벤트 객체

1. **정답:**
   - (ㄱ) **`addEventListener`**
   - (ㄴ) **`click`**
   - (ㄷ) **`handleClick`**
   - **해설:** `DOM요소.addEventListener('이벤트타입', 핸들러함수)` 형식으로 등록하며, 핸들러 함수는 괄호 없이 함수 이름만 전달합니다.

2. **정답:**
   - (ㄱ) **`#order-btn`**
   - (ㄴ) **`event`** (또는 임의의 매개변수명 `e`)
   - (ㄷ) **`makeCoffee`**
   - **해설:** `id`가 `order-btn`인 요소를 선택할 때는 `'#order-btn'` 선택자를 사용하며, 핸들러의 첫 번째 인자로 `event` 객체를 받아 주문 정보를 확인할 수 있습니다.

3. **정답:**
   - (ㄱ) **`event`**
   - (ㄴ) **`type`**
   - **해설:** 이벤트 객체의 `event.type` 속성은 발생한 이벤트의 이름(`'click'`)을 문자열로 반환합니다.

4. **정답:**
   - (ㄱ) **`currentTarget`**
   - (ㄴ) **`this`**
   - **해설:** 일반 함수를 핸들러로 사용할 때 `this`는 이벤트 리스너가 부착된 요소를 가리키며, 이는 `event.currentTarget`과 완전히 동일합니다.

---

### [5~8] 2. 버블링과 `target` vs `currentTarget`

5. **정답:**
   - (ㄱ) **`addEventListener`**
   - (ㄴ) **`click`**
   - (ㄷ) **`clickHandler3`**
   - **해설:** 세 요소 모두에 `click` 이벤트 핸들러를 등록해 두면, `<p>` 클릭 시 버블링에 의해 `clickHandler3` → `clickHandler2` → `clickHandler1` 순서로 모두 동작합니다.

6. **정답:**
   - (ㄱ) **`currentTarget`**
   - (ㄴ) **`target`**
   - **해설:** `event.currentTarget`은 핸들러가 연결된 현재 요소(`#outerouter`)를 참조하고, `event.target`은 실제 이벤트가 시작된 가장 안쪽 요소를 참조합니다.

7. **정답:**
   - (ㄱ) **`outerouter`**
   - (ㄴ) **`inner`**
   - (ㄷ) **`outer`**
   - **해설:** 어떤 하위 요소를 클릭하든 `currentTarget`은 핸들러가 부착된 `outerouter`로 고정되며, `target`은 실제 클릭한 요소(`inner` 또는 `outer`)의 `id`가 출력됩니다.

8. **정답:**
   - (ㄱ) **`div`**
   - (ㄴ) **`target`**
   - **해설:** 공통 조상인 `div`에 핸들러를 등록하고 `event.target`을 출력하면 버블링 덕분에 실제로 클릭된 자식 `<button>` 요소를 정확히 알 수 있습니다.

---

### [9~16] 3. event handler 활용 실습

9. **정답:**
   - (ㄱ) **`let`**
   - (ㄴ) **`+=`**
   - (ㄷ) **`textContent`**
   - **해설:** 클릭할 때마다 값이 바뀌어야 하므로 `const`가 아닌 `let`으로 선언하고, `initialValue += 1`로 증가시킨 뒤 `spanTag.textContent`에 할당합니다.

10. **정답:**
    - (ㄱ) **`value`**
    - (ㄴ) **`textContent`**
    - (ㄷ) **`input`**
    - **해설:** `<input>` 태그에 입력된 값은 `.value` 속성으로 가져오며, 실시간 입력 감지는 `'input'` 이벤트를 사용합니다.

11. **정답:**
    - (ㄱ) **`classList`**
    - (ㄴ) **`add`**
    - (ㄷ) **`toggle`**
    - **해설:** 요소의 클래스를 조작할 때는 `classList` 객체를 사용하며, 클래스 추가는 `.add('blue')`, 있으면 제거하고 없으면 추가하는 토글은 `.toggle('blue')`를 사용합니다.

12. **정답:**
    - (ㄱ) **`contains`**
    - (ㄴ) **`remove`**
    - (ㄷ) **`add`**
    - **해설:** `classList.contains('blue')`로 클래스 존재 여부를 확인하여, 있으면 `classList.remove('blue')`로 지우고 없으면 `classList.add('blue')`로 추가합니다.

13. **정답:**
    - (ㄱ) **`value`**
    - (ㄴ) **`createElement`**
    - (ㄷ) **`appendChild`**
    - (ㄹ) **`''`** (또는 **`""`**)
    - **해설:** `document.createElement('li')`로 요소를 생성하고 `ulTag.appendChild(liTag)`로 자식에 추가한 뒤, `inputTag.value = ''`로 입력창을 초기화합니다.

14. **정답:**
    - (ㄱ) **`trim`**
    - (ㄴ) **`alert`** (또는 **`window.alert`**)
    - **해설:** `inputData.trim()`으로 문자열 양끝 공백을 제거하여 빈 문자열 입력을 방지하고, 입력이 없을 때는 `alert()`로 경고창을 띄웁니다.

15. **정답:**
    - (ㄱ) **`range`**
    - (ㄴ) **`1`**
    - (ㄷ) **`46`**
    - (ㄹ) **`sampleSize`**
    - **해설:** `_.range(1, 46)`으로 1부터 45까지의 배열을 생성하고, `_.sampleSize(numbers, 6)`으로 6개의 번호를 무작위 추출합니다.

16. **정답:**
    - (ㄱ) **`createElement`**
    - (ㄴ) **`forEach`**
    - (ㄷ) **`textContent`**
    - (ㄹ) **`appendChild`**
    - **해설:** 추출된 6개의 번호 배열을 `.forEach()`로 순회하면서 각각 `li` 태그를 생성(`createElement`)하여 텍스트(`textContent`)를 넣고 `ul`에 추가(`appendChild`)한 뒤, 최종적으로 `ul`을 `div`에 추가(`appendChild`)합니다.

---

### [17~20] 4. 이벤트 기본 동작 취소 및 화살표 함수

17. **정답:**
    - (ㄱ) **`copy`**
    - (ㄴ) **`preventDefault`**
    - **해설:** 복사 시 발생하는 `'copy'` 이벤트를 감지하여 `event.preventDefault()`로 브라우저의 기본 복사 동작을 취소합니다.

18. **정답:**
    - (ㄱ) **`#my-form`** (또는 **`form`**)
    - (ㄴ) **`preventDefault`**
    - (ㄷ) **`submit`**
    - **해설:** `<form>`의 제출 이벤트인 `'submit'` 발생 시 `event.preventDefault()`를 호출하면 페이지 새로고침 동작이 취소됩니다.

19. **정답:**
    - (ㄱ) **`=>`**
    - (ㄴ) **`<button id="function">function</button>`** (또는 `functionButton` 요소)
    - (ㄷ) **`window`** (전역 객체)
    - **해설:** 화살표 함수(`=>`)는 자신만의 `this`를 가지지 않고 상위 스코프의 `this`를 물려받으므로 핸들러 내부에서 `this`를 출력하면 전역 객체인 `window`가 출력됩니다.

20. **정답:**
    - (ㄱ) **`event`** (또는 임의의 매개변수명 `e`)
    - (ㄴ) **`currentTarget`**
    - **해설:** 화살표 함수를 핸들러로 사용할 때는 `this` 대신 첫 번째 매개변수로 전달되는 이벤트 객체의 `event.currentTarget` 속성을 사용하여 리스너가 연결된 요소에 접근합니다.

</details>