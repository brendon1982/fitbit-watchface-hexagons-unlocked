import document from "document";

const statsElements = document.getElementsByClassName("stats");

export function render(value) {
  statsElements.forEach(function (element) {
    element.text = `${value}`;
  });
}