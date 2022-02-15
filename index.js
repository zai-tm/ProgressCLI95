var readline = require('readline'), menu;
var clc = require('cli-color');
const wait = require('util').promisify(setTimeout);
var orange = clc.xterm(214);
//TODO: comment the code
//sike you thought
function showBoot() {
    process.stdout.write('\033c');
    console.log(clc.blackBright(`ZBIOS VERSION 0.0.1\nWELCOME\n\n${clc.whiteBright('1. ')}${clc.white('PROGRESSBAR 95')}\n\nTYPE EXIT TO EXIT\n`));
    if(menu) menu.close();
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    menu.question(clc.white('CHOOSE A SYSTEM: '), function(input) {
        switch(input.toLowerCase()) {
            case '1': bootPb95(); break;
            case 'exit': process.exit(); break;
            default: showBoot();
        }
    });
}

async function bootPb95() {
    process.stdout.write('\033c');
    process.stdout.write(clc.whiteBright('STARTING PROGRESSBAR '+orange('95')));
    for (let i = 0; i < 3; i++) {
        await wait(250)
        process.stdout.write('.')
    }
    process.stdout.write('\n');
    await wait(1500)
    pb95();
}

function pb95() {
    process.stdout.write('\033c');
    console.log(clc.white('╔════════════════╗\n║   Begin Menu   ║\n║   1. New Game  ║\n║   2. Restart   ║\n║   3. Shutdown  ║\n╚════════════════╝\n'))
    if(menu) menu.close();
    
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    

    menu.question('> ', function(input) {
        switch(input) {
            case '1': console.log('THERE IS NO GAME YET.');process.exit(); break;
            case '2': showBoot(); break;
            case '3': process.exit(); break;
            default: pb95() ;
        }
    });
}

showBoot();