
export default class RandomTileSetPresenter {
    constructor(availableTiles, unlockedTileIds, tileSet, progressCoordinates, progressAccessor) {
        this.availableTiles = availableTiles;
        this.unlockedTileIds = unlockedTileIds;
        this.tileSet = tileSet;
        this.progressCoordinates = progressCoordinates || [];
        this.progressAccessor = progressAccessor;

        this.tileBeingUnlocked = this.getNextTileToUnlock();
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

    getNextTileToUnlock() {
        const tileSet = this.availableTiles
            .filter(tile => tile.sets.some(set => this.tileSet === set));

        return this.find(tileSet, tile => !this.unlockedTileIds.some(id => tile.id === id));
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

    find(list, predicate) {
        for (const item of list) {
            if (predicate(item)) {
                return item;
            }
        }

        return undefined;
    }
}