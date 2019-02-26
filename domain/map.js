import * as Honeycomb from "../libs/honeycomb/honeycomb";

export default class Map {
    constructor(gridOptions, hexOptions) {
        const HexFactory = Honeycomb.extendHex(hexOptions);
        const GridFactory = Honeycomb.defineGrid(HexFactory);
        this.grid = GridFactory.rectangle(gridOptions);
    }

    render(presenter) {
        this.grid.forEach(hex => {
            presenter.present(hex)
        });
    }
}