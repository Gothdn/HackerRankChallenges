#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the evenForest function below.
count = 0
def evenForest(n, m, edges):

    def dfs(x, parent):
        global count
        total = 0
        for y in edges[x]:
            if y != parent:
                d = dfs(y, x)
                if d % 2 == 0:
                    count += 1
                total += d
        total += 1
        return total

    dfs(0, -1)
    return count

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n, m = map(int, input().rstrip().split())

    edges = [set() for x in range(0, n + 5)]

    for i in range(m):
        x, y = map(int, input().rstrip().split())
        edges[x - 1].add(y - 1)
        edges[y - 1].add(x - 1)

    res = evenForest(n, m, edges)

    fptr.write(str(res) + '\n')

    fptr.close()
