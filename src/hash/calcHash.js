import fs from 'fs'

    const calculateHash = async () => {

        const buffer = fs.readFileSync('./files/fileToCalculateHashFor.txt');

        const hexString = buffer.toString('hex');

        console.log(hexString);

    };

await calculateHash();