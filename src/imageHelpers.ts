import gm from "gm";
import Jimp from "jimp";
import fs from "fs";

export const getImageSize = (file: string): Promise<any> =>
  new Promise((resolve, reject) => {
    gm(file).size(function(err, size) {
      if (err) return reject(err);
      if (!size) return reject("Could not read image size");
      return resolve({
        width: size.width,
        height: size.height
      });
    });
  });

export const resizeImage = (
  path: string,
  width: any,
  height: any
): Promise<any> =>
  new Promise((resolve, reject) => {
    gm(path)
      .resize(width, height)
      .write(path, function(err) {
        if (err) return reject(err);
        return resolve();
      });
  });

export const convertImage = async (
  source: string,
  dest: string,
  removeOriginal?: boolean
) =>
  Jimp.read(source).then(image => {
    image.write(dest);
    if (removeOriginal && source !== dest) {
      fs.unlinkSync(source);
    }
    return;
  });
