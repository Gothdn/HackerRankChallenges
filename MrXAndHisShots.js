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
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY shots
 *  2. 2D_INTEGER_ARRAY players
 */

function solve(shots, players) {
    let a = [], b = [];
    shots.forEach(s => {
        a.push(s[0]);
        b.push(s[1]);
    })
    a.sort(function(a, b){return a - b});
    b.sort(function(a, b){return a - b});
    //console.log(a);
    //console.log(b);
    //console.log(players);
    
    let findSmallestBiggerThan = function (value) {
        let left = 0, right = a.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (value < a[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    let findBiggestSmallerThan = function (value) {
        let left = 0, right = b.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (value <= b[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return right;
    }
    
    let count = 0;
    let n = a.length;
    let q = [73, 120];
    players.forEach(q => {
        count = count  - findBiggestSmallerThan(q[0]) - 1 + findSmallestBiggerThan(q[1]);
    });
    
    //console.log(count);
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let shots = Array(n);

    for (let i = 0; i < n; i++) {
        shots[i] = readLine().replace(/\s+$/g, '').split(' ').map(shotsTemp => parseInt(shotsTemp, 10));
    }

    let players = Array(m);

    for (let i = 0; i < m; i++) {
        players[i] = readLine().replace(/\s+$/g, '').split(' ').map(playersTemp => parseInt(playersTemp, 10));
    }

    const result = solve(shots, players);

    ws.write(result + '\n');

    ws.end();
}
