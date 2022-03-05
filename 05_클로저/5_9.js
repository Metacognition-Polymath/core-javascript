const fruits = ["apple", "banana", "peach"];
const $ul = document.createElement("ul");

const alertFruitBuilder = (fruit) => () => {
  alert("your choice is " + fruit);
};

fruits.forEach((fruit) => {
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit));
  $ul.appendChild($li);
});

const body = document.querySelector("body");
body.appendChild($ul);

console.log("5_9");
