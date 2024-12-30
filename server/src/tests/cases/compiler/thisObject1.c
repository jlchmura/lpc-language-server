// @this_object thisObject1.file2.c

test() {
    int i = this_object()->foo();
    int j = this_object()->bar();    
}

/*
 * both foo & bar should correctly resolve
 * `bar` is accessible via this_object even though its protected
 */

// @files: thisObject1.file2.c