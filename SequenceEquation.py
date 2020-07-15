def permutationEquation(p):
    p.insert(0, 0)
    n = len(p)
    r = [0 for x in range(0, n)]
    result = [0 for x in range(0, n)]
    for i in range(1, n):
        r[p[i]] = i
    for i in range(1, n):
        result[i] = r[r[i]]
    result.pop(0)
    return result