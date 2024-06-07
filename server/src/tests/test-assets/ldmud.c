#define MACRO_1 1 
#define MACRO_FN (x) (x+1)

// directives
#include "ldmud.h"
#if LDMUD_H 
int isLd=1;
#else 
int isLd=0;
#endif

#ifdef LDMUD_H
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

// ld-only types
status iStatus;
status *arrStatus;

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

#define M2 "foo"
#define NESTED_MACRO M2 "bar"
testNestedMacro() {
    write(NESTED_MACRO);
}

// comma expressions
int commaExpr() {
    int a = 1, b = 2, c = 3;
    return write("foo"), a;    
}

int fn() { return 2; }

// various expressios
testExpr() {
    int i = fn() + 1 * fn() ? 3 / 1 : 4 % 2;
    i++;
    i += (fn() * 2) + 1;
    i >>= 2;
    i <<= 2;
    i &= 2;
    i |= 2;
    i ^= 2;
    i--;
    i = i > 2 ? fn() : -i;
    return i;
}

// arrow functions
testArrow(object tp) {
    tp->move("/room/room2");
    write(this_player()->query_name());
    return tp->short();
}

// switch statements
testSwitch(int i) {
    switch(i) {
        int j;
        case 1:
            j=1;
            return j+1;
        case 2:
        case 3..4:        
            j++;
            break;
        default:
            return 3;
    }
}

// for loop
testFor() {
    int i;
    for(i=0; i<10; i++) {
        write(i);
    }

    for (i=0;;) {
        write(i);
        i++;
        if (i>10) break;
    }

    for (;;) {
        write(i);
        i++;
        if (i>20) break;
    }
}

// while loop
testWhile() {
    int i=0;
    while(i<10) {
        write(i);
        i++;
    }
}

// do while loop
testDoWhile() {
    int i=0;
    do {
        write(i);
        i++;
    } while(i<10);
}

// if else
testIfElse() {
    int i=0;
    if (i>0) {
        write("i>0");
    } else if (i<0)
        write("i<0");
    else if (i==100) ;
    else {
        write("i=0");
    }
}

// ternary operator
testTernary() {
    int i=0;
    return i>0 ? 1 : 0;
}

// logical operators
testLogical() {
    int i=0;
    return i && 1 || 0;
}

// bitwise operators
testBitwise() {
    int i=0;
    return i & 1 | 0;
}

// array access
testArrayAccess() {
    int *arr = ({ 1, 2, 3 });
    int i = arr[<1];
    i = arr[0..2];
    i = arr[0..<1];
    i = arr[0..];
    i = arr[..<1];
    i = arr[<1..<2];
    return arr[0];
}

// mapping access
testMappingAccess() {
    mapping map = ([ "a": 1, "b": 2, "c": 3 ]);
    return map["a"];
}

// closure access
testClosureAccess() {
    closure cl = (: $1 :);
    return funcall(cl, 1);
}

// struct access
testStructAccess() {
    struct struct1 s;
    s->i = 1;
    s->str = "a";
    return s->i;
}

// string access
testStringAccess() {
    string str = "foo";
    return str[0];
}


// disabled directives
#if 0
// the next if should be disabled
#if FOO
#else
#endif

// still disabled
#ifdef FOO
#endif

#define DISABLED_MAC
#include <disabled_include.h>
#undef DISABLED_UNDEF

#else
// the next if should be enabled
#if 1

#ifdef LDMUD_H 
// enabled
#endif

#endif
#endif

// undef
#undef LDMUD_H
#undef NOTDEFINED // <-- that should not throw errors

