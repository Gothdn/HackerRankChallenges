#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the palindromeIndex function below.
def palindromeIndex(s):
    l = 0;
    r = len(s) - 1
    while (s[l] == s[r]) & (l < r):
        l += 1
        r -= 1
    
    if l >= r:
        return -1
    result_l = l
    result_r = r
    sl = s[0:l:] + s[l + 1::]
    sr = s[0:r:] + s[r + 1::]

    l = 0;
    r = len(sl) - 1
    while (sl[l] == sl[r]) & (l < r):
        l += 1
        r -= 1
    
    if l >= r:
        return result_l

    l = 0;
    r = len(sr) - 1
    while (sr[l] == sr[r]) & (l < r):
        l += 1
        r -= 1
    
    if l >= r:
        return result_r

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s = input()

        result = palindromeIndex(s)

        fptr.write(str(result) + '\n')

    fptr.close()
