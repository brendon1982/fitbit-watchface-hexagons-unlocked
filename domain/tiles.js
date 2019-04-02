const grassLand = "Grass Land";
const dirt = "Dirt";
const desert = "Desert";
const stone = "Stone";
const terainGrassPath = "/resources/Tiles/Terrain/Grass";
const terainDirtPath = "/resources/Tiles/Terrain/Dirt";
const terainDesertPath = "/resources/Tiles/Terrain/Sand";
const terainStonePath = "/resources/Tiles/Terrain/Stone";

const terrainGrass = [{
    id: 1,
    name: "Plain grass",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_05.png`,
}, {
    id: 2,
    name: "Some angled trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_10.png`
}, {
    id: 3,
    name: "Some rounded trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_11.png`
}, {
    id: 4,
    name: "Many angled trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_12.png`
}, {
    id: 5,
    name: "Many rounded trees",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_13.png`
}, {
    id: 6,
    name: "Big stone",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_14.png`
}, {
    id: 7,
    name: "Small stones",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_15.png`
}, {
    id: 8,
    name: "Rocks",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_16.png`
}, {
    id: 9,
    name: "Raised grass",
    sets: [grassLand],
    image: `${terainGrassPath}/grass_17.png`
}];

const terrainDirt = [{
    id: 10,
    name: "Plain dirt",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_06.png`,
}, {
    id: 11,
    name: "Some angled trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_11.png`
}, {
    id: 12,
    name: "Some rounded trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_12.png`
}, {
    id: 13,
    name: "Many angled trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_13.png`
}, {
    id: 14,
    name: "Many rounded trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_14.png`
}, {
    id: 15,
    name: "Some small stones",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_15.png`
}, {
    id: 16,
    name: "Many small stones",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_16.png`
}, {
    id: 17,
    name: "Small rocks and trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_17.png`
}, {
    id: 18,
    name: "Big stone and trees",
    sets: [dirt],
    image: `${terainDirtPath}/dirt_18.png`
}];

const terrainDesert = [{
    id: 19,
    name: "Plain sand",
    sets: [desert],
    image: `${terainDesertPath}/sand_07.png`
}, {
    id: 20,
    name: "Some cacti #1",
    sets: [desert],
    image: `${terainDesertPath}/sand_12.png`
}, {
    id: 21,
    name: "Some cacti #2",
    sets: [desert],
    image: `${terainDesertPath}/sand_13.png`
}, {
    id: 21,
    name: "Many cacti",
    sets: [desert],
    image: `${terainDesertPath}/sand_14.png`
}, {
    id: 22,
    name: "Some cacti and a skull",
    sets: [desert],
    image: `${terainDesertPath}/sand_15.png`
}, {
    id: 23,
    name: "Some small rocks",
    sets: [desert],
    image: `${terainDesertPath}/sand_16.png`
}, {
    id: 24,
    name: "Many small rocks",
    sets: [desert],
    image: `${terainDesertPath}/sand_17.png`
}, {
    id: 25,
    name: "Many small rocks and a cactus",
    sets: [desert],
    image: `${terainDesertPath}/sand_18.png`
}, {
    id: 26,
    name: "Raised sand",
    sets: [desert],
    image: `${terainDesertPath}/sand_19.png`
}];

const terrainStone = [{
    id: 27,
    name: "Plain stone",
    sets: [stone],
    image: `${terainStonePath}/stone_07.png`
}, {
    id: 28,
    name: "Trees #1",
    sets: [stone],
    image: `${terainStonePath}/stone_12.png`
}, {
    id: 29,
    name: "Trees #2",
    sets: [stone],
    image: `${terainStonePath}/stone_13.png`
}, {
    id: 30,
    name: "Lamp posts",
    sets: [stone],
    image: `${terainStonePath}/stone_14.png`
}, {
    id: 31,
    name: "Dumpsters next to wall",
    sets: [stone],
    image: `${terainStonePath}/stone_15.png`
}, {
    id: 32,
    name: "Fountain",
    sets: [stone],
    image: `${terainStonePath}/stone_16.png`
}, {
    id: 33,
    name: "Fountain and trees",
    sets: [stone],
    image: `${terainStonePath}/stone_17.png`
}, {
    id: 34,
    name: "Car, fire and boxes in some trees",
    sets: [stone],
    image: `${terainStonePath}/stone_18.png`
}, {
    id: 35,
    name: "Parking lot",
    sets: [stone],
    image: `${terainStonePath}/stone_19.png`
}];

// TODO try save more memory by creating constants for file name prefixes

export const tiles = terrainGrass
    .concat(
        terrainDirt,
        terrainDesert,
        terrainStone
    );