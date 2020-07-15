def isHappy(b):
    n = len(b)
    if n == 1:
        return False
    if (not b[0] == b[1]) | (not b[n - 1] == b[n - 2]):
        return False
    for i in range(1, n - 1):
        if (not b[i] == b[i - 1]) & (not b[i] == b[i + 1]):
            return False
    return True

def happyLadybugs(b):
    if isHappy(b):
        return 'YES'

    c_ = 0
    count = [0 for x in range(0, 30)]
    for _ in b:
        if _ == '_':
            c_ += 1
        else:
            count[ord(_) - 65] += 1
    
    if c_ == 0:
        return 'NO'
    for i in range(0, 30):
        if count[i] == 1:
            return 'NO'
        
    return 'YES'