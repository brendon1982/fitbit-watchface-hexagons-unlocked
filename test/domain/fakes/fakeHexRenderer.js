module.exports = class FakeHexRenderer {
    static create() {
        return new FakeHexRenderer();
    }

    constructor() {
        this.coordinates = [];
        this.renderedImages = [];
        this.progressPercentages = [];
    }

    render(coordinates, image) {
        this.coordinates.push(coordinates);
        this.renderedImages.push(image);
    }

    progress(coordinates, percentage) {
        this.coordinates.push(coordinates);
        this.progressPercentages.push(percentage);
    }
}