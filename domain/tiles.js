import { availableTiles } from "../resources/availableTiles";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class Tiles {
    constructor(allTiles) {
        this.unlockedTiles = [];
        this.allTiles = allTiles || availableTiles;
    }

    unlockTile(id) {
        this.unlockedTiles.push(id)
    }

    getUnlockedTiles(tileSet) {
        return this.allTiles
            .filter(tile => this.unlockedTiles.some(id => tile.id === id))
            .filter(tile => tile.sets.some(set => tileSet === set));
    }

    getNextTileToUnlock(tileSet) {
        const tiles = this.allTiles
            .filter(tile => tile.sets.some(set => tileSet === set));

        return this.find(tiles, tile => !this.unlockedTiles.some(id => tile.id === id));
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