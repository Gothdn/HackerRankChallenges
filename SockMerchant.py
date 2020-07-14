def sockMerchant(n, ar):
    count = [0 for x in range(0, 105)]
    for _ in ar:
        count[_] += 1
    return sum([_ // 2 for _ in count])