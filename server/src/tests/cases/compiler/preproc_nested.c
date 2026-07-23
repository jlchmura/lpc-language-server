// nested conditionals: an inner block inside a disabled parent must stay disabled
// even when its own condition is true.
#if 1
#if 0
()disabled inner block;
#endif
int a = 1;
#else
#if 1
()disabled because the parent #else is inactive;
#endif
#endif
