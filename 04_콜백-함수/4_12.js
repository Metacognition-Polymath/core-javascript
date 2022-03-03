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