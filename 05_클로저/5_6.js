console.log("5_6 init");
const fruits = ["apple", "banana", "peach"];
const $ul = document.createElement("ul");

fruits.forEach((fruit) => {
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", () => {
    alert("your choice is " + fruit); // addEventListener 의 callback에서 fruit를 사용하고 있으므로 계속 참조
  });
  $ul.appendChild($li);
});

const body = document.querySelector("body");
body.appendChild($ul);

console.log("5_6");
