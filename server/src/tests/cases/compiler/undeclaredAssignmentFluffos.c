// Under FluffOS, assigning to an undeclared variable is illegal: the assignment
// target does not implicitly declare a variable, so it is reported as an
// unresolved name. Counterpart to undeclaredAssignmentLdmud.c.
void f() {
    foo = 1;
}

// @driver: fluffos
// @errors: 1
