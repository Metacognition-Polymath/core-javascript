var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    // ["a"].forEach(this.logThis); // 전역 객체(global or window)
    // ["a"].forEach((item) => console.log(this)); // this binding 됨 - obj
    setTimeout(this.logThis, 300); // 전역 객체(global or window)
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 500);
  },
};
// obj.logThisLater1();
obj.logThisLater2(); // this binding 됨 - obj
