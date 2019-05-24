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
}

function createPoint(x, y) {
    return { x: x, y: y };
}