import { formatDateAsString } from "../common/utils";
import { availableTiles } from "./availableTiles";
import Progress from "./progress";
import UnlockedTile from "./unlockedTile";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class Tiles {
    constructor(allTiles) {
        this.unlockedTiles = [];
        this.tileSet = "";
        this.allTiles = allTiles || availableTiles;
        this.progressWriter = () => {};
    }

    // TODO should probably check if the tile has already been unlocked ... it seems like making unlockedTiles a dictionary would make this much easier.
    unlockTile(tile, date) {
        date = date || new Date();
        this.unlockedTiles.push(new UnlockedTile(tile.id, date));
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;

        return this;
    }

    changeTileSet(tileSet) {
        this.tileSet = tileSet;
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;

        this.progressWriter(new Progress(this.tileSet, this.unlockedTiles));

        return this;
    }

    savesUsing(progressWriter) {
        this.progressWriter = progressWriter;
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
        const todaysUnlockedTile = find(this.unlockedTiles, unlockedTile => unlockedTile.date === currentDate);

        if (todaysUnlockedTile) {
            return find(tilesInSet, tile => tile.id === todaysUnlockedTile.id);
        }

        const tileBeingUnlockedToday = find(tilesInSet, tile => !this.unlockedTiles.some(unlockedTile => tile.id === unlockedTile.id));

        this.cachedTileBeingUnlockedToday = {
            value: tileBeingUnlockedToday
        };

        return this.cachedTileBeingUnlockedToday.value;
    }
}

function find(list, predicate) {
    for (const item of list) {
        if (predicate(item)) {
            return item;
        }
    }

    return undefined;
}