def kangaroo(x1, v1, x2, v2):
    if v2 == v1:
        return 'NO'
    if ((x1 - x2) % (v2 - v1) == 0) & (((x1 - x2) // (v2 - v1)) > 0):
        return 'YES'
    else:
        return 'NO'