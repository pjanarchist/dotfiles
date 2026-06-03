#include <stdio.h>

struct employee {
    char name[32];
    char ID[32];
    float salary;
    
};
int main(){
    struct employee e1 = {"", "", 0};
    printf("Enter name: ");
    scanf("")
    printf("Enter ID: ");
    fgets(e1.ID, 32, stdin);
    printf("Enter salary: $");
    scanf("%f", &e1.salary);

    struct employee e2 = {"", "", 0};
    printf("Enter name: ");
    fgets(e2.name, 32, stdin);
    printf("Enter ID: ");
    fgets(e2.ID, 32, stdin);
    printf("Enter salary: $");
    scanf("%f", &e2.salary);
    
    struct employee e3 = {"", "", 0};
    printf("Enter name: ");
    fgets(e3.name, 32, stdin);
    printf("Enter ID: ");
    fgets(e3.ID, 32, stdin);
    printf("Enter salary: $");
    scanf("%f", &e3.salary);
    
    if (e1.salary > e2.salary | e1.salary > e3.salary){
        printf("%s has highest salary", e1.name);
    }
    else if(e2.salary > e1.salary | e2.salary > e3.salary){
        printf("%s has highest salary", e2.name);
    }
    else{
        printf("%s has highest salary", e3.name);
    }


}