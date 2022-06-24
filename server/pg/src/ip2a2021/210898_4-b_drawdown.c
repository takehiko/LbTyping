#include <stdio.h>
#include <stdlib.h>
int main(void){
    int num = 20;
    printf("num = %d\n", num);
    while (num > 0) {
        num = num - rand() % 5 - 1;
        printf("num = %d\n", num);
    }
    return 0;
}
/* タイピング内容
while (num > 0) {
    num = num - rand() % 5 - 1;
    printf("num = %d\n", num);
}
 */
/* 補足
「num = 20」から始まって数を減らしていく．6行目は「numの値が0より大きい間，繰り返す」であり，「numの値が0以下になったら，繰り返しの処理を終える」に言い換えられる．
1回に減る数は，1から5までのランダム．「rand()」で乱数を生成する（授業では第7回で使用する予定）．ただしこのプログラムでは，rand関数を呼び出すたびに，どの値が返ってくるかは，決まっている．
 */
