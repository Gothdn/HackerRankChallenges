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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid, n, m) {
    // Write your code here
    let okay = function (x, y) {
        if (x < 0 || y < 0 || x >= n || y >= m) {
            return false;
        }
        if (grid[x][y] == 'B') {
            return false;
        }
        return true;
    }
    let d = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];
    let canExpanse = function (x, y, size) {
        for (let i = 0; i < d.length; i++) {
            if (!okay(x + d[i].x * size, y + d[i].y * size)) {
                return false;
            }
        }
        return true;
    }
    
    //  Find the biggest cross at each point
    let cross = [];
    for (let i = 0; i < n; i++) {
        cross[i] = new Array(m).fill(0);
    }
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            if (grid[x][y] =='G') {
                let size = 1;
                while (canExpanse(x, y, size)) {
                    size++;
                }
                cross[x][y] = size;
            }
        }
    }
    console.log(cross);
    
    //  Function to check if 2 crosses at (x1, y1, s1) and (x2, y2, s2) cross
    //  make sure s1 < s2
    let crossCross = function(x1, y1, s1, x2, y2, s2) {
        if (s1 > s2) {
            return crossCross(x2, y2, s2, x1, y1, s1);
        }
        if (x1 == x2) {
            return (Math.abs(y2 - y1) < s1 + s2 - 1);
        } else if (y1 == y2) {
            return (Math.abs(x2 - x1) < s1 + s2 - 1);
        } else {
            let cross = false;
            if (Math.abs(x2 - x1) < s2) {
                cross = cross || (Math.abs(y2 - y1) < s1);
            }
            if (Math.abs(y2 - y1) < s2) {
                cross = cross || (Math.abs(x2 - x1) < s1);
            }
            return cross;
        }
    }
    //console.log(crossCross(2, 4, 2, 2, 3, 1));
    
    //  Loop
    let max = 0;
    for (let x1 = 0; x1 < n; x1++) {
        for (let y1 = 0; y1 < m; y1++) {
            for (let s1 = 1; s1 <= cross[x1][y1]; s1++) {
                for (let x2 = 0; x2 < n; x2++) {
                    for (let y2 = 0; y2 < m; y2++) {
                        if ((x1 != x2) || (y1 != y2)) {
                            for (let s2 = 1; s2 <= cross[x2][y2]; s2++) {
                                if (!crossCross(x1, y1, s1, x2, y2, s2)) {
                                    if ((s1 * 4 - 3) * (s2 * 4 - 3) > max) {
                                        max = (s1 * 4 - 3) * (s2 * 4 - 3);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }  
    }
    return(max);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid, n, m);

    ws.write(result + '\n');

    ws.end();
}
