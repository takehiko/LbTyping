#include <stdio.h>
double exponent(double x, int n){
    int i;
    double t = 1.0;
    for(i = 1; i <= n; i++){
        t = t * x;
    }
    printf("%.2f\n", t);
    return t;
}
int main(void){
    double a = 3.5;
    int b = 5;
    printf("%.2f to the %dth power is ", a, b);
    exponent(a, b);
    return 0;
}
