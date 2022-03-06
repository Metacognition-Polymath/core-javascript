// 생성자 함수 vs 함수

var test = function (name) {
  const _name = name;
  // this._test = name; // 이게 있으면 생성자 함수, 없으면 그냥 함수
};

var testConst = new test("tony"); // 함수 => {} <- Function도 Object를 상속 받은 듯
console.log("testConst", testConst);
var testFunc = test("tony"); // 함수의 실행 결과 값
console.log("testFunc", testFunc);
console.log("test", test);
