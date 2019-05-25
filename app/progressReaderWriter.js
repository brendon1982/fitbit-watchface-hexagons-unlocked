import SavedData from "../domain/savedData";
import { readFileSync, writeFileSync } from "fs";
import * as fileNames from "../common/fileNames"

export function progressReader() {
    let savedData;
    try {
        savedData = readFileSync(`/private/data/${fileNames.savedData}`, "json");
    } catch (error) {
        console.log(error);
    }

    if (!savedData) {
        return seedProgress();
    }

    return savedData;
}

export function progressWriter(progress) {
    writeFileSync(fileNames.savedData, progress, "json");
}

function seedProgress() {
    const seedData = new SavedData("Grass Land", "Heart Rate");
    progressWriter(seedData);

    return seedData;
}