const BuilderBase = require("../builderBase");
const faker = require("faker");

module.exports = class TileTestDataBuilder extends BuilderBase {
    static create() {
        return new TileTestDataBuilder();
    }

    constructor() {
        super();
    }

    withName(name) {
        return super.withProp(o => o.name = name);
    }

    withSets(...sets) {
        return super.withProp(o => o.sets = sets);
    }

    build() {
        return super.runActions({
            id: faker.random.number(),
            image: faker.random.image()
        });
    }
}