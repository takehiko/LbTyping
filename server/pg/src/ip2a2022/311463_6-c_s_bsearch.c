#include <stdio.h>
#include <math.h>
int main(void){
    double x1, x2, mid;
    x1 = 2;
    x2 = 3;
    while (fabs(x2 - x1) > 1.0e-6) {
        mid = (x1 + x2) / 2;
        if ((x1 * x1 - 5) * (mid * mid - 5) < 0) {
            x2 = mid;
        } else {
            x1 = mid;
        }
    }
    printf("x = %f\n", x2);
    return 0;
}
