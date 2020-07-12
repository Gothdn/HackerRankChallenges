import math


def is_prime(number):
    for _i in range(2, math.floor(math.sqrt(number)) + 1):
        if number % _i == 0:
            return False
    return True


f = [0 for x in range(41)]
f[0] = 1
f[1] = 1
f[2] = 1
f[3] = 1

for i in range(4, 41):
    f[i] = f[i - 1] + f[i - 4]

p = [0 for x in range(41)]
for i in range(4, 41):
    p[i] = p[i - 1]
    for number in range(f[i - 1] + 1, f[i] + 1):
        if is_prime(number):
            p[i] = p[i] + 1
print(f)
print(p)