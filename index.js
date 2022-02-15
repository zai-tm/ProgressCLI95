var readline = require('readline'),
    menu;
var clc = require('cli-color');
const wait = require('util').promisify(setTimeout);
var orange = clc.xterm(214);
const segments = [
    'blue',
    'yellow',
    'red',
    'pink'
]
var randomsegment = segments[Math.floor(Math.random() * segments.length)];
var progress = 0
var level = 1;
var lives = 3;
//TODO: comment the code
//sike you thought
function showBoot() {
    process.stdout.write('\033c');
    console.log(clc.blackBright(`ZBIOS VERSION 0.0.1\nWELCOME\n\n${clc.whiteBright('1. ')}${clc.white('PROGRESSBAR 95')}\n\nTYPE EXIT TO EXIT\n`));
    if (menu) menu.close();
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    menu.question(clc.white('CHOOSE A SYSTEM: '), function (input) {
        switch (input.toLowerCase()) {
            case '1':
                bootPb95();
                break;
            case 'exit':
                process.exit();
                break;
            default:
                showBoot();
        }
    });
}

async function bootPb95() {
    process.stdout.write('\033c');
    process.stdout.write(clc.whiteBright('STARTING PROGRESSBAR ' + orange('95')));
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
    if (level == 1) {
        console.log(clc.white('╔════════════════╗\n║   Begin Menu   ║\n║   1. New Game  ║\n║   2. Restart   ║\n║   3. Shutdown  ║\n╚════════════════╝\n'))
    } else {
        console.log(clc.white('╔════════════════╗\n║   Begin Menu   ║\n║   1. Load save ║\n║   2. Restart   ║\n║   3. Shutdown  ║\n╚════════════════╝\n'))
    }
    if (menu) menu.close();

    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    menu.question('> ', function (input) {
        switch (input) {
            case '1':
                progress = 0;
                gameLoop();
                break;
            case '2':
                showBoot();
                break;
            case '3':
                process.exit();
                break;
            default:
                pb95();
        }
    });
}

function gameLoop() {
    randomsegment = segments[Math.floor(Math.random() * segments.length)];
    process.stdout.write('\033c');
    console.log(`Level ${level}\n${lives} lives left\n${randomsegment}\n${progress}%`);
    if (menu) menu.close();
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    menu.question('c - catch, anything else - shy away, q - quit\n', async function (input) {
        switch (input) {
            case 'c':
                switch (randomsegment) {
                    case 'blue':
                        progress += 5;
                        gameLoop();
                        break;
                    case 'yellow':
                        progress += 5;
                        gameLoop();
                        break;
                    case 'red':
                        lives -= 1;
                        if (lives > 1) {
                            gameLoop();
                        } else if (lives == 1) {
                            if (level == 1) {
                                gameLoop();
                            } else {
                                level -= 1
                                lives = 3;
                                pb95();
                            }
                        } else {
                            pb95();
                        }
                        process.stdout.write('\033c');
                        console.log('Game Over!');
                        progress = 0;
                        await wait(1000);
                        break;
                    case 'pink':
                        progress -= 5;
                        gameLoop();
                        break;
                }
                if (progress == 100) {
                    level += 1;
                    process.stdout.write('\033c');
                    console.log('You Win!');
                    await wait(1000);
                    pb95();
                }
                break;
            case 'q':
                pb95();
                break;
            default:
                gameLoop();
                break;
        }
    });


}

showBoot();