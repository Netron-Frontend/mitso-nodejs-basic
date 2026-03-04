import fs from 'fs';

const read = async () => {

    const readStream = fs.createReadStream('./files/fileToRead.txt');

    readStream.pipe(process.stdout);

    readStream.on('error', (error) => {
        console.error('Ошибка при чтении файла:', error.message);
    });
};

await read();