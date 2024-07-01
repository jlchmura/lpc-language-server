
void test(int i, string ref *keys, int j) {

}

void test2() {
    string *keys = ({ "a", "b" });
    test(1, ref keys, 2);
}