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
 * Complete the 'minimumMoves' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING_ARRAY grid
 *  2. INTEGER startX
 *  3. INTEGER startY
 *  4. INTEGER goalX
 *  5. INTEGER goalY
 */

function minimumMoves(grid, startX, startY, goalX, goalY) {
    let s = ''
    for (let i = 0; i < grid.length; i++) {
        grid[i] = 'X' + grid[i] + 'X';
    }
    for (let i = 0; i < grid[0].length; i++) {
        s += 'X';
    }
    grid.unshift(s);
    grid.push(s);
    startX++;
    startY++;
    goalX++;
    goalY++;
    
    let steps = [];
    for (let i = 0; i < grid.length; i++) {
        steps[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            steps[i][j] = -1;
        }
    }
    steps[startX][startY] = 0;
    
    let q = [{x: startX, y: startY}];
    let dir = [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}];
    let first = 0, result = -1;
    while (first < q.length) {
        console.log(q);
        let x = q[first].x;
        let y = q[first].y;
        let s = steps[x][y];
        for (let i = 0; i < dir.length; i++) {
            let u = x + dir[i].x;
            let v = y + dir[i].y;
            while (grid[u][v] == '.') {
                if (steps[u][v] == -1) {
                    steps[u][v] = s + 1;
                    q.push({x: u, y: v});
                }
                u = u + dir[i].x;
                v = v + dir[i].y;
            }
        }
        if (steps[goalX][goalY] != -1) {
            result = steps[goalX][goalY];
        }
        first++;
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const startX = parseInt(firstMultipleInput[0], 10);

    const startY = parseInt(firstMultipleInput[1], 10);

    const goalX = parseInt(firstMultipleInput[2], 10);

    const goalY = parseInt(firstMultipleInput[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);

    ws.write(result + '\n');

    ws.end();
}
