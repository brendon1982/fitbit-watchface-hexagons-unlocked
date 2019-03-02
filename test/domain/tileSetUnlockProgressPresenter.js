require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const _ = require("lodash");
const faker = require("faker");

const TileTestDataBuilder = require("./tileTestDataBuilder");
const FakeHex = require("./fakeHex");

describe("tileSetUnlockProgressPresenter", function () {
    [
        { progress: 0, hex1Progress: 0, hex2Progress: 0, hex3Progress: 0, hex4Progress: 0 },
        { progress: 12.5, hex1Progress: 50, hex2Progress: 0, hex3Progress: 0, hex4Progress: 0 },
        { progress: 25, hex1Progress: 100, hex2Progress: 0, hex3Progress: 0, hex4Progress: 0 },
        { progress: 37.5, hex1Progress: 100, hex2Progress: 50, hex3Progress: 0, hex4Progress: 0 },
        { progress: 50, hex1Progress: 100, hex2Progress: 100, hex3Progress: 0, hex4Progress: 0 },
        { progress: 62.5, hex1Progress: 100, hex2Progress: 100, hex3Progress: 50, hex4Progress: 0 },
        { progress: 75, hex1Progress: 100, hex2Progress: 100, hex3Progress: 100, hex4Progress: 0 },
        { progress: 87.5, hex1Progress: 100, hex2Progress: 100, hex3Progress: 100, hex4Progress: 50 },
        { progress: 100, hex1Progress: 100, hex2Progress: 100, hex3Progress: 100, hex4Progress: 100 },
    ].forEach(function (data) {
        it("should render next locked image to hexes on progress co-ordinates with proportional progress", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(3).withImage("stones.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withId(4).withSets("Nature").build(),
            ];
            const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
            const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];
    
            const hex1 = FakeHex.create(progressCoordinates[0]);
            const hex2 = FakeHex.create(progressCoordinates[1]);
            const hex3 = FakeHex.create(progressCoordinates[2]);
            const hex4 = FakeHex.create(progressCoordinates[3]);
    
            const sut = createPresenter(availableTiles, unlockedTileIds, "Nature", progressCoordinates, () => data.progress);
            // act
            sut.present(hex1)
            sut.present(hex2)
            sut.present(hex3)
            sut.present(hex4)
            // assert
            expectImageAndProgressToBeRenderedOn(hex1, availableTiles[2].image, data.hex1Progress);
            expectImageAndProgressToBeRenderedOn(hex2, availableTiles[2].image, data.hex2Progress);
            expectImageAndProgressToBeRenderedOn(hex3, availableTiles[2].image, data.hex3Progress);
            expectImageAndProgressToBeRenderedOn(hex4, availableTiles[2].image, data.hex4Progress);
        });
    });

    it("should only select next locked tile from specified tile set", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withImage("saloon.png").withSets("Western").build(),
            TileTestDataBuilder.create().withId(2).withImage("grass.png").withSets("Nature").build(),
            TileTestDataBuilder.create().withId(3).withImage("desert.png").withSets("Desert", "Western").build()
        ];
        const unlockedTileIds = [availableTiles[0].id];
        const progressCoordinates = [createPoint(1, 0)];

        const hex = FakeHex.create(progressCoordinates[0]);

        const sut = createPresenter(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
        // act
        sut.present(hex)
        // assert
        expectImageAndProgressToBeRenderedOn(hex, availableTiles[2].image, 100);
    });

    it("should not render to hexes at non progress co-ordinates", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withSets("Western").build(),
            TileTestDataBuilder.create().withId(2).withSets("Western").build(),
            TileTestDataBuilder.create().withId(3).withSets("Western").build(),
            TileTestDataBuilder.create().withId(4).withSets("Western").build(),
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
        const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];

        const hex = FakeHex.create(createPoint(0, 4));

        const sut = createPresenter(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
        // act
        sut.present(hex)
        // assert
        expectNothingToBeRenderedOn(hex);
    });

    it("should not render to hexes on progress co-ordinates when all tiles are unlocked", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withSets("Western").build(),
            TileTestDataBuilder.create().withId(2).withSets("Western").build()
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
        const progressCoordinates = [createPoint(0, 0), createPoint(0, 1)];

        const hex1 = FakeHex.create(progressCoordinates[0]);
        const hex2 = FakeHex.create(progressCoordinates[1]);

        const sut = createPresenter(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
        // act
        sut.present(hex1)
        sut.present(hex2)
        // assert
        expectNothingToBeRenderedOn(hex1);
        expectNothingToBeRenderedOn(hex2);
    });

    it("should not render to hexes when there are no progress co-ordinates", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withSets("Modern").build(),
            TileTestDataBuilder.create().withId(2).withSets("Modern").build()
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
        const progressCoordinates = [];

        const hex1 = FakeHex.create(createPoint(0,0));
        const hex2 = FakeHex.create(createPoint(0,1));

        const sut = createPresenter(availableTiles, unlockedTileIds, "Modern", progressCoordinates, () => 100);
        // act
        sut.present(hex1)
        sut.present(hex2)
        // assert
        expectNothingToBeRenderedOn(hex1);
        expectNothingToBeRenderedOn(hex2);
    });

    function expectImageAndProgressToBeRenderedOn(hex, expectedImage, expectedProgressPercentage) {
        expect(hex.renderedImage).to.equal(expectedImage);
        expect(hex.progressPercentage).to.equal(expectedProgressPercentage);
    }

    function expectNothingToBeRenderedOn(hex, expectedImage, expectedProgressPercentage) {
        expect(hex.renderedImage).to.be.undefined;
        expect(hex.progressPercentage).to.be.undefined;
    }

    function createPresenter(allTiles, unlockedTiles, tileSet, progressCoordinates, progressAccessor) {
        progressCoordinates = progressCoordinates || [];
        const TileSetUnlockProgressPresenter = require("../../domain/tileSetUnlockProgressPresenter").default;

        return new TileSetUnlockProgressPresenter(allTiles, unlockedTiles, tileSet, progressCoordinates, progressAccessor);
    }

    function createPoint(x, y) {
        return { x, y }
    }
});