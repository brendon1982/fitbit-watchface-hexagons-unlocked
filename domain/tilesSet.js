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

    // TODO should probably check if the tile has already been unlocked ... it seems like making unlockedTiles a dictionary would make this much easier.
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
        if (this.unlockedTiles.some(t => t.id === tileId)) {
            return this;
        }
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
            // TODO write a test showing that this cache is flawed as it doesn't clear on a new day
            return this.cachedUnlockedTiles[today];
        }

        this.cachedUnlockedTiles = {
            [today]: this.allTiles
                .filter(tile => this.unlockedTiles.some(unlockedTile => tile.id === unlockedTile.id && today !== unlockedTile.date))
                .filter(tile => tile.sets.some(set => this.currentTileSet === set))
        };

        return this.cachedUnlockedTiles[today];
    }

    getTileBeingUnlockedToday() {
        const tilesInSet = this.allTiles
            .filter(tile => tile.sets.some(set => this.currentTileSet === set));

        const today = formatDateAsString(new Date());
        const todaysUnlockedTile = find(this.unlockedTiles, unlockedTile => unlockedTile.date === today);

        if (todaysUnlockedTile) {
            return find(tilesInSet, tile => tile.id === todaysUnlockedTile.id);
        }

        const tileBeingUnlockedToday = find(tilesInSet, tile => !this.unlockedTiles.some(unlockedTile => tile.id === unlockedTile.id));

        return tileBeingUnlockedToday;
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