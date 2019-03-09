import Progress from "../domain/progress";
import UnlockedTile from '../domain/unlockedTile';
import * as fs from "fs";

const fileName = "progress.cbor";

function progressReader() {
    let progress;
    try {
        progress = fs.readFileSync(fileName);
    } catch {}

    if (!progress) {
        return seedProgress();
    }

    return progress;
}

function progressWriter(progress) {
    fs.writeFileSync(fileName, progress, "cbor");
}

function seedProgress() {
    const seedData = new Progress("Nature", [
        new UnlockedTile(1, new Date(2019, 3, 5)),
        new UnlockedTile(2, new Date(2019, 3, 6))
    ]);
    progressWriter(seedData);

    return seedData;
}

export {
    progressReader,
    progressWriter
}