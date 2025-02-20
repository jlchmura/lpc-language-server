string get_name() { return ""; }
string upper(string s) { return s; }

#define FOO2(x) upper((x)?(x):"")
#define BAR2 (string)upper(FOO2(get_name()))

test2() {
    string name = BAR2;
}
