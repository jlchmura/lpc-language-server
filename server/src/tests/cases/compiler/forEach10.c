
mapping myMap;
test() {    
    foreach(string key, int value in myMap) { 
        object o = new(key);                
        int i = value;
    }    
}

test2() {    
    mapping myMap2 = ([]);
    foreach(string key, int value in myMap2) { 
        object o = new(key);
        int i = value;                
    }    
}

// foreach over an untyped map.  key & _value should get their
// types from the variable decl.

// @driver: fluffos