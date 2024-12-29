// general.h

/**
 * undefinedp() - determine whether or not a given variable is undefined.
 *
 * Return 1 if 'arg' is undefined.  'arg' will be undefined in the follow‐
 * ing cases:
 * 
 * 1.  it is a variable set equal to the return value of a call_other to a
 * non-existent method (e.g. arg = call_other(obj, "???")).
 * 
 * 2.  it  is  a variable set equal to the return value of an access of an
 * element  in  a   mapping   that   doesn't   exist   (e.g.   arg   =
 * map[not_there]).
 *
 */
int undefinedp( mixed arg );

/**
 * uncompress_file
 *
 * TBW
 *
 */
int uncompress_file(string, string);

/**
 * uncompress
 *
 * TBW
 *
 */
buffer uncompress(string | buffer);

/**
 * typeof() - return the type of an expression
 *
 * Return  the  type  of  an  expression.   The return values are given in
 * <type.h>.  They are:
 * 
 * T_INT           "int"
 * T_STRING        "string"
 * T_ARRAY         "array"
 * T_OBJECT        "object"
 * T_MAPPING       "mapping"
 * T_FUNCTION      "function"
 * T_FLOAT         "float"
 * T_BUFFER        "buffer"
 * T_CLASS         "class"
 * 
 * T_INVALID          "*invalid*"
 * T_LVALUE           "*lvalue*"
 * T_LVALUE_BYTE      "*lvalue_byte*"
 * T_LVALUE_RANGE     "*lvalue_range*"
 * T_LVALUE_CODEPOINT "*lvalue_codepoint*"
 * T_ERROR_HANDLER    "*error_handler*"
 * T_FREED            "*freed*"
 * T_UNKNOWN          "*unknown*"
 *
 */
string typeof( mixed var );

/**
 * translate
 *
 * TBW
 *
 */
float * translate(float *, float, float, float);

/**
 * start_request_term_type
 *
 * TBW
 *
 */
void start_request_term_type();

/**
 * sizeof()  -  return the number of elements in an array, mapping, buffer
or string
 *
 * Return the number of elements in an array, mapping,  string  or  buffer
 * 'var'.  If 'var' is not an array, mapping, string, or buffer, then zero
 * (0) is returned.
 *
 */
int sizeof( mixed var );

/**
 * shallow_inherit_list
 *
 * TBW
 *
 */
string * shallow_inherit_list(object);

/**
 * send_zmp
 *
 * TBW
 *
 */
void send_zmp(string, string *);

/**
 * scale
 *
 * TBW
 *
 */
float * scale(float *, float, float, float);

/**
 * save_variable() - save the value of variable into a string
 *
 * Saves  the  value of a variable to a string.  The format is the same as
 * save/restore_object.
 *
 */
string save_variable( mixed var );

/**
 * rotate_z
 *
 * TBW
 *
 */
float * rotate_z(float *, float);

/**
 * rotate_y
 *
 * TBW
 *
 */
float * rotate_y(float *, float);

/**
 * rotate_x
 *
 * TBW
 *
 */
float * rotate_x(float *, float);

/**
 * restore_variable() - restore value of a variable from a string
 *
 * Restore  values  of  a  variable from a string.  The format used is the
 * same format as save/restore_object.
 *
 */
mixed restore_variable( string value );

/**
 * request_term_type
 *
 * TBW
 *
 */
void request_term_type();

/**
 * request_term_size
 *
 * TBW
 *
 */
void request_term_size(int);

/**
 * parse_remove
 *
 * TBW
 *
 */
void parse_remove(string);

/**
 * parse_my_rules
 *
 * TBW
 *
 */
mixed parse_my_rules(object, string, int);

/**
 * parse_dump
 *
 * TBW
 *
 */
string parse_dump();

/**
 * parse_add_synonym
 *
 * TBW
 *
 */
void parse_add_synonym(string, string, string);

/**
 * nullp() - determine whether or not a given variable is null.
 *
 * Return 1 if 'arg' is null.  'arg' will be null in the following cases:
 * 
 * 1.  it has not yet been initialized.
 * 
 * 2.  it points to a destructed object.
 * 
 * 3.  it  is  a function (formal) parameter that corresponds to a missing
 * actual argument.
 * @template T
 * @param {T} arg - The variable to check
 * @returns {arg is 0} - 1 if the variable is null, 0 otherwise
 */
int nullp(mixed arg);

/**
 * norm
 *
 * TBW
 *
 */
float norm(int * | float *);

/**
 * next_bit
 *
 * TBW
 *
 */
int next_bit(string, int);

/**
 * map()  - modify an mapping, array, or string via application of a function
 *
 * If the first argument is a mapping, map() behaves exactly like map_map‐
 * ping().  If it is an array, map() behaves exactly like map_array().  If
 * it's argument is a string, map() passes each character (as an  int)  to
 * the  function,  and replaces the character with the return value if the
 * return value is a non-zero integer.
 */
varargs mapping map( mapping x, string fun, object ob, mixed extra... );
varargs mapping map( mapping x, function f, mixed extra... );
varargs string map( string x, string fun, object ob, mixed extra... );
varargs string map( string x, function f, mixed extra... );
varargs mixed* map( mixed* x, string fun, object ob, mixed extra... );

/**
 * @template T, Y
 * @callback mapCallback
 * @param {T} element The element to map
 * @returns {Y} The map callback return value
 */

/**
 * map()  - modify an array via application of a function
 *
 * If the first argument is a mapping, map() behaves exactly like map_map‐
 * ping().  If it is an array, map() behaves exactly like map_array().  If
 * it's argument is a string, map() passes each character (as an  int)  to
 * the  function,  and replaces the character with the return value if the
 * return value is a non-zero integer.
 * @template T
 * @template Y
 * @param {T*} x The array to map 
 * @param {mapCallback<T,Y>} f The callback function to apply to each element
 * @param extra Extra arguments to pass to the callback function
 * @returns {Y*} An array of the mapped values
 */
varargs mixed* map( mixed* x, function f, mixed extra... );


/**
 * lookat_rotate2
 *
 * TBW
 *
 */
float * lookat_rotate2(float *, float, float, float, float, float, float);

/**
 * lookat_rotate
 *
 * TBW
 *
 */
float * lookat_rotate(float *, float, float, float);

/**
 * log2
 *
 * TBW
 *
 */
float log2(float | int);

/**
 * log10
 *
 * TBW
 *
 */
float log10(float | int);

/**
 * id_matrix
 *
 * TBW
 *
 */
float * id_matrix();

/**
 * filter
 *
 * Returns a new string, array or mapping with the same elements as 'source'
 * whose elements pass the test implemented by the filter function.
 * 
 * A string is considered an array of integers, so the filter function is
 * called with the integer value of each character in the string.
 * 
 * The filter function must accept at least one argument, the element to be
 * tested and return a truthy value if the element should be included in the
 * result, or a falsy value if it should be excluded.
 * 
 * In the case of a mapping, filter will pass the key and value to the filter
 * function.
 * 
 * Any additional arguments given to filter() will be passed to the filter
 * function after the required arguments.
 * 
 * If the first syntax is used, the filter function is performed as a
 * call_other. If ob is a string, it is assumed to be the filename of an
 * object to load and call the filter function on.
 * @template {string|mapping|mixed*} T
 * @param {T} source - The source to filter
 * @returns {T} - The filtered source
 */
mixed filter(string|mapping|mixed* source,
             string filter_function,
             object|string ob,
             mixed *extra...);

/**
 * @template T
 * @callback filterCallback
 * @param {T} element The element to map
 * @returns The map callback return value
 */
/**
 * filter
 *
 * Returns a new string, array or mapping with the same elements as 'source'
 * whose elements pass the test implemented by the filter function.
 * 
 * A string is considered an array of integers, so the filter function is
 * called with the integer value of each character in the string.
 * 
 * The filter function must accept at least one argument, the element to be
 * tested and return a truthy value if the element should be included in the
 * result, or a falsy value if it should be excluded.
 * 
 * In the case of a mapping, filter will pass the key and value to the filter
 * function.
 * 
 * Any additional arguments given to filter() will be passed to the filter
 * function after the required arguments.
 * 
 * If the first syntax is used, the filter function is performed as a
 * call_other. If ob is a string, it is assumed to be the filename of an
 * object to load and call the filter function on.   
 * @template {string|mapping} T - string, mapping, or array
 * @param {T} source - The source to filter
 * @returns {T} - The filtered source
 */             
string|mapping filter(string|mapping source, function f, mixed *extra... );

/**
 * filter
 *
 * Returns an array with the same elements as 'source'
 * whose elements pass the test implemented by the filter function.
 * 
 * The filter function must accept at least one argument, the element to be
 * tested and return a truthy value if the element should be included in the
 * result, or a falsy value if it should be excluded.
 * 
 * Any additional arguments given to filter() will be passed to the filter
 * function after the required arguments.
 * 
 * If the first syntax is used, the filter function is performed as a
 * call_other. If ob is a string, it is assumed to be the filename of an
 * object to load and call the filter function on.   
 * @template T - string, mapping, or array
 * @param {T*} source - The source to filter
 * @param {filterCallback<T>} f - The filter function
 * @returns {T*} - The filtered source
 */       
mixed* filter(mixed* source, function f, mixed *extra... );

/**
 * explode_reversible
 *
 * TBW
 *
 */
string * explode_reversible(string, string);

/**
 * dump_trace
 *
 * TBW
 *
 */
mixed * dump_trace();

/**
 * dump_stralloc
 *
 * TBW
 *
 */
string dump_stralloc(string);

/**
 * dump_jemalloc
 *
 * TBW
 *
 */
void dump_jemalloc();

/**
 * dotprod
 *
 * TBW
 *
 */
float dotprod(int * | float *, int * | float *);

/**
 * distance
 *
 * TBW
 *
 */
float distance(int * | float *, int * | float *);

/**
 * destructed_objects
 *
 * TBW
 *
 */
mixed * destructed_objects();

/**
 * compress_file
 *
 * TBW
 *
 */
int compress_file(string, string);

/**
 * compress
 *
 * TBW
 *
 */
buffer compress(string | buffer);

/**
 * clear_debug_level
 *
 * This efun will toggle off the debug level for the specified option. The
 * options are the same as for set_debug_level() when using a string.
 * 
 * call_out
 * d_flag
 * connections
 * mapping
 * sockets
 * comp_func_tab
 * LPC
 * LPC_line
 * event
 * dns
 * file
 * add_action
 * telnet
 * websocket
 *
 * clear_debug_level("call_out");
 *
 */
void clear_debug_level(string);

/**
 * classp
 *
 * Will return if the item `arg` is a class or not. If `arg` is a class,
 * then the function will return 1, otherwise it will return 0.
 *
 * class Person {
 * string name;
 * int age;
 * }
 * 
 * void runit() {
 * class Person p = new(class Person, name: "Bob", age: 42);
 * 
 * printf("classp(p) = %d", classp(p)); // 1
 * printf("classp(0) = %d", classp(0)); // 0
 * printf("classp(this_object()) = %d", classp(this_object())); // 0
 * }
 *
 */
int classp(mixed arg);

/**
 * check_memory
 *
 * TBW
 *
 */
string check_memory(int);

/**
 * angle
 *
 * TBW
 *
 */
float angle(int * | float *, int * | float *);

/**
 * act_mxp
 *
 * TBW
 *
 */
void act_mxp();

