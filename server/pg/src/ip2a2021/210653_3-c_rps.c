#include <stdio.h>
int main(void){
    int left = 2;
    int right = 0;
    int judge = (right - left + 3) % 3;
    if (judge == 0) {
      printf("Draw.\n");
    }
    if (judge == 1) {
      printf("Right won!\n");
    }
    if (judge == 2) {
      printf("Left won!\n");
    }
    return 0;
}
/* タイピング内容
int left = 2;
int right = 0;
int judge = (right - left + 3) % 3;
if (judge == 0) {
  printf("Draw.\n");
}
if (judge == 1) {
  printf("Right won!\n");
}
if (judge == 2) {
  printf("Left won!\n");
}
 */
/* 補足
   左手と右手でジャンケンをする。値は0（グー）、1（パー）、2（チョキ）のいずれか。
   変数judgeにはジャンケンの勝敗が格納され、0なら引き分け、1なら右手の勝ち、2なら左手の勝ち。3つのif文のうちどれかちょうど一つが真と判定されて出力する。
   「(right - left + 3) % 3」の「+ 3」がないと、right - leftの値がマイナスになり、負の数の剰余演算は（C言語では）都合が悪い。「+ 3」を入れることで解消を図っている。
 */
