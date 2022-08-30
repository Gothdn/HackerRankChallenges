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
 * Complete the 'printShortestPath' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER i_start
 *  3. INTEGER j_start
 *  4. INTEGER i_end
 *  5. INTEGER j_end
 */

function printShortestPath(n, i_start, j_start, i_end, j_end) {
    // Print the distance along with the sequence of moves.
    let moves = [
        {x: -2, y: -1, name: "UL"},
        {x: -2, y: 1, name: "UR"},
        {x: 0, y: 2, name: "R"},
        {x: 2, y: 1, name: "LR"},
        {x: 2, y: -1, name: "LL"},
        {x: 0, y: -2, name: "L"}];
        
    let inBoard = function (x, y) {
        return (0 <= x && x < n && 0 <= y && y < n);
    }
    
    let steps = [];
    let trace = [];
    for (let i = 0; i < n; i++) {
        steps[i] = [];
        trace[i] = [];
        for (let j = 0; j < n;  j++) {
            steps[i][j] = -1;
            trace[i][j] = -1;
        }
    }
    
    let q = [{x: i_start, y: j_start}];
    steps[i_start][j_start] = 0;
    trace[i_start][j_start] = -2;
    console.log(steps);
    let bot = 0, top = 1;
    while (bot < top) {
        //console.log(q);
        let x = q[bot].x;
        let y = q[bot].y;
        //console.log("x: " + x + " y: " + y);
        for (let i = 0; i < moves.length; i++) {
            let u = x + moves[i].x;
            let v = y + moves[i].y;
            if (inBoard(u, v) && trace[u][v] == -1) {
                //console.log("u: " + u + " v: " + v);
                trace[u][v] = i;
                steps[u][v] = steps[x][y] + 1;
                if (u == i_end && v == j_end) {
                    bot = top;
                    break;
                }
                q.push({x: u, y: v});
                top++;
            }
        }
        bot++;
    }
    //console.log(steps);
    //console.log(trace);
    if (trace[i_end][j_end] == -1) {
        return "Impossible";
    }
    let x = i_end, y = j_end;
    let result = "";
    while (trace[x][y] != -2) {
        //console.log("x: " + x + " y: " + y);
        let t = trace[x][y];
        result = moves[t].name + " " + result;
        x -= moves[t].x;
        y -= moves[t].y;
    }
    result = "" + steps[i_end][j_end] + "\n" + result.trim();
    return(result);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const i_start = parseInt(firstMultipleInput[0], 10);

    const j_start = parseInt(firstMultipleInput[1], 10);

    const i_end = parseInt(firstMultipleInput[2], 10);

    const j_end = parseInt(firstMultipleInput[3], 10);

    let result = printShortestPath(n, i_start, j_start, i_end, j_end);
    
    ws.write(result);

    ws.end();
}
