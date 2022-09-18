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
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
    // Write your code here
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = [];
    }
    let res = "";
    let lastAns = 0;
    for (let q = 0; q < queries.length; q++) {
        let x = queries[q][1];
        let y = queries[q][2];
        let idx = (x ^ lastAns) % n;
        //console.log(arr);
        //console.log("type: " + queries[q][0] + " x: " + x + " y: " + y + " idx: " + idx);
        if (queries[q][0] == 1) {
            arr[idx].push(y);
        } else if (queries[q][0] == 2) {
            lastAns = arr[idx][y % arr[idx].length];
            res = res + lastAns + "\n";
        }
    }
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = dynamicArray(n, queries);

    ws.write(result);

    ws.end();
}
