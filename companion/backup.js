import { settingsStorage } from "settings";
import * as settingsKeys from "../common/settingsKeys";

function upload(progress) {
    // TODO check if logged in, if not exit early with rejection
    const backupAuth = JSON.parse(settingsStorage.getItem(settingsKeys.backupAccessToken()));
    const body = createUploadBody(progress);

    return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
            method: "POST",
            headers: new Headers({ "Authorization": `Bearer ${backupAuth["access_token"]}` }),
            body: body
        }
    ).then(response => {
        return response.text().then(data => console.log(data));
    });
}

function list() {
    // TODO check if logged in, if not exit early with rejection
    const backupAuth = JSON.parse(settingsStorage.getItem(settingsKeys.backupAccessToken()));

    return fetch("https://www.googleapis.com/drive/v3/files?spaces=appDataFolder",
        {
            method: "GET",
            headers: new Headers({ "Authorization": `Bearer ${backupAuth["access_token"]}` })
        }
    ).then(response => {
        return response.text().then(data => console.log(data));
    });
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

export {
    upload,
    list
}