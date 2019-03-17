require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const faker = require("faker");
const FakeClock = require("./fakes/fakeClock");

const TileTestDataBuilder = require("./builders/tileTestDataBuilder");
const TileSet = require("../../domain/tilesSet").default;
const Progress = require("../../domain/progress").default;
const ProgressTestDataBuilder = require("./builders/progressTestDataBuilder");

// TODO tileSet was refactored our of the presenters, most of it therefore tested
//      through the presenter tests. These tests grew organically for things added
//      to tileSet after it was refactored out.
describe("tileSet", function () {
    describe("changeTileSet", function () {
        it("should save progress", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date(2019, 01, 01);
            const unlockDate2 = new Date(2019, 01, 02);
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(3).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tiles[0], unlockDate1)
                .withUnlockedTile(tiles[1], unlockDate2)
                .build();

            let actualProgress = new Progress();
            const sut = new TileSet(tiles)
                .savesProgressUsing(progress => actualProgress = progress)
                .unlockTile(tiles[0], unlockDate1)
                .unlockTile(tiles[1], unlockDate2);
            // act
            sut.changeTileSet(tileSet);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });

        it("should not save progress if the tile set is not different to the current", function () {
            // arrange
            const tileSet = faker.random.word();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build()
            ];

            let actualProgress;
            const sut = new TileSet(tiles)
                .changeTileSet(tileSet)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.changeTileSet(tileSet);
            // assert
            expect(sut.currentTileSet).to.equal(tileSet);
            expect(actualProgress).to.be.undefined;
        });

        it("should not save progress if the tile set does not exist", function () {
            // arrange
            const tileSet = faker.random.word();
            const nonExistantTileSet = faker.random.word();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build()
            ];

            let actualProgress;
            const sut = new TileSet(tiles)
                .changeTileSet(tileSet)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.changeTileSet(nonExistantTileSet);
            // assert
            expect(sut.currentTileSet).to.equal(tileSet);
            expect(actualProgress).to.be.undefined;
        });
    });

    describe("unlockTile", function () {
        it("should save progress", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date(2019, 01, 01);
            const unlockDate2 = new Date(2019, 01, 02);
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(3).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tiles[0], unlockDate1)
                .withUnlockedTile(tiles[1], unlockDate2)
                .build();

            let actualProgress = new Progress();
            const sut = new TileSet(tiles)
                .changeTileSet(tileSet)
                .unlockTile(tiles[0], unlockDate1)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.unlockTile(tiles[1], unlockDate2);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });

        it("should support unlocking tiles with a tile id", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build()
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tiles[0], unlockDate1)
                .build();

            let actualProgress = new Progress();
            const sut = new TileSet(tiles)
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
            const unlockDate = new Date();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
            ];
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tiles[0], unlockDate)
                .build();

            let actualProgress = new Progress();
            const sut = new TileSet(tiles)
                .changeTileSet(tileSet)
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.unlockTile(1, unlockDate);
            sut.unlockTile(1, unlockDate);
            // assert
            expect(actualProgress).to.deep.equal(expectedProgress);
        });
    });

    describe("loadProgressUsing", function () {
        it("should populate progress with the result of given progress reader", function () {
            // arrange
            const tileSet = faker.random.word();
            const unlockDate1 = new Date();
            const unlockDate2 = new Date();
            const tileAreadyUnlocked = TileTestDataBuilder.create().withId(1).build();
            const tileBeingUnlocked = TileTestDataBuilder.create().withId(2).build();
            const savedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileAreadyUnlocked, unlockDate1)
                .build();
            const expectedProgress = ProgressTestDataBuilder.create()
                .withTileSet(tileSet)
                .withUnlockedTile(tileAreadyUnlocked, unlockDate1)
                .withUnlockedTile(tileBeingUnlocked, unlockDate2)
                .build();

            let actualProgress = new Progress();
            const sut = new TileSet()
                .savesProgressUsing(progress => actualProgress = progress);
            // act
            sut.loadProgressUsing(() => {
                return savedProgress;
            });
            // assert
            sut.unlockTile(tileBeingUnlocked, unlockDate2);
            expect(actualProgress).to.deep.equal(expectedProgress);
        });
    });

    describe("getUnlockedTiles", function () {
        it("should only start returning unlocked tiles the day after they're unlocked", function () {
            // arrange
            const tileSet = faker.random.word();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(3).withSets(tileSet).build()
            ];
            const clock = FakeClock.create();
            const sut = new TileSet(tiles)
                .changeTileSet(tileSet)
                .unlockTile(tiles[0]);

            clock.advanceOneDay();

            const unlockedTilesOnDay1BeforeNewUnlock = sut.getUnlockedTiles();
            sut.unlockTile(tiles[1]);
            const unlockedTilesOnDay1AfterNewUnlock = sut.getUnlockedTiles();

            clock.advanceOneDay();
            // pre-assert
            expect(unlockedTilesOnDay1BeforeNewUnlock).to.have.deep.members(unlockedTilesOnDay1AfterNewUnlock)
            // act
            const unlockedTilesOnDay2 = sut.getUnlockedTiles();
            // assert
            expect(unlockedTilesOnDay2).to.have.deep.members([tiles[0], tiles[1]]);
        })
    });
});