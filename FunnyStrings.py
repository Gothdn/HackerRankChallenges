#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the funnyString function below.
def funnyString(s):
    n = len(s)
    for i in range(1, n):
        if abs(ord(s[i]) - ord(s[i - 1])) != abs(ord(s[n - i - 1]) - ord(s[n - i])):
            return('Not Funny')
    return('Funny')

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        s = input()

        result = funnyString(s)

        fptr.write(result + '\n')

    fptr.close()