import * as Honeycomb from "../libs/honeycomb/honeycomb";

const Hex = Honeycomb.extendHex({
    size: 30,           // default: 1
    orientation: 'flat' // default: 'pointy'
});

const Grid = Honeycomb.defineGrid(Hex);
const grid = Grid.rectangle({ width: 4, height: 4 });

grid.forEach(hex => {
    const point = hex.toPoint();
    console.log(`${point.x} ${point.y} ${hex.x} ${hex.y}`);
});