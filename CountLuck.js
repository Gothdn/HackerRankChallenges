'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let dir = [
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1}];

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
 * Complete the 'countLuck' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY matrix
 *  2. INTEGER k
 */

function countLuck(matrix, k) {
    var beginX, beginY, endX, endY;
    var board = [];
    board[0] = [];
    board[matrix.length + 1] = [];
    for (let i = 0; i < matrix.length; i++) {
        board[i + 1] = [];
        board[i + 1][0] = -1;
        board[i + 1][matrix[i].length + 1] = -1;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 'M') {
                beginX = i + 1;
                beginY = j + 1;
                board[i + 1][j + 1] = 2;
            } else if (matrix[i][j] == '*') {
                endX = i + 1;
                endY = j + 1;
                board[i + 1][j + 1] = 3;
            } else if (matrix[i][j] == 'X') {
                board[i + 1][j + 1] = -1;
            } else if (matrix[i][j] == '.') {
                board[i + 1][j + 1] = 0;
            }
        }
    }   
    for (let j = 0; j < matrix[0].length; j++) {
        board[0][j] = -1;
        board[matrix.length + 1][j] = -1;
    }
    
    //console.log(board);
    var q = [];
    var index = 0;
    var found = false;
    q.push({i: 0, x: beginX, y: beginY, d: 0, t: 0});

    while (index < q.length && !found) {
        let cur = q[index];
        let c = 0;
        for (let i = 0; i < dir.length; i++) {
            let newX = cur.x + dir[i].x;
            let newY = cur.y + dir[i].y;
            if (board[newX][newY] == 0 || board[newX][newY] == 2 || board[newX][newY] == 3 || board[newX][newY] == 4) {
                c++;
            }
        }
        if (c <= 1) {
            c = 0
        } else if (c <= 2 && index != 0) {
            c = 0;
        } else {
            c = 1;
        }
        
        for (let i = 0; i < dir.length; i++) {
            let newX = cur.x + dir[i].x;
            let newY = cur.y + dir[i].y;
            if (board[newX][newY] == 0) {
                board[newX][newY] = 4;
                q.push({i: q.length, x: newX, y: newY, d: q[index].d + c, t: index});
            } else if (board[newX][newY] == 3) {
                q.push({i: q.length, x: newX, y: newY, d: q[index].d + c, t: index});
                found = true;
            }
        }
        index++;
    }
    
    //console.log(board);
    console.log(q);
        
    if (q[q.length - 1].d == k) {
        return("Impressed");
    } else {
        return("Oops!");
    }

    //console.log(q);
    //console.log(d);
    //console.log(trace);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let matrix = [];

        for (let i = 0; i < n; i++) {
            const matrixItem = readLine();
            matrix.push(matrixItem);
        }

        const k = parseInt(readLine().trim(), 10);

        const result = countLuck(matrix, k);

        ws.write(result + '\n');
    }

    ws.end();
}
