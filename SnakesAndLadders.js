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
 * Complete the 'quickestWayUp' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY ladders
 *  2. 2D_INTEGER_ARRAY snakes
 */

function quickestWayUp(ladders, snakes) {
    let f = Array.from({length: 101}, (v, i) => -1);
    let n = Array.from({length: 101}, (v, i) => i);
    
    ladders.forEach(function(ladder) {
        n[ladder[0]] = ladder[1];
    });
    
    snakes.forEach(function(snake) {
        n[snake[0]] = snake[1];
    });
    
    f[1] = 0;
    let q = [1];
    while (q.length > 0) {
        let cur = q.shift();
        for (let i = 1; i < 7; i++) {
            if (f[cur + i] == -1) {
                f[cur + i] = f[cur] + 1;
                //if (f[n[cur + i]] > f[cur] + 1) {
                    f[n[cur + i]] = f[cur] + 1;
                //}
                q.push(n[cur + i]);
            }
        }
    }
    console.log(f);
    return f[100];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let ladders = Array(n);

        for (let i = 0; i < n; i++) {
            ladders[i] = readLine().replace(/\s+$/g, '').split(' ').map(laddersTemp => parseInt(laddersTemp, 10));
        }

        const m = parseInt(readLine().trim(), 10);

        let snakes = Array(m);

        for (let i = 0; i < m; i++) {
            snakes[i] = readLine().replace(/\s+$/g, '').split(' ').map(snakesTemp => parseInt(snakesTemp, 10));
        }

        const result = quickestWayUp(ladders, snakes);

        ws.write(result + '\n');
    }

    ws.end();
}
