// 0) this binding을 하지 않았을 때
// var obj = {
//   outer: function () {
//     console.log(this);
//     var innerFunc = function () {
//       console.log(this); // 전역객체(window or global)
//     };
//     innerFunc();
//   },
// };
// obj.outer();

// 1) call메서드를 이용한 내부함수에 this 전달
// var obj = {
//   outer: function () {
//     console.log(this);
//     var innerFunc = function () {
//       console.log(this);
//     };
//     innerFunc.call(this);
//   },
// };
// obj.outer();

// 2) bind 메서드를 이용한 내부함수에 this 전달
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
obj.outer();
