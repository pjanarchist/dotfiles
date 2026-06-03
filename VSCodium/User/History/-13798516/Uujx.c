#include <stdio.h>

    char name[64];
    int opt;
    int newMark = 0;
    int ui = 1;

  void Options(){
    printf("1. Student Details.\n");
    printf("2. Update Marks.\n");
    printf("3. Change Username.\n");
    printf("4. Feature Coming Soon.\n");
    printf("5. Exit\n");
   }
  int Details(){
    printf("%s", name);
    printf("C School of Procedural\n");
    printf("Marks: %d\n", newMark);
    return 0;
  }
  int Update(){
    printf("Please Enter New Mark: ");
    scanf("%d", &newMark);
    if (newMark < 0 || newMark > 100){
      printf("Error. Mark Should Be form 0 - 100\n");
    }
    else{
      printf("New Mark is : %d\n", newMark);
      newMark = mark;
    }
    return 0;
  }
  int main(){   int newMark = 0;
    

    printf("Hello, please enter name to continue: ");
    fgets(name, 64, stdin);
    printf("Hello %s", name);
    printf("Welcome to C Students Account. \nSelect option to continue.\n");

    while(ui){
      Options();
      scanf("%d", &opt);
      switch(opt){
        case 1: Details();
        break;
        case 2: Update();
        break;
        case 3: ;
        break;
        case 4: printf("Coming Soon");
        break;
        case 5: return 0;
        break;
      }
    }
    return 0;
}