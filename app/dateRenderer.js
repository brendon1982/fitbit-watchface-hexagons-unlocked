import document from "document";
import * as util from "../common/utils";

const dateElements = document.getElementsByClassName("date");

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function tick(date) {
  const month = getMonth(date);
  const monthDay = getMonthDay(date);
  const weekDay = getWeekDay(date);

  dateElements.forEach(function (element) {
    element.text = `${weekDay} ${monthDay} ${month}`;
  });
}

export function getWeekDay(date) {
  var dayNumber = date.getDay();
  return weekDays[dayNumber] || "NAD";
}

function getMonthDay(date) {
  return util.zeroPad(date.getDate());
}

function getMonth(date) {
  var monthNumber = date.getMonth();
  return months[monthNumber] || "NAM";
}