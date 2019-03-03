import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import { availableTiles, unlockedTiles } from "../resources/tiles";
import { hexOptions, gridOptions } from "./mapOptions"

const progressCoordinates = [createPoint(0, 2), createPoint(0, 1), createPoint(1, 0), createPoint(0, 0)];
const tileSet = "Nature";

const tileSetPresenter = new RandomTileSetPresenter(availableTiles, unlockedTiles, tileSet, progressCoordinates);
const unlockProgressPresenter = new TileSetUnlockProgressPresenter(availableTiles, unlockedTiles, tileSet, progressCoordinates, getStepsProgress);

const map = new Map(gridOptions, hexOptions);
map.render(tileSetPresenter);
map.render(unlockProgressPresenter);

function getStepsProgress() {
    return 37.5;
}

function createPoint(x, y) {
    return { x, y };
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
};