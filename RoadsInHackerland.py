#!/bin/python3

import os
import sys

#
# Complete the roadsInHackerland function below.
#
def roadsInHackerland(n, m, roads):
    #   Build spanning tree
    parent = [x for x in range(0, n)]
    count = [0 for x in range(0, n)]
    edges = [set() for x in range(0, n)]

    def root(x):
        while x != parent[parent[x]]:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    roads.sort()
    for d, x, y in roads:
        r_x = root(x)
        r_y = root(y)
        if r_x != r_y:
            if count[r_x] > count[r_y]:
                parent[r_y] = r_x
                count[r_x] += count[r_y]
            else:
                parent[r_x] = r_y
                count[r_y] += count[r_x]
            edges[x].add((y, d))
            edges[y].add((x, d))
    print(parent) 
    #   Assume the root is node 0, count the number of nodes from tree with root x: c
    #   number of times edge (parent_x, x) appears in result should be c * (n - c) 
    total = [0 for x in range(0, m + 5)]
    def dfs(x, parent_x):
        count = 1
        for y, d in edges[x]:
            if y != parent_x:
                c = dfs(y, x)
                total[d] += c * (n - c)
                print("d c = " + str(d) + " " + str(c))
                count += c
        return count

    dfs(0, -1)
    result = 0
    for i in range(0, len(total)):
        result += total[i] * (1 << i)

    return(str(bin(result))[2:])

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nm = input().split()

    n = int(nm[0])

    m = int(nm[1])

    roads = []

    for _ in range(m):
        xyd = input().rstrip().split();
        x = int(xyd[0])
        y = int(xyd[1])
        d = int(xyd[2])
        roads.append((d, x - 1, y - 1))

    result = roadsInHackerland(n, m, roads)

    fptr.write(result + '\n')

    fptr.close()
