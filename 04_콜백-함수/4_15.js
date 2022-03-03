// 예제 4-15. 비동기 작업의 동기적 표현(2) - Promise(2)
var addCoffee = function (name) {
  return function (prevName) { // 클로저 - 5장에서 자세히 다룸
    return new Promise(function (resolve) { // 클로저 - 5장에서 자세히 다룸
      setTimeout(function() {
        var newName = prevName ? (prevName + ', ' + name) : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    })
  }
}

addCoffee('에스프레소')()
  .then(addCoffee('아메리카노'))
  .then(addCoffee('카페모카'));