#include <stdio.h>
int main(void){
    int a[3][3] = { { 1, -2, 3 }, { 0, -3, 0 }, { 2, 1, -1 } };
    int b[3][3] = { { 1, -2, 3 }, { 0, -3, 0 }, { 2, 1, -1 } };
    int c[3][3] = { 0 };
    int i, j, k;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            for (k = 0; k < 3; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    printf("%d\n", c[2][2]);
    return 0;
}
