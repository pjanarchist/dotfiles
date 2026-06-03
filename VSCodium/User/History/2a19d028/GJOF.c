#include <stdio.h>

struct employee {
    char name[32];
    char ID[32];
    float salary;
    
};
int main(){
    struct employee e1 = {"", "", 0};
    printf("Enter name: ");
    fgets(e1.name, 32, stdin);
    printf("Enter name: ");
    fgets(e1.name, 32, stdin);
    
    
}