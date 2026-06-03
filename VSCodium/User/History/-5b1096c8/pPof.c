#include <stdio.h>
    int main(){
        float num1;
        float num2;
        float sum;
        printf("Enter first number: ");
        scanf("%f", &num1);
        printf("Enter second number: ");
        scanf("%f", &num2);

        sum = num1+num2;
        int difference = num1-num2;
        int product = num1-num2;
        int div = num1/num2;

        printf("Sum is %f\n", sum);
        printf("Difference is %f\n", difference);
        printf("Product is %f\n", product);
        printf("Quotient is %.2f\n", div);
    }
