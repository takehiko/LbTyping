#include <stdio.h>
int main(void){
    int a[100];
    int i, j;

    for (i = 0; i < 100; i++) {
        a[i] = 0;
    }

    for (i = 2; i < 100; i++) {
        if (!a[i]) {
            printf("%d ", i);
            for (j = 2; i * j < 100; j++) {
                a[i * j] = 1;
            }
        }
    }
    printf("\n");

    return 0;
}
