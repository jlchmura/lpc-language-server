// Under LDMud, types are optional, so assigning to an undeclared variable
// implicitly declares it and produces no diagnostic (the default behavior,
// gated by allowUndeclaredAssignmentsInLd). Counterpart to
// undeclaredAssignmentFluffos.c.
void f() {
    foo = 1;
}

// @driver: ldmud
// @errors: 0
