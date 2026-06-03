#include <stdio.h>
struct employee {
  char name[32];
  char addr[32];
  char phone[32];
  float salary;

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
  

    struct employee e1 = {"James", "13 Avenue", "0786631098"};

    printf("Name: %s\n", e1.name);
    printf("Address: %s\n", e1.addr);
    printf("Phone: %s\n", e1.phone);
    printf("Office Number: %s\n", e1.phone);

  struct employee e2 = {"Albert", "13 Cornberry", "0786673091"};

    printf("Name: %s\n", e2.name);
    printf("Address: %s\n", e2.addr);
    printf("Phone: %s\n", e2.phone);
    printf("Office Number: %s\n", e1.phone);

    return 0;

    return 0;
}