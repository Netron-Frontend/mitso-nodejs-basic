import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const compress = async () => {
    const sourcePath = path.join('./files/fileToCompress.txt');
    const destPath = path.join('./files/archive.gz');

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gzip = zlib.createGzip();

    readStream
        .pipe(gzip)
        .pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Файл успешно сжат в archive.gz');
    });

    writeStream.on('error', (error) => {
        console.error('Ошибка при сжатии:', error.message);
    });
};

await compress();