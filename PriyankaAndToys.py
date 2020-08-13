#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the toys function below.
def toys(w):
    n = len(w)
    w.append(9999999999999)
    w.sort()
    
    x = w[0]
    i = 1
    result = 0
    while i < n:
        while w[i] - x <= 4:
            i += 1
        result += 1
        x = w[i]
        if i == n:
            break
    return result
         

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input())

    w = list(map(int, input().rstrip().split()))

    result = toys(w)

    fptr.write(str(result) + '\n')

    fptr.close()
