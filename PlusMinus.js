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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    let nN = 0, nP = 0, nZ = 0;
    arr.forEach(function(num) {
       if (num > 0) {
           nP++;
       } else if (num < 0) {
           nN++;
       } else if (num == 0) {
           nZ++;
       }
    });
    let n = nN + nP + nZ;
    return "" + (nP / n).toFixed(6) + "\n" + (nN / n).toFixed(6) + "\n" + (nZ / n).toFixed(6);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = plusMinus(arr);
    ws.write(result);
    ws.end();
}
