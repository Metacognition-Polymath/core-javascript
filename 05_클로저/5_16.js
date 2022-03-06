// 예제 5-16. 부분 적용 함수 - 디바운스
const debounce = function (eventName, func, wait) {
  let timeoutId = null;
  return function (event) {
    const self = this;
    console.log(eventName, "event 발생");
    clearTimeout(timeoutId); // clearTimeout으로 wait시간 전에 동일한 이벤트 발생 시 setTimeout을 캔슬해서 디바운스를 구현
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

const moveHandler = function (e) {
  console.log("move event 처리");
};

const wheelHandler = function (e) {
  console.log("wheel event 처리");
};

const body = document.querySelector("body");
console.log(body);

body.addEventListener("mousemove", debounce("justMouseMove", moveHandler, 500));

body.addEventListener(
  "wheel",
  debounce("mouseWheelIsDeprecated", wheelHandler, 500)
);

body.addEventListener("click", () => console.log("click"));

console.log("5_16");
