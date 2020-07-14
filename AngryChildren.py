def partition(array, start, end):
    pivot = array[start]
    low = start + 1
    high = end

    while True:
        while low <= high and array[high] >= pivot:
            high = high - 1

        while low <= high and array[low] <= pivot:
            low = low + 1

        if low <= high:
            array[low], array[high] = array[high], array[low]
        else:
            break

    array[start], array[high] = array[high], array[start]
    return high
	
def quick_sort(array, start, end):
    if start >= end:
        return

    p = partition(array, start, end)
    quick_sort(array, start, p - 1)
    quick_sort(array, p + 1, end)
	
def angryChildren(k, packets):
	n = len(packets)
	quick_sort(packets, 0, n - 1)
	
	s = [0 for x in range(0, n)]
	s[0] = packets[0]
	for i in range(1, n):
		s[i] = s[i - 1] + packets[i]
		
	def sum_between(left, right):
		return s[right] - s[left]
	
	
	current_sum = 0
	for i in range(1, k):
		current_sum += i * packets[i] - s[i - 1]
	
	result = current_sum
	for i in range(k, n):
		current_sum = current_sum + (k - 1) * (packets[i] - packet[i - k]) - 2 * sum_between(i - k + 1, i - 1) 
		result = min(current_sum, result)
	return result