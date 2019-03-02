
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
        if (!this.tileBeingUnlocked) {
            return;
        }

        const indexOfHexInProgressCoordinates = this.getIndexOhHexInProgressCoordinates(hex);
        if (indexOfHexInProgressCoordinates < 0) {
            return;
        }

        const progress = this.progressAccessor();
        const hexProgress = Math.min(Math.max((progress * this.progressCoordinates.length) - (indexOfHexInProgressCoordinates * 100), 0), 100);

        hex.render(this.tileBeingUnlocked.image);
        hex.progress(hexProgress);
    }

    getNextTileToUnlock() {
        return this.availableTiles
            .filter(tile => tile.sets.some(set => this.tileSet === set))
            .find(tile => !this.unlockedTileIds.some(id => tile.id === id));
    }

    getIndexOhHexInProgressCoordinates(hex) {
        const hexCoordinates = hex.coordinates();
        return this.progressCoordinates.findIndex(c => c.x === hexCoordinates.x && c.y === hexCoordinates.y);
    }
}