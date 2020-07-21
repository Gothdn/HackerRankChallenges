#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the prims function below.
def prims(n, edges):
    result = 0
    n = len(edges)
    edges.sort()
    parents = [-1 for x in range(0, n + 5)]
    count = [1 for x in range(0, n + 5)]

    def root(x):
        while parents[x] > 0:
            x = parents[x]
        return x

    c = 0
    for i in range(0, n):
        x = edges[i][1]
        y = edges[i][2]
        r_x = root(x)
        r_y = root(y)
        if not (r_x == r_y):
            if count[r_x] < count[r_y]:
                parents[r_x] = r_y
                count[r_y] += count[r_x]
            else:
                parents[r_y] = r_x
                count[r_x] += count[r_y]
            c += 1
            result += edges[i][0]
        if c == n:
            break

    return result

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nm = input().split()

    n = int(nm[0])

    m = int(nm[1])

    edges = []

    for _ in range(m):
        g_from, g_to, g_weight = map(int, input().rstrip().split())
        edges.append((g_weight, g_from, g_to))

    start = int(input())

    result = prims(n, edges)

    fptr.write(str(result) + '\n')

    fptr.close()
