// 예제 4-16. 비동기 작업의 동기적 표현(3) - Generator
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ", " + name : name); // next 메서드로 전달한 parameter가 yield에서 리턴된다
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

var coffeeMaker = coffeeGenerator();

coffeeMaker.next();
