#define FOO

#ifndef FOO
()Syntax Error;
#endif

#ifdef FOO
// this should generate a type error
string i = 123;
#endif