const ulTag = document.querySelector("#ul-test");

const list = [1, 2, 3];
list.forEach((item) => {
  const child = String.raw`
    <li id="list-${item}">
      ${item}
    </li>
  `;
  ulTag.innerHTML += child;
});

/**
 * @param {MouseEvent} event
 */
const listCallback = (event) => {
  const target = event.target;
  console.log("target", target);
};

ulTag.addEventListener("click", listCallback);
