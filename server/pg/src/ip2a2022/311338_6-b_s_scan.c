#include <stdio.h>
int main(void){
    int i;
    char s[19] = "WAKAYAMADAIGAKUMAE";
    char c = 'A';
    for (i = 0; i <= 17; i++) {
        if (s[i] == c) {
            printf("%d ", i + 1);
        }
    }
    printf("\n");
    return 0;
}
