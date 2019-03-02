import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import TileSetUnlockProgressPresenter from "../domain/tileSetUnlockProgressPresenter";
import { availableTiles, unlockedTiles } from "../resources/tiles";
import document from "document";

const hexOptions = {
    size: 34.5,
    orientation: "pointy",
    render: function (image) {
        const point = this.toPoint();
        const id = `${this.x}${this.y}`;

        const imageElement = document.getElementById(id);
        imageElement.href = image;
        imageElement.width = 60;
        imageElement.height = 70;
        imageElement.x = point.x - (imageElement.width / 2);
        imageElement.y = point.y + (Math.sqrt(34.5) - (imageElement.width / 2));
    },
    progress: function (percentage) {
        const id = `${this.x}${this.y}`;

        const imageElement = document.getElementById(id);
        // TODO figure out how to represent progress, opacity doesn't seem to be settable at runtime!
        // imageElement.opacity = (percentage / 100).toString();
    }
};

const gridOptions = {
    width: 7,
    height: 6
};

const map = new Map(gridOptions, hexOptions);
const progressCoordinates = [createPoint(0, 2), createPoint(0, 1), createPoint(1, 0), createPoint(0, 0)]
const tileSetPresenter = new RandomTileSetPresenter(availableTiles, unlockedTiles, "Nature", progressCoordinates);
const unlockPresenter = new TileSetUnlockProgressPresenter(availableTiles, unlockedTiles, "Nature", progressCoordinates, () => 37.5);
map.render(tileSetPresenter);
map.render(unlockPresenter);

function createPoint(x, y) {
    return { x, y };
}

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
};