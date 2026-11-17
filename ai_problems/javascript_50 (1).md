# JavaScript – Controlling Event 객관식 50문항

첨부된 강의 자료(`1117_JavaScript_Controlling_Event.md`)의 내용을 바탕으로 출제된 객관식 50문항입니다. 문제를 모두 푼 후 하단의 **정답 및 해설**을 통해 학습 내용을 점검해 보세요.

---

## [1~13] 1. 이벤트 기본 개념 및 등록 (`event`, `event object`, `event handler`, `addEventListener`)

**1. 웹 페이지에서 발생하는 '이벤트(event)'에 대한 설명으로 가장 적절한 것은?**
a) HTML 문서의 각 태그를 하나의 객체로 변환한 것이다.
b) 웹 페이지 상에서 클릭, 입력 등 '무언가 일어났다는 신호 또는 사건'을 의미한다.
c) 특정 사건이 발생했을 때 실행되도록 등록된 콜백 함수이다.
d) 배열이나 객체 등 자료구조를 다룰 때 간편한 함수를 제공하는 라이브러리이다.

**2. 강의 자료의 '카페 키오스크' 비유에서 (ㄱ) 손님이 키오스크에서 하는 '주문', (ㄴ) 주문을 받는 '키오스크', (ㄷ) 주문에 맞춰 커피를 만드는 '바리스타의 행동'에 해당하는 개념을 바르게 짝지은 것은?**
a) (ㄱ) 이벤트 - (ㄴ) 이벤트 핸들러 - (ㄷ) 이벤트 리스너
b) (ㄱ) 이벤트 객체 - (ㄴ) 이벤트 리스너 - (ㄷ) 이벤트 핸들러
c) (ㄱ) 이벤트 - (ㄴ) 이벤트 리스너 - (ㄷ) 이벤트 핸들러
d) (ㄱ) 이벤트 핸들러 - (ㄴ) 이벤트 객체 - (ㄷ) 이벤트 리스너

**3. 강의 자료의 '영화 서비스' 비유에서 보고 싶은 영화 포스터에 마우스를 올렸을 때, '작은 미리보기 영상이나 설명을 보여주는 반응'에 해당하는 것은?**
a) 이벤트 (Event)
b) 이벤트 리스너 (Event Listener)
c) 이벤트 핸들러 (Event Handler)
d) 이벤트 캡처링 (Event Capturing)

**4. DOM 요소와 이벤트에 대한 설명으로 틀린 것은?**
a) DOM 요소는 HTML 문서의 각 태그를 하나의 객체로 변환한 것이다.
b) 모든 DOM 요소는 다양한 형태의 이벤트를 발생시킬 수 있다.
c) `<button>` 요소를 클릭하면 `click` 이벤트가 발생한다.
d) `<input>` 요소의 값이 변경될 때는 오직 `click` 이벤트만 발생한다.

**5. DOM에서 이벤트가 발생했을 때 브라우저가 자동으로 생성하는 '이벤트 객체(event object)'에 대한 설명으로 옳은 것은?**
a) 개발자가 직접 `new Event()`를 호출해야만 핸들러에서 사용할 수 있다.
b) 이벤트가 발생한 요소, 마우스 좌표, 눌린 키 등 이벤트 발생 순간의 상세 정보를 담고 있다.
c) 이벤트 핸들러 함수의 두 번째 매개변수로 자동 전달된다.
d) `InputEvent`, `KeyboardEvent`, `MouseEvent`는 이벤트 객체와 무관한 별개의 DOM 요소이다.

**6. 이벤트 핸들러(event handler)에 대한 설명으로 옳지 않은 것은?**
a) 특정 이벤트가 발생했을 때 실행되는 콜백(callback) 함수이다.
b) 보통 `.addEventListener()` 메서드를 통해 DOM 요소에 등록한다.
c) 코드가 로드되는 즉시 우리가 직접 함수를 호출(`handler()`)하여 실행시킨다.
d) 이벤트가 발생했을 때 브라우저가 대신 호출해 주는 함수이다.

**7. 다음 중 `button` 요소에 클릭 이벤트 핸들러로 `handleClick` 함수를 등록하는 올바른 코드는?**
a) `button.addEventListener('click', handleClick())`
b) `button.addEventListener('click', handleClick)`
c) `button.addEventListener(click, handleClick)`
d) `button.onEvent('click', handleClick)`

**8. `.addEventListener(type, handler)`에 함수를 등록할 때 `handleClick()`이 아닌 `handleClick`처럼 괄호 없이 전달하는 이유로 가장 적절한 것은?**
a) 자바스크립트 문법상 함수 이름 뒤에 괄호를 붙이면 문법 에러(SyntaxError)가 발생하기 때문이다.
b) 괄호를 붙이면 이벤트가 발생하기를 기다리지 않고 등록하는 시점에 함수가 즉시 호출되어 버리기 때문이다.
c) 괄호를 생략해야만 화살표 함수로 자동 변환되기 때문이다.
d) 괄호를 붙이면 이벤트 버블링이 강제로 중단되기 때문이다.

**9. `EventTarget.addEventListener(type, handler)` 구문의 구성 요소에 대한 설명으로 틀린 것은?**
a) `EventTarget`은 이벤트를 수신할 대상이 되는 DOM 요소를 의미한다.
b) `type`은 수신할 이벤트 유형으로, `'click'`, `'mouseover'`와 같이 문자열로 작성한다.
c) `handler`는 이벤트 발생 시 호출되는 콜백 함수로, 첫 번째 매개변수로 `event` 객체를 자동으로 받는다.
d) `handler` 함수는 반드시 `true` 또는 `false`의 불리언(Boolean) 반환 값을 가져야만 정상 동작한다.

**10. 다음 코드를 실행하고 화면의 버튼을 클릭했을 때 콘솔에 출력되는 결과로 옳은 것은?**
```html
<button id="btn">버튼</button>
<script>
  const btn = document.querySelector('#btn')
  const detectClick = function (event) {
    console.log(event.type)
  }
  btn.addEventListener('click', detectClick)
</script>
```
a) `button`
b) `#btn`
c) `click`
d) `PointerEvent`

**11. 일반 함수(`function () {}`)를 이벤트 핸들러로 사용했을 때, 함수 내부의 `this`가 가리키는 대상은?**
a) 항상 최상위 `window` 객체
b) 항상 최상위 `document` 객체
c) 이벤트 리스너가 연결된 DOM 요소 (`event.currentTarget`과 동일)
d) 실제 이벤트가 최초로 발생한 가장 안쪽의 자식 요소 (`event.target`과 동일)

**12. 다음 코드에서 버튼을 클릭했을 때 `console.log(event.currentTarget === this)`의 출력 결과는?**
```html
<button id="btn">버튼</button>
<script>
  const btn = document.querySelector('#btn')
  const detectClick = function (event) {
    console.log(event.currentTarget === this)
  }
  btn.addEventListener('click', detectClick)
</script>
```
a) `true`
b) `false`
c) `null`
d) `undefined`

**13. 다음 중 웹에서의 이벤트 예시로 볼 수 없는 것은?**
a) 사용자가 마우스 휠을 움직여 화면을 스크롤하는 것
b) 버튼을 클릭했을 때 팝업 창이 출력되는 것
c) 마우스 커서의 위치에 따라 요소를 드래그 앤 드롭하는 것
d) 웹 브라우저가 종료된 상태에서 모니터의 전원 버튼을 끄는 것

---

## [14~26] 2. 이벤트 버블링과 캡처링 (`Bubbling`, `Capturing`, `target`, `currentTarget`)

**14. 이벤트 버블링(Event Bubbling)에 대한 설명으로 가장 정확한 것은?**
a) 이벤트가 최상위 `window` 객체에서 시작하여 가장 안쪽의 타겟 요소까지 내려가는 현상이다.
b) 한 요소에 이벤트가 발생하면, 해당 요소의 핸들러가 동작한 후 이어서 부모 요소의 핸들러가 최상단 조상 요소를 만날 때까지 순차적으로 동작하는 현상이다.
c) 동일한 요소에 여러 개의 이벤트 핸들러를 등록했을 때 첫 번째 핸들러만 실행되고 나머지는 무시되는 현상이다.
d) 하위 요소에서 발생한 이벤트가 상위 요소의 기본 동작(`preventDefault`)을 자동으로 취소시키는 현상이다.

**15. 다음과 같이 중첩된 HTML 구조에서 `form`, `div`, `p` 요소에 각각 클릭 이벤트 핸들러가 등록되어 있다. 사용자가 `<p>` 요소를 클릭했을 때 콘솔에 출력되는 순서로 옳은 것은?**
```html
<form id="form">form
  <div id="div">div
    <p id="p">p</p>
  </div>
</form>
<script>
  document.querySelector('#form').addEventListener('click', () => console.log('form'))
  document.querySelector('#div').addEventListener('click', () => console.log('div'))
  document.querySelector('#p').addEventListener('click', () => console.log('p'))
</script>
```
a) `form` → `div` → `p`
b) `p` → `div` → `form`
c) `p`만 출력되고 종료됨
d) `form` → `p` → `div`

**16. 이벤트 버블링이 일어날 때, 이벤트가 전파되는 최종 종착지(가장 최상단의 조상 객체)에 해당하는 것은?**
a) `<body>`를 거쳐 `<html>`에서 멈춘다.
b) `<form>` 요소에서 멈춘다.
c) `document` 객체를 거쳐 `window` 객체까지 전파된다.
d) 부모 요소 딱 한 단계까지만 전파되고 멈춘다.

**17. 이벤트 객체의 속성인 `event.target`과 `event.currentTarget`에 대한 설명으로 옳은 것은?**
a) `event.target`은 이벤트 핸들러가 연결된 요소를 참조하며, 버블링이 진행됨에 따라 계속 변한다.
b) `event.currentTarget`은 실제 이벤트가 시작된 가장 안쪽의 요소를 참조하며, 버블링이 진행되어도 변하지 않는다.
c) `event.target`은 실제 이벤트가 시작된 가장 안쪽의 요소를 참조하며, 버블링이 진행되어도 변하지 않는다.
d) 일반 함수 핸들러 내부에서 `this`는 항상 `event.target`과 동일한 요소를 가리킨다.

**18. 다음 코드에서 최상위 요소인 `#outerouter`에만 클릭 이벤트 핸들러가 등록되어 있다. 사용자가 가장 안쪽의 `#inner` 요소를 클릭했을 때 콘솔에 출력되는 `currentTarget`과 `target`의 `id` 값으로 옳은 것은?**
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
    console.log('currentTarget:', event.currentTarget.id)
    console.log('target:', event.target.id)
  }
  outerOuterElement.addEventListener('click', clickHandler)
</script>
```
a) `currentTarget: inner`, `target: inner`
b) `currentTarget: outerouter`, `target: outerouter`
c) `currentTarget: outerouter`, `target: inner`
d) `currentTarget: inner`, `target: outerouter`

**19. 위 18번 문제의 코드에서 사용자가 중간 요소인 `#outer`를 클릭했을 때 콘솔에 출력되는 결과는?**
a) `currentTarget: outerouter`, `target: outer`
b) `currentTarget: outer`, `target: outer`
c) `currentTarget: outer`, `target: outerouter`
d) `#outer`에는 핸들러가 등록되어 있지 않으므로 아무것도 출력되지 않는다.

**20. 위 18번 문제의 코드에서 `event.currentTarget`과 `event.target`의 출력 결과가 모두 `outerouter`로 같아지는 경우는 언제인가?**
a) `#inner` 영역을 클릭했을 때
b) `#outer` 영역을 클릭했을 때
c) `#inner`나 `#outer`가 아닌 `#outerouter` 영역 자체를 직접 클릭했을 때
d) 어떤 요소를 클릭하든 두 속성은 절대 같아질 수 없다.

**21. `#outerouter`에만 이벤트 핸들러를 연결했음에도 불구하고, 하위 요소인 `#inner`를 클릭했을 때 `#outerouter`의 핸들러가 실행되는 이유는 무엇인가?**
a) `querySelector('#outerouter')`가 하위 요소까지 모두 배열로 선택하기 때문이다.
b) 하위 요소에서 발생한 클릭 이벤트가 상위 요소인 `#outerouter`까지 버블링(전파)되기 때문이다.
c) CSS 배경색 속성이 상속되면서 이벤트 핸들러도 자식에게 자동 복사되기 때문이다.
d) 브라우저가 모든 `<div>` 태그를 동일한 요소로 인식하기 때문이다.

**22. 표준 DOM 이벤트에서 이벤트 전파의 3단계를 순서대로 바르게 나열한 것은?**
a) 버블링 단계(Bubbling Phase) → 타겟 단계(Target Phase) → 캡처링 단계(Capturing Phase)
b) 타겟 단계(Target Phase) → 캡처링 단계(Capturing Phase) → 버블링 단계(Bubbling Phase)
c) 캡처링 단계(Capturing Phase) → 타겟 단계(Target Phase) → 버블링 단계(Bubbling Phase)
d) 캡처링 단계(Capturing Phase) → 버블링 단계(Bubbling Phase) → 타겟 단계(Target Phase)

**23. 테이블(`<table>`) 내부의 `<td>` 요소를 클릭했을 때 일어나는 '캡처링(Capturing)' 단계의 전파 경로로 올바른 것은?**
a) `<td>` → `<tr>` → `<tbody>` → `<table>` → `<body>` → `<html>` → `Document` → `Window`
b) `Window` → `Document` → `<html>` → `<body>` → `<table>` → `<tbody>` → `<tr>` → `<td>`
c) `<table>` → `<td>` → `<tr>` → `<tbody>`
d) `<td>` 요소에서만 머무르며 다른 요소로 이동하지 않는다.

**24. 이벤트 캡처링(Capturing)과 버블링(Bubbling)에 대한 설명으로 틀린 것은?**
a) 캡처링은 이벤트가 최상위 조상에서 타겟 요소까지 하위로 전파되는 단계이다.
b) 버블링은 실제 이벤트가 발생한 타겟 요소에서 실행된 후 다시 상위 조상으로 전파되는 단계이다.
c) 실무에서는 버블링보다 캡처링 단계를 직접 다루는 경우가 훨씬 빈번하므로 캡처링만 학습하면 된다.
d) 캡처링과 버블링의 전파 방향은 서로 반대이다.

**25. 다음과 같이 `<div>` 내부에 수많은 `<button>` 요소가 있을 때, 각 버튼마다 개별적으로 핸들러를 등록하지 않고 공통 조상인 `<div>`에 핸들러를 단 하나만 등록하여 처리하는 기법과 관련된 설명으로 가장 적절한 것은?**
```html
<div>
  <button>버튼 1</button>
  <button>버튼 2</button>
  <!-- ... 수많은 버튼들 ... -->
  <button>버튼 100</button>
</div>
```
a) 이벤트 버블링 덕분에 자식 버튼에서 발생한 클릭 이벤트가 부모 `<div>`로 전파되므로 부모에서 한 번에 감지할 수 있다.
b) 부모 `<div>`의 핸들러 내부에서 `event.currentTarget`을 확인하면 몇 번째 버튼이 클릭되었는지 정확히 구분할 수 있다.
c) 이 방식을 사용하면 모든 버튼에 `event.preventDefault()`가 자동으로 적용된다.
d) 자식 요소가 3개 이상일 때는 이벤트 버블링이 발생하지 않으므로 사용할 수 없는 패턴이다.

**26. 위 25번과 같이 공통 조상인 `<div>`에 클릭 이벤트 핸들러를 등록했을 때, 실제로 사용자가 클릭한 `<button>` 요소가 무엇인지 알아내기 위해 참조해야 하는 속성은?**
a) `event.currentTarget`
b) `event.target`
c) `event.type`
d) `this`

---

## [27~40] 3. 이벤트 핸들러 활용 실습 (`click`, `input`, `classList`, `todo`, `lodash`)

**27. 다음은 버튼을 클릭할 때마다 숫자를 1씩 증가시켜 화면에 출력하는 실습 코드이다. 빈칸 `( ㄱ )`에 들어갈 코드로 알맞은 것은?**
```html
<button id="btn">버튼</button>
<p>클릭횟수 : <span id="counter">0</span></p>
<script>
  let initialValue = 0
  const btn = document.querySelector('#btn')
  const clickHandler = function () {
    initialValue += 1
    const spanTag = document.querySelector('#counter')
    // ( ㄱ )
  }
  btn.addEventListener('click', clickHandler)
</script>
```
a) `spanTag.value = initialValue`
b) `spanTag.textContent = initialValue`
c) `spanTag.appendChild(initialValue)`
d) `spanTag.classList.add(initialValue)`

**28. 위 27번 코드에서 `let initialValue = 0`을 `clickHandler` 함수 외부(전역)가 아니라 `clickHandler` 함수 내부의 첫 줄에 선언한다면 어떤 현상이 발생하는가?**
a) 버튼을 아무리 많이 클릭해도 화면의 클릭 횟수는 `1`에서 더 이상 증가하지 않는다.
b) 버튼을 클릭할 때마다 숫자가 2씩 증가한다.
c) 문법 에러가 발생하여 코드가 실행되지 않는다.
d) 기존과 동일하게 클릭할 때마다 1, 2, 3... 순서로 정상 증가한다.

**29. `<input type="text">` 요소에 사용자가 텍스트를 입력할 때마다 실시간으로 값을 감지하여 `<p>` 요소에 출력하려고 한다. 이때 `addEventListener`의 첫 번째 인자로 지정해야 할 가장 적절한 이벤트 타입과, 입력된 값을 가져오는 속성으로 바르게 짝지은 것은?**
a) 이벤트 타입: `'click'`, 값 속성: `event.currentTarget.textContent`
b) 이벤트 타입: `'input'`, 값 속성: `event.currentTarget.value`
c) 이벤트 타입: `'submit'`, 값 속성: `event.currentTarget.innerHTML`
d) 이벤트 타입: `'copy'`, 값 속성: `event.currentTarget.id`

**30. 이벤트 핸들러 내부에서 `console.log(event)`로 이벤트 객체 전체를 출력한 뒤 개발자 도구 콘솔에서 해당 객체를 펼쳐 확인했을 때, `currentTarget` 속성의 값이 `null`로 표시되는 이유로 옳은 것은?**
a) `addEventListener`를 사용할 때는 원래 `currentTarget` 속성이 생성되지 않기 때문이다.
b) `currentTarget`은 이벤트가 처리되는(핸들러가 실행되는) 동안에만 값이 존재하고 이벤트 처리가 끝나면 초기화되기 때문이다.
c) `input` 이벤트에는 `currentTarget` 속성이 존재하지 않고 `click` 이벤트에만 존재하기 때문이다.
d) 브라우저의 치명적인 버그로 인해 `target`과 `currentTarget`이 모두 영구적으로 삭제되었기 때문이다.

**31. 위 30번과 같은 특징 때문에, 개발자 도구에서 `event` 객체를 펼쳐서 이벤트 발생 요소 이후의 하위 속성 값들을 확인하고 싶을 때 강의 자료에서 권장하는 방법은?**
a) `currentTarget` 대신 버블링이 끝나도 값이 유지되는 `target` 속성을 참고하거나, 핸들러 실행 중에 `console.log(event.currentTarget)`을 직접 출력하여 확인한다.
b) `window.alert(event)`를 사용하여 객체 내부를 확인한다.
c) `event.preventDefault()`를 호출하여 `currentTarget`이 `null`이 되는 것을 막는다.
d) 화살표 함수를 사용하여 `this`를 출력한다.

**32. 다음은 버튼을 클릭할 때마다 `<h1>` 요소에 `.blue` 클래스를 추가하거나 제거하여 글자 색상을 토글(켜고 끄기)하는 코드이다. 주석 처리된 세 가지 방법 중 **클릭할 때마다 파란색과 기본색이 번갈아 바뀌는(토글되는) 동작**을 수행하는 방법을 모두 고른 것은?**
```js
const clickHandler = function () {
  // 방법 1
  // h1Tag.classList.add('blue')

  // 방법 2
  // h1Tag.classList.toggle('blue')

  // 방법 3
  // if (h1Tag.classList.contains('blue')) {
  //   h1Tag.classList.remove('blue')
  // } else {
  //   h1Tag.classList.add('blue')
  // }
}
```
a) 방법 1만 해당
b) 방법 2만 해당
c) 방법 1, 방법 2
d) 방법 2, 방법 3

**33. 다음 Todo 프로그램 실습 코드에서 사용자가 할 일을 입력하고 `+` 버튼을 눌렀을 때 실행되는 과정에 대한 설명으로 틀린 것은?**
```js
const inputTag = document.querySelector('.input-text')
const btn = document.querySelector('#btn')
const ulTag = document.querySelector('ul')

const addTodo = function (event) {
  const inputData = inputTag.value
  const liTag = document.createElement('li')
  liTag.textContent = inputData
  ulTag.appendChild(liTag)
  inputTag.value = ''
}
btn.addEventListener('click', addTodo)
```
a) `document.createElement('li')`는 메모리에 새로운 `<li>` 요소를 생성한다.
b) `liTag.textContent = inputData`는 생성된 `<li>` 요소의 텍스트 내용으로 사용자의 입력값을 넣는다.
c) `ulTag.appendChild(liTag)`는 생성된 `<li>` 요소를 `<ul>` 요소의 자식 요소로 추가하여 화면에 나타나게 한다.
d) `inputTag.value = ''`는 이미 추가된 `<ul>` 내부의 모든 `<li>` 목록을 화면에서 삭제하여 초기화하는 코드이다.

**34. Todo 프로그램에서 사용자가 아무것도 입력하지 않거나 공백(스페이스바)만 입력한 상태에서 `+` 버튼을 눌렀을 때 빈 항목이 추가되는 것을 방지하고 경고창을 띄우려고 한다. 다음 코드의 빈칸 `( ㄱ )`에 들어갈 가장 적절한 조건문은?**
```js
const addTodo = function (event) {
  const inputData = inputTag.value
  if ( ( ㄱ ) ) {
    const liTag = document.createElement('li')
    liTag.textContent = inputData
    ulTag.appendChild(liTag)
    inputTag.value = ''
  } else {
    alert('할 일을 입력하세요..')
  }
}
```
a) `inputData.trim()`
b) `inputData.preventDefault()`
c) `inputData.appendChild()`
d) `inputData === ''`

**35. 위 34번 코드에서 만약 사용자가 입력창에 공백 문자만 3번(`"   "`) 입력하고 버튼을 클릭했을 때 일어나는 동작은?**
a) `"   "`라는 공백이 담긴 `<li>` 요소가 리스트에 추가된다.
b) `inputData.trim()`의 결과가 빈 문자열(`""`)이 되어 조건문이 거짓(falsy)으로 평가되므로, `alert('할 일을 입력하세요..')` 경고창이 뜬다.
c) 에러가 발생하여 브라우저가 멈춘다.
d) 입력창의 공백이 숫자 `0`으로 변환되어 리스트에 추가된다.

**36. 로또 번호 생성기 실습에서 사용한 외부 라이브러리인 `lodash`에 대한 설명으로 옳은 것은?**
a) 오직 파이썬(Python)에서만 사용할 수 있는 데이터 분석 라이브러리이다.
b) 모듈성, 성능 및 추가 기능을 제공하는 JavaScript 유틸리티 라이브러리로, 배열이나 객체 등 자료구조를 다룰 때 유용한 함수들을 제공한다.
c) 브라우저에 기본 내장되어 있어 별도의 `<script>` 태그나 설치 없이 `_` 객체를 항상 사용할 수 있다.
d) DOM 요소의 이벤트 버블링을 강제로 발생시키기 위해서만 존재하는 전용 라이브러리이다.

**37. 로또 번호 생성기 실습에서 `lodash`를 활용해 1부터 45까지의 숫자 배열을 생성하고, 그중 중복 없이 6개의 랜덤 번호를 추출하는 코드로 올바른 것은?**
a) `const numbers = _.range(1, 45); const sixNumbers = _.sampleSize(numbers, 6);`
b) `const numbers = _.range(1, 46); const sixNumbers = _.sampleSize(numbers, 6);`
c) `const numbers = _.range(0, 45); const sixNumbers = _.random(numbers, 6);`
d) `const numbers = _.range(1, 46); const sixNumbers = _.slice(numbers, 6);`

**38. `lodash`의 `_.sampleSize([1, 2, 3], 4)`를 실행했을 때의 반환 결과에 대한 설명으로 옳은 것은? (단, 강의 자료의 lodash 문서 예시 기준)**
a) 배열의 크기가 3인데 4개를 뽑으려고 했으므로 에러(`RangeError`)가 발생한다.
b) 부족한 1개의 요소를 채우기 위해 `undefined`가 포함된 `[2, 3, 1, undefined]`를 반환한다.
c) 배열이 가진 최대 요소 개수만큼만 무작위로 섞어 `[2, 3, 1]`과 같이 길이 3인 배열을 반환한다.
d) 빈 배열 `[]`을 반환한다.

**39. 다음 로또 번호 생성기 코드에서 '행운 번호 받기' 버튼을 **3번** 클릭했을 때, `<div>` 요소 내부에 생성되는 `<ul>` 요소의 총개수와 전체 `<li>` 요소의 총개수는?**
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
a) `<ul>` 1개, `<li>` 6개
b) `<ul>` 3개, `<li>` 6개
c) `<ul>` 3개, `<li>` 18개
d) `<ul>` 6개, `<li>` 18개

**40. 위 39번 코드에서 `const ulTag = document.createElement('ul')`을 `getLottery` 함수 내부가 아니라 함수 외부(1번 주석 위치)에 선언해 두었다면, 버튼을 여러 번 클릭할 때 어떤 현상이 발생하는가?**
a) 클릭할 때마다 새로운 `<ul>`이 추가되지 않고, 기존의 단일 `<ul>` 태그 안에 `<li>` 요소들이 6개씩 계속 누적되어(6개, 12개, 18개...) 추가된다.
b) 버튼을 두 번째 클릭할 때부터는 아무런 번호도 추가되지 않는다.
c) 클릭할 때마다 이전 번호가 모두 지워지고 새로운 6개의 번호만 남는다.
d) 기존 코드와 100% 동일하게 새로운 `<ul>`이 계속 생성된다.

---

## [41~50] 4. 이벤트 기본 동작 취소 및 화살표 함수 (`preventDefault`, `Arrow Function`)

**41. `event.preventDefault()` 메서드에 대한 설명으로 가장 적절한 것은?**
a) 이벤트가 부모 요소로 전파되는 버블링(Bubbling) 현상을 막는 메서드이다.
b) HTML 요소가 기본적으로 가지고 있는 이벤트 동작(예: `form` 제출 시 새로고침, `<a>` 클릭 시 페이지 이동 등)을 실행하지 않도록 취소하는 메서드이다.
c) DOM 요소에 등록된 이벤트 리스너를 영구적으로 제거하는 메서드이다.
d) 화살표 함수 내부의 `this`를 강제로 `event.currentTarget`으로 바인딩해 주는 메서드이다.

**42. 강의 자료에서 `event.preventDefault()`를 설명하기 위해 사용한 일상생활의 비유로 알맞은 것은?**
a) 카페 키오스크에서 아메리카노를 주문하면 바리스타가 커피를 만드는 것
b) 영화 포스터에 마우스를 올리면 미리보기 영상이 재생되는 것
c) 택배 기사님의 기본 동작인 '문 앞에 두기'를 취소하고, 내가 요청한 대로 '경비실에 맡겨 주세요'라고 처리 방식을 바꾸는 것
d) 물속 깊은 곳에서 생긴 거품이 수면 위로 뽀글뽀글 올라오는 것

**43. 웹 페이지의 `<h1>중요한 내용</h1>` 텍스트를 사용자가 드래그하여 복사(`Ctrl + C` 등)하지 못하도록 막고 경고창을 띄우려고 한다. 다음 코드의 빈칸 `( ㄱ )`과 `( ㄴ )`에 들어갈 내용으로 옳은 것은?**
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
a) (ㄱ) `click`, (ㄴ) `preventDefault`
b) (ㄱ) `copy`, (ㄴ) `preventDefault`
c) (ㄱ) `copy`, (ㄴ) `stopCopy`
d) (ㄱ) `input`, (ㄴ) `cancelEvent`

**44. 다음 HTML `<form>`에서 사용자가 Submit 버튼을 클릭했을 때 페이지가 새로고침되는 기본 동작을 막기 위한 스크립트 코드로 가장 올바른 것은?**
```html
<form id="my-form">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
```
a)
```js
const formTag = document.querySelector('#my-form')
formTag.addEventListener('submit', function (event) {
  event.preventDefault()
})
```
b)
```js
const inputTag = document.querySelector('input')
inputTag.addEventListener('input', function (event) {
  event.preventDefault()
})
```
c)
```js
const formTag = document.querySelector('#my-form')
formTag.preventDefault('submit')
```
d)
```js
const btnTag = document.querySelector('button')
btnTag.addEventListener('submit', function () {
  this.value = ''
})
```

**45. `<form>` 요소를 제출(submit)할 때 `event.preventDefault()`를 호출하지 않으면 기본적으로 어떤 동작이 발생하는가?**
a) 브라우저 창이 강제로 닫힌다.
b) `form`의 `action` 속성 값으로 요청을 보내며 페이지가 새로고침(Refresh)된다.
c) `input`에 입력된 텍스트가 자동으로 클립보드에 복사된다.
d) 아무 일도 일어나지 않는다.

**46. `addEventListener`의 이벤트 핸들러로 화살표 함수(`() => {}`)를 사용했을 때의 특징으로 옳은 것은?**
a) 화살표 함수는 일반 함수보다 더 강력한 자신만의 `this`를 생성하여 무조건 `event.target`을 가리킨다.
b) 화살표 함수는 자신만의 `this`를 가지지 않고 상위 스코프의 `this`를 물려받기 때문에, 핸들러 내부의 `this`는 대부분 전역 객체(`window`)를 가리키게 된다.
c) `addEventListener`에는 문법적으로 화살표 함수를 전달할 수 없으며, 전달 시 에러가 발생한다.
d) 화살표 함수를 핸들러로 사용하면 첫 번째 매개변수로 `event` 객체를 받을 수 없다.

**47. 다음 코드에서 두 버튼을 각각 클릭했을 때 콘솔에 출력되는 `( ㄱ )`과 `( ㄴ )`의 결과를 바르게 짝지은 것은?**
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
a) (ㄱ) `<button id="function">function</button>` / (ㄴ) `<button id="arrow">arrow</button>`
b) (ㄱ) `window` / (ㄴ) `<button id="arrow">arrow</button>`
c) (ㄱ) `<button id="function">function</button>` / (ㄴ) `window`
d) (ㄱ) `window` / (ㄴ) `window`

**48. 이벤트 핸들러를 화살표 함수로 작성하면서도, 이벤트 리스너가 연결된 DOM 요소(일반 함수에서의 `this`와 동일한 대상)에 안전하게 접근하기 위한 해결책으로 옳은 것은?**
a) 매개변수로 전달받은 `event` 객체를 활용해 `event.currentTarget`을 사용한다.
b) 함수 내부에서 `window.this`를 호출한다.
c) `event.preventDefault()`를 첫 줄에 작성하면 `this`가 버튼으로 바뀐다.
d) 화살표 함수에서는 리스너가 연결된 요소에 접근할 수 있는 방법이 전혀 없다.

**49. 다음 중 이벤트와 관련된 주요 개념 및 메서드의 연결이 바르지 않은 것은?**
a) `addEventListener` : DOM 요소에 이벤트 핸들러를 등록하는 메서드
b) `event.target` : 실제 이벤트가 최초로 시작된 요소를 참조하는 속성
c) `event.currentTarget` : 이벤트 핸들러가 연결된 요소를 참조하는 속성
d) `event.preventDefault()` : 하위 요소에서 상위 요소로의 이벤트 버블링을 중단시키는 메서드

**50. 다음 중 JavaScript 이벤트 제어에 대한 종합적인 설명으로 가장 올바른 것은?**
a) 이벤트 버블링은 항상 웹 애플리케이션의 성능을 저하시키므로, 모든 하위 요소마다 개별적으로 이벤트 리스너를 등록하는 것이 가장 효율적이다.
b) `event.target`과 `event.currentTarget`은 이벤트가 버블링되는 과정에서도 언제나 동일한 요소를 가리킨다.
c) DOM 조작(`createElement`, `appendChild` 등)과 이벤트 핸들러를 결합하면 사용자의 입력이나 클릭에 반응하는 동적인 웹 페이지를 구현할 수 있다.
d) 이벤트 핸들러 함수는 개발자가 코드에서 직접 호출할 때만 실행되며, 브라우저가 자동으로 호출할 수는 없다.

---
---

## 정답 및 해설

<details>
<summary><b>정답 및 해설 보기 (클릭하여 펼치기)</b></summary>

### [1~13] 1. 이벤트 기본 개념 및 등록

1. **정답: b**
   - **해설:** 이벤트(event)는 웹 페이지 상에서 클릭, 입력, 스크롤 등 '무언가 일어났다는 신호 또는 사건'을 의미합니다. a)는 DOM 요소, c)는 이벤트 핸들러, d)는 lodash 라이브러리에 대한 설명입니다.
2. **정답: c**
   - **해설:** 손님이 하는 '주문'(클릭, 입력 등)은 **이벤트**, 주문을 감지하고 받는 키오스크는 **이벤트 리스너**, 주문에 맞춰 커피를 만드는 바리스타의 행동은 **이벤트 핸들러**에 해당합니다.
3. **정답: c**
   - **해설:** 포스터에 마우스를 올리는 것은 '이벤트', 마우스의 움직임을 감지하는 것은 '리스너', 미리보기 영상이나 설명을 보여주는 실제 동작/반응은 '이벤트 핸들러'입니다.
4. **정답: d**
   - **해설:** `<input>` 요소의 값이 변경될 때는 `input` 이벤트(또는 `change` 이벤트 등)가 발생하며, 모든 DOM 요소는 다양한 형태의 이벤트를 발생시킬 수 있습니다.
5. **정답: b**
   - **해설:** DOM에서 이벤트가 발생하면 브라우저는 해당 이벤트에 관한 상세 정보(발생 요소, 마우스 좌표, 눌린 키 등)를 담은 `event` 객체를 자동으로 생성하여 핸들러의 첫 번째 인자로 전달합니다.
6. **정답: c**
   - **해설:** 이벤트 핸들러는 우리가 직접 호출하는 함수가 아니라, 특정 이벤트가 발생했을 때 브라우저가 대신 호출해 주는 콜백(callback) 함수입니다.
7. **정답: b**
   - **해설:** `.addEventListener(type, handler)`의 첫 번째 인자는 문자열 형태의 이벤트 타입(`'click'`), 두 번째 인자는 괄호를 제외한 함수 자체(`handleClick`)를 전달해야 합니다.
8. **정답: b**
   - **해설:** 등록할 때는 함수를 지금 당장 실행하는 것이 아니라 '이벤트가 발생했을 때 누구를 부를지' 함수의 참조를 알려주는 것이므로 괄호 없이 전달해야 합니다. 괄호를 붙이면 등록 시점에 함수가 즉시 실행되고 그 반환값(`undefined`)이 등록됩니다.
9. **정답: d**
   - **해설:** `addEventListener`에 등록되는 `handler` 콜백 함수는 특별한 반환 값(return value)이 필요하지 않습니다.
10. **정답: c**
    - **해설:** `event` 객체는 `PointerEvent`가 출력되고, `event.type`은 발생한 이벤트의 유형인 문자열 `'click'`이 출력됩니다.
11. **정답: c**
    - **해설:** 일반 함수를 이벤트 핸들러로 사용할 경우, 함수 내부의 `this`는 이벤트 리스너가 연결된 DOM 요소를 가리키며 이는 `event.currentTarget` 속성 값과 동일합니다.
12. **정답: a**
    - **해설:** 일반 함수 핸들러에서 `this`와 `event.currentTarget`은 모두 이벤트 리스너가 부착된 `<button id="btn">버튼</button>`을 가리키므로 일치 비교(`===`) 결과는 `true`입니다.
13. **정답: d**
    - **해설:** 화면 스크롤, 버튼 클릭, 드래그 앤 드롭, 키보드 입력 등은 모두 웹에서의 이벤트에 해당하지만, 모니터의 물리적 전원을 끄는 것은 웹 페이지 내부의 DOM 이벤트가 아닙니다.

---

### [14~26] 2. 이벤트 버블링과 캡처링

14. **정답: b**
    - **해설:** 버블링(Bubbling)은 한 요소에 이벤트가 발생하면 해당 요소의 핸들러가 동작한 후 부모 요소, 그리고 최상단 조상(`document`, `window`)을 만날 때까지 위로 거슬러 올라가며 핸들러가 동작하는 현상입니다. a)는 캡처링에 대한 설명입니다.
15. **정답: b**
    - **해설:** 가장 안쪽 요소인 `<p>`를 클릭하면 버블링에 의해 `p` → 부모인 `div` → 조상인 `form` 순서로 이벤트가 전파되어 세 핸들러가 순차적으로 동작합니다.
16. **정답: c**
    - **해설:** 이벤트 버블링은 부모 요소를 타고 올라가며 `document` 객체와 최상단 `window` 객체를 만날 때까지 과정이 반복됩니다.
17. **정답: c**
    - **해설:** `event.target`은 실제 이벤트가 시작된 가장 안쪽의 요소를 참조하며 버블링이 진행되어도 변하지 않습니다. 반면 `event.currentTarget`은 현재 실행 중인 핸들러가 연결된 요소를 참조하며 일반 함수의 `this`와 같습니다.
18. **정답: c**
    - **해설:** 핸들러는 `#outerouter`에 연결되어 있으므로 `currentTarget`은 `outerouter`이고, 실제 클릭이 발생한 가장 안쪽 요소는 `#inner`이므로 `target`은 `inner`가 출력됩니다.
19. **정답: a**
    - **해설:** `#outer`를 클릭하면 이벤트가 버블링되어 `#outerouter`의 핸들러가 동작합니다. 이때 핸들러가 연결된 `currentTarget`은 `outerouter`이고, 실제 클릭한 `target`은 `outer`가 됩니다.
20. **정답: c**
    - **해설:** 핸들러가 연결된 `#outerouter` 영역(하위 요소인 `#outer`나 `#inner`를 제외한 연두색 영역)을 직접 클릭하면, 이벤트 발생 요소(`target`)와 핸들러 연결 요소(`currentTarget`)가 모두 `outerouter`로 동일해집니다.
21. **정답: b**
    - **해설:** 클릭 이벤트가 어디서 발생했든 상관없이 하위 요소(`#inner`, `#outer`)에서 발생한 이벤트가 상위 요소인 `#outerouter`까지 버블링(전파)되어 핸들러를 실행시키기 때문입니다.
22. **정답: c**
    - **해설:** 표준 DOM 이벤트 흐름은 1) 최상위에서 타겟으로 내려가는 캡처링 단계(Capture Phase) → 2) 실제 타겟에 도달하는 타겟 단계(Target Phase) → 3) 다시 상위로 올라가는 버블링 단계(Bubbling Phase) 순서로 진행됩니다.
23. **정답: b**
    - **해설:** 캡처링 단계는 최상위 조상인 `Window`에서 시작하여 `Document` → `<html>` → `<body>` → `<table>` → `<tbody>` → `<tr>` → `<td>` 순으로 하향 전파됩니다. a)는 버블링 단계의 순서입니다.
24. **정답: c**
    - **해설:** 강의 자료의 TIP에 명시된 것처럼, 캡처링은 실제 개발자가 다루는 경우가 거의 없으므로 버블링을 집중해서 학습하는 것이 좋습니다.
25. **정답: a**
    - **해설:** 여러 자식 요소의 공통 조상(`<div>`)에 이벤트 핸들러를 단 하나만 등록(이벤트 위임 패턴)하면, 자식 버튼들의 클릭 이벤트가 버블링되어 부모 `<div>`에서 효율적으로 감지하고 다룰 수 있습니다.
26. **정답: b**
    - **해설:** 공통 조상(`div`)에 할당한 핸들러에서 `event.currentTarget`은 항상 `div`를 가리키므로, 실제 어떤 `<button>`에서 이벤트가 발생했는지 알기 위해서는 `event.target`을 이용해야 합니다.

---

### [27~40] 3. 이벤트 핸들러 활용 실습

27. **정답: b**
    - **해설:** `<span>`과 같은 일반 HTML 요소의 텍스트 콘텐츠를 변경할 때는 `spanTag.textContent = initialValue`를 사용합니다. (`value`는 `<input>` 등의 폼 요소에서 사용합니다.)
28. **정답: a**
    - **해설:** `let initialValue = 0`을 핸들러 함수 내부에 선언하면 버튼을 클릭할 때마다 변수가 매번 `0`으로 새로 초기화되므로, `0 + 1`이 되어 화면에는 계속 `1`만 출력됩니다.
29. **정답: b**
    - **해설:** `<input>` 요소의 입력값을 실시간으로 감지할 때는 `'input'` 이벤트를 사용하며, 현재 입력창에 누적된 데이터는 `event.currentTarget.value`(또는 `event.target.value`, `inputTag.value`)로 접근합니다.
30. **정답: b**
    - **해설:** `currentTarget` 속성은 이벤트가 처리되는(핸들러가 실행되는) 순간에만 값이 유효하며, 이벤트 전파 및 처리가 종료된 후 콘솔에서 객체를 펼쳐볼 때는 이미 `null`로 초기화된 상태이기 때문입니다.
31. **정답: a**
    - **해설:** 핸들러 내부에서 `console.log(event.currentTarget)`으로 직접 출력하거나, 이벤트가 끝난 후에도 참조가 유지되는 `event.target` 속성을 펼쳐서 하위 속성 값들을 확인하는 것이 좋습니다.
32. **정답: d**
    - **해설:** 방법 1(`classList.add`)은 첫 클릭 시 파란색이 된 후 다시 클릭해도 제거되지 않습니다. 반면 방법 2(`classList.toggle`)와 방법 3(`contains` 확인 후 `remove`/`add` 분기)은 클릭할 때마다 클래스 유무를 반전시켜 색상을 토글합니다.
33. **정답: d**
    - **해설:** `inputTag.value = ''`는 할 일을 `<ul>` 리스트에 추가한 뒤, 다음 입력을 편하게 할 수 있도록 `<input>` 텍스트 입력창에 남아있는 글자를 빈 문자열로 비워(초기화해) 주는 역할입니다. 이미 추가된 `<li>`들을 삭제하지 않습니다.
34. **정답: a**
    - **해설:** 문자열의 앞뒤 공백을 제거하는 `inputData.trim()`을 조건식에 넣으면, 실제 글자가 입력되었을 때는 참(truthy)이 되어 할 일을 추가하고, 빈 문자열이거나 공백만 있을 때는 `""`(falsy)가 되어 `else` 문의 `alert`를 실행합니다.
35. **정답: b**
    - **해설:** `"   ".trim()`은 앞뒤 공백이 모두 제거되어 빈 문자열 `""`을 반환합니다. 자바스크립트에서 빈 문자열 `""`은 조건문에서 `false`(falsy)로 평가되므로 `else` 블록이 실행되어 경고 대화상자가 뜹니다.
36. **정답: b**
    - **해설:** `lodash`는 모듈성, 성능 및 추가 기능을 제공하는 대표적인 JavaScript 유틸리티 라이브러리로, CDN `<script>` 태그 등으로 불러와 `_` 객체를 통해 다양한 배열/객체 제어 함수를 사용할 수 있습니다.
37. **정답: b**
    - **해설:** `_.range(start, end)`는 `start`부터 `end` 직전(`end - 1`)까지의 숫자를 생성하므로 1부터 45까지 생성하려면 `_.range(1, 46)`을 사용해야 하며, 무작위로 $n$개의 샘플을 추출할 때는 `_.sampleSize(numbers, 6)`을 사용합니다.
38. **정답: c**
    - **해설:** 강의 자료의 lodash 문서 예시에 나와 있듯, `_.sampleSize([1, 2, 3], 4)`처럼 배열의 길이보다 큰 개수를 요청하면 에러를 내지 않고 배열이 가진 전체 요소(3개)를 무작위로 섞은 배열을 반환합니다.
39. **정답: c**
    - **해설:** 버튼을 1번 클릭할 때마다 `getLottery`가 실행되어 `<ul>` 1개와 그 안의 `<li>` 6개가 생성되어 `<div>`에 추가됩니다. 따라서 3번 클릭하면 `<ul>`은 총 3개, `<li>`는 $6 \times 3 = 18$개가 생성됩니다.
40. **정답: a**
    - **해설:** `ulTag`를 함수 외부에서 한 번만 생성해 두면, 클릭할 때마다 새로 `<ul>`을 만들지 않고 동일한 `ulTag`에 6개의 `<li>`를 계속 추가(`appendChild`)하게 되어 하나의 `<ul>` 안에 번호가 6개씩 계속 누적됩니다.

---

### [41~50] 4. 이벤트 기본 동작 취소 및 화살표 함수

41. **정답: b**
    - **해설:** `.preventDefault()`는 HTML 요소가 기본적으로 가지고 있는 이벤트 동작(예: `form` 제출 시 페이지 새로고침, `<a>` 클릭 시 이동, 텍스트 복사 등)을 실행하지 않도록 취소하는 메서드입니다. (버블링 전파를 막는 것은 `stopPropagation()`입니다.)
42. **정답: c**
    - **해설:** 강의 자료에서는 택배 기사님의 기본 동작인 '문 앞에 두기'를 취소하고 '경비실에 맡겨 주세요'라고 내가 정한 로직으로 처리하는 것에 `preventDefault()`를 비유했습니다.
43. **정답: b**
    - **해설:** 사용자가 콘텐츠를 복사할 때 발생하는 이벤트 타입은 `'copy'`이며, 복사가 실제로 이루어지는 기본 동작을 막기 위해 `event.preventDefault()`를 호출합니다.
44. **정답: a**
    - **해설:** 폼 제출 시 새로고침을 막으려면 `<form>` 요소에 `'submit'` 이벤트 리스너를 등록하고, 핸들러 내부에서 `event.preventDefault()`를 호출해야 합니다.
45. **정답: b**
    - **해설:** `<form>` 요소는 제출(submit) 이벤트가 발생하면 기본적으로 `action` 속성 값으로 데이터를 요청하며 페이지를 새로고침합니다.
46. **정답: b**
    - **해설:** 화살표 함수는 자신만의 `this`를 가지지 않고 자신이 선언된 상위 스코프의 `this`를 그대로 물려받아 사용합니다. 따라서 이벤트 핸들러로 화살표 함수를 사용하면 `this`는 대부분 전역 객체(`window`)를 가리키게 됩니다.
47. **정답: c**
    - **해설:** 일반 함수를 사용한 `functionButton`의 핸들러에서 `this`는 버튼 요소 자신(`<button id="function">function</button>`)을 가리키고, 화살표 함수를 사용한 `arrowButton`의 핸들러에서 `this`는 상위 스코프의 전역 객체인 `window`를 가리킵니다.
48. **정답: a**
    - **해설:** 화살표 함수를 이벤트 핸들러로 사용할 때 리스너가 연결된 요소에 접근하려면 `this` 대신 매개변수로 전달된 이벤트 객체의 `event.currentTarget` 속성을 사용하면 됩니다.
49. **정답: d**
    - **해설:** `event.preventDefault()`는 요소의 **기본 동작**을 취소하는 메서드이며, 이벤트 버블링(전파)을 막는 메서드가 아닙니다.
50. **정답: c**
    - **해설:** a) 이벤트 버블링을 활용하면 상위 요소 하나에만 핸들러를 등록해 효율성을 높일 수 있습니다. b) 하위 요소를 클릭해 버블링이 일어나면 `target`과 `currentTarget`은 서로 다른 요소를 가리킵니다. d) 이벤트 핸들러는 이벤트 발생 시 브라우저가 자동으로 호출해 주는 콜백 함수입니다. 따라서 올바른 설명은 c)입니다.

</details>