// @errors: 0
// @driver: fluffos
// this should not report an error because the fluffos
// `error` efun is marked with a @throws tag
int test() {
    error("not implemented");
}