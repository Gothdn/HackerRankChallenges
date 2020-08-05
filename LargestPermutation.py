#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the largestPermutation function below.
def largestPermutation(k, arr):
    n = len(arr)
    pos = [0 for x in range(0, n)]
    for i in range(0, n):
        arr[i] -= 1
        pos[arr[i]] = i
    
    p = 0
    while p < n:
        while (p < n - 1) & (arr[p] == n - p - 1):
            p += 1
        if p == n - 1:
            break
        v = n - p - 1
        p_v = pos[v]
        pos[v] = p
        pos[arr[p]] = p_v
        arr[p], arr[p_v] = arr[p_v], arr[p]
        k -= 1
        if k == 0:
            break
    for i in range(0, n):
        arr[i] += 1
    return arr

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nk = input().split()

    n = int(nk[0])

    k = int(nk[1])

    arr = list(map(int, input().rstrip().split()))

    result = largestPermutation(k, arr)

    fptr.write(' '.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
