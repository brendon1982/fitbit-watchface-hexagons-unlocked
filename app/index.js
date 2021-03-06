import clock from "clock";
import { me as device } from "device";
import * as messaging from "messaging";
import * as timeRenderer from "./timeRenderer";
import * as dateRenderer from "./dateRenderer";
import * as statsRenderer from "./statsRenderer";
import * as commands from "../common/commands";
import StatsSource from "../common/statsSource"

import Map from "../domain/map";
import TileSet from "../domain/tilesSet";
import HexRenderer from "./hexRenderer";
import TileSetRandomImagePresenter from "../domain/tileSetRandomImagePresenter";
import { progressReader, progressWriter } from "./progressReaderWriter";
import { formatDateAsString } from "../common/utils";

let tileSet = new TileSet()
    .loadProgressUsing(progressReader)
    .savesProgressUsing(progressWriter);
let lastRenderKey;

const map = new Map(getMapSizeForDevice());
const hexRenderer = new HexRenderer();

const statsSource = new StatsSource()
    .loadsDataUsing(progressReader)
    .savesDataUsing(progressWriter);

renderMap();

clock.granularity = "seconds";
clock.ontick = evt => {
    timeRenderer.render(evt.date);
    dateRenderer.render(evt.date);

    if(evt.date.getSeconds() % 5 === 0){
        statsRenderer.render(statsSource.readStat());
    }
};

messaging.peerSocket.onmessage = (evt) => {
    if (evt.data.command === commands.changeTileSet) {
        tileSet.changeTileSet(evt.data.tileSet);
        renderMap();
    }
}

function renderMap() {
    allowRuntimeToCollectMemoryThen(() => {
        if (isNewDayOrTileSet()) {
            let randomImagePresenter = new TileSetRandomImagePresenter(tileSet, [], hexRenderer)
            map.render(randomImagePresenter);
            randomImagePresenter = null;
        }
    });
}

function allowRuntimeToCollectMemoryThen(then) {
    setTimeout(() => {
        then();
    }, 0);
}

function isNewDayOrTileSet() {
    const currentRenderKey = `${formatDateAsString(new Date())}-${tileSet.currentTileSet}`;
    const shouldRerender = currentRenderKey !== lastRenderKey;
    lastRenderKey = currentRenderKey;

    return shouldRerender;
}

function getMapSizeForDevice() {
    const mapSize = { width: 7, height: 7 };
    if (!isIonic()) {
        mapSize.width = 6;
    }
    if (isIonic()) {
        mapSize.height = 6;
    }

    return mapSize;
}

function isIonic() {
    return device.modelId === "27";
}