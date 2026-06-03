#include <stdio.h>

struct phone {
    char name[32];
    char opSys[32];
    float price;
    int ram;
};

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
    struct phone p1 = {"Samsung S21", "Android", 799.99, 8};

    printf("Name: %s\n", p1.name);
    printf("OS: %s\n", p1.opSys);
    printf("Price: $%.2f\n", p1.price);
    printf("RAM: %d GB\n", p1.ram);

    return 0;
}