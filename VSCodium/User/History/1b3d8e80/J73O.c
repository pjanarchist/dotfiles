#include <X11/Xlib.h>
#include <stdio.h>

int main() {
    Display *display = XOpenDisplay(NULL);
    if (!display) return 1;

    int screen = DefaultScreen(display);

    Window window = XCreateSimpleWindow(
        display,
        RootWindow(display, screen),
        100, 100,
        600, 400,
        1,
        BlackPixel(display, screen),
        WhitePixel(display, screen)
    );

    XSelectInput(display, window, ExposureMask);
    XMapWindow(display, window);

    XEvent event;

    while (1) {
        XNextEvent(display, &event);

        if (event.type == Expose) {
            XFillRectangle(
                display,
                window,
                DefaultGC(display, screen),
                50, 50, 200, 100
            );
        }
    }

    return 0;
}