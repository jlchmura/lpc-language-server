// @driver: fluffos
// @errors: 1
test() {
    int *arr = ({ 1, 2, 3 });
    mixed *result = filter(arr, (: $1 == "foo" :));
}

