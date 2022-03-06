var arr = [1, 2];
console.dir(arr);
console.dir(Array);

const arr1 = new Array(2);
console.dir(arr1);
console.log(arr1);

const arrFrom = Array.from([1, 2, 3]); // shallow copy
const arrFrom1 = Array.from("foo"); // ['f', 'o', 'o'] - 걍 [...arr] 로 하는게 나을 듯
console.log(arrFrom);
console.log(arrFrom1);
const splitString = "foo".split("");
console.log(splitString); // ['f', 'o', 'o']
