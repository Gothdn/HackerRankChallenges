s = [0 for x in range(0, 1000005)]
arr = [2, 4, 3, 7, 4, 5]

l = 0;
s[0] =  arr[0]
for i in range(1, n):
	if arr[i] > s[l - 1]:
		s[l] = arr[i]
		l = l + 1
	else:
		low = 0
		high = l - 1
		while (low <= high):
			mid = (low + high) // 2
			if s[mid] < arr[i]:
				low = mid + 1
			else:
				high = mid - 1
				found = mid
		s[found] = arr[i]
	
return l
