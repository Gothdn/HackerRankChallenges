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
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY tree
 *  2. 2D_INTEGER_ARRAY queries
 */

function solve(n, tree, queries) {
    tree = tree.sort((a, b) => { return a[2] - b[2] });
    let root = new Array(n + 1).fill(0).map((i, index) => index);
    let size = new Array(n + 1).fill(1);
    let path = new Array(n - 1).fill(0);
    let getRoot = function (node) {
        while (node != root[node]) {
            node = root[node];
        }
        return node;
    }

    for (let itr = 0; itr < tree.length; itr++) {
        let x = parseInt(tree[itr][0]);
        let y = parseInt(tree[itr][1]);
        let rx = getRoot(x);
        let ry = getRoot(y);
        if (rx != ry) {
            //console.log("rx: " + size[rx] + " ry: " + ry)
            if (itr > 0) {
                path[itr] = path[itr - 1] + size[rx] * size[ry];
            } else {
                path[itr] = size[rx] * size[ry];
            }
            
            if (size[rx] < size[ry]) {
                root[rx] = ry;
                size[ry] = size[rx] + size[ry];
            } else {
                root[ry] = rx;
                size[rx] = size[rx] + size[ry];
            }
        } else {
            if (itr > 0) {
                path[itr] = path[itr - 1];
            }
        }
    }
    path.unshift(0);
    tree.unshift([0,0,0]);
    
    let qSearch = function (value) {
        let left = 0, right = path.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (value < tree[mid][2]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return right;
    }
    
    let res = "";
    for (let itr = 0; itr < queries.length; itr++) {
        let l = qSearch(queries[itr][0] - 1);
        let r = qSearch(queries[itr][1]);
        res = res + (path[r] - path[l]) + "\n";
    }
    
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    let tree = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        tree[i] = readLine().replace(/\s+$/g, '').split(' ').map(treeTemp => parseInt(treeTemp, 10));
    }

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = solve(n, tree, queries);

    ws.write(result);

    ws.end();
}
