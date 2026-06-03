#include <stdio.h>
    int main(){
    int num1;
    printf("Enter number: ");
    while(scanf("%d", num1)!=1){
        while(getchar()!= '\n');
    }
    for (num1; num1 < 100; num1++){
        printf("%d " ,num1*5);
    }
    return 0;
    }
