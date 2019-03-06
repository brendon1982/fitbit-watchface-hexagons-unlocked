import { availableTiles } from "./availableTiles";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class Tiles {
    constructor(allTiles) {
        this.unlockedTiles = [];
        this.tileSet = "";
        this.allTiles = allTiles || availableTiles;
    }

    unlockTile(id) {
        this.unlockedTiles.push(id);
        this.cachedUnlockedTiles = undefined
        this.cachedNextTileToUnlocked = undefined;
        return this;
    }

    changeTileSet(tileSet) {
        this.tileSet = tileSet;
        this.cachedUnlockedTiles = undefined
        this.cachedNextTileToUnlocked = undefined;
        return this;
    }

    getUnlockedTiles() {
        if (this.cachedUnlockedTiles) {
            return this.cachedUnlockedTiles.value;
        }

        this.cachedUnlockedTiles = {
            value: this.allTiles
                .filter(tile => this.unlockedTiles.some(id => tile.id === id))
                .filter(tile => tile.sets.some(set => this.tileSet === set))
        };

        return this.cachedUnlockedTiles.value;
    }

    getNextTileToUnlock() {
        if (this.cachedNextTileToUnlocked) {
            return this.cachedNextTileToUnlocked.value;
        }

        const tiles = this.allTiles
            .filter(tile => tile.sets.some(set => this.tileSet === set));

        const nextTileToBeUnlocked = this.find(tiles, tile => !this.unlockedTiles.some(id => tile.id === id));

        this.cachedNextTileToUnlocked = {
            value: nextTileToBeUnlocked
        };

        return this.cachedNextTileToUnlocked.value;
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