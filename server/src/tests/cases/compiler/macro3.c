#define y add+x;
#define member(x, y)                fn(y, x)

void fn(mixed a, mixed b) {}

test() {        
    string *weaptype = ({});
    member(weaptype, "sword");    
}  

/**
 * This tests issue 186: https://github.com/jlchmura/lpc-language-server/issues/186
 * The macro param `y` should not get substituted by the `add+x` macro.
 */

