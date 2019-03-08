require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const faker = require("faker");

const TileTestDataBuilder = require("./builders/tileTestDataBuilder");
const FakeHex = require("./fakes/fakeHex");
const FakeClock = require("./fakes/fakeClock");
const Tiles = require("../../domain/tilesSet").default;
const Progress = require("../../domain/progress").default;
const ProgressTestDataBuilder = require("./builders/progressTestDataBuilder");

describe("tileSetUnlockProgressPresenter", function () {
    it("should not render to hexes at non progress co-ordinates", function () {
        // arrange
        const tileSets = [
            TileTestDataBuilder.create().withId(1).withSets("Western").build(),
            TileTestDataBuilder.create().withId(2).withSets("Western").build(),
            TileTestDataBuilder.create().withId(3).withSets("Western").build(),
            TileTestDataBuilder.create().withId(4).withSets("Western").build(),
        ];
        const unlockedTiles = [tileSets[0], tileSets[1]];
        const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];

        const hex = FakeHex.create(createPoint(0, 4));

        const sut = createPresenterWithoutUnlockedTileForToday(tileSets, unlockedTiles, "Western", progressCoordinates, () => 100);
        // act
        sut.present(hex);
        // assert
        expectNothingToBeRenderedOn(hex);
    });

    it("should not render to hexes when there are no progress co-ordinates", function () {
        // arrange
        const tileSets = [
            TileTestDataBuilder.create().withId(1).withSets("Modern").build(),
            TileTestDataBuilder.create().withId(2).withSets("Modern").build()
        ];
        const unlockedTiles = [tileSets[0], tileSets[1]];
        const progressCoordinates = [];

        const hex1 = FakeHex.create(createPoint(0, 0));
        const hex2 = FakeHex.create(createPoint(0, 1));

        const sut = createPresenterWithoutUnlockedTileForToday(tileSets, unlockedTiles, "Modern", progressCoordinates, () => 100);
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
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets("Western").build(),
                TileTestDataBuilder.create().withId(2).withSets("Western").build()
            ];
            const unlockedTiles = [tileSets[0], tileSets[1]];
            const progressCoordinates = [createPoint(0, 0), createPoint(0, 1)];

            const hex1 = FakeHex.create(progressCoordinates[0]);
            const hex2 = FakeHex.create(progressCoordinates[1]);

            const sut = createPresenterWithoutUnlockedTileForToday(tileSets, unlockedTiles, "Western", progressCoordinates, () => 100);
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
                    const tileSets = [
                        TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(3).withImage("stones.png").withSets("Nature").build(),
                        TileTestDataBuilder.create().withId(4).withSets("Nature").build(),
                    ];
                    const unlockedTiles = [tileSets[0], tileSets[1]];
                    const progressCoordinates = [createPoint(0, 0), createPoint(0, 1), createPoint(0, 2), createPoint(0, 3)];

                    const hex1 = FakeHex.create(progressCoordinates[0]);
                    const hex2 = FakeHex.create(progressCoordinates[1]);
                    const hex3 = FakeHex.create(progressCoordinates[2]);
                    const hex4 = FakeHex.create(progressCoordinates[3]);

                    const sut = createPresenterWithoutUnlockedTileForToday(tileSets, unlockedTiles, "Nature", progressCoordinates, () => data.progress);
                    // act
                    sut.present(hex1);
                    sut.present(hex2);
                    sut.present(hex3);
                    sut.present(hex4);
                    // assert
                    expectOnlyProgressToBeRenderedOn(hex1, data.hex1Progress);
                    expectOnlyProgressToBeRenderedOn(hex2, data.hex2Progress);
                    expectOnlyProgressToBeRenderedOn(hex3, data.hex3Progress);
                    expectImageAndProgressToBeRenderedOn(hex4, tileSets[2].image, data.hex4Progress);
                });
            });

            it("should only select next locked tile from specified tile set", function () {
                // arrange
                const tileSets = [
                    TileTestDataBuilder.create().withId(1).withImage("saloon.png").withSets("Western").build(),
                    TileTestDataBuilder.create().withId(2).withImage("grass.png").withSets("Nature").build(),
                    TileTestDataBuilder.create().withId(3).withImage("desert.png").withSets("Desert", "Western").build()
                ];
                const unlockedTiles = [tileSets[0]];
                const progressCoordinates = [createPoint(1, 0)];

                const hex = FakeHex.create(progressCoordinates[0]);

                const sut = createPresenterWithoutUnlockedTileForToday(tileSets, unlockedTiles, "Western", progressCoordinates, () => 100);
                // act
                sut.present(hex);
                // assert
                expectImageAndProgressToBeRenderedOn(hex, tileSets[2].image, 100);
            });
        });

        describe("tile already unlocked for today", function () {
            it("should render image for that tile", function () {
                // arrange
                const clock = FakeClock.create();
                const tileSets = [
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build(),
                    TileTestDataBuilder.create().withSets("Nature").build()
                ];

                const tiles = new Tiles(tileSets)
                    .changeTileSet("Nature")
                    .unlockTile(tileSets[0]);
                clock.advanceOneDay();
                tiles.unlockTile(tileSets[1]);

                const progressCoordinates = [createPoint(0, 0)];
                const hex = FakeHex.create(progressCoordinates[0]);

                const sut = createPresenter(tiles, progressCoordinates, () => 100);
                // act
                sut.present(hex)
                // assert
                expectImageAndProgressToBeRenderedOn(hex, tileSets[1].image, 100);
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
        unlockedTiles.forEach(tile => {
            tiles.unlockTile(tile);
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

describe("Tiles", function () {
    describe("changeTileSet", function () {
        it("should save progress", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date(2019, 01, 01);
            const unlockDate2 = new Date(2019, 01, 02);
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(3).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileSets[0], unlockDate1)
                .withUnlockedTile(tileSets[1], unlockDate2)
                .build();

            let actualProgress = new Progress();
            const sut = new Tiles(tileSets)
                .savesProgressUsing(progress => actualProgress = progress)
                .unlockTile(tileSets[0], unlockDate1)
                .unlockTile(tileSets[1], unlockDate2);
            // act
            sut.changeTileSet(tileSet);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });
    });

    describe("unlockTile", function() {
        it("should save progress", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date(2019, 01, 01);
            const unlockDate2 = new Date(2019, 01, 02);
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(3).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileSets[0], unlockDate1)
                .withUnlockedTile(tileSets[1], unlockDate2)
                .build();

            let actualProgress = new Progress();
            const sut = new Tiles(tileSets)
                .changeTileSet(tileSet)
                .unlockTile(tileSets[0], unlockDate1)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.unlockTile(tileSets[1], unlockDate2);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });

        it("should support unlocking tiles with a tile id", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date();
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileSets[0], unlockDate1)
                .build();

            let actualProgress = new Progress();
            const sut = new Tiles(tileSets)
                .changeTileSet(tileSet)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.unlockTile(1, unlockDate1);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });

        it("should ignore a tile if it is already unlocked", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date();
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileSets[0], unlockDate1)
                .build();

            let actualProgress = new Progress();
            const sut = new Tiles(tileSets)
                .changeTileSet(tileSet)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.unlockTile(tileSets[0], unlockDate1);
            sut.unlockTile(tileSets[0], unlockDate1);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });
    });
});