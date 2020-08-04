#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the alternatingCharacters function below.
def alternatingCharacters(s):
    s = s + '@'
    n = len(s)
    c = 1
    result = 0

    for i in range(1, n):
        if s[i] == s[i - 1]:
            c += 1
        else:
            result += c - 1
            c = 1
    return result

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s = input()

        result = alternatingCharacters(s)

        fptr.write(str(result) + '\n')

    fptr.close()
