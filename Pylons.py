#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the pylons function below.
def pylons(k, arr):
    n = len(arr)
    last = []
    pos = -1
    for i in range (0, n):
        if arr[i] == 1:
            pos = i
        last.append(pos)

    c = 0
    left = 0
    while left < n:
        right = min(left + k - 1, n - 1)
        if (last[right] + k - 1 < left) | (last[right] == -1):
            return -1
        c += 1
        left = last[right] + k
    return c

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nk = input().split()

    n = int(nk[0])

    k = int(nk[1])

    arr = list(map(int, input().rstrip().split()))

    result = pylons(k, arr)

    fptr.write(str(result) + '\n')

    fptr.close()
