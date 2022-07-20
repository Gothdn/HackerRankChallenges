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
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s) {
    // Write your code here
    s = s.toLowerCase();
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let res = "";
    for (let i = 0; i < s.length; i++) {
        if (lower.includes(s[i]) && !res.includes(s[i])) {
            res = res + s[i];
        }
    }
    if (res.length == lower.length) {
        return "pangram";
    } else {
        return "not pangram";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = pangrams(s);

    ws.write(result + '\n');

    ws.end();
}
