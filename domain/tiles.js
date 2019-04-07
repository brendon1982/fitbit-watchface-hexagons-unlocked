const grassLandSet = "Grass Land";
const dirtSet = "Dirt";
const desertSet = "Desert";
const stoneSet = "Stone";
const marsSet = "Mars";
const medievalSet = "Medieval";
const militarySet = "Military";
const millSet = "Mill";
const modernSet = "Modern";
const scifiSet = "Sci-fi";
const westernSet = "Western";

const terainGrassPath = "/resources/Tiles/Terrain/Grass";
const terainDirtPath = "/resources/Tiles/Terrain/Dirt";
const terainDesertPath = "/resources/Tiles/Terrain/Sand";
const terainStonePath = "/resources/Tiles/Terrain/Stone";
const terainMarsPath = "/resources/Tiles/Terrain/Mars";
const themeMedievalPath = "/resources/Tiles/Medieval";
const themeMilitaryPath = "/resources/Tiles/Military";
const themeMillPath = "/resources/Tiles/Mill";
const themeModernPath = "/resources/Tiles/Modern";
const themeScifiPath = "/resources/Tiles/Sci-fi";
const themeWesternPath = "/resources/Tiles/Western";

const terrainGrassSets = [grassLandSet, medievalSet];
const terrainGrassTiles = [
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

const terrainDirtSets = [dirtSet, militarySet, millSet];
const terrainDirtTiles = [
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

const terrainDesertSets = [desertSet, westernSet];
const terrainDesertTiles = [
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

const terrainStoneSets = [stoneSet, modernSet];
const terrainStoneTiles = [
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

const terrainMarsSets = [marsSet, scifiSet];
const terrainMarsTiles = [
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

const themeMedievalSets = [medievalSet];
const themeMedievalTiles = [
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

const themeMilitarySets = [militarySet];
const themeMilitaryTiles = [
    { id: 61, name: "Entrance", sets: themeMilitarySets, image: `${themeMilitaryPath}/1.png`}, 
    { id: 62, name: "Hangar", sets: themeMilitarySets, image: `${themeMilitaryPath}/2.png`}, 
    { id: 63, name: "Rockets", sets: themeMilitarySets, image: `${themeMilitaryPath}/3.png`}, 
    { id: 64, name: "Tanks", sets: themeMilitarySets, image: `${themeMilitaryPath}/4.png`}, 
    { id: 65, name: "Large turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/5.png`}, 
    { id: 66, name: "Medium turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/6.png`}, 
    { id: 67, name: "Small turret", sets: themeMilitarySets, image: `${themeMilitaryPath}/7.png`}, 
];

const themeMillSets = [millSet];
const themeMillTiles = [
    { id: 68, name: "Crane", sets: themeMillSets, image: `${themeMillPath}/1.png`}, 
    { id: 69, name: "Cutter", sets: themeMillSets, image: `${themeMillPath}/2.png`}, 
    { id: 70, name: "Factory", sets: themeMillSets, image: `${themeMillPath}/3.png`}, 
    { id: 71, name: "Stone warehouse", sets: themeMillSets, image: `${themeMillPath}/4.png`}, 
    { id: 72, name: "Storage", sets: themeMillSets, image: `${themeMillPath}/5.png`}, 
    { id: 73, name: "Warehouse", sets: themeMillSets, image: `${themeMillPath}/6.png`}, 
];

const themeModernSets = [modernSet];
const themeModernTiles = [
    { id: 74, name: "Campsite", sets: themeModernSets, image: `${themeModernPath}/1.png`}, 
    { id: 75, name: "Corner shop", sets: themeModernSets, image: `${themeModernPath}/2.png`}, 
    { id: 76, name: "House", sets: themeModernSets, image: `${themeModernPath}/3.png`}, 
    { id: 77, name: "House small", sets: themeModernSets, image: `${themeModernPath}/4.png`}, 
    { id: 78, name: "Large building", sets: themeModernSets, image: `${themeModernPath}/5.png`}, 
    { id: 79, name: "Old building", sets: themeModernSets, image: `${themeModernPath}/6.png`}, 
    { id: 80, name: "Petrol station", sets: themeModernSets, image: `${themeModernPath}/7.png`}, 
    { id: 81, name: "Shop", sets: themeModernSets, image: `${themeModernPath}/8.png`}, 
    { id: 82, name: "Skyscraper", sets: themeModernSets, image: `${themeModernPath}/9.png`}, 
    { id: 83, name: "Skyscraper glass", sets: themeModernSets, image: `${themeModernPath}/10.png`}, 
    { id: 84, name: "Trailer park", sets: themeModernSets, image: `${themeModernPath}/11.png`}, 
    { id: 85, name: "Villa", sets: themeModernSets, image: `${themeModernPath}/12.png`}, 
    { id: 86, name: "Villa large", sets: themeModernSets, image: `${themeModernPath}/13.png`}, 
];

const themeScifiSets = [scifiSet];
const themeScifiTiles = [
    { id: 87, name: "Base", sets: themeScifiSets, image: `${themeScifiPath}/1.png`},
    { id: 88, name: "Building", sets: themeScifiSets, image: `${themeScifiPath}/2.png`},
    { id: 89, name: "Cargo", sets: themeScifiSets, image: `${themeScifiPath}/3.png`},
    { id: 90, name: "Corner", sets: themeScifiSets, image: `${themeScifiPath}/4.png`},
    { id: 91, name: "Domes", sets: themeScifiSets, image: `${themeScifiPath}/5.png`},
    { id: 92, name: "Energy", sets: themeScifiSets, image: `${themeScifiPath}/6.png`},
    { id: 93, name: "Factory", sets: themeScifiSets, image: `${themeScifiPath}/7.png`},
    { id: 94, name: "Factory hanger", sets: themeScifiSets, image: `${themeScifiPath}/8.png`},
    { id: 95, name: "Factory high", sets: themeScifiSets, image: `${themeScifiPath}/9.png`},
    { id: 96, name: "Foliage", sets: themeScifiSets, image: `${themeScifiPath}/10.png`},
    { id: 97, name: "Hangar", sets: themeScifiSets, image: `${themeScifiPath}/11.png`},
    { id: 98, name: "Headquaters", sets: themeScifiSets, image: `${themeScifiPath}/12.png`},
    { id: 99, name: "Living", sets: themeScifiSets, image: `${themeScifiPath}/13.png`},
    { id: 100, name: "Port", sets: themeScifiSets, image: `${themeScifiPath}/14.png`},
    { id: 101, name: "Silo", sets: themeScifiSets, image: `${themeScifiPath}/15.png`},
    { id: 102, name: "Skyscraper", sets: themeScifiSets, image: `${themeScifiPath}/16.png`},
    { id: 103, name: "Tower", sets: themeScifiSets, image: `${themeScifiPath}/17.png`},
];

const themeWesternSets = [westernSet];
const themeWesternTiles = [
    { id: 104, name: "Bank", sets: themeWesternSets, image: `${themeWesternPath}/1.png`},
    { id: 105, name: "General store", sets: themeWesternSets, image: `${themeWesternPath}/2.png`},
    { id: 106, name: "Native American camp", sets: themeWesternSets, image: `${themeWesternPath}/3.png`},
    { id: 107, name: "Saloon", sets: themeWesternSets, image: `${themeWesternPath}/4.png`},
    { id: 108, name: "Sheriff", sets: themeWesternSets, image: `${themeWesternPath}/5.png`},
    { id: 109, name: "Station", sets: themeWesternSets, image: `${themeWesternPath}/6.png`},
    { id: 110, name: "Water tower", sets: themeWesternSets, image: `${themeWesternPath}/7.png`},
];

export const tiles = terrainGrassTiles
    .concat(
        terrainDirtTiles,
        terrainDesertTiles,
        terrainStoneTiles,
        terrainMarsTiles,
        themeMedievalTiles,
        themeMilitaryTiles,
        themeMillTiles,
        themeModernTiles,
        themeScifiTiles,
        themeWesternTiles
    );