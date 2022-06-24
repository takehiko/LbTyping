#include <stdio.h>
int main(void){
    int a = 7;
    printf("a = %d\n", a);
    a = a + 1;
    printf("a = %d\n", a);
    return 0;
}
/* タイピング内容
int a = 7;
printf("a = %d\n", a);
a = a + 1;
 */
/* 補足
   解説に、a = a + 1; は a++; または ++a; に置き換えても同じ動作になることを書いてよい。
 */
