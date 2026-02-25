import fs from 'fs'

const list = async () => {

    fs.readdir(`./files`, (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err);
            return;
        }
        console.log( files);
    });

};

await list();