import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        int count = 0;
        String word = "wakayama";
        for (int i = 0; i < word.length(); i++) {
            if (word.charAt(i) == 'a')
                count++;
        }
        System.out.println("a:" + count);
    }
}
