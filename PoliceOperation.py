c = [1, 4, 5, 6, 9]
k = 3
h = 10

c.insert(0, 0)
n = len(c)
f = [0 for x in range(0, n + 5)]
f[0] = 0
f[1] = h
p = 1
for i in range(2, n):
    f[i] = f[i - 1] + h
    for j in range(p, i):
        cost = (c[i] - c[j]) * (c[i] - c[j]) + h
        if f[i] > f[j - 1] + cost:
            f[i] = f[j - 1] + cost
            p = j - 1
print(f)