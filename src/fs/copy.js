import fs from 'fs';

const copy = async () => {
    fs.cp(`./files`, `./files_copy`, (err) => {
        if(err) throw err;
        console.log('FS operation failed');
    })
};

await copy();
