import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";

import Map from "../domain/map";
import TileSet from "../domain/tilesSet";
import TileSetRandomImagePresenter from "../domain/tileSetRandomImagePresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import FastHex from "./hexRenderer";
import { progressReader, progressWriter } from "./progressReaderWriter";
import { goals, today } from "user-activity";

import { memory } from "system";
console.log(`A ${memory.js.used} / ${memory.js.total}`);

const tileSet = new TileSet()
    .loadProgressUsing(progressReader)
    .savesProgressUsing(progressWriter);
console.log(`B ${memory.js.used} / ${memory.js.total}`);

const map = new Map({ width: 7, height: 6 });
console.log(`C ${memory.js.used} / ${memory.js.total}`);

const hexRenderer = new FastHex();
const tileSetPresenter = new TileSetRandomImagePresenter(tileSet, [], hexRenderer);
console.log(`D ${memory.js.used} / ${memory.js.total}`);
const progressPresenter = new TileSetUnlockProgressPresenter(tileSet, map.spiral(), getStepsProgress, hexRenderer);
console.log(`E ${memory.js.used} / ${memory.js.total}`);

map.render(tileSetPresenter);
console.log(`F ${memory.js.used} / ${memory.js.total}`);
map.render(progressPresenter);
console.log(`G ${memory.js.used} / ${memory.js.total}`);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    map.render(progressPresenter);
    // TODO if day changes should also re-render with tileSetPresenter
};

goals.onreachgoal = function (goal) {
    if (today.adjusted.steps >= goal.steps) {
        tileSet.unlockTile(tileSet.getTileBeingUnlockedToday());
        map.render(progressPresenter);
    }
}

function getStepsProgress() {
    const stepsGoal = goals.steps || 10000;
    return today.adjusted.steps / stepsGoal * 100;
}