#include <stdio.h>
#include <math.h>
double distance(double x1, double y1,
                double x2, double y2){
    double dx = fabs(x2 - x1);
    double dy = fabs(y2 - y1);
    return dx + dy;
}
int main(void){
    double x1 = -0.4, y1 = 1.22;
    double x2 = 2.6, y2 = -2.78;
    printf("(%f,%f)-(%f,%f): %f\n",
           x1, y1, x2, y2,
           distance(x1, y1, x2, y2));
    return 0;
}
