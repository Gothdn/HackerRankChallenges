'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the solve function below.
 */
function solve(t) {
    let n = t.length;
    let f = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (t[i] > i) {
            f[i + 1] += 1;
            f[n - (t[i] - i) + 1] -= 1;
        } else {
            f[0] += 1;
            f[i - t[i] + 1] -= 1;
            f[i + 1] += 1;
            f[n] -= 1;
        }
    }
    
    let c = 0, max = 0, index = 0;
    
    for (let i = 0; i < n; i++) {
        c += f[i];
        if (c > max) {
            max = c;
            index = i + 1;
        }
    }
    return index;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const tCount = parseInt(readLine(), 10);

    const t = readLine().split(' ').map(tTemp => parseInt(tTemp, 10));

    let id = solve(t);

    ws.write(id + "\n");

    ws.end();
}
