import {
    up,
    cd,
    ls,
    getCurrentDirectory
} from './navigation.js';
import {
    cat,
    addFile,
    renameFile,
    copyFile,
    moveFile,
    removeFile
} from './file-operations.js';
import {
    getEOL,
    getCPUInfo,
    getHomeDir,
    getSystemUsername,
    getArchitecture
} from './os-info.js';
import { calculateHash } from './hash.js';
import { compress, decompress } from './compress.js';

const commands = {
    up: () => up(),
    cd: (path) => cd(path),
    ls: () => ls(),
    cat: (path) => cat(path),
    add: (filename) => addFile(filename),
    rn: (oldPath, newName) => renameFile(oldPath, newName),
    cp: (src, dest) => copyFile(src, dest),
    mv: (src, dest) => moveFile(src, dest),
    rm: (path) => removeFile(path),
    os: (flag) => handleOSCommand(flag),
    hash: (path) => calculateHash(path),
    compress: (src, dest) => compress(src, dest),
    decompress: (src, dest) => decompress(src, dest)
};

const handleOSCommand = (flag) => {
    switch(flag) {
        case '--EOL': return getEOL();
        case '--cpu': return getCPUInfo();
        case '--homedir': return getHomeDir();
        case '--username': return getSystemUsername();
        case '--architecture': return getArchitecture();
        default: throw new Error('Invalid input');
    }
};

export const handleCommand = async (input) => {
    if (!input) return;

    const [command, ...args] = input.split(' ');

    try {
        if (commands[command]) {
            await commands[command](...args);
        } else {
            console.log('Invalid input');
        }
    } catch (error) {
        console.log('Operation failed');
    }
};