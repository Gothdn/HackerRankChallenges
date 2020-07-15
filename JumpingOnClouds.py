def jumpingOnClouds(c, k):
    n = len(c)
    e = 100
    x = 0
    while True:
        x = (x + k) % n
        if c[x] == 1:
            e -= 2
        e -= 1
        if x == 0:
            break

    return e