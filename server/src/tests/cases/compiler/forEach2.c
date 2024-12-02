// foreach over a mapping
void test() {
    mapping map = ([ "a": 1, "b": 2, "c": 3 ]);
    foreach(string key, int val : map) {
        write(key);
        write(val);
    }
}