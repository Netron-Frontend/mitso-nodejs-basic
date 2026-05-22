const { Transform } = require('stream');
const { transformString } = require('./transform');

/**
 * Создает Transform стрим для построчного преобразования
 */
const createTransformStream = () => {
    return new Transform({
        encoding: 'utf8',
        transform(chunk, encoding, callback) {
            try {
                const inputString = chunk.toString();
                const lines = inputString.split(/\r?\n/);

                const transformedLines = lines.map(line => {
                    if (line.trim() === '') return line;
                    return transformString(line);
                });

                this.push(transformedLines.join('\n'));
                callback();
            } catch (err) {
                callback(err);
            }
        }
    });
};

module.exports = { createTransformStream };