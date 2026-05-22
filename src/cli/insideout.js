#!/usr/bin/env node

const fs = require('fs');
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { parseArgs } = require('./args');
const { createTransformStream } = require('./stream');

// Парсим аргументы командной строки
const options = parseArgs();

// Проверка обязательной опции -t
if (!options.task) {
    console.error('Ошибка: Обязательная опция -t или --task не указана');
    console.error('Использование: node insideout.js -t <task_number> [-i <input_file>] [-o <output_file>]');
    process.exit(1);
}

// Проверка, что задача - 2
if (options.task !== '2') {
    console.error(`Ошибка: Поддерживается только задача 2 (insideOut). Получено: ${options.task}`);
    process.exit(1);
}

// Функция проверки существования и доступности файла
const checkFileReadable = (filePath) => {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            throw new Error(`${filePath} является директорией`);
        }
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Ошибка: Входной файл "${filePath}" не существует`);
        } else if (err.message.includes('директорией')) {
            console.error(`Ошибка: "${filePath}" является директорией, а не файлом`);
        } else {
            console.error(`Ошибка: Нет прав на чтение файла "${filePath}"`);
        }
        return false;
    }
};

// Функция проверки возможности записи в файл
const checkFileWritable = (filePath) => {
    try {
        const dir = filePath.substring(0, filePath.lastIndexOf('/'));
        if (dir && !fs.existsSync(dir)) {
            throw new Error(`Директория ${dir} не существует`);
        }
        // Пытаемся открыть файл для записи
        const fd = fs.openSync(filePath, 'w');
        fs.closeSync(fd);
        return true;
    } catch (err) {
        if (err.code === 'EACCES') {
            console.error(`Ошибка: Нет прав на запись в файл "${filePath}"`);
        } else if (err.message.includes('не существует')) {
            console.error(`Ошибка: ${err.message}`);
        } else {
            console.error(`Ошибка: Невозможно создать файл "${filePath}"`);
        }
        return false;
    }
};

// Главная функция
const main = () => {
    const transformStream = createTransformStream();
    let source;
    let destination;
    let useInteractiveMode = false;

    // Настройка входного потока
    if (options.input) {
        if (!checkFileReadable(options.input)) {
            process.exit(1);
        }
        source = createReadStream(options.input, { encoding: 'utf8' });
        console.error(`📖 Чтение из файла: ${options.input}`);
    } else {
        // Интерактивный режим - читаем из stdin
        source = process.stdin;
        useInteractiveMode = true;
        console.error('🎯 Интерактивный режим');
        console.error('📝 Введите текст для преобразования (для выхода введите "exit" или нажмите Ctrl+C):');
        console.error('─'.repeat(50));
    }

    // Настройка выходного потока
    if (options.output) {
        if (!checkFileWritable(options.output)) {
            process.exit(1);
        }
        destination = createWriteStream(options.output, { encoding: 'utf8', flags: 'a' });
        console.error(`💾 Запись в файл: ${options.output}`);
    } else {
        destination = process.stdout;
        if (!useInteractiveMode) {
            console.error('🖥️  Вывод в консоль:');
            console.error('─'.repeat(50));
        }
    }

    // Используем pipeline для обработки потока
    if (!useInteractiveMode) {
        // Режим с файлом - однократное преобразование
        pipeline(
            source,
            transformStream,
            destination,
            (err) => {
                if (err) {
                    console.error(`❌ Ошибка при обработке: ${err.message}`);
                    process.exit(1);
                }
                if (!options.output) {
                    console.error('\n' + '─'.repeat(50));
                    console.error('✅ Преобразование завершено');
                }
                process.exit(0);
            }
        );
    } else {
        // Интерактивный режим - многократный ввод
        process.stdin.setEncoding('utf8');
        let buffer = '';

        // Обработка ввода с клавиатуры
        process.stdin.on('data', (chunk) => {
            buffer += chunk;
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
                const trimmedLine = line.trim();

                if (trimmedLine.toLowerCase() === 'exit') {
                    console.error('\n👋 Выход из программы...');
                    process.exit(0);
                }

                if (trimmedLine) {
                    const result = require('./transform').transformString(trimmedLine);
                    if (options.output) {
                        fs.appendFileSync(options.output, result + '\n');
                        console.error(`✅ Результат сохранен в файл: ${result}`);
                    } else {
                        console.log(result);
                    }
                    console.error('\n📝 Введите следующую строку (или "exit" для выхода):');
                }
            }
        });

        process.stdin.on('end', () => {
            console.error('\n👋 Программа завершена');
            process.exit(0);
        });
    }
};

// Обработка сигналов для корректного выхода
process.on('SIGINT', () => {
    console.error('\n\n👋 Программа прервана пользователем');
    process.exit(0);
});

// Запуск
main();