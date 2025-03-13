
string test() {
    return 
     "foo"
     "bar"
     "baz";
}
 
/**
 * LPC allows the return expression to be on a new line, which is different from 
 * TS/JS which will apply ASI and return an undefined expression.
 * 
 * This tests for https://github.com/jlchmura/lpc-language-server/issues/261
 */
