#include <stdio.h>
void printarray(int a[8]){
    int i;
    for (i = 0; i < 8; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");
}
void parity(int a[8]){
    int i, b = 0;
    for (i = 0; i < 7; i++) {
        b = (b + a[i]) % 2;
    }
    a[7] = b;
}
int main(void){
    int a[8] = {0, 0, 1, 0, 0, 1, 1, 999};
    printarray(a);
    parity(a);
    printarray(a);
    return 0;
}
/* タイピング内容
void parity(int a[8]){
    int i, b = 0;
    for (i = 0; i < 7; i++) {
        b = (b + a[i]) % 2;
    }
    a[7] = b;
}
 */
