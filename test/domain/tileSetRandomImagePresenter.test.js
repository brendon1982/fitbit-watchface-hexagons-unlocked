require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const _ = require("lodash");
const faker = require("faker");

const TileTestDataBuilder = require("./builders/tileTestDataBuilder");
const FakeHex = require("./fakes/fakeHex");
const Tiles = require("../../domain/tiles").default;

describe("randomTilePresenter", function () {
    repeat(50, () => {
        it("should render one of the unlockedTiles images on the hex", function () {
            // arrange
            const tileSets = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("trees.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("stones.png").withSets("Nature").build()
            ];
            const unlockedTiles = [tileSets[0], tileSets[1]];
            const possibleImages = [tileSets[0].image, tileSets[1].image];

            const hex = FakeHex.create()

            const sut = createPresenter(tileSets, unlockedTiles, "Nature");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });

        it("should render one of the images from the set on the hex", function () {
            // arrange
            const tileSets = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Medeival", "Nature").build(),
                TileTestDataBuilder.create().withImage("desert.png").withSets("Western", "Nature").build(),
                TileTestDataBuilder.create().withImage("cactus.png").withSets("Western", "Medeival", "Nature").build()
            ];
            const unlockedTiles = [tileSets[0], tileSets[1], tileSets[2]];
            const possibleImages = [tileSets[1].image, tileSets[2].image];

            const hex = FakeHex.create()

            const sut = createPresenter(tileSets, unlockedTiles, "Western");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });

        it("should only render unlocked tiles that are in available tiles on the hex", function () {
            // arrange
            const tileSets = [
                TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(3).withSets("Nature").build()
            ];
            const otherTile = TileTestDataBuilder.create().withId(4).withSets("Nature").build();
            const unlockedTiles = [tileSets[0], otherTile, tileSets[2], tileSets[1]];
            const possibleImages = [tileSets[0].image, tileSets[1].image, tileSets[2].image];

            const hex = FakeHex.create()

            const sut = createPresenter(tileSets, unlockedTiles, "Nature");
            // act
            sut.present(hex)
            // assert
            expect(possibleImages).to.contain(hex.renderedImage);
        });
    });

    it("should not render on the hex if there are no unlocked tiles", function () {
        // arrange
        const tileSets = [
            TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(3).withSets("Nature").build()
        ];
        const unlockedTiles = [];

        const hex = FakeHex.create()

        const sut = createPresenter(tileSets, unlockedTiles, "Nature");
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).to.be.undefined;
    });

    it("should not render on the hex if it is at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createRandomPoint(), createRandomPoint(), createRandomPoint()]
        const tileSets = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTiles = [tileSets[0], tileSets[1], tileSets[2]];

        const hex = FakeHex.create(ignoredPoints[1])

        const sut = createPresenter(tileSets, unlockedTiles, "Nature", ignoredPoints);
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).to.be.undefined;
    });

    it("should render on the hex if it is not at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createPoint(1, 1), createPoint(2, 2), createPoint(3, 3)]
        const tileSets = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTiles = [tileSets[0], tileSets[1] , tileSets[2]];

        const hex = FakeHex.create(createPoint(4, 4))

        const sut = createPresenter(tileSets, unlockedTiles, "Nature", ignoredPoints);
        // act
        sut.present(hex)
        // assert
        expect(hex.renderedImage).not.to.be.undefined;
    });

    function createPresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        ignoredCoordinates = ignoredCoordinates || [];
        const RandomTileSetPresenter = require("../../domain/tileSetRandomImagePresenter").default;

        const tiles = new Tiles(allTiles);
        tiles.changeTileSet(tileSet);

        unlockedTiles.forEach(tile => { tiles.unlockTile(tile) });

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