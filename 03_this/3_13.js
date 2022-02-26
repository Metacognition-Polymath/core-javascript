// 예제 3-13. 생성자 함수
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;

  console.log("this : ", this);
};

// var choco = new Cat("초코", 7); // this : Cat
Cat(); // this : global - new를 붙이지 않으면 일반적인 함수와 같이 this엔 전역객체가 자동할당 됨
