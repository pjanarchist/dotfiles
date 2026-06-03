#include <stdio.h>
    int main(){
    int num1, num2;
    printf("Enter number: ");
    while(scanf("%d", num2)!=1){
        while(getchar()!= '\n');
    }
    for (num1 = 1; num1 < 100; num1++){
        printf("%d " ,num1*num2);
    }
    return 0;
    }
