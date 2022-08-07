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
 * Complete the 'equalStacks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY h1
 *  2. INTEGER_ARRAY h2
 *  3. INTEGER_ARRAY h3
 */

function equalStacks(h1, h2, h3) {
    let s1 = [], s2 = [], s3 = [];
    s1[h1.length - 1] = h1[h1.length - 1];
    for (let i = h1.length - 2; i >= 0; i--) {
        s1[i] = s1[i + 1] + h1[i];
    }
    s2[h2.length - 1] = h2[h2.length - 1];
    for (let i = h2.length - 2; i >= 0; i--) {
        s2[i] = s2[i + 1] + h2[i];
    }
    s3[h3.length - 1] = h3[h3.length - 1];
    for (let i = h3.length - 2; i >= 0; i--) {
        s3[i] = s3[i + 1] + h3[i];
    }
    s1.push(0);
    s2.push(0);
    s3.push(0);
    console.log(s1);
    console.log(s2);
    console.log(s3);
    let i1 = 0, i2 = 0, i3 = 0;
    while (i1 < s1.length) {
        while (s2[i2] > s1[i1]) {
            i2++;
        }
        while (s3[i3] > s1[i1]) {
            i3++;
        }
        //console.log("i1: " + i1 + " i2: " + i2 + " i3: " + i3);
        if (s1[i1] == s2[i2] && s1[i1] == s3[i3]) {
            return(s1[i1]);
        }
        i1++;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n1 = parseInt(firstMultipleInput[0], 10);

    const n2 = parseInt(firstMultipleInput[1], 10);

    const n3 = parseInt(firstMultipleInput[2], 10);

    const h1 = readLine().replace(/\s+$/g, '').split(' ').map(h1Temp => parseInt(h1Temp, 10));

    const h2 = readLine().replace(/\s+$/g, '').split(' ').map(h2Temp => parseInt(h2Temp, 10));

    const h3 = readLine().replace(/\s+$/g, '').split(' ').map(h3Temp => parseInt(h3Temp, 10));

    const result = equalStacks(h1, h2, h3);

    ws.write(result + '\n');

    ws.end();
}
