import { settingsStorage } from "settings";
import { inbox } from "file-transfer";

async function processFiles() {
    let file;
    while (file = await inbox.pop()) {
        const content = await file.json();
        // TODO handle missing properties gracefully
        // TODO add current tile set to settings
        content.unlockedTiles.forEach(unlockedTile => {
            settingsStorage.setItem(`unlockedTile-${unlockedTile.id}`, unlockedTile.date);
        });
    }
};

inbox.onnewfile = processFiles;

processFiles();

// TODO update settings to render the tile sets changing the image to a hex with a question mark in it for
//      tiles that are not unlocked in those sets.
// TODO add more tile sets.
// TODO add option to choose which tile set is currently being displayed/progressed through on the watch.
// TODO decide if it is worth allowing users to disable a tile.
// TODO decide if it is worth adding the ability for users to sync their progress somewhere.