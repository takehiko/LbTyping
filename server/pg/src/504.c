#include <stdio.h>
int main(void) {
    int i;
    int t[5] = {60, 55, 78, 90, 59};
    int max;

    for (i = 0; i < 5; i++) {
        printf("t[%d] = %d\n", i, t[i]);
    }
    max = t[0];
    for (i = 1; i < 5; i++) {
        if(t[i] > max) max = t[i];
    }
    printf("max = %d\n", max);
    return 0;
}
