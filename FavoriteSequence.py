import math
import os
import random
import re
import sys
def favoriteSequenceNaive(sequences):
    n = -1
    for s in sequences:
        for _ in s:
            n = max(n, _)
    n += 1
    v = [set() for x in range(0, n)]
    d = [0 for x in range(0, n)]
    p = [-1 for x in range(0, n)]
    h = []
    nodes = set()
    for s in sequences:
        for i in range(0, len(s) - 1):
            nodes.add(s[i])
            v[s[i]].add(s[i + 1])
            d[s[i + 1]] += 1
        nodes.add(s[len(s) - 1])

    result = []
    visited = [False for x in range(0, n)]
    found = 1
    while True:
        x_pair = (100001, 100001)
        for number in nodes:
            if not visited[number]:
                x_pair = min(x_pair, (d[number], number))
        if x_pair[1] == 100001:
            break
        x = x_pair[1]
        if x == 415:
            print("here")
        result.append(x)
        visited[x] = True
        for y in v[x]:
            if not visited[y]:
                d[y] -= 1

    return(result)


def favoriteSequence(sequences):
    n = -1
    for s in sequences:
        for _ in s:
            n = max(n, _)
    n += 1
    v = [set() for x in range(0, n)]
    d = [0 for x in range(0, n)]
    p = [-1 for x in range(0, n)]
    h = []
    nodes = set()
    for s in sequences:
        for i in range(0, len(s) - 1):
            nodes.add(s[i])
            v[s[i]].add(s[i + 1])
        nodes.add(s[len(s) - 1])

    def heap_pop():
        vertex = h[0]
        p[vertex] = -1
        l_h = len(h)
        if l_h == 1:
            h.pop(0)
            return vertex

        h[0] = h.pop(l_h - 1)
        p[h[0]] = 0
        l_h -= 1
        x = 0
        c = x * 2 + 1
        while c < l_h:
            if c + 1 < l_h:
                if (d[h[c + 1]], h[c + 1]) < (d[h[c]], h[c]):
                    c += 1
            if (d[h[c]], h[c]) > (d[h[x]], h[x]):
                break
            h[x], h[c] = h[c], h[x]
            p[h[x]], p[h[c]] = p[h[c]], p[h[x]]
            x = c
            c = x * 2 + 1
        return vertex

    def heap_update(vertex):
        x = p[vertex]
        if x == -1:
            x = len(h)
            p[vertex] = x
            h.append(vertex)
        p_x = (x - 1) // 2
        while ((d[h[x]], h[x]) < (d[h[p_x]], h[p_x])) & (x > 0):
            h[x], h[p_x] = h[p_x], h[x]
            p[h[x]], p[h[p_x]] = p[h[p_x]], p[h[x]]
            x = p_x
            p_x = (x - 1) // 2

    for x in nodes:
        for y in v[x]:
            d[y] += 1

    for x in nodes:
        heap_update(x)

    result = []
    visited = [False for x in range(0, n)]
    while len(h) > 0:
        x = heap_pop()
        result.append(x)
        visited[x] = True
        for y in v[x]:
            if not visited[y]:
                d[y] -= 1
                heap_update(y)

    return(result)


if __name__ == '__main__':
    fin = open('in.txt', 'r')
    fout = open('out.txt', 'w')

    n = int(fin.readline())
    sequences = []
    for _ in range(n):
        m = int(fin.readline())
        s = fin.readline().split()
        ss = []
        for i in range(0, len(s)):
            ss.append(int(s[i]))
        sequences.append(ss)

    result = favoriteSequence(sequences)
    fout.write(' '.join(map(str, result)))
    fout.write('\n')

    result2 = favoriteSequenceNaive(sequences)
    fout.write(' '.join(map(str, result2)))
    fout.write('\n')

    print(result == result2)

    fin.close()
    fout.close()