# 7. 클래스

- 자바스크립트는 프로토타입 기반 언어라서 '상속' 개념이 존재하지 않음

  - 비슷하게 흉내내는 여러 기법들이 탄생
    - 결국 ES6에 클래스 문법이 추가 됨

- ES6의 클래스에서도 일정 부분은 프로토타입을 활용하고 있음

  - ES5 체제에서 클래스를 흉내내기 위한 구현 방식을 학습하는 것은 의미가 있음

- ES5에서 클래스를 어떻게 흉내냈는지 알아보는 것 같다.

## 7-1. 클래스와 인스턴스의 개념 이해

- 클래스(class) : 계급, 집단, 집합 등

  - 음식 -> 과일 -> 사과
  - 상위 개념 -> 하위 개념
  - 음식 : 상위(superior) 개념 : 상위 클래스(superclass)
    - `먹을 수 있다`
  - 과일 : 하위(subordinate) 개념 : 하위 클래스(subclass)
    - 먹을 수 있다 + `나무에서 열린다`

- 인스턴스 : 클래스의 속성을 지니는 실존 개체

- 현실에선 하나의 개체가 여러 클래스의 인스턴스 일 수 있음
  - e.g., 나 : 남성 + 직장인 + 한국인
    - `나`라는 개체(인스턴스) = `남성`클래스 + `직장인`클래스 + `한국인`클래스
- 그러나 프로그래밍에선 접근 방식이 정반대
  - 사용자가 여러개의 클래스를 정의하고
  - 클래스를 바탕으로 인스턴스를 만들 때 하나의 클래만을 바탕으로 만들어짐

## 7-2 자바스크립트의 클래스

- 상속 : 프로토타입 체이닝에 의한 참조

![그림 7-4](./그림7-4.png)

- 그림 7-4.
  - [출처](https://velog.io/@jindol/%EC%BD%94%EC%96%B4-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-07.-%ED%81%B4%EB%9E%98%EC%8A%A4-ex8c9yzg)
- 프로토타입에 의한 메서드는 프로토타입 메서드라 부르자

```js
// 예제 7-1. 스틱 메드, 프로토타입 메드

// 생성자
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// (프로토타입) 메서드
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// 스태틱 메서드
Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea()); // 12
console.log(rect1.isRectangle(rect1)); // Error
console.log(Rectangle.isRectangle(rect1)); // true
```

- 프로토타입이 아닌 생성자 함수에 직접 프로퍼티를 할당하면 스태틱 메서드(프로퍼티)가 되고

  - 이것은 인스턴스에선 사용할 수 없고 생성자함수를 통해서만 사용할 수 있음

- 프로그래밍 언에서의 클래스는 사용하기에 따라 `추상적 개념`일 수도 있고 `구체적인 개체`가 될 수도 있다
  - 추상적 개념일 때 : 사용할 메서드 등을 정의한 `틀`의 역할을 담당하는 목적을 가질 때
  - 구체적인 개체일 때 : 클래스 자체의 스태틱 메서드를 호출할 때 (직접 접근해야만 사용 가능)

## 7-3. 클래스 상속(ES5)

- 가볍게 이해만 하고 넘어가기
- 자바스크립트의 클래스(ES6)는 7-4절에서 다시 소개함

### 7-3-1. 기본 구현

- ES5에서 클래스 상속을 흉내
- 자바스크립트에서 상속을 구현 => 프로토타입 체이닝을 잘 연결한 것(ES6도 마찬가지)

```js
// 예제 7-7 Rectangle을 상속하는 Square 클래스
var Square = function (width) {
  Rectangle.call(this, width, width); // square 생성자 함수에서 Rectangle에 square 생성자 함수를 바인딩하고 width를 width, height에 각각 전달
};
Square.prototype = new Rectangle(); // Square.prototype = { width:undefined, height: undefined }
```

- 클래스에 있는 값이 인스턴스에 영향을 줄 수 있는 구조라는 동일한 문제를 가지고 있음

- 하위 클래스로 삼을 생성자 함수의 prototype에 상위 크래스의 인스턴스를 부여하는 것만으로도
  기본적인 메서드 상속은 가능하지만
  다양한 문제가 발생할 여지가 있어서 구조적으로 안전성이 떨어집니다

### 7-3-2. 클래스가 구체적인 데이터를 지니지 않게 하는 방법

- 방법 1 : 프로퍼티들을 일일이 지우고 더는 새로운 프로퍼티를 추가할 수 없게 하는 것

```js
delete Square.prototype.width;
delete Square.prototype.height;
Object.freeze(Square.prototype);
```

- 방법 2 : SubClass의 prototype에 직접 SuperClass의 인스턴스를 할당하는 대신,
  아무런 프로퍼티를 생성하지 않은 `빈 생성자 함수(Bridge)`를 하나 더 만들어서 그 prototype이 `SuperClass의 prototype`을 바라보게 한 다음,
  `SubClass의 prototype`에는 `빈 생성자 함수(Bridge)의 인스턴스`를 할당

  - 더글라스 크락포드가 제시, 대중적으로 널리 알려진 방법

- 방법 3 : Object.create을 이용한 방법
  - SubClass의 prototype의 `__proto__`가 SuperClass의 prototype을 바라보되, SuperClass의 인스턴스가 되지 않음

```js
// (...생략)
Square.prototype = Object.create(Rectangle.prototype);
Object.freeze(Square.prototype);
// (...생략)
```

#### 클래스 상속 및 추상화를 흉내내기 위한 기본적인 접근 방법

- SubClass.prototype의 `__proto__`가 SuperClass.prototype을 참조하고
- SubClass.prototype에는 불필요한 인스턴스 프로퍼티가 남아있지 않으면 된다

### 7-3-3 constructor 복구하기

- 위 세 가지 방법 모두 기본적인 상속에는 성공했지만 SubClass 인스턴스의 constructor는 여전히 SuperClass를 가리키는 상태
- SubClass인스턴스에는 constructor가 없고, SubClass.prototype에도 없는 상태
- 따라서 SubClass.prototype.constructor가 원래의 SubClass를 바라보도록 해주면 됨

### 7-3-4 상위 클래스에의 접근 수단 제공

- 하위 클래스의 메서드에서 상위 클래스의 메서드 실행결과를 바탕으로 추가적인 작업을 수행하고 싶을 때

  - SuperClass.prototype.method.apply(this, arguments) 로 해결하는 것은 상당히 번거롭고 가독성도 떨어짐

- super 흉내내기
  - 예제 생략 - 어차피 ES6의 클래스를 사용하는게 훨씬 낫기 때문

## 7-4 ES6의 클래스 및 클래스 상속

- ES5체계의 생성자 함수 및 프로토타입과 ES6의 클래스 문법을 비교하며 소개
- 이 책에선 ES6의 기능을 자세히 다루지 않음
- ES5 체계에서 추구하던 자바스크립트 클래스(프로토타입)의 방향성을 재확인하는 목적으로만 간략히 다룸

```js
// 예제 7-15. ES5와 ES6의 클래스 문법 비교
// ES5
var ES5 = function (name) {
  this.name = name;
};
ES5.staticMethod = function () {
  return this.name + " staticMethod";
};
ES5.prototype.method = function () {
  return this.name + " method";
};
var es5Instance = new ES5("es5");

// ES6
var ES6 = class {
  constructor(name) {
    this.name = name;
  }
  static staticMethod() {
    return this.name + " staticMethod";
  }
  method() {
    return this.name + " method";
  }
};
var es6Instance = new ES6("es6");
```

```js
// 예제 7-16 ES6의 클래스 상속
var Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  constructor(width) {
    super(width, width);
  }
  getArea() {
    console.log("size is :", super.getArea());
  }
};
```

## 7-5 정리

- ES5에서 프로토타입으로 클래스를 흉내냈지만
- ES6에서 클래스가 정식으로 도입되었고 그 기저엔 프로토타입이 있다.

## 7-6 마치며

- 클래스는 자바스크립트에서 주력으로 사용하지 않는 경우가 많기 때문에 핵심을 관통하는 내용은 아님
- 그럼에도 이 장이 별도의 장으로 추가된 이유는
  - 이 책 전반에 대한 학습 정도를 측정하기 적합한 수단이라는 판단 때문
  - this, 클로저, 프로토타입 등 지금까지 다룬 내용들 상당 부분이 녹아 들어있어서
- 화이팅 !
