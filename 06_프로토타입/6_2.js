// 예제 6-2. prototype과 __proto__
var Constructor = function (name) {
  this.name = name;
};

Constructor.prototype.method1 = function () {};
Constructor.prototype.property1 = "Constructor Prototype Property";

var instance = new Constructor("Instance");
console.dir(Constructor);
console.dir(instance);
console.log(instance.property1); // __proto__ 생략하고 사용 가능
console.log(instance.__proto__.property1);
