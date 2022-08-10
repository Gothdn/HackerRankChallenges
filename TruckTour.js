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
 * Complete the 'truckTour' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY petrolpumps as parameter.
 */

function truckTour(petrolpumps) {
    let n = petrolpumps.length;
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        let j;
        for (j = 0; j < n; j++) {
            sum += petrolpumps[(i + j) % n];
            if (sum < 0) {
                break;
            }
        }
        if (j == n) {
            return i;
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let petrolpumps = Array(n);

    for (let i = 0; i < n; i++) {
        let data = readLine().replace(/\s+$/g, '').split(' ').map(petrolpumpsTemp => parseInt(petrolpumpsTemp, 10));
        petrolpumps[i] = data[0] - data[1];
    }

    const result = truckTour(petrolpumps);

    ws.write(result + '\n');

    ws.end();
}
