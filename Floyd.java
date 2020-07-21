import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException{
        int MAX_V = 1000000009;
        String[] roadNodesEdges = scanner.nextLine().split(" ");
        int n = Integer.parseInt(roadNodesEdges[0].trim());
        int m = Integer.parseInt(roadNodesEdges[1].trim());

        int x, y, d;
        int[][] dist = new int[n + 5][n + 5];
        n++;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dist[i][j] = MAX_V;

        for (int i = 0; i < n; i++)
            dist[i][i] = 0;

        for (int i = 0; i < m; i++) {
            String[] roadFromToWeight = scanner.nextLine().split(" ");
            x = Integer.parseInt(roadFromToWeight[0].trim());
            y = Integer.parseInt(roadFromToWeight[1].trim());
            d = Integer.parseInt(roadFromToWeight[2].trim());
            dist[x][y] = d;
        }


        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (dist[i][j] > dist[i][k] + dist[k][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][j] == MAX_V)
                    dist[i][j] = -1;

        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int q = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int qItr = 0; qItr < q; qItr++) {
            String[] xy = scanner.nextLine().split(" ");

            x = Integer.parseInt(xy[0]);
            y = Integer.parseInt(xy[1]);
            bufferedWriter.write(String.valueOf(dist[x][y]));
            bufferedWriter.newLine();
        }
        
        bufferedWriter.close();
        scanner.close();
    }
}
