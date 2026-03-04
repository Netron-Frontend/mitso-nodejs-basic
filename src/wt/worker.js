const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (n) => {
    try {
        const result = nthFibonacci(n);
        process.send({ status: 'resolved', data: result });
    } catch (error) {
        process.send({ status: 'error', data: null });
    }
};

process.on('message', (n) => {
    sendResult(n);
});