import { alea } from "../libs/alea/alea";

export default class TileSetRandomImagePresenter {
    constructor(tileSet, ignoredCoordinates, hexRenderer) {
        this.tileSet = tileSet;
        this.ignoredCoordinates = ignoredCoordinates || [];
        this.hexRenderer = hexRenderer;
    }

    present(coordinates) {
        if (this.isIgnoredCoordinate(coordinates)) {
            return;
        }

        const unlockedTiles = this.tileSet.getUnlockedTiles();
        if (unlockedTiles.length === 0) {
            return;
        }

        const tile = this.randomTile(unlockedTiles);
        this.hexRenderer.render(coordinates, tile.image)
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