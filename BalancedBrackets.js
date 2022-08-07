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
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
    s = " " + s;
    let f = [[0, 0, 0]];
    let ok = true, last, c;
    //console.log(s);
    //console.log(f[0]);
    for (let i = 1; i < s.length; i++) {
        c = s[i];
        f[i] = [];
        f[i][0] = f[i - 1][0];
        f[i][1] = f[i - 1][1];
        f[i][2] = f[i - 1][2];
        if (c == "(") {
            f[i][0] = i;
        } else if (c == "[") {
            f[i][1] = i;
        } else if (c == "{") {
            f[i][2] = i;
        } else if (c == ")") {
            last = f[i][0];
            if (last == 0) {
                ok = false;
            } else {
                if (f[i][1] > last || f[i][2] > last) {
                    ok = false;
                }
                f[i][0] = f[last - 1][0];
            }
        } else if (c == "]") {
            last = f[i][1];
            if (last == 0) {
                ok = false;
            } else {
                if (f[i][0] > last || f[i][2] > last) {
                    ok = false;
                }
                f[i][1] = f[last - 1][1];
            }
        } else if (c == "}") {
            last = f[i][2];
            if (last == 0) {
                ok = false;
            } else {
                if (f[i][0] > last || f[i][1] > last) {
                    ok = false;
                }
                f[i][2] = f[last - 1][2];
            }
        }
        //console.log(i);
        //console.log(f[i]);
    }
    let n = s.length - 1;
    if (f[n][0] != 0 || f[n][1] != 0 || f[n][2] != 0) {
        ok = false;
    }
    if (ok) {
        return "YES";
    } else {
        return "NO";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
