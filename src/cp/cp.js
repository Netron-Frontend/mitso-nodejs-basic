import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Путь к файлу script.js
    const scriptPath = path.join(__dirname, 'files', 'script.js');

    // Создаем дочерний процесс
    const childProcess = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    // Перенаправляем stdin основного процесса в stdin дочернего
    process.stdin.pipe(childProcess.stdin);

    // Перенаправляем stdout дочернего процесса в stdout основного
    childProcess.stdout.pipe(process.stdout);

    // Перенаправляем stderr дочернего процесса в stderr основного
    childProcess.stderr.pipe(process.stderr);

    // Обработка завершения дочернего процесса
    childProcess.on('exit', (code) => {
        console.log(`Дочерний процесс завершился с кодом ${code}`);
        process.exit();
    });

    // Обработка ошибок
    childProcess.on('error', (err) => {
        console.error('Ошибка дочернего процесса:', err);
    });
};

// Для тестирования с аргументами
await spawnChildProcess(['arg1', 'arg2', 'arg3']);