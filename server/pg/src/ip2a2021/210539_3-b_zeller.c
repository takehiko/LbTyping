#include <stdio.h>
int main(void){
    int year = 1999, month = 12, day = 31;
    int y = year + year / 4 - year / 100 + year / 400;
    int m = (13 * month + 8) / 5;
    int dow = (y + m + day) % 7;
    printf("%d\n", dow);
    return 0;
}
/* タイピング内容
int year = 1999, month = 12, day = 31;
int y = year + year / 4 - year / 100 + year / 400;
int m = (13 * month + 8) / 5;
int dow = (y + m + day) % 7;
 */
/* 関連情報
   ウィキペディア日本語版「ツェラーの公式」 https://ja.wikipedia.org/wiki/%E3%83%84%E3%82%A7%E3%83%A9%E3%83%BC%E3%81%AE%E5%85%AC%E5%BC%8F
 */
/* 補足
   授業では dow = (year + year / 4 - year / 100 + year / 400 + (13 * month + 8) / 5 + day) % 7; という長い式で変数dowに代入している。
   出力は1個の数字で、0なら日曜日、1なら月曜日、...を表し、このプログラムでは「5」なので、1999年12月31日は金曜日となる。
   このプログラムでは、monthの値が1または2のとき、正しい曜日を出力しない。
 */
