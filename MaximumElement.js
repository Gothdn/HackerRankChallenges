'use strict';

const fs = require('fs');
const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

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
 * Complete the 'getMax' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY operations as parameter.
 */

function getMax(ops) {
    // Write your code here
    let s = [];
    let max = -1;
    for (let i = 0; i < ops.length; i++) {
        if (ops[i][0] == "1") {
            let val = parseInt(ops[i].split(" ")[1]);
            if (val > max) {
                max = val;
            }
            s.push(max);
        } else if (ops[i][0] == "2") {
            s.pop();
            if (s.length > 0) {
                max = s[s.length - 1];
            } else {
                max = -1;
            }
        } else if (ops[i][0] == "3") {
            ws.write("" + s[s.length - 1] + "\n");
        }
    }
}

function main() {
    

    const n = parseInt(readLine().trim(), 10);

    let ops = [];

    for (let i = 0; i < n; i++) {
        const opsItem = readLine();
        ops.push(opsItem);
    }

    const res = getMax(ops);

    ws.end();
}
