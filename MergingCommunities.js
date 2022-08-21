const fs = require('fs');

function processData(input) {
    //  Input   
    let data = input.split('\n');
    let n = parseInt(data[0].split(" ")[0]);
    let q = parseInt(data[0].split(" ")[1]);
    let result = "";
    
    let root = new Array(n).fill(0).map((i, index) => index);
    let size = new Array(n).fill(1);
    let getRoot = function (node) {
        while (node != root[node]) {
            node = root[node];
        }
        return node;
    }
    
    for (let itr = 0; itr < q; itr++) {
        let query = data[itr + 1].split(" ");        
        if (query[0] == "Q") {
            let d = parseInt(query[1]);
            result = result + size[getRoot(d - 1)] + "\n";
        } else if (query[0] == "M") {
            let x = parseInt(query[1]) - 1;
            let y = parseInt(query[2]) - 1;
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
        //console.log(query);
        //console.log(root);
        //console.log(size);
    }
    //console.log(result);
    return result;
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
