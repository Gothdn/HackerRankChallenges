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
 * Complete the 'largestRectangle' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY h as parameter.
 */

function largestRectangle(h) {
    h.unshift(0);
    h.push(0);
    //console.log(h);
    let l = [], r = [], x;
    l[0] = -1;
    r[h.length - 1] = -1;
    for (let i = 1; i < h.length; i++) {
        x = i - 1;
        while (h[x] >= h[i]) {
            x = l[x];
        }
        l[i] = x;
    }
    for (let i = h.length - 2; i >= 0; i--) {
        x = i + 1;
        while (h[x] >= h[i]) {
            x = r[x];
        }
        r[i] = x;
    }
    
    let max = 0;
    for (let i = 1; i < h.length - 1; i++) {
        let val = (r[i] - l[i] - 1) * h[i];
        if (max < val) {
            max = val;
        }
    }
    //console.log(l);
    //console.log(r);
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const h = readLine().replace(/\s+$/g, '').split(' ').map(hTemp => parseInt(hTemp, 10));

    const result = largestRectangle(h);

    ws.write(result + '\n');

    ws.end();
}
