/* =========================================================
   교안 확인 문제 (1111 · 1112 · 1116 · 1117, 총 46문항)
   - answer: 정답 보기 번호 (0부터 시작)
   - explanation: 교안 해설
   - easy: 교안 내용을 바탕으로 한 풀이 (쉽게 이해하기)
   ========================================================= */
window.QUESTIONS = [
  /* ---------------- 1111 Javascript DOM ---------------- */
  {
    id: 'L1111-01', ref: '1111 확인문제 1', topic: '01-history', type: 'mc',
    question: 'JavaScript의 표준 명세 이름은 무엇인가요?',
    options: ['JScript', 'Mocha', 'ECMAScript', 'TypeScript'], answer: 2,
    explanation: 'JavaScript의 파편화를 막기 위해 ECMA 재단에서 만든 표준 언어 명세입니다.',
    easy: 'Mocha는 JavaScript의 첫 이름, JScript는 Microsoft가 IE 3.0에 넣은 유사 언어입니다. "표준(명세)"은 ECMAScript, "그 표준을 구현한 언어"가 JavaScript입니다.'
  },
  {
    id: 'L1111-02', ref: '1111 확인문제 2', topic: '02-variables', type: 'mc',
    question: '다음 중 변수명으로 사용할 수 없는 것은?',
    options: ['`_name`', '`$user`', '`function`', '`userName`'], answer: 2,
    explanation: 'function은 함수 선언 키워드로, 프로그래밍 언어가 예약해둔 단어이므로 변수명으로 쓸 수 없습니다.',
    easy: '식별자는 문자, `$`, `_`로 시작할 수 있으므로 `_name`, `$user`는 가능합니다. `for`, `if`, `function` 같은 예약어만 안 됩니다.'
  },
  {
    id: 'L1111-03', ref: '1111 확인문제 3', topic: '02-variables', type: 'mc',
    question: '변수 선언 시 기본적으로 사용을 권장하는 키워드는?',
    options: ['var', 'for', 'const', 'function'], answer: 2,
    explanation: 'const를 기본으로 사용하여 의도치 않은 재할당을 막고, 필요시에만 let을 사용합니다.'
  },
  {
    id: 'L1111-04', ref: '1111 확인문제 4', topic: '08-dom', type: 'mc',
    question: '웹 페이지(Document)를 객체로 표현한 모델은?',
    options: ['HTML', 'CSS', 'API', 'DOM'], answer: 3,
    explanation: 'DOM(Document Object Model)은 웹 페이지를 구조화된 객체로 제공하는 API입니다.'
  },
  {
    id: 'L1111-05', ref: '1111 확인문제 5', topic: '08-dom', type: 'mc',
    question: 'CSS 선택자와 일치하는 첫 번째 요소를 반환하는 메서드는?',
    options: ['`getElementById()`', '`querySelectorAll()`', '`getElementsByClassName()`', '`querySelector()`'], answer: 3,
    explanation: 'querySelector()는 제공된 선택자를 만족하는 첫 번째 element 객체를 반환합니다.',
    easy: '"All"이 붙지 않은 쪽이 한 개(첫 번째), 없으면 `null`을 반환합니다.'
  },
  {
    id: 'L1111-06', ref: '1111 확인문제 6', topic: '08-dom', type: 'mc',
    question: 'CSS 선택자와 일치하는 모든 요소를 NodeList로 반환하는 메서드는?',
    options: ['`querySelector()`', '`getElementsByTagName()`', '`querySelectorAll()`', '`getElementById()`'], answer: 2,
    explanation: 'querySelectorAll()은 제공된 선택자를 만족하는 모든 요소를 NodeList로 반환합니다.'
  },
  {
    id: 'L1111-07', ref: '1111 확인문제 7', topic: '08-dom', type: 'mc',
    question: '요소에 클래스를 추가하는 classList의 메서드는?',
    options: ['`toggle()`', '`remove()`', '`add()`', '`contains()`'], answer: 2,
    explanation: 'add()를 사용하여 지정한 클래스 값을 추가할 수 있습니다.',
    easy: 'toggle()은 "있으면 제거, 없으면 추가"이므로 항상 추가하는 메서드는 아닙니다.'
  },
  {
    id: 'L1111-08', ref: '1111 확인문제 8', topic: '08-dom', type: 'mc',
    question: '요소의 속성 값을 설정하는 메서드는?',
    options: ['`getAttribute()`', '`removeAttribute()`', '`hasAttribute()`', '`setAttribute()`'], answer: 3,
    explanation: 'setAttribute()를 사용하여 지정된 요소의 속성 값을 설정하거나 갱신합니다.'
  },
  {
    id: 'L1111-09', ref: '1111 확인문제 9', topic: '08-dom', type: 'mc',
    question: '요소의 순수한 텍스트 콘텐츠를 조작하는 속성은?',
    options: ['`innerHTML`', '`textContent`', '`innerText`', '`value`'], answer: 1,
    explanation: 'textContent는 HTML 태그를 제외한 순수한 텍스트 데이터만 가져오거나 설정합니다.',
    easy: '교안 예: `<p>Hello <b>World</b></p>`의 textContent는 태그가 빠진 `\'Hello World\'`입니다.'
  },
  {
    id: 'L1111-10', ref: '1111 확인문제 10', topic: '08-dom', type: 'mc',
    question: '새로운 HTML 요소를 메모리에 생성하는 메서드는?',
    options: ['`appendChild()`', '`createElement()`', '`removeChild()`', '`createTextNode()`'], answer: 1,
    explanation: 'createElement()는 요소를 생성하며, appendChild로 문서에 삽입해야 보입니다.'
  },
  {
    id: 'L1111-11', ref: '1111 확인문제 11', topic: '08-dom', type: 'mc',
    question: '생성한 요소를 특정 부모 요소의 마지막 자식으로 추가하는 메서드는?',
    options: ['`insertBefore()`', '`replaceChild()`', '`appendChild()`', '`prepend()`'], answer: 2,
    explanation: 'appendChild()는 한 노드를 특정 부모 노드의 자식 목록 중 마지막 자식으로 삽입합니다.'
  },
  {
    id: 'L1111-12', ref: '1111 확인문제 12', topic: '02-variables', type: 'mc',
    question: 'var 키워드의 특징이 아닌 것은?',
    options: ['재할당 가능', '재선언 가능', '블록 스코프', '호이스팅'], answer: 2,
    explanation: 'var는 함수 스코프를 가지며, let과 const가 블록 스코프를 가집니다.'
  },

  /* ---------------- 1112 Basic Syntax 01 ---------------- */
  {
    id: 'L1112-01', ref: '1112 확인문제 1', topic: '03-types-operators', type: 'mc',
    question: '다음 중 원시 자료형(Primitive type)이 아닌 것은?',
    options: ['Number', 'String', 'Array', 'undefined'], answer: 2,
    explanation: 'Array는 객체(Object)에 속하는 참조 자료형이며, 원시 자료형이 아닙니다.',
    easy: '참조 자료형 = Objects(Object, Array, Function). 나머지 Number, String, Boolean, null, undefined는 원시 자료형입니다.'
  },
  {
    id: 'L1112-02', ref: '1112 확인문제 2', topic: '03-types-operators', type: 'mc',
    question: 'null과 undefined에 대한 설명으로 **틀린** 것은?',
    options: ["null은 의도적인 '값 없음'을 의미한다.", 'undefined는 값이 할당되지 않았음을 의미한다.', "typeof null의 결과는 'null'이다.", 'null == undefined는 true이다.'], answer: 2,
    explanation: "JavaScript 초기 버전의 오류로 인해 typeof null은 'object'를 반환합니다.",
    easy: "초기 버전에서 객체 타입 태그가 000이었고, null도 모든 비트가 0이라 객체로 잘못 판별된 것이 하위 호환성 때문에 지금까지 유지됩니다. (`null == undefined`는 true, `null === undefined`는 false)"
  },
  {
    id: 'L1112-03', ref: '1112 확인문제 3', topic: '03-types-operators', type: 'mc',
    question: '`==`와 `===` 연산자의 주된 차이점은?',
    options: ['연산 속도', '타입 변환 여부', '반환 값의 타입', '객체 비교 가능 여부'], answer: 1,
    explanation: '==는 타입을 변환하여 비교하지만, ===는 타입까지 엄격하게 비교합니다.',
    easy: "`'1' == 1`은 true(타입을 맞춘 뒤 비교), `'1' === 1`은 false(타입이 달라서)입니다."
  },
  {
    id: 'L1112-04', ref: '1112 확인문제 4', topic: '03-types-operators', type: 'mc',
    question: '논리 연산자 중 단축 평가를 활용하는 코드는?',
    options: ['`true && false`', '`0 && 3`', '`4 & 7`', '`!true`'], answer: 1,
    explanation: '&& 연산자는 첫 피연산자가 거짓(0)이므로 뒤를 평가하지 않고 0을 반환합니다.',
    easy: '`&&`는 앞이 거짓이면 그 값을 바로 돌려주고 끝냅니다. 그래서 `0 && 3`의 결과는 `0`입니다. (`&` 하나는 논리 연산자가 아닙니다.)'
  },
  {
    id: 'L1112-05', ref: '1112 확인문제 5', topic: '04-control', type: 'mc',
    question: '삼항 연산자에 대한 설명으로 올바른 것은?',
    options: ['세 개의 피연산자를 가진다.', '항상 if문보다 가독성이 좋다.', '조건이 거짓일 때 첫 번째 표현식을 반환한다.', '반복문 내에서는 사용할 수 없다.'], answer: 0,
    explanation: '조건 ? 참일때_표현식 : 거짓일때_표현식 구조로 3개의 피연산자를 사용합니다.',
    easy: '교안: 복잡한 로직에서는 오히려 가독성이 떨어질 수 있어 "적절한 상황에서만" 사용합니다. 거짓이면 두 번째 표현식(expression2)을 반환합니다.'
  },
  {
    id: 'L1112-06', ref: '1112 확인문제 6', topic: '04-control', type: 'mc',
    question: "객체의 '키(key)'를 순회하기에 가장 적합한 반복문은?",
    options: ['for', 'while', 'for...in', 'for...of'], answer: 2,
    explanation: 'for...in은 객체의 열거 가능한 속성(키)에 대해 반복하는 데 사용됩니다.'
  },
  {
    id: 'L1112-07', ref: '1112 확인문제 7', topic: '04-control', type: 'mc',
    question: "배열의 '값(value)'을 순회하는 반복문은?",
    options: ['for', 'while', 'for...in', 'for...of'], answer: 3,
    explanation: 'for...of는 배열과 같은 반복 가능한 객체의 각 요소(값)를 순회하는 데 사용됩니다.',
    easy: '배열에 for...in을 쓰면 값이 아니라 인덱스가 문자열로 나오고 순서도 보장되지 않습니다.'
  },
  {
    id: 'L1112-08', ref: '1112 확인문제 8', topic: '05-functions', type: 'mc',
    question: '함수 선언식과 함수 표현식의 가장 큰 차이점은?',
    options: ['매개변수 개수', '반환 값 존재 여부', '선언 전 호출 가능 여부', '익명 함수 사용 가능 여부'], answer: 2,
    explanation: '함수 선언식은 호이스팅되어 선언 전에 호출 가능하지만, 함수 표현식은 변수가 TDZ에 있어 선언 전에 호출할 수 없습니다.'
  },
  {
    id: 'L1112-09', ref: '1112 확인문제 9', topic: '05-functions', type: 'mc',
    question: '임의의 수의 인자를 배열로 받는 매개변수 문법은?',
    options: ['기본 매개변수', '가변 매개변수', '나머지 매개변수', '전개 구문'], answer: 2,
    explanation: '나머지 매개변수(...rest)는 정해지지 않은 수의 인자들을 배열로 모아줍니다.',
    easy: '같은 `...`이라도 함수 정의(매개변수 자리)에 쓰면 "모으기"(나머지 매개변수), 함수 호출(인자 자리)에 쓰면 "펼치기"(전개 구문)입니다.'
  },
  {
    id: 'L1112-10', ref: '1112 확인문제 10', topic: '05-functions', type: 'mc',
    question: '화살표 함수로 옳게 축약된 것은?',
    options: ["`const arrow = name => { 'hello, ' + name }`", "`const arrow = name => 'hello, ' + name`", "`const arrow = (name) => return 'hello, ' + name`", "`const arrow = => 'hello, ' + name`"], answer: 1,
    explanation: '본문이 한 줄의 표현식이면 중괄호와 return을 동시에 생략할 수 있습니다.',
    easy: 'a)는 중괄호를 남기고 return만 빠져서 undefined를 반환, c)는 중괄호 없이 return만 남아 문법 오류, d)는 매개변수 자리가 비어 문법 오류입니다.'
  },

  /* ---------------- 1116 Basic Syntax 02 ---------------- */
  {
    id: 'L1116-01', ref: '1116 확인문제 1', topic: '06-objects', type: 'mc',
    question: 'this 키워드에 대한 설명으로 올바른 것은?',
    options: ['항상 전역 객체(window)를 가리킨다.', '함수가 선언될 때 가리키는 대상이 정해진다.', '메서드를 호출한 객체를 가리킨다.', '화살표 함수는 자신만의 this를 가진다.'], answer: 2,
    explanation: 'this는 함수를 호출하는 방법에 따라 결정되며, 메서드 호출 시에는 해당 메서드를 호출한 객체를 가리킵니다.',
    easy: '"누가 점(.)을 찍어 호출했는가?" → 점 앞의 객체가 this. 일반 함수 단순 호출은 전역 객체, 화살표 함수는 자신만의 this가 없습니다.'
  },
  {
    id: 'L1116-02', ref: '1116 확인문제 2', topic: '06-objects', type: 'mc',
    question: '키와 값의 변수명이 같을 때 사용하는 문법은?',
    options: ['단축 속성', '계산된 속성', '구조 분해 할당', '전개 구문'], answer: 0,
    explanation: '객체를 정의할 때, 키 이름과 값으로 쓰이는 변수 이름이 같다면 하나로 축약하여 사용할 수 있습니다.'
  },
  {
    id: 'L1116-03', ref: '1116 확인문제 3', topic: '06-objects', type: 'mc',
    question: '객체의 속성을 분해하여 변수에 할당하는 문법은?',
    options: ['단축 속성', '계산된 속성', '구조 분해 할당', 'Optional Chaining'], answer: 2,
    explanation: '객체의 속성을 여러 변수로 쉽게 추출할 수 있게 해주는 문법으로, 코드의 가독성을 높여줍니다.'
  },
  {
    id: 'L1116-04', ref: '1116 확인문제 4', topic: '06-objects', type: 'mc',
    question: '객체를 JSON 형식의 문자열로 변환하는 메서드는?',
    options: ['`JSON.parse()`', '`JSON.stringify()`', '`Object.toJSON()`', '`Object.toString()`'], answer: 1,
    explanation: 'JSON.stringify()는 JavaScript 값이나 객체를 JSON 문자열로 변환하는 역할을 합니다.',
    easy: 'stringify = "문자열(string)로 만든다", parse = "문자열을 해석해서 객체로 만든다".'
  },
  {
    id: 'L1116-05', ref: '1116 확인문제 5', topic: '07-arrays', type: 'mc',
    question: '배열의 가장 마지막에 요소를 추가하는 메서드는?',
    options: ['`pop()`', '`shift()`', '`unshift()`', '`push()`'], answer: 3,
    explanation: 'push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.'
  },
  {
    id: 'L1116-06', ref: '1116 확인문제 6', topic: '07-arrays', type: 'mc',
    question: '배열의 가장 앞에서 요소를 제거하는 메서드는?',
    options: ['`pop()`', '`shift()`', '`unshift()`', '`push()`'], answer: 1,
    explanation: 'shift() 메서드는 배열에서 첫 번째 요소를 제거하고, 제거된 그 요소를 반환합니다.',
    easy: '끝 = push(추가) / pop(제거), 앞 = unshift(추가) / shift(제거). 네 메서드 모두 원본 배열을 직접 수정합니다.'
  },
  {
    id: 'L1116-07', ref: '1116 확인문제 7', topic: '05-functions', type: 'mc',
    question: '콜백 함수에 대한 설명으로 가장 적절한 것은?',
    options: ['함수가 자기 자신을 다시 호출하는 함수', '다른 함수의 인자로 전달되는 함수', '여러 개의 함수를 하나로 묶는 함수', '반드시 비동기적으로 작동하는 함수'], answer: 1,
    explanation: '다른 함수의 인자로 전달되어, 특정 작업이 끝난 후 외부 함수 내에서 호출되는 함수입니다.',
    easy: '진동벨 비유: 진동벨(콜백)을 맡겨 두면 커피가 완성되는 "특정 시점"에 울립니다. 교안처럼 콜백은 setTimeout뿐 아니라 일반 함수(calculator 예제)와 forEach 같은 배열 메서드에서도 쓰이므로 "반드시 비동기"는 틀립니다.'
  },
  {
    id: 'L1116-08', ref: '1116 확인문제 8', topic: '07-arrays', type: 'mc',
    question: '배열의 각 요소에 대해 함수를 실행하지만, 아무것도 반환하지 않는 메서드는?',
    options: ['`map()`', '`filter()`', '`forEach()`', '`reduce()`'], answer: 2,
    explanation: 'forEach()는 각 요소에 대해 주어진 함수를 실행하지만, 항상 undefined를 반환합니다.'
  },
  {
    id: 'L1116-09', ref: '1116 확인문제 9', topic: '07-arrays', type: 'mc',
    question: '배열의 모든 요소에 함수를 적용한 결과로 새로운 배열을 만드는 메서드는?',
    options: ['`map()`', '`forEach()`', '`for...of`', '`Object.keys()`'], answer: 0,
    explanation: 'map()은 배열의 모든 요소에 함수를 적용하고, 그 결과들을 모아 새로운 배열로 반환합니다.'
  },
  {
    id: 'L1116-10', ref: '1116 확인문제 10', topic: '06-objects', type: 'mc',
    question: '객체의 모든 키(key)를 배열로 반환하는 메서드는?',
    options: ['`Object.keys()`', '`Object.values()`', '`Object.entries()`', '`object.keys()`'], answer: 0,
    explanation: 'Object.keys(obj)는 주어진 객체가 가진 속성들의 이름(키)을 문자열 배열로 반환합니다.',
    easy: 'd)는 소문자 `object`라서 틀립니다. keys → 키 배열, values → 값 배열, entries → [키, 값] 쌍의 배열.'
  },
  {
    id: 'L1116-11', ref: '1116 확인문제 11', topic: '06-objects', type: 'mc',
    question: 'Optional Chaining (`?.`)을 사용하는 주된 목적은?',
    options: ['속성이 없으면 에러를 발생시키기 위해', '중첩 객체의 속성을 에러 없이 안전하게 접근하기 위해', '여러 함수를 연달아 호출하기 위해', '중첩된 객체의 속성을 삭제하기 위해'], answer: 1,
    explanation: '참조가 null 또는 undefined일 때 에러 대신 undefined를 반환하여 코드를 간결하게 만듭니다.'
  },
  {
    id: 'L1116-12', ref: '1116 확인문제 12', topic: '06-objects', type: 'mc',
    question: '클래스로부터 새로운 객체 인스턴스를 생성할 때 사용하는 키워드는?',
    options: ['create', 'instance', 'new', 'this'], answer: 2,
    explanation: 'new 연산자는 클래스의 생성자(constructor)를 호출하여 새로운 객체 인스턴스를 생성합니다.'
  },

  /* ---------------- 1117 Controlling Event ---------------- */
  {
    id: 'L1117-01', ref: '1117 확인문제 1', topic: '09-events', type: 'mc',
    question: '특정 이벤트가 발생했을 때 실행되는 함수는?',
    options: ['이벤트 리스너', '이벤트 객체', '이벤트 핸들러', '이벤트 타입'], answer: 2,
    explanation: '이벤트 핸들러는 특정 이벤트 발생 시 호출되도록 작성된 콜백 함수입니다.',
    easy: '카페 비유: 주문 = 이벤트, 주문을 받는 키오스크 = 이벤트 리스너, 커피를 만드는 바리스타 = 이벤트 핸들러.'
  },
  {
    id: 'L1117-02', ref: '1117 확인문제 2', topic: '09-events', type: 'mc',
    question: 'DOM 요소에 이벤트 핸들러를 등록하는 메서드는?',
    options: ['`setEvent()`', '`handleEvent()`', '`onEvent()`', '`addEventListener()`'], answer: 3,
    explanation: 'addEventListener()는 특정 DOM 요소에 지정된 타입의 이벤트를 처리할 함수(핸들러)를 등록합니다.'
  },
  {
    id: 'L1117-03', ref: '1117 확인문제 3', topic: '09-events', type: 'mc',
    question: '한 요소의 이벤트가 부모 요소로 전파되는 현상은?',
    options: ['캡처링 (Capturing)', '버블링 (Bubbling)', '위임 (Delegation)', '호이스팅 (Hoisting)'], answer: 1,
    explanation: '이벤트가 가장 안쪽 요소에서 시작해 바깥쪽 부모 요소로 거슬러 올라가며 전파되는 현상입니다.'
  },
  {
    id: 'L1117-04', ref: '1117 확인문제 4', topic: '09-events', type: 'mc',
    question: '이벤트 핸들러에 자동으로 전달되는 첫 번째 인자는?',
    options: ['this', 'event 객체', 'target 요소', 'currentTarget 요소'], answer: 1,
    explanation: '이벤트 발생 시, 해당 이벤트에 대한 상세 정보를 담은 event 객체가 핸들러에 자동으로 전달됩니다.'
  },
  {
    id: 'L1117-05', ref: '1117 확인문제 5', topic: '09-events', type: 'mc',
    question: '`event.target`이 가리키는 대상은?',
    options: ['이벤트가 처음 발생한 요소', '이벤트 핸들러가 연결된 요소', '부모 요소', '최상위 document 객체'], answer: 0,
    explanation: 'event.target은 이벤트가 최초로 발생한 요소, 즉 이벤트의 실제 시작이 된 요소를 가리킵니다.'
  },
  {
    id: 'L1117-06', ref: '1117 확인문제 6', topic: '09-events', type: 'mc',
    question: '`event.currentTarget`이 가리키는 대상은?',
    options: ['이벤트가 처음 발생한 요소', '이벤트 핸들러가 연결된 요소', '자식 요소', '최상위 window 객체'], answer: 1,
    explanation: 'event.currentTarget은 이벤트 리스너가 실제로 연결되어 있는 요소, 즉 this와 동일한 대상을 가리킵니다.',
    easy: 'current = "지금 핸들러를 실행 중인 그 요소". 교안 예제에서 outerouter에만 핸들러를 달면 inner를 눌러도 currentTarget은 항상 outerouter입니다.'
  },
  {
    id: 'L1117-07', ref: '1117 확인문제 7', topic: '09-events', type: 'mc',
    question: '요소의 기본 동작을 막는 메서드는?',
    options: ['`stopAction()`', '`cancelEvent()`', '`preventDefault()`', '`stopPropagation()`'], answer: 2,
    explanation: 'event.preventDefault()는 a 태그의 링크 이동이나 form의 제출과 같은 기본 동작을 취소합니다.'
  },
  {
    id: 'L1117-08', ref: '1117 확인문제 8', topic: '09-events', type: 'mc',
    question: '버블링의 이점을 활용하는 주요 패턴은 무엇인가요?',
    options: ['여러 요소에 각각 핸들러 등록', '상위 요소에 핸들러 하나만 등록', '모든 요소에 preventDefault() 사용', '캡처링 단계에서 이벤트 처리'], answer: 1,
    explanation: '여러 하위 요소의 이벤트를 공통 상위 요소에서 한 번에 처리하여 효율성을 높일 수 있습니다.'
  },
  {
    id: 'L1117-09', ref: '1117 확인문제 9', topic: '09-events', type: 'mc',
    question: '버블링과 캡처링의 차이를 올바르게 설명한 것은?',
    options: ['캡처링은 하향 전파, 버블링은 상향 전파', '캡처링은 상향 전파, 버블링은 하향 전파', '버블링은 기본 동작을, 캡처링은 전파를 막음', '두 용어는 동일하며 실제 동작에 차이가 없음'], answer: 0,
    explanation: '캡처링은 부모에서 자식으로 하향식, 버블링은 자식에서 부모로 상향식으로 이벤트를 전달합니다.',
    easy: '버블링 = 물속 거품이 위로 올라가듯 안쪽 → 바깥쪽(상향). 캡처링은 그 반대(하향).'
  },
  {
    id: 'L1117-10', ref: '1117 확인문제 10', topic: '09-events', type: 'mc',
    question: '`event.target`과 `event.currentTarget`의 차이를 올바르게 설명한 것은?',
    options: ['target은 리스너 부착 요소, currentTarget은 이벤트 발생 요소', 'target은 이벤트 발생 요소, currentTarget은 리스너 부착 요소', 'target은 항상 부모 요소, currentTarget은 항상 자식 요소', '두 속성은 모든 상황에서 항상 동일한 요소를 가리킴'], answer: 1,
    explanation: 'target은 실제 이벤트 발생 요소를 의미하고, currentTarget은 리스너가 달린 요소(this와 동일한 대상)를 의미합니다.'
  }
];
