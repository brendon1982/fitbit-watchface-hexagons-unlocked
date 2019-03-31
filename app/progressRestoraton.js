import { inbox } from "file-transfer";
import { writeFileSync, readFileSync, unlinkSync } from "fs";

export default class ProgressRestoration {
    constructor(progressChangedCallback) {
        this.onProgressChanged = progressChangedCallback
    }

    startListeningForProgressRestoration() {
        inbox.onnewfile = this.processAllFiles.bind(this);
        this.processAllFiles();
    }

    processAllFiles() {
        let fileName;
        while (fileName = inbox.nextFile()) {
            const fullFileName = `/private/data/${fileName}`
            
            const progress = readFileSync(fullFileName, "json");
            writeFileSync("/private/data/progress.json", progress, "json");

            unlinkSync(fullFileName);

            this.onProgressChanged();
        }
    }
}

// TODO does this need to be a class? only the things in /domain are classes