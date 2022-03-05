var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};

const inner1 = outer();
console.log(inner1());
console.log(inner1());
