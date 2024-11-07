// @driver: fluffos
test() {
    int *arr = ({1, 2, 3});
    foreach(int ref x in arr) {
        x++;        
    }
}