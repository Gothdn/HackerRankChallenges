#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the twoStrings function below.
def twoStrings(s1, s2):
    frequency = [0 for x in range(0, 27)]
    for s in s1:
        c = ord(s) - ord('a')
        frequency[c] = 1

    for s in s2:
        c = ord(s) - ord('a')
        if frequency[c] == 1:
            frequency[c] = 2


    if frequency.count(2) > 0:
        return 'YES'
    else:
        return 'NO'

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s1 = input()

        s2 = input()

        result = twoStrings(s1, s2)

        fptr.write(result + '\n')

    fptr.close()
