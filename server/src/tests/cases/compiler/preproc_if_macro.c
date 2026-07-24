// object-like macro expansion inside a condition: VER expands to 3, so VER < 2
// is false and the block is disabled.
#define VER 3
#if VER < 2
()disabled syntax error;
#endif

#if VER >= 3
int ok = 1;
#else
()disabled else syntax error;
#endif
