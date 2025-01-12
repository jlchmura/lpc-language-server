object obj = new("object.c");

test() {    
    // @lpc-expect-error: can't assign string to object
    object _o = "";
    // @lpc-expect-error: can't assign int to object 
    object _o2 = 1;
    // @lpc-expect-error: can't assign array to object
    object _o3 = ({ });
    // @lpc-expect-error: can't assign mapping to object
    object _o4 = ([ ]);
    // @lpc-expect-error: can't assign float to object
    object _o5 = 1.0;
    object _o6 = obj; // object to object is allowed
}

// @driver: fluffos