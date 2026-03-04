const parseEnv = () => {
    process.env.MITSO_name1='value1';
    process.env.MITSO_name2='value2';

    const result = [];

    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('MITSO_')) {
            result.push(`${key}=${value}`);
        }
    }

    console.log(result.join('; '));
};

parseEnv();