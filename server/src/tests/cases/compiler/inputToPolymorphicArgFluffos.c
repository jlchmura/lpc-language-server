// FluffOS `input_to` has a polymorphic second argument. The driver
// (`f_input_to` in efuns_main.cc) treats it as the `flag` bitmask only when it
// is an int; any non-int second argument is instead the first carry-over
// argument forwarded to the callback. So all three forms below are legal and
// must produce no diagnostics.
//
// Regression: the efun header used to type the second parameter as `int flag`,
// which rejected the object with "Argument of type 'object ...' is not
// assignable to parameter of type 'int'".

void confirm_recursive_delete(string input, object caller) {}
void collect_password(string input) {}
void collect_line(string input) {}

void test(object caller) {
    input_to("confirm_recursive_delete", caller); // object -> forwarded arg
    input_to("collect_password", 1);              // int -> flag
    input_to("collect_line");                     // fun-only
}

// @driver: fluffos
// @errors: 0
