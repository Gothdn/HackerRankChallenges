import math
import os
import random
import re
import sys


def kruskals(g_nodes, edges):
    result = 0
    n = len(edges)
    edges.sort()
    parents = [-1 for x in range(0, g_nodes + 5)]
    count = [1 for x in range(0, g_nodes + 5)]

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


fin = open('in.txt', 'r')
fout = open('out.txt', 'w')

g_nodes, g_edges = map(int, fin.readline().rstrip().split())

edges = [0 for x in range(0, g_edges)]

for i in range(0, g_edges):
    g_from, g_to, g_weight = map(int, fin.readline().rstrip().split())
    edges[i] = (g_weight, g_from, g_to)

res = kruskals(g_nodes, edges)
fout.write(str(res))

fin.close()
fout.close()