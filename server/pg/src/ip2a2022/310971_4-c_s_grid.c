#include <stdio.h>
int main(void){
    int i;
    int n = 0, x = 0, y = 0;

    for (i = 1; i <= 15; i++) {
        printf("%d: (%d, %d)\n", i, x, y);
        if (y == n) {
            n++;
            y = 0;
            x = n;
        } else {
            y++;
            x--;
        }
    }

    return 0;
}
