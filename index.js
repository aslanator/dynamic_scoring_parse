import DataRepository from "./DataRepository.js";
import path from 'path';
import Formatter from "./Formatter.js";

DataRepository.build(path.resolve('./data')).then(repository => {
    const formatter = new Formatter(repository, path.resolve('./output/result.txt'));
    formatter.printFormatted();
});
