test() {
    int *arr = ({1, 2, 3});
    int *i = filter(arr, (: $1 > 1 :));
}