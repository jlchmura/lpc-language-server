struct note_s {
    int    foo;    
    string bar;    
};

struct note_s issue;

test(struct note_s nn) {
    nn->foo = 1;    
}    

/*
 * struct as a parameter in LD 
 */

// @driver: ldmud