
test() {    
  object *weapons;
  weapons = get_weaps();
  
  weapons->query_number();
  foreach(object w in weapons) {        
      w->query_number();        
  }
}

/**
 * @returns {"object.c"*} weapons
 */
object *get_weaps() {
  return ({ });
}

/** 
 * This tests https://github.com/jlchmura/lpc-language-server/issues/190
 * a generic object array type should take on the flow type in an assignment (line 5)
 */


// @driver: fluffos
