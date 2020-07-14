n = 5
m = 3
c_lib = 6
c_road = 1
#cities = [[1, 3], [3, 4], [2, 4], [1, 2], [2, 3], [5, 6]]
cities = [[1, 2], [1, 3], [1, 4]]

if c_lib < c_road:
    print(c_lib * n)
else:
    d = [[] for x in range(n + 1)]
    for x, y in cities:
        d[x].append(y)
        d[y].append(x)
    cost = 0

    visited = [False for x in range(n + 1)]
    for i in range(1, n + 1):
        if not visited[i]:
            q = []
            cost += c_lib
            q.append(i)
            visited[i] = True
            while len(q) > 0:
                x = q.pop()
                for y in d[x]:
                    if not visited[y]:
                        q.append(y)
                        visited[y] = True
                        cost += c_road
    print(cost)