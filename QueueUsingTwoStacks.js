function processData(input) {
    let queries = input.split('\n');
    let q = [];
    let first = 0;
    for (let i = 1; i < queries.length; i++) {
        //console.log("i: " + i + " q: " + q);
        if (queries[i][0] == "1") {
            q.push(queries[i].split(" ")[1]);
        } else if (queries[i][0] == "2") {
            first++;
        } else if (queries[i][0] == "3") {
            console.log(q[first]);
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
