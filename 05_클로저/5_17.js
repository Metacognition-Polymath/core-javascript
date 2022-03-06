// 예제 5-17 커링 함수(1)
const curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

const getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8));
console.log(getMaxWith10(25));
