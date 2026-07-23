#include "fwd_head.h"

foo_def(int i) {
    return i;
}

test() {
    int i = foo_def(5);
    return i;
}
