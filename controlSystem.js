const Elevator = require("./elevator.js");

class ControlSystem {
  constructor(numberOfFloors, numberOfElevators) {
    this.numberOfFloors = numberOfFloors;
    this.numberOfElevators = numberOfElevators;
    this.elevatorsList = [];
    this.createElevatorsList();
  }
  createElevatorsList() {
    console.log("------------ Creating elevator system ------------");
    for (let i = 1; i <= this.numberOfElevators; i++) {
      this.elevatorsList.push(new Elevator(i, this.numberOfFloors, 0, "idle"));
    }
    console.log(this.elevatorsList);
  }
  callElevator(orderFloor, destinationFloor) {
    orderFloor = Number(orderFloor);
    destinationFloor = Number(destinationFloor);
    const idleElevators = this.elevatorsList.filter(
      (elevator) => elevator.status === "idle"
    );
    const distance = (elevator) => Math.abs(elevator.currentFloor - orderFloor);
    let closestIdleElevator = undefined;
    let bestDistance = this.numberOfFloors;
    idleElevators.forEach((elevator) => {
      if (distance(elevator) < bestDistance) {
        closestIdleElevator = elevator;
        bestDistance = distance(elevator);
      }
    });
    console.log("--------------------------------------------------");
    console.log(
      `${closestIdleElevator.id}-р цахилгаан шатыг 🛗 ${orderFloor}-р давхраас  ${destinationFloor}-р давхарлуу дуудаж байна`
    );
    closestIdleElevator.addToQueue(orderFloor, destinationFloor);
  }
}

module.exports = ControlSystem;
