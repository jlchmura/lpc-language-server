test() {
    int i = 0x1000000000 & 0x1000000000;
    i &= 0x1000000000;
    // max int
    i = 0x7fffffffffffffff;
}