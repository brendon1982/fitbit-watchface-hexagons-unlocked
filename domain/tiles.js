const grassLand = "Grass Land";
const dirt = "Dirt";
const desert = "Desert";
const terainGrassPath = "/resources/Tiles/Terrain/Grass";
const terainDirtPath = "/resources/Tiles/Terrain/Dirt";
const terainDesertPath = "/resources/Tiles/Terrain/Sand";

const tiles = [{
    id: 1,
    name: "Plain grass",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_05.png`,
}, {
    id: 2,
    name: "Grass with some angled trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_10.png`
}, {
    id: 3,
    name: "Grass with some rounded trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_11.png`
}, {
    id: 4,
    name: "Grass with many angled trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_12.png`
}, {
    id: 5,
    name: "Grass with many rounded trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_13.png`
}, {
    id: 6,
    name: "Grass with big stone",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_14.png`
}, {
    id: 7,
    name: "Grass with small stones",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_15.png`
}, {
    id: 8,
    name: "Grass with rocks",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_16.png`
}, {
    id: 9,
    name: "Raised grass",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_17.png`
},{
    id: 10,
    name: "Plain dirt",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_06.png`,
}, {
    id: 11,
    name: "Dirt with some angled trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_11.png`
}, {
    id: 12,
    name: "Dirt with some rounded trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_12.png`
}, {
    id: 13,
    name: "Dirt with many angled trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_13.png`
}, {
    id: 14,
    name: "Dirt with many rounded trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_14.png`
}, {
    id: 15,
    name: "Dirt with some small stones",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_15.png`
}, {
    id: 16,
    name: "Dirt with many small stones",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_16.png`
}, {
    id: 17,
    name: "Dirt with small rocks and trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_17.png`
}, {
    id: 18,
    name: "Dirt with big stone and trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_18.png`
}, {
    id: 19,
    name: "Plain sand",
    sets: [desert],
    image: `${terainDesertPath}/sand_07.png`
}, {
    id: 20,
    name: "Sand with some cacti #1",
    sets: [desert],
    image: `${terainDesertPath}/sand_12.png`
}, {
    id: 21,
    name: "Sand with some cacti #2",
    sets: [desert],
    image: `${terainDesertPath}/sand_13.png`
}, {
    id: 21,
    name: "Sand with many cacti",
    sets: [desert],
    image: `${terainDesertPath}/sand_14.png`
}, {
    id: 22,
    name: "Sand with some cacti and a skull",
    sets: [desert],
    image: `${terainDesertPath}/sand_15.png`
}, {
    id: 23,
    name: "Sand with some small rocks",
    sets: [desert],
    image: `${terainDesertPath}/sand_16.png`
}, {
    id: 24,
    name: "Sand with many small rocks",
    sets: [desert],
    image: `${terainDesertPath}/sand_17.png`
}, {
    id: 25,
    name: "Sand with many small rocks and a cactus",
    sets: [desert],
    image: `${terainDesertPath}/sand_18.png`
}, {
    id: 26,
    name: "Raised sand",
    sets: [desert],
    image: `${terainDesertPath}/sand_19.png`
}];

export {
    tiles as tiles
}