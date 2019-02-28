
export default class RandomTileSetPresenter {
    constructor(availableTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        this.availableTiles = availableTiles;
    }
    
    present(hex) {
        const tile = this.availableTiles[Math.floor(Math.random() * this.availableTiles.length)];
        const image = tile.image;
        hex.render(image, 100)
    }
}