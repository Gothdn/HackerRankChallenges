packets = [1, 2, 3, 4, 5, 6, 7, 10, 10, 10]
k = 3
n = len(packets)
packets.sort();

s = [0 for x in range(0, n)]
s[0] = packets[0]
for i in range(1, n):
    s[i] = s[i - 1] + packets[i]


def sum_between(left, right):
    return s[right] - s[left - 1]


current_sum = 0
for i in range(1, k):
    current_sum += i * packets[i] - s[i - 1]

result = current_sum
for i in range(k, n):
    current_sum = current_sum + (k - 1) * (packets[i] + packets[i - k]) - 2 * sum_between(i - k + 1, i - 1)
    result = min(current_sum, result)

print(result)