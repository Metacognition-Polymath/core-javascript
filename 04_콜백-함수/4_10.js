// 예제 4-8
var obj1 = {
  name: "obj1",
  func: function () {
    var self = this;
    return function () {
      console.log(self.name); // obj1 obj2 obj3
      // console.log(obj1.name); // obj1 obj1 obj1
      // console.log(this.name); // undefined undefined undefined
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 500);

// 예제 4-10
var obj2 = {
  name: "obj2",
  func: obj1.func,
};

var callback2 = obj2.func();
setTimeout(callback2, 1000);

var obj3 = { name: "obj3" };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 1500);
