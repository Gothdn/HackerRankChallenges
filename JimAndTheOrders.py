#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the jimOrders function below.
def jimOrders(orders):
    arr = []
    for i in range(0, len(orders)):
        arr.append((orders[i][0] + orders[i][1], i + 1))
    arr.sort()
    result = []
    for i in range(0, len(arr)):
        result.append(arr[i][1])
    return(result)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input())

    orders = []

    for _ in range(n):
        orders.append(list(map(int, input().rstrip().split())))

    result = jimOrders(orders)

    fptr.write(' '.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
