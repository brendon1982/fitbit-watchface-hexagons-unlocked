import document from "document";

const statsTextElements = document.getElementsByClassName("stats");
const statsIconElements = document.getElementsByClassName("stat-image");

export function render(stat) {
  statsTextElements.forEach(function (element) {
    element.text = `${stat.value}`;
  });

  statsIconElements.forEach(function (element) {
    element.href = `${stat.icon}`;
  });
}