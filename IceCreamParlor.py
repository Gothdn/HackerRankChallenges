#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the icecreamParlor function below.
def icecreamParlor(m, arr):
    a = []
    for i in range(0, len(arr)):
        a.append((arr[i], i))
    a.sort()
    #print(a)

    l = 0
    r = len(arr) - 1
    while l < r:
        while (a[l][0] + a[r][0] > m) & (l < r):
            r -= 1
        if a[l][0] + a[r][0] == m:
            x = a[l][1] + 1
            y = a[r][1] + 1
            if x > y:
                x, y = y, x
            return([x, y])
            
        l += 1

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input())

    for t_itr in range(t):
        m = int(input())

        n = int(input())

        arr = list(map(int, input().rstrip().split()))

        result = icecreamParlor(m, arr)

        fptr.write(' '.join(map(str, result)))
        fptr.write('\n')

    fptr.close()
