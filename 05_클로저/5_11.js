{
  const createCar = function () {
    let fuel = Math.ceil(Math.random() * 10 + 10);
    const power = Math.ceil(Math.random() * 3 + 2);
    let moved = 0;

    return {
      get moved() {
        return moved;
      },
      set moved(movedKmNumber) {
        moved = movedKmNumber;
      },
      run: function () {
        const km = Math.ceil(Math.random() * 6);
        const wasteFuel = km / power;
        if (fuel < wasteFuel) {
          console.log("이동 불가");
          return;
        }
        fuel -= wasteFuel;
        moved += km;
        console.log(`${km}km 이동 (총 ${moved}km).`);
        console.log(`남은 연료: ${fuel}L`);
      },
    };
  };

  const car = createCar();
  // car.moved = 10000; // setter도 구현 되네
  car.run();
  console.log(car.moved);
  console.log(car.fuel);
  console.log(car.power);
}
