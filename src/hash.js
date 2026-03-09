import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

export const calculateHash = async (filePath) => {
    const fullPath = path.isAbsolute(filePath)
        ? filePath
        : path.join(process.cwd(), filePath);

    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(fullPath);

    return new Promise((resolve, reject) => {
        readStream.on('data', (chunk) => hash.update(chunk));
        readStream.on('end', () => {
            console.log(`SHA256 hash: ${hash.digest('hex')}`);
            resolve();
        });
        readStream.on('error', reject);
    });
};