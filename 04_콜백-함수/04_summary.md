# 4. 콜백함수

## 4-1. 콜백 함수(callback function)란?

- 다른 코드의 인자로 넘겨주는 함수

  - 제어권을 넘겨줌

- callback : 되돌아 호출해달라

  - call : 부르다, 호출하다
  - back : 뒤돌아오다, 되돌다

- e.g., 특정 조건일 때 함수 X가 함수 Y를 실행

## 4-2. 제어권

### 4-2-1. 호출 시점

```js
// 예제 4-2. 콜백 함수 예제 setInterval
var count = 0;
var cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);
```

- cbFunc의 제어권을 넘겨받은 setInterval은 cbFunc을 특정조건(300ms 마다)에 실행

### 4-2-2. 인자

```js
// 예제 4-3. 콜백 함수 예제 Array.prototype.map
var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});
console.log(newArr);
```

### 4-2-3. this

- 3-1-4에서 콜백 함수도 함수이기 때문에 기본적으로는 this가 전역객체를 참조하지만,
- 제어권을 넘겨받은 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.
- this 바인딩 필요

### 4-3. 콜백 함수는 함수다

- 별다른 조치가 없다면 this는 전역객체를 바라본다.

### 4-4. 콜백 함수 내부의 this에 다른 값 바인딩하기

- 콜백함수 내부의 this가 전역객체가 아닌 제어권을 가진 객체(함수)를 바라보게 하고 싶다면?
- this를 다른 변수에 담아 콜백함수로 활용할 함수에서 this대신 그 변수를 사용(클로저로 만드는 방식)

```js
// 예제 4-8. 콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식
var obj1 = {
  name: "obj1",
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 1000);
```

- 번거로움, this를 않쓰는 편이 더 낫다

```js
// 예제 4-10. 예제 4-8의 func 함수 재활용
var obj2 = {
  name: "obj2",
  func: obj1.func,
};

var callback2 = obj2.func();
setTimeout(callback2, 1000);

var obj3 = { name: "obj3" };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 1500);
```

- 여전히 4-8의 self에 this를 넣는 과정이 불편하긴 함

```js
// 4-11. 콜백함수 내부의 this에 다른 값을 바인딩하는 방법 - bind메서드 활용
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func.bind(obj1), 1000);

var obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1500);
```

## 4-5. 콜백 지옥과 비동기 제어
- 콜백지옥 : 콜백함수를 익명함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들어지는 현상
- 비동기 vs 동기
  - 동기 : 현재 실행 중인 코드가 완료된 후에 다음 코드를 실행하는 방식
    - CPU의 계산에 의해 즉시 처리가 가능한 코드는 동기적인 코드
  - 비동기 : 현재 실행중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어감
    - 사용자의 요청에 의해 특정 시간이 경과되기 전까지 보류하거나 : setTimeout
    - 사용자의 직접적인 개입이 있을 때 비로소 어떤 함수를 실행하도록 대기한다거나 : addEventListener
    - 웹 브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 어떤 함수를 실행하도록 대기 : XMLHttpRequest
  - 현대 자바스크립트는 웹 복잡도가 높아진 만큼 비동기적인 코드의 비중이 예전보다 훨씬 높아진 상황
    - 콜백 지옥에 빠지기 쉬워짐

```js
// 예제 4-12 콜백 지옥 예시
setTimeout(function (name) {
  var coffeeList = name;
  console.log(coffeeList);

  setTimeout(function (name) {
    coffeeList += ', ' + name;
    console.log(coffeeList);

    setTimeout(function (name) {
      coffeeList += ', ' + name;
      console.log(coffeeList);
    }, 1000, '에스프레소');
  }, 1000, '아메리카노');
}, 1000, '카페모카');
```

```js
// 예제 4-13 콜백 지옥 해결 - 기명함수로 변환
var coffeeList = '';

var addEspresso = function (name) {
  coffeeList += name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, '아메리카노');
}

var addAmericano = function (name) {
  coffeeList += name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, '카페모카');
}

var addMocha = function (name) {
  coffeeList += name;
  console.log(coffeeList);
}

setTimeout(addEspresso, 500, '에스프레소');
```

#### 비동기적인 일련의 작업을 동기적인 것 처럼 보이게끔 처리해주는 장치들
- Promise : ES6에서 추가 됨
- async/await : ES2017에서 추가 됨

```js
// 예제 4-14. 비동기 작업의 동기적 표현(1) - Promise(1)
new Promise(function (resolve) {
  setTimeout(function () {
    var name = '에스프레소';
    console.log(name);
    resolve(name);
  }, 500);
}).then(function (prevName) {
  return new Promise(function (resolve) {
    setTimeout(function () {
    var name = prevName + '아메리카노';
    console.log(name);
    resolve(name);
  }, 500);
  })
}).then(function (prevName) {
  return new Promise(function (resolve) {
    setTimeout(function () {
    var name = prevName + '카페모카';
    console.log(name);
    resolve(name);
  }, 500);
  })
});
```

```js

```