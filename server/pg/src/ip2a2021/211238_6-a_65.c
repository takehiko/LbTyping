#include <stdio.h>
int main(void){
    int i = 65;
    char c = 'A';
    double d = 65;
    printf("i = %d\n", i);
    printf("c = %d\n", c);
    printf("d = %f\n", d);
    return 0;
}
/* タイピング内容
int i = 65;
char c = 'A';
double d = 65;
printf("i = %d\n", i);
printf("c = %d\n", c);
printf("d = %f\n", d);
 */
/* 補足
   printf("c = %d\n", c);は，変数cの値を整数値として出力するものであり，
   文字として出力したければprintf("c = %c\n", c);と書く．
   printf("i = %d\n", i);の%dを%fに替えたり，
   printf("d = %f\n", d);の%fを%dに替えたりすると，警告が出て，適切な出力にならない．データ型に応じた「%指定」が必要である．
 */
