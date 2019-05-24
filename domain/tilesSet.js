import { find } from "../common/utils";
import { tiles } from "./tiles";

//TODO put persistance back in as the tileset needs to be stored
export default class TileSet {
    constructor(overrideTiles) {
        this.currentTileSet = "Grass Land";
        this.allTiles = overrideTiles || tiles;
    }

    changeTileSet(tileSet) {
        if (!find(this.allTiles, withSet(tileSet))) {
            return this;
        }

        if (this.currentTileSet === tileSet) {
            return this;
        }

        this.currentTileSet = tileSet;

        return this;
    }

    getUnlockedTiles() {
        return this.allTiles
            .filter(withSet(this.currentTileSet));
    }
}

function withSet(inputSet) {
    return tile => tile.sets.some(set => inputSet === set);
}