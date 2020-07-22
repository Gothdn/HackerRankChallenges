#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the makingAnagrams function below.
def makingAnagrams(s1, s2):
    count = [0 for x in range(0, 27)]
    for s in s1:
        c = ord(s) - ord('a')
        count[c] += 1

    for s in s2:
        c = ord(s) - ord('a')
        count[c] -= 1

    result = 0
    for c in count:
        result += abs(c)

    return result

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s1 = input()

    s2 = input()

    result = makingAnagrams(s1, s2)

    fptr.write(str(result) + '\n')

    fptr.close()
