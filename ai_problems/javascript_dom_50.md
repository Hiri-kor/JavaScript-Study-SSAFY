# JavaScript & DOM 객관식 50문항

> 본 문제는 제공된 `1111_JavaScript_DOM.md` 강의록 내용을 기반으로 출제되었습니다.

---

## Part 1. History of JavaScript & ECMAScript (1~10번)

**1. 1990년 WWW(World Wide Web)와 하이퍼텍스트 시스템을 고안하고, URL과 HTTP를 최초로 설계 및 구현한 인물은 누구인가요?**
① 빌 게이츠 (Bill Gates)
② 브렌던 아이크 (Brendan Eich)
③ 팀 버너스리 (Tim Berners-Lee)
④ 리누스 토르발스 (Linus Torvalds)

**2. 초기 웹 환경의 핵심 기술에 대한 설명으로 올바르지 않은 것은 무엇인가요?**
① URL은 특정 웹페이지나 파일을 찾기 위한 고유한 경로 주소이다.
② HTTP는 웹 브라우저와 서버가 데이터를 주고받기 위한 통신 규약이다.
③ WWW는 전 세계적인 정보 공유 시스템을 의미한다.
④ 초기의 웹은 탄생 시점부터 화려한 동적 애니메이션을 기본 지원했다.

**3. 1995년 Netscape 소속 개발자 브렌던 아이크(Brendan Eich)가 개발한 JavaScript의 이름 변천사 순서로 올바른 것은?**
① LiveScript ➔ Mocha ➔ JavaScript
② Mocha ➔ LiveScript ➔ JavaScript
③ JScript ➔ Mocha ➔ JavaScript
④ Mocha ➔ JScript ➔ ECMAScript

**4. 1996년 Microsoft가 자사 웹 브라우저인 인터넷 익스플로러(IE) 3.0에 도입하여 'JavaScript 파편화'를 촉발시킨 유사 언어의 이름은 무엇인가요?**
① TypeScript
② ActionScript
③ JScript
④ CoffeeScript

**5. 1차 브라우저 전쟁(1995~2001)에 대한 설명으로 옳은 것은?**
① Netscape Navigator가 윈도우 운영체제에 기본 내장되어 승리했다.
② Microsoft의 IE가 2002년 약 96%의 시장 점유율을 차지하며 승리했다.
③ 1차 브라우저 전쟁의 결과로 Google이 모질라 재단을 설립했다.
④ 모든 기업이 처음부터 웹 표준을 철저히 준수하여 개발자들의 혼란이 없었다.

**6. 웹 표준(Web Standards)이 중요한 이유로 적절하지 않은 것은?**
① 브라우저나 기기에 상관없이 웹 사이트가 동일하게 작동하여 일관된 사용자 경험을 제공한다.
② 브라우저별 코드를 따로 작성할 필요가 없어 개발 시간과 비용이 절감된다.
③ 웹 사이트의 유지보수가 쉬워진다.
④ 특정 회사의 독점 브라우저에서만 웹 페이지가 작동하도록 강제할 수 있다.

**7. 2008년 출시된 Google의 Chrome 브라우저가 2차 브라우저 전쟁에서 시장 우위를 점하게 된 가장 결정적인 이유와 탑재된 고성능 엔진의 조합으로 옳은 것은?**
① 독자적인 비표준 규격 채택 - SpiderMonkey 엔진
② 윈도우 운영체제 끼워팔기 - Chakra 엔진
③ 적극적인 웹 표준 준수 - V8 자바스크립트 엔진
④ 모바일 전용 브라우저 출시 - WebKit 엔진

**8. ECMAScript와 JavaScript의 관계에 대한 설명으로 가장 올바른 것은?**
① JavaScript는 표준 명세이고, ECMAScript는 이를 구현한 구체적인 프로그래밍 언어이다.
② ECMAScript는 Ecma International이 정의한 표준화된 스크립트 프로그래밍 언어 명세이며, JavaScript는 이를 구현한 구체적인 언어이다.
③ ECMAScript와 JavaScript는 전혀 관계없는 별개의 언어이다.
④ ECMAScript는 오직 Node.js 환경에서만 동작하는 서버 전용 언어이다.

**9. ECMAScript의 버전별 역사 중 2015년에 출시되어 객체지향 프로그래밍 언어로써 많은 발전을 이루고, 역사상 가장 중요한 버전으로 평가받는 것은?**
① ES1 (1997)
② ES3 (1999)
③ ES5 (2009)
④ ES6 / ES2015 (2015)

**10. 2009년에 출시되어 과거 웹 브라우저 내부에서만 실행되던 JavaScript를 브라우저 외부(서버 사이드 개발 등)에서도 실행 가능하게 만든 환경은 무엇인가요?**
① React
② Node.js
③ Firefox
④ Django

---

## Part 2. 변수(Variables)와 식별자 규칙 (11~20번)

**11. JavaScript에서 식별자(변수명) 작성 규칙에 대한 설명으로 틀린 것은?**
① 반드시 문자, 달러(`$`), 또는 밑줄(`_`)로 시작해야 한다.
② 대소문자를 구분한다.
③ `for`, `if`, `function` 같은 예약어를 변수명으로 사용할 수 있다.
④ `$`나 `_`로 시작하는 변수는 주로 DOM 선택이나 내부용 변수 등 특별한 용도로 쓰인다.

**12. 다음 중 JavaScript의 변수명으로 사용할 수 있는 것으로만 짝지어진 것은?**
① `_userName`, `$button`, `user1`
② `1stUser`, `user_name`, `let`
③ `function`, `my-name`, `$elem`
④ `if`, `_temp`, `phoneNumber`

**13. JavaScript의 식별자 Naming Convention(명명 규칙)과 그 주 사용처의 연결이 올바른 것은?**
① 카멜 케이스(`camelCase`) – 클래스, 생성자
② 파스칼 케이스(`PascalCase`) – 상수(constants)
③ 대문자 스네이크 케이스(`SNAKE_CASE`) – 변수, 객체, 함수
④ 카멜 케이스(`camelCase`) – 변수, 객체, 함수

**14. 변수 선언 키워드 `let`의 특징으로 올바른 것은?**
① 재할당이 불가능하다.
② 동일한 스코프 내에서 재선언이 가능하다.
③ 블록 스코프(block scope)를 갖는 지역 변수를 선언한다.
④ ES6 이전에 사용되던 키워드로 현재는 사용을 권장하지 않는다.

**15. 변수 선언 키워드 `const`를 사용할 때 문법 에러(SyntaxError) 또는 타입 에러가 발생하는 경우가 아닌 것은?**
① 선언과 동시에 초기값을 할당하는 경우 (`const number = 10`)
② 선언 후 다른 값으로 재할당하는 경우 (`const number = 10; number = 20`)
③ 동일한 스코프에서 같은 이름으로 재선언하는 경우
④ 초기값 없이 선언만 하는 경우 (`const number`)

**16. 다음 JavaScript 코드를 실행했을 때 콘솔에 출력되는 결과를 순서대로 바르게 나열한 것은?**
```js
let x = 1
if (x === 1) {
  let x = 2
  console.log(x)
}
console.log(x)
```
① `1`, `1`
② `2`, `2`
③ `2`, `1`
④ `1`, `2`

**17. 블록 스코프(block scope)에 대한 설명으로 옳은 것은?**
① 오직 `function` 키워드로 만든 함수의 중괄호 내부만을 의미한다.
② `if`, `for`, 함수 등의 중괄호(`{}`) 내부를 가리키며, 블록 바깥에서는 블록 내부의 `let`, `const` 변수에 접근할 수 없다.
③ `var` 키워드로 선언한 변수는 철저하게 블록 스코프를 따른다.
④ 블록 내부에서 선언한 `let` 변수는 블록 외부에서 언제든 자유롭게 읽고 수정할 수 있다.

**18. JavaScript에서 변수를 선언할 때 권장되는 가이드라인으로 가장 적절한 것은?**
① 모든 변수를 `var`로 선언하여 호환성을 높인다.
② 기본적으로 `let`을 사용하고, 값이 변하지 않을 때만 `const`로 바꾼다.
③ 기본적으로 `const`를 사용하여 의도치 않은 값 변경 버그를 예방하고, 재할당이 필요한 경우에만 `let`으로 전환한다.
④ 키워드 없이 변수명만 적어 전역 변수로 활용한다.

**19. 웹 브라우저에서 JavaScript를 실행하는 3가지 방법에 해당하지 않는 것은?**
① HTML 문서 내부에 `<script>` 태그를 작성하여 실행한다.
② `.js` 확장자 파일을 만들고 `<script src="파일명.js"></script>`로 불러와 실행한다.
③ 웹 브라우저 개발자 도구의 Console 탭에서 직접 코드를 입력해 실행한다.
④ HTML `<style>` 태그 내부에 JavaScript 코드를 직접 작성하여 실행한다.

**20. 자바스크립트의 세미콜론(`;`)과 ASI에 대한 설명으로 틀린 것은?**
① 자바스크립트는 문장 마지막의 세미콜론(`;`)을 선택적으로 사용할 수 있다.
② 세미콜론을 생략하면 ASI(Automatic Semicolon Insertion, 자동 세미콜론 삽입 규칙)에 의해 자동으로 삽입된다.
③ JavaScript 창시자인 브렌던 아이크는 세미콜론을 무조건 강제해야 한다고 주장했다.
④ 세미콜론의 사용 여부 자체보다 팀의 스타일 가이드를 따르는 '일관성'이 더 중요하다.

---

## Part 3. DOM 구조와 DOM 선택 (21~30번)

**21. DOM(Document Object Model)에 대한 설명으로 가장 거리가 먼 것은?**
① 웹 페이지(Document)를 구조화된 객체 트리 구조로 변환하여 제공한다.
② 프로그래밍 언어가 페이지 구조, 스타일, 내용 등을 동적으로 변경할 수 있도록 돕는다.
③ DOM 조작 결과는 브라우저를 재부팅해야만 화면에 반영된다.
④ HTML의 모든 요소, 속성, 텍스트는 하나의 객체로 다루어진다.

**22. 웹 페이지를 나타내는 DOM 트리의 최상위 객체이자, HTML 문서의 모든 콘텐츠에 접근하고 조작할 수 있는 진입점 역할을 하는 객체는?**
① `window`
② `document`
③ `element`
④ `body`

**23. 브라우저 개발자 도구 Console에서 현재 웹 페이지의 브라우저 탭 제목(`<title>`)을 `'Hello :)'`로 변경하려고 할 때 올바른 코드는?**
① `document.head = 'Hello :)'`
② `document.title = 'Hello :)'`
③ `document.body.title = 'Hello :)'`
④ `title.textContent = 'Hello :)'`

**24. 웹 페이지를 동적으로 조작하기 위한 올바른 순서는 무엇인가요?**
① 요소 삭제 ➔ 요소 탐색 ➔ 요소 생성
② 조작하고자 하는 요소를 선택(또는 탐색) ➔ 선택된 요소의 콘텐츠 또는 속성을 조작
③ 스타일 조작 ➔ DOM 트리 파싱 ➔ 요소 선택
④ `appendChild` 실행 ➔ `querySelector`로 요소 선택

**25. `document.querySelector(selector)` 메서드에 대한 설명으로 옳은 것은?**
① 제공한 선택자와 일치하는 모든 요소를 배열로 반환한다.
② 제공한 선택자를 만족하는 첫 번째 `element` 객체를 반환하며, 일치하는 요소가 없으면 `null`을 반환한다.
③ 선택자로 CSS 선택자를 사용할 수 없고 태그 이름만 넣어야 한다.
④ 일치하는 요소가 없을 경우 즉시 `ReferenceError`를 발생시키고 프로그램이 멈춘다.

**26. `document.querySelectorAll(selector)` 메서드의 반환값과 특징으로 올바른 것은?**
① 단일 `Element` 객체를 반환한다.
② 일치하는 요소들의 목록을 `DOMTokenList`로 반환한다.
③ 일치하는 여러 요소를 포함하는 `NodeList`를 반환한다.
④ 반환된 결과는 DOM이 나중에 변경되면 실시간으로 그 변경사항을 자동 반영한다.

**27. 다음과 같은 HTML 구조가 있을 때, 아래 JavaScript 코드의 실행 결과로 반환되는 `NodeList`의 길이(`length`)는 얼마인가요?**
```html
<body>
  <p class="content">content1</p>
  <p class="content">content2</p>
  <p class="content">content3</p>
  <ul>
    <li class="content">list1</li>
    <li>list2</li>
  </ul>
  <script>
    const items = document.querySelectorAll('p.content')
  </script>
</body>
```
① 1
② 2
③ 3
④ 4

**28. DOM 용어 중 `Node`와 `Element`의 관계에 대한 설명으로 가장 정확한 것은?**
① 모든 `Node`는 `Element`이지만, 모든 `Element`가 `Node`인 것은 아니다.
② `Element`는 `Node`의 하위 유형으로, 모든 `Element`는 `Node`이지만 모든 `Node`가 `Element`인 것은 아니다.
③ 텍스트를 나타내는 `Text Node` 역시 `Element Node`의 일종이다.
④ `Node`는 `className`, `innerHTML`, `id` 등 요소에 특화된 속성을 기본적으로 모두 가지고 있다.

**29. `querySelectorAll()`을 통해 반환된 `NodeList`에 대한 설명으로 틀린 것은?**
① 배열과 유사한 구조(유사 배열)를 가진다.
② Index(인덱스)를 통해 각 항목에 접근할 수 있다.
③ JavaScript의 배열 메서드인 `forEach`를 사용할 수 있다.
④ DOM에 새로운 요소가 추가되면 이전에 변수에 담아둔 `NodeList`의 길이도 실시간으로 늘어난다.

**30. 브라우저가 문자열로 된 HTML 문서를 읽어 해석하고 DOM Tree로 만드는 과정(구문 분석)을 무엇이라고 부르나요?**
① Hoisting (호이스팅)
② Parsing (파싱)
③ Rendering (렌더링)
④ Toggling (토글링)

---

## Part 4. DOM 조작 (속성, 콘텐츠, 요소, 스타일) (31~42번)

**31. 요소의 클래스 목록을 `DOMTokenList`(유사 배열) 형태로 반환하여 클래스를 쉽게 추가하거나 제거할 수 있게 해주는 프로퍼티는?**
① `element.className`
② `element.classList`
③ `element.attributes`
④ `element.style`

**32. `element.classList.toggle('active')` 메서드의 동작 방식으로 올바른 것은?**
① `'active'` 클래스가 있든 없든 무조건 추가하고 `true`를 반환한다.
② `'active'` 클래스가 존재하면 제거하고 `false`를 반환하며, 존재하지 않으면 추가하고 `true`를 반환한다.
③ `'active'` 클래스가 존재하면 유지하고 `true`를 반환하며, 없으면 에러를 발생시킨다.
④ 요소의 모든 클래스를 삭제한 뒤 `'active'` 클래스만 남긴다.

**33. 다음 코드를 순서대로 실행했을 때, 마지막 `console.log`에서 `h1Tag`가 가지고 있는 클래스 목록으로 옳은 것은?**
```html
<h1 class="heading">제목</h1>
<script>
  const h1Tag = document.querySelector('.heading')
  h1Tag.classList.add('red')
  h1Tag.classList.remove('heading')
  h1Tag.classList.toggle('red')
  h1Tag.classList.toggle('blue')
  console.log(h1Tag.classList)
</script>
```
① `['heading', 'red', 'blue']`
② `['red', 'blue']`
③ `['blue']`
④ `['heading', 'blue']`

**34. HTML 요소의 일반 속성(Attribute)을 조작하는 메서드에 대한 설명으로 틀린 것은?**
① `Element.getAttribute(name)`는 해당 요소에 지정된 속성 값을 반환(조회)한다.
② `Element.setAttribute(name, value)`는 속성 값을 설정하며, 이미 속성이 있으면 기존 값을 갱신한다.
③ `Element.removeAttribute(name)`는 요소에서 지정된 이름을 가진 속성을 제거한다.
④ `setAttribute()`에 숫자나 boolean 값을 넣으면 원래의 데이터 타입(숫자, 불리언)을 그대로 유지하여 저장한다.

**35. `<a>` 태그에서 `aTag.removeAttribute('href')`를 실행한 직후, `console.log(aTag.getAttribute('href'))`를 실행했을 때 출력되는 값은?**
① `""` (빈 문자열)
② `undefined`
③ `null`
④ `false`

**36. 다음과 같은 HTML 요소가 있을 때, `pTag.textContent`를 출력한 결과로 올바른 것은?**
```html
<p>Hello <b>World</b></p>
```
① `<p>Hello <b>World</b></p>`
② `Hello <b>World</b>`
③ `Hello World`
④ `World`

**37. 새로운 HTML 요소를 생성하고 DOM 트리에 추가 및 삭제하는 메서드에 대한 설명으로 옳은 것은?**
① `document.createElement('h1')`을 실행하는 즉시 웹 페이지 화면 최상단에 `<h1>` 태그가 나타난다.
② `parentNode.appendChild(childNode)`는 특정 부모 노드의 자식 목록 중 **첫 번째** 자식으로 노드를 삽입한다.
③ `parentNode.removeChild(childNode)`로 제거된 노드는 메모리에서 즉시 영구 삭제되어 변수에 담아두어도 재사용할 수 없다.
④ `createElement`는 메모리에만 요소를 생성하므로, 실제 화면에 보이게 하려면 `appendChild` 등으로 문서에 삽입해야 한다.

**38. 다음 DOM 요소 조작 코드를 실행한 후, `<div>` 태그 내부의 최종 HTML 구조는 어떻게 되나요?**
```html
<div>
  <p>기존 문단</p>
</div>
<script>
  const divTag = document.querySelector('div')
  const h1Tag = document.createElement('h1')
  h1Tag.textContent = '새 제목'
  
  divTag.appendChild(h1Tag)
  
  const pTag = document.querySelector('p')
  divTag.removeChild(pTag)
</script>
```
① `<div><p>기존 문단</p><h1>새 제목</h1></div>`
② `<div><h1>새 제목</h1><p>기존 문단</p></div>`
③ `<div><h1>새 제목</h1></div>`
④ `<div></div>`

**39. JavaScript의 `style` 프로퍼티를 사용해 요소의 글자 크기를 `2rem`으로 직접 변경하려고 한다. 올바른 코드 작성법은?**
① `pTag.style.font-size = '2rem'`
② `pTag.style.fontSize = '2rem'`
③ `pTag.css.fontSize = '2rem'`
④ `pTag.setAttribute('fontSize', '2rem')`

**40. `style` 프로퍼티를 통한 스타일 조작에 대한 설명으로 적절하지 않은 것은?**
① 요소의 `style` 프로퍼티를 조작하는 것은 HTML 태그에 `style="..."` 인라인 속성을 직접 추가/수정하는 것과 같다.
② `console.log(pTag.style)`을 출력하면 `CSSStyleDeclaration` 객체가 출력된다.
③ 여러 개의 스타일을 한꺼번에 변경할 때는 클래스(`classList`)를 활용하기보다 `style` 프로퍼티로 하나씩 직접 지정하는 것을 가장 권장한다.
④ `pTag.style.color = 'crimson'`과 같이 문자열로 CSS 속성값을 할당한다.

**41. 크롬 개발자 도구(F12)에서 선택한 HTML 요소의 모든 DOM 속성(`accessKey`, `classList`, `childNodes`, `children` 등)을 한눈에 확인하고자 할 때 찾아가야 하는 경로는?**
① Console ➔ Storage
② Network ➔ Headers
③ Elements ➔ Properties
④ Sources ➔ Watch

**42. 웹사이트에서 '다크 모드' 버튼을 눌렀을 때 화면이 어두워지는 기능을 구현하는 3단계 과정으로 가장 적절한 것은?**
① `createElement`로 `body` 생성 ➔ `setAttribute`로 색상 변경 ➔ `removeChild`로 기존 화면 삭제
② `querySelector`로 `body` 선택 ➔ `classList.toggle()`로 `'dark-mode'` 클래스 추가/제거 ➔ 정의된 CSS 스타일에 따라 배경과 글자색 변경
③ `querySelectorAll`로 모든 텍스트 선택 ➔ `textContent`로 내용 삭제 ➔ `appendChild`로 검은색 박스 추가
④ `getAttribute`로 스타일 조회 ➔ `removeAttribute`로 클래스 삭제 ➔ 브라우저 새로고침

---

## Part 5. 스코프, var, 호이스팅 (43~50번)

**43. ES6 이전에 변수 선언에 사용했던 `var` 키워드의 특징이 아닌 것은?**
① 재할당과 재선언이 모두 가능하다.
② 블록 스코프(block scope)가 아닌 함수 스코프(function scope)를 가진다.
③ 호이스팅(Hoisting) 특성으로 인해 변수 선언문 이전에 참조해도 에러가 발생하지 않는다.
④ TDZ(일시적 사각지대)의 보호를 받아 선언 전 접근을 철저히 차단한다.

**44. 다음 코드를 실행했을 때 발생하는 결과와 그 이유로 올바른 것은?**
```js
function foo() {
  var x = 1
  console.log(x)
}
foo()
console.log(x)
```
① `1`이 두 번 출력된다. (`var`는 언제나 전역 변수이기 때문)
② 첫 번째는 `1`이 출력되고, 두 번째 `console.log(x)`에서는 `ReferenceError: x is not defined`가 발생한다. (`var`는 함수 스코프를 가지므로 함수 밖에서 접근 불가)
③ 첫 번째는 `1`, 두 번째는 `undefined`가 출력된다. (호이스팅 때문)
④ 문법 에러(`SyntaxError`)가 발생하여 아무것도 출력되지 않는다.

**45. 자바스크립트 엔진이 변수를 생성하는 3단계를 순서대로 바르게 나열한 것은?**
① 초기화(Initialization) ➔ 선언(Declaration) ➔ 할당(Assignment)
② 선언(Declaration) ➔ 할당(Assignment) ➔ 초기화(Initialization)
③ 선언(Declaration) ➔ 초기화(Initialization) ➔ 할당(Assignment)
④ 할당(Assignment) ➔ 선언(Declaration) ➔ 초기화(Initialization)

**46. 다음 두 코드 스니펫(A, B)을 실행했을 때의 결과를 바르게 연결한 것은?**
```js
// [코드 A]
console.log(name)
var name = '홍길동'

// [코드 B]
console.log(age)
let age = 30
```
① [코드 A]: `'홍길동'` / [코드 B]: `30`
② [코드 A]: `undefined` / [코드 B]: `undefined`
③ [코드 A]: `undefined` / [코드 B]: `ReferenceError: Cannot access 'age' before initialization`
④ [코드 A]: `ReferenceError` / [코드 B]: `SyntaxError`

**47. `let`과 `const`로 선언한 변수를 선언문 이전에 참조하려고 할 때 `age is not defined`가 아니라 `Cannot access 'age' before initialization` 에러가 발생하는 이유는 무엇인가요?**
① `let`과 `const`는 호이스팅이 전혀 발생하지 않기 때문이다.
② `let`과 `const`도 스코프 최상단으로 선언(이름 등록)은 호이스팅되지만, 실제 코드 라인에 도달하기 전까지 초기화가 이루어지지 않아 TDZ(일시적 사각지대)에 갇혀 있기 때문이다.
③ `let`과 `const`는 선언과 동시에 `null`로 초기화되기 때문이다.
④ 브라우저의 콘솔 창이 ES6 문법을 지원하지 않기 때문이다.

**48. TDZ(Temporal Dead Zone, 일시적 사각지대)에 대한 설명으로 옳은 것은?**
① 스코프의 시작 지점부터 변수의 초기화가 이루어지는 지점(실제 코드 선언부)까지의 구간을 의미한다.
② `var` 키워드와 함수 선언식(`function a() {}`)이 TDZ의 영향을 가장 크게 받는다.
③ TDZ 구간에 있는 변수는 언제든지 안전하게 값을 읽고 쓸 수 있다.
④ 가비지 컬렉터에 의해 삭제된 DOM 노드가 머무르는 메모리 공간이다.

**49. 다음 중 선언, 초기화, 할당이 모두 동시에 스코프 최상단으로 끌어올려져, 선언문 이전 줄에서도 아무런 에러 없이 정상적으로 호출(사용)할 수 있는 것은?**
① `let`으로 선언한 변수
② `const`로 선언한 함수 표현식 (`const fn = function() {}`)
③ 함수 선언식 (`function sayHello() {}`)
④ `class` 선언문

**50. 키워드별 호이스팅 및 TDZ 여부를 정리한 내용으로 틀린 것은?**
① `var`: 호이스팅 O / 스코프 진입 시 `undefined`로 초기화 / TDZ 없음
② `let`, `const`: 호이스팅 O / 실제 코드 선언 줄 도달 시 초기화 / TDZ 있음
③ `function`(함수 선언식): 호이스팅 O / 스코프 진입 시 함수 전체 초기화 및 할당 / TDZ 없음
④ `class`: 호이스팅 X / 선언 전 사용 가능 / TDZ 없음

---
---

## 정답 및 해설

### Part 1. History of JavaScript & ECMAScript
1. **③ 팀 버너스리 (Tim Berners-Lee)**
   - **해설**: 1990년 팀 버너스리 경이 WWW와 하이퍼텍스트 시스템을 고안하고 URL, HTTP를 최초 설계 및 구현했습니다.
2. **④ 초기의 웹은 탄생 시점부터 화려한 동적 애니메이션을 기본 지원했다.**
   - **해설**: 초기의 웹은 아무런 동적 변화가 없는 정적인 텍스트 페이지만을 지원했습니다.
3. **② Mocha ➔ LiveScript ➔ JavaScript**
   - **해설**: 브렌던 아이크는 처음에 'Mocha'를 개발했고, 이후 'LiveScript'로 변경했다가 당시 인기 있던 Java의 명성에 기대고자 'JavaScript'로 이름을 변경했습니다.
4. **③ JScript**
   - **해설**: 1996년 Microsoft는 IE 3.0에 JavaScript와 유사한 'JScript'를 도입하여 독자 규격을 사용했고, 이로 인해 JavaScript 파편화가 시작되었습니다.
5. **② Microsoft의 IE가 2002년 약 96%의 시장 점유율을 차지하며 승리했다.**
   - **해설**: Microsoft는 윈도우 운영체제에 IE를 내장하여 무료 배포했고, 2002년 약 96%의 점유율로 1차 브라우저 전쟁에서 승리했습니다. 모질라 재단은 Netscape의 핵심 개발진이 설립했습니다.
6. **④ 특정 회사의 독점 브라우저에서만 웹 페이지가 작동하도록 강제할 수 있다.**
   - **해설**: 웹 표준은 특정 브라우저 독점을 막고 모든 브라우저와 기기에서 웹 사이트가 일관되게 작동하도록 하기 위해 존재합니다.
7. **③ 적극적인 웹 표준 준수 - V8 자바스크립트 엔진**
   - **해설**: Chrome이 시장 우위를 점한 가장 결정적인 이유는 '적극적인 웹 표준 준수'와 압도적인 성능을 보여준 자체 개발 'V8 자바스크립트 엔진' 덕분입니다.
8. **② ECMAScript는 Ecma International이 정의한 표준화된 스크립트 프로그래밍 언어 명세이며, JavaScript는 이를 구현한 구체적인 언어이다.**
   - **해설**: ECMAScript는 언어의 규칙과 핵심을 정의한 표준 명세(설계도)이고, JavaScript는 이를 바탕으로 구현된 프로그래밍 언어입니다.
9. **④ ES6 / ES2015 (2015)**
   - **해설**: 2015년에 발표된 ECMAScript 2015(ES6)는 `let`/`const`, 클래스 등 많은 발전을 이루어 역사상 가장 중요한 버전으로 평가됩니다.
10. **② Node.js**
    - **해설**: 2009년 출시된 Node.js 덕분에 JavaScript는 브라우저 외부(서버 사이드 등)에서도 실행 가능한 언어로 확장되었습니다.

### Part 2. 변수(Variables)와 식별자 규칙
11. **③ `for`, `if`, `function` 같은 예약어를 변수명으로 사용할 수 있다.**
    - **해설**: 프로그래밍 언어가 문법을 위해 미리 예약해둔 단어(예약어)는 식별자(변수명)로 사용할 수 없습니다.
12. **① `_userName`, `$button`, `user1`**
    - **해설**: ②의 `1stUser`(숫자로 시작), `let`(예약어), ③의 `function`(예약어), `my-name`(하이픈 사용 불가), ④의 `if`(예약어)는 모두 변수명으로 사용할 수 없습니다.
13. **④ 카멜 케이스(`camelCase`) – 변수, 객체, 함수**
    - **해설**: 변수·객체·함수는 `camelCase`, 클래스·생성자는 `PascalCase`, 상수는 대문자 스네이크 케이스(`SNAKE_CASE`)를 사용합니다.
14. **③ 블록 스코프(block scope)를 갖는 지역 변수를 선언한다.**
    - **해설**: `let`은 ES6에서 추가되었으며, 블록 스코프를 갖고 재할당은 가능하지만 재선언은 불가능합니다.
15. **① 선언과 동시에 초기값을 할당하는 경우 (`const number = 10`)**
    - **해설**: `const`는 선언과 동시에 반드시 초기값을 할당해야 하며, 재할당이나 재선언, 초기값 없는 선언은 모두 에러가 발생합니다.
16. **③ `2`, `1`**
    - **해설**: `let`은 블록 스코프(`{}`)를 가집니다. `if`문 내부의 `let x = 2`는 블록 내부에서만 유효하므로 안쪽에서는 `2`가 출력되고, 블록 바깥에서는 바깥쪽 변수 `x`의 값인 `1`이 출력됩니다.
17. **② `if`, `for`, 함수 등의 중괄호(`{}`) 내부를 가리키며, 블록 바깥에서는 블록 내부의 `let`, `const` 변수에 접근할 수 없다.**
    - **해설**: 블록 스코프는 중괄호(`{}`) 기준이며, `var`는 블록을 무시하고 함수 스코프로 동작합니다.
18. **③ 기본적으로 `const`를 사용하여 의도치 않은 값 변경 버그를 예방하고, 재할당이 필요한 경우에만 `let`으로 전환한다.**
    - **해설**: `const`를 기본으로 사용하면 코드의 의도가 명확해지고 버그를 예방할 수 있습니다.
19. **④ HTML `<style>` 태그 내부에 JavaScript 코드를 직접 작성하여 실행한다.**
    - **해설**: `<style>` 태그는 CSS를 작성하는 곳입니다. JavaScript는 `<script>` 태그, 외부 `.js` 파일 연결, 브라우저 Console을 통해 실행합니다.
20. **③ JavaScript 창시자인 브렌던 아이크는 세미콜론을 무조건 강제해야 한다고 주장했다.**
    - **해설**: 브렌던 아이크 또한 세미콜론이 선택적이어야 한다고 생각했으며 세미콜론을 강제하지 않는 스타일을 선호했습니다.

### Part 3. DOM 구조와 DOM 선택
21. **③ DOM 조작 결과는 브라우저를 재부팅해야만 화면에 반영된다.**
    - **해설**: DOM 조작은 웹 페이지에 실시간으로 반영되어 사용자와 상호작용하는 동적 페이지를 만듭니다.
22. **② `document`**
    - **해설**: `document` 객체는 웹 페이지를 나타내는 DOM 트리의 최상위 객체이자 모든 콘텐츠에 접근하는 진입점입니다.
23. **② `document.title = 'Hello :)'`**
    - **해설**: `document.title` 속성을 통해 문서의 `<title>` 값을 조회하거나 변경할 수 있습니다.
24. **② 조작하고자 하는 요소를 선택(또는 탐색) ➔ 선택된 요소의 콘텐츠 또는 속성을 조작**
    - **해설**: DOM 조작은 반드시 요소를 먼저 '선택'한 후, 그 요소의 콘텐츠나 속성을 '조작'하는 순서로 진행됩니다.
25. **② 제공한 선택자를 만족하는 첫 번째 `element` 객체를 반환하며, 일치하는 요소가 없으면 `null`을 반환한다.**
    - **해설**: `querySelector`는 CSS 선택자와 일치하는 첫 번째 요소 하나만 반환하며, 없으면 `null`을 반환합니다.
26. **③ 일치하는 여러 요소를 포함하는 `NodeList`를 반환한다.**
    - **해설**: `querySelectorAll`은 일치하는 모든 요소를 정적(non-live) `NodeList`로 반환합니다.
27. **③ 3**
    - **해설**: 선택자가 `'p.content'`(클래스가 `content`인 `<p>` 태그)이므로 `<li>` 태그는 제외되고 3개의 `<p>` 요소만 선택되어 `length`는 3이 됩니다.
28. **② `Element`는 `Node`의 하위 유형으로, 모든 `Element`는 `Node`이지만 모든 `Node`가 `Element`인 것은 아니다.**
    - **해설**: DOM 트리의 기본 단위는 `Node`(Document Node, Element Node, Text Node 등)이며, `Element`는 HTML 태그를 나타내는 `Node`의 하위 유형입니다.
29. **④ DOM에 새로운 요소가 추가되면 이전에 변수에 담아둔 `NodeList`의 길이도 실시간으로 늘어난다.**
    - **해설**: `querySelectorAll()`이 반환하는 `NodeList`는 DOM의 변경사항을 실시간으로 반영하지 않습니다.
30. **② Parsing (파싱)**
    - **해설**: 브라우저가 문자열을 해석하여 DOM Tree로 만드는 구문 분석 과정을 Parsing이라고 합니다.

### Part 4. DOM 조작 (속성, 콘텐츠, 요소, 스타일)
31. **② `element.classList`**
    - **해설**: `classList` 프로퍼티는 요소의 클래스 목록을 `DOMTokenList` 형태로 반환하여 `add()`, `remove()`, `toggle()` 메서드를 사용할 수 있게 합니다.
32. **② `'active'` 클래스가 존재하면 제거하고 `false`를 반환하며, 존재하지 않으면 추가하고 `true`를 반환한다.**
    - **해설**: `toggle()`은 클래스가 있으면 제거(`false`), 없으면 추가(`true`)하는 상태 전환 메서드입니다.
33. **③ `['blue']`**
    - **해설**: 초기 `['heading']` ➔ `add('red')`로 `['heading', 'red']` ➔ `remove('heading')`으로 `['red']` ➔ `toggle('red')`로 `'red'` 제거되어 `[]` ➔ `toggle('blue')`로 `'blue'` 추가되어 최종적으로 `['blue']`만 남습니다.
34. **④ `setAttribute()`에 숫자나 boolean 값을 넣으면 원래의 데이터 타입(숫자, 불리언)을 그대로 유지하여 저장한다.**
    - **해설**: `setAttribute()`는 숫자나 boolean 값을 넣어도 모두 **문자열(String)**로 변환하여 저장하므로 타입에 주의해야 합니다.
35. **③ `null`**
    - **해설**: `removeAttribute('href')`로 속성을 제거한 뒤 `getAttribute('href')`로 조회하면 `null`이 반환됩니다.
36. **③ `Hello World`**
    - **해설**: `textContent`는 `<b>`와 같은 내부 HTML 태그를 모두 제거하고 순수한 텍스트 데이터만 가져옵니다.
37. **④ `createElement`는 메모리에만 요소를 생성하므로, 실제 화면에 보이게 하려면 `appendChild` 등으로 문서에 삽입해야 한다.**
    - **해설**: ① `createElement`는 메모리에만 생성합니다. ② `appendChild`는 **마지막** 자식으로 삽입합니다. ③ `removeChild`로 제거된 노드는 메모리에 남아있어 변수에 담아두면 재사용할 수 있습니다.
38. **③ `<div><h1>새 제목</h1></div>`**
    - **해설**: `<h1>새 제목</h1>`이 `div`의 마지막 자식으로 추가되었고, 기존에 있던 `<p>기존 문단</p>`은 `removeChild`로 제거되었으므로 `<h1>`만 남습니다.
39. **② `pTag.style.fontSize = '2rem'`**
    - **해설**: JavaScript의 `style` 프로퍼티에서 하이픈(`-`)이 들어가는 CSS 속성(예: `font-size`)은 카멜 케이스(`fontSize`)로 작성해야 합니다.
40. **③ 여러 개의 스타일을 한꺼번에 변경할 때는 클래스(`classList`)를 활용하기보다 `style` 프로퍼티로 하나씩 직접 지정하는 것을 가장 권장한다.**
    - **해설**: 여러 스타일을 변경할 때는 `style` 프로퍼티를 직접 조작하기보다 가급적 CSS 클래스(`class`)를 활용하는 것을 추천합니다.
41. **③ Elements ➔ Properties**
    - **해설**: 개발자 도구의 Elements 탭에서 요소를 선택한 뒤 Properties 하위 탭을 열면 해당 요소의 모든 DOM 속성을 확인할 수 있습니다.
42. **② `querySelector`로 `body` 선택 ➔ `classList.toggle()`로 `'dark-mode'` 클래스 추가/제거 ➔ 정의된 CSS 스타일에 따라 배경과 글자색 변경**
    - **해설**: 학습 자료에서 소개된 다크 모드 구현의 3단계 핵심 원리입니다.

### Part 5. 스코프, var, 호이스팅
43. **④ TDZ(일시적 사각지대)의 보호를 받아 선언 전 접근을 철저히 차단한다.**
    - **해설**: `var`는 선언과 동시에 `undefined`로 초기화되므로 TDZ가 없으며 선언 전에도 접근이 가능해 예기치 못한 버그를 유발할 수 있습니다.
44. **② 첫 번째는 `1`이 출력되고, 두 번째 `console.log(x)`에서는 `ReferenceError: x is not defined`가 발생한다.**
    - **해설**: `var`는 함수 스코프(function scope)를 가지므로, `foo` 함수 내부에서 선언된 `var x`는 함수 바깥에서 접근할 수 없습니다.
45. **③ 선언(Declaration) ➔ 초기화(Initialization) ➔ 할당(Assignment)**
    - **해설**: 자바스크립트 엔진은 변수를 `선언 ➔ 초기화 ➔ 할당`의 3단계로 생성합니다.
46. **③ [코드 A]: `undefined` / [코드 B]: `ReferenceError: Cannot access 'age' before initialization`**
    - **해설**: `var`는 선언과 초기화(`undefined`)가 동시에 호이스팅되어 `undefined`를 출력하지만, `let`은 선언만 호이스팅되고 초기화되지 않아 TDZ에 의해 `ReferenceError`가 발생합니다.
47. **② `let`과 `const`도 스코프 최상단으로 선언(이름 등록)은 호이스팅되지만, 실제 코드 라인에 도달하기 전까지 초기화가 이루어지지 않아 TDZ(일시적 사각지대)에 갇혀 있기 때문이다.**
    - **해설**: 만약 호이스팅이 아예 안 되었다면 `is not defined` 에러가 났겠지만, 엔진이 변수의 존재(선언)는 알고 있기 때문에 `before initialization`(초기화 전 접근 불가) 에러를 띄웁니다.
48. **① 스코프의 시작 지점부터 변수의 초기화가 이루어지는 지점(실제 코드 선언부)까지의 구간을 의미한다.**
    - **해설**: TDZ는 스코프 진입 시점부터 실제 변수 선언 코드 줄에 도달해 초기화가 이루어지기 전까지의 사각지대 구간입니다.
49. **③ 함수 선언식 (`function sayHello() {}`)**
    - **해설**: 함수 선언식은 선언, 초기화, 할당(함수 본체)이 모두 스코프 최상단으로 호이스팅되므로 선언문 이전에도 함수를 정상 호출할 수 있습니다.
50. **④ `class`: 호이스팅 X / 선언 전 사용 가능 / TDZ 없음**
    - **해설**: `class` 역시 호이스팅이 되지만(`O`), 실제 코드 선언 줄에 도달할 때 초기화되므로 TDZ가 존재(`O`)하며 선언 전에 사용할 수 없습니다.