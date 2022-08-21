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
 * Complete the 'componentsInGraph' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY gb as parameter.
 */

function componentsInGraph(n, gb) {
    n = 2 * n + 1;
    let root = new Array(n).fill(0).map((i, index) => index);
    let size = new Array(n).fill(1);
    let getRoot = function (node) {
        while (node != root[node]) {
            node = root[node];
        }
        return node;
    }
    for (let d = 0; d < gb.length; d++) {
        let x = gb[d][0] - 1;
        let y = gb[d][1] - 1;
        //console.log("x: " + x + " y:" + y);
        let rx = getRoot(x);
        let ry = getRoot(y);
        if (rx != ry) {
            if (rx > ry) {
                root[rx] = ry;
                size[ry] = size[rx] + size[ry];
            } else {
                root[ry] = rx;
                size[rx] = size[rx] + size[ry];
            }
        }
    }
    //console.log(root);
    //console.log(size);
    
    let min = 99999999;
    let max = 0;
    for (let i = 0; i < n; i++) {
        let r = getRoot(i);
        if (size[r] != 1) {
            min = Math.min(min, size[r]);
            max = Math.max(max, size[r]);
        }
        //console.log("i: " + i + " size: " + size[r]);
    }
    
    return ("" + min + " " + max);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let gb = Array(n);

    for (let i = 0; i < n; i++) {
        gb[i] = readLine().replace(/\s+$/g, '').split(' ').map(gbTemp => parseInt(gbTemp, 10));
    }

    const result = componentsInGraph(n, gb);

    ws.write(result);

    ws.end();
}
