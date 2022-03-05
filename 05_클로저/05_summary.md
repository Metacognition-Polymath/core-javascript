# 5. 클로저

## 5.1 클로저의 의미 및 원리 이해

- 함수형 프로그래밍 언어에서 등장하는 보편적 특성 - 자바스크립트만의 특징은 아님
- 클로저

  - 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 - 자바스크립트 핵심 가이드
  - 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 - 러닝 자바스크립트
  - `함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수` - 자바스크립트 닌자 비급
  - `이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수` - 인사이드 자바스크립트
  - 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 - Head First Javascript Programming
  - 로컬 변수를 참조하고 있는 함수 내의 함수 - 자브스크립트 마스터북
  - `자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수` - 함수형 자바스크립트 프로그래밍

- MDN에 나와있는 정의

  - A closure is the combination of a function and the lexical environment within which that function was declared.
  - 클로저는 함수와 그 함수가 선언된 당시의 lexical environment의 상호관계에 따른 현상
    - lexical environment : 실행 컨텍스트의 구성 요소 중 outerEnvironmentReference

- LexicalEnvironment의 environmentRecord와 outerEnvironmentReference에 의해 변수의 유효범위인 스코프가 결정되고 스코프 체인이 가능해짐

- 클로저 : 어떤 함수에서 선언한 변수를 참조하는 내부함수에서 계속해서 참조할 수 있는 현상

```js
// 예제 5-3. 외부 함수의 변수를 참조하는 내부 함수
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};

const inner1 = outer();
console.log(inner1());
console.log(inner1());
```

- inner 함수의 실행 시점에는 outer 함수는 이미 실행이 종료된 상태인데 outer 함수의 LexicalEnvironment에 어떻게 접근할 수 있는 걸까?

  - `가비지 컬렉터의 동작 방식 때문`
    - 가비지 컬렉터는 `어떤 값을 참조하는 변수가 하나라도 있다면` `그 값은 수집 대상에 포함시키지 않음`
    - 이전엔 LexicalEnvironment 전부를 (GC)가비지 컬렉션 하지 않았으나, 2019년 기준 크롬이나 Node.js 등에서 사용 중인 V8엔진의 경우 내부함수에서 실제로 사용하는 변수만 남겨두고 나머지는 GC하도록 최적화 됨

- 외부함수에서 내부함수를 return해서 그것을 받아서 사용할 때만 클로저 현상이 있는 것은 아님
  - e.g.,
    - setInterval or setTimeout
    - addEventListener 등

## 5-2. 클로저와 메모리 관리

- 클로저에서 가비지 컬렉션이 되지 않는 것은 개발자의 의도이기 때문에 메모리 누수라는 표현은 맞지 않다.
- 더 이상 필요없어지는 경우에 참조 카운터를 0으로 만듦으로써 메모리 회수를 도울 수 있다.

```js
// 예제 5-5. 클로저의 메모리 관리
// var로 함수를 선언하는 경우는 없기 때문에 이 예시는 사용될 수 없을 것 같다.
// (1) inner함수 return한 경우 클로저 메모리 해제
var outer = (function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
})();
console.log(outer());
console.log(outer());
outer = null;

// (2) setInterval에 의한 클로저의 메모리 해제
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
});
```

## 5-3. 클로저 활용 사례

### 5-3-1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

- 예제 5-6

```js
const fruits = ["apple", "banana", "peach"];
const $ul = document.createElement("ul");

fruits.forEach((fruit) => {
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", () => {
    alert("your choice is " + fruit); // addEventListener 의 callback에서 fruit를 사용하고 있으므로 계속 참조
  });
  $ul.appendChild($li);
});

const body = document.querySelector("body");
body.appendChild($ul);
```

#### 클로저 - 고차함수

- 함수형 프로그래밍에서 자주 쓰임

```js
const fruits = ["apple", "banana", "peach"];
const $ul = document.createElement("ul");

const alertFruitBuilder = (fruit) => () => {
  alert("your choice is " + fruit);
};

fruits.forEach((fruit) => {
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit)); // 고차함수에 fruit를 parameter로 전달하면서 클로저 현상 발생(메모리 유지)
  $ul.appendChild($li);
});

const body = document.querySelector("body");
body.appendChild($ul);
```

- alertFruitBuilder : 함수가 다시 함수를 반환하려는 것을 표현하기 위한 이름으로 빌더를 사용

### 5-3-2. 접근 권한 제어(정보 은닉)

- js가 함수에서 private 필드를 지원하지 않지만 클로저로 구현 가능
- closure의 사적적 의미 : 닫혀있음, 폐쇄성, 완결성
- closure로 일부로 은닉하려하기 보단 class를 사용하는 게 나을 것 같다.
  - 이렇게 할 수도 있다는 것만 알고 넘어가자

### 5-3-3. 부분 적용 함수
