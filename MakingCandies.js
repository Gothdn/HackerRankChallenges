'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumPasses' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER m
 *  2. LONG_INTEGER w
 *  3. LONG_INTEGER p
 *  4. LONG_INTEGER n
 */

function passToWin(money, produce, target) {
    return Math.ceil((target - money) / produce);
}

function minimumPasses(m, w, p, n) {
    // Write your code here
    let result = passToWin(0, m*w, n);
    let money = m * w;
    let pass = 0;
    let mw = 0;
    let total, wait;
    while (money < n) {
        pass++;
        if (money < p) {
            wait = Math.ceil((p - money) / (m * w));
            pass += wait;
            money += wait * m * w;
        }
        //console.log("pass: " + pass + " m: " + m + " w: " + w + " money: " + money + " result: " + result);
        mw = Math.floor(money / p);
        total = m + w + mw;
        if (m > w) {
            w = Math.min(w + mw, Math.floor(total / 2));
            m = total - w;
        } else {
            m = Math.min(m + mw, Math.floor(total / 2));
            w = total - m;
        }
        money = money % p;
        result = Math.min(result, pass + passToWin(money, m*w, n));
        money += m * w;
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const w = parseInt(firstMultipleInput[1], 10);

    const p = parseInt(firstMultipleInput[2], 10);

    const n = parseInt(firstMultipleInput[3], 10);

    const result = minimumPasses(m, w, p, n);

    ws.write(result + '\n');

    ws.end();
}
