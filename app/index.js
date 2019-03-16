import clock from "clock";
import * as messaging from "messaging";
import * as time from "../common/time";
import * as date from "../common/date";
import * as commands from "../common/commands";

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

goals.onreachgoal = () => {
    checkSteps();
}

messaging.peerSocket.onmessage = (evt) => {
    if (evt.data.command === commands.changeTileSet) {
        tileSet.changeTileSet(evt.data.tileSet);
        renderMap();
    }
}

checkSteps();

function checkSteps() {
    const tileBeingUnlockedToday = tileSet.getTileBeingUnlockedToday();
    if (tileBeingUnlockedToday && today.adjusted.steps >= goals.steps) {
        tileSet.unlockTile(tileBeingUnlockedToday);
        renderMap();
    }
}

function renderMap() {
    allowRuntimeToCollectMemoryThen(() => {
        if (isNewDayOrTileSet()) {
            map.render(tileSetPresenter);
        }
        map.render(progressPresenter);
    });
}

function allowRuntimeToCollectMemoryThen(then) {
    setTimeout(() => {
        then();
    }, 0);
}

let lastRenderedCombination;
function isNewDayOrTileSet() {
    const currentCombination = `${formatDateAsString(new Date())}-${tileSet.currentTileSet}`;
    const shouldRerender = currentCombination !== lastRenderedCombination;
    lastRenderedCombination = currentCombination;

    return shouldRerender;
}

function getStepsProgress() {
    const stepsGoal = goals.steps || 10000;
    return today.adjusted.steps / stepsGoal * 100;
}