#include <stdio.h>

int score[] = {0, 0, 0, 0, 0};
char student [5][32] = {"", "", "", "", ""};
int options1;
int options2;


struct student{
  char name[32];
  int score;
  int bonus;
};

void NameEntry(){
  printf("Enter Student 1's name: ");
  scanf("%s", student[0]);
  printf("Enter Student 2's name: ");
  scanf("%s", student[1]);
  printf("Enter Student 3's name: ");
  scanf("%s", student[2]);
  printf("Enter Student 4's name: ");
  scanf("%s", student[3]);
  printf("Enter Student 5's name: ");
  scanf("%s", student[4]);
}
void Options(){
  printf("Please select an option to proceed: \n");
  printf("1. View Score\n");
  printf("2. Change A students name\n");
  printf("3. Edit score\n");
  printf("4. Back\n");
}
void StudentsList(){
  printf("1. %s\n", student[0]);
  printf("2. %s\n", student[1]);
  printf("3. %s\n", student[2]);
  printf("4. %s\n", student[3]);
  printf("5. %s\n", student[4]);
}

int main(){

  NameEntry();
  printf("Select students records to edit: \n");
  StudentsList();
  printf("6. Back");
  scanf("%d", &options1);

  switch(options1){
    case 1: printf("You've Chosen %s", student[0]);
            Options();
            switch(options2){
              case 1: printf("Score is : %d", score[0]);
              break;
              case 2: printf("Enter new name: \n");
                      scanf("%s", student[0]);
                      printf("New name is: %s", student[0]);
              break;
              case 3: printf("Enter new score: \n");
                      scanf("%d", &score[0]);
                      printf()
                
            }
                
    break;
    case 2: printf("You've Chosen %s", student[1]);
    break;
    case 3: printf("You've Chosen %s", student[2]);
    break;
    case 4: printf("You've Chosen %s", student[3]);
    break;
    case 5: printf("You've Chosen %s", student[4]);
    break;
    case 6: return 0;
    break;
  }

}