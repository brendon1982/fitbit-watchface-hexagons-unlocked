require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const _ = require("lodash");
const faker = require("faker");

const TileTestDataBuilder = require("./tileTestDataBuilder");
const FakeHex = require("./fakeHex");
const Tiles = require("../../domain/tiles").default;

describe("randomTilePresenter", function () {
    repeat(50, () => {
        it("should render one of the unlockedTiles images on the hex", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("trees.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("stones.png").withSets("Nature").build()
            ];
            const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id];
            const possibleImages = [availableTiles[0].image, availableTiles[1].image];

            const hex = FakeHex.create()

            const sut = createPresenter(availableTiles, unlockedTileIds, "Nature");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });

        it("should render one of the images from the set on the hex", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Medeival", "Nature").build(),
                TileTestDataBuilder.create().withImage("desert.png").withSets("Western", "Nature").build(),
                TileTestDataBuilder.create().withImage("cactus.png").withSets("Western", "Medeival", "Nature").build()
            ];
            const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id, , availableTiles[2].id];
            const possibleImages = [availableTiles[1].image, availableTiles[2].image];

            const hex = FakeHex.create()

            const sut = createPresenter(availableTiles, unlockedTileIds, "Western");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });

        it("should only render unlocked tiles that are in available tiles on the hex", function () {
            // arrange
            const availableTiles = [
                TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(3).withSets("Nature").build()
            ];
            const unlockedTileIds = [1, 4, 3, 2];
            const possibleImages = [availableTiles[0].image, availableTiles[1].image, availableTiles[2].image];
    
            const hex = FakeHex.create()
    
            const sut = createPresenter(availableTiles, unlockedTileIds, "Nature");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });
    });

    it("should not render on the hex if there are no unlocked tiles", function () {
        // arrange
        const availableTiles = [
            TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(3).withSets("Nature").build()
        ];
        const unlockedTileIds = [];

        const hex = FakeHex.create()

        const sut = createPresenter(availableTiles, unlockedTileIds, "Nature");
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).to.be.undefined;
    });

    it("should not render on the hex if it is at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createRandomPoint(), createRandomPoint(), createRandomPoint()]
        const availableTiles = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id, , availableTiles[2].id];

        const hex = FakeHex.create(ignoredPoints[1])

        const sut = createPresenter(availableTiles, unlockedTileIds, "Nature", ignoredPoints);
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).to.be.undefined;
    });

    it("should render on the hex if it is not at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createPoint(1, 1), createPoint(2, 2), createPoint(3, 3)]
        const availableTiles = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTileIds = [availableTiles[0].id, availableTiles[1].id, , availableTiles[2].id];

        const hex = FakeHex.create(createPoint(4, 4))

        const sut = createPresenter(availableTiles, unlockedTileIds, "Nature", ignoredPoints);
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).not.to.be.undefined;
    });

    function createPresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        ignoredCoordinates = ignoredCoordinates || [];
        const RandomTileSetPresenter = require("../../domain/randomTileSetPresenter").default;
        
        const tiles = new Tiles(allTiles);
        tiles.changeTileSet(tileSet);
        unlockedTiles.forEach(id => {tiles.unlockTile(id)});

        return new RandomTileSetPresenter(tiles, ignoredCoordinates);
    }

    function repeat(times, func) {
        _.range(times).forEach(func);
    }

    function createRandomPoint() {
        return {
            x: faker.random.number(),
            y: faker.random.number()
        }
    }

    function createPoint(x, y) {
        return { x, y }
    }
});