def viralAdvertising(n):
    shared = 5
    result = 0
    for i in range(0, n):
        liked = shared // 2
        result += liked
        shared = liked * 3
    return(result)