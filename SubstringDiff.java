import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {


    // Complete the substringDiff function below.
    static int[][] f;
    static int n;

    static Boolean found(int len, int k) {
        for (int i = len; i <= n; i++)
            for (int j = len; j <= n; j++)
                if (f[i][j] - f[i - len][j - len] <= k) 
                    return true;
        return false;
    }

    static int substringDiff(int k, String s1, String s2) {
        n = s1.length();
        f = new int[n + 5][n + 5];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    f[i + 1][j + 1] = f[i][j];
                } else {
                    f[i + 1][j + 1] = f[i][j] + 1;
                }
            }
        int low = 0;
        int high = n;
        int mid;
        while (low < high) {
            mid = (low + high + 1) / 2;
            if (found(mid, k))
                low = mid;
            else
                high = mid - 1;
        }

        return low;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int t = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int tItr = 0; tItr < t; tItr++) {
            String[] kS1S2 = scanner.nextLine().split(" ");

            int k = Integer.parseInt(kS1S2[0]);

            String s1 = kS1S2[1];

            String s2 = kS1S2[2];

            int result = substringDiff(k, s1, s2);

            bufferedWriter.write(String.valueOf(result));
            bufferedWriter.newLine();
        }

        bufferedWriter.close();

        scanner.close();
    }
}
