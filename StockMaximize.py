prices = [5, 3, 2]

n = len(prices)

result = 0
localMax = -1;
for i in reversed(range(0, n)):
    if prices[i] > localMax:
        localMax = prices[i]
    result = result + localMax - prices[i]

print(result)
