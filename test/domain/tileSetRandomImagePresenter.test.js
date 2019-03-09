require = require("esm")(module)

const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const _ = require("lodash");
const faker = require("faker");

const TileTestDataBuilder = require("./builders/tileTestDataBuilder");
const FakeHexRenderer = require("./fakes/fakeHexRenderer");
const TileSet = require("../../domain/tilesSet").default;

describe("randomTilePresenter", function () {
    repeat(50, () => {
        it("should render the hex at the given co-ordinates", function () {
            // arrange
            const cooridnates = createRandomPoint();
            const tiles = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("trees.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("stones.png").withSets("Nature").build()
            ];
            const unlockedTiles = [tiles[0], tiles[1]];

            const hexRenderer = FakeHexRenderer.create();

            const sut = createPresenter(tiles, unlockedTiles, "Nature", [], hexRenderer);
            // act
            sut.present(cooridnates);
            // assert
            expect(hexRenderer.coordinates[0]).to.equal(cooridnates);
        });

        it("should render one of the unlockedTiles images on the hex", function () {
            // arrange
            const tiles = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("trees.png").withSets("Nature").build(),
                TileTestDataBuilder.create().withImage("stones.png").withSets("Nature").build()
            ];
            const unlockedTiles = [tiles[0], tiles[1]];
            const possibleImages = [tiles[0].image, tiles[1].image];

            const hexRenderer = FakeHexRenderer.create();

            const sut = createPresenter(tiles, unlockedTiles, "Nature", [], hexRenderer);
            // act
            sut.present(createRandomPoint());
            // assert
            expect(possibleImages).to.contain(hexRenderer.renderedImages[0]);
        });

        it("should render one of the images from the set on the hex", function () {
            // arrange
            const tiles = [
                TileTestDataBuilder.create().withImage("grass.png").withSets("Medeival", "Nature").build(),
                TileTestDataBuilder.create().withImage("desert.png").withSets("Western", "Nature").build(),
                TileTestDataBuilder.create().withImage("cactus.png").withSets("Western", "Medeival", "Nature").build()
            ];
            const unlockedTiles = [tiles[0], tiles[1], tiles[2]];
            const possibleImages = [tiles[1].image, tiles[2].image];

            const hexRenderer = FakeHexRenderer.create();

            const sut = createPresenter(tiles, unlockedTiles, "Western", [], hexRenderer);
            // act
            sut.present(createRandomPoint());
            // assert
            expect(possibleImages).to.contain(hexRenderer.renderedImages[0]);
        });

        it("should only render unlocked tiles that are in available tiles on the hex", function () {
            // arrange
            const tiles = [
                TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
                TileTestDataBuilder.create().withId(3).withSets("Nature").build()
            ];
            const otherTile = TileTestDataBuilder.create().withId(4).withSets("Nature").build();
            const unlockedTiles = [tiles[0], otherTile, tiles[2], tiles[1]];
            const possibleImages = [tiles[0].image, tiles[1].image, tiles[2].image];

            const hexRenderer = FakeHexRenderer.create();

            const sut = createPresenter(tiles, unlockedTiles, "Nature", [], hexRenderer);
            // act
            sut.present(createRandomPoint());
            // assert
            expect(possibleImages).to.contain(hexRenderer.renderedImages[0]);
        });
    });

    it("should not render on the hex if there are no unlocked tiles", function () {
        // arrange
        const tiles = [
            TileTestDataBuilder.create().withId(1).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(2).withSets("Nature").build(),
            TileTestDataBuilder.create().withId(3).withSets("Nature").build()
        ];
        const unlockedTiles = [];

        const hexRenderer = FakeHexRenderer.create()

        const sut = createPresenter(tiles, unlockedTiles, "Nature", [], hexRenderer);
        // act
        sut.present(createRandomPoint())
        // assert
        expect(hexRenderer.renderedImages).to.be.empty;
    });

    it("should not render on the hex if it is at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createRandomPoint(), createRandomPoint(), createRandomPoint()]
        const tiles = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTiles = [tiles[0], tiles[1], tiles[2]];

        const hexRenderer = FakeHexRenderer.create()

        const sut = createPresenter(tiles, unlockedTiles, "Nature", ignoredPoints, hexRenderer);
        // act
        sut.present(ignoredPoints[1])
        // assert
        expect(hexRenderer.renderedImages).to.be.empty;
    });

    it("should render on the hex if it is not at one of the ignored co-ordinates", function () {
        // arrange
        const ignoredPoints = [createPoint(1, 1), createPoint(2, 2), createPoint(3, 3)]
        const tiles = [
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build(),
            TileTestDataBuilder.create().withSets("Nature").build()
        ];
        const unlockedTiles = [tiles[0], tiles[1], tiles[2]];

        const hexRenderer = FakeHexRenderer.create()

        const sut = createPresenter(tiles, unlockedTiles, "Nature", ignoredPoints, hexRenderer);
        // act
        sut.present(createPoint(4, 4))
        // assert
        expect(hexRenderer.renderedImages).not.to.be.empty;
    });

    function createPresenter(allTiles, unlockedTiles, tileSet, ignoredCoordinates, hexRenderer) {
        ignoredCoordinates = ignoredCoordinates || [];
        const TileSetRandomImagePresenter = require("../../domain/tileSetRandomImagePresenter").default;

        const tiles = new TileSet(allTiles);
        tiles.changeTileSet(tileSet);

        unlockedTiles.forEach(tile => { tiles.unlockTile(tile) });

        return new TileSetRandomImagePresenter(tiles, ignoredCoordinates, hexRenderer);
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