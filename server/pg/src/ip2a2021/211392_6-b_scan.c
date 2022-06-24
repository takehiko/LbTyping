#include <stdio.h>
int main(void){
    int i, p = 0;
    char s[20] = " WAKAYAMADAIGAKUMAE";
    char c = 'A';
    for (i = 1; i <= 18; i++) {
        if (s[i] == c) {
            printf("%d ", i - p);
            p = i;
        }
    }
    printf("\n");
    return 0;
}
/* タイピング内容
char s[20] = " WAKAYAMADAIGAKUMAE";
char c = 'A';
for (i = 1; i < 20; i++) {
    if (s[i] == c) {
        printf("%d ", i - p);
        p = i;
    }
}
 */
/* 補足
  Aの出現位置を求める．出力の「2 2 2 2 2 3 4」は，「最初は2文字目」「その2文字あと」「その2文字あと」「その2文字あと」「その2文字あと」「その3文字あと」「その4文字あと」にAが出現するという意味になる．
  printf("%d ", i - p);をprintf("%d ", i);に変更すると，先頭から何文字目に出現するのかを順に出力する．
  forループでiの値は1ずつ増える．それに対しpの値は，s[i]とcが等しいときにiになり，そうでないときは変わらない．
 */
