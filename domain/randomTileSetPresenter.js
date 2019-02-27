
export default class RandomTileSetPresenter {
    constructor(allTiles, unlockedTiles, tileSet, ignoredCoordinates) {
        this.allTiles = allTiles;
    }
    
    present(hex) {
        hex.render(this.allTiles[Math.floor(Math.random() * this.allTiles.length)].image, 100)
    }
}