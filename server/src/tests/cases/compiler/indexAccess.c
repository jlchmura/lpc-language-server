// @driver: ldmud
// array access
//
// This exercises LDMud's index and range *syntax*; the results are collected into a `mixed`
// so the file stays about parsing. Element and slice typing is asserted in
// arrayIndexElementType.c instead.
testArrayAccess() {
    int *arr = ({ 1, 2, 3 });
    mixed i = arr[<1];
    i = arr[0..2];
    i = arr[0..<1];
    i = arr[0..];
    i = arr[..<1];
    i = arr[<1..<2];
    return arr[0];
}
