#!/usr/bin/env node
import exosScripts from './exos-scripts';

const scriptToExecute = process.argv[2];
const otherArgs = process.argv.slice(3);

exosScripts(scriptToExecute, otherArgs);
