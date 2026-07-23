// the `defined` operator: FOO is defined so !defined(FOO) is false; BAR is not
// defined so defined(BAR) is false. Both blocks are disabled.
#define FOO
#if !defined(FOO)
()disabled syntax error;
#endif

#if defined(BAR)
()another disabled syntax error;
#endif

int ok = 1;
