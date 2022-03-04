#include <stdio.h>
int main(void){
    int hour1 = 10, min1 = 55;
    int hour2 = 11, min2 =  3;
    if ((hour2 * 60 + min2) - (hour1 * 60 + min1) <= 10) {
        printf("Take a bike.\n");
    } else {
        printf("Let's walk.\n");
    }
    return 0;
}
/* タイピング内容
if ((hour2 * 60 + min2) - (hour1 * 60 + min1) <= 10) {
    printf("Take a bike.\n");
} else {
    printf("Let's walk.\n");
}
 */
/* 補足
第3回授業資料の「10分で到着する必要があるなら、自転車に乗る。そうでないなら、徒歩で行く。」をプログラムにしたもの．
hour1とmin1が現在時刻（時・分），hour2とmin2が到着予定時刻を表す．
このプログラムの出力は「Take a byke.」であるが，min2の値を6に変更すると（11分あるので）「Let's walk.」に変わる．
 */
