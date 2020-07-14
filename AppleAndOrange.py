def fall_within(s, t, p):
    return (s <= p) & (p <= t)


# Complete the countApplesAndOranges function below.
def countApplesAndOranges(s, t, a, b, apples, oranges):
    c = 0
    for _ in apples:
        if fall_within(s, t, a + _):
            c = c + 1
    print(c)
    c = 0
    for _ in oranges:
        if fall_within(s, t, b + _):
            c = c + 1
    print(c)