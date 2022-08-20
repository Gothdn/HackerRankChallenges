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
 * Complete the 'contacts' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY queries as parameter.
 */

function contacts(queries) {
    let result = "";
    let trie  = [{}];
    let count = [0];
    let n = 1;
    
    let addWord = function(word) {
        let node = 0;
        for (let i = 0; i < word.length; i++) {
            let c = word[i];
            if (trie[node][word[i]]) {
                node = trie[node][c];
                count[node]++;
            } else {
                trie.push({});
                count.push(1);
                trie[node][c] = n;
                node = n;
                n++;
            }
        }
    }
    
    let countWord = function(word) {
        let node = 0;
        for (let i = 0; i < word.length; i++) {
            let c = word[i];
            if (trie[node][word[i]]) {
                node = trie[node][c];
            } else {
                return 0;
            }
        }
        return count[node];
    }
    
    for (let q = 0; q < queries.length; q++) {
        if (queries[q][0][0] == 'a') {
            addWord(queries[q][1]);
        } else {
            result = result + countWord(queries[q][1]) + "\n";
        }
    }
    //console.log(trie);
    //console.log(count);
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const queriesRows = parseInt(readLine().trim(), 10);

    let queries = Array(queriesRows);

    for (let i = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const result = contacts(queries);

    ws.write(result);

    ws.end();
}
