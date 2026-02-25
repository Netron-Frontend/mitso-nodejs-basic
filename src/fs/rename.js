import fs from 'fs';

const rename = async () => {
    fs.rename('files/wrongFilename.txt', 'files/properFilename.md', (err) => {
        if(err) throw err;
        console.log('FS operation failed');
    });
};

await rename();