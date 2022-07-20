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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
    // Write your code here
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = lower.toUpperCase();
    
    let dict = {};
    for (let i = 0; i < lower.length; i++) {
        dict[lower[i]] = lower[(i + k) % lower.length];
        dict[upper[i]] = upper[(i + k) % upper.length];
    }
    
    let result = "";
    
    for (let i = 0; i < s.length; i++) {
        if (upper.includes(s[i]) || lower.includes(s[i])) {
            result = result + dict[s[i]];
        } else {
            result = result + s[i];
        }
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
