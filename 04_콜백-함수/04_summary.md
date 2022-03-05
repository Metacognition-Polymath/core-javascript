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
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      function (name) {
        coffeeList += ", " + name;
        console.log(coffeeList);

        setTimeout(
          function (name) {
            coffeeList += ", " + name;
            console.log(coffeeList);
          },
          1000,
          "에스프레소"
        );
      },
      1000,
      "아메리카노"
    );
  },
  1000,
  "카페모카"
);
```

```js
// 예제 4-13 콜백 지옥 해결 - 기명함수로 변환
var coffeeList = "";

var addEspresso = function (name) {
  coffeeList += name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, "아메리카노");
};

var addAmericano = function (name) {
  coffeeList += name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, "카페모카");
};

var addMocha = function (name) {
  coffeeList += name;
  console.log(coffeeList);
};

setTimeout(addEspresso, 500, "에스프레소");
```

#### 비동기적인 일련의 작업을 동기적인 것 처럼 보이게끔 처리해주는 장치들

- Promise : ES6에서 추가 됨
- async/await : ES2017에서 추가 됨

```js
// 예제 4-14. 비동기 작업의 동기적 표현(1) - Promise(1)
new Promise(function (resolve) {
  setTimeout(function () {
    var name = "에스프레소";
    console.log(name);
    resolve(name);
  }, 500);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + "아메리카노";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + "카페모카";
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

```js
// 예제 4-15. 비동기 작업의 동기적 표현(2) - Promise(2)
var addCoffee = function (name) {
  return function (prevName) {
    // 클로저 - 5장에서 자세히 다룸
    return new Promise(function (resolve) {
      // 클로저 - 5장에서 자세히 다룸
      setTimeout(function () {
        var newName = prevName ? prevName + ", " + name : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};

addCoffee("에스프레소")()
  .then(addCoffee("아메리카노"))
  .then(addCoffee("카페모카"));
```

```js
// 예제 4-16. 비동기 작업의 동기적 표현(3) - Generator
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ", " + name : name);
  }, 500);
};

var coffeeGenerator = function* () {
  var espresso = yield addCoffee("", "에스프레소"); // '' == false
  console.log(espresso);
  var americano = yield addCoffee(espresso, "아메리카노");
  console.log(americano);
  var mocha = yield addCoffee(americano, "카페모카");
  console.log(mocha);
};

var coffeeMaker = coffeeGenerator(); // Generator 함수를 실행하면 Iterator가 반환 // Iterator는 next라는 메서드를 가지고 있음

coffeeMaker.next();
```

- ES6의 Generator를 이용
- Generator 함수를 실행하면 Iterator가 반환
  - Iterator는 next라는 메서드를 가지고 있음
    - next 메서드 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춤
    - 이후 다시 시작할 때는 멈췄던 부분부터 시작해서 그 다음에 등장하는 yield에서 함수의 실행을 멈춤
- 비동기 작업이 완료되는 시점마다 next 메서드를 호출하면 Generator 함수 내부의 소스가 위에서부터 아래로 순차적으로 진행 됨

<details>
<summary>Generator.prototype.next</summary>

```js
// Syntax
next(value);
```

Copy to Clipboard
Parameters
value
The value to send to the generator.

The value will be assigned as a result of a yield expression. For example, in variable = yield expression, the value passed to the .next() function will be assigned to variable.

next 메서드의 parameter로 전달한 것은 yield에서 반환된다.

참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next

</details>

```js
// 예제 4-17 비동기 작업의 동기적 표현(4) - Promise + async/await
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 500);
  });
};

var coffeeMaker = async function () {
  var coffeeList = "";
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? "," : "") + (await addCoffee(name));
  };

  await _addCoffee("에스프레소");
  console.log(coffeeList);
  await _addCoffee("아메리카노");
  console.log(coffeeList);
  await _addCoffee("카페모카");
  console.log(coffeeList);
};

coffeeMaker();
```

- add

#### Promise

- 자바스크립트 비동기 처리에 사용되는 객체

```ts
var Promise: PromiseConstructor
new <any>(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) => Promise<any>
```

- Creates a new Promise.
- @param executor

  - A callback used to initialize the promise.
  - This callback is passed two arguments:
    - a resolve callback used to resolve the promise with a value or the result of another promise,
    - and a reject callback used to reject the promise with a provided reason or error.

- executor라는 함수를 생성자로 받고
  - executor 함수는 resolve와 reject함수를 parameter로 받는데
    - 비동기 함수가 성공적으로 실행되면 resolve가 실행되고
    - 실패하면(에러발생) reject가 실행

#### Promise 실제 예제 - XMLHttpRequest 를 이용해서 이미지 불러오기

- https://github.com/mdn/js-examples/blob/master/promises-test/index.html

#### Promise & async / await 결론

- await의 return은 Promise 인스턴스의 then - 비동기 로직이 성공한 경우 - 으로 전달되는 parameter와 같다.
- Promise 생성자로 전달하는 executor의 resolve에 전달하는 parameter는 비동기 로직이 성공한 경우 then의 parameter로 전달된다
  - `executor 안`에서 `비동기 로직`이 있어야 한다.
  - async/await의 예외 처리는 try/catch로 한다.

## 4-6. 정리

- 콜백 함수는 다른 코드에 인자를 넘겨줌으로써 그 제어권도 함께 위임한 함수
- 제어권을 넘겨받은 코드는 다음과 같은 제어권을 가짐
  - 1. 콜백함수를 호출하는 시점을 스스로 판단해서 실행
  - 2. 코랙함수를 호출할 때 인자로 넘겨줄 값들 및 그 순서가 정해져 있음.
    - 이 순서를 따르지 않고 코드를 작성하면 엉뚱한 결과를 얻게 됨
  - 3. 콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우도 있음.
    - 정하지 않은 경우엔 전역객체를 바라봄
    - 사용자 임의로 this를 바꾸고 싶을 경우 bind 메서드를 활용
- 어떤 함수에 인자로 메서드를 전달하더라도 이는 결국 함수로서 실행 됨 - this에 전역객체 할당
- 비동기 제어를 위해 콜백 함수를 사용하다 보면 콜백 지옥에 빠지기 쉬움
  - 콜백지옥에서 벗어 나는 방법
    - Promise
    - Generator
    - async/await 등
