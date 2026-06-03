#include <X11/Xlib.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
    Display *display = XOpenDisplay(NULL);
    if (!display) {
        printf("Cannot open display\n");
        return 1;
    }

    int screen = DefaultScreen(display);

    Window window = XCreateSimpleWindow(
        display,
        RootWindow(display, screen),
        100, 100,          // x, y
        600, 400,          // width, height
        1,
        BlackPixel(display, screen),
        WhitePixel(display, screen)
    );

    XSelectInput(display, window, ExposureMask | KeyPressMask);
    XMapWindow(display, window);

    XEvent event;

    while (1) {
        XNextEvent(display, &event);

        if (event.type == Expose) {
            XFillRectangle(
                display, window,
                DefaultGC(display, screen),
                50, 50, 200, 100
            );
        }

        if (event.type == KeyPress)
            break;
    }

    XDestroyWindow(display, window);
    XCloseDisplay(display);
    return 0;
}