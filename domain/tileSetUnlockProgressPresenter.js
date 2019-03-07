
export default class TileSetUnlockProgressPresenter {
    constructor(tiles, progressCoordinates, progressAccessor) {
        this.tiles = tiles;
        this.progressCoordinates = progressCoordinates || [];
        this.progressAccessor = progressAccessor;
    }

    present(hex) {
        const indexOfHexInProgressCoordinates = this.getIndexOfHexInProgressCoordinates(hex);
        if (indexOfHexInProgressCoordinates < 0) {
            return;
        }

        const progress = this.progressAccessor();
        const individualHexProgress = Math.min(Math.max((progress * this.progressCoordinates.length) - (indexOfHexInProgressCoordinates * 100), 0), 100);

        hex.progress(individualHexProgress);

        const tileBeingUnlockedToday = this.tiles.getTileBeingUnlockedToday();
        const isHexAtLastProgressCoordinate = indexOfHexInProgressCoordinates === this.progressCoordinates.length - 1;
        if (tileBeingUnlockedToday && isHexAtLastProgressCoordinate) {
            hex.render(tileBeingUnlockedToday.image);
        }
    }

    getIndexOfHexInProgressCoordinates(hex) {
        const hexCoordinates = hex.coordinates();

        for (let index = 0; index < this.progressCoordinates.length; index++) {
            const c = this.progressCoordinates[index];
            if (c.x === hexCoordinates.x && c.y === hexCoordinates.y) {
                return index;
            }
        }

        return -1;
    }
}