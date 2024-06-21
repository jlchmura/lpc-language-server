
// directives can have a space after them 

test() {
# ifdef MACRO_NOTDEFINED
// this should be disabled
int i=0;
# endif

// undef should be allowed inside methods
#undef FOO

}

// and outside methods
#undef BAR
