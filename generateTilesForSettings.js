require = require("esm")(module)
const tiles = require("./domain/tiles").tiles;
const fs = require("fs");
const jimp = require("jimp");

jimp.read("./settingsTileTemplate.png").then(template => {
    const promises = tiles.map(tile => {
        return jimp.read(`.${tile.image}`).then(image => {
            return template.composite(image, 5, 0).getBase64Async(image.getMIME())
                .then(base64 => {
                    tile.image = base64;
                });
        });
    });

    Promise.all(promises)
        .then(() => {
            const data = `const tiles = ${JSON.stringify(tiles)};

            export {
                tiles
            }`;

            fs.writeFileSync("./settings/tilesWithEmbeddedImages.js", data);
        });
});