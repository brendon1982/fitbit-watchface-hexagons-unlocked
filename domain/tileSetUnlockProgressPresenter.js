
export default class TileSetUnlockProgressPresenter {
    constructor(tiles, tileSet, progressCoordinates, progressAccessor) {
        this.tiles = tiles;
        this.tileSet = tileSet;
        this.progressCoordinates = progressCoordinates || [];
        this.progressAccessor = progressAccessor;

        this.tileBeingUnlocked = tiles.getNextTileToUnlock(this.tileSet);
    }

    present(hex) {
        const indexOfHexInProgressCoordinates = this.getIndexOfHexInProgressCoordinates(hex);
        if (indexOfHexInProgressCoordinates < 0) {
            return;
        }

        const progress = this.progressAccessor();
        const hexProgress = Math.min(Math.max((progress * this.progressCoordinates.length) - (indexOfHexInProgressCoordinates * 100), 0), 100);

        hex.progress(hexProgress);

        if (this.shouldRenderTileBeingUnlocked(indexOfHexInProgressCoordinates)) {
            hex.render(this.tileBeingUnlocked.image);
        }
    }

    shouldRenderTileBeingUnlocked(indexOfHexInProgressCoordinates) {
        return this.tileBeingUnlocked && indexOfHexInProgressCoordinates === this.progressCoordinates.length - 1;
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