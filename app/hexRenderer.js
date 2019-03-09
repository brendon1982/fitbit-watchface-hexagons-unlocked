import document from "document";

const size = 33.4;
const imageWidth = 60;
const imageHeight = 70;
const offset = -1;
const xOffset = (imageWidth / 2) + imageWidth / 4;
const yOffset = (Math.sqrt(size) - (imageWidth / 2));
const sqrt3 = Math.sqrt(3);

export default function FastHex() {
}

FastHex.prototype.render = function (coordinates, image) {
    const id = `${coordinates.x}${coordinates.y}`;
    const cube = cartesianToCube(coordinates.x, coordinates.y);
    const point = toPoint(cube.q, cube.r, size);

    const imageElement = document.getElementById(id);
    imageElement.href = `/mnt/assets${image}`;
    imageElement.width = imageWidth;
    imageElement.height = imageHeight;
    imageElement.x = point.x - xOffset;
    imageElement.y = point.y + yOffset;
};

FastHex.prototype.progress = function (coordinates, percentage) {
    const id = `${coordinates.x}${coordinates.y}`;

    const imageElement = document.getElementById(id);
    imageElement.style.opacity = percentage / 100;
};

function toPoint(q, r, size) {
    const x = size * sqrt3 * (q + r / 2);
    const y = size * 3 / 2 * r;

    return { x: x, y: y };
}

function cartesianToCube(x, y) {
    const q = x - offsetFromZero(offset, y)
    const r = y

    return { q, r, s: -q - r }
}

function offsetFromZero(offset, distance) {
    return (distance + offset * (distance & 1)) >> 1
}