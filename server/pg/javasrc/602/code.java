int count = 0;
String word = "wakayama";
for (int i = 0; i < word.length(); i++) {
    if (word.charAt(i) == 'a')
        count++;
}
System.out.println("a:" + count);
