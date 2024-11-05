#define FOO

#ifndef FOO
()Syntax Error;
#endif

#ifdef FOO
// Todo - change this to a int to string assignment, so that it generates and error that we can validate against
int i = 0;
#endif