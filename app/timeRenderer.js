import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";

const timeElements = document.getElementsByClassName("time");

export function tick(date) {
  const hours = getHours(date);
  const mins = getMinutes(date);

  timeElements.forEach(function (element) {
    element.text = `${hours}:${mins}`;
  });
}

function getHours(date) {
  const hours = date.getHours();
  if (preferences.clockDisplay === "12h") {
    return util.zeroPad(hours % 12 || 12);
  } else {
    return util.zeroPad(hours);
  }
}

function getMinutes(date) {
  return util.zeroPad(date.getMinutes());
}