#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the gameOfThrones function below.
def gameOfThrones(s):
    count = [0 for x in range(0, 27)]
    for c in s:
        val = ord(c) - ord('a')
        count[val] += 1
    
    odds = 0
    for c in count:
        if c % 2 == 1:
            odds += 1
    if odds <= 1:
        return 'YES'
    else:
        return 'NO'

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    result = gameOfThrones(s)

    fptr.write(result + '\n')

    fptr.close()
