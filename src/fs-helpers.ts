import fs from "fs";

export const createDirIfNotExists = (dir: string) => !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });