#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the beautifulPairs function below.
def beautifulPairs(A, B):
    n = len(A)
    count = [0 for x in range(0, 1001)]
    for _ in A:
        count[_] += 1

    pairs = 0
    for _ in B:
        if count[_] > 0:
            count[_] -= 1
            pairs += 1
    if pairs == n:
        return(pairs - 1)
    else:
        return(pairs + 1)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input())

    A = list(map(int, input().rstrip().split()))

    B = list(map(int, input().rstrip().split()))

    result = beautifulPairs(A, B)

    fptr.write(str(result) + '\n')

    fptr.close()
