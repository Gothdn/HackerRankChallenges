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
 * Complete the 'twoStacks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER maxSum
 *  2. INTEGER_ARRAY a
 *  3. INTEGER_ARRAY b
 */

function twoStacks(maxSum, a, b) {
    let sa = [0], sb = [0];
    for (let i = 0; i < a.length; i++) {
        sa.push(sa[sa.length - 1] + a[i]);
    }
    for (let i = 0; i < b.length; i++) {
        sb.push(sb[sb.length - 1] + b[i]);
    }
    sa.push(maxSum + 1);
    sb.push(maxSum + 1);
    //console.log(sa);
    //console.log(sb);
    let x = 0;
    while (sa[x + 1] <= maxSum) {
        x++;
    }
    let y = 0;
    let max = -1;
    for (;x >= 0; x--) {
        while (sb[y + 1] + sa[x] <= maxSum) {
            y++;
        }
        //console.log("x: " + x + " y: " + y);
        if (max < x + y) {
            max = x + y;
        }
    }
    
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine().trim(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const maxSum = parseInt(firstMultipleInput[2], 10);

        const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

        const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));

        const result = twoStacks(maxSum, a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
