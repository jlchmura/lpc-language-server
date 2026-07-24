// sticky-taken-branch: once the #if arm is taken, later #elif/#else arms must
// stay inactive even when their own condition is true.
#if 1
int a = 1;
#elif 1
()disabled elif syntax error;
#else
()disabled else syntax error;
#endif
