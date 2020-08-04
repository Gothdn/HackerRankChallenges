#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the weightedUniformStrings function below.
def weightedUniformStrings(s, queries):
    n = len(s)
    m = len(queries)
    count = [0 for x in range(0, 26)]
    c = 1

    for i in range(1, n):
        if s[i] == s[i - 1]:
            c += 1
        else:
            ch = ord(s[i - 1]) - ord('a')
            count[ch] = max(count[ch], c)
            c = 1
    
    ch = ord(s[n - 1]) - ord('a')
    count[ch] = max(count[ch], c)
    print(count)

    result = []
    for q in range(0, m):
        found = False
        for i in range(0, 26):
            if (queries[q] <= (i + 1) * count[i]) & (queries[q] % (i + 1) == 0):
                found = True
                break
        if found:
            result.append('Yes')
        else:
            result.append('No')
    return result

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    queries_count = int(input())

    queries = []

    for _ in range(queries_count):
        queries_item = int(input())
        queries.append(queries_item)

    result = weightedUniformStrings(s, queries)

    fptr.write('\n'.join(result))
    fptr.write('\n')

    fptr.close()
