require = require("esm")(module)
const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const Map = require("../../domain/map").default;

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

    // TODO should create hexes as specified in hexOptions
    // - then -
    // TODO get eslint working
    // TODO write replacement randomTilePresenter that doesn't rely on scanning the FS, 
    //      knows about all tiles (it will probably just have a known list of tiles, or have one injected),
    //      and supports exclusion co-ordinates where it wont present any tiles.
    // TODO write a tileUnlockProgressPresenter

    function createMap(gridOptions) {
        return new Map(gridOptions);
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