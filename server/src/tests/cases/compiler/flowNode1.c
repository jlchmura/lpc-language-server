object to = this_object();

test() {
    int i = to->foo();
}

foo() {
    return 1;
}

// `to` should be recognized as this_object on line 5
// if the flow nodes are not created correctly, the checker 
// will stop checking `i` at the function expression