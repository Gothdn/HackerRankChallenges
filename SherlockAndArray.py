#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the balancedSums function below.
def balancedSums(arr):
    arr.insert(0, 0)
    arr.append(0)
    n = len(arr)
    l = [0 for x in range(0, n)]
    r = [0 for x in range(0, n)]
    l[0] = arr[0]
    r[n - 1] = arr[n - 1]
    for i in range(1, n):
        l[i] = l[i - 1] + arr[i]
        r[n - i - 1] = r[n - i] + arr[n - i - 1]
    for i in range(1, n - 1):
        if l[i - 1] == r[i + 1]:
            return('YES')
    return('NO')

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    T = int(input().strip())

    for T_itr in range(T):
        n = int(input().strip())

        arr = list(map(int, input().rstrip().split()))

        result = balancedSums(arr)

        fptr.write(result + '\n')

    fptr.close()
