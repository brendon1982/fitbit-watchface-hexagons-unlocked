import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";

import Map from "../domain/map";
import TileSet from "../domain/tilesSet";
import HexRenderer from "./hexRenderer";
import TileSetRandomImagePresenter from "../domain/tileSetRandomImagePresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import { progressReader, progressWriter } from "./progressReaderWriter";
import { formatDateAsString } from "../common/utils";
import { goals, today } from "user-activity";

// import { memory } from "system";
// console.log(`A ${memory.js.used} / ${memory.js.total}`);

const tileSet = new TileSet()
    .loadProgressUsing(progressReader)
    .savesProgressUsing(progressWriter);

const map = new Map({ width: 7, height: 6 });
const hexRenderer = new HexRenderer();
const tileSetPresenter = new TileSetRandomImagePresenter(tileSet, [], hexRenderer);
const progressPresenter = new TileSetUnlockProgressPresenter(tileSet, map.spiral(), getStepsProgress, hexRenderer);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    renderMap();
};

goals.onreachgoal = function () {
    checkSteps();
}

checkSteps();

function checkSteps() {
    setTimeout(() => {
        if (today.adjusted.steps >= goals.steps) {
            tileSet.unlockTile(tileSet.getTileBeingUnlockedToday());
            renderMap();
        }
    }, 0);
}

function renderMap() {
    setTimeout(() => {
        if (isNewDay()) {
            map.render(tileSetPresenter);
        }
        map.render(progressPresenter);
    }, 0);
}

let lastRenderedDay;
function isNewDay() {
    const currentDay = formatDateAsString(new Date());
    if (currentDay !== lastRenderedDay) {
        lastRenderedDay = currentDay;
        return true;
    }

    return false;
}

function getStepsProgress() {
    const stepsGoal = goals.steps || 10000;
    return today.adjusted.steps / stepsGoal * 100;
}