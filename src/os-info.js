import os from 'node:os';

export const getEOL = () => {
    console.log(`EOL: ${JSON.stringify(os.EOL)}`);
};

export const getCPUInfo = () => {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);

    cpus.forEach((cpu, index) => {
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: ${cpu.model} @ ${speedGHz} GHz`);
    });
};

export const getHomeDir = () => {
    console.log(`Home directory: ${os.homedir()}`);
};

export const getSystemUsername = () => {
    console.log(`System username: ${os.userInfo().username}`);
};

export const getArchitecture = () => {
    console.log(`CPU Architecture: ${os.arch()}`);
};