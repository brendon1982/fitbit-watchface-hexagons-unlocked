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
import ProgressRestoration from './progressRestoraton';

import { memory } from "system";
console.log(`A ${memory.js.used} / ${memory.js.total}`);

let tileSet = new TileSet()
    .loadProgressUsing(progressReader)
    .savesProgressUsing(progressWriter);
let lastRenderKey;

const map = new Map({ width: 7, height: 6 });
const progressCoordinates = map.spiral();
const hexRenderer = new HexRenderer();

const progressRestoration = new ProgressRestoration(reloadProgress);
progressRestoration.startListeningForProgressRestoration();

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
    renderMap();
    checkIfTileShouldBeUnlocked();
    console.log(`B ${memory.js.used} / ${memory.js.total}`);
};

goals.onreachgoal = () => {
    renderMap();
    checkIfTileShouldBeUnlocked();
}

messaging.peerSocket.onmessage = (evt) => {
    if (evt.data.command === commands.changeTileSet) {
        tileSet.changeTileSet(evt.data.tileSet);
        renderMap();
    }
}

function reloadProgress() {
    tileSet.loadProgressUsing(progressReader);
    renderMap();
    checkIfTileShouldBeUnlocked();
}

function renderMap() {
    allowRuntimeToCollectMemoryThen(() => {
        if (isNewDayOrTileSet()) {
            let randomImagePresenter = new TileSetRandomImagePresenter(tileSet, [], hexRenderer)
            map.render(randomImagePresenter);
            randomImagePresenter = null;
        }

        let unlockProgressPresenter = new TileSetUnlockProgressPresenter(tileSet, progressCoordinates, getStepsProgress, hexRenderer);
        map.render(unlockProgressPresenter);
        unlockProgressPresenter = null;
    });
}

function checkIfTileShouldBeUnlocked() {
    const tileBeingUnlockedToday = tileSet.getTileBeingUnlockedToday();
    if (tileBeingUnlockedToday && today.adjusted.steps >= goals.steps) {
        tileSet.unlockTile(tileBeingUnlockedToday);
    }
}

function allowRuntimeToCollectMemoryThen(then) {
    setTimeout(() => {
        then();
    }, 0);
}

function isNewDayOrTileSet() {
    const currentRenderKey = `${formatDateAsString(new Date())}-${tileSet.currentTileSet}-${tileSet.unlockedTiles.length}`;
    const shouldRerender = currentRenderKey !== lastRenderKey;
    lastRenderKey = currentRenderKey;

    return shouldRerender;
}

function getStepsProgress() {
    const stepsGoal = goals.steps || 10000;
    return today.adjusted.steps / stepsGoal * 100;
}