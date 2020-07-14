n = 5
p = 3

astronaut = [[0, 1], [2, 3], [0, 4]]
#astronaut = [[0, 2]]

d = [[] for x in range(n)]
for x, y in astronaut:
    d[x].append(y)
    d[y].append(x)

result = 0
visited = [False for x in range(n)]
total = 0
for i in range(0, n):
    if not visited[i]:
        count = 1
        q = [i]
        visited[i] = True
        while len(q) > 0:
            x = q.pop()
            for y in d[x]:
                if not visited[y]:
                    count += 1
                    q.append(y)
                    visited[y] = True
        result += total * count
        total += count
print(result)