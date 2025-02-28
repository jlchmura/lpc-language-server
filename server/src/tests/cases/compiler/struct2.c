// @driver: ldmud
// return structs from functions
struct Foo {
    int i;
    string str;   
};

struct Foo foo; 
public struct Foo accessStruct(int i) {
    foo->i = i;
    foo->str = "a";
    return foo;
}