// 예제 3-30. thisArg를 받는 경우 예시 - forEach
const test = {
  sum: 10,
  count: 2,
};

var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this); // 콜백함수의 this에 할당될 객체를 전달할 수 있음 - report를 전달함
  },
  // add: function () {
  //   var args = Array.prototype.slice.call(arguments);
  //   args.forEach(function (entry) {
  //     this.sum += entry;
  //     ++this.count;
  //   }, test); // 콜백함수의 this에 할당될 객체를 전달할 수 있음 - test를 전달함
  // },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(1, 2, 3);
console.log(report);
console.log(test);
