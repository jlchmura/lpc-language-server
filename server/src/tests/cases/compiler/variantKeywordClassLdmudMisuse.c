// `class` is a struct type only in FluffOS; under LDMud it scans as an identifier
// (LDMud uses `struct`), so using it as a parameter type is rejected -- `class c`
// reads as two adjacent identifiers. Guards that the demotion actually happens.

void f(class c) {
}

// @driver: ldmud
// @errors: 1
