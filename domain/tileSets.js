const natureTileSet = "Nature";
const terainGrass = "/resources/Tiles/Terrain/Grass";
const terainDirt = "/resources/Tiles/Terrain/Dirt";

const tileSets = [{
    id: 1,
    name: "Plain grass",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_05.png`,
}, {
    id: 2,
    name: "Grass with few angled trees",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_10.png`
}, {
    id: 3,
    name: "Grass with few rounded trees",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_11.png`
}, {
    id: 4,
    name: "Grass with many angled trees",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_12.png`
}, {
    id: 5,
    name: "Grass with many rounded trees",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_13.png`
}, {
    id: 6,
    name: "Grass with big stone",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_14.png`
}, {
    id: 7,
    name: "Grass with small stones",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_15.png`
}, {
    id: 8,
    name: "Grass with rocks",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_16.png`
}, {
    id: 9,
    name: "Raised grass",
    sets: [natureTileSet],
    image: `${terainGrass}/grass_17.png`
},{
    id: 10,
    name: "Plain dirt",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_06.png`,
}, {
    id: 11,
    name: "Dirt with few angled trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_11.png`
}, {
    id: 12,
    name: "Dirt with few rounded trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_12.png`
}, {
    id: 13,
    name: "Dirt with many angled trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_13.png`
}, {
    id: 14,
    name: "Dirt with many rounded trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_14.png`
}, {
    id: 15,
    name: "Dirt with few small stones",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_15.png`
}, {
    id: 16,
    name: "Dirt with many small stones",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_16.png`
}, {
    id: 17,
    name: "Dirt with small rocks and trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_17.png`
}, {
    id: 18,
    name: "Dirt with big stone and trees",
    sets: [natureTileSet],
    image: `${terainDirt}/dirt_18.png`
}];

export {
    tileSets
}