import fs from 'fs';

const read = async () => {

    const writeStream = fs.createWriteStream('./files/fileToWrite.txt');

    process.stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
        console.error('Ошибка при записи в файл:', error.message);
    });
};

await read();