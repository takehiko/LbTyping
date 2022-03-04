#include <stdio.h>
int main(void){
    int a[100];
    int i, j;

    for (i = 0; i < 100; i++) {
        a[i] = 0;
    }

    for (i = 2; i < 100; i++) {
        if (a[i] == 0) {
            printf("%d ", i);
            for (j = i * 2; j < 100; j = j + i) {
                a[j] = 1;
            }
        }
    }
    printf("\n");

    return 0;
}
/* タイピング内容
for (i = 2; i < 100; i++) {
    if (a[i] == 0) {
        printf("%d ", i);
        for (j = i * 2; j < 100; j = j + i) {
            a[j] = 1;
        }
    }
}
 */
/* 補足
   100未満の素数を小さいものから順に出力する
   授業で作成したプログラムから内側のforループを変更したもの
   授業は
        for (j = 2; i * j < 100; j++) {
            a[i * j] = 1;
        }
 */
