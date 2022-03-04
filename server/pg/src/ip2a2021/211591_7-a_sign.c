#include <stdio.h>
int sign(int n){
    return (n > 0) - (n < 0);
}
int main(void){
    printf("%d\n", sign(-333));
    printf("%d\n", sign(-1 + 2));
    printf("%d\n", sign(0.0));
    return 0;
}
/* タイピング内容
int sign(int n){
    return (n > 0) - (n < 0);
}
printf("%d\n", sign(-1 + 2));
 */
