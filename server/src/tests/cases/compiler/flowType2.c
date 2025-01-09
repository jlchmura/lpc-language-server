varargs void set_dir(string dir, string dest, function fn) {}

void test(mapping m) {    
    foreach (mixed dir, mixed dest in m) {
        if (arrayp(dir)) {
            foreach (string real_dir in dir) {
                if (arrayp(dest)) {
                    set_dir(real_dir, dest...);
                } else {
                    set_dir(real_dir, dest);
                }
            }
        } else if (arrayp(dest)) {
            set_dir(dir, dest...);
        } else if (stringp(dest)) {
            set_dir(dir, dest);
        }
    }
}

/**
 * this test validates that arrayp assigns the proper array type to a mixed var
 * if it does not, the dest... argument will report an error
 */

// @driver: fluffos
