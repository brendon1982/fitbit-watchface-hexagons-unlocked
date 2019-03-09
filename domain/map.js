import {extendHex, defineGrid, Point} from "../libs/honeycomb/honeycomb";

export default class Map {
    constructor(gridOptions, hexOptions) {
        const HexFactory = extendHex(hexOptions);
        const GridFactory = defineGrid(HexFactory);
        this.grid = GridFactory.rectangle(gridOptions);
        this.gridOptions = gridOptions;
    }

    render(presenter) {
        this.grid.forEach(hex => {
            presenter.present(hex)
        });
    }

    spiral() {
        const usedPoints = { "00": true };
        const path = [Point(0, 0)];
        const directions = [Point(1, 0), Point(0, 1), Point(-1, 0), Point(0, -1)]
        let direction = 0;

        while (this.grid.length > path.length) {
            const lastPointInPath = path[path.length - 1];

            const nextPotentialPoint = lastPointInPath.add(directions[direction]);
            const nextPotentialPointKey = `${nextPotentialPoint.x}${nextPotentialPoint.y}`;

            const isNextPotentialPointInGrid = nextPotentialPoint.x >= 0 && nextPotentialPoint.y >= 0 && nextPotentialPoint.x < this.gridOptions.width && nextPotentialPoint.y < this.gridOptions.height;
            if (isNextPotentialPointInGrid && !usedPoints[nextPotentialPointKey]) {
                path.push(nextPotentialPoint);
                usedPoints[nextPotentialPointKey] = true;
                continue;
            }

            direction = direction + 1;
            if(direction > 3){
                direction = 0;
            }
        }

        return path;
    }


}