void test() {
    int *arr = ({ 1, 2, 3 });
    foreach(int i : arr) {
        write(i);
    }
}