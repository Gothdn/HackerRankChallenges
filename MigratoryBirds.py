def migratoryBirds(arr):
    count = [0 for x in range(0, 6)]
    for _ in arr:
        count[_] += 1
    print(count)
    return count.index(max(count))