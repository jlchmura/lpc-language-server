// for with no init, no condition, no increment
test() {
    int i;
    for (;;) {
        write(i);
        i++;
        if (i>20) break;
    }
}