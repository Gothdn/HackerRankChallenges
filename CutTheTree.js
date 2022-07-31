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
 * Complete the 'cutTheTree' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY data
 *  2. 2D_INTEGER_ARRAY edges
 */

function cutTheTree(data, edges) {
    let n = data.length;
    let index = [];
    let c = [];
    let sum = [];
    let min, total;
    total = data.reduce((s, d) => s + d, 0);
    min = total;
    for (let i = 0; i <= n; i++) {
        c[i] = [];
        index[i] = 0;
        sum[i] = -1;
    }
    edges.forEach(e => {
        c[e[0] - 1].push(e[1] - 1);
        c[e[1] - 1].push(e[0] - 1);
    });
    let q = [0];
    index[0] = 1;
    let i = 0;
    while (i < q.length) {
        let x = q[i];
        c[x].forEach(v => {
            if (index[v] == 0) {
                index[v] = index[x] + 1;
                q.push(v);
            }
        });
        i++;
    }
    console.log(q);
    
    for (let i = q.length - 1; i >= 0; i--) {
        let x = q[i];
        let s = 0;
        c[x].forEach(v => {
            if (index[v] > index[x]) {
                s += sum[v];
            }
        });
        s += data[x];
        if (min > Math.abs(total - s - s)) {
            min = Math.abs(total - s - s);
        }
        sum[x] = s;
    }
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const data = readLine().replace(/\s+$/g, '').split(' ').map(dataTemp => parseInt(dataTemp, 10));

    let edges = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const result = cutTheTree(data, edges);

    ws.write(result + '\n');

    ws.end();
}
