#include <stdio.h>
#include <math.h>
int main(void) {
    int num = 20;
    printf("num = %d\n", num);
    while (num > 1) {
        num = sqrt(num);
        printf("num = %d\n", num);
    }
    return 0;
}
