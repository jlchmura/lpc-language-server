#define FOO(x, y) x + y

int *a = FOO( ({ 1, 2, 3 }), ({ 4, 5, 6 }) );

/**
 * This tests issue 220: https://github.com/jlchmura/lpc-language-server/issues/220
 * The parens in the array literal were causing the macro args to parse incorrectly.
 */

