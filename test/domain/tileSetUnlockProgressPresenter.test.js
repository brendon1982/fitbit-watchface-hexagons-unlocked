require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;

const TileTestDataBuilder = require("./builders/tileTestDataBuilder");
const FakeHexRenderer = require("./fakes/fakeHexRenderer");
const FakeClock = require("./fakes/fakeClock");
const TileSet = require("../../domain/tilesSet").default;

describe("tileSetUnlockProgressPresenter", function () {
    it("should not render to hexes at non progress co-ordinates", function () {
        // arrange
        const tiles = [
            TileTestDataBuilder.create().withId(1).withSets("Western").build(),
            TileTestDataBuilder.create().withId(2).withSets("Western").build(),
            TileTestDataBuilder.create().withId(3).withSets("Western").build(),
            TileTestDataBuilder.create().withId(4).withSets("Western").build(),
        ];
        const unlockedTiles = [tiles[0], tiles[1]];
        const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];

        const hexRenderer = FakeHexRenderer.create();

        const sut = createPresenterWithoutUnlockedTileForToday(tiles, unlockedTiles, "Western", progressCoordinates, () => 100, hexRenderer);
        // act
        sut.present(createPoint(0, 4));
        // assert
        expectNothingToBeRenderedOn(hexRenderer);
    });

    it("should not render to hexes when there are no progress co-ordinates", function () {
        // arrange
        const tiles = [
            TileTestDataBuilder.create().withId(1).withSets("Modern").build(),
            TileTestDataBuilder.create().withId(2).withSets("Modern").build()
        ];
        const unlockedTiles = [tiles[0], tiles[1]];
        const progressCoordinates = [];

        const hexRenderer = FakeHexRenderer.create();

        const sut = createPresenterWithoutUnlockedTileForToday(tiles, unlockedTiles, "Modern", progressCoordinates, () => 100, hexRenderer);
        // act
        sut.present(createPoint(0, 0));
        sut.present(createPoint(0, 1));
        // assert
        expectNothingToBeRenderedOn(hexRenderer);
    });

    describe("all tiles are unlocked", function () {
        it("should not render any image", function () {
            // arrange
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets("Western").build(),
                TileTestDataBuilder.create().withId(2).withSets("Western").build()
            ];
            const unlockedTiles = [tiles[0], tiles[1]];
            const progressCoordinates = [createPoint(0, 0), createPoint(0, 1)];

            const hexRenderer = FakeHexRenderer.create();

            const sut = createPresenterWithoutUnlockedTileForToday(tiles, unlockedTiles, "Western", progressCoordinates, () => 100, hexRenderer);
            // act
            sut.present(progressCoordinates[0]);
            sut.present(progressCoordinates[1]);
            // assert
            expectOnlyProgressToBeRenderedOn(hexRenderer, 100);
            expectOnlyProgressToBeRenderedOn(hexRenderer, 100);
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
                    const tiles = [
                        TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(3).withImage("stones.png").withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(4).withSets("Nature").build(),
                    ];
                    const unlockedTiles = [tiles[0], tiles[1]];
                    const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];

                    const hexRenderer = FakeHexRenderer.create();

                    const sut = createPresenterWithoutUnlockedTileForToday(tiles, unlockedTiles, "Nature", progressCoordinates, () => data.progress, hexRenderer);
                    // act
                    sut.present(progressCoordinates[0]);
                    sut.present(progressCoordinates[1]);
                    sut.present(progressCoordinates[2]);
                    sut.present(progressCoordinates[3]);
                    // assert
                    expect(hexRenderer.renderedImages).to.contain.members([tiles[2].image]);
                    expect(hexRenderer.progressPercentages).to.contain.members([
                        data.hex1Progress, data.hex2Progress, data.hex3Progress, data.hex4Progress
                    ]);
                });
            });

            it("should only select next locked tile from specified tile set", function () {
                // arrange
                const tiles = [
                    TileTestDataBuilder.create().withId(1).withImage("saloon.png").withSets("Western").build(),
                    TileTestDataBuilder.create().withId(2).withImage("grass.png").withSets("Nature").build(),
                    TileTestDataBuilder.create().withId(3).withImage("desert.png").withSets("Desert", "Western").build()
                ];
                const unlockedTiles = [tiles[0]];
                const progressCoordinates = [createPoint(1, 0)];

                const hexRenderer = FakeHexRenderer.create();

                const sut = createPresenterWithoutUnlockedTileForToday(tiles, unlockedTiles, "Western", progressCoordinates, () => 100, hexRenderer);
                // act
                sut.present(progressCoordinates[0]);
                // assert
                expectImageAndProgressToBeRenderedOn(hexRenderer, tiles[2].image, 100);
            });
        });

        describe("tile already unlocked for today", function () {
            it("should render image for that tile", function () {
                // arrange
                const clock = FakeClock.create();
                const tiles = [
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build()
                ];

                const tileSet = new TileSet(tiles)
                    .changeTileSet("Nature")
                    .unlockTile(tiles[0]);
                clock.advanceOneDay();
                tileSet.unlockTile(tiles[1]);

                const progressCoordinates = [createPoint(0, 0)];
                const hexRenderer = FakeHexRenderer.create();

                const sut = createPresenter(tileSet, progressCoordinates, () => 100, hexRenderer);
                // act
                sut.present(progressCoordinates[0])
                // assert
                expectImageAndProgressToBeRenderedOn(hexRenderer, tiles[1].image, 100);
            });
        });

        describe("tile unlocked and rendered yesterday", function() {
            it("should render image for today's tile today", function () {
                // arrange
                const tiles = [
                    TileTestDataBuilder.create().withId(1).withSets("Nature").withImage("sand.png").build(),
                    TileTestDataBuilder.create().withId(2).withSets("Nature").withImage("panda.png").build(),
                ];
                const progressCoordinates = [createPoint(0, 0)];
                const clock = FakeClock.create();
                const tileSet = new TileSet(tiles)
                    .changeTileSet("Nature");

                const hexRenderer = FakeHexRenderer.create();

                const sut = createPresenter(tileSet, progressCoordinates, () => 100, hexRenderer);
                // act
                sut.present(progressCoordinates[0]);
                tileSet.unlockTile(tiles[0]);
                sut.present(progressCoordinates[0]);
                clock.advanceOneDay();
                sut.present(progressCoordinates[0]);
                // assert
                expect(hexRenderer.renderedImages).to.have.members([
                    tiles[0].image, tiles[0].image, tiles[1].image
                ]);
            });
        });
    });

    function expectImageAndProgressToBeRenderedOn(hex, expectedImage, expectedProgressPercentage) {
        expect(hex.renderedImages).to.contain.members([expectedImage]);
        expect(hex.progressPercentages).to.contain.members([expectedProgressPercentage]);
    }

    function expectOnlyProgressToBeRenderedOn(hex, expectedProgressPercentage) {
        expect(hex.renderedImages).to.be.empty;
        expect(hex.progressPercentages).to.contain.members([expectedProgressPercentage]);
    }

    function expectNothingToBeRenderedOn(hex) {
        expect(hex.renderedImages).to.be.empty;
        expect(hex.progressPercentages).to.be.empty;
    }

    function createPresenterWithoutUnlockedTileForToday(allTiles, unlockedTiles, tileSet, progressCoordinates, progressAccessor, hexRenderer) {
        progressCoordinates = progressCoordinates || [];
        const TileSetUnlockProgressPresenter = require("../../domain/tileSetUnlockProgressPresenter").default;

        const clock = FakeClock.create()

        const tiles = new TileSet(allTiles);
        tiles.changeTileSet(tileSet);
        unlockedTiles.forEach(tile => {
            tiles.unlockTile(tile);
            clock.advanceOneDay();
        });

        return new TileSetUnlockProgressPresenter(tiles, progressCoordinates, progressAccessor, hexRenderer);
    }

    function createPresenter(tiles, progressCoordinates, progressAccessor, hexRenderer) {
        progressCoordinates = progressCoordinates || [];
        const TileSetUnlockProgressPresenter = require("../../domain/tileSetUnlockProgressPresenter").default;

        return new TileSetUnlockProgressPresenter(tiles, progressCoordinates, progressAccessor, hexRenderer);
    }

    function createPoint(x, y) {
        return { x, y }
    }
});