// various valid forms of foreach
mapping m = ([ "a": 1, "b": 2, "c": 3 ]);
void test() {
    string key;
    int val;
    foreach(key, val in ([ "a": 1, "b": 2, "c": 3 ])) {
    }

    foreach(string key2, int val2 in ([ "a": 1, "b": 2, "c": 3 ])) {
    }

    foreach(string key3, int val3 in m) {
    }
}

