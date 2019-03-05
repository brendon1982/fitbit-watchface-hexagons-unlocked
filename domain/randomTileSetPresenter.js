import { alea } from "../libs/alea/alea";

export default class RandomTileSetPresenter {
    constructor(tiles, tileSet, ignoredCoordinates) {
        this.tiles = tiles;
        this.tileSet = tileSet;
        this.ignoredCoordinates = ignoredCoordinates || [];
    }

    present(hex) {
        const hexCoordinates = hex.coordinates()
        if (this.isIgnoredCoordinate(hexCoordinates)) {
            return;
        }

        const unlockedTiles = this.tiles.getUnlockedTiles(this.tileSet);
        if (unlockedTiles.length === 0) {
            return;
        }

        const tile = this.randomTile(unlockedTiles);

        hex.render(tile.image)
    }

    isIgnoredCoordinate(coordinate) {
        return this.ignoredCoordinates.some(c => c.x === coordinate.x && c.y === coordinate.y);
    }

    randomTile(tiles) {
        const date = new Date();
        const seed = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`

        if (seed !== this.lastSeed) {
            this.lastSeed = seed;
            this.random = new alea(seed);
        }

        const randomIndex = Math.floor(this.random() * tiles.length);

        return tiles[randomIndex];
    }
}