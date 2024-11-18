// this will get parsed as a binary expression 
// but the binder should treat it as a declaration
int fn() { return 1; }

void test() {
    i = fn();
}