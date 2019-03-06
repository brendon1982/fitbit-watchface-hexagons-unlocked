import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import Tiles from "../domain/tiles";
import { hexOptions, gridOptions } from "./mapOptions"

const tiles = new Tiles();
tiles.changeTileSet("Nature");
tiles.unlockTile(1);
tiles.unlockTile(2);

const map = new Map(gridOptions, hexOptions);
const progressCoordinates = map.spiral();

const tileSetPresenter = new RandomTileSetPresenter(tiles, []);
const unlockProgressPresenter = new TileSetUnlockProgressPresenter(tiles, progressCoordinates, getStepsProgress);

map.render(unlockProgressPresenter);
map.render(tileSetPresenter);

// TODO real implementation that gets steps
function getStepsProgress() {
    return 100;
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
};

// TODO hook into on goal reached event to update unlocked tiles & ship them off to companion.