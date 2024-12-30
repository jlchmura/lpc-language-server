inherit "inherit1.base1.c";

// make sure members from nested inherits are resolved correctly 

test() {
    // base2 comes from base1->base2
    int id = isBase2();
    // query_name is defined in both base1 & base2
    string name = query_name();    
}