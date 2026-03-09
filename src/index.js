import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { homedir } from 'node:os';
import { handleCommand } from './commands.js';
import { getCurrentDirectory } from './navigation.js';

let username = '';

// Получаем username из аргументов командной строки
const getUsername = () => {
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    return usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
};

// Создаем интерфейс для чтения ввода
const rl = readline.createInterface({ input, output });

// Обработка выхода
const exit = () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
};

// Основная функция
const main = async () => {
    username = getUsername();

    // Устанавливаем начальную директорию как домашнюю
    process.chdir(homedir());

    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${getCurrentDirectory()}`);

    // Обработка ввода
    rl.on('line', async (input) => {
        if (input.trim() === '.exit') {
            exit();
        }

        await handleCommand(input.trim());
        console.log(`\nYou are currently in ${getCurrentDirectory()}`);
    });

    // Обработка Ctrl+C
    rl.on('SIGINT', exit);
};

// Запуск приложения
main().catch(console.error);