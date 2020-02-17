import fs from "fs";
import request from "request";

export const downloadImage = async (uri: string, path: string, newFilename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!uri || !path) reject("Missing uri or path");
        request.head(uri, (err: any) => {
            if (err) {
                reject(err);
            }

            let savePath = '';
            const splitedUri = uri.split("/");

            if (newFilename) {
                if (!newFilename.includes(".")) reject("File extension missing");
                savePath = `${path}/${newFilename}`;
            } else {
                savePath = `${path}/${splitedUri.pop()}`;
            }

            const stream = request(uri).pipe(fs.createWriteStream(savePath));
            stream.on('close', resolve);
            stream.on('error', (e: any) => { reject(e) })
        });
    });
}