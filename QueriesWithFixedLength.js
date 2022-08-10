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
 * Complete the 'solve' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER_ARRAY queries
 */

function solve(arr, queries) {
    let res = "";
    let n = arr.length;
    for (let qi = 0; qi < queries.length; qi++) {
        let q = [];
        let max = 0;
        let d = queries[qi];
        for (let i = 0; i < d; i++) {          
            q.push(arr[i]);
            max = Math.max(max, arr[i]);
        }
        let first = 0, last = q.length;
        while (q[first] < max) {
            first++;
        }
        let min = max;
        for (let i = d; i < n; i++) {
            if (last - first == d) {
                first++;
                if (last - first > 0) {
                    max = 0;
                    for (let j = first; j < last; j++) {
                        if (q[j] > max) {
                            max = q[j];
                            first = j;
                        }
                    }
                }
            }
            q.push(arr[i]);
            last++;
            while (q[first] < arr[i]) {
                first++;
            }
            min = Math.min(min, q[first]);
            //console.log(q);
        }
        res = res + min + "\n";
    }
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let queries = [];

    for (let i = 0; i < q; i++) {
        const queriesItem = parseInt(readLine().trim(), 10);
        queries.push(queriesItem);
    }

    const result = solve(arr, queries);

    ws.write(result);

    ws.end();
}
