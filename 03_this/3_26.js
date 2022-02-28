var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 4, 5); // bind 할 때 parameter를 전달하지 않아도 되지만 전달해도 된다.
console.log(func.name);
console.log(bindFunc.name);
// bindFunc();
