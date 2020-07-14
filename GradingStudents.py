def gradingStudents(grades):
    # Write your code here
    results = []
    for grade in grades:
        if (grade < 38) | (grade % 5 < 3):
            results.append(grade)
        else:
            results.append(((grade + 2) // 5) * 5)
    return results