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
(500,'No.1 Hello','#include <stdio.h>\nint main(void){\n    printf("Hello\\n");\n}',50,'hello','タイピングの動作確認用のプログラムです。<br>3行目の途中、「H」を大文字できちんとタイプできましたか？','https://paiza.io/projects/e/ky0Xb0eS5Z6_FuPNMDIHzg');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(501,'No.2 Pangram','#include <stdio.h>\nint main(void){\n    printf("waltz, bad nymph, for quick jigs vex.\\n");\n    return 0;\n}',84,'pangram','このプログラムはprintf(プリントエフ)関数を使って、決まった文字列を出力します。<br><br>1行目の#include&lt;stdio.h&gt;により、printf関数を使用することができます。<br><br>2行目で、mainという、Cのプログラムで最初に実行する関数を宣言しています。<br>mainの前の「int 」と、後ろの「(void)」も、必要です。<br>行の最後の { について、対応する } は5行目の先頭です。{ と } の間に、プログラムが実行する処理を順番に並べます。<br><br>3行目には、実行する処理を記述しており、printf関数で表示する文字を記述します。<br>また、このプログラムで出力する（打ち込んだ）文字列は，すべての英字が1回以上出現しています。<br><br>ところで、3行目と出力を見比べると、3行目の（2つの）「&quot;」と「\n」が出力に現れていません。<br>2つの「&quot;」は、それらで囲まれた中の部分を、文字列とします。<br>次に、「\n」は改行を意味します。このプログラムでは\nがなくても、結果の見た目は変わりませんが、<br>出力時に改行しておくのがよく、もっと複雑なプログラムになると、\nの有無により、結果の表示に影響する<br>こともあります。<br><br>4行目のreturn 0;で、main関数（そしてこのプログラム）の実行は終了となります。','https://paiza.io/projects/e/RFD-sLBc9LpVjAcHnXDW-w');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(502,'No.3 Even-Odd','#include <stdio.h>\nint main(void) {\n    int x = 101;\n\n    if(x % 2 == 1) {\n        printf("Odd number\\n");\n    } else {\n        printf("Even number\\n");\n    }\n    return 0;\n}',112,'evenodd','このプログラムはif(イフ)文を用いて、変数xの値が奇数か偶数かを判定し、その結果を出力します。<br><br>3行目では変数xをint型で宣言し、整数101で初期化しています。<br><br>5行目からのif文で、条件分岐をしています。<br>「if(x % 2 == 1)」は、「xの値を2で割ったときの余りが1と等しいならば」という意味になります。<br>余りが1の場合、printf関数で「Odd number」と出力します。<br>また、else以降はif文の条件を満たさなかったとき、ここではxの値を2で割ったときの余りが1と等しくない（0である）場合に、<br>printf関数で「Even number」と出力します。<br><br>xの値は、このプログラムでは101です。<br>出力には「Odd number」と表示されています。この時、else文の処理は行われていません。','https://paiza.io/projects/e/UbGpyKo64si31wOwlifsZQ');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(503,'No.4 Ten Times','#include <stdio.h>\nint main(void) {\n    int i,u;\n    for (i = 0; i < 10; i++) {\n        printf("wakayama\\n");\n    }\n\n    u = 0;\n    while(u < 10) {\n        printf("daigaku\\n");\n        u++;\n    }\n    return 0;\n}',128,'tentimes','このプログラムはfor(フォー)文とwhile(ホワイル)文を使用して、決まった文字列（wakayamaとdaigaku）を10回ずつ出力します。<br><br>33行目では、整数値をとる変数iとuを宣言しています。<br><br>4行目から6行目までは、forループです。<br>for文の書式は「for(初期化; 条件; 更新) { 処理 }」です。<br>4行目について、初期化により変数iに0を代入します。そして「i++」により、iの値は1増えます（++をインクリメント演算子と<br>いいます）。<br><br>9行目から12行目まではwhileループです。<br>while文の書式は「while(条件式) { 処理 }」です。<br>8行目で変数uに0を代入しておき、11行目の「u++;」を実行するたびに、uの値が1増えます。<br>whileループでuの値が0から9までの間、「daigaku」と改行を出力する処理を行います。「u++」でuの値が10になったとき、<br>「u < 10」の条件判定は偽となり、whileループから抜け出します。','https://paiza.io/projects/e/gelmrLU2f66lr7lUh5T-Mg');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(504,'No.5 Maximum','#include <stdio.h>\nint main(void) {\n    int i;\n    int t[5] = {60, 55, 78, 90, 59};\n    int max;\n\n    for (i = 0; i < 5; i++) {\n        printf("t[%d] = %d\\n", i, t[i]);\n    }\n    max = t[0];\n    for (i = 1; i < 5; i++) {\n        if(t[i] > max) max = t[i];\n    }\n    printf("max = %d\\n", max);\n    return 0;\n}',194,'maximum','このプログラムは、配列に格納された各要素と、要素の中の最大値を出力します。<br><br>3-5行目では、forループに使用する変数i、要素数が5つの整数の配列t、最大値を格納するための<br>変数maxを宣言しています。配列tは、{ }を使用して初期化しています。「}」のあとに、<br>宣言の終わりを示す「;」が必要です。<br><br>7-9行目では、for文を用いて配列tの各要素を出力します。<br><br>10行目では、変数maxにt[0]の値（このプログラムでは60）を代入しています。<br>11行目のfor文では、i=1, 2, 3, 4に対して繰返しの処理を行います。<br>12行目は、t[i]の値が、変数maxの値よりも大きければ、それをmaxの値とします。条件を満たす<br>ときの処理（ここではmax = t[i];）が1つの文なら、前後に「{」と「}」を書かなくても、<br>同じ動作になります。<br>このプログラムでは、i=2のときに変数maxの値は78になり、i=3のときに90になります。<br>それ以外（i=1, 4）のときは、if文の条件式のt[i] &gt; maxは偽と判定されるため、<br>maxへの代入は行われません。<br><br>14行目ではprintf関数を使用して、「max = 」のあとに、変数maxの値（最大値）を出力します。','https://paiza.io/projects/e/2h9ix1XJbZWRZ__mBaPG9w');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(505,'No.6 Triangle Area','#include <stdio.h>\nint main(void) {\n    double bottom = 9.5;\n    double height = 5;\n    double area;\n\n    area = bottom * height / 2;\n    printf("area = %f\\n", area);\n    return 0;\n}',129,'trianglearea','このプログラムは底辺と高さの数値を用いて、三角形の面積を求めます。<br><br>3～5行目では、double型の変数bottom、height、areaを宣言します。<br>またbottomとheightには初期値を指定しており、それぞれ、三角形の<br>底辺と高さとなります。<br><br>7行目では面積の計算を行っています。<br>「底辺×高さ÷2」という、三角形の面積の公式に基づき、結果を<br>変数areaに代入します。<br><br>8行目にprintf関数を呼び出して、面積を出力します。<br>double型の値なので、%dではなく%fを指定します。<br>また%fの指定により、小数点以下はちょうど6桁分を出力します。<br>ですのでこのプログラムの出力は、「area = 23.750000」となります。','https://paiza.io/projects/e/zyZQMcxuB0h3EUFlV6Aveg');
INSERT INTO question(question_id,name,Type_content,count,basename,commentary,url) VALUES
(506,'No.7 Exponent','#include <stdio.h>\ndouble exponent(double x, int n){\n    int i;\n    double t = 1.0;\n    for(i = 1; i <= n; i++){\n        t = t * x;\n    }\n    printf("%.2f\\n", t);\n    return t;\n}\nint main(void){\n    double a = 3.5;\n    int b = 5;\n    printf("%.2f to the %dth power is ", a, b);\n    exponent(a, b);\n    return 0;\n}',207,'exponent','このプログラムは「3.5の5乗」を計算して出力します。<br>べき乗の計算には、自作関数を使用します。<br><br>2-10行目は自作関数のexponentの定義です。2行目を見ると、<br>double型のxとint型のnを引数にとり、double型の値を返すのが<br>わかります。<br>変数tを1.0に初期化してから、5-7行目で、for文を用いてn回、<br>xを掛けてtの値を更新します。<br>forループを終えたときのtの値が、xのn乗となります。8行目で<br>それを出力し、9行目のreturn文で値を返します。<br><br>11-17行目はmain関数です（これも自作関数です）。<br>double型の変数aは3.5、int型の変数bは5として、それぞれ初期化<br>します。<br>14行目のprintf関数では、「3.50 to the 5th power is 」の<br>ところを出力します。aの値の出力は、「%.2f」と指定することで、<br>小数第2位までにしています。<br>15行目でexponent関数の呼び出しを行い、この中で「525.22」を<br>出力します。8行目には「%.2f」とあり、ここでも小数第2位<br>までです（四捨五入せずに、3.5の5乗を計算すると525.21875に<br>なります）。<br><br>このプログラムの出力は、「3.50 to the 5th power is 525.22」<br>となります。','https://paiza.io/projects/e/jlDXtiJIwhJnKMYvsZPOdA');
