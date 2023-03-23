#include <stdio.h>
int main(void) {
    int y = 1999, m = 12, d = 31;
    int a = y + y / 4 - y / 100 + y / 400;
    int b = (13 * m + 8) / 5;
    int c = (a + b + d) % 7;
    printf("%d\n", c);
    return 0;
}
