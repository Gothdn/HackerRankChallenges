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
 * Complete the 'similarPair' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. 2D_INTEGER_ARRAY edges
 */

function similarPair(n, k, edges) {
    // Write your code here
    let c = [];
    for (let i = 0; i <= n; i++) {
        c[i] = [];
    }
    edges.forEach(e => {
        c[e[0]].push(e[1]); 
    });
    let bit = new Array(n + 1).fill(0);
    
    let update = function(x, value) {
        for (;x <= n; x += x & -x) {
           bit[x] += value; 
        }
    }
    
    let query = function(x) {
        let s = 0;
        for (; x > 0; x -= x & -x) {
            s += bit[x];
        }
        return s;
    }
    
    let root = edges[0][0];
    let sum = 0;
    let stack = [{x: root, v: 1}];
    while (stack.length > 0) {
        let cur = stack.pop();
        let x = cur.x, v = cur.v;
        if (v == 1) {
            sum += query(Math.min(x + k, n)) - query(Math.max(x - k - 1, 0));
            stack.push({x: x, v: -1});
            c[x].forEach(y => {
                stack.push({x: y, v: 1});
            })
        }
        update(x, v);
    }
    
    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    let edges = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const result = similarPair(n, k, edges);

    ws.write(result + '\n');

    ws.end();
}
