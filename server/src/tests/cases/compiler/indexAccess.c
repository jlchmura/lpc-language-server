// @driver: ldmud
// array access
testArrayAccess() {
    int *arr = ({ 1, 2, 3 });
    int i = arr[<1];
    i = arr[0..2];
    i = arr[0..<1];
    i = arr[0..];
    i = arr[..<1];
    i = arr[<1..<2];
    return arr[0];
}