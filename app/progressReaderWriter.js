import Progress from "../domain/progress";
import UnlockedTile from '../domain/unlockedTile';
import { readFileSync, writeFileSync } from "fs";
import { outbox } from "file-transfer";

const fileName = "progress.json";

export function progressReader() {
    let progress;
    try {
        progress = readFileSync(fileName, "json");
    } catch { }

    if (!progress) {
        return seedProgress();
    }

    return progress;
}

export function progressWriter(progress) {
    writeFileSync(fileName, progress, "json");
    outbox.enqueueFile(`/private/data/${fileName}`);
}

function seedProgress() {
    const seedData = new Progress("Nature", [
        new UnlockedTile(1, new Date(2019, 0, 1)),
        new UnlockedTile(2, new Date(2019, 0, 1))
    ]);
    progressWriter(seedData);

    return seedData;
}