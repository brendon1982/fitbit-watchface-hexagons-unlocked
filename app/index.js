import clock from "clock";
import * as time from "../common/time";
import * as date from "../common/date";
import Map from "../domain/map";
import RandomTilePresenter from "../domain/randomTilePresenter";
import document from "document";

const hexOptions = {
    size: 34.5,
    orientation: "pointy",
    render: function (tile) {
        const hex = this;
        const point = hex.toPoint();
        const id = `${hex.x}${hex.y}`;
    
        const image = document.getElementById(id)
        image.href = tile
        image.width = 60;
        image.height = 70;
        image.x = point.x - (image.width / 2);
        image.y = point.y + (Math.sqrt(34.5) - (image.width / 2));
    }
};

const gridOptions = { 
    width: 7, 
    height: 6 
};

const map = new Map(gridOptions, hexOptions);
const randomTilePresenter = new RandomTilePresenter();

map.render(randomTilePresenter);

clock.granularity = "minutes";
clock.ontick = evt => {
    time.tick(evt.date);
    date.tick(evt.date);
}