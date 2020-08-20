import fs from 'fs';
import util from 'util';
import path from 'path';
const writeFile = util.promisify(fs.writeFile);

export default class Formatter {
    repository
    filePath

    /**
     *
     * @param {DataRepository} repository
     * @param {string} filePath
     */
    constructor(repository, filePath) {
        this.repository = repository;
        this.filePath   = filePath;
    }

    async printFormatted() {
        const filePath = this.getNewFileName();
        let output = '[\n';
        for(const data of this.repository.all()){
            /** @type {Data} data **/
            output += `'${data.id}',\n`;
        }
        output += ']';
        try{
            await writeFile(filePath, output);
        }
        catch (e) {
            console.log('\x1b[31m', 'ОПА!', '\x1b[0m');
            console.error(e);
        }
    }

    getNewFileName() {
        const date             = new Date();
        const dateString       = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}_`
            + `${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
        const folderPath       = path.dirname(this.filePath);
        const ext              = path.extname(this.filePath);
        const filename         = path.basename(this.filePath, ext);
        const fileNameWithDate = `${filename}_${dateString}`;
        return path.resolve(folderPath, fileNameWithDate + ext);
    }
}