var readline = require('readline'),
    menu;
const ejs = require('edit-json-file')
var clc = require('cli-color');
const wait = require('util').promisify(setTimeout);
var orange = clc.xterm(214);
const fs = require('fs');
const segments = [
    clc.blue('█'),
    clc.yellowBright('█'),
    clc.redBright('█'),
    clc.magentaBright('█'),
]
var randomsegment = segments[Math.floor(Math.random() * segments.length)];
var progress = 0
var level95 = 1;
var lives = 3;
var progressArray = [];
let saveFile = ejs(`./save.json`);

//TODO: comment the code
//sike you thought
function noSave() {
    process.stdout.write('\033c');
    console.log(clc.whiteBright('Create save? (Y/N)'))
    if (menu) menu.close();
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    menu.question('> ', function (input) {
        switch (input) {
            case 'y':
                fs.writeFileSync('save.json', JSON.stringify({
                    level95: 1,
                }));
                showBoot();
                break;
            case 'n':
                showBoot();
                break;
            default:
                noSave();
        }
    });

}

function showBoot() {
    let save = require('./save.json');
    level95 = save.level95;
    process.stdout.write('\033c');
    console.log(clc.blackBright(`ZBIOS VERSION 0.0.5\nWELCOME\n\n${clc.whiteBright('1. ')}${clc.white('PROGRESSBAR 95')}\n\nTYPE EXIT TO EXIT\n`));
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
    if (level95 == 1) {
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
                progressArray.length = 0;
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
    let save = require('./save.json');
    randomsegment = segments[Math.floor(Math.random() * segments.length)];
    process.stdout.write('\033c');
    console.log(`Level ${saveFile.get("level95")}\n${lives} lives left\n${randomsegment}\n${progress}%\n${progressArray.join('')}\n\n`);
    if (menu) menu.close();
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    menu.question('c - catch, anything else - shy away, q - quit\n', async function (input) {
        switch (input) {
            case 'c':
                switch (randomsegment) {
                    case clc.blue('█'):
                        progress += 5;
                        progressArray.push(clc.blue('█'));
                        gameLoop();
                        break;
                    case clc.yellowBright('█'):
                        progress += 5;
                        progressArray.push(clc.yellowBright('█'));
                        gameLoop();
                        break;
                    case clc.redBright('█'):
                        lives -= 1;
                        if (lives > 0) {
                            gameLoop();
                        } else if (lives == 0) {
                            if (level95 == 1) {
                                lives = 3;
                                gameLoop();
                            } else {
                                level95 -= 1
                                saveFile.set('level95', level95);
                                saveFile.save();
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
                    case clc.magentaBright('█'):
                        if (progress != 0) {
                            progress -= 5;
                            progressArray.pop();
                        } else {
                            progress = 0;
                        } 
                        gameLoop();
                        break;
                }
                if (progress == 100) {
                    level95 += 1;
                    saveFile.set('level95', level95);
                    saveFile.save();
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

if (fs.existsSync('./save.json')) {
    showBoot();
} else {
    noSave();
}