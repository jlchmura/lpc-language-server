// real constant-expression evaluation: 1 > 2 is false, so the block is disabled
// and its garbage must not be reported. (Under the old "true unless literal 0"
// evaluation this block was active and errored.)
#if 1 > 2
()disabled syntax error;
#endif

#if 2 + 2 == 4
int ok = 1;
#else
()disabled else syntax error;
#endif
