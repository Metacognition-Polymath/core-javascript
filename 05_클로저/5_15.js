// 예제 5-15. 부분 적용 함수 구현(2)
Object.defineProperty(global, "_", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumerable: false,
});

const partial2 = function () {
  const originalPartialArgs = arguments;
  const func = originalPartialArgs[0];
  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다");
  }
  return function () {
    const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1); // 클로저 - originalPartialArgs 사용
    console.log("partialArgs", partialArgs);
    const restArgs = Array.prototype.slice.call(arguments); // partial함수가 리턴한 함수의 arguments
    console.log("restArgs", restArgs);
    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    console.log("partialArgs removed empty", partialArgs);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};
const add = function () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

// const addPartial = partial2(add, 1, 2, _, 3, _, 4);
// console.log(addPartial(5, 6));

// 이건 실무에선 안쓰이겠지만 코딩테스트에선 쓸만할지도?
