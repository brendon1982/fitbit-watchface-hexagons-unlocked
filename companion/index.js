import { settingsStorage } from "settings";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import * as commands from "../common/commands";
import * as settingsKeys from "../common/settingsKeys";

async function processFiles() {
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
            settingsStorage.setItem(settingsKeys.unlockedTile(unlockedTile), unlockedTile.date);
        });
    }
}

function addTileSetToSetting(progress) {
    if (progress && progress.tileSet) {
        settingsStorage.setItem(settingsKeys.tileSet(), progress.tileSet)
    }
}

function onSettingChanged(evt) {
    if (evt.key === settingsKeys.tileSet()) {
        sendTileSet(evt.newValue);
    }
}

function sendTileSet(tileSet) {
    sendMessage(commands.createChangeTileSetMessage(tileSet));
}

function sendMessage(message) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(message);
    } else {
        console.log("No peerSocket connection");
    }
}

inbox.onnewfile = processFiles;
settingsStorage.onchange = onSettingChanged

processFiles();

// TODO should the change tile set command be sent on start up ???
// TODO add more tile sets.
// TODO decide if it is worth adding the ability for users to sync their progress somewhere.