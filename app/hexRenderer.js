import document from "document";

const hexSize = 34;
const imageWidth = 60;
const imageHeight = 70;
const offset = -1;
const xOffset = (imageWidth / 2) + imageWidth / 4;
const yOffset = (Math.sqrt(hexSize) - (imageWidth / 2));
const sqrt3 = Math.sqrt(3);

export default class HexRenderer {
    render(coordinates, image) {
        const point = coordinatesToElementPoint(coordinates);

        const imageElement = document.getElementById(coordinatesToElementId(coordinates));
        imageElement.href = `/mnt/assets${image}`;
        imageElement.width = imageWidth;
        imageElement.height = imageHeight;
        imageElement.x = point.x - xOffset;
        imageElement.y = point.y + yOffset;
    };

    progress(coordinates, percentage) {
        const imageElement = document.getElementById(coordinatesToElementId(coordinates));
        imageElement.style.opacity = percentage / 100;
    };
}

function coordinatesToElementPoint(coordinates) {
    const cubeCoordinates = cartesianToCube(coordinates.x, coordinates.y);
    return toPoint(cubeCoordinates.q, cubeCoordinates.r, hexSize);
}

function cartesianToCube(x, y) {
    const q = x - offsetFromZero(offset, y)
    const r = y

    return { q, r, s: -q - r }
}

function offsetFromZero(offset, distance) {
    return (distance + offset * (distance & 1)) >> 1
}

function toPoint(q, r, size) {
    const x = size * sqrt3 * (q + r / 2);
    const y = size * 3 / 2 * r;

    return { x: x, y: y };
}

function coordinatesToElementId(coordinates) {
    return `${coordinates.x}${coordinates.y}`;
}