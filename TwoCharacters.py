#!/bin/python3

import math
import os
import random
import re
import sys

def lengthValid(s, chars):
    p0 = s.find(chars[0])
    p1 = s.find(chars[1])

    if p0 < p1:
        flag = 0
        result = 1
        for i in range(p0 + 1, len(s)):
            if s[i] == chars[1 - flag]:
                flag = 1 - flag
                result += 1
            elif s[i] == chars[flag]:
                return -1
        return result
    return -1

# Complete the alternate function below.
def alternate(s):
    chars = set(s)
    result = -1
    for c1 in chars:
        for c2 in chars:
            if c1 != c2:
                result = max(result, lengthValid(s, [c1, c2]))
    if result == -1:
        return 0
    else:
        return result

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    l = int(input().strip())

    s = input()

    result = alternate(s)

    fptr.write(str(result) + '\n')

    fptr.close()
