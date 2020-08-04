#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the decentNumber function below.
def decentNumber(n):
    s3 = '33333'
    s5 = '555'
    if n % 3 == 0:
        n5 = n // 3
        print(s5 * n5)
    elif n % 3 == 1:
        if n - 10 >= 0:
            n5 = (n - 10) // 3
            n3 = 2
            print(s5 * n5 + s3 * n3)
        else:
            print('-1')
    elif n % 3 == 2:
        if n - 5 >= 0:
            n5 = (n - 5) // 3
            n3 = 1
            print(s5 * n5 + s3 * n3)
        else:
            print('-1')

if __name__ == '__main__':
    t = int(input().strip())

    for t_itr in range(t):
        n = int(input().strip())

        decentNumber(n)