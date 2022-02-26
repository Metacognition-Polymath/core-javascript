// 예제 3-20. ES6의 Array.from 메서드
// var obj = {
//   a: "aa",
//   b: "bb",
//   c: "cc",
// }; // 안됨

var obj = {
  0: "aa",
  1: "bb",
  2: "cc",
  length: 3,
}; // 상식적으로 이런 객체를 만들리는 없다. 차라리 배열이나 string을 쓰고 만다.

var arr = Array.from(obj);
console.log(arr);
