def findDigits(n):
    c = 0
    for _ in str(n):
        if not _ == '0':
            if n % int(_) == 0:
                c += 1
    return c