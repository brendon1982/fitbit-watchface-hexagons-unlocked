import { formatDateAsString } from "../common/utils";
import { tiles } from "./tiles";
import Progress from "./progress";
import UnlockedTile from "./unlockedTile";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class TileSet {
    constructor(overrideTiles) {
        this.unlockedTiles = [];
        this.currentTileSet = "";
        this.allTiles = overrideTiles || tiles;
        this.progressWriter = () => { };
    }

    unlockTile(tile, date) {
        date = date || new Date();
        const tileId = tile.id || tile;

        if (this.isTileUnlocked(tileId)) {
            return this;
        }

        this.unlockedTiles.push(new UnlockedTile(tileId, date));
        this.cachedUnlockedTiles = undefined

        this.progressWriter(new Progress(this.currentTileSet, this.unlockedTiles));

        return this;
    }

    isTileUnlocked(tileId) {
        return find(this.unlockedTiles, withId(tileId));
    }

    changeTileSet(tileSet) {
        this.currentTileSet = tileSet;
        this.cachedUnlockedTiles = undefined

        this.progressWriter(new Progress(this.currentTileSet, this.unlockedTiles));

        return this;
    }

    savesProgressUsing(progressWriter) {
        this.progressWriter = progressWriter;
        return this;
    }

    loadProgressUsing(progressReader) {
        const progress = progressReader();
        this.currentTileSet = progress.tileSet;
        this.unlockedTiles = progress.unlockedTiles;
        return this;
    }

    getUnlockedTiles() {
        const today = formatDateAsString(new Date());

        if (this.cachedUnlockedTiles && this.cachedUnlockedTiles[today]) {
            return this.cachedUnlockedTiles[today];
        }

        this.cachedUnlockedTiles = {
            [today]: this.allTiles
                .filter(inButNotOn(this.unlockedTiles, today))
                .filter(withSet(this.currentTileSet))
        };

        return this.cachedUnlockedTiles[today];
    }

    getTileBeingUnlockedToday() {
        const tilesInSet = this.allTiles
            .filter(withSet(this.currentTileSet));

        const today = formatDateAsString(new Date());
        const todaysUnlockedTile = find(this.unlockedTiles, on(today));

        if (todaysUnlockedTile) {
            return find(tilesInSet, withId(todaysUnlockedTile.id));
        }

        return find(tilesInSet, notIn(this.unlockedTiles));
    }
}

function withId(id) {
    return (tile) => tile.id === id;
}

function inButNotOn(tiles, day) {
    return (inputTile) => {
        return tiles.some(tile => inputTile.id === tile.id && day !== tile.date);
    }
}

function on(day) {
    return (inputTile) => {
        return inputTile.date === day;
    }
}

function notIn(tiles) {
    return (inputTile) => {
        return !tiles.some(tile => inputTile.id === tile.id);
    }
}

function withSet(inputSet) {
    return tile => tile.sets.some(set => inputSet === set);
}

function find(list, predicate) {
    for (const item of list) {
        if (predicate(item)) {
            return item;
        }
    }

    return undefined;
}