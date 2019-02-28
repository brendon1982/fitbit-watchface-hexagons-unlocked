
export default class RandomTileSetPresenter {
    constructor(availableTiles, unlockedTileIds, tileSet, ignoredCoordinates) {
        this.availableTiles = availableTiles;
        this.unlockedTileIds = unlockedTileIds;
    }
    
    present(hex) {
        const unlockedTiles = this.availableTiles.filter(tile => this.unlockedTileIds.some(id => tile.id === id));
        const tile = unlockedTiles[Math.floor(Math.random() * unlockedTiles.length)];
        hex.render(tile.image)
    }
}