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
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function solve(arr) {
    let res = 0;
    let s = [];
    s.push({h: arr[0], c: 1});
    for (let i = 1; i < arr.length; i++) {
        while (s.length > 0 && s[s.length - 1].h < arr[i]) {
            s.pop();
        }
        if (s.length > 0 && arr[i] == s[s.length - 1].h) {
            res += s[s.length - 1].c;
            s[s.length - 1].c++;
        } else {
            s.push({h: arr[i], c:1});
        }
        //console.log(s);
        //console.log(res);
    }
    return res * 2;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = solve(arr);

    ws.write(result + '\n');

    ws.end();
}
