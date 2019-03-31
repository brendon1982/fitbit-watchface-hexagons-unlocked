import Progress from "../domain/progress";
import UnlockedTile from '../domain/unlockedTile';
import { readFileSync, writeFileSync } from "fs";
import { outbox } from "file-transfer";

const fileName = "progress.json";

export function progressReader() {
    let progress;
    try {
        progress = readFileSync(`/private/data/${fileName}`, "json");
    } catch (error) {
        console.log(error);
    }

    if (!progress) {
        return seedProgress();
    }

    return progress;
}

export function progressWriter(progress) {
    writeFileSync(fileName, progress, "json");
    outbox.enqueueFile(`/private/data/${fileName}`)
        .catch(() => {
            console.log("Couldn't write progress");
        });
}

function seedProgress() {
    const seedData = new Progress("Grass Land", [
        new UnlockedTile(1, new Date(2019, 0, 1)),
        new UnlockedTile(2, new Date(2019, 0, 1)),

        new UnlockedTile(10, new Date(2019, 0, 1)),
        new UnlockedTile(11, new Date(2019, 0, 1)),

        new UnlockedTile(19, new Date(2019, 0, 1)),
        new UnlockedTile(20, new Date(2019, 0, 1))
    ]);
    progressWriter(seedData);

    return seedData;
}

// TODO why is this not a class?