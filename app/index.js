import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import * as Honeycomb from "../libs/honeycomb/honeycomb";
import document from "document";
import * as fs from "fs";

const tileFileNames = getTilePaths();

const Hex = Honeycomb.extendHex({
    size: 34.5,
    orientation: "pointy"
});
const Grid = Honeycomb.defineGrid(Hex);

const grid = Grid.rectangle({ width: 7, height: 6 });
grid.forEach(render);

function render(hex) {
    const point = hex.toPoint();
    const id = `${hex.x}${hex.y}`;

    const image = document.getElementById(id)
    image.href = tileFileNames[Math.floor(Math.random() * (tileFileNames.length))];
    image.width = 60;
    image.height = 70;
    image.x = point.x - (image.width / 2);
    image.y = point.y + (Math.sqrt(34.5) - (image.width / 2));
}

function getTilePaths() {
    const listDir = fs.listDirSync("/mnt/assets/resources/Tiles/Terrain/Grass");
    const tiles = [];
    let dirIter = listDir.next();
    while (!dirIter.done) {
        tiles.push(`Tiles/Terrain/Grass/${dirIter.value}`);
        dirIter = listDir.next();
    }
    return tiles;
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
}