const clc = require("cli-color");
const wait = require('util').promisify(setTimeout);
const readline = require('readline');
const cmd = readline.createInterface({input: process.stdin, output: process.stdout, prompt: '> '});

var orange = clc.xterm(214);
process.stdout.write(clc.reset);
console.log(clc.blackBright(`ZBIOS VERSION 0.0.1\nWELCOME\n\nCHOOSE A SYSTEM:\n\n${clc.whiteBright('1. ')}${clc.white('PROGRESSBAR 95')}\n\n`));
cmd.prompt()
cmd.on('line', async (line) => {
    process.stdout.write(clc.reset);
    await wait(1000)
        switch (line.trim()) {
            case '1':
                process.stdout.write(clc.whiteBright('STARTING PROGRESSBAR '+orange('95')));
                for (let i = 0; i < 4; i++) {
                    await wait(250)
                    process.stdout.write('.')
                }
                await wait(1000)
                process.stdout.write(clc.reset);
                console.log('BEGIN')
        }
});