require = require("esm")(module)

const BuilderBase = require("../../builderBase");
const faker = require("faker");
const Progress = require("../../../domain/progress").default;
const UnlockedTile = require("../../../domain/unlockedTile").default;

module.exports = class TileTestDataBuilder extends BuilderBase {
    static create() {
        return new TileTestDataBuilder();
    }

    constructor() {
        super();
    }

    withTileSet(tileSet) {
        return super.withProp(o => o.tileSet = tileSet);
    }

    withUnlockedTile(tile, date) {
        return super.withProp(o => o.unlockedTiles.push(new UnlockedTile(tile.id, date)));
    }

    build() {
        return super.runActions(new Progress(faker.random.word, []));
    }
}