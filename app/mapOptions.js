import document from "document";

const hexOptions = {
    size: 34.5,
    orientation: "pointy",
    render: function (image) {
        const point = this.toPoint();
        const id = `${this.x}${this.y}`;

        const imageElement = document.getElementById(id);
        imageElement.href = image;
        imageElement.width = 60;
        imageElement.height = 70;
        imageElement.x = point.x - (imageElement.width / 2);
        imageElement.y = point.y + (Math.sqrt(34.5) - (imageElement.width / 2));
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