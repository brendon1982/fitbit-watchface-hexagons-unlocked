import { settingsStorage } from "settings";
import { inbox } from "file-transfer";

async function processFiles() {
    console.log("processing file");
    let file;
    while (file = await inbox.pop()) {
        const progress = await file.json();

        addUnlockedTilesToSettings(progress);
        addTileSetToSetting(progress);
    }
};

function addUnlockedTilesToSettings(progress) {
    if (progress && progress.unlockedTiles) {
        progress.unlockedTiles.forEach(unlockedTile => {
            settingsStorage.setItem(`unlockedTile-${unlockedTile.id}`, unlockedTile.date);
        });
    }
}

function addTileSetToSetting(progress) {
    if (progress && progress.tileSet) {
        settingsStorage.setItem("tileSet", progress.tileSet)
    }
}

function processSetting(evt) {
    console.log(evt);
}

inbox.onnewfile = processFiles;
settingsStorage.onchange = processSetting

processFiles();

// TODO add more tile sets.
// TODO add option to choose which tile set is currently being displayed/progressed through on the watch.
// TODO decide if it is worth adding the ability for users to sync their progress somewhere.