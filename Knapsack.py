f = [0 for x in range(0, 2501)]
arr = [2, 3, 4]
n = len(arr)
k = 10

f[0] = 1
for s in range(0, k + 1):
	for i in range(0, n):
		if s >= arr[i]:
			if f[s - arr[i]] == 1:
				f[s] = 1
				continue

result = 0
for s in reversed(range(0, k + 1))
	if f[s] == 1:
		result = s
		break