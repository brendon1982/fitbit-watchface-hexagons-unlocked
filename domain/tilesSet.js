import { formatDateAsString } from "../common/utils";
import { tileSets } from "./tileSets";
import Progress from "./progress";
import UnlockedTile from "./unlockedTile";

// TODO refactored out of the two presenters, so currently is only tested through their tests
export default class TileSet {
    constructor(overrideTileSets) {
        this.unlockedTiles = [];
        this.currentTileSet = "";
        this.allTiles = overrideTileSets || tileSets;
        this.progressWriter = () => {};
    }

    // TODO should probably check if the tile has already been unlocked ... it seems like making unlockedTiles a dictionary would make this much easier.
    unlockTile(tile, date) {
        date = date || new Date();
        const tileId = tile.id || tile;
        this.unlockedTiles.push(new UnlockedTile(tileId, date));
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;

        this.progressWriter(new Progress(this.currentTileSet, this.unlockedTiles));

        return this;
    }

    changeTileSet(tileSet) {
        this.currentTileSet = tileSet;
        this.cachedUnlockedTiles = undefined
        this.cachedTileBeingUnlockedToday = undefined;

        this.progressWriter(new Progress(this.currentTileSet, this.unlockedTiles));

        return this;
    }

    savesProgressUsing(progressWriter) {
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
                .filter(tile => tile.sets.some(set => this.currentTileSet === set))
        };

        return this.cachedUnlockedTiles.value;
    }

    getTileBeingUnlockedToday() {
        if (this.cachedTileBeingUnlockedToday) {
            return this.cachedTileBeingUnlockedToday.value;
        }

        const tilesInSet = this.allTiles
            .filter(tile => tile.sets.some(set => this.currentTileSet === set));

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