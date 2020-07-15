def legoBlocks(n, m):
    MODULO = 1000000007
    f = [0 for x in range(0, m + 5)]
    f[0] = 1
    f[1] = 1
    f[2] = 2
    f[3] = 4
    for i in range(4, m + 1):
        f[i] = (f[i - 1] + f[i - 2] + f[i - 3] + f[i - 4]) % MODULO

    all_ways = [0 for x in range(0, m + 5)]
    for i in range(0, m + 1):
        all_ways[i] = pow(f[i], n, MODULO)
        
    nonsplitted_ways = [0 for x in range(0, m + 5)]
    nonsplitted_ways[0] = 1
    nonsplitted_ways[1] = 1
    for i in range(2, m + 1):
        nonsplitted_ways[i] = all_ways[i]
        for j in range(1, i):
            nonsplitted_ways[i] = (nonsplitted_ways[i] + MODULO - (nonsplitted_ways[i - j] * all_ways[j]) % MODULO) % MODULO
    
    return(nonsplitted_ways[m])