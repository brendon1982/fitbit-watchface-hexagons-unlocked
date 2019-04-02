import { inbox } from "file-transfer";
import { writeFileSync, readFileSync, unlinkSync } from "fs";
import * as fileNames from "../common/fileNames";

export default class ProgressRestoration {
    constructor(progressChangedCallback) {
        this.onProgressChanged = progressChangedCallback
    }

    startListeningForProgressRestoration() {
        inbox.onnewfile = this.processAllFiles.bind(this);
        this.processAllFiles();
    }

    processAllFiles() {
        let tmpFileName;
        while (tmpFileName = inbox.nextFile()) {
            const fullFileName = `/private/data/${tmpFileName}`
            
            const progress = readFileSync(fullFileName, "json");
            writeFileSync(`/private/data/${fileNames.progress}`, progress, "json");

            unlinkSync(fullFileName);

            this.onProgressChanged();
        }
    }
}