import fs from 'fs';

const create = async () => {
    fs.writeFile('fresh.txt', 'I am fresh and young', (err) => {
        if(err) throw err;
        console.log('FS operation failed');
    });
};

await create();