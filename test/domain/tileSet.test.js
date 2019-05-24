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

    describe("getUnlockedTiles", function () {
        it("should return all tiles", function () {
            // arrange
            const tileSet = faker.random.word();
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets(tileSet).build(),
                TileTestDataBuilder.create().withId(2).withSets(tileSet).build()
            ];

            const sut = new TileSet(tiles);
            // act
            const result = sut.getUnlockedTiles();
            // assert
            expect(result).to.have.deep.members([tiles[0], tiles[1]]);
        });
    });
});