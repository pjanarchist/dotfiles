#include <stdio.h>
#include <string.h>

int main() {
    char password[100];

    printf("Enter password: ");
    scanf("%99s", password);

    if (strcmp(password, "123") == 0) {
        printf("Access granted\n");
    } else {
        printf("Access denied\n");
    }

    return 0;
}