#include "raylib.h"
#include <stdlib.h>
#include <time.h>

#define COLS 10
#define ROWS 20
#define BLOCK 30

typedef struct {
    int x, y;
} Point;

int field[ROWS][COLS] = {0};

// 7 tetrominoes (4 rotations simplified into fixed shapes)
int shapes[7][4][4][4] = {
    // I
    {{{0,0,0,0},{1,1,1,1},{0,0,0,0},{0,0,0,0}}},
    // O
    {{{0,1,1,0},{0,1,1,0},{0,0,0,0},{0,0,0,0}}},
    // T
    {{{0,1,0,0},{1,1,1,0},{0,0,0,0},{0,0,0,0}}},
    // S
    {{{0,1,1,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}}},
    // Z
    {{{1,1,0,0},{0,1,1,0},{0,0,0,0},{0,0,0,0}}},
    // J
    {{{1,0,0,0},{1,1,1,0},{0,0,0,0},{0,0,0,0}}},
    // L
    {{{0,0,1,0},{1,1,1,0},{0,0,0,0},{0,0,0,0}}}
};

typedef struct {
    int type;
    int x, y;
} Piece;

Piece current;

int CheckCollision(Piece p) {
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (shapes[p.type][0][i][j]) {
                int nx = p.x + j;
                int ny = p.y + i;

                if (nx < 0 || nx >= COLS || ny >= ROWS) return 1;
                if (ny >= 0 && field[ny][nx]) return 1;
            }
        }
    }
    return 0;
}

void LockPiece() {
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (shapes[current.type][0][i][j]) {
                field[current.y + i][current.x + j] = 1;
            }
        }
    }
}

void SpawnPiece() {
    current.type = rand() % 7;
    current.x = 3;
    current.y = 0;
}

void ClearLines() {
    for (int i = 0; i < ROWS; i++) {
        int full = 1;
        for (int j = 0; j < COLS; j++) {
            if (!field[i][j]) full = 0;
        }

        if (full) {
            for (int k = i; k > 0; k--) {
                for (int j = 0; j < COLS; j++) {
                    field[k][j] = field[k-1][j];
                }
            }
        }
    }
}

void DrawField() {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            if (field[i][j]) {
                DrawRectangle(j*BLOCK, i*BLOCK, BLOCK, BLOCK, BLUE);
            }
        }
    }
}

void DrawPiece() {
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (shapes[current.type][0][i][j]) {
                DrawRectangle((current.x+j)*BLOCK, (current.y+i)*BLOCK, BLOCK, BLOCK, RED);
            }
        }
    }
}

int main() {
    srand(time(NULL));

    InitWindow(COLS*BLOCK, ROWS*BLOCK, "Tetris - Raylib");
    SetTargetFPS(60);

    SpawnPiece();

    float timer = 0;
    float delay = 0.5f;

    while (!WindowShouldClose()) {
        timer += GetFrameTime();

        // input
        Piece temp = current;

        if (IsKeyDown(KEY_LEFT)) temp.x--;
        if (IsKeyDown(KEY_RIGHT)) temp.x++;
        if (IsKeyDown(KEY_DOWN)) temp.y++;

        if (!CheckCollision(temp)) current = temp;

        // auto drop
        if (timer > delay) {
            temp = current;
            temp.y++;

            if (!CheckCollision(temp)) {
                current = temp;
            } else {
                LockPiece();
                ClearLines();
                SpawnPiece();
            }

            timer = 0;
        }

        BeginDrawing();
        ClearBackground(BLACK);

        DrawField();
        DrawPiece();

        EndDrawing();
    }

    CloseWindow();
    return 0;
}