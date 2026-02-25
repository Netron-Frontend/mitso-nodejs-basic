import fs from 'fs'
import * as path from "node:path";

const parseArgs = () => {

    const data = fs.readFileSync('env'), 'utf8');

    console.log(`--propName` data)
};

parseArgs();