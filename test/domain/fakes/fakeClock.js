const sinon = require("sinon");
const beforeEach = require("mocha").beforeEach;
const faker = require("faker");

beforeEach(function() {
    sinon.restore();
});


module.exports = class FakeClock {
    static create(date) {
        return new FakeClock(date);
    }

    constructor(date) {
        date = date || faker.date.recent(30);
        this.clock = sinon.useFakeTimers(date);
    }

    advanceOneDay() {
        this.clock.tick(24 * 60 * 60 * 1000);
    }
}