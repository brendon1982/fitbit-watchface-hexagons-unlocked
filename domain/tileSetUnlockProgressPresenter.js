
export default class TileSetUnlockProgressPresenter {
    constructor(tiles, progressCoordinates, progressAccessor, hexRenderer) {
        this.tiles = tiles;
        this.progressCoordinates = progressCoordinates || [];
        this.progressAccessor = progressAccessor;
        this.hexRenderer = hexRenderer;
    }

    present(coordinates) {
        const indexOfHexInProgressCoordinates = this.getIndexOfHexInProgressCoordinates(coordinates);
        if (indexOfHexInProgressCoordinates < 0) {
            return;
        }

        const progress = this.progressAccessor();
        const individualHexProgressPercentage = Math.min(Math.max((progress * this.progressCoordinates.length) - (indexOfHexInProgressCoordinates * 100), 0), 100);

        this.hexRenderer.progress(coordinates, individualHexProgressPercentage);

        const isHexAtLastProgressCoordinate = indexOfHexInProgressCoordinates === this.progressCoordinates.length - 1;
        if (!isHexAtLastProgressCoordinate) {
            return;
        }

        const tileBeingUnlockedToday = this.tiles.getTileBeingUnlockedToday();
        if (tileBeingUnlockedToday) {
            this.hexRenderer.render(coordinates, tileBeingUnlockedToday.image);
        }
    }

    getIndexOfHexInProgressCoordinates(coordinates) {
        for (let index = 0; index < this.progressCoordinates.length; index++) {
            const c = this.progressCoordinates[index];
            if (c.x === coordinates.x && c.y === coordinates.y) {
                return index;
            }
        }

        return -1;
    }
}