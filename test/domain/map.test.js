require = require("esm")(module)
const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const Map = require("../../domain/map").default;
const faker = require("faker");

describe("map", function () {
    it("should be a rectangle the size of width and height specified in the gridOptions", function () {
        // arrange
        const presenter = RecordingPresenter.create();
        const sut = createMap({ height: 4, width: 3 });
        // act
        sut.render(presenter)
        // assert
        expect(presenter.coordinates)
            .to.have.deep.members([
                coordinate(0, 0), coordinate(1, 0), coordinate(2, 0),
                coordinate(0, 1), coordinate(1, 1), coordinate(2, 1),
                coordinate(0, 2), coordinate(1, 2), coordinate(2, 2),
                coordinate(0, 3), coordinate(1, 3), coordinate(2, 3),
            ]);
    });

    it("should create hexes as specified in the hex options", function () {
        // arrange
        const hexOptions = {
            size: 2,
            orientation: "pointy",
            customProperty: faker.random.alphaNumeric()
        };
        const presenter = RecordingPresenter.create();
        const sut = createMap({ height: 1, width: 1 }, hexOptions);
        // act
        sut.render(presenter)
        // assert
        expect(presenter.hexes[0].size).to.equal(hexOptions.size);
        expect(presenter.hexes[0].orientation).to.equal(hexOptions.orientation);
        expect(presenter.hexes[0].customProperty).to.equal(hexOptions.customProperty);
    });

    function createMap(gridOptions, hexOptions) {
        return new Map(gridOptions, hexOptions);
    }

    function coordinate(x, y) {
        return { x, y };
    }

    class RecordingPresenter {
        constructor() {
            this.hexes = [];
            this.coordinates = [];
        }

        static create() {
            return new RecordingPresenter();
        }

        present(hex) {
            this.hexes.push(hex);
            this.coordinates.push(hex.coordinates());
        }
    }
});