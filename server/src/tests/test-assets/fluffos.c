#define MACRO_1 1 
#define MACRO_FN (x) (x+1)

// directives
#include "fluffos.h"; // fluff allows semi after include

#if FLUFFOS_H 
int isLd=1;
#else 
int isLd=0;
#endif

#ifdef FLUFFOS_H
int isLd2=1;
#else
int isLd2=0;
#endif

#define MULTLINE_MACRO \
    int a=1; \
    int b=2; \
    int c=3;

#define MULTILINE_FN_MACRO(x) \
    int a=1; \
    int b=2; \
    int c=3; \
    return x;

// inherit
inherit "obj";

// variable declarations
private int iPrivate=0;
protected int iProtected=0;
public int iPublic=0;
nomask private int iPrivateNoMask=0;
nomask protected int iProtectedNoMask=0;
nomask public int iPublicNoMask=0;

// multi declarations
int i, j, k;
string iStr, jStr, kStr;
object iObj, jObj, kObj;
mixed iMixed, jMixed, kMixed;

// array declarations
string *arrString;
string *arrString2 = ({ "a", "b", "c" });
int *arrInt;
int *arrInt2 = ({ 1, 2, 3 });
mixed *arrMixed;
mixed *arrMixed2 = ({ 1, "a", 2, "b" });
object *arrObject;
object *arrObject2 = ({ find_object("/obj/room"), find_object("/obj/room2") });

// mapping declarations
mapping map;
mapping map2 = ([ "a": 1, "b": 2, "c": 3 ]);

// closure declarations
closure cl;
closure cl2 = (: $1 :);

buffer b1;

// struct declarations
struct struct1 {
    int i;
    string str;   
};
struct struct1 s1;

// function forward defines
int test();
private int testPrivate();
public int testPublic();
struct struct1 accessStruct(int i);

// function declarations
int test() {
    return MACRO_FN(MACRO_1);
}
private int testPrivate() {
    return 1;
}
public int testPublic() {
    return 1;
}

struct struct1 accessStruct(int i) {
    s1->i = i;
    s1->str = "a";
    return s1;
}

// Fluff-style classes
class c1 {
    int i;
    string str;
};

// Fluff function declarations
function foo;
function bar = (: clone_object, "" :);

#define M2 "foo"
#define NESTED_MACRO M2 "bar"
testNestedMacro() {
    write(NESTED_MACRO);
}

testStringShortcut() {
    write(@STR
        This is a string
        STR
    );

    string *arr = 
        @@ARR
        This is a 
        multiline
        string
        ARR
        ;
}

class testClass {
    int i;
    string str;
};

testNewKeyword() {
    // new class
    class c1 c = new(class c1);

    // new object
    object o = new("/obj/room");
    object o2 = new ("/obj/room2", "arg1", "arg2");
}

// global modifier statement
private:
int isPrivate1;
string isPrivate2;
void fnIsPrivate() {}


// function params/arguments
void fnWithParams(int a, int b, int c...) {
    write(a);
    write(b);
    write(c);
}

void testCall() {
    fnWithParams(1, 2, 3);
    fnWithParams(1, 2, 3, 5, 6); // should also work because of spread
}

void testArrayWithSpread() {
    int *arr = ({ 1, 2, 3 });
    int *arr2 = ({ 1, arr... });

    int elem = 1;
    int *arr3 = ({arr..., elem});
}

// keywords that can also be used as identifiers 
void testValidIdentifiers() {

    string symbol;

}

// two forms of catch in Fluff
void testCatches() {
    if (err=catch(this_user()->quit_character())) {
        message("error", "Error quitting out: " + err, this_user());
    }

    mixed m = catch {
        destruct(this_object());
    };    
}

// double-bang operator 
void testDoubleBang() {
    int i = 0;
    if (!!i) {
        write("i is not zero");
    }
    int i = !!"something";
    int j = !!(i==1);
    int k = !!reset();
    int l = !reset(); 
}
    