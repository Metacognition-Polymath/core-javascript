// 예제 5-10. 간단한 자동차 객체
{
  const car = {
    fuel: Math.ceil(Math.random() * 10 + 10), // 연료(L)
    power: Math.ceil(Math.random() * 3 + 2), // 연비(km/L)
    moved: 0, // 총 이동거리
    run: function () {
      // run에 화살표 함수 () => {} 를 사용하면 this가 car가 아닌 {} 가 된다.
      console.log("this", this);
      const km = Math.ceil(Math.random() * 6);
      console.log("km", km);
      const wasteFuel = km / this.power; // object에선 bind가 되어있나? -> car.run() 으로 실행하기 때문에 되어 있다.
      if (this.fuel < wasteFuel) {
        console.log("이동불가");
        return;
      }
      this.fuel -= wasteFuel;
      this.moved += km;
      console.log(`${km}km 이동 (총 ${this.moved}km)`);
    },
    get getterTest() {
      // getter를 object안에서도 사용가능하구나 - 변수처럼 사용하면 getter 함수가 실행 됨
      console.log("getterTest");
    },
  };

  car.fuel = 1000; // 이렇게 값을 바꾸지 못 하게 하고 싶다면 closure를 사용할 수 있다 -> 책 예제 5-12 -> 이럴바엔 class 쓴다
  car.power = 100;
  car.moved = 100;
  car.run();
  car.getterTest; // getter를 object안에서도 사용가능하구나 - 변수처럼 사용하면 getter 함수가 실행 됨
}
// 이럴거면 class 사용하는 게 나을 듯
