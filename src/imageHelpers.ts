import gm from "gm";



export const getImageSize = (file: string): Promise<any> => new Promise((resolve, reject) => {
    gm(file)
        .size(function (err, size) {
            console.log({ err, size })
            if (err) return reject(err);
            if (!size) return reject("Could not read image size");
            return resolve({
                width: size.width,
                height: size.height
            })
        });
})