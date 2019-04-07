import document from "document";

const heartElements = document.getElementsByClassName("heart");

export function render(rate) {
  heartElements.forEach(function (element) {
    element.text = `${rate}`;
  });
}