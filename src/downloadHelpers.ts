import fs from "fs";
import request from "request";
import { createDirIfNotExists, validFilename } from "./fs-helpers";

export const downloadImage = async (uri: string, savePath: string, newFilename?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!uri || !savePath) return reject("Missing uri or path");
        if (newFilename && !validFilename(newFilename)) return reject("Invalid filename");

        let fullPath = '';
        const splitedUri = uri.split("/");

        if (newFilename) {
            if (!newFilename.includes(".")) return reject("File extension missing");
            fullPath = `${savePath}/${newFilename}`;
        } else {
            fullPath = `${savePath}/${splitedUri.pop()}`;
        }

        createDirIfNotExists(fullPath);

        if (fs.existsSync(fullPath)) {
            return reject("File already exists!");
        }
        request.head(uri, (err: any) => {
            if (err) {
                reject(err);
            }
            const stream = request(uri).pipe(fs.createWriteStream(fullPath));
            stream.on('close', resolve);
            stream.on('error', (e: any) => { reject(e) })
        });
    });
}