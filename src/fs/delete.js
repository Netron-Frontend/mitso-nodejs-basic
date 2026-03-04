import fs from 'fs'

const remove = async () => {
    fs.unlink('files/fileToRemove.txt', (err) => {
        if(err) throw err;
        console.log('FS operation failed');
    });
};

await remove();