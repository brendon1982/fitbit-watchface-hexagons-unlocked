
export default class RandomTileSetPresenter {
    constructor(availableTiles, unlockedTileIds, tileSet, ignoredCoordinates) {
        this.availableTiles = availableTiles;
        this.unlockedTileIds = unlockedTileIds;
        this.tileSet = tileSet;
        this.ignoredCoordinates = ignoredCoordinates || [];
    }

    present(hex) {
        const hexCoordinates = hex.coordinates()
        if (this.isIgnoredCoordinate(hexCoordinates)) {
            return;
        }

        const unlockedTiles = this.availableTiles
            .filter(tile => this.unlockedTileIds.some(id => tile.id === id))
            .filter(tile => tile.sets.some(set => this.tileSet === set));

        if (unlockedTiles.length === 0) {
            return;
        }

        const randomTileIndex = Math.floor(Math.random() * unlockedTiles.length);
        const tile = unlockedTiles[randomTileIndex];

        hex.render(tile.image)
    }

    isIgnoredCoordinate(coordinate) {
        return this.ignoredCoordinates.some(c => c.x === coordinate.x && c.y === coordinate.y);
    }
}