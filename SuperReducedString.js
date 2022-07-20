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
 * Complete the 'superReducedString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function superReducedString(s) {
    let found = 1;
    while (found == 1) {
        let i = 0;
        found = 0;
        while ((i < s.length - 1) & (found == 0)) {
            if (s[i] == s[i + 1]) {
                found = 1;
                s = s.slice(0, i) + s.slice(i + 2, s.length);
                i++;
            }
            i++;
        }
    }
    
    if (s.length > 0) {
        return s;
    } else {
        return "Empty String";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = superReducedString(s);

    ws.write(result + '\n');

    ws.end();
}
