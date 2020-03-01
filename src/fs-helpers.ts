import fs from "fs";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export const copyFile = (source: string, dest: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.copyFile(source, dest, err => {
      if (err) return reject(err);
      return resolve();
    });
  });

export const readJSONFile = (source: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) return reject(err);
      const result = JSON.parse(data.toString());
      return resolve(result);
    });
  });

export const renameFile = (source: string, dest: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.rename(source, dest, function(err) {
      if (err) return reject(err);
      return resolve();
    });
  });

const reservedUnixNames = () => /[<>:"\/\\|?*\x00-\x1F]/g;
const reservedWindowsNames = () => /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;

export const createDirIfNotExists = (dir: string) =>
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

export const validFilename = (fileName: string) => {
  if (!fileName || fileName.length > 255) {
    return false;
  }

  if (
    reservedUnixNames().test(fileName) ||
    reservedWindowsNames().test(fileName)
  ) {
    return false;
  }

  if (/^\.\.?$/.test(fileName)) {
    return false;
  }

  return true;
};

export const isDirectory = (path: string) => statSync(path).isDirectory();

export const getDirectories = (path: string) =>
  readdirSync(path)
    .map(name => join(path, name))
    .filter(isDirectory);

export const isFile = (path: string) => statSync(path).isFile();

export const getFiles = (path: string) =>
  readdirSync(path)
    .map(name => join(path, name))
    .filter(isFile);

export const getFilesRecursively = (path: string): any => {
  let dirs = getDirectories(path);
  let files = dirs
    .map(dir => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path));
};

export const copyRecursiveSync = (source: string, dest: string) => {
  const exists = fs.existsSync(source);
  const isDir = exists && isDirectory(source);
  if (isDir) {
    createDirIfNotExists(dest);
    fs.readdirSync(source).forEach(function(childItemName) {
      copyRecursiveSync(join(source, childItemName), join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(source, dest);
  }
};
