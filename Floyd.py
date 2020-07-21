#!/bin/python3

import math
import os
import random
import re
import sys
MAX_D = 100000000000007

def floyd(edges, n):
    n += 1
    for k in range(1, n):
        for i in range(1, n):
            for j in range(1, n):
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    for i in range(1, n):
        for j in range(1, n):
            if dist[i][j] == MAX_D:
                dist[i][j] = -1

if __name__ == '__main__':
    n, m = map(int, input().split())

    dist = [[MAX_D for x in range(0, n + 5)] for x in range(0, n + 5)]
    for i in range(1, n):
        dist[i][i] = 0

    for i in range(m):
        xyd = sys.stdin.readline().split()
        x = int(xyd[0])
        y = int(xyd[1])
        d = int(xyd[2])
        dist[x][y] = d

    floyd(dist, n)

    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    q = int(sys.stdin.readline())

    for q_itr in range(q):
        xy = sys.stdin.readline().split()

        x = int(xy[0])

        y = int(xy[1])

        fptr.write(str(dist[x][y]))
        fptr.write('\n')
    fptr.close()