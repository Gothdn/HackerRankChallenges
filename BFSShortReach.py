#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the bfs function below.
def bfs(n, m, edges, s):
    n += 1
    d = [-1 for x in range(0, n)]
    d[s] = 0

    q = [0 for x in range(0, n + 5)]
    l_q = 1
    c_q = 0
    q[0] = s
    while (c_q < l_q):
        x = q[c_q]
        for y in edges[x]:
            if d[y] == -1:
                d[y] = d[x] + 6
                q[l_q] = y
                l_q += 1
        c_q += 1

    d.pop(s)
    d.pop(0)
    return(d)
 
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        nm = input().split()

        n = int(nm[0])

        m = int(nm[1])

        edges = [set() for x in range(0, n + 5)]

        for _ in range(m):
            xy  = input().rstrip().split()
            x = int(xy[0])
            y = int(xy[1])
            edges[x].add(y)
            edges[y].add(x)

        s = int(input())

        result = bfs(n, m, edges, s)

        fptr.write(' '.join(map(str, result)))
        fptr.write('\n')

    fptr.close()
