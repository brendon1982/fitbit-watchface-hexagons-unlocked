import { formatDateAsString } from "../common/utils";

export default class UnlockedTile {
    constructor(id, date) {
        this.id = id;
        this.date = formatDateAsString(date);
    }
}