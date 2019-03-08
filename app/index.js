import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import Tiles from "../domain/tiles";
import { hexOptions, gridOptions } from "./mapOptions"

const tiles = new Tiles()
    .changeTileSet("Nature")
    .unlockTile(1, new Date(2019, 2, 5))
    .unlockTile(2, new Date(2019, 2, 6));

const map = new Map(gridOptions, hexOptions);
const progressCoordinates = map.spiral();

const tileSetPresenter = new RandomTileSetPresenter(tiles, []);
const unlockProgressPresenter = new TileSetUnlockProgressPresenter(tiles, progressCoordinates, getStepsProgress);

map.render(tileSetPresenter);
map.render(unlockProgressPresenter);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    map.render(unlockProgressPresenter);
};

// TODO real implementation that gets steps
function getStepsProgress() {
    return 100;
}

// TODO hook into on goal reached event to update unlocked tiles & ship them off to companion.