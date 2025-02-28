* test() {

    string *arr = ( { "a", "b" } );
    return arr;
    
}

test2() {
    int i = test(); // this should fail because because array cannot be assigned to int
}

// @errors: 1