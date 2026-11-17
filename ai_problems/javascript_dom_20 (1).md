# JavaScript & DOM 코드 빈칸 채우기 (20문항)

> 본 문제는 제공된 `1111_JavaScript_DOM.md` 강의록의 실습 코드를 기반으로 출제되었습니다. 각 코드 블록의 주석과 설명을 읽고 빈칸 `(   )`에 들어갈 알맞은 키워드, 메서드, 프로퍼티 또는 출력 결과를 작성하시오.

---

## Part 1. 변수 선언, 스코프 및 실행 방법 (1~4번)

**1. [변수 선언 키워드]**
재할당이 필요한 변수와 재할당이 불가능한 상수를 선언하는 코드입니다. 빈칸 `( A )`와 `( B )`에 알맞은 변수 선언 키워드를 쓰시오.
```js
// 1. 재할당이 가능한 변수 선언
(   A   ) changeableNum = 10
changeableNum = 20

// 2. 재할당이 불가능한 상수 선언 (기본 권장 키워드)
(   B   ) fixedNum = 100
```
- ( A ): 
- ( B ): 


**2. [블록 스코프와 출력 결과]**
다음 코드를 실행했을 때 콘솔에 출력되는 값 `( A )`와 `( B )`를 쓰시오.
```js
let x = 1
if (x === 1) {
  let x = 2
  console.log(x)  // 출력 결과: (   A   )
}
console.log(x)    // 출력 결과: (   B   )
```
- ( A ): 
- ( B ): 


**3. [외부 JavaScript 파일 연결]**
HTML 문서에서 외부에 작성된 `hello.js` 파일을 불러와 실행하려고 합니다. 빈칸 `( A )`와 `( B )`에 들어갈 태그명과 속성명을 쓰시오.
```html
<body>
  <(   A   ) (   B   )="hello.js"></(   A   )>
</body>
```
- ( A ): 
- ( B ): 


**4. [브라우저 탭 제목 변경]**
DOM 트리의 최상위 객체를 사용하여 현재 웹 페이지의 `<title>`(브라우저 탭 제목)을 `'Hello :)'`로 변경하는 코드입니다. 빈칸 `( A )`와 `( B )`를 채우시오.
```js
(   A   ).(   B   ) = 'Hello :)'
```
- ( A ): 
- ( B ): 

---

## Part 2. DOM 요소 선택 (5~7번)

**5. [단일 요소와 복수 요소 선택 메서드]**
HTML 문서에서 첫 번째 `.content` 요소 하나만 선택하는 메서드 `( A )`와, 모든 `.content` 요소를 `NodeList`로 선택하는 메서드 `( B )`를 쓰시오.
```js
// 1. 일치하는 첫 번째 요소 한 개 선택
const firstContent = document.(   A   )('.content')

// 2. 일치하는 모든 요소를 NodeList로 선택
const allContents = document.(   B   )('.content')
```
- ( A ): 
- ( B ): 


**6. [CSS 선택자를 활용한 DOM 선택]**
다음 HTML 구조에서 주석의 조건에 맞는 CSS 선택자(selector) 문자열을 빈칸 `( A )`와 `( B )`에 작성하시오.
```html
<body>
  <h1 class="heading">DOM 선택</h1>
  <ul>
    <li>list1</li>
    <li>list2</li>
  </ul>
  <script>
    // 1. 클래스가 'heading'인 요소 선택
    const heading = document.querySelector('(   A   )')

    // 2. ul 태그의 직계 자식인 모든 li 태그 선택
    const listItems = document.querySelectorAll('(   B   )')
  </script>
</body>
```
- ( A ): 
- ( B ): 


**7. [NodeList 순회하기]**
`querySelectorAll()`로 선택한 `NodeList`의 모든 요소를 순회하며 콘솔에 출력하려고 합니다. `NodeList`에서 사용 가능한 배열 메서드를 빈칸 `( A )`에 쓰시오.
```js
const items = document.querySelectorAll('.item')

items.(   A   )((item) => {
  console.log(item)
})
```
- ( A ): 

---

## Part 3. 클래스 및 일반 속성 조작 (8~11번)

**8. [클래스 추가 및 제거]**
선택한 `h1Tag` 요소의 클래스 목록(`DOMTokenList`)에 접근하여 `'red'` 클래스를 추가하고 다시 제거하는 코드입니다. 빈칸 `( A )`, `( B )`, `( C )`를 채우시오.
```js
const h1Tag = document.querySelector('.heading')

// 'red' 클래스 추가
h1Tag.(   A   ).(   B   )('red')

// 'red' 클래스 제거
h1Tag.(   A   ).(   C   )('red')
```
- ( A ): 
- ( B ): 
- ( C ): 


**9. [다크 모드 클래스 토글]**
요소에 `'dark-mode'` 클래스가 존재하면 제거(`false` 반환)하고, 존재하지 않으면 추가(`true` 반환)하는 코드입니다. 빈칸 `( A )`에 들어갈 메서드 이름을 쓰시오.
```js
const bodyTag = document.querySelector('body')
bodyTag.classList.(   A   )('dark-mode')
```
- ( A ): 


**10. [일반 속성 조회 및 수정]**
`<a>` 태그의 `href` 속성 값을 조회한 뒤, 새로운 주소로 변경하는 코드입니다. 빈칸 `( A )`와 `( B )`에 들어갈 메서드를 쓰시오.
```js
const aTag = document.querySelector('a')

// 1. 현재 href 속성 값 조회
console.log(aTag.(   A   )('href'))

// 2. href 속성 값을 'https://www.naver.com/'으로 변경
aTag.(   B   )('href', 'https://www.naver.com/')
```
- ( A ): 
- ( B ): 


**11. [일반 속성 제거 및 반환값 확인]**
`<a>` 태그에서 `href` 속성을 제거한 후 다시 조회했을 때 콘솔에 출력되는 값 `( B )`와 제거 메서드 `( A )`를 쓰시오.
```js
const aTag = document.querySelector('a')

// href 속성 제거
aTag.(   A   )('href')

// 제거 후 조회 결과 출력
console.log(aTag.getAttribute('href')) // 출력 결과: (   B   )
```
- ( A ): 
- ( B ): 

---

## Part 4. 콘텐츠, DOM 요소, 스타일 조작 (12~17번)

**12. [HTML 텍스트 콘텐츠 조작]**
HTML 태그를 제외한 순수한 텍스트 데이터만 읽고 수정하는 프로퍼티 `( A )`와, 첫 번째 `console.log`의 출력 결과 `( B )`를 쓰시오.
```html
<h1 class="heading">안녕 <b>자바스크립트</b></h1>
<script>
  const h1Tag = document.querySelector('.heading')
  
  console.log(h1Tag.(   A   )) // 출력 결과: '(   B   )'
  
  h1Tag.(   A   ) = '내용 수정 완료'
</script>
```
- ( A ): 
- ( B ): 


**13. [새로운 DOM 요소 생성 및 삽입]**
메모리에 새로운 `<h1>` 요소를 생성하고 텍스트를 넣은 뒤, `<div>` 요소의 마지막 자식으로 문서에 삽입하는 코드입니다. 빈칸 `( A )`와 `( B )`에 들어갈 메서드를 쓰시오.
```js
// 1. 메모리에 <h1> 요소 생성
const h1Tag = document.(   A   )('h1')
h1Tag.textContent = '제목'

// 2. <div>의 마지막 자식으로 삽입하여 화면에 표시
const divTag = document.querySelector('div')
divTag.(   B   )(h1Tag)
```
- ( A ): 
- ( B ): 


**14. [DOM 자식 요소 삭제]**
부모 요소인 `divTag`에서 자식 요소인 `pTag`를 제거하는 코드입니다. 빈칸 `( A )`에 들어갈 메서드 이름을 쓰시오.
```js
const divTag = document.querySelector('div')
const pTag = document.querySelector('p')

// divTag에서 자식 노드 pTag 제거
const removedNode = divTag.(   A   )(pTag)
```
- ( A ): 


**15. [인라인 Style 프로퍼티 조작]**
JavaScript를 이용해 `<p>` 태그의 글자 색상(`color`), 글자 크기(`font-size`), 테두리(`border`) 스타일을 직접 변경하는 코드입니다. 빈칸 `( A )`와 `( B )`에 들어갈 프로퍼티 이름을 쓰시오.
```js
const pTag = document.querySelector('p')

pTag.(   A   ).color = 'crimson'
pTag.(   A   ).(   B   ) = '2rem'
pTag.(   A   ).border = '1px solid black'
```
- ( A ): 
- ( B ): 


**16. [종합: 할 일 목록(li) 동적 추가하기]**
`<ul>` 태그 안에 `'자바스크립트 공부하기'`라는 텍스트를 가진 `<li class="todo-item">` 요소를 만들어 추가하는 전체 과정입니다. 빈칸 `( A )`, `( B )`, `( C )`, `( D )`를 채우시오.
```js
const ulTag = document.querySelector('ul')

// 1. li 요소 생성
const liTag = document.(   A   )('li')

// 2. 텍스트 내용 설정
liTag.(   B   ) = '자바스크립트 공부하기'

// 3. 'todo-item' 클래스 추가
liTag.classList.(   C   )('todo-item')

// 4. ul 태그의 마지막 자식으로 추가
ulTag.(   D   )(liTag)
```
- ( A ): 
- ( B ): 
- ( C ): 
- ( D ): 


**17. [종합: 이미지(img) 속성 변경하기]**
선택한 `<img>` 태그의 이미지 경로(`src`)를 `'profile.jpg'`로 설정하고, 기존에 있던 `'hidden'` 클래스를 제거하여 화면에 보이게 하는 코드입니다. 빈칸 `( A )`와 `( B )`를 채우시오.
```js
const imgTag = document.querySelector('img')

// 1. src 속성을 'profile.jpg'로 설정
imgTag.(   A   )('src', 'profile.jpg')

// 2. 'hidden' 클래스 제거
imgTag.classList.(   B   )('hidden')
```
- ( A ): 
- ( B ): 

---

## Part 5. 함수 스코프와 호이스팅 (18~20번)

**18. [var와 함수 스코프]**
다음 코드를 실행했을 때 첫 번째 콘솔 출력값 `( A )`와 두 번째 콘솔에서 발생하는 에러의 종류 `( B )`를 쓰시오.
```js
function foo() {
  var x = 1
  console.log(x) // 출력 결과: (   A   )
}
foo()
console.log(x)   // 에러 발생: (   B   ): x is not defined
```
- ( A ): 
- ( B ): 


**19. [var와 let의 호이스팅 결과 비교]**
변수를 선언하기 전에 접근했을 때 `var`와 `let`의 실행 결과를 보여주는 코드입니다. 빈칸 `( A )`에 출력되는 값과 `( B )`에 발생하는 에러의 종류를 쓰시오.
```js
// 1. var의 호이스팅 (선언 + 초기화 동시 진행)
console.log(name) // 출력 결과: (   A   )
var name = '홍길동'

// 2. let의 호이스팅 (TDZ로 인해 초기화 전 접근 불가)
console.log(age)  // 에러 발생: (   B   ): Cannot access 'age' before initialization
let age = 30
```
- ( A ): 
- ( B ): 


**20. [함수 선언식의 호이스팅]**
함수를 선언하기 전에 호출했음에도 정상적으로 `'Hello!'`가 출력되도록 빈칸 `( A )`에 알맞은 키워드를 작성하시오.
```js
sayHello() // 'Hello!' 정상 출력

(   A   ) sayHello() {
  console.log('Hello!')
}
```
- ( A ): 

---
---

## 정답 및 해설

### Part 1. 변수 선언, 스코프 및 실행 방법

1. **( A ): `let` / ( B ): `const`**
   - **해설**: 재할당이 필요한 변수는 `let`, 재할당이 불가능한 상수는 `const`로 선언합니다.

2. **( A ): `2` / ( B ): `1`**
   - **해설**: `let`은 블록 스코프(`{}`)를 따르므로 `if` 블록 안에서는 내부 변수 `x`(`2`)가 출력되고, 블록 밖에서는 외부 변수 `x`(`1`)가 출력됩니다.

3. **( A ): `script` / ( B ): `src`**
   - **해설**: 외부 `.js` 파일을 HTML에 연결할 때는 `<script src="파일경로"></script>` 형식을 사용합니다.

4. **( A ): `document` / ( B ): `title`**
   - **해설**: `document.title` 프로퍼티를 통해 문서의 제목을 조회하거나 변경할 수 있습니다.

---

### Part 2. DOM 요소 선택

5. **( A ): `querySelector` / ( B ): `querySelectorAll`**
   - **해설**: 단일 요소(첫 번째 일치 요소) 선택은 `querySelector`, 복수 요소(`NodeList`) 선택은 `querySelectorAll`을 사용합니다.

6. **( A ): `.heading` / ( B ): `ul > li`**
   - **해설**: 클래스 선택자는 앞에 마침표(`.`)를 붙이고, 자식 결합자는 `>` 기호를 사용합니다.

7. **( A ): `forEach`**
   - **해설**: `querySelectorAll`이 반환하는 `NodeList`는 유사 배열이지만 배열 메서드인 `forEach`를 지원합니다.

---

### Part 3. 클래스 및 일반 속성 조작

8. **( A ): `classList` / ( B ): `add` / ( C ): `remove`**
   - **해설**: `element.classList` 프로퍼티의 `add()`와 `remove()` 메서드로 클래스를 추가하거나 제거합니다.

9. **( A ): `toggle`**
   - **해설**: `classList.toggle()`은 클래스가 있으면 제거하고 없으면 추가합니다.

10. **( A ): `getAttribute` / ( B ): `setAttribute`**
    - **해설**: 속성 값을 읽어올 때는 `getAttribute(속성명)`, 설정하거나 수정할 때는 `setAttribute(속성명, 값)`을 사용합니다.

11. **( A ): `removeAttribute` / ( B ): `null`**
    - **해설**: `removeAttribute('href')`로 속성을 삭제한 뒤 `getAttribute('href')`로 없는 속성을 조회하면 `null`을 반환합니다.

---

### Part 4. 콘텐츠, DOM 요소, 스타일 조작

12. **( A ): `textContent` / ( B ): `안녕 자바스크립트`**
    - **해설**: `textContent`는 내부의 `<b>` 태그 등을 모두 제거하고 순수 텍스트만 가져오거나 설정합니다.

13. **( A ): `createElement` / ( B ): `appendChild`**
    - **해설**: `document.createElement()`로 메모리에 요소를 만들고, `parentNode.appendChild()`로 문서 트리에 연결합니다.

14. **( A ): `removeChild`**
    - **해설**: `parentNode.removeChild(childNode)`는 부모 노드에서 자식 노드를 제거하고 그 제거된 노드를 반환합니다.

15. **( A ): `style` / ( B ): `fontSize`**
    - **해설**: 인라인 스타일 조작은 `element.style` 프로퍼티를 사용하며, CSS의 `font-size`는 카멜 케이스인 `fontSize`로 작성해야 합니다.

16. **( A ): `createElement` / ( B ): `textContent` / ( C ): `add` / ( D ): `appendChild`**
    - **해설**: 요소 생성(`createElement`) ➔ 텍스트 삽입(`textContent`) ➔ 클래스 추가(`classList.add`) ➔ 문서에 추가(`appendChild`)로 이어지는 전형적인 DOM 조작 패턴입니다.

17. **( A ): `setAttribute` / ( B ): `remove`**
    - **해설**: 일반 속성인 `src`는 `setAttribute`로 설정하고, 클래스 목록에서 특정 클래스를 지울 때는 `classList.remove`를 사용합니다.

---

### Part 5. 함수 스코프와 호이스팅

18. **( A ): `1` / ( B ): `ReferenceError`**
    - **해설**: `var`로 선언한 변수는 함수 스코프(function scope)를 가지므로 함수 내부에서는 `1`이 정상 출력되지만, 함수 외부에서 접근하면 `ReferenceError`(참조 에러)가 발생합니다.

19. **( A ): `undefined` / ( B ): `ReferenceError`**
    - **해설**: `var`는 호이스팅 시 `undefined`로 초기화되지만, `let`과 `const`는 실제 선언 줄에 도달할 때까지 초기화되지 않고 TDZ(일시적 사각지대)에 머무르므로 `ReferenceError`가 발생합니다.

20. **( A ): `function`**
    - **해설**: `function` 키워드를 사용한 함수 선언식은 선언, 초기화, 할당이 모두 최상단으로 호이스팅되어 선언문 이전에도 호출할 수 있습니다.