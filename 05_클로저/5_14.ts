// 예제 5-14. 부분 적용 함수 구현(1)

{
  const partial = function (
    func: (arguments: IArguments) => number,
    arguments: IArguments
  ) {
    const originalPartialArgs = arguments; // 함수의 프로토타입의 프로퍼티(Function.prototype.arguments)
    // const func = originalPartialArgs[0];
    if (typeof func !== "function") {
      throw new Error("첫 번째 인자가 함수가 아닙니다");
    }
    return function (arguments: IArguments) {
      const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1); // 클로저 - originalPartialArgs 사용
      console.log("partialArgs", partialArgs);
      const restArgs = Array.prototype.slice.call(arguments); // partial함수가 리턴한 함수의 arguments
      console.log("restArgs", restArgs);
      return func.apply(this, partialArgs.concat(restArgs));
    };
  };

  const add = function (arguments: IArguments) {
    let result = 0;
    for (let i = 0; i < arguments.length; i++) {
      result += arguments[i];
    }
    return result;
  };

  const addPartial = partial(add, 1, 2, 3, 4); // 0개의 인수가 필요한데 5개를 가져왔습니다.ts(2554)
  console.log(addPartial(5));
}

// ts에선 사용할 수 없음
