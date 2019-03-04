import { settingsStorage } from "settings";
settingsStorage.setItem("1", new Date().toISOString());
settingsStorage.removeItem("2");

setTimeout(() => {
    settingsStorage.setItem("2", new Date().toISOString());
}, 3000);

// TODO reduce image sizes, also update the generateTileForSettings to make images square
//      so that they render in the settings correctly.
// TODO store file on device containing unlocked tiles, this can just be an array of objects
//      with each object containing the tile id and the date it was unlocked.
// TODO push file with unlocked tiles to companion app, set unlocked tiles into settings.
// TODO update settings to render the tile sets changing the image to a hex with a question mark in it for
//      tiles that are not unlocked in those sets.
// TODO add more tile sets.
// TODO add option to choose which tile set is currently being displayed/progressed through on the watch.
// TODO decide if it is worth allowing users to disable a tile.
// TODO decide if it is worth adding the ability for users to sync their progress somewhere.