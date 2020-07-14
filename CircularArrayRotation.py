def circularArrayRotation(a, k, queries):
    results = []
    n = len(a)
    for _ in queries:
        results.append(a[(_ - k) % n])
    return results