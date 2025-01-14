// contrib.h

/**
 * zonetime - returns ctime(int) for timezone string
 *
 * returns ctime(int) for timezone string.
 *
 */
string zonetime(string timezone, int timestamp);

/**
 * variables - returns array of global variable names
 *
 * int == 0:
 * returns array of global variable names
 * 
 * int != 0
 * returns array of arrays of variable name & type
 * @param {object} ob - object to query
 * @param {int} flag (optional) defaults to 0
 */
mixed *variables(object ob, int flag);

/**
 * upper_case() - returns a string with every letter supplied in the source
capitalised.
 *
 * Returns a new string with every character in <text> converted to upper case.
 *
 * string text = upper_case( "I like cheese." ) ; // "I LIKE CHEESE."
 *
 */
string upper_case(string text);

/**
 * test_load - test if a file is loadable
 *
 * Tests if a file is loadable. Will return 1 if a file is loadable,
 * otherwise 0. If a file attempting to be loaded contains errors,
 * they will be reported, in which case, you may need to wrap the
 * function call in a catch statement to retrieve the 0 result.
 *
 */
int test_load( string filename );

/**
 * terminal_colour() - return a wrapped and indented string where the driver
substitutes %^KEY%^ in the string with the matching VALUE of KEY in the
supplied mapping.
 *
 * string: to be parsed for '%^KEY%^' sequences
 * mapping: 'KEY:value' pairs
 * 1st int: wrap after int printed symbols
 * if int < 0 fillout lines with blank's
 * 
 * wrap = 4:
 * '12\n345'
 * wrap = -4:
 * '12 \n345 '
 * 
 * minwrap: 2
 * 
 * 2nd int: indent by int blanks
 * maxindent: wrap-2
 * 
 * returns wrapped and indented string with each '%^KEY%^' replaced by KEY's value
 * or original string if no '%^KEY%^' sequence is found
 * (shouldn't it at least be wrapped and indented?)
 *
 */
string terminal_colour(string, mapping, int | void, int | void);

/**
 * string_difference - return levenshtein difference
 *
 * returns levenshtein difference
 *
 */
int string_difference(string, string);

/**
 * store_variable - store a value in an object's global variable
 *
 * This efun stores the value in the global variable variable_name in `ob`.
 * 
 * `variable_name` is name of the global variable.
 * `value` is the data to be stored in the global variable.
 * `ob` defaults to this_object() if not specified.
 * 
 * If `ob` is not specified, then `variable_name` can be any global variable
 * in the inheritance hierarchy, regardless of scope.  If `ob` is specified,
 * then `variable_name` must be public scope.
 * 
 * This is a potential security hazard and, therefore, you may wish to overload
 * this function to perform security checks.
 *
 * store_variable( "weight", 150, this_player() ) ;
 *
 */
void store_variable(string variable_name, mixed value, void|object ob);

/**
 * store_class_member
 *
 * Store <value> in the <class_element>th member of an <instantiated_class>.
 * 
 * Returns an updated version of the <instantiated_class>.
 *
 * class person {
 * string name ;
 * int age ;
 * string city ;
 * }
 * 
 * void fun()
 * {
 * class person me = new(class person) ;
 * 
 * me->name = "Foo" ;
 * me->age = 42 ;
 * me->city = "Fooville" ;
 * 
 * write( sprintf("%O\n", me) ) ;
 * 
 * // Result:
 * // CLASS( 3 elements
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * //  )
 * 
 * me = store_class_member( me, 1, 43 ) ;
 * 
 * write( sprintf("%O\n", me) ) ;
 * 
 * // Result:
 * // CLASS( 3 elements
 * //   "Foo",
 * //   43,
 * //   "Fooville"
 * //  )
 * }
 *
 */
mixed store_class_member(mixed instantiated_class, int class_element, mixed value);

/**
 * shuffle
 *
 * randomly reorders the elements of the given array (changes original!!!)
 *
 */
mixed *shuffle(mixed *arr);

/**
 * 
 *
 * 
 *
 */


/**
 * send_nullbyte - sends '\0' to interactive
 *
 * sends '\0' to interactive, returns -2 in case of error 1 otherwise
 *
 */
int send_nullbyte(object);

/**
 * roll_MdN() - dice roll generator where you specify the number of dice and
the number of sides to each die, with bonus if supplied.
 *
 * rolls `sides`-sided die `rolls` number of times and returns the sum
 * of all rolls
 * 
 * if `bonus` is supplied, will add the bonus and return the result.
 *
 * // roll a 1d4
 * roll_MdN(1, 4)
 * 
 * // roll 2d6
 * roll_MdN(2, 6)
 * 
 * // roll 1d10 and add 15
 * roll_MdN(1, 10, 15)
 * @param {int} rolls - number of dice
 * @param {int} sides - number of sides on each die
 * @param {int} bonus - (optional) bonus to add to the roll, defaults to 0
 */
int roll_MdN(int rolls, int sides, int bonus);

/**
 * restore_from_string() - like restore_object(), but restores variables from
a string where the string is in the same format as from restore_object()
 *
 * uses string as restore_object uses file meaning of int the same
 * @param {string} str - string to restore from
 * @param {int} flag - defaults to 0
 */
void restore_from_string(string str, int flag);

/**
 * replaceable - check if object is replaceable
 *
 * string *func defaults to ({ "create", "__INIT" }) and contains a list of
 * functions which may be ignored for checking
 * 
 * checks if object defines any functions itself (beside create)
 * 
 * returns 1 if no and object is not simul_efun object and not ???
 * 0 otherwise
 *
 */
int replaceable(object, void | string *func);

/**
 * repeat_string() - repeat a string a certain number of times.
 *
 * returns a new string
 * 
 * - repeats <= 0: ""
 * - repeats > 0 original string repeated either int times or the maximum
 * number of times without getting greater than the maximum string length
 * 
 * maxstrlen = 5:
 * repeat_string("ab", 3) = "abab"
 * 
 * maxstrlen >=6:
 * repeat_string("ab", 3) = "ababab"
 *
 */
string repeat_string(string str, int repeats);

/**
 * remove_shadow() - remove all shadows from the specified object, or remove
a specified shadow from another object. does not destruct the shadow.
 *
 * ob defaults to this_object()
 * returns 0 if object is either destroyed or is no shadow and isn't shadowed
 * returns 1 otherwise
 * 
 * ob <- shadow1 <- shadow2
 * 
 * remove(shadow2): ob <- shadow1 shadow2
 * remove(shadow1): ob <- shadow2 shadow1
 * remove(ob): shadow1 <- shadow2 ob
 * 
 * #ifndef NO_SHADOWS
 *
 */
int remove_shadow(object ob);

/**
 * remove_interactive - removes the interactive object
 *
 * If the argument object is interactive and not destructed, cause it to be
 * disconnected and lose interactive status. Returns 1 when the operation is
 * successful.
 * 
 * This function requires PACKAGE_CONTRIB to be defined in the options file.
 *
 */
int remove_interactive(object interactive);

/**
 * remove_get_char() - cancels active input_to
 *
 * cancels active input_to
 * set's interactive->carryover = NULL
 * set's interactive->num_carry = 0
 * 
 * returns -3 if argument missing
 * -2 if object destroyed or not interactive
 * -1 if no input_to active
 * 1 otherwise
 *
 */
int remove_get_char(object interactive);

/**
 * remove_charmode() - switches interactive object into linemode
 *
 * switches interactive object into linemode
 * 
 * returns -1 if argument missing
 * -2 in case of error (object destroyed or not interactive)
 * current input_to flags with char_mode unset
 *
 */
int remove_charmode(object);

/**
 * real_time
 *
 * returns local server time
 *
 */
int real_time();

/**
 * query_replaced_program
 *
 * obiect defaults to this_object()
 * 
 * if object called replace_program this function returns the path to the object
 * it was replaced with
 *
 */
string query_replaced_program(void | object);

/**
 * query_num
 *
 * Warning: English only!!!
 * 
 * Converts `num` into a string representation. If `many` is greater than 0
 * and `num` is greater than `many`, the resulting string is "many".
 * 
 * Any `num` greater than 99,999 is always "many", the same for any `num` less
 * than 0.
 * @param {int} num - number to convert
 * @param {int} many - (optional) defaults to 0
 */
varargs string query_num(int num, int many);

/**
 * query_notify_fail
 *
 * returns current notify_fail setting (funcp or string)
 * #ifndef NO_ADD_ACTION
 *
 */
mixed query_notify_fail();

/**
 * query_ip_port - returns local_port of connection
 *
 * object defaults to this_player()
 * 
 * returns local_port of connection or 0 if object not interactive
 *
 */
int query_ip_port(void | object);

/**
 * query_charmode
 *
 * returns -1 if argument missing
 * -2 in case of error (object destroyed or not interactive)
 * 0 if interactive object is in line mode
 * !0 otherwise (actual value depends on compile time define)
 *
 */
int query_charmode(object);

/**
 * program_info
 *
 * object defaults to ALL objects
 * 
 * returns mapping consinsting of:
 * 
 * - header size : int
 * - code size : int
 * - function size : int
 * - var size : int
 * - class size : int
 * - inherit size : int
 * - saved type size : int
 * - total size : int
 *
 */
mapping program_info(void | object);

/**
 * pluralize - return plural form
 *
 * for english only!
 * 
 * returns plural form:
 * 'a red house' -> 'red houses'
 * 'a sack of rice' -> 'sacks of rice'
 *
 */
string pluralize(string);

/**
 * num_classes - returns the number of classes used by object
 *
 * returns the number of classes used by object
 *
 */
int num_classes(object);

/**
 * network_stats
 *
 * returns mapping:
 * 
 * - incoming packets total : int
 * - incoming volume total : int
 * - outgoing packets total : int
 * - outgoing volume total : int
 * 
 * - incoming packets port X : int
 * - incoming volume port X : int
 * - outgoing packets port X : int
 * - outgoing volume port X : int
 * 
 * #ifdef PACKAGE_SOCKETS:
 * 
 * - incoming packets sockets : int
 * - incoming volume sockets : int
 * - outgoing packets sockets : int
 * - outgoing volume sockets : int
 *
 */
mapping network_stats();

/**
 * named_livings - return named livings
 *
 * returns all those livings [see efun::livings()] which have
 * set_living_name and enable_command called #ifndef NO_ADD_ACTION
 *
 */
object *named_livings( void );

/**
 * min() - searches for the minimum value inside an array
 *
 * Searches  minimum value for (int|float|string) arrays.  If flag is 0 or
 * omitted the minimum value will be returned, otherwise the  first  index
 * of its occurrence.
 *
 */
mixed min(mixed * arr);
mixed min(mixed * arr, int flag);

/**
 * memory_summary()
 *
 * returns mapping:
 * ([
 * "prog1" : ([
 * "var1" : mem_usage,
 * ...
 * ]),
 * ...
 * ])
 *
 */
mapping memory_summary();

/**
 * max() - searches for the maximum value inside an array
 *
 * Searches  maximum value for (int|float|string) arrays.  If flag is 0 or
 * omitted the maximum value will be returned, otherwise the  first  index
 * of its occurrence.
 *
 */
mixed max(mixed * arr); 
mixed max(mixed * arr, int flag);

/**
 * is_daylight_savings_time
 *
 * returns 1 if given time in given timezone is within daylight saving region
 * 0 if not
 * -1 on error
 *
 */
int is_daylight_savings_time(string, int);

/**
 * heart_beats - returns an array of all objects with enabled heartbeat
 *
 * returns an array of all objects with enabled heartbeat
 *
 */
object *heart_beats( void );

/**
 * get_garbage() - get all clones without environments or inventories which are
not shadowing.
 *
 * returns array of all (up to **MAX_ARRAY_SIZE**) those cloned(!) objects which
 * have neither environment nor inventory and aren't shadowing another object
 * and haven't object->super set
 *
 */
object *get_garbage();

/**
 * functions() - returns a string array of function names or mixed* array of
information for all functions in a passed object.
 *
 * Returns an array of strings containing the function names found in
 * <ob>. The functions returned will include all functions, whether public,
 * protected, or private. The <flag> parameter is by default zero.
 * 
 * Flag: 0
 * Returns: a string array containing function names, including all inherited
 * functions.
 * ({ "func1", "func2", "func3", "func4", ... })
 * 
 * Flag: 1
 * Returns: A two-dimensional array of mixed arrays containing additional
 * information about each function, including all inherited functions.
 * 
 * ({
 * ({
 * "func1",    // function name
 * 2,          // number of parameters in function
 * "int",      // return type of function
 * "object",   // the first parameter
 * "string *", // the second parameter
 * }),
 * ...
 * })
 * 
 * Flag: 2
 * Like Flag 0, but excludes inherited functions.
 * 
 * Flag: 3
 * Like Flag 1, but excludes inherited functions.
 *
 * @param {object} ob - object to query
 * @param {int} flag (optional) defaults to 0
 */
mixed *functions(object ob, int flag);

/**
 * function_owner - returns the object defining the given function
 *
 * returns the object defining the given function.
 *
 */
object function_owner(function);

/**
 * file_length - return the line count of a file
 *
 * returns
 * 
 * - line count
 * - -1 in case of error (e.g insufficient privs)
 * - -2 if file is directory
 *
 */
int file_length(string);

/**
 * fetch_variable - fetch a value stored in an object's global variable
 *
 * This efun returns the value stored in the global variable `variable_name`
 * in ob.
 * 
 * `variable_name` is name of the global variable.
 * `ob` defaults to this_object() if not specified.
 * 
 * If `ob` is not specified, then `variable_name` can be any global variable
 * in the inheritance hierarchy, regardless of scope.  If `ob` is specified,
 * then `variable_name` must be public scope.
 * 
 * This is a potential security hazard and, therefore, you may wish to overload
 * this function to perform security checks.
 *
 * int weight = fetch_variable( "weight", this_player() ) ;
 * printf("%d\n", weight") ;
 * 
 * // result: 150
 *
 */
mixed fetch_variable(string variable_name, void|object ob);

/**
 * fetch_class_member() - return the value of a specified, indexed member of
an instantiated class.
 *
 * Given an <instantiated_class>, return the value of the <index>th
 * member. This is particularly useful when you have an anonymous
 * class with no labels for the data members.
 *
 * mixed me = assemble_class( ({ "Foo", 42, "Fooville" }) ) ;
 * int age ;
 * string name, city ;
 * 
 * name = fetch_class_member( me, 0 ) ;
 * age = fetch_class_member( me, 1 ) ;
 * city = fetch_class_member( me, 2 ) ;
 *
 */
mixed fetch_class_member( mixed instantiated_class, int index );

/**
 * event() - call event_* in other objects with specified parameters. similar
to call_other, but with no return type.
 *
 * Calls "event_" + event_name in target. "event_" + event_name must be a
 * public function.
 * 
 * Target can be a single object or an array of objects.
 * 
 * If the target is a single object, the event efun will first call the event
 * function in the object and then it will call the event function all of the
 * objects in the target's all_inventory().
 * 
 * If the target is an array of objects, the event efun will call the event
 * function in all of the objects specified. Unlike the single-target version,
 * it will not cascade to each of the object's inventories.
 * 
 * The efun will pass as its first argument the calling object followed by
 * all of the specified arguments.
 *
 * // In a room
 * 
 * // will call event_heal_up on the room, and then every object in the room
 * event( this_object(), "heal_up", 50, 50 ) ;
 * 
 * // will call event_heal_up in the results of users() efun
 * event( users(), "heal_up", 25, 25 ) ;
 * 
 * // In a player object
 * 
 * // To take advantage of this event, write an event_heal_up in the player
 * // object to receive the call
 * void event_heal_up(object source, int health, int mana)
 * {
 * message("heal", sprintf("You were healed %d health and %d mana by %O.\n", health, mana, source), this_object()) ;
 * }
 *
 */
void event(object | object * target, string event_name, mixed *args...);

/**
 * element_of() - returns random elememt of given array
 *
 * returns random elememt of given array
 *
 */
mixed element_of(mixed *arr);

/**
 * disassemble_class() - given an instantiated class, returns a mixed* array
with elements comprised of the values of each member of the class.
 *
 * Given an <instantiated_class>, return a mixed array containing the
 * values of all of the members.
 *
 * class person {
 * string name ;
 * int age ;
 * string city ;
 * }
 * 
 * void fun()
 * {
 * mixed *result ;
 * class person me = new(class person);
 * 
 * me->name = "Foo" ;
 * me->age = 42 ;
 * me->city = "Fooville" ;
 * 
 * result = disassemble_class( me ) ;
 * 
 * write( sprintf("%O\n", result ) ) ;
 * 
 * // ({ /* sizeof() == 3 *\/
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * // })
 * }
 *
 */
mixed *disassemble_class( mixed instantiated_class );

/**
 * debug_message() - logs a debug message
 *
 * Prints  the  given message on the <stderr> file desciptor of the driver
 * and appends it to the debug log.
 *
 */
void debug_message(string msg);

/**
 * mixed copy(mixed arg) - return a deep copy of an array, buffer, class, or
mapping
 *
 * arg is either one of:
 * 
 * - array
 * - buffer (if compiled into driver)
 * - class
 * - mapping
 * 
 * returns deep copy
 * 
 * This is particularly useful when you wish to have data that is passed
 * by reference, but do not want to alter the original.
 *
 */
mixed copy(mixed arg);

/**
 * compressedp() - returns if interactive connection uses telopt compress
 *
 * returns if interactive connection uses telopt compress
 * #ifdef PACKAGE_COMPRESS
 *
 */
int compressedp(object ob);

/**
 * classes() - return names of classes used by object
 *
 * Return a string array consisting of names of classes used by <ob>.
 * 
 * The <verbose> parameter is optional and by default 0.
 * 
 * If <verbose> is non-zero, then  additional  information  will  be
 * returned.
 *
 * string *classes_used = classes( ob ) ;
 * // ({ "class_name", }) ;
 * 
 * mixed *classes_used = classes( ob, 1 ) ;
 * 
 * // ({
 * //     ({
 * //         "class_name",
 * //         ({
 * //             "member_name",
 * //             "type"
 * //         }),
 * //         ...
 * //     }),
 * //     ...
 * // })
 *
 */
mixed *classes(object ob, int verbose);

/**
 * base_name - return the base name without object id (OID)
 *
 * In the first version, return the segment of the <text> up to, but
 * not including the first occurrence of #.
 * 
 * Like the first version, but performs file_name on <ob> first.
 * 
 * Like the second version, but the object is this_object().
 *
 * string path = base_name( "/std/object#123" ) ;  // "/std/object"
 * 
 * object ob = new("/std/object) ;
 * string path = base_name( ob ) ;                 // "/std/object"
 * 
 * // in /std/object
 * string path = base_name() ;                     // "/std/object"
 *
 */
string base_name(string text);
string base_name(object ob);
string base_name();

/**
 * assemble_class() - provided an array, return a class composed of the members
of that array.
 *
 * Takes an array of <elements> and returns an instantiated class.
 *
 * mixed *elements = ({ "Foo", 42, "Fooville" }) ;
 * mixed cl = assemble_class( elements ) ;
 * 
 * write( sprintf( "%O\n", cl ) ) ;
 * 
 * // CLASS( 3 elements
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * //  )
 *
 */
mixed assemble_class( mixed *elements );

/**
 * abs() - return the absolute value of a number
 *
 * Returns the absolute value of the supplied <number>.
 *
 * int value = abs( 10 );      // 10
 * int value = abs( -10 );     // 10
 * float value = abs( 3.14 );  // 3.140000
 * float value = abs( -3.14 ); // 3.140000
 *
 */
mixed abs( int | float number );

