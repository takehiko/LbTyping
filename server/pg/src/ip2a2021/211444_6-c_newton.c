#include <stdio.h>
#include <math.h>
int main(void){
    double x1, x2;
    x1 = 2;
    x2 = 3;
    while (fabs(x2 - x1) > 1.0e-6) {
        x1 = x2;
        x2 = x1 - (x1 * x1 - 5) / (2 * x1);
    }
    printf("x = %f\n", x2);
    return 0;
}
/* タイピング内容
ソースコードすべて
 */
/* 補足
   ニュートン法と呼ばれるアルゴリズムを用いて，5の平方根の近似解を求める．
   f(x1) = x1 * x1 - 5とおいたとき，f(x1)=0（を満たすx1の一つ）を求める
   ことになる．f'(x1) = 2 * x1も式に出現する．
   「while (fabs(x2 - x1) > 1.0e-6)」は「x2とx1の差が10の-6乗（百万分の1）
   よりも大きい間，繰り返す」を意味する．fabsはdouble型の値の絶対値を
   求める標準関数であり，#include <math.h>を書くことで使用できる．
 */
