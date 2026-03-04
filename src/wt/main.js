import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const numCores = os.cpus().length;
    const workers = [];
    const results = [];

    console.log(`Количество ядер: ${numCores}`);

    for (let i = 0; i < numCores; i++) {
        const workerNumber = 10 + i; // Отправляем 10, 11, 12...

        const worker = new Worker(path.join(__dirname, 'worker.js'));

        workers.push(new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve(result);
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });

            // Отправляем число воркеру
            worker.postMessage(workerNumber);
        }));
    }

    // Ждем выполнения всех воркеров
    const workerResults = await Promise.all(workers);

    // Сортируем результаты (по номеру воркера)
    results.push(...workerResults);

    console.log('Результаты:', results);
    return results;
};

await performCalculations();