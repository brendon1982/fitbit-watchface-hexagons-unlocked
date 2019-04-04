const grassLand = "Grass Land";
const dirt = "Dirt";
const desert = "Desert";
const stone = "Stone";
const mars = "Mars";
const medieval = "Medieval";
const military = "Military";
const terainGrassPath = "/resources/Tiles/Terrain/Grass";
const terainDirtPath = "/resources/Tiles/Terrain/Dirt";
const terainDesertPath = "/resources/Tiles/Terrain/Sand";
const terainStonePath = "/resources/Tiles/Terrain/Stone";
const terainMarsPath = "/resources/Tiles/Terrain/Mars";
const themeMedievalPath = "/resources/Tiles/Medieval";
const themeMilitaryPath = "/resources/Tiles/Military";


const terrainGrassSets = [grassLand, medieval];
const terrainGrass = [
    { id: 1, name: "Plain grass", sets: terrainGrassSets, image: `${terainGrassPath}/1.png`}, 
    { id: 2, name: "Some angled trees", sets: terrainGrassSets, image: `${terainGrassPath}/2.png`}, 
    { id: 3, name: "Some rounded trees", sets: terrainGrassSets, image: `${terainGrassPath}/3.png`}, 
    { id: 4, name: "Many angled trees", sets: terrainGrassSets, image: `${terainGrassPath}/4.png`}, 
    { id: 5, name: "Many rounded trees", sets: terrainGrassSets, image: `${terainGrassPath}/5.png`}, 
    { id: 6, name: "Big stone", sets: terrainGrassSets, image: `${terainGrassPath}/6.png`}, 
    { id: 7, name: "Small stones", sets: terrainGrassSets, image: `${terainGrassPath}/7.png`}, 
    { id: 8, name: "Rocks", sets: terrainGrassSets, image: `${terainGrassPath}/8.png`}, 
    { id: 9, name: "Raised grass", sets: terrainGrassSets, image: `${terainGrassPath}/9.png`}
];

const terrainDirtSets = [dirt, military];
const terrainDirt = [
    { id: 10, name: "Plain dirt", sets: terrainDirtSets, image: `${terainDirtPath}/1.png`}, 
    { id: 11, name: "Some angled trees", sets: terrainDirtSets, image: `${terainDirtPath}/2.png`}, 
    { id: 12, name: "Some rounded trees", sets: terrainDirtSets, image: `${terainDirtPath}/3.png`}, 
    { id: 13, name: "Many angled trees", sets: terrainDirtSets, image: `${terainDirtPath}/4.png` }, 
    { id: 14, name: "Many rounded trees", sets: terrainDirtSets, image: `${terainDirtPath}/5.png`}, 
    { id: 15, name: "Some small stones", sets: terrainDirtSets, image: `${terainDirtPath}/6.png`}, 
    { id: 16, name: "Many small stones", sets: terrainDirtSets, image: `${terainDirtPath}/7.png`}, 
    { id: 17, name: "Small rocks and trees", sets: terrainDirtSets, image: `${terainDirtPath}/8.png`}, 
    { id: 18, name: "Big stone and trees", sets: terrainDirtSets, image: `${terainDirtPath}/9.png`}
];

const terrainDesertSets = [desert];
const terrainDesert = [
    { id: 19, name: "Plain sand", sets: terrainDesertSets, image: `${terainDesertPath}/1.png`}, 
    { id: 20, name: "Some cacti #1", sets: terrainDesertSets, image: `${terainDesertPath}/2.png`}, 
    { id: 21, name: "Some cacti #2", sets: terrainDesertSets, image: `${terainDesertPath}/3.png`}, 
    { id: 22, name: "Many cacti", sets: terrainDesertSets, image: `${terainDesertPath}/4.png`}, 
    { id: 23, name: "Some cacti and a skull", sets: terrainDesertSets, image: `${terainDesertPath}/5.png`}, 
    { id: 24, name: "Some small rocks", sets: terrainDesertSets, image: `${terainDesertPath}/6.png`}, 
    { id: 25, name: "Many small rocks", sets: terrainDesertSets, image: `${terainDesertPath}/7.png`}, 
    { id: 26, name: "Many small rocks and a cactus", sets: terrainDesertSets,image: `${terainDesertPath}/8.png`}, 
    { id: 27, name: "Raised sand", sets: terrainDesertSets, image: `${terainDesertPath}/9.png`}
];

const terrainStoneSets = [stone];
const terrainStone = [
    { id: 28, name: "Plain stone", sets: terrainStoneSets, image: `${terainStonePath}/1.png`}, 
    { id: 29, name: "Trees #1", sets: terrainStoneSets, image: `${terainStonePath}/2.png`}, 
    { id: 30, name: "Trees #2", sets: terrainStoneSets, image: `${terainStonePath}/3.png`}, 
    { id: 31, name: "Lamp posts", sets: terrainStoneSets, image: `${terainStonePath}/4.png`}, 
    { id: 32, name: "Dumpsters next to wall", sets: terrainStoneSets, image: `${terainStonePath}/5.png`}, 
    { id: 33, name: "Fountain", sets: terrainStoneSets, image: `${terainStonePath}/6.png`}, 
    { id: 34, name: "Fountain and trees", sets: terrainStoneSets, image: `${terainStonePath}/7.png`}, 
    { id: 35, name: "Car, fire and boxes in some trees", sets: terrainStoneSets, image: `${terainStonePath}/8.png`}, 
    { id: 36, name: "Parking lot", sets: terrainStoneSets, image: `${terainStonePath}/9.png`}
];

const terrainMarsSets = [mars];
const terrainMars = [
    { id: 37, name: "Plain Mars", sets: terrainMarsSets, image: `${terainMarsPath}/1.png`}, 
    { id: 38, name: "Some trees", sets: terrainMarsSets, image: `${terainMarsPath}/2.png`}, 
    { id: 39, name: "Many trees", sets: terrainMarsSets, image: `${terainMarsPath}/3.png`}, 
    { id: 40, name: "Crystals", sets: terrainMarsSets, image: `${terainMarsPath}/4.png`}, 
    { id: 41, name: "Crystals in rock", sets: terrainMarsSets, image: `${terainMarsPath}/5.png`}, 
    { id: 42, name: "Lamp posts", sets: terrainMarsSets, image: `${terainMarsPath}/6.png`}, 
    { id: 43, name: "Rocks #1", sets: terrainMarsSets, image: `${terainMarsPath}/7.png`}, 
    { id: 44, name: "Rocks #2", sets: terrainMarsSets, image: `${terainMarsPath}/8.png`}, 
    { id: 45, name: "Rocks #3", sets: terrainMarsSets, image: `${terainMarsPath}/9.png`}
];

const themeMedievalSets = [medieval];
const themeMedieval = [
    { id: 46, name: "Archery", sets: themeMedievalSets, image: `${themeMedievalPath}/1.png`}, 
    { id: 47, name: "Archway", sets: themeMedievalSets, image: `${themeMedievalPath}/2.png`},
    { id: 48, name: "Blacksmith", sets: themeMedievalSets, image: `${themeMedievalPath}/3.png`},
    { id: 49, name: "Cabin", sets: themeMedievalSets, image: `${themeMedievalPath}/4.png`},
    { id: 50, name: "Church", sets: themeMedievalSets, image: `${themeMedievalPath}/5.png`},
    { id: 51, name: "Farm", sets: themeMedievalSets, image: `${themeMedievalPath}/6.png`},
    { id: 52, name: "House", sets: themeMedievalSets, image: `${themeMedievalPath}/7.png`},
    { id: 53, name: "Large castle", sets: themeMedievalSets, image: `${themeMedievalPath}/8.png`},
    { id: 54, name: "Lumber", sets: themeMedievalSets, image: `${themeMedievalPath}/9.png`},
    { id: 55, name: "Mine", sets: themeMedievalSets, image: `${themeMedievalPath}/10.png`},
    { id: 56, name: "Open castle", sets: themeMedievalSets, image: `${themeMedievalPath}/11.png`},
    { id: 57, name: "Ruins", sets: themeMedievalSets, image: `${themeMedievalPath}/12.png`},
    { id: 58, name: "Small castle", sets: themeMedievalSets, image: `${themeMedievalPath}/13.png`},
    { id: 59, name: "Tower", sets: themeMedievalSets, image: `${themeMedievalPath}/14.png`},
    { id: 60, name: "Windmill", sets: themeMedievalSets, image: `${themeMedievalPath}/15.png`},
];

const themeMilitarySets = [military];
const themeMilitary = [
    { id: 61, name: "Entrance", sets: themeMilitarySets, image: `${themeMilitaryPath}/1.png`}, 
    { id: 62, name: "Hangar", sets: themeMilitarySets, image: `${themeMilitaryPath}/2.png`}, 
    { id: 63, name: "Rockets", sets: themeMilitarySets, image: `${themeMilitaryPath}/3.png`}, 
    { id: 64, name: "Tanks", sets: themeMilitarySets, image: `${themeMilitaryPath}/4.png`}, 
    { id: 65, name: "Large turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/5.png`}, 
    { id: 66, name: "Medium turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/6.png`}, 
    { id: 67, name: "Small turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/7.png`}, 
];

// TODO try save more memory by creating constants for file name prefixes

export const tiles = terrainGrass
    .concat(
        terrainDirt,
        terrainDesert,
        terrainStone,
        terrainMars,
        themeMedieval,
        themeMilitary
    );