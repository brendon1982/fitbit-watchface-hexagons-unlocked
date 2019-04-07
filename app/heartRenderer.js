import document from "document";

const heartElements = document.getElementsByClassName("heart");

export function tick(rate) {
  heartElements.forEach(function (element) {
    element.text = `${rate}`;
  });
}