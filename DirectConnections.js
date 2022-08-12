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
 * Complete the 'solve' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function solve(arr, pop) {
    // Write your code here
    let cities = [];
    for (let i = 0; i < arr.length; i++) {
        cities.push({x: arr[i], pop: pop[i]});
    }
    cities.sort(function (a, b) {
        return a.x - b.x;
    });
    
    let max = 10010;
    let sumDistant = new Array(max + 1).fill(0);
    let countCities = new Array(max + 1).fill(0);
    
    let update = function(x, dist) {
        for (;x <= max; x += x & -x) {
            sumDistant[x] += dist;
            countCities[x] += 1;
        }
    }

    let query = function(x) {
        let dist = 0;
        let count = 0;
        for (; x > 0; x -= x & -x) {
            dist += sumDistant[x];
            count += countCities[x];
        }
        return {dist: dist, count: count};
    }
    
    //console.log(cities);
    let sum = 0;
    let MODULO = 1000000007;
    for (let i = 0; i < cities.length; i++) {
        let res = query(cities[i].pop);
        sum = (sum + (cities[i].x * res.count - res.dist) * cities[i].pop) % MODULO;
        update(cities[i].pop, cities[i].x);
    }
    
    sumDistant = new Array(max + 1).fill(0);
    countCities = new Array(max + 1).fill(0);
    let maxDist = cities[cities.length - 1].x;
    cities.forEach(c => { c.x = maxDist - c.x + 1; });
    for (let i = cities.length - 1; i >= 0; i--) {
        let res = query(cities[i].pop - 1);
        sum = (sum + ((cities[i].x * res.count - res.dist) % MODULO) * cities[i].pop) % MODULO;
        update(cities[i].pop, cities[i].x);
    }
    console.log(sum);
    return sum;
    //console.log(sumDistant);
    //console.log(countCities);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const pop = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = solve(arr, pop);

        ws.write(result + '\n');
    }

    ws.end();
}
