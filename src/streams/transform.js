import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const str = chunk.toString();
            const reversed = str.split('').reverse().join('');
            callback(null, reversed);
        }
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    console.log('Введите текст для переворота:');
};

await transform();