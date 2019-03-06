import { settingsStorage } from "settings";
settingsStorage.setItem("1", new Date().toISOString());
settingsStorage.removeItem("2");

setTimeout(() => {
    settingsStorage.setItem("2", new Date().toISOString());
}, 3000);

// TODO store file on device containing unlocked tiles & current tileSet.
//      Domain/tiles.js has been refactored out to handle this stuff, add a load/save method on it.
// TODO push file with unlocked tiles to companion app, set unlocked tiles into settings.
// TODO update settings to render the tile sets changing the image to a hex with a question mark in it for
//      tiles that are not unlocked in those sets.
// TODO add more tile sets.
// TODO add option to choose which tile set is currently being displayed/progressed through on the watch.
// TODO decide if it is worth allowing users to disable a tile.
// TODO decide if it is worth adding the ability for users to sync their progress somewhere.