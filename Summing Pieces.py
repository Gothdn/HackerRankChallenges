MODULO = 10000000007
arr = [1, 3, 6]
n = len(arr)
power2 = [None] * (n + 1)

for i in range(n + 1):
    power2[i] = pow(2, i, MODULO)
    print(power2[i])

temp = 0;

if n == 1:
    temp = arr[0]
else:
    factor = (power2[n] - 1)
    temp = ((arr[0] + arr[n - 1]) * factor) % MODULO
    y = n - 2;
    for i in range(1, n // 2):
        factor = (factor + power2[y] - power2[n - 2 - y]) % MODULO
        temp = (temp + (arr[i] + arr[n - i - 1]) * factor) % MODULO
        y = y - 1
    if n % 2 == 0:
        print(temp)
    else:
        factor = (factor + power2[y] - power2[n - 2 - y]) % MODULO
        temp = (temp + (arr[n // 2]) * factor) % MODULO
        print(temp)