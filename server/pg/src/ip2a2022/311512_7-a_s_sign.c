#include <stdio.h>
#include <stdlib.h>
int sign(int n){
    if (n == 0) return 0;
    return n / abs(n);
}
int main(void){
    printf("%d\n", sign(-333));
    printf("%d\n", sign(-1 + 2));
    printf("%d\n", sign(0.0));
    return 0;
}
