object obj = new("object.c");

test() {    
    mapping _m1 = ([ ]); // mapping to mapping is allowed
    // @lpc-expect-error: can't assign string to mapping
    mapping _m2 = "";
    // @lpc-expect-error: can't assign int to mapping
    mapping _m3 = 1;
    // @lpc-expect-error: can't assign array to mapping
    mapping _m4 = ({ });
    // @lpc-expect-error: can't assign float to mapping
    mapping _m5 = 1.0;
    // @lpc-expect-error: can't assign object to mapping
    mapping _m6 = obj;   
}

// @driver: fluffos