// objects.h

/**
 * virtualp()  -  determine  whether  a given variable points to a virtual object
 *
 * @returns true (1) if the argument is objectp() and the O_VIRTUAL flag is
 * set.   The driver sets the O_VIRTUAL flag for those objects created via
 * the 'compile_object' method in master.c.
 *
 */
varargs int virtualp( object arg );

/**
 * 
 *
 * Send  a message 'str' to object all objects in the room 'ob'.  'ob' can
 * also be the filename of the room (string).  If 'exclude' is  specified,
 * all objects in the exclude array will not receive the message.
 *
 */
void tell_room( mixed ob, string str, object *exclude );

/**
 * tell_object() - send a message to an object
 *
 * Send  a message 'str' to object 'ob'. If it is an interactive object (a
 * player), then the message will go to him, otherwise it will go  to  the
 * local function "catch_tell()".
 *
 */
void tell_object( object ob, string str );

/**
 * set_hide() - set the hide flag on a hidable object
 *
 * Sets  the  hidden  flag  of an object to 'flag', which should be 0 or 1
 * (hide disable, or hide enable, respectively).  Only objects  for  which
 * 'master()->valid_hide(ob)'  returns  true  may  make themselves hidden.
 * When the object is hidden, only other hidable objects will be  able  to
 * find  the object with find_object(), or multiple-object returning efuns
 * such as users(), children(), all_inventory(), etc.
 *
 */
void set_hide( int flag );

/**
 * set_heart_beat() - enable or disable an object's heartbeat
 *
 * Passing 'flag' as 0 disables the object's heart beat.  Passing a 'flag'
 * of 1 will cause heart_beat() to be called in the object once each heart
 * beat  (a variable number defined by your local administrator, usually 2
 * seconds).  Passing a 'flag' of greater than 1 will usually set the num‐
 * ber  of heart beats inbetween calls to heart_beat(), however your local
 * administrator may have the system configured to treat any 'flag'  above
 * 1 as 1.
 *
 */
int set_heart_beat( int flag );

/**
 * save_object() - save the values of variables in an object into a file
 *
 * Save  all  values  of  non-static  variables in this object in the file
 * 'name'.  valid_write() in the master object determines whether this  is
 * allowed.   The  optional  second argument is a bitfield: If bit 0 is 1,
 * then variables that  are  zero  (0)  are  also  saved  (normally,  they
 * aren't).   Object  variables always save as 0.  If bit 1 is 1, then the
 * save file will be compressed.
 *
 */
varargs int save_object( string name, int flag );

/**
 * restore_object()  -  restore  values  of  variables from a file into an
object
 *
 * Restore values of variables for current object from file 'name'. If the
 * optional second argument is 1, then all of the non-static variables are
 * not zeroed out prior to restore (normally, they are).
 * 
 * In the case of an error, the affected variable will be  left  untouched
 * and an error given.
 *
 */
varargs int restore_object( string name, int flag );

/**
 * reload_object() - return an object to its just-loaded state
 *
 * When reload_object() is called on 'ob', all the driver-maintained prop‐
 * erties are re-initialized (heart_beat, call_outs, light, shadows, etc),
 * all  variables  are  re-initialized,  and create() is called.  It has a
 * similar effect to destructing/reloading the object,  however,  no  disk
 * access or parsing is performed.
 *
 */
void reload_object( object ob );

/**
 * query_heart_beat() - query the status of an object's heartbeat
 *
 * Returns  the  value with which set_heart_beat() has been called with on
 * 'object'.  If object is not given, it defaults to the  current  object.
 * If the object has no heart beat, 0 will be returned.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
varargs int query_heart_beat( object );

/**
 * present() - find an object by id
 *
 * if first argument is string, second argument is missing, searches for
 * a object in the object's environment using the id() apply where it answers 1
 * to indicate a match.
 * 
 * if  first  argument is string, second argument is object, only searches
 * for target in that object's inventory using the same strategy as above.
 * 
 * "foo 1" means the first "foo" in  the  inventory.   the  first  in  the
 * inventory is the last object that moved in.
 * 
 * if  first  argument  is  object, second argument is missing, check if
 * object is in this object's inventory, or as a sibling in this  object's
 * environment's inventory, returns object's parent.
 * 
 * if first argument is  object,  second  argument  is  object,  check  if
 * object1 is in object2 inventory, return object1 if true.
 * 
 * If  object  is  hidden (via set_hide()), and current object is not hid‐
 * able.  returns 0
 *
 */
varargs object present( mixed str, object ob );

/**
 * objects - return an array of all loaded objects
 *
 * An array of every object loaded on the mud is  returned  by  objects().
 * Note  that if the system's maximum array size is set too low, objects()
 * will truncate its array, in which case it might not be too useful.
 * 
 * If the optional 'func' parameter is given, then func() in this_object()
 * is  called  with  each  loaded  object as an argument.  If the function
 * returns nonzero, then that object is returned by  objects(),  otherwise
 * it isn't.
 * 
 * If  'f'  is  given, it will be called on all the objects as above.  For
 * example, objects( (: clonep :) ) returns a list of all  the  clones  in
 * existence.
 *
 */
object *objects( void | string | function func );

/**
 * objectp() - determine whether or not a given variable is an object
 *
 * @returns {arg is object} 1 if 'arg' is an object.
 *
 */
int objectp( mixed arg );

/**
 * next_inventory() - return the next object in the same inventory
 *
 * Return the next object in the same inventory as 'ob'.
 * 
 * Warning:   If  the  object  'ob'  is  moved  by  "move_object()",  then
 * "next_inventory()" will return an object from the new inventory.
 *
 */
object next_inventory( object ob );

/**
 * new() - load a new copy of an object/class
 *
 * Clones a new object from `filename`, and give it a new unique name. Returns
 * the new object. Optionally, additional arguments may be passed to new()
 * which will be passed to the 'create()' apply in the new object.
 * 
 * If the first argument is a class, then a new copy of the class is created
 * and returned. Optionally, additional parameters may be passed to new()
 * which will be used to initialize values in the returned class. If you are
 * passing arguments to the class, you must specify the member name and the
 * value of the members you would like to initialize.
 * 
 * ### Object example:
 * ```lpc
 * object ob = new("/obj/torch") ; // clone a torch object
 * object money = new("/obj/money", 10, "dollars" ) ; // clone a money object and set initial values
 * ```
 *
 * ### Class example:
 * ```lpc
 * class ClassPerson {
 * string name ;
 * int age ;
 * }
 * 
 * class ClassPerson person = new(class ClassPerson) ;
 * person.name = "Bob" ;
 * person.age = 42 ;
 * // or
 * class ClassPerson person = new(class ClassPerson, name: "Bob", age: 42) ;
 * ```
 */
varargs object new(string filename, mixed args...);
varargs class ClassName new(class ClassName, mixed args... ) ;

/**
 * move_object() - move current object to another environment
 *
 * Move the current object into the object `dest'.  dest should either be
 * a filename or an object.
 *
 */
void move_object( mixed dest );

/**
 * master() - returns the master object
 *
 * Returns a pointer to the master object.
 * @returns {__LPC_CONFIG_LIBFILES_MASTER}
 */
object master( void );

/**
 * load_object() - find or load an object by file name
 *
 * Find  the  object with the file name 'str'.  If the file exists and the
 * object hasn't been loaded yet, it is loaded and returned (if possible).
 *
 */
object load_object( string str );

/**
 * first_inventory() - return the first item in an object's inventory
 *
 * Return  the first object in the inventory of <ob>, where <ob> is either
 * an object or the file name of an object.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
object first_inventory( mixed ob );

/**
 * find_object() - find an object by file name
 *
 * Find the object with the file name 'str',  which can reference a cloned
 * object by using the file name format returned by file_name().
 * 
 * If 'flag' is 1, find_object() will behave like load_object().
 *
 */
object find_object( string str, void | int flag );

/**
 * file_name() - get the file name of an object
 *
 * file_name()  returns  the  name of the file from which <ob> was loaded.
 * If the object is a cloned object,  then  file_name()  will  not  be  an
 * actual  file  on  disk, but will be the name of the file from which the
 * object was originally cloned, appended with an octothorpe (#)  and  the
 * object  instance  number.   Object instance numbers start at 0 when the
 * game is booted, and increase by one for each object cloned,  hence  the
 * number   is   unique   for   each  cloned  object.   <ob>  defaults  to
 * this_object() if not specified.
 *
 */
varargs string file_name( object ob );

/**
 * environment() - return the environment of an object
 *
 * Return  the  containing object (environment) of <ob>. If no argument is
 * given, <ob> defaults to this_object().
 *
 */
varargs object environment( object ob );

/**
 * destruct() - remove an object from the games
 *
 * Completely   destroy   and  remove  object  'ob'.  After  the  call  to
 * destruct(), no global variables will exist any longer, only locals, and
 * arguments.   If  'ob' is this_object(), execution will continue, but it
 * is best to return a value immediately.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
varargs void destruct( object ob );

/**
 * deep_inventory() - return the nested inventory of an object
 *
 * Returns  an array of the objects contained in the inventory of <ob> and
 * all the objects contained in the inventories of those  objects  and  so
 * on.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
varargs object *deep_inventory( object ob );

/**
 * clonep() - determine whether or not a given variable points to a cloned
object
 *
 * Returns true (1) iff the argument is objectp() and the O_CLONE flag  is
 * set.   The  driver  sets the O_CLONE flag for those objects created via
 * new(3) (clone_object(3)).  The clonep() efun will not return true  when
 * called  on  objects that are the master copy (those that are loaded via
 * call_other(3)).  Note that if clonep() returns true,  then  file_name()
 * will   return   a  string  containing  a  '#'.   clonep()  defaults  to
 * this_object().
 *
 */
int clonep( void | mixed arg );

/**
 * clone_object() - load a copy of an object
 *
 * Load  a  new  object  from  definition <name>, and give it a new unique
 * name.  Returns the new object.  An object with a nonzero  environment()
 * cannot be cloned.  Optionally, additional arguments may be passed to
 * clone_object() which will be passed to 'create()' in the new object.
 *
 * object ob = clone_object("/obj/torch") ; // clone a torch object
 * object money = clone_object("/obj/money", 10, "dollars" ) ; // clone a money object and set initial values
 *
 */
object clone_object( string name, mixed args... );

/**
 * children() - returns an array of objects cloned from a given object.
 *
 * This  efunction  returns an array of objects that have been cloned from
 * the file named by 'name', as well  as  the  object  'name'  itself,  if
 * loaded.   An example use of children() is to find all objects that have
 * been cloned from the user object:
 * 
 * ```
 * object *list;
 * 
 * list = children("/obj/user");
 * ```
 * This lets you find all users  (both  netdead  and  interactive  whereas
 * users() only reports interactive users).
 *
 */
object *children( string name );

/**
 * all_inventory() - return the inventory of an object
 *
 * Returns an array of the objects contained in the inventory of <ob>.
 * 
 * If ob is not passed, this parameter defaults to this_object().
 *
 */
varargs object *all_inventory( object ob );

