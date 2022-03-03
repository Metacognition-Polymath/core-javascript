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
  return new Promise(function (x) {
    setTimeout(function () {
    var name = prevName + '카페모카';
    console.log(name);
    resolve(name);
  }, 500);
  })
});

// Promise -> then or catch or finally