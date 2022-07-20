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
 * Complete the 'minimumNumber' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING password
 */

function minimumNumber(n, password) {
    // Return the minimum number of characters to make the password strong
    let numbers = "0123456789";
    let lower_case = "abcdefghijklmnopqrstuvwxyz";
    let upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let special_characters = "!@#$%^&*()-+";
    
    let checkNumber = 0;
    let checkLower = 0;
    let checkUpper = 0;
    let checkSpecial = 0;
    
    for (let i = 0; i < password.length; i++) {
        if (numbers.includes(password[i])) {
            checkNumber = 1;
        } else if (lower_case.includes (password[i])) {
            checkLower = 1;
        } else if (upper_case.includes (password[i])) {
            checkUpper = 1;
        } else if (special_characters.includes (password[i])) {
            checkSpecial = 1;
        }
    }
    
    let result = 4 - (checkNumber + checkLower + checkSpecial + checkUpper);
    
    if (n + result >= 6) {
        return result;
    } else {
        return (6 - n);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const password = readLine();

    const answer = minimumNumber(n, password);

    ws.write(answer + '\n');

    ws.end();
}
