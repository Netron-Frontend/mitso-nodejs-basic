import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const decompress = async () => {
    const sourcePath = path.join('./files/archive.gz');
    const destPath = path.join('./files/fileToCompress.txt');

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gunzip = zlib.createGunzip();

    readStream
        .pipe(gunzip)
        .pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Файл успешно распакован');
    });

    writeStream.on('error', (error) => {
        console.error('Ошибка при распаковке:', error.message);
    });
};

decompress();