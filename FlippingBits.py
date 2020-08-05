#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the flippingBits function below.
def flippingBits(n):
    num = bin(n)[2::]
    result = '1' * (32 - len(num))
    for i in range(0, len(num)):
        if num[i] == '0':
            result = result + '1'
        else:
            result = result + '0'
    return(int(result, 2))


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        n = int(input())

        result = flippingBits(n)

        fptr.write(str(result) + '\n')

    fptr.close()
