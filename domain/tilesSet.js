import { find } from "../common/utils";
import { tiles } from "./tiles";
import SavedData from "./savedData";

export default class TileSet {
    constructor(overrideTiles) {
        this.currentTileSet = "";
        this.allTiles = overrideTiles || tiles;
        this.dataWriter = () => { };
        this.dataReader = () => new SavedData();
    }

    changeTileSet(tileSet) {
        if (!find(this.allTiles, withSet(tileSet))) {
            return this;
        }

        if (this.currentTileSet === tileSet) {
            return this;
        }

        this.currentTileSet = tileSet;

        const savedData = this.dataReader();
        savedData.tileSet = tileSet;

        this.dataWriter(savedData);

        return this;
    }

    savesProgressUsing(dataWriter) {
        this.dataWriter = dataWriter;
        return this;
    }

    loadProgressUsing(dataReader) {
        const savedData = dataReader();
        this.currentTileSet = savedData.tileSet;
        return this;
    }

    getUnlockedTiles() {
        return this.allTiles
        .filter(withSet(this.currentTileSet))
    }
}

function withSet(inputSet) {
    return tile => tile.sets.some(set => inputSet === set);
}