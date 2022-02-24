// 실행 : node 3_2.js
console.log(this); // {}
console.log(global); // Object [global] { ... }
console.log(globalThis);
console.log(this === globalThis); // false? - 왜 책과 다르지?(책에선 true) - node 버전이 올라가면서 수정된 것으로 추정 됨(내 node version : v16.13.0)
// this도 global이 아닌 {}를 가리킴