## 학습 목표

- DOM이 무엇인지 설명하고, HTML과의 관계를 이해한다.
- `querySelector`와 `querySelectorAll`로 DOM 요소를 선택한다.
- `textContent`와 `setAttribute`로 요소 내용과 속성을 바꾼다.
- `classList` 속성으로 요소의 클래스를 동적으로 조작한다.
- `createElement`와 `appendChild`로 새 DOM 요소를 추가한다.
- `style` 프로퍼티를 사용해 요소의 스타일을 직접 변경한다.

## 학습 시작

> 💡 **웹사이트에서 다크 모드 버튼을 누르면 화면이 어두워지는 건 어떻게 일어나는 걸까요?**
> 1. 우리가 보는 웹 페이지는 HTML이라는 '설계도'입니다. 그리고 이 설계도만으로는 아무런 변화도 일어나지 않는, 그저 정적인 문서일 뿐입니다.
> 2. 이 설계도에 생명을 불어넣는 것이 바로 자바스크립트(JavaScript)입니다. 자바스크립트는 웹 페이지의 특정 요소를 찾아내고, 내용을 바꾸거나, 색깔을 입히거나, 심지어 새로운 요소를 만들어 붙이는 등 모든 동적인 조작을 할 수 있습니다.
> 3. 이때 자바스크립트가 HTML 설계도를 이해하고 조작할 수 있도록, 브라우저는 설계도를 **'DOM(Document Object Model)'** 이라는 객체 트리 구조로 변환하여 제공합니다.
>
> 정적인 페이지에 머무르지 않고, 사용자의 행동에 따라 실시간으로 변화하는 동적인 웹 페이지를 직접 만들어 봅시다.

## DOM

### 웹 브라우저에서의 JavaScript
- 웹 페이지에서 **동적인 기능**을 담당
- JavaScript를 실행하는 3가지 방법

1. HTML `script` 태그
   ```html
   <body>
     <script>
       console.log('hello')
     </script>
   </body>
   ```
2. js 확장자 파일
   ```js
   // hello.js
   console.log('hello')
   ```
   ```html
   <body>
     <script src="hello.js"></script>
   </body>
   ```
3. 브라우저 Console – 개발자 도구 → Console 탭에서 `console.log('hello')` 입력 → `hello` 출력

### Document structure (문서 구조)
- HTML 문서는 **여러 상자가 중첩된 구조**로 볼 수 있음

```html
<!DOCTYPE html>
<html lang="en"><head>
  <title>Document</title>
</head><body>
  <h1>Heading</h1>
  <p>Hello,
    <a href="https://www.google.com/">google</a>
  </p>
</body></html>
```

```text
┌───────────────────────────────┐
│ head  ┌─────────────────────┐ │
│       │ title               │ │
│       └─────────────────────┘ │
│ body  ┌─────────────────────┐ │
│       │ h1                  │ │
│       └─────────────────────┘ │
│       ┌─────────────────────┐ │
│       │ p    ┌───┐          │ │
│       │      │ a │          │ │
│       │      └───┘          │ │
│       └─────────────────────┘ │
└───────────────────────────────┘
```

- 브라우저가 문서를 표현하기 위해 사용하는 데이터 구조는 위 그림과 같은 모양을 가짐
- **각 상자는 객체**이며 개발자는 이 객체와 상호작용하여 어떤 HTML 태그를 나타내는지, 어떤 콘텐츠가 포함되어 있는지 등을 알아낼 수 있음
- 이 표현을 객체 모델(Document Object Model) 줄여서 **DOM**이라고 부름

### DOM (The Document Object Model)
> 📝 **DOM**: 웹 페이지(Document)를 구조화된 객체로 제공하여 프로그래밍 언어가 페이지 구조에 접근할 수 있는 방법을 제공
> ➤ 문서 구조, 스타일, 내용 등을 변경할 수 있도록 함

### DOM API
- 다른 프로그래밍 언어가 웹 페이지에 접근 및 조작 할 수 있도록, 페이지 요소들을 객체 형태로 제공하며 관련된 **메서드(Method)도 함께 제공**
- HTML 구조와 내용을 조작하는 명령어 모음
- JS ⟷ DOM API ⟷ Web page

## document 객체

### document 객체
- 웹 페이지를 나타내는 **DOM 트리의 최상위 객체**
- HTML 문서의 모든 콘텐츠에 접근하고 조작할 수 있는 **진입점**
- DOM에서 모든 요소, 속성, 텍스트는 하나의 객체
- 모두 document 객체의 하위 객체로 구성됨

> 📝 **DOM 트리**: HTML 태그들의 관계를 나무 모양으로 만든 계층 구조

```text
document
└─ Root element: <html>
   ├─ Element: <head>
   │  └─ Element: <title>
   │     └─ Text: "My title"
   └─ Element: <body>
      ├─ Element: <h1>
      │  └─ Text: "A heading"
      └─ Element: <a>  ── Attribute: href
         └─ Text: "Link text"
```

### document 객체 예시 – HTML의 `<title>` 변경하기
브라우저 개발자 도구 Console에서:
```js
document.title             // 'Google'
document.title = 'Hello :)' // 'Hello :)' → 브라우저 탭 제목이 바뀜
```

## DOM Tree

### DOM tree
- HTML 태그를 나타내는 elements의 node는 문서의 구조를 결정
- 이들은 다시 자식 node를 가질 수 있음 (ex. `document.body`)
  - ➤ 객체 간 상속 구조가 존재

```text
html ─┬─> head ──> title
      └─> body ─┬─> h1
                └─> p ──> a
```

### 핵심 포인트 – DOM 핵심
> 📝 **DOM**: 문서의 요소들을 객체로 제공하여 다른 프로그래밍 언어에서 접근하고 조작할 수 있는 방법을 제공하는 **API**

> 📌 **TIP**
> - DOM은 문서를 부모-자식 관계의 계층적인 트리 구조로 표현
> - DOM 조작은 웹페이지에 실시간으로 반영되어, 사용자와 상호작용하는 동적 페이지를 만듭니다.
> - 사용자의 클릭이나 키보드 입력같은 이벤트를 감지하고, 이에 반응하는 상호작용을 만드는 기반이 됩니다.

> 💡 **쉽게 이해하기** — HTML 파일은 **글자로 된 설계도**, DOM은 브라우저가 그 설계도를 읽어 만든 **객체 나무**입니다. JavaScript는 글자(HTML)를 직접 고치는 게 아니라 이 **객체(DOM)를 고치고**, 그 변화가 화면에 바로 반영됩니다.

## DOM 선택

### DOM 조작 시 기억해야 할 것
**웹 페이지를 동적으로 만들기 == 웹 페이지를 조작하기**

조작 순서
1. 조작 하고자 하는 요소를 **선택** (또는 탐색)
2. 선택된 요소의 콘텐츠 또는 속성을 **조작**

### 선택 메서드

| 메서드 | 선택 개수 | 반환 |
|---|---|---|
| `document.querySelector(selector)` | 요소 **한 개** | 제공한 선택자를 만족하는 **첫 번째 element 객체** (없다면 `null`) |
| `document.querySelectorAll(selector)` | 요소 **여러 개** | 제공한 선택자를 만족하는 **NodeList** |

> 📝 **selector**: 찾고 싶은 html 요소를 지정하는 검색 조건 (ex: `'.content'`, `'#id'`, …)

### DOM 선택 실습
```html
<!-- select.html -->
<body>
  <h1 class="heading">DOM 선택</h1>
  <a href="https://www.google.com/">google</a>
  <p class="content">content1</p>
  <p class="content">content2</p>
  <p class="content">content3</p>
  <ul>
    <li>list1</li>
    <li>list2</li>
  </ul>
  <script>
    console.log(document.querySelector('.heading'))
    console.log(document.querySelector('.content'))
    console.log(document.querySelectorAll('.content'))
    console.log(document.querySelectorAll('ul > li'))
  </script>
</body>
```
```console
<h1 class="heading">DOM 선택</h1>
<p class="content">content1</p>
NodeList(3) [p.content, p.content, p.content]
NodeList(2) [li, li]
```

> 💡 **쉽게 이해하기** — `.content`인 p가 3개여도 `querySelector`는 **첫 번째(content1) 하나만** 줍니다. 3개 모두 필요하면 `querySelectorAll`. 선택자는 CSS 선택자 문법 그대로(`.클래스`, `#아이디`, `ul > li`) 씁니다.

## DOM 조작

### DOM 조작 종류
1. 속성(attribute) 조작
   - 클래스 속성 조작
   - 일반 속성 조작
2. HTML 콘텐츠 조작
3. DOM 요소 조작
4. 스타일 조작

## 속성 조작

1. **클래스(Class) 속성 조작** – 스타일링 및 상태 제어를 위한 클래스 목록을 동적으로 추가/제거
2. **일반 속성(Attribute) 조작** – id, href 등 요소의 모든 HTML 속성 값을 직접 설정/조회

### 클래스 속성 조작 – `classList` property
- 요소의 클래스 목록을 **DOMTokenList(유사 배열)** 형태로 반환
- HTML 요소의 클래스 목록을 쉽게 제어(추가/제거)하는 도구
- [참고] [MDN – classList](https://developer.mozilla.org/ko/docs/Web/API/Element/classList)

### classList 메서드

| 메서드 | 설명 |
|---|---|
| `element.classList.add()` | 지정한 클래스 값을 **추가** |
| `element.classList.remove()` | 지정한 클래스 값을 **제거** |
| `element.classList.toggle()` | 클래스가 존재한다면 **제거하고 `false`** 를 반환 (존재하지 않으면 클래스를 **추가하고 `true`** 를 반환) |

> 📝 **toggle**: 있으면 제거하고, 없으면 추가하는 식으로 상태를 바꾸는 기능

### 클래스 속성 조작 실습
- `add()`와 `remove()` 메서드를 사용해 지정한 클래스 값을 추가 혹은 제거

```html
<!-- element_manipulation.html -->
<style>
  .red {
    color: crimson;
  }
</style>
<h1 class="heading">DOM 조작</h1>
<script>
  const h1Tag = document.querySelector('.heading')
  console.log(h1Tag.classList)

  h1Tag.classList.add('red')
  console.log(h1Tag.classList)

  h1Tag.classList.remove('red')
  console.log(h1Tag.classList)

  h1Tag.classList.toggle('red')
  console.log(h1Tag.classList)
</script>
```
```console
DOMTokenList ['heading', value: 'heading']
DOMTokenList(2) ['heading', 'red', value: 'heading red']
DOMTokenList ['heading', value: 'heading']
DOMTokenList(2) ['heading', 'red', value: 'heading red']
```

> 💡 **쉽게 이해하기** — 마지막 `toggle('red')` 시점에는 red가 **없으므로 추가**됩니다. 그래서 최종적으로 제목이 crimson 색으로 보입니다. 한 번 더 toggle하면 다시 사라집니다.

### 일반 속성 조작 메서드

| 메서드 | 설명 |
|---|---|
| `Element.getAttribute()` | 해당 요소에 지정된 값을 반환 (**조회**) |
| `Element.setAttribute(name, value)` | 지정된 요소의 속성 값을 **설정**. 속성이 이미 있으면 기존 값을 갱신 (그렇지 않으면 지정된 이름과 값으로 새 속성이 추가) |
| `Element.removeAttribute()` | 요소에서 지정된 이름을 가진 속성 **제거** |

> 📌 **TIP**
> - `getAttribute()`는 HTML 초기값을, `.value`와 같은 프로퍼티는 현재 상태 값을 반환하니 주의하세요.
> - `setAttribute()`는 숫자나 boolean 값을 넣어도 모두 문자열로 변환하여 저장하니 타입에 주의하세요.

### 일반 속성 조작 실습
```html
<!-- element_manipulation.html -->
<a href="https://www.google.com/">google</a>
<script>
  const aTag = document.querySelector('a')
  console.log(aTag.getAttribute('href'))

  aTag.setAttribute('href', 'https://www.naver.com/')
  console.log(aTag.getAttribute('href'))

  aTag.removeAttribute('href')
  console.log(aTag.getAttribute('href'))
</script>
```
```console
https://www.google.com/
https://www.naver.com/
null
```

> 💡 **쉽게 이해하기** — 속성을 지운 뒤 `getAttribute`로 조회하면 에러가 아니라 **`null`** 이 나옵니다.

## HTML 콘텐츠 조작

### `textContent` property – 요소의 텍스트 콘텐츠를 표현
- HTML 태그를 완전히 제거하고 **순수한 텍스트 데이터만** 얻고 싶을 때 가장 유용합니다.
- 예) `<p>Hello <b>World</b></p>` ➔ textContent는 `'Hello World'`

### HTML 콘텐츠 조작 실습
```html
<!-- contents_manipulation.html -->
<h1 class="heading">DOM 조작</h1>
<script>
  const h1Tag = document.querySelector('.heading')
  console.log(h1Tag.textContent)

  h1Tag.textContent = '내용 수정'
  console.log(h1Tag.textContent)
</script>
```
```console
DOM 조작
내용 수정
```

## DOM 요소 조작

### DOM 요소 조작 메서드

| 메서드 | 설명 | 반환 |
|---|---|---|
| `document.createElement(tagName)` | 작성한 tagName의 HTML 요소를 **생성** | 생성한 요소 |
| `Node.appendChild()` | 한 Node를 특정 부모 Node의 자식 NodeList 중 **마지막 자식으로 삽입** | 추가된 Node 객체 |
| `Node.removeChild()` | DOM에서 자식 Node를 **제거** | 제거된 Node |

> 📌 **TIP**
> - `createElement`는 **메모리에만** 요소를 만들고, 실제로는 `appendChild`로 문서에 삽입해야 화면에 보입니다.
> - `removeChild`로 제거된 노드는 메모리에 남아있어, 변수에 담아두면 언제든지 재사용이 가능합니다.

### DOM 요소 조작 실습
```html
<!-- dom_manipulation.html -->
<div>
  <p>삭제될 문단</p>
</div>
<script>
  // 생성
  const h1Tag = document.createElement('h1')
  h1Tag.textContent = '제목'
  console.log(h1Tag)

  // 추가
  const divTag = document.querySelector('div')
  divTag.appendChild(h1Tag)
  console.log(divTag)

  // 삭제
  const pTag = document.querySelector('p')
  divTag.removeChild(pTag)
</script>
```

> 💡 **쉽게 이해하기 – 요소 추가 3단계**: ① `createElement`로 **만들고** ② `textContent` 등으로 **채우고** ③ `appendChild`로 **붙인다**. ③을 빼먹으면 화면에 아무것도 안 나옵니다. (교안 화면에 맞춰 연습장에서 바로 실행되도록 `div`와 `p`를 함께 적어 두었습니다.)

## style 조작

### `style` property – 해당 요소의 모든 style 속성 목록을 포함하는 속성

> 📌 **TIP**
> - `'style'` property 는 HTML 태그에 `style="…"` 속성을 직접 추가/수정하는 것과 같습니다.
> - 여러 스타일 변경은 가급적 **클래스(class) 활용**하는 것을 추천합니다.

### style 조작 실습
```html
<!-- style_property.html -->
<p>Lorem, ipsum dolor.</p>
<script>
  const pTag = document.querySelector('p')

  pTag.style.color = 'crimson'
  pTag.style.fontSize = '2rem'
  pTag.style.border = '1px solid black'
  console.log(pTag.style)
</script>
```
- 결과: 문장이 crimson 색, 2rem 크기, 검은 테두리로 표시되고, 콘솔에 `CSSStyleDeclaration {…}` 객체가 출력됨

> ⚠️ **헷갈리기 쉬운 점** — CSS의 `font-size`를 JavaScript에서는 `style.fontSize`(카멜 케이스)로 씁니다.

## 참고: DOM 속성 확인 Tip
- 개발자도구 → **Elements** → **Properties**
- 선택한 해당 요소의 모든 DOM 속성 확인 가능

## 참고: 용어 정리

### Node – DOM의 기본 구성 단위
DOM 트리의 각 부분은 Node라는 객체로 표현됨
- **Document Node** ⟹ HTML 문서 전체를 나타내는 노드
- **Element Node** ⟹ HTML 요소를 나타내는 노드 (예를 들어 `<p>`)
- **Text Node** ⟹ HTML 텍스트 (Element Node 내의 텍스트 컨텐츠를 나타냄)

### NodeList – DOM 메서드를 사용해 선택한 Node의 목록
- DOM 메서드를 사용해 선택한 Node의 목록
- 배열과 유사한 구조를 가짐
- **Index로만** 각 항목에 접근 가능
- JavaScript의 배열 메서드 **`forEach` 사용 가능**
- `querySelectorAll()`에 의해 반환되는 NodeList는 **DOM의 변경사항을 실시간으로 반영하지 않음**
  - DOM이 나중에 변경되더라도 이전에 이미 선택한 NodeList 값은 변하지 않음

### Element – DOM 트리에서 HTML 요소를 나타내는 특별한 유형의 Node
- Node의 하위 유형
- 예를 들어, `<p>`, `<div>`, `<span>`, `<body>` 등의 HTML 태그들이 Element 노드를 생성
- Node의 속성과 메서드를 모두 가지고 있으며 추가적으로 요소 특화된 기능(예: `className`, `innerHTML`, `id` 등)을 가지고 있음
- ➤ **모든 Element는 Node이지만, 모든 Node가 Element인 것은 아님**

> 💡 **쉽게 이해하기** — Node가 "모든 조각"이라면 Element는 그중 "태그 조각"입니다. 텍스트(Text Node)도 Node지만 태그가 아니므로 Element가 아닙니다.

### Parsing – 브라우저가 문자열을 해석하여 DOM Tree로 만드는 과정 (구문 분석, 해석)
- (교안 그림) PARSE → STYLE → LAYOUT 단계

## 정리: 다크 모드는 어떻게 만들까?

> 💡 버튼 클릭 한 번으로 웹 페이지에 변화를 일으키는 방법, 이제 우리는 그 해답을 알고 있습니다. 단 3단계면 우리도 다크 모드를 구현할 수 있습니다.
> 1. `querySelector`로 웹 페이지 전체(body)를 선택합니다.
> 2. `classList.toggle()`로 `'dark-mode'` 클래스를 동적으로 추가/제거합니다.
> 3. 미리 정의된 CSS 스타일에 따라 배경과 글자색이 즉시 변경됩니다.
>
> 이제 자바스크립트로 웹 페이지의 클래스를 제어하여, 사용자와 상호작용하는 동적인 디자인 변경을 손쉽게 구현할 수 있습니다. (버튼 클릭을 감지하는 방법은 [이벤트](09-events.html) 주제에서 배웁니다.)

## 핵심 정리

| 개념 | 설명 | 예시 |
|---|---|---|
| DOM | HTML 문서를 객체로 표현한 것 | `document.querySelector()` |
| querySelector | CSS 선택자로 요소 하나를 선택 | `document.querySelector('.heading')` |
| querySelectorAll | CSS 선택자로 요소 여러 개를 선택 | `document.querySelectorAll('p')` |
| textContent | 요소의 텍스트 내용을 조작 | `h1.textContent = '수정'` |
| classList | 요소의 클래스 목록을 제어 | `h1.classList.add('red')` |
| setAttribute | 요소의 속성 값을 설정 | `a.setAttribute('href', url)` |
| createElement | 새 HTML 요소를 메모리에 생성 | `document.createElement('h1')` |

## 교안 실습 문제
- DOM 선택: **3073.** DOM API - HTML 요소 선택과 출력 · **2955.** 할일 목록 만들기 - 요소 선택과 출력
- DOM 조작: **3074.** DOM API - HTML 속성 및 클래스 속성 조작 · **2953.** 포트폴리오 만들기 - DOM 조작 · **2956.** 할일 목록 만들기 - 속성 수정과 요소 삭제 · **2958.** Card 속성 조작 하기
