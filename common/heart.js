import { BodyPresenceSensor } from "body-presence";
import { HeartRateSensor } from "heart-rate";

let onHeartRateChange;

export function initialize(callback) {
  onHeartRateChange = callback;
}

let hrm = new HeartRateSensor({ frequency: 5, batch: 1 });
hrm.onreading = function () {
  if(onHeartRateChange){
    onHeartRateChange(hrm);
  }
}

let body = new BodyPresenceSensor();
body.onreading = () => {
  if (!body.present) {
    hrm.stop();
  } else {
    hrm.start();
  }
};
body.start();