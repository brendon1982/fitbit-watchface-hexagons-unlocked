import document from "document";

const hexSize = 33.4;
const imageWidth = 58;
const imageHeight = 67.66666666666666;
const xOffset = (imageWidth / 2) + imageWidth / 4;
const yOffset = (Math.sqrt(hexSize) - (imageWidth / 2));

const hexOptions = {
    size: hexSize,
    orientation: "pointy",
    render: function (image) {
        const point = this.toPoint();
        const id = `${this.x}${this.y}`;

        const imageElement = document.getElementById(id);
        imageElement.href = `/mnt/assets${image}`;
        imageElement.width = imageWidth;
        imageElement.height = imageHeight;
        imageElement.x = point.x - xOffset;
        imageElement.y = point.y + yOffset;
    },
    progress: function (percentage) {
        const id = `${this.x}${this.y}`;

        const imageElement = document.getElementById(id);
        imageElement.style.opacity = percentage / 100;
    }
};

const gridOptions = {
    width: 7,
    height: 6
};

export {
    hexOptions,
    gridOptions
}