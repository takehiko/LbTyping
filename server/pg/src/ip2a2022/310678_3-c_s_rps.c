#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int left = 2;
    int right = 0;

    int judge = right - left;
    if (judge == -2) {
        printf("Right won!\n");
    }
    if (judge == -1) {
        printf("Left won!\n");
    }
    if (judge == 0) {
        printf("Draw.\n");
    }
    if (judge == 1) {
        printf("Right won!\n");
    }
    if (judge == 2) {
        printf("Left won!\n");
    }

    return 0;
}
