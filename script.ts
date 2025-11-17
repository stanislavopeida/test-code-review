import { setWaitingInterval } from "./setWaitingInterval";

const delays = [16000, 8000, 4000, 2000, 0];

setWaitingInterval(() => {
  console.log("Hello, World!");
  console.log('Finish "Hello, World!"');
}, delays);
setWaitingInterval(() => {
  console.log("Bye, World!");
  console.log('Finish "Bye, World!"');
}, delays);
