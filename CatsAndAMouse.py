def catAndMouse(x, y, z):
    if abs(x - z) == abs(y - z):
        return('Mouse C')
    elif abs(x - z) < abs(y - z):
        return('Cat A')
    else:
        return('Cat B')