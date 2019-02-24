import * as Honeycomb from "../libs/honeycomb/honeycomb";
import document from "document";

const Hex = Honeycomb.extendHex({
    size: 34.6,
    orientation: "pointy"
});

const Grid = Honeycomb.defineGrid(Hex);
const grid = Grid.rectangle({ width: 7, height: 6 });

grid.forEach(hex => {
    const point = hex.toPoint();
    const id = `${hex.x}${hex.y}`;

    const image = document.getElementById(id)
    image.href = `Tiles/Terrain/Dirt/dirt_0${hex.x + 2}.png`
    image.width = 60;
    image.height = 70;
    image.x = point.x - (image.width / 2);
    image.y = point.y + (Math.sqrt(34.5) - (image.width / 2));
});