def strangeCounter(t):
    s = 0
    c = 3
    while (s + c < t):
        s += c
        c *= 2
    return c - (t - s) + 1