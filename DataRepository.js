import fs from 'fs';
import util from 'util';
import Data from "./Data.js";
import path from 'path';
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

export default class DataRepository {
    dataArray;

    /**
     *
     * @param {Data[]} dataArray
     */
    constructor(dataArray) {
        if (!Array.isArray(dataArray)) {
            throw new Error('Cannot be called directly');
        }
        this.dataArray = dataArray;
    }

    static async build(dirPath) {
        const files = [];
        const dataArray = [];
        const filePaths = await readdir(dirPath);
        for(const filePath of filePaths){
            const text = await readFile(path.resolve(dirPath, filePath));
            files.push(text.toString())
        }
        for(const file of files){
            const matches = file.matchAll(/setId\((\'|\")(\S+)(\'|\")\)/g);
            for(let match of matches){
                dataArray.push(new Data(match[2]));
            }
        }
        return new DataRepository(dataArray);
    }

    /**
     *
     * @returns {Data[]}
     */
    all() {
        return this.dataArray;
    }
}