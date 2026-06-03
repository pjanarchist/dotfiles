#include <stdio.h>
struct employee {
  char name[32];
  char addr[32];
  char phone[32];
  float salary;
  int age

}
;

int main() {

//   char name[32];
//   char item;
//   char item1;
//   char item2;
//   char item3;
//   printf("Enter Name: ");
//   scanf("%s", name);
//   printf("Hello %s. Please enter i", name);
// return 0;
  

    struct employee e1 = {"James Albe", "13 Avenue", "0786631098", 12552.90};

    printf("Name: %s\n", e1.name);
    printf("Address: %s\n", e1.addr);
    printf("Phone: %s\n", e1.phone);
    printf("Salary: $%.2f\n", e1.salary);

  struct employee e2 = {"Albert Robertson", "301 Cornberry", "0786673091", 41414.22};

    printf("Name: %s\n", e2.name);
    printf("Address: %s\n", e2.addr);
    printf("Phone: %s\n", e2.phone);
    printf("Salary: %.2f\n", e2.salary);
  
    struct employee e3 = {"Robert Jameson", "9713 Countryside", "0801390759", 1398.22};

    printf("Name: %s\n", e3.name);
    printf("Address: %s\n", e3.addr);
    printf("Phone: %s\n", e3.phone);
    printf("Salary: %.2f\n", e3.salary);

    return 0;

    return 0;
}