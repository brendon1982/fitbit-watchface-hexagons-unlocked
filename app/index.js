import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import * as Honeycomb from "../libs/honeycomb/honeycomb";
import document from "document";
import * as fs from "fs";

const hexOptions = {
    size: 34.5,
    orientation: "pointy",
    render: function (tile) {
        const hex = this;
        const point = hex.toPoint();
        const id = `${hex.x}${hex.y}`;
    
        const image = document.getElementById(id)
        image.href = tile
        image.width = 60;
        image.height = 70;
        image.x = point.x - (image.width / 2);
        image.y = point.y + (Math.sqrt(34.5) - (image.width / 2));
    }
};

const gridOptions = { 
    width: 7, 
    height: 6 
};

const grid = createGrid(gridOptions, hexOptions);
populateGridWithTiles(grid);
// TODO add populateGridWithUnlockProgress, this might work like something like:
//      const progressHexes = [{x: 4, y: 2}, {x: 5, y: 2}];
//      populateGridWithTiles(grid, progressHexes); // TODO refactor out into 'random tile populator', later we'll make 'unlocked tile populator'
//      populateGridWithProgress(progressHexes); // TODO refactor out into 'random tile progress populator', later we'll make 'locked tile progress populator'
// The populateGridWithProgress will be called everytime progress needs to be updated,
// it seems like we might need one more piece of info in the render function for this method,
// the 'progress' of the tile.

// TODO refactor out into 'rectangle grid factory'
function createGrid(gridOptions, hexOptions){
    const HexFactory = Honeycomb.extendHex(hexOptions);
    const GridFactory = Honeycomb.defineGrid(HexFactory);
    return GridFactory.rectangle(gridOptions);
}

function populateGridWithTiles(grid) {
    const listDir = fs.listDirSync("/mnt/assets/resources/Tiles/Terrain/Grass");
    const tiles = [];
    let dirIter = listDir.next();
    while (!dirIter.done) {
        tiles.push(`Tiles/Terrain/Grass/${dirIter.value}`);
        dirIter = listDir.next();
    }

    grid.forEach(hex => {
        hex.render(tiles[Math.floor(Math.random() * (tiles.length))]);
    });
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
}