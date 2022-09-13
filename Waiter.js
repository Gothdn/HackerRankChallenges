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
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */

function waiter(number, q) {
    // Write your code here
    //  Generate prime numbers
    let primes = [2, 3, 5, 7];
    let isPrime = function (num) {
        for (let i = 0; i < primes.length; i++) {
            if (num % primes[i] == 0) {
                return false;
            }
        }
        return true;
    }
    let num = 8;
    while (primes.length < q + 10) {
        num++;
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    let ans = "";
    let cur = 0;
    let a = [], b;
    a[0] = number;
    a[1] = [];
    for (let itr = 0; itr < q; itr++) {
        //console.log(primes[itr]);
        let nxt = 1 - cur;
        a[nxt] = [];
        b = [];
        for (let i = a[cur].length - 1; i >= 0; i--) {
            if (a[cur][i] % primes[itr] == 0) {
                b.push(a[cur][i]);
            } else {
                a[nxt].push(a[cur][i]);
            }
        }
        for (let i = b.length - 1; i >= 0; i--) {
            ans = ans + b[i] + "\n";
        }
        //console.log(a[cur]);
        //console.log(a[nxt]);
        //console.log(b);
        //console.log(ans);
        cur = 1 - cur;
    }
    if (a[cur].length > 0) {
        for (let i = a[cur].length - 1; i >= 0; i--) {
            ans = ans + a[cur][i] + "\n";
        }
    }
    return "" + ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const number = readLine().replace(/\s+$/g, '').split(' ').map(numberTemp => parseInt(numberTemp, 10));

    const result = waiter(number, q);

    ws.write(result);

    ws.end();
}
