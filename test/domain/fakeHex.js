const _ = require("lodash");
const faker = require("faker");

module.exports = class FakeHex {
    static create(point) {
        return new FakeHex(point);
    }

    constructor(point) {
        this.point = _.isUndefined(point) ? { x: faker.random.number(), y: faker.random.number() } : point;
    }

    coordinates() {
        return this.point;
    }

    render(image) {
        this.renderedImage = image;
    }
}