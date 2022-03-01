// 4-11. 콜백함수 내부의 this에 다른 값을 바인딩하는 방법 - bind메서드 활용
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func, 500); // undefined
setTimeout(obj1.func.bind(obj1), 1000); // obj1 - bind 메서드의 리턴값은 bind된 함수이다.

var obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1500); // obj2
