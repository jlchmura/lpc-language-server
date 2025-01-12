object obj = new("object.c");

test() {    
    // @lpc-expect-error: can't assign int to string
    string _s1 = 1; // int to string is allowed
    // @lpc-expect-error: can't assign array to string
    string _s2 = ({ });
    // @lpc-expect-error: can't assign mapping to string
    string _s3 = ([ ]);
    // @lpc-expect-error: can't assign float to string
    string _s4 = 1.0;
    // @lpc-expect-error: can't assign object to string
    string _s5 = obj;
}

// @driver: fluffos