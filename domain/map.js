export default class Map {
    constructor(gridOptions) {
        this.gridOptions = gridOptions;
        this.grid = [];

        for (let x = 0; x < gridOptions.width; x++) {
            for (let y = 0; y < gridOptions.height; y++) {
                this.grid.push(createPoint(x, y));
            }
        }
    }

    render(presenter) {
        this.grid.forEach(coordinates => {
            presenter.present(coordinates)
        });
    }

    spiral() {
        const usedPoints = { "00": true };
        const path = [createPoint(0, 0)];
        const directions = [createPoint(1, 0), createPoint(0, 1), createPoint(-1, 0), createPoint(0, -1)]
        let direction = 0;

        while (this.grid.length > path.length) {
            const lastPointInPath = path[path.length - 1];

            const nextPotentialPoint = add(lastPointInPath, directions[direction]);
            const nextPotentialPointKey = `${nextPotentialPoint.x}${nextPotentialPoint.y}`;

            const isNextPotentialPointInGrid = nextPotentialPoint.x >= 0 && nextPotentialPoint.y >= 0 && nextPotentialPoint.x < this.gridOptions.width && nextPotentialPoint.y < this.gridOptions.height;
            if (isNextPotentialPointInGrid && !usedPoints[nextPotentialPointKey]) {
                path.push(nextPotentialPoint);
                usedPoints[nextPotentialPointKey] = true;
                continue;
            }

            direction = direction + 1;
            if (direction > 3) {
                direction = 0;
            }
        }

        return path;
    }
}

// TODO refactored out as it is duplicated else where
function createPoint(x, y) {
    return { x: x, y: y };
}

function add(point1, point2) {
    return { x: point1.x + point2.x, y: point1.y + point2.y };
}