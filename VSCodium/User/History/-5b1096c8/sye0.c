#include <stdio.h>
    int main(){
    int num1, num2;
    printf("Enter number: ");
    while(scanf("%d", num2)!=1){
        printf("Must be a number\n");
        while(getchar()!= '\n');
    }
    printf("%d", num2);
    return 0;
    }
