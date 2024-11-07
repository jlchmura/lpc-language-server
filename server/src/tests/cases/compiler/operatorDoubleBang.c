// @driver: fluffos
// various forms of fluff's double-bang operator
reset() { return 0; }

test() {
    int i = 0;
    if (!!i) {
        write("i is not zero");
    }
    int j = !!(i==1);
    int k = !!reset();
    int l = !reset(); 
    int m = !!"something";
}