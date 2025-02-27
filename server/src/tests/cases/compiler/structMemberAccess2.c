// @driver: ldmud
// struct declarations
struct Foo {
    int i;
    string str;   
};

struct Foo foo; // struct instance

string propName = "str";
string str = foo->(propName);
