// 예제 6-1. Person.prototype

var Person = function (name) {
  // 생성자 함수는 대문자로 쓰는게 일반적이지만 소문자로 작성해도 동작한다
  this._name = name; // const 같은 식별자 없이 this._변수명 이 함수안에 포함되면 생성자 함수가 됨
};

Person.prototype.getName = function () {
  return this._name;
};

// const person = new Person("tony");
// console.log(person.getName());

var suzi = new Person("suzi");
console.log(suzi);
console.log(suzi.__proto__.getName()); // undefined ->  // this에 바인딩된 대상이 잘 못 지정됨 - suzi가 아닌 suzi.__proto__ 가 this에 바인딩 됨
console.log(suzi.getName()); // "suzi" -> getName 메서드는 __proto__에 존재하지만 __proto__는 생략 가능한 프로퍼티
