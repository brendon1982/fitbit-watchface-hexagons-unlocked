require = require("esm")(module)
const datauri = require("datauri").sync;
const availableTiles = require("./domain/availableTiles").availableTiles;
const fs = require("fs");
const jimp = require("jimp");

jimp.read("./settingsTileTemplate.png").then(template => {
    const promises = availableTiles.map(tile => {
        return jimp.read(`.${tile.image}`).then(image => {
            return template.composite(image, 5, 0).getBase64Async(image.getMIME())
                .then(base64 => {
                    tile.image = base64;
                });
        });
    });

    Promise.all(promises)
        .then(() => {
            const data = `const availableTiles = ${JSON.stringify(availableTiles)};

            export {
                availableTiles
            }`;

            fs.writeFileSync("./settings/tilesWithEmbeddedImages.js", data);
        });
});