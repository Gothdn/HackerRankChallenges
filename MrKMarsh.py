grid = [["....."],
       [".x.x."],
       ["....."],
       ["....."]]


m = len(grid)
n = len(grid[0][0])

a = [[0 for x in range(n + 1)] for y in range(m + 1)]
up = [[0 for x in range(n + 1)] for y in range(m + 1)]
down = [[0 for x in range(n + 1)] for y in range(m + 1)]
left = [[0 for x in range(n + 1)] for y in range(m + 1)]
right = [[0 for x in range(n + 1)] for y in range(m + 1)]

for i in range(0, m):
    for j in range(0, n):
        if grid[i][0][j] == '.':
            a[i][j] = 1
        else:
            a[i][j] = 0
            up[i][j] = -1
            down[i][j] = -1
            right[i][j] = -1
            left[i][j] = -1


for i in range(0, m):
    for j in range(0, n):
        if (i != 0) & (a[i][j] == 1):
            if a[i - 1][j] == 1:
                up[i][j] = up[i - 1][j] + 1
        if (j != 0) & (a[i][j] == 1):
            if a[i][j - 1] == 1:
                left[i][j] = left[i][j - 1] + 1
        if (i != 0) & (a[m - i - 1][j] == 1):
            if a[m - i - 1][j] == 1:
                down[m - i - 1][j] = down[m - i][j] + 1
        if (j != 0) & (a[i][n - j - 1] == 1):
            if a[i][n - j - 1] == 1:
                right[i][n - j - 1] = right[i][n - j] + 1

res = -1
for i in range(0, m - 1):
    for j in range(0, n - 1):
        if a[i][j] == 1:
            half_perimeter = down[i][j] + right[i][j]
            for s in reversed(range(2, half_perimeter + 1)):
                if res < half_perimeter * 2:
                    for d in range(1, min(down[i][j] + 1, s)):
                        r = s - d
                        if r > right[i][j]:
                            continue
                        x = i + d
                        y = j + r
                        if (down[i][y] >= d) & (right[x][j] >= r):
                            if d + d + r + r > res:
                                res = d + d + r + r
                                break

if res == -1:
    print("impossible")
else:
    print(res)