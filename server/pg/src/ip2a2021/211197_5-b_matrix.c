#include <stdio.h>
int main(void){
    int a[3][3] = { { 1, -2, 3 }, { 0, -3, 0 }, { 2, 1, -1 } };
    int b[3][3] = { { 1, -2, 3 }, { 0, -3, 0 }, { 2, 1, -1 } };
    int c[3][3];
    int i, j, k;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            c[i][j] = 0;
            for (k = 0; k < 3; k++) {
                c[i][j] = c[i][j] + a[i][k] * b[k][j];
            }
        }
    }
    printf("%d\n", c[2][2]);
    return 0;
}
/* タイピング内容
int i, j, k;
for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
        c[i][j] = 0;
        for (k = 0; k < 3; k++) {
            c[i][j] = c[i][j] + a[i][k] * b[k][j];
        }
    }
}
 */
/* 補足
   行列の積の定義に基づいて，3行3列のある行列の2乗を計算し，
   その右下成分の値を出力する
 */
