class Foo {
    string type;
    int num;
}

private class Foo testFn(string type) {

    class Foo msg;
    msg = new(class Foo, 
        type: type, 
        num: getNum(type)
    );

    return msg.type ? msg : 0;
}

private string getNum(string type) { return 0; }
    
   
/**
 * Test for https://github.com/jlchmura/lpc-language-server/issues/263
 * `num` should error because `getNum` returns a string
 */

// @driver: fluffos
// @errors: 1
