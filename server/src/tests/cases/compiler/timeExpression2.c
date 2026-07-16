// @driver: ldmud
// `time_expression` is a FluffOS-only reserved word. Under LDMud the scanner demotes it
// to an ordinary identifier, so it may be used as a variable or function name.
int time_expression;

int testIdentifier() {
    time_expression = 5;
    return time_expression;
}
