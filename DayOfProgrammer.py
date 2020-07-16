def dayOfProgrammer(year):
    if year == 1918:
        return ('26.09.1918')
    elif ((year < 1918) & (year % 4 == 0)) | ((year > 1918) & ((year % 400 == 0) | ((year % 4 == 0) & (year % 100 != 0)))):
        return('12.09.' + str(year))
    else:
        return('13.09.' + str(year))