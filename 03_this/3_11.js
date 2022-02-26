var obj1 = {
  outer: function () {
    console.log(this);
    var innerFunc1 = function () {
      console.log(this);
    };
    innerFunc1(); // this : window or global
  },
};
obj1.outer();

var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this); // arrow function의 this는 상위 scope를 가리킴
    };
    innerFunc(); // this : outer - arrow function의 this는 상위 scope를 가리킴
  },
};
obj.outer();
