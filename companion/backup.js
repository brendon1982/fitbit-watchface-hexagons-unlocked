import { settingsStorage } from "settings";
import * as settingsKeys from "../common/settingsKeys";

function upload(progress) {
    const body = createUploadBody(progress);

    return progressFileId()
        .then(fileId => {
            const method = fileId ? "PATCH" : "POST";
            const url = fileId ?
                `https://www.googleapis.com/upload/drive/v3/files/${fileId}?spaces=appDataFolder` :
                `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder`;

            return authenticatedRequest(url, method, body)
                .then(response => {
                    return response.text();
                });
        });
}

function progressFileId() {
    return authenticatedRequest("https://www.googleapis.com/drive/v3/files?spaces=appDataFolder", "GET")
        .then(progressFile)
        .then(file => {
            return file && file.id
        });
}

function authenticatedRequest(url, method, body) {
    // TODO check if logged in, if not exit early with rejection
    const backupAuth = JSON.parse(settingsStorage.getItem(settingsKeys.backupAccessToken()));

    return fetch(url,
        {
            method: method,
            headers: new Headers({ "Authorization": `Bearer ${backupAuth["access_token"]}` }),
            body: body
        }
    );
}

function createUploadBody(progress) {
    const metadata = {
        "name": "progress.json",
        "parents": ["appDataFolder"]
    };
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" })
    var fileBlob = new Blob([JSON.stringify(progress)], { type: "application/json" });

    var form = new FormData();
    form.append("metadata", metadataBlob);
    form.append("file", fileBlob);

    return form;
}

function progressFile(response) {
    return response.text().then(responseText => {
        const fileList = JSON.parse(responseText);
        return fileList.files.find(file => file.name === "progress.json");;
    });
}

export {
    upload
}