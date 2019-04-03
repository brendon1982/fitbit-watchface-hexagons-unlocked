import Progress from "../domain/progress";
import UnlockedTile from '../domain/unlockedTile';
import { readFileSync, writeFileSync } from "fs";
import { outbox } from "file-transfer";
import * as fileNames from "../common/fileNames"

export function progressReader() {
    let progress;
    try {
        progress = readFileSync(`/private/data/${fileNames.progress}`, "json");
    } catch (error) {
        console.log(error);
    }

    if (!progress) {
        return seedProgress();
    }

    return progress;
}

export function progressWriter(progress) {
    writeFileSync(fileNames.progress, progress, "json");
    outbox.enqueueFile(`/private/data/${fileNames.progress}`)
        .catch(() => {
            console.log("Couldn't write progress");
        });
}

// TODO consider rather seeding when tileset is changed
function seedProgress() {
    const seedData = new Progress("Grass Land", [
        new UnlockedTile(1, new Date(2019, 0, 1)),
        new UnlockedTile(2, new Date(2019, 0, 1)),

        new UnlockedTile(10, new Date(2019, 0, 1)),
        new UnlockedTile(11, new Date(2019, 0, 1)),

        new UnlockedTile(19, new Date(2019, 0, 1)),
        new UnlockedTile(20, new Date(2019, 0, 1)),

        new UnlockedTile(28, new Date(2019, 0, 1)),
        new UnlockedTile(29, new Date(2019, 0, 1)),

        new UnlockedTile(37, new Date(2019, 0, 1)),
        new UnlockedTile(38, new Date(2019, 0, 1))
    ]);
    progressWriter(seedData);

    return seedData;
}