let dict = ["ogwwsenipa", "obsehkjfcj", "dhqvptquuu", "kkdgivnvfc", "ytdqxmciue", "rznhvdcnxw", "kihnqpkdnp", "hlimdfbfnv", "mguznrcpfc", "nrmweeookb", "drolersfwh", "ckpykeqotx", "sioefulviv", "wnmkasbuzz", "ddkscwwukr", "rfzhjgbwbl", "rzagjaymua", "mxdyrhunbg", "eulfdxogtr", "rnrrtctrpp", "tdmzbfgxsi", "fyereiquol", "liyebrhvly", "kgbzfeembz", "wgxazdirzx", "flfdrgxydi", "woqzpwdvkg", "ugpuiqxrix", "qnkxsbfpcj", "zazqaqmdly", "mgebaorzfz", "yxoiuhmayo", "lyqkoqacwn", "aivgjxucxc", "cxzsgwbuya", "klyavotxsp", "muzickfwmc", "aqccjiakey", "mojmqgajfu", "yrozzqjfpw", "jrmltxvtkz", "twpejgmlpr", "gqlwpknbre", "xdvlqplmkv", "ngtfmelzsc", "qyudukojnh", "nkmjxdairm", "fgublhhygz", "byxvcuhsdu", "btgocgreqk", "syqnzeuicc", "ifahdebmwh", "jaapoexhio", "rcmjpnnlxq", "nfvonauqnt", "xwtznjdlqn", "bjqnshcgtz", "yghvwuwrml", "kmhdlumrhe", "einwxhebpx", "bnfilcejts", "ufebiqxwjh", "cnprmnysoq", "rrfwbqahzv", "atagwkwwif", "dkvsbjhcby", "surxqvqter", "oenpljzjhi", "rkuofwxoaa", "osugrmdjfh", "bwoolbzmkh", "wdtrrypqpp", "qdjmlcbomi", "wpekdpleex", "nabhtuhinw", "zfcksnntcb", "dyqiktzxzd", "ungxuzubkh", "almcwgrlbt", "mftcndxoaw", "sxjawdzshl", "zjxonvwegy", "ysfruuxtiz", "payzavecpn", "ppwofjjbop", "bojghfaeyj", "golgpodtst", "hhifwprhqf", "xuvgacodjm", "orcbxrpbnj", "uwtebrtsyl", "zxfugizuli", "gzzjawcszp", "btnwxrnqlm", "enljjrrile", "ssdtdgsfar", "xdlmaidpbp", "dhepqngkws", "oomuipccwc", "ttfeihplxs"];
let value = [4462805, 1916916, 2870812, 3407597, 5169525, 4087301, 4005965, 1803633, 3357388, 1112112, 5656776, 4438527, 3841975, 4102090, 2113339, 2977711, 1709727, 1666821, 4167887, 3742911, 1948785, 3057238, 1940358, 4574138, 4598641, 2922682, 1839758, 4562812, 1508583, 2531144, 3192788, 4971388, 3448060, 2579952, 4895338, 5133938, 5667253, 5417655, 3453923, 3024642, 5529768, 3110699, 3979521, 5888095, 3729142, 2609212, 2865806, 1955221, 3276034, 3550045, 4698132, 1741171, 5607283, 5638490, 2831662, 1722277, 2561172, 3671420, 5285089, 5586108, 5202564, 4994229, 2073848, 5166977, 1574181, 5969186, 1817267, 1241435, 2903194, 1787542, 5782429, 4949314, 1414593, 1278302, 4837409, 4143735, 2887514, 4219567, 5098956, 2679900, 1769612, 1313440, 5937424, 3893247, 3468283, 2769086, 2131876, 5029455, 2956858, 3933318, 2131915, 4675774, 2927547, 3205764, 1359103, 1018081, 5691302, 2176370, 3775868, 2594496];
let patt = "xyz";
let tree = [];
let treeLength;

class Node:
    def __init__(_parent, _id, _char):
        self.id = _id
        self.char = _char
        self.childs = {}
        self.parent = _parent
        self.output = []
        self.fallback = 0

let buildTrie = function () {
    tree.push(newNode(-1, 0, ''));
    let curNode;
    let c;
    treeLength = 1;
    for (let i = 0; i < dict.length; i++) {
        curNode = 0;
        for (let j = 0; j < dict[i].length; j++) {
            c = dict[i][j];
            if (tree[curNode].childs[c] == null) {
                tree.push(newNode(curNode, treeLength, c));
                tree[curNode].childs[c] = treeLength;
                curNode = treeLength;
                treeLength++;
            } else {
                curNode = tree[curNode].childs[c];
            }
        }
        tree[curNode].output.push(i);
    }
}

let buildFallBackAndOutput = function () {
    let curNode, fallback;
    let q = [];
    tree[0].fallback = 0;
    for (let c in tree[0].childs) {
        q.push(tree[0].childs[c]);
        tree[tree[0].childs[c]].fallback = 0;
    }

    while (q.length > 0) {
        curNode = q.shift();
        //console.log(tree[curNode]);
        tree[curNode].output = tree[curNode].output.concat(tree[tree[curNode].fallback].output);
        for (let c in tree[curNode].childs) {
            q.push(tree[curNode].childs[c]);
            fallback = tree[curNode].fallback;
            while (fallback > 0 && tree[fallback].childs[c] == null) {
                fallback = tree[fallback].fallback;
            }
            if (tree[fallback].childs[c] == null) {
                tree[tree[curNode].childs[c]].fallback = 0;
            } else {
                tree[tree[curNode].childs[c]].fallback = tree[fallback].childs[c];
            }
        }
    }
}

let search = function (s, low, high) {
    let c, fallback;
    let curNode = 0;
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        c = s[i];
        if (tree[curNode].childs[c] != null) {
            curNode = tree[curNode].childs[c];
        } else {
            fallback = tree[curNode].fallback;
            while (fallback > 0 && tree[fallback].childs[c] == null) {
                fallback = tree[fallback].fallback;
            }
            if (tree[fallback].childs[c] != null) {
                curNode = tree[fallback].childs[c];
            } else {
                curNode = fallback;
            }
        }
        //console.log("char: " + c + "   node: " + curNode);

        tree[curNode].output.forEach(function (o) {
            if (low <= o && o <= high) {
                sum += value[o];
            }
        });
    }
    return sum;
}

buildTrie();
console.log(tree[0]);

buildFallBackAndOutput();
//console.log(tree);

console.log(search("caaab", 1, 5));