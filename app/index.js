import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTileSetPresenter from "../domain/randomTileSetPresenter";
import {availableTiles, unlockedTiles} from "../resources/tiles";
import document from "document";

const hexOptions = {
    size: 34.5,
    orientation: "pointy",
    render: function (image) {
        const point = this.toPoint();
        const id = `${this.x}${this.y}`;
    
        const imageElement = document.getElementById(id)
        imageElement.href = image
        imageElement.width = 60;
        imageElement.height = 70;
        imageElement.x = point.x - (imageElement.width / 2);
        imageElement.y = point.y + (Math.sqrt(34.5) - (imageElement.width / 2));
    }
};

const gridOptions = { 
    width: 7, 
    height: 6 
};

const map = new Map(gridOptions, hexOptions);
const presenter = new RandomTileSetPresenter(availableTiles, unlockedTiles, "Nature", []);

map.render(presenter);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
};