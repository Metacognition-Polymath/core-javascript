# 3. this

- 대부분 객체 지향언에서 this는 클래스로 생성한 인스턴스 객체를 의미(클래스에서만 사용할 수 있기 때문에 혼란의 여지가 없거나 적음)
- 하지만 자바스크립트에서 this는 어디에서든 사용할 수 있음
- 상황에 따라 this가 바라보는 대상이 달라짐
- 함수와 객체(메서드)의 구분이 느슨한 자바스크립트에서 this는 실질적으로 이 둘을 구분하는 거의 유일한 기능
- 이번장에서 다룰 내용
  - 상황별로 this가 어떻게 달라지는 지
  - 왜 그렇게 되즌지
  - 예상과 다른 대상을 바라보고 있을 경우 그 원인을 효과적으로 추적하는 방법

## 3-1. 상황에 따라 달라지는 this

- 자바스크립트에서 this는 기본적으로 실행컨텍스트가 생성될 때 결정 됨

  - 실행 컨텍스트는 함수를 호출할 때 생성
  - 즉, this는 함수를 호출할 때 결정된다.
    - 함수를 어떤 방식으로 호출하느냐에 따라 달라짐

- 상황별 this가 어떤 값을 보게 되는지 살펴보자 + 원인

### 3-1-1. 전역 공간에서의 this

- 전역공간에서 this는 전역 객체를 가리킵니다.
- `전역 컨텍스트`를 `생성하는 주체`가 `전역 객체`이기 때문
- `전역 객체` - `런타임 환경에 따라` 다른 이름과 정보를 가지고 있음
  - 브라우저 환경 -> 전역객체 : window
  - Node.js 환경 -> 전역 객체 : global

#### this와 관련은 없지만 전역공간에서 발생하는 특이한 성질

- `전역변수`를 선언하면 자바스크립트 엔진은 이를 `전역 객체의 프로퍼티로` 할당 함(window or global)
  - const는 해당 없음
  - var 를 이용해서 전역변수를 선언한 경우에만 해당
  - 더욱 var를 쓰면 안될 것 같다는 생각이 든다.

```js
// 예제 3-3. 전역변수와 전역객체(1) - 브라우저
var a = 1;
console.log(window.a); // 1
```

- 자바스크립트의 모든 변수는 사실 특정 객체의 프로퍼티로서 동작하기 때문
  - 특정 객체 : LexicalEnvironment(이하 L.E)
- 자바스크립트 는 변수를 수집해서 L.E의 프로퍼티로 저장
  - 이후 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환
  - 전역 컨텍스트의 경우 L.E는 전역객체를 그대로 참조

```js
// 예제 3-5 전역변수와 전역객체(3)
var a = 1;
delete window.a; // window.delete window.a; 와 같음
```

- var a 로 전역변수 선언한 것은 지울 수 없지만
- window.a 로 전역변수를 선언한 것은 delete로 지울 수 있음
- 자바스크립트가 var로 전역 변수로 설정하면 해당 프로퍼티의 configurable(변경 및 삭제 가능성)을 false로 정의함

### 3-1-2. 메서드로서 호출할 때 그 메서드 내부에서의 this

- 함수 vs 메서드
  - 함수를 실행하는 두 가지 방법 : 메서드 or 함수
  - 차이 : 독립성
  - 함수 : 그 자체로 독립적인 기능을 수행
  - 메서드 : 자신을 호출한 대상 객체에 관한 동작을 수행
- 자바스크립트는 상황별로 this 키워드에 다른 값을 부여하게 함으로써 이를 구현 함
- 메서드에 대한 오해
  - 객체 프로퍼티에 할당된 함수 : 반은 맞고 반은 틀림
    - 객체의 메서드로서 호출할 경우에만 메서드로 동작하고
    - 그렇지 않으면 함수로 동작

```js
// 예제 3-6. 함수로서 호출, 메서드로서 호출
var func = function (x) {
  console.log(this, x);
};
func(1); // this : window

var obj = {
  method: func,
};
obj.method(2); // this : obj
```

- 객체의 프로퍼티에 할당해서 호출하는 경웨 this가 달라짐
  - 구분 : 일반적으로 함수앞에 `.` 이 있는지 여부에 따라 간단하게 구분 가능
    - 유일한 예외 : 대괄호 표기법에 따른 경우에도 메서드로 호출한 것

```js
// 예제 3-7 메서드로서 호출 - 점 표기법, 대괄호 표기법
var obj = {
  method: function (x) {
    console.log(this, x);
  },
};
obj.method(1); // 메서드 호출 - 점 표기법
obj["method"](2); // 메서드 호출 - 대괄호 표기법
```

#### 메서드 내부에서의 this

- this에는 호출한 주체에 대한 정보가 담김
  - 점 표기법의 경우 마지막 점 앞에 명시된 객체가 this가 됨

```js
// 예제 3-8. 메서드 내부에서의 this
var obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};
obj.methodA(); // this : obj
obj.inner.methodB(); // this : inner
```

### 3-1-3. 함수로서 호출할 때 그 함수 내부에서의 this

#### 함수 내부에서의 this

- 어떤 함수를 함수로서 호출할 경우에는 this가 지정되지 않음 : 전역객체(window)
  - 자바스크립트를 개발에 참여한 개발자도 인정한 설계상의 오류

#### 메서드 내부함수에서의 this

```js
// 예제 3-9. 내부함수에서의 this
var obj1 = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc(); // this : window

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // this : obj2
  },
};
obj1.outer(); // this : obj1
```

- this 바인딩
  - 함수를 실행하는 당시의 주변환경(메서드 내부인지, 함수 내부인지 등)은 중요하지 않고
  - 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건

#### 메서드의 내부 함수에서의 this를 우회하는 방법

- ES5까지 this를 우회하는 방법(ES6의 화살표함수에선 불필요)
  - 변수를 활용 -> 예제 3-10

```js
// 예제 3-10. 내부함수에서의 this를 우회하는 방법
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc1 = function () {
      console.log(this);
    };
    innerFunc1(); // this : window

    var self = this; // self의 변수명은 아무거나 해도 상관 없음 - self가 가장 널리 쓰임
    var innerFunc2 = function () {
      console.log(self);
    };
    innerFunc2(); // this : outer
  },
};
obj.outer(); // outer의 바로 아래줄의 this : outer
```

#### this를 바인딩하지 않는 함수

- ES6에서 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 화살표 함수(arrow function)를 새로 도입함

```js
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc(); // this : outer - arrow function의 this는 상위 scope를 가리킴
  },
};
obj.outer();
```

- 그 밖에도 call, apply 등의 메서드를 활용해 함수를 호출할 때 명시적으로 this를 지정하는 방법이 있음 -> 3-2절에서 다룸

### 3-1-4. 콜백 함수 호출 시 그 함수 내부에서의 this

- 콜백 함수의 정의와 동작 원리 등에 대해선 다음 장(4장)에서 자세히 다룸
- 여기선 this가 어떤 값을 참조하는지만 간단히 확인하고 넘어감

* 콜백함수란?
  - 함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우,
  - 함수 A를 콜백함수라 합니다.

- 콜백함수에서 호출해도 this는 전역객체 이지만
- addEventListener의 콜백함수에서 this는 addEventListener가 붙은 (HTML)엘리먼트를 의미함

### 3-1-5. 생성자 함수 내부에서의 this

- 생성자 함수란?
  - 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수
  - 클래스를 통해 만든 객체 인스턴스를 만들 때 생성자가 호출 됨
  - 7장에서 자세히 다룰 예정

* 생성자 : 구체적인 인스턴스를 만들기 위한 일종의 틀

  - 해당 클래스의 공통 속성들이 미리 준비되어 있고
  - 구체적인 인스턴스 개성을 더해 개별 인스턴스를 만들 수 있음

* 자바스크립트는 함수에 생성자로서의 역할을 new 명령어로 동작시키게 할 수 있음
* 어떤 함수가 생성자 함수로서 호출된 경우(new + 함수) 내부에서의 this는 새로 만들 구체적인 인스턴스 자신이 됨

```js
// 예제 3-13. 생성자 함수
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7);
var nabi = new Cat("나비", 5);
console.log(choco, nabi);
```

## 3-2. 명시적으로 this를 바인딩하는 방법

- `addEventListener` 또는 `new + 함수` 같이 상식적으로 this에 전역객체가 할당될 것이라고 생각했지만
- 그렇지 않은 경우엔 3-2에 나오는 방법들 중 하나를 사용했을 것이라 추측할 수 있음

### 3-2-1. call 메서드

```js
Function.prototype.call(thisArg, funcArg1, funcArg2, ...);
```

- func1.call(`this에 바인딩할 객체`, func1의 arg1, function의 arg2, ...);

```js
// 예제 3-14. call 메서드
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // window, 1, 2, 3;
func.call({ x: 1 }, 1, 2, 3); // {x : 1}, 1, 2, 3;
```

- call메서드의 첫 번째 파리미터로 전달한 것이 this에 바인딩되고 나머지는 순차적으로 func의 파라미터로 전달 됨

### 3-2-2. apply 메서드

```js
Function.prototype.apply(thisArg, [funcArg1, funcArg2, ...]);
```

- 3-2-1의 call과 동일 하지만 funcArg1를 apply의 두번째 파라미터의 배열로 받아서 처리한다는 차이가 있음

```js
// 예제 3-16. apply 메서드
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // window, 1, 2, 3;
func.call({ x: 1 }, [1, 2, 3]); // {x : 1}, 1, 2, 3;
```

### 3-2-3. call / apply 메서드의 활용

- 객체를 배열로 변환하는 것은 Object의 keys, values, entries 메서드를 사용하는 것이 더 낫다.
  - https://ko.javascript.info/keys-values-entries

```js
// 예제 3-20. ES6의 Array.from 메서드
var obj = {
  a: "aa",
  b: "bb",
  c: "cc",
};

var arr = Array.from(obj);
console.log(arr);
```

\*\* [Array.from](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

- Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체를 만듭니다.

```js
console.log(Array.from("foo"));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// expected output: Array [2, 4, 6]
```

```js
// 예제 3-24. 최대값, 최소값 구하기
const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min); // 45, 3
```

### 3-2-4. bind 메서드

```js
Function.prototype.bind(thisArg);
```

- ES5에서 추가 됨
- call, apply와 달리 this에 할당할 객체만 전달하면 this바인딩이 된 함수를 리턴함

```js
var func = function (a, b) {
  console.log(this, a, b);
};
func(1, 2); // window, 1, 2

var bindFunc = func.bind({ x: 1 });
bindFunc(1, 2); // { x: 1 }, 1, 2
```

#### name 프로퍼티

- 그 함수의 이름을 리턴하는 함수 고유 프로퍼티

```js
// 예제 3-26. bind 메서드 - name 프로퍼티
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 4, 5); // bind 할 때 parameter를 전달하지 않아도 되지만 전달해도 된다.
console.log(func.name); // func
console.log(bindFunc.name); // bound func
```

- Function.bind로 bind한 함수는 name 프로퍼티가 `bound functionName`으로 바뀐다.
- call이나 apply 보다 코드를 추적하기 더 수월 함

#### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

- 3-1-3에서 메서드의 내부함수에서 메서드의 this를 그대로 바라보게 하기 위한 방법을 소개(self 등의 변수를 활용한 우회법)
- call, apply, bind 메서드를 이용하면 더 깔끔하게 처리할 수 있음

```js
// 예제 3-27. 내부함수에 this 전달 - call vs bind
// 1) call메서드를 이용한 내부함수에 this 전달
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this);
  },
};
obj.outer();

// 2) bind 메서드를 이용한 내부함수에 this 전달
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
obj.outer();
```

```js
// 예제 3-28. bind 메서드 - 내부함수에 this 전달
var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    ["a"].forEach(this.logThis);
    setTimeout(this.logThis, 300); // this : 전역 객체(global or window)
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 500); // this : obj
  },
};
obj.logThisLater1();
obj.logThisLater2();
```

### 3-2-5. 화살표 함수의 예외사항

- 화살표함수 내의 this는 아에 없고 접근하고자 하면 스코프체인상 가장 가까운 this에 접근하게 됨

```js
// 예제 3-29. 화살표 함수 내부에서의 this
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc(); // this : outer
  },
};
obj.outer();
```

- 화살표 함수를 사용하면 bind, call, apply 등으로 바인딩 하지 않아도 가장 가까운 this에 접근하게 된다.

### 3-2-6. 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

- 콜백함수 -> 4장에서 자세히 다룸
- 콜백함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체를 인자로 지정할 수 있는 경우가 있음
- 이러한 메서드의 thisArg값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있음
  - 주로 배열의 메서드(forEach, map 등)
  - Set, Map 등의 메서드에서도 일부 존재

```js
// 예제 3-30. thisArg를 받는 경우 예시 - forEach
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this); // 콜백함수의 this에 할당될 객체를 전달할 수 있음 - report를 전달함
  },
  average: function () {
    return this.sum / this.count;
  },
};
```

## 3-3. 정리

- 전역공간에서의 this는 전역객체(브라우저 : window, Node.js : global)
- 어떤 함수를 메서드로서 호출한 경우 this는 메서드 호출 주체를 참조
- 어떤 함수를 함수로서 호출한 경우 this는 전역 객체를 참조. 메서드 내부함수에서도 같음
- 생성자 함수(new 뒤에 오는 함수)에서의 this는 생성될 인스턴스를 참조
