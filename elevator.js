class Elevator {
  constructor(id, numberOfFloors, initialFloor, elevatorStatus) {
    this.id = id;
    this.numberOfFloors = numberOfFloors;
    this.currentFloor = initialFloor;
    this.status = elevatorStatus;
    this.queueUp = [];
    this.queueDown = [];
  }
  addToQueue(orderFloor, destinationFloor) {
    if (this.currentFloor < orderFloor) {
      this.queueUp.push(orderFloor);
      this.queueUp.sort((a, b) => a - b);
    } else {
      this.queueDown.push(orderFloor);
      this.queueDown.sort((a, b) => b - a);
    }
    if (orderFloor > destinationFloor) {
      this.queueDown.push(destinationFloor);
      this.queueDown.sort((a, b) => b - a);
    }
    if (orderFloor < destinationFloor) {
      this.queueUp.push(destinationFloor);
      this.queueUp.sort((a, b) => a - b);
    }
    this.moveElevator(orderFloor);
  }
  removeFromQueueUp(requestedFloor) {
    this.queueUp = this.queueUp.filter((floor) => floor !== requestedFloor);
    console.log(
      `${this.id}-р цахилгаан шат 🛗 ${requestedFloor} -р давхарт ирлээ`
    );
  }
  removeFromQueueDown(requestedFloor) {
    this.queueDown = this.queueDown.filter((floor) => floor !== requestedFloor);
    console.log(
      `${this.id}-р цахилгаан шат 🛗 ${requestedFloor}-р давхарт ирлээ`
    );
  }

  moveElevator(requestedFloor) {
    console.log(
      `${this.id}-р цахилгаан шатыг 🛗 ${this.currentFloor}-р давхраас ${requestedFloor}-р давхар руу шилжүүлнэ`
    );
    if (this.currentFloor < requestedFloor) {
      this.moveUp();
    } else {
      this.moveDown();
    }
  }

  moveUp() {
    this.status = "up";
    console.log(`${this.id}-р цахилгаан шат 🛗 дээшээ гарч байна`);
    while (this.currentFloor < this.queueUp[this.queueUp.length - 1]) {
      this.currentFloor++;
      if (this.queueUp.includes(this.currentFloor)) {
        this.removeFromQueueUp(this.currentFloor);
      }
    }
    if (this.queueUp.length === 0 && this.queueDown.length > 0) {
      this.moveDown();
    } else {
      this.status = "idle";
      console.log(
        `${this.id}-р цахилгаан шат 🛗 ${this.currentFloor}-р давхарт дуудлага хүлээж байна`
      );
    }
  }
  moveDown() {
    this.status = "down";
    console.log(`${this.id}-р цахилгаан шат 🛗 доошоо бууж байна`);

    while (this.currentFloor > this.queueDown[this.queueDown.length - 1]) {
      this.currentFloor--;
      if (this.queueDown.includes(this.currentFloor)) {
        this.removeFromQueueDown(this.currentFloor);
      }
    }
    if (this.queueDown.length === 0 && this.queueUp.length > 0) {
      this.moveUp();
    } else {
      this.status = "idle";
      console.log(
        `${this.id}-р цахилгаан шат 🛗 ${this.currentFloor}-р давхарт дуудлага хүлээж байна`
      );
    }
  }
}

module.exports = Elevator;
