#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the shortestReach function below.
def shortestReach(n, v, s):
    n += 1

    MAX_DIST = 100000000000009
    dist = [MAX_DIST for x in range(0, n)]
    pos = [-1 for x in range(0, n)]
    h = []

    def heap_pop():
        vertex = h[0]
        pos[vertex] = -1
        l_h = len(h)
        if l_h == 1:
            h.pop(0)
            return vertex

        h[0] = h.pop(l_h - 1)
        pos[h[0]] = 0
        l_h -= 1
        x = 0
        c = x * 2 + 1
        while c < l_h:
            if c + 1 < l_h:
                if dist[h[c + 1]] < dist[h[c]]:
                    c += 1
            if dist[h[c]] > dist[h[x]]:
                break
            h[x], h[c] = h[c], h[x]
            pos[h[x]], pos[h[c]] = pos[h[c]], pos[h[x]]
            x = c
            c = x * 2 + 1
        return vertex

    def heap_update(vertex):
        x = pos[vertex]
        if x == -1:
            x = len(h)
            pos[vertex] = x
            h.append(vertex)
        p_x = (x - 1) // 2
        while (dist[h[x]] < dist[h[p_x]]) & (x > 0):
            h[x], h[p_x] = h[p_x], h[x]
            pos[h[x]], pos[h[p_x]] = pos[h[p_x]], pos[h[x]]
            x = p_x
            p_x = (x - 1) // 2

    visited = [False for x in range(0, n)]
    heap_update(s)
    dist[s] = 0
    while len(h) > 0:
        x = heap_pop()
        visited[x] = True
        for (y, d) in v[x]:
            if not visited[y]:
                if dist[y] > dist[x] + d:
                    dist[y] = dist[x] + d
                    heap_update(y)

    for i in range(0, n):
        if dist[i] == MAX_DIST:
            dist[i] = -1

    dist.pop(s)
    dist.pop(0)
    return(dist)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(sys.stdin.readline())

    for t_itr in range(t):
        nm = sys.stdin.readline().split()

        n = int(nm[0])

        m = int(nm[1])

        v = [set() for x in range(0, n + 10)]

        for _ in range(m):
            xyd = sys.stdin.readline().split();
            x = int(xyd[0])
            y = int(xyd[1])
            d = int(xyd[2])
            v[x].add((y, d))
            v[y].add((x, d))

        s = int(sys.stdin.readline())

        result = shortestReach(n, v, s)
        #result =[]
        fptr.write(' '.join(map(str, result)))
        fptr.write('\n')

    fptr.close()