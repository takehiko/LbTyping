import java.util.*;
import java.net.*;
public class Main {
    public static void main(String[] args) throws Exception {
        URL u = new URL("http://example.com/");
        HttpURLConnection con = (HttpURLConnection)u.openConnection();
        con.setRequestMethod("GET");
        con.connect();
        System.out.println("RESPONSE CODE " + con.getResponseCode());
    }
}
