import fs from 'fs';

const read = async () => {
    fs.readFile('files/fileToRead.txt', 'utf8', (err, data) => {
        if(err) throw err;
        console.log('------------------------');
        console.log(data);
        console.log('------------------------');
    });
};

await read();