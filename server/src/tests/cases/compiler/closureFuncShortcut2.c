// @driver: fluffos
// @errors: 2
// function shortcut
private test() {
    object ob;
    string fun;
    // This should fail because call_otherNOT is not a valid function
    // and notOb is not defined
    function f = (: call_otherNOT, notOb, fun :);
}