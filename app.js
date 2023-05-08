const ControlSystem = require("./controlSystem.js");
const numberOfFloors = 10;
const numberOfElevators = 1;

const init = () => {
  console.log("-------------------- Running ---------------------");
  let elevator = new ControlSystem(numberOfFloors, numberOfElevators);
  var prompt = require("prompt-sync")();
  var startFloor = prompt("Эхлэх давхар: ");
  var destinationFloor = prompt("Очих давхар: ");
  elevator.callElevator(startFloor, destinationFloor);
  while (true) {
    startFloor = prompt("Эхлэх давхар: ");
    if (startFloor === "exit") break;
    destinationFloor = prompt("Очих давхар: ");
    elevator.callElevator(startFloor, destinationFloor);
  }
};

init();
