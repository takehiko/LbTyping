# 問題登録サンプル

問題登録ページの動作確認には，以下の情報を使用してください（Paiza.ioのURLを毎回新たに取得するのは避けましょう）。

* 問題ID: 507
* 問題名: Variable
* 動作確認用ソースコード
````
#include <stdio.h>
int main(void){
    int a = 5;
    printf("a = %d\n", a);
    return 0;
}
````
* タイピング内容
````
int a = 5;
printf("a = %d\n", a);
````
* 解説
````
3行目で、変数aを宣言し、値を5で初期化しまします。
4行目で、出力します。「%d」は、そのときの変数aの値の「5」に置き換わるので、出力は「a = 5」になります。
````
* 難易度: easy
* basename: variable
* Paiza.ioのURL: https://paiza.io/projects/e/11kA8AQzQkTEkhSLOYyD_g
  * 失敗確認用(登録済み): https://paiza.io/projects/e/jlDXtiJIwhJnKMYvsZPOdA
  * 失敗確認用(URL不適切): https://paiza.io/projects/11kA8AQzQkTEkhSLOYyD_g
