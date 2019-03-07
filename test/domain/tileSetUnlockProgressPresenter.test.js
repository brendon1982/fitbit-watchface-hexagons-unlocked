require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;

const TileTestDataBuilder = require("./tileTestDataBuilder");
const FakeHex = require("./fakeHex");
const FakeClock = require("./fakeClock");
const Tiles = require("../../domain/tiles").default;

describe("tileSetUnlockProgressPresenter", function () {
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

        const sut = createPresenterWithoutUnlockedTileForToday(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
        // act
        sut.present(hex);
        // assert
        expectNothingToBeRenderedOn(hex);
    });

    it("should not render to hexes when there are no progress co-ordinates", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withSets("Modern").build(),
            TileTestDataBuilder.create().withId(2).withSets("Modern").build()
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
        const progressCoordinates = [];

        const hex1 = FakeHex.create(createPoint(0, 0));
        const hex2 = FakeHex.create(createPoint(0, 1));

        const sut = createPresenterWithoutUnlockedTileForToday(availableTiles, unlockedTileIds, "Modern", progressCoordinates, () => 100);
        // act
        sut.present(hex1);
        sut.present(hex2);
        // assert
        expectNothingToBeRenderedOn(hex1);
        expectNothingToBeRenderedOn(hex2);
    });

    describe("all tiles are unlocked", function () {
        it("should not render any image", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withId(1).withSets("Western").build(),
                TileTestDataBuilder.create().withId(2).withSets("Western").build()
            ];
            const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
            const progressCoordinates = [createPoint(0, 0), createPoint(0, 1)];

            const hex1 = FakeHex.create(progressCoordinates[0]);
            const hex2 = FakeHex.create(progressCoordinates[1]);

            const sut = createPresenterWithoutUnlockedTileForToday(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
            // act
            sut.present(hex1);
            sut.present(hex2);
            // assert
            expectOnlyProgressToBeRenderedOn(hex1, 100);
            expectOnlyProgressToBeRenderedOn(hex2, 100);
        });
    });

    describe("not all tiles unlocked", function () {
        describe("tile not unlocked for today", function () {
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
                it("should render progress to hexes in progress co-ordinates and next locked image to the last hex", function () {
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
    
                    const sut = createPresenterWithoutUnlockedTileForToday(availableTiles, unlockedTileIds, "Nature", progressCoordinates, () => data.progress);
                    // act
                    sut.present(hex1);
                    sut.present(hex2);
                    sut.present(hex3);
                    sut.present(hex4);
                    // assert
                    expectOnlyProgressToBeRenderedOn(hex1, data.hex1Progress);
                    expectOnlyProgressToBeRenderedOn(hex2, data.hex2Progress);
                    expectOnlyProgressToBeRenderedOn(hex3, data.hex3Progress);
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
    
                const sut = createPresenterWithoutUnlockedTileForToday(availableTiles, unlockedTileIds, "Western", progressCoordinates, () => 100);
                // act
                sut.present(hex);
                // assert
                expectImageAndProgressToBeRenderedOn(hex, availableTiles[2].image, 100);
            });
        });
    
        describe("tile already unlocked for today", function () {
            it("should render image for that tile", function () {
                // arrange
                const clock = FakeClock.create();
                const availableTiles = [
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build()
                ];
    
                const tiles = new Tiles(availableTiles)
                    .changeTileSet("Nature")
                    .unlockTile(availableTiles[0].id);
                clock.advanceOneDay();
                tiles.unlockTile(availableTiles[1].id);
    
                const progressCoordinates = [createPoint(0, 0)];
                const hex = FakeHex.create(progressCoordinates[0]);
    
                const sut = createPresenter(tiles, progressCoordinates, () => 100);
                // act
                sut.present(hex)
                // assert
                expectImageAndProgressToBeRenderedOn(hex, availableTiles[1].image, 100);
            });
        });
    });

    // TODO add test that checks if a tile has been unlocked on the current date but it is not part of the
    //      current tile set that no image is rendered for the last tile.

    function expectImageAndProgressToBeRenderedOn(hex, expectedImage, expectedProgressPercentage) {
        expect(hex.renderedImage).to.equal(expectedImage);
        expect(hex.progressPercentage).to.equal(expectedProgressPercentage);
    }

    function expectOnlyProgressToBeRenderedOn(hex, expectedProgressPercentage) {
        expect(hex.renderedImage).to.be.undefined;
        expect(hex.progressPercentage).to.equal(expectedProgressPercentage);
    }

    function expectNothingToBeRenderedOn(hex) {
        expect(hex.renderedImage).to.be.undefined;
        expect(hex.progressPercentage).to.be.undefined;
    }

    function createPresenterWithoutUnlockedTileForToday(allTiles, unlockedTiles, tileSet, progressCoordinates, progressAccessor) {
        progressCoordinates = progressCoordinates || [];
        const TileSetUnlockProgressPresenter = require("../../domain/tileSetUnlockProgressPresenter").default;

        const clock = FakeClock.create()

        const tiles = new Tiles(allTiles);
        tiles.changeTileSet(tileSet);
        unlockedTiles.forEach(id => {
            tiles.unlockTile(id);
            clock.advanceOneDay();
        });

        return new TileSetUnlockProgressPresenter(tiles, progressCoordinates, progressAccessor);
    }

    function createPresenter(tiles, progressCoordinates, progressAccessor) {
        progressCoordinates = progressCoordinates || [];
        const TileSetUnlockProgressPresenter = require("../../domain/tileSetUnlockProgressPresenter").default;

        return new TileSetUnlockProgressPresenter(tiles, progressCoordinates, progressAccessor);
    }

    function createPoint(x, y) {
        return { x, y }
    }
});