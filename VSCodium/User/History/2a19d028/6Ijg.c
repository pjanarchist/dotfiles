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
    printf("Enter ID: ");
    fgets(e1.ID, 32, stdin);
    printf("Enter salary: ");
    scanf("%f", &e1.salary);

    struct employee e2 = {"", "", 0};
    printf("Enter name: ");
    fgets(e2.name, 32, stdin);
    printf("Enter ID: ");
    fgets(e2.ID, 32, stdin);
    printf("Enter salary: ");
    scanf("%f", &e2.salary);
    
    
}