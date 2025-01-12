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

    /****** All of these should be legal assignments  *****/

    mixed *_arr_mixed = ({ "a", "b", "c" });
    mixed *_arr_mixed2 = ({ 1, 2, 3 });
    string *_arr_string1 = ({ 1, 2, 3 });
    string *_arr_string2 = ({ "a", "b", "c" });
    int *_arr_int1 = ({ 1, 2, 3 });
    int *_arr_int2 = ({ "a", "b", "c" });
}

// @driver: fluffos
