// 예제 3-29. 화살표 함수 내부에서의 this
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc(); // this : outer
  },
};
obj.outer();
