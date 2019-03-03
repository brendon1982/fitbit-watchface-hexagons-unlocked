require = require("esm")(module)
const datauri = require("datauri").sync;
const availableTiles = require("./resources/tiles").availableTiles;
const fs = require("fs");

availableTiles.forEach(tile => {
    tile.image = datauri(`.${tile.image}`)
});

const data = `const availableTiles = ${JSON.stringify(availableTiles)};

export {
    availableTiles
}`;

fs.writeFileSync("./settings/tilesWithEmbeddedImages.js", data);