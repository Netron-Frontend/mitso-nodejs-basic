import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

export const cat = async (filePath) => {
    const fullPath = path.isAbsolute(filePath)
        ? filePath
        : path.join(process.cwd(), filePath);

    await fsPromises.access(fullPath, fs.constants.R_OK);

    const readStream = createReadStream(fullPath, 'utf-8');

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    return new Promise((resolve, reject) => {
        readStream.on('end', resolve);
        readStream.on('error', reject);
    });
};

export const addFile = async (filename) => {
    const fullPath = path.join(process.cwd(), filename);

    // Создаем пустой файл
    await fsPromises.writeFile(fullPath, '');
    console.log(`File ${filename} created successfully`);
};

export const renameFile = async (oldPath, newName) => {
    const sourcePath = path.isAbsolute(oldPath)
        ? oldPath
        : path.join(process.cwd(), oldPath);

    const destPath = path.join(path.dirname(sourcePath), newName);

    await fsPromises.rename(sourcePath, destPath);
    console.log(`File renamed to ${newName}`);
};

export const copyFile = async (src, dest) => {
    const sourcePath = path.isAbsolute(src)
        ? src
        : path.join(process.cwd(), src);

    const destPath = path.isAbsolute(dest)
        ? path.join(dest, path.basename(sourcePath))
        : path.join(process.cwd(), dest, path.basename(sourcePath));

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);

    await pipeline(readStream, writeStream);
    console.log('File copied successfully');
};

export const moveFile = async (src, dest) => {
    const sourcePath = path.isAbsolute(src)
        ? src
        : path.join(process.cwd(), src);

    const destPath = path.isAbsolute(dest)
        ? path.join(dest, path.basename(sourcePath))
        : path.join(process.cwd(), dest, path.basename(sourcePath));

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);

    await pipeline(readStream, writeStream);
    await fsPromises.unlink(sourcePath);
    console.log('File moved successfully');
};

export const removeFile = async (filePath) => {
    const fullPath = path.isAbsolute(filePath)
        ? filePath
        : path.join(process.cwd(), filePath);

    await fsPromises.unlink(fullPath);
    console.log('File deleted successfully');
};