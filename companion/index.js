import { settingsStorage } from "settings";
import * as messaging from "messaging";
import * as commands from "../common/commands";
import * as settingsKeys from "../common/settingsKeys";

settingsStorage.onchange = onSettingChanged

function onSettingChanged(evt) {
    if (evt.key === settingsKeys.tileSet()) {
        sendChangeTileSetToDevice(evt.newValue);
    }
}

function sendChangeTileSetToDevice(tileSet) {
    sendMessage(commands.createChangeTileSetMessage(tileSet));
}

function sendMessage(message) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(message);
    } else {
        console.log("No peerSocket connection");
    }
}