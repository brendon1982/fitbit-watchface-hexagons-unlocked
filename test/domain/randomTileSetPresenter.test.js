require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const _ = require("lodash");

const TileTestDataBuilder = require("./tileTestDataBuilder");
const RandomTilePresenter = require("../../domain/randomTileSetPresenter").default;

describe("randomTilePresenter", function () {
    repeat(50, () => {
        it("should render one of the unlockedTiles images on the hex", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withName("Plain Grass").withSets("Medeival", "Nature").build(),
                TileTestDataBuilder.create().withName("Plain Sand").withSets("Western", "Nature").build(),
                TileTestDataBuilder.create().withName("Plain Dirt").withSets("Western", "Medeival", "Nature").build()
            ];
            const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
            const possibleImages = [availableTiles[0].image, availableTiles[1].image];

            const hex = CapturingHex.create()

            const sut = createPresenter(availableTiles, unlockedTileIds, "Nature");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });
    })

    // TODO should only render tiles from tile set
    // TODO hex at ignoredCoordinates
    // TODO no unlocked tiles
    // TODO unlocked tile not in all tiles

    // TODO write a tileUnlockProgressPresenter

    function createPresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        ignoredCoordinates = ignoredCoordinates || [];

        return new RandomTilePresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates);
    }

    function repeat(times, func) {
        _.range(times).forEach(func);
    }

    class CapturingHex {
        static create() {
            return new CapturingHex();
        }

        render(image) {
            this.renderedImage = image;
        }
    }
});