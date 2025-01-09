int setToColor(string color) { return 1; }
 
test() {
    string *colors = ({ "red", "green", "blue" });
    int *i;

    i = map(colors, (: setToColor :));    
}

/**
 * This tests the return type of an inline closure set to do a identifier
 * which resolves to a function.  In this case, the closure return type
 * should be the same as the function (setToColor)
 */

// @driver: fluffos