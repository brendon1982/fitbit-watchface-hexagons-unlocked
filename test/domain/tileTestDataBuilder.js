require = require("esm")(module)

const BuilderBase = require("../builderBase");
const faker = require("faker");

module.exports = class TileTestDataBuilder extends BuilderBase {
    static create() {
        return new TileTestDataBuilder();
    }

    constructor() {
        super();
    }

    withId(id) {
        return super.withProp(o => o.id = id);
    }

    withName(name) {
        return super.withProp(o => o.name = name);
    }

    withImage(image) {
        return super.withProp(o => o.image = image);
    }

    withSets(...sets) {
        return super.withProp(o => o.sets = sets);
    }

    build() {
        return super.runActions({
            id: faker.random.number(),
            image: faker.random.image(),
            name: faker.random.words(),
            sets: []
        });
    }
}