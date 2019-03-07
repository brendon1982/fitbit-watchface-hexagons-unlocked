import { availableTiles } from "./availableTiles";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class Tiles {
    constructor(allTiles) {
        this.unlockedTiles = [];
        this.tileSet = "";
        this.allTiles = allTiles || availableTiles;
    }

    // TODO should probably check if the tile has already been unlocked ... it seems like making unlockedTiles a dictionary would make this much easier.
    unlockTile(id, date) {
        date = date || new Date();
        this.unlockedTiles.push(new UnlockedTile(id, date));
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;
        return this;
    }

    changeTileSet(tileSet) {
        this.tileSet = tileSet;
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;
        return this;
    }

    getUnlockedTiles() {
        if (this.cachedUnlockedTiles) {
            return this.cachedUnlockedTiles.value;
        }

        this.cachedUnlockedTiles = {
            value: this.allTiles
                .filter(tile => this.unlockedTiles.some(unlockedTile => tile.id === unlockedTile.id))
                .filter(tile => tile.sets.some(set => this.tileSet === set))
        };

        return this.cachedUnlockedTiles.value;
    }

    getTileBeingUnlockedToday() {
        if (this.cachedTileBeingUnlockedToday) {
            return this.cachedTileBeingUnlockedToday.value;
        }

        const tilesInSet = this.allTiles
            .filter(tile => tile.sets.some(set => this.tileSet === set));

        const currentDate = formatDateAsString(new Date());
        const todaysUnlockedTile = this.find(this.unlockedTiles, unlockedTile => unlockedTile.date === currentDate);

        if (todaysUnlockedTile) {
            return this.find(tilesInSet, tile => tile.id === todaysUnlockedTile.id);
        }

        const tileBeingUnlockedToday = this.find(tilesInSet, tile => !this.unlockedTiles.some(unlockedTile => tile.id === unlockedTile.id));

        this.cachedTileBeingUnlockedToday = {
            value: tileBeingUnlockedToday
        };

        return this.cachedTileBeingUnlockedToday.value;
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

class UnlockedTile {
    constructor(id, date) {
        this.id = id;
        this.date = formatDateAsString(date);
    }
}

function formatDateAsString(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}