class Foo {
    string type;
    int num;
}

private class Foo testFn(string type) {

    class Foo msg;
    msg = new(class Foo, 
        type: type, 
        num: 0
    );

    return msg.type ? msg : 0;
}
   
/**
 * Test for https://github.com/jlchmura/lpc-language-server/issues/259
 * where the parameter `type` was not getting marked as used by the new class expression
 */

// @driver: fluffos
