#include <stdio.h>

  void Options(){
    printf("1. Student Details.\n");
    printf("2. Update Marks.\n");
    printf("3. Change Username.\n");
    printf("4. Feature Coming Soon.\n");
    printf("5. Exit\n");
   }
  int Details(char name[64], int mark){
    printf("%s", name);
    printf("C School of Procedural\n");
    printf("Marks: %d", mark);
    return 0;
  }
  int main(){
    
    char name[64];
    int opt;
    int mark = 0;

    printf("Hello, please enter name to continue: ");
    fgets(name, 64, stdin);
    printf("Hello %s", name);
    printf("Welcome to C Students Account. Select option to continue.\n");
    Options();
    scanf("%d", &opt);
    switch(opt){
      case 1: Details(name, mark);
    }
    return 0;
}