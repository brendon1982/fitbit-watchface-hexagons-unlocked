import * as fs from "fs";

export default class RandomTilePresenter {
    constructor() {
        this.tiles = [];

        const listDir = fs.listDirSync("/mnt/assets/resources/Tiles/Terrain/Grass");
        let dirIter = listDir.next();
        while (!dirIter.done) {
            this.tiles.push(`Tiles/Terrain/Grass/${dirIter.value}`);
            dirIter = listDir.next();
        }
    }
    
    present(hex) {
        hex.render(this.tiles[Math.floor(Math.random() * (this.tiles.length))]);
    }
}