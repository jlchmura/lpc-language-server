// #if is false so the first #elif whose condition is true becomes the taken arm;
// every other arm (including a later true #elif and the #else) stays disabled.
#if 0
()disabled if arm;
#elif 1
int a = 1;
#elif 1
()disabled second elif - chain already taken;
#else
()disabled else arm;
#endif
