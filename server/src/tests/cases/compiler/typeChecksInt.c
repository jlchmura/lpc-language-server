object obj = new("object.c");

test() {    
    // @lpc-expect-error: can't assign string to int
    int _i1 = "";
    // @lpc-expect-error: can't assign array to int
    int _i2 = ({ });
    // @lpc-expect-error: can't assign mapping to int
    int _i3 = ([ ]);    
    int _i4 = 1.0; // float to int is allowed
    int _i5 = 1; // int to int is allowed
    // @lpc-expect-error: can't assign object to int
    int _i6 = obj;  
}

// @driver: fluffos