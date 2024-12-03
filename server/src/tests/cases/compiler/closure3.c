// @errors: 1
test() {
    int *arr = ({1, 2, 3});
    int *i = filter(arr, (: $1 > foo() :)); // foo is not defined
}