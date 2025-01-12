object obj = new("object.c");

test() {    
    // @lpc-expect-error: can't assign int to string
    string *_sa1 = 1; // int to string is allowed    
    string *_sa2 = ({ });
    // @lpc-expect-error: can't assign mapping to string
    string *_sa3 = ([ ]);
    // @lpc-expect-error: can't assign float to string
    string *_sa4 = 1.0;
    // @lpc-expect-error: can't assign object to string
    string *_sa5 = obj;
}

// @driver: fluffos
