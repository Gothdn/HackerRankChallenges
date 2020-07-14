def pageCount(n, p):
    front = p // 2
    if n % 2 == 0:
        n = n + 1
    back = (n - p) // 2
    if front < back:
        return front
    else:
        return back