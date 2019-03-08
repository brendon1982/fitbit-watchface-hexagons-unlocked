import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";

import Map from "../domain/map";
import Progress from "../domain/progress";
import TileSetRandomImagePresenter from "../domain/tileSetRandomImagePresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import TileSet from "../domain/tilesSet";
import { hexOptions, gridOptions } from "./mapOptions"
import UnlockedTile from '../domain/unlockedTile';

const tiles = new TileSet()
    .loadProgressUsing(() => {
        return new Progress("Nature", [
            new UnlockedTile(1, new Date(2019, 3, 5)),
            new UnlockedTile(2, new Date(2019, 3, 6))
        ])
    });

const map = new Map(gridOptions, hexOptions);
const progressCoordinates = map.spiral();

const tileSetPresenter = new TileSetRandomImagePresenter(tiles, []);
const progressPresenter = new TileSetUnlockProgressPresenter(tiles, progressCoordinates, getStepsProgress);

map.render(tileSetPresenter);
map.render(progressPresenter);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    map.render(progressPresenter);
};

// TODO real implementation that gets steps
function getStepsProgress() {
    return 100;
}

// TODO hook into on goal reached event to update unlocked tiles & ship them off to companion.