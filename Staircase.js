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
 * Complete the 'staircase' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function staircase(n) {
    // Write your code here
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    let s = "";
    for (let i = 0; i < n; i++) {
        s = s + " ";
    }
    
    for (let i = 0; i < n; i++) {
        s = s.slice(1, s.length);
        s = s + "#";
        ws.write(s + "\n");
    }
    ws.end();
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    staircase(n);
 
}
