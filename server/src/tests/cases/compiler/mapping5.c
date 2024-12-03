// @errors: 2
// mapping elements should get checked
test() {
    string i;
    mapping m = ([ "fd": foo(); i=2; ]); // foo doesn't exist and i is the wrong type
}  