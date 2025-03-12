test() {
    string *colors = ({ "red", "green", "blue" });
    string *newColors;

    newColors = map(colors, (: capitalize :));
}

/**
 * This tests the return type of an inline closure set to do a identifier
 * which resolves to a function.  In this case, the closure return type
 * should be the same as the function (capitalize)
 * 
 * This test is similar to closure6 except that it uses an efun, which will 
 * have lazy return type resolution.
 * 
 * Tests for https://github.com/jlchmura/lpc-language-server/issues/248
 */

// @driver: fluffos
