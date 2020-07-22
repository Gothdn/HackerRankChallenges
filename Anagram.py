#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the anagram function below.
def anagram(s):
    if len(s) % 2 == 1:
        return -1

    count = [0 for x in range(0, 27)]
    s1 = s[0:len(s) // 2:]
    s2 = s[len(s) // 2::]

    for c in s1:
        val = ord(c) - ord('a')
        count[val] += 1

    for c in s2:
        val = ord(c) - ord('a')
        count[val] -= 1
    
    result = 0
    for c in count:
        result += abs(c)
    return result // 2
 
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s = input()

        result = anagram(s)

        fptr.write(str(result) + '\n')

    fptr.close()
