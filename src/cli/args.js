const parseArgs = () => {
    const args = process.argv.slice(2);
    const options = {
        input: null,
        output: null,
        task: null
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '-i' || arg === '--input') {
            options.input = args[++i];
        } else if (arg === '-o' || arg === '--output') {
            options.output = args[++i];
        } else if (arg === '-t' || arg === '--task') {
            options.task = args[++i];
        }
    }

    return options;
};

module.exports = { parseArgs };