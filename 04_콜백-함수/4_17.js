// 예제 4-17 비동기 작업의 동기적 표현(4) - Promise + async/await
var addCoffee = function (name) {
  // 원래 책에 있는 예제 코드
  // return new Promise(function (resolve) {
  //   setTimeout(function () {
  //     resolve(name); // resolve(name) => .then()으로 전달 됨 => then ~= await => await의 리턴값으로 전달 됨
  //   }, 500);
  // });

  // 1차 시도
  // const resolveFunc = (name) => {
  //   setTimeout(() => {
  //     return name; // resolve(name) => .then()으로 전달 됨 => then ~= await => await의 리턴값으로 전달 됨
  //   }, 500);
  // };
  // const executor = (name) => (resolve, reject) => {
  //   return resolve(name);
  // };
  // return new Promise(executor(name));

  // // 2차 시도 - 성공
  const executor = (resolve, reject) => {
    setTimeout(() => {
      resolve(name); // 비동기 로직 성공 시 then으로 name이 전달 됨 == await의 리턴값으로 전달 됨
    }, 500);
  };
  return new Promise(executor);
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
