import { me } from "appbit";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { battery } from 'power';
import { clock } from "clock";
import document from "document";
import { user } from "user-profile"
import { preferences } from "user-settings";
import * as clockFn from "../resources/components/clockFn";

const heartRateLevel = document.getElementById("heartRate__text");
const batteryLevel = document.getElementById("battery__text");
const clockText = document.getElementById("clock__text");

//Updates Heart Rate Sensor
if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    heartRateLevel.text = hrm.heartRate;
  });
  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
}


//Updates Battery
battery.onchange = (charger, evt) => {
  updateBatteryLevel();
}


function updateBatteryLevel() {
  batteryLevel.text = battery.chargeLevel + '%';
}


//Updates Clock
clock.granularity = "minutes";

clock.addEventListener("tick", (event) => {
  updateTime(event.date);
});


function updateTime(currentTime) {

  let hours = clockFn.getHour(preferences.clockDisplay, currentTime.getHours());
  hours = clockFn.zeroPad(hours);
  let minutes = clockFn.zeroPad(currentTime.getMinutes());

  clockText.text = `${hours}:${minutes}`;

}