CREATE TABLE question (
    question_id  SERIAL NOT NULL,
    name         VARCHAR(30) UNIQUE,
    Type_content text     NOT NULL,
    count        int      DEFAULT 0,
    difficulty   VARCHAR(10)     DEFAULT 'NONE',
    basename     text     DEFAULT '',
    commentary   text     DEFAULT '',
    url          text     DEFAULT '',

    PRIMARY KEY (question_id)
);

CREATE TABLE response (
   response_id  SERIAL NOT NULL,
   student_id   int  NOT NULL,
   question_id  int  NOT NULL,
   start_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   finish_at    TIMESTAMP WITH TIME ZONE,
   miss_count   int  DEFAULT 0,
   note         TEXT DEFAULT '',

   PRIMARY KEY (response_id),
   FOREIGN KEY (question_id)
   REFERENCES  question (question_id)

);

INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(601,'No.1 Hello','import java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        System.out.println("Hello");\n    }\n}',114,'hello','「Hello」だけを出力するプログラムです。<br>Main・String・Exception・Systemはいずれもクラス名です。大文字で始めるのがJavaの慣習です。','https://paiza.io/projects/e/0d0XpJf7lYlRQsauF86VyA'),
(602,'No.2 Counting Character','import java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        int count = 0;\n        String word = "wakayama";\n        for (int i = 0; i < word.length(); i++) {\n            if (word.charAt(i) == ''a'')\n                count++;\n        }\n        System.out.println("a:" + count);\n    }\n}',214,'countingcharacter','「wakayama」という文字列に、「a」の文字が何回出現するかを求めます。<br>word.charAt(i)は、C言語のword[i]に相当します。','https://paiza.io/projects/e/CKjx2Sn_vFz-xALS9Djqew'),
(603,'No.3 HTTP Access','import java.util.*;\nimport java.net.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        URL u = new URL("http://example.com/");\n        HttpURLConnection con = (HttpURLConnection)u.openConnection();\n        con.setRequestMethod("GET");\n        con.connect();\n        System.out.println("RESPONSE CODE " + con.getResponseCode());\n    }\n}',296,'httpaccess','http://example.com/にアクセスして、レスポンスヘッダの中のステータスコードを出力します。<br>変数uには、java.net.URLクラスのインスタンスが、また変数conは、java.net.HttpURLConnection<br>クラスのインスタンスが、それぞれ代入されます。','https://paiza.io/projects/e/qrriS_pxRCfHmfMPewJeoQ');
