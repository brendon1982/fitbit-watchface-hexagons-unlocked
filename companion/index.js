import { settingsStorage } from "settings";
import { inbox, outbox } from "file-transfer";
import * as messaging from "messaging";
import * as commands from "../common/commands";
import * as settingsKeys from "../common/settingsKeys";
import * as backup from "./backup";

async function processFiles() {
    let file;
    while (file = await inbox.pop()) {
        const progress = await file.json();

        updateBackupDataInSettings(progress);
        updateUnlockedTilesInSettings(progress);
        updateTileSetInSettings(progress);
    }
};

function onSettingChanged(evt) {
    if (evt.key === settingsKeys.tileSet()) {
        sendChangeTileSetToDevice(evt.newValue);
    }

    if (evt.key === settingsKeys.backupDate()) {
        backupProgress();
    }

    if (evt.key === settingsKeys.backupRestoreDate()) {
        restoreProgress();
    }
}

function updateUnlockedTilesInSettings(progress) {
    if (progress && progress.unlockedTiles) {
        progress.unlockedTiles.forEach(unlockedTile => {
            settingsStorage.setItem(settingsKeys.unlockedTile(unlockedTile), unlockedTile.date);
        });
    }
}

function updateTileSetInSettings(progress) {
    if (progress && progress.tileSet) {
        settingsStorage.setItem(settingsKeys.tileSet(), progress.tileSet);
    }
}

function updateBackupDataInSettings(progress) {
    if (progress) {
        settingsStorage.setItem(settingsKeys.backupData(), JSON.stringify(progress));
    }
}

function sendChangeTileSetToDevice(tileSet) {
    sendMessage(commands.createChangeTileSetMessage(tileSet));
}

function backupProgress() {
    const rawBackupData = settingsStorage.getItem(settingsKeys.backupData());

    if (!rawBackupData) {
        setBackupMessage("Until some tiles have been unlocked there is nothing to backup");
        return;
    }

    setBackupMessage("In progress");

    backup.upload(JSON.parse(rawBackupData))
        .then(() => {
            setBackupMessage("Backup successful");
        }).catch(() => {
            logout();
            setBackupMessage("Error, please login and try again");
        });
}

function restoreProgress() {
    setBackupMessage("In progress");

    backup.download()
        .then((progress) => {
            // TODO deal with no scenario where progress doesn't exist
            updateBackupDataInSettings(progress);
            updateUnlockedTilesInSettings(progress);
            updateTileSetInSettings(progress);

            sendToWatch(progress);
        })
        .then(() => {
            setBackupMessage("Restore successfully downloaded and queued to watch");
        })
        .catch(() => {
            logout();
            setBackupMessage("Error, please login and try again");
        });
}

function sendToWatch(progress){
    const textEncoder = new TextEncoder();
    return outbox.enqueue(`${Date.now()}.json`, textEncoder.encode(JSON.stringify(progress)));            
}

function logout() {
    settingsStorage.removeItem(settingsKeys.backupAccessToken());
}

function setBackupMessage(message) {
    settingsStorage.setItem(settingsKeys.backupMessage(), message);
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

setBackupMessage("");
processFiles();

// TODO add more tile sets.
// TODO add restore functionality
// TODO think about how to prevent overriding greater with lesser progress (both ways).
// TODO consolidate progress file name.
// TODO consider splitting this file up, it has gotten big and has multiple concerns.