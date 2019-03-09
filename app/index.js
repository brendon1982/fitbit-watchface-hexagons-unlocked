import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";

import Map from "../domain/map";
import TileSet from "../domain/tilesSet";
import TileSetRandomImagePresenter from "../domain/tileSetRandomImagePresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import { hexOptions, gridOptions } from "./mapOptions"
import { progressReader, progressWriter } from "./progressReaderWriter";
import { goals, today } from "user-activity";

const tileSet = new TileSet()
    .loadProgressUsing(progressReader)
    .savesProgressUsing(progressWriter);

const map = new Map(gridOptions, hexOptions);

const tileSetPresenter = new TileSetRandomImagePresenter(tileSet, []);
const progressPresenter = new TileSetUnlockProgressPresenter(tileSet, map.spiral(), getStepsProgress);

map.render(tileSetPresenter);
map.render(progressPresenter);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    map.render(progressPresenter);
};

goals.onreachgoal = function (goal) {
    if (today.adjusted.steps >= goal.steps) {
        map.render(progressPresenter);
        tileSet.unlockTile(tileSet.getTileBeingUnlockedToday());
    }
}

function getStepsProgress() {
    const stepsGoal = goals.steps || 10000;
    return today.adjusted.steps / stepsGoal * 100;
}