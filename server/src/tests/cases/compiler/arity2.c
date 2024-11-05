// @errors: 2
string tp(int foo, int bar) { return ""; }

test() {
    string x = tp();
    string y = tp(1);
    string z = tp(1,2);
}