/**
 * Преобразует слово, выворачивая его "наизнанку"
 * @param {string} word - Слово для преобразования
 * @returns {string} - Преобразованное слово
 */
const insideOut = (word) => {
    const len = word.length;
    const mid = Math.floor(len / 2);

    if (len % 2 === 0) {
        // Четная длина: переворачиваем обе половины
        const firstHalf = word.slice(0, mid);
        const secondHalf = word.slice(mid);
        return firstHalf.split('').reverse().join('') +
            secondHalf.split('').reverse().join('');
    } else {
        // Нечетная длина: средняя буква остается на месте
        const firstHalf = word.slice(0, mid);
        const middleChar = word[mid];
        const secondHalf = word.slice(mid + 1);
        return firstHalf.split('').reverse().join('') +
            middleChar +
            secondHalf.split('').reverse().join('');
    }
};

/**
 * Преобразует строку, обрабатывая каждое слово
 * @param {string} str - Входная строка
 * @returns {string} - Преобразованная строка
 */
const transformString = (str) => {
    const words = str.split(/\s+/);
    const transformedWords = words.map(word => insideOut(word));
    return transformedWords.join(' ');
};

module.exports = { insideOut, transformString };