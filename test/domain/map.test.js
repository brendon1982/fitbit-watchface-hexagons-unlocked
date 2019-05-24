require = require("esm")(module)
const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const Map = require("../../domain/map").default;

describe("map", function () {
    describe("render", function () {
        it("should be a rectangle the size of width and height specified in the gridOptions", function () {
            // arrange
            const presenter = RecordingPresenter.create();
            const sut = createMap({ height: 4, width: 3 });
            // act
            sut.render(presenter)
            // assert
            expect(presenter.coordinates)
                .to.have.deep.members([
                    creatPoint(0, 0), creatPoint(1, 0), creatPoint(2, 0),
                    creatPoint(0, 1), creatPoint(1, 1), creatPoint(2, 1),
                    creatPoint(0, 2), creatPoint(1, 2), creatPoint(2, 2),
                    creatPoint(0, 3), creatPoint(1, 3), creatPoint(2, 3),
                ]);
        });
    });

    function createMap(gridOptions, hexOptions) {
        return new Map(gridOptions, hexOptions);
    }

    function creatPoint(x, y) {
        return { x, y };
    }

    class RecordingPresenter {
        constructor() {
            this.coordinates = [];
        }

        static create() {
            return new RecordingPresenter();
        }

        present(coordinates) {
            this.coordinates.push(coordinates);
        }
    }
});