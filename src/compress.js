import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export const compress = async (src, dest) => {
    const sourcePath = path.isAbsolute(src)
        ? src
        : path.join(process.cwd(), src);

    const destPath = path.isAbsolute(dest)
        ? dest
        : path.join(process.cwd(), dest);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const brotli = zlib.createBrotliCompress();

    await pipeline(readStream, brotli, writeStream);
    console.log('File compressed successfully');
};

export const decompress = async (src, dest) => {
    const sourcePath = path.isAbsolute(src)
        ? src
        : path.join(process.cwd(), src);

    const destPath = path.isAbsolute(dest)
        ? dest
        : path.join(process.cwd(), dest);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const brotli = zlib.createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);
    console.log('File decompressed successfully');
};