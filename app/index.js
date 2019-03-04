import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import { availableTiles, unlockedTiles } from "../resources/tiles";
import { hexOptions, gridOptions } from "./mapOptions"

const tileSet = "Nature";
const map = new Map(gridOptions, hexOptions);
const progressCoordinates = map.spiral();

const tileSetPresenter = new RandomTileSetPresenter(availableTiles, unlockedTiles, tileSet, []);
const unlockProgressPresenter = new TileSetUnlockProgressPresenter(availableTiles, unlockedTiles, tileSet, progressCoordinates, getStepsProgress);

map.render(tileSetPresenter);
map.render(unlockProgressPresenter);

let progress = 0;
for (let index = 1; index < 101; index++) {
    setTimeout(() => {
        progress = index;
        map.render(unlockProgressPresenter);
    }, index * 100);
}

// TODO real implementation that gets steps
function getStepsProgress() {
    return progress;
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
};

// TODO hook into on goal reached event to update unlocked tiles & ship them off to companion.