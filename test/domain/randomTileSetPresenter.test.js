require = require("esm")(module)
const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const RandomTilePresenter = require("../../domain/randomTileSetPresenter").default;
const faker = require("faker");

describe("randomTilePresenter", function () {
    it("should render one of the unlockedTiles images at 100 percent unlock progress", function () {
        // arrange
        let renderedImage = undefined;
        let renderedUnlockProgress = undefined;

        const availableTiles = [{
            id: faker.random.number(),
            name: "Plain Grass",
            sets: ["Medeival", "Nature"],
            image: "/mnt/assets/resources/Tiles/Terrain/Grass/grass.png"
        }, {
            id: faker.random.number(),
            name: "Plain Sand",
            sets: ["Western", "Nature"],
            image: "/mnt/assets/resources/Tiles/Terrain/Grass/sand.png"
        },{
            id: faker.random.number(),
            name: "Plain Dirt",
            sets: ["Western", "Medeival", "Nature"],
            image: "/mnt/assets/resources/Tiles/Terrain/Grass/dirt.png"
        }];
        const unlockedTiles = [availableTiles[0].id, availableTiles[1].id];
        const possibleImages = [availableTiles[0].image, availableTiles[1].image];
        const sut = createPresenter(availableTiles, unlockedTiles, "Nature");
        // act
        sut.present({
            render: function (image, unlockProgress) {
                renderedImage = image;
                renderedUnlockProgress = unlockProgress;
            }
        })
        // assert
        expect(possibleImages).to.contain(renderedImage);
        expect(renderedUnlockProgress).to.equal(100);
    });

    // TODO update above test to run multiple times as it is a random test and with the current implementation will failv
    // TODO should only render tiles from tile set
    // TODO hex at ignoredCoordinates
    // TODO no unlocked tiles
    // TODO unlocked tile not in all tiles

    // TODO write replacement randomTilePresenter that doesn't rely on scanning the FS, 
    //      knows about all tiles (it will probably just have a known list of tiles, or have one injected),
    //      and supports exclusion co-ordinates where it wont present any tiles.
    // TODO write a tileUnlockProgressPresenter

    function createPresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        ignoredCoordinates = ignoredCoordinates || [];

        return new RandomTilePresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates);
    }
});