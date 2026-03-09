import fs from 'node:fs/promises';
import path from 'node:path';
import { homedir } from 'node:os';

export const getCurrentDirectory = () => process.cwd();

export const up = () => {
    const currentDir = getCurrentDirectory();
    const parentDir = path.dirname(currentDir);

    // Проверяем, не пытаемся ли выйти за пределы корня
    if (parentDir !== currentDir) {
        process.chdir(parentDir);
    }
};

export const cd = (targetPath) => {
    if (!targetPath) {
        throw new Error('Path is required');
    }

    const newPath = path.isAbsolute(targetPath)
        ? targetPath
        : path.join(getCurrentDirectory(), targetPath);

    // Проверяем существование директории
    if (fs.access(newPath).then(() => true).catch(() => false)) {
        process.chdir(newPath);
    } else {
        throw new Error('Directory does not exist');
    }
};

export const ls = async () => {
    const currentDir = getCurrentDirectory();
    const files = await fs.readdir(currentDir, { withFileTypes: true });

    const items = files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file'
    }));

    // Сортируем: сначала папки, потом файлы, по алфавиту
    items.sort((a, b) => {
        if (a.type === b.type) {
            return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
    });

    // Выводим таблицу
    console.table(items, ['name', 'type']);
};