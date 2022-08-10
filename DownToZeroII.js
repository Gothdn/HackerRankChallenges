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
 * Complete the 'downToZero' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

let f = [];

function calculateF() {
    let max = 1000001;
    for (let i = 0; i < max; i++) {
        f[i] = max;
    }
    f[0] = 0;
    f[1] = 1;
    for (let i = 1; i < max; i++) {
        f[i + 1] = Math.min(f[i + 1], f[i] + 1);
        let j = 2;
        while (i * j < max && j <= i) {
            f[i * j] = Math.min(f[i * j], f[i] + 1);
            j++;
        }
    }
}

function downToZero(n) {
    // Write your code here
    return(f[n]);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);
    
    calculateF();
    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = downToZero(n);

        ws.write(result + '\n');
    }

    ws.end();
}
