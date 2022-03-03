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