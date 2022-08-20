'use strict';

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
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

function noPrefix(words) {
    let trie  = [{}];
    let endOfWord = [false];
    let n = 1;
    let isGood = true;

    let addWord = function(word) {
        let node = 0;
        for (let i = 0; i < word.length; i++) {
            if (endOfWord[node]) {
                isGood = false;
            }
            let c = word[i];
            if (trie[node][c]) {
                if (i == word.length - 1) {
                    isGood = false;
                }
                node = trie[node][c];
            } else {
                trie.push({});
                endOfWord.push(false);
                trie[node][c] = n;
                node = n;
                n++;
            }
        }
        endOfWord[node] = true;
    }
    
    for (let i = 0; i < words.length; i++) {
        addWord(words[i]);
        //console.log(words[i]);
        //console.log(trie);
        //console.log(endOfWord);
        if (!isGood) {
            return("BAD SET\n" + words[i]);
        }
    }
    
    return("GOOD SET");
}

function main() {
    const fs = require('fs');
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine().trim(), 10);

    let words = [];

    for (let i = 0; i < n; i++) {
        const wordsItem = readLine();
        words.push(wordsItem);
    }

    ws.write(noPrefix(words));
    ws.end();
}
