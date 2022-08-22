const fs = require('fs');
const MAGIC = 1000000007;

function processData(input) {
    let data = input.split('\n');
    let n = parseInt(data[0]);
    
    let root = new Array(n).fill(0).map((i, index) => index);
    let size = new Array(n).fill(1);
    let getRoot = function (node) {
        while (node != root[node]) {
            node = root[node];
        }
        return node;
    }
    
    for (let itr = 0; itr < data.length - 1; itr++) {
        let query = data[itr + 1].split(" ");
        if (query[2] == "b") {
            let x = parseInt(query[0]) - 1;
            let y = parseInt(query[1]) - 1;
            let rx = getRoot(x);
            let ry = getRoot(y);
            if (rx != ry) {
                if (size[rx] < size[ry]) {
                    root[rx] = ry;
                    size[ry] = size[rx] + size[ry];
                } else {
                    root[ry] = rx;
                    size[rx] = size[rx] + size[ry];
                }
            }
        }
    }
    
    let threeCombination = function(x) {
        if (x < 3) {
            return 0;
        } else {
            return (x * (x - 1) * (x - 2) / 6) % MAGIC;
        }
    }
    
    let twoCombination = function(k, n) {
        return ((k * (k - 1) / 2) * (n - k)) % MAGIC;
    }
    
    let sum = threeCombination(n) % MAGIC;
    let wrong = 0;
    let visited = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let r = getRoot(i);
        if (visited[r] == 0) {
            let k = size[r];
            wrong = (wrong + twoCombination(k, n)) % MAGIC;
            wrong = (wrong + threeCombination(k)) % MAGIC;
            visited[r] = 1;
        }
    }
    
    return "" + (sum - wrong + MAGIC) % MAGIC;
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    ws.write(processData(_input));
    ws.end();
});
