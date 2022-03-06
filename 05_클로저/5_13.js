// 예제 5-13. bind 메서드를 활용한 부분 적용 함수
{
  const add = function () {
    var result = 0;
    for (let i = 0; i < arguments.length; i++) {
      // js에선 arguments가 함수의 프로퍼티로 존재하는 것 같다
      result += arguments[i];
    }
    return result;
  };

  const addPartial = add.bind(null, 1, 2, 3, 4); // 미리 적용한 것(10)에
  console.log(addPartial(1, 2, 3, 4, 5)); // 추가로 들어오는 것(15)을 더함 => 10 + 15 === 25

  // const result = add(1, 2, 3, 4);
  // console.log(result);
}
