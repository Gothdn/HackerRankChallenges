#!/bin/python3
from collections import deque 

import os
import sys

#
# Complete the rustMurdered function below.
#
def rustMurderer(n, s, roads):
    LIMIT = 1000000007
    n += 1
    
    edges = [set() for x in range(0, n)]
    for (x, y) in roads:
        edges[x].add(y)
        edges[y].add(x)

    d = [1 for x in range(0, n)]
    not_visited = edges[s]
    just_visited = set()
    cur = 1
    while len(not_visited) > 0:
        cur += 1    
        for x in not_visited:
            #not A intersect not B = not (A union B)
            if len(not_visited | edges[x]) < n - 1: 
                d[x] = cur
                just_visited.add(x)               
        not_visited -= just_visited
        just_visited.clear()
    d.pop(s)
    d.pop(0)

    return(d)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input())

    for t_itr in range(t):
        nm = input().split()

        n = int(nm[0])

        m = int(nm[1])

        roads = []

        for _ in range(m):
            roads.append(list(map(int, input().rstrip().split())))

        s = int(input())

        result = rustMurderer(n, s, roads)

        fptr.write(' '.join(map(str, result)))
        fptr.write('\n')

    fptr.close()
