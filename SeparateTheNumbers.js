'use strict';
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

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
 * Complete the 'separateNumbers' function below.
 *
 * The function accepts STRING s as parameter.
 */

function plusOne(s) {
    let d = 1;
    let r = "";
    let c = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        c = parseInt(s[i]) + d;
        if (c == 10) {
            r = "0" + r;
            d = 1;
        } else {
            r = c + r;
            d = 0;
        }
    }
    if (d == 1) {
        r = "1" + r;
    }
    
    return r;
}

function separateNumbers(s) {
    // Write your code here
    let found = 0;
    for (let l = 1; l <= s.length / 2; l++) {
        if (l > 1 & s[0] == '0') {
            return "NO"
        }
        let first = s.slice(0, l);
        let current = first;
        let i = l;
        let ok = 1;
        let next = plusOne(current);
        while (s.length - i >= next.length & ok == 1) {
            console.log("current = " + current + "    next = " + next);
            let j = 0;
            while (next[j] == s[i] && j < next.length) {
                j++;
                i++;
            }
            if (j < next.length) {
                ok = 0;
            }
            current = next;
            next = plusOne(current);
        }
        console.log(i + " ok: " + ok);
        if (i < s.length) {
            ok = 0;
        }
        console.log(i + " ok: " + ok);
        if (ok == 1) {
            return("YES " + first);
        }
    }
    
    return("NO");
}

function main() {
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        ws.write(separateNumbers(s) + '\n');
    }
}
