
test(int ref *values) {

}

test2() {
    int *values = ({1, 2, 3});
    test(ref values);
}

// @driver: fluffos
