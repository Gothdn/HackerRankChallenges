f = [0 for x in range(0, 100005)]
n = len(arr)
result = 0
if n < 3:
	for i in range(0, n):
		result = result + arr[i]
else:	
	f[n - 1] = arr[n - 1]
	f[n - 2] = f[n - 1] + arr[n - 2] 
	f[n - 3] = f[n - 2] + arr[n - 3]

	sum = f[n - 3]
	for i in reversed(range(0, n - 3):
		sum = sum + arr[i]
		f[i] = sum - min(min(f[i + 1], f[i + 2]), f[i + 3])
	result = f[0]
	
return result