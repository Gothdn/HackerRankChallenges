def beautifulDays(i, j, k):
    count = 0
    for number in range (i, j + 1):
        reversed_number = int(str(number)[::-1])
        if abs(number - reversed_number) % k == 0:
            count += 1
    return(count)