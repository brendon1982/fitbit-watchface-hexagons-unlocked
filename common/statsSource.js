import { today } from "user-activity";
import SavedData from "../domain/savedData";
import * as heart from "../common/heart";

export default class StatsSource {
    constructor() {
        this.dataWriter = () => { };
        this.dataReader = () => new SavedData();
        this.heartRate = 0;

        const self = this;
        heart.initialize(hrm => {
            self.heartRate = hrm.heartRate
        });
    }

    readStat() {
        const savedData = this.dataReader();

        if (savedData.stat === "Steps") {
            return {
                value: today.local.steps,
                icon: "steps.png"
            };
        }

        return {
            value: this.heartRate,
            icon: "heart.png"
        };
    }

    cycleStat() {
        const savedData = this.dataReader();
        savedData.stat = "";

        this.dataWriter(savedData);

        return this;
    }

    savesDataUsing(dataWriter) {
        this.dataWriter = dataWriter;
        return this;
    }

    loadsDataUsing(dataReader) {
        this.dataReader = dataReader;
        return this;
    }
}