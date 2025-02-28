
test() {
    int *arr = ({1, 2, 3});
    foreach(int x in &arr) {
        x++;        
    }
}

/*
 * LD allows a ref in the foreach loop target
 */

// @driver: ldmud