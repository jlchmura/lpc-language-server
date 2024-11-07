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
mapping mapEmpty = ([]);
mapping map4 = ([ 1, 2, 3 ]);
mapping map5 = ([ "a": 1; 2, "b": 3; 4 ]);

bytes b1;
bytes b2 = b"foo";

// closure declarations
closure cl;
closure cl2 = (: $1 :);

// struct declarations
struct struct1 {
    int i;
    string str;   
};

// inherited struct
struct inheritedStruct (struct1) {
    int j;
};

struct struct1 s1; // struct instance


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
    this_object()->commaExpr();
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
        // case statements can have math in them
        case 4+1 .. 10 * 2:
            j+=2;
            break;
        // they can also have parens
        case (20+1) .. 30:
            j+=3;
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

// super accessor
string query_name() {
    string n = "obj"::query_name();
    return ::query_name();
}

// function params/arguments
void fnWithParams(int a, int b, varargs int c) {
    write(a);
    write(b);
    write(c);
}

void testCall() {
    fnWithParams(1, 2, 3);
    fnWithParams(1, 2, 3, 5, 6); // should also work because of varargs
}

// struct usages and access 
int testStructs() {
    struct struct1 s = (<struct1> 1, "a");
    struct struct1 s2 = (<struct1> i: 1, str: "a");
    s->i = 1;
    s->str = "a";

    // struct cast 
    struct struct1 s3 = (<struct struct1>)s;
    struct struct1 s3 = ({<struct struct1>})s;

    return s->i;
}

// unionable types
public <int|string*>* testUnionable() {
    <int|object> tmp = 0;
    return ({ 1, "a" });
}

public string* fnArrayReturn() {
    return ({});
}

// load object
void testLoadObject() {
    object o = load_object("obj");
    object o2 = load_object("obj");
    object o3 = clone_object("obj");
}

// catch expression
void testCatch() {
    object o;
    if (catch(o=load_object("obj");publish)) {
        write("error");
    }    
}

// inline closures 
void testInlineClosures() {
    string *s = filter(explode(read_file(f), "\n"), (: return $1[0..7]=="#define"; :));
    filter(({}), (: $1==1 :));
}

// cast expressions
void testCastExpressions() {
    mixed m = "foo";
    string s = ({ string })m;
    string s = (string)m;

    m = 1;
    int i = ({ int })m;
    int i = (int)m;

    struct struct1 s1 = (<struct1>)m;
}


//foreach
void testForEach() {
    int *arr = ({ 1, 2, 3 });
    foreach(int i : arr) {
        write(i);
    }

    mapping map = ([ "a": 1, "b": 2, "c": 3 ]);
    foreach(string key, int val : map) {
        write(key);
        write(val);
    }

    foreach(int i in arr) {
        write(i);
    }
}

// arrow functions
void testArrowFunctions() {
    object o = clone_object("obj");
    string nm = o->query_name();
    return nm;
}


void testConditionalExpressions() {

    int i = 1;
    int j = i << 2; // shift left
    j = i >> 2;     // shift right
    j = (i++) ^ 2;  // xor
 
    return (i++, j);
}

/** a massive unbound lambda from sticklib's mudlib */
void testLambda() {
    set_driver_hook(
        H_MOVE_OBJECT0,
        unbound_lambda( ({'item, 'dest}), ({#',,
        ({#'efun::set_environment, 'item, 'dest}),
        ({#'?, ({#'living, 'item}), ({#',,
            ({#'efun::set_this_player, 'item}),
            ({#'call_other, 'dest, "init"}),
            ({#'?, ({#'!=, ({#'environment, 'item}), 'dest}), ({#'return})}),
          }) }),
        ({#'=, 'others, ({#'all_inventory, 'dest}) }),
        ({#'=, ({#'[, 'others, ({#'member, 'others, 'item}) }), 0}),
        ({#'filter, 'others,
          ({#'bind_lambda,
            unbound_lambda( ({'ob, 'item}),
          ({#'?, ({#'living, 'ob}), ({#',,
              ({#'efun::set_this_player, 'ob}),
              ({#'call_other, 'item, "init"}),
            }) })
            )
          }),
          'item,
        }),
        ({#'?, ({#'living, 'item}), ({#',,
            ({#'efun::set_this_player, 'item}),
            ({#'filter_objects, 'others, "init"}),
          }) }),
        ({#'?, ({#'living, 'dest}), ({#',,
            ({#'efun::set_this_player, 'dest}),
            ({#'call_other, 'item, "init"}),
          }) }),
      }) )
      );
}

// a comma expression with more than 1 comma
void testMultiCommaExpression() {
    int i=0;
    int *common1 = ({});
    int *common2 = ({});
    int e1 = sizeof(common1) - 1;
    int e2 = sizeof(common2) - 1;

    while( i && common1[ e1  ] == common2[ e2  ] ) e1--, e2--, i--;
}

// var decl inside paren exp
void testVarDeclInsideParenExp() {
    if ((int i=fn()) != 1) {
        write(i);
    }
}

// declarations with an without types
static string textarr, textArr2;
static notypeArr, noTypeArr2;
nomask *noTypeArr3;

// weird define case where there is a slash and then an empty line
#define DEFWITHEMPTYLINE \
    "string val of define"\

testPostDefineEmptyLine() { /* this should parse successfully */ }



