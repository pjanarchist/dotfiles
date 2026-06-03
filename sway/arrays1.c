#include <stdio.h>
int main(){

   int x,y;
   int num1 [2][3] = {{3, 6}, {8, 11}};
   int num2 [2][3] = {{4, 1}, {5, 8}};

   printf("Display 1st matrix\n");
   for (x=0; x<2; x++){
        for (y=0; y<2;y++){
        printf("%d\t", num1[x][y]);
   }
   printf("\n");
   }
   printf("Display 2nd matrix\n");
   for (x=0; x<2; x++){
        for (y=0; y<2;y++){
        printf("%d\t", num2[x][y]);
   }
   printf("\n");
   }
    return 0;   
    
}