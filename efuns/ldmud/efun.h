// efun.h

/**
 * xor_bits
 *
 * <str1> and <str2> are both bitstrings. The result of the function
 * is a bitstring with the binary-xor of <str1> and <str2>,
 * ie. a string in which a bit is set only if the corresponding
 * bits in either <str1> or <str2> (but not both) is set.
 *
 * @example 
 * string s1, s2, s3;
 * 
 * s1 = set_bit("", 3); s1 = set_bit(s1, 15);  -> s1 is "( ("
 * s2 = set_bit("", 3); s2 = set_bit(s2, 4);   -> s2 is "8"
 * 
 * s3 = xor_bits(s1, s2);
 * 
 * // -> s3 is now "0 (", ie. a bitstring with bits 4 and 15 set.
 *
 *
 */
string xor_bits(string str1, string str2);

/**
 * xml_parse
 *
 * Parses the given string <xml> as a XML conform string. The string must
 * have only one root tag, subsequent root tags are ignored.
 * 
 * If the xml string is correct, an array is of three elements is
 * returned, where as the following indices are defined:
 * 
 * string XML_TAG_NAME
 * The name of the XML tag.
 * 
 * mapping XML_TAG_ATTRIBUTES
 * All attributes given to the XML tag as mapping where the key
 * is the attribute name and the value is its string value.
 * 
 * If the xml tag does not contain any attributes, this element
 * is set 0.
 * 
 * mixed * XML_TAG_CONTENTS
 * The contents of this xml tag as array. This array may
 * contain either strings, or arrays of sub-tags again with
 * three elements (see example)
 * 
 * If the xml tag does not contain anything, the element is
 * set 0.
 * 
 * If the XML string is not well formed, or there is not enough memory to
 * parse the whole XML structure into the array an error is raised.
 * 
 * The function is available only if the driver is compiled with Iksemel
 * support. In that case, __XML_DOM__ is defined.
 *
 * @example 
 * xml_parse("<abc/>")           -> ({ "abc", 0, 0 })
 * xml_parse("<abc xyz="cde"/>") -> ({ "abc", ([ "xyz" : "cde" ]), 0 })
 * 
 * xml_parse("<book language="common">" +
 * "    <title>This is the title</title>" +
 * "    <chapter>This is a chapter</chapter>" +
 * "    <chapter>We want <b>bold</b> here.</chapter>" +
 * "</book>")
 * 
 * -> ({ "book"
 * , ([ "language" : "common" ])
 * , ({ ({ "title"
 * , 0
 * , ({ "This is a title" })
 * })
 * , ({ "chapter"
 * , 0
 * , ({ "This is a chapter" })
 * })
 * , ({ "chapter"
 * , 0
 * , ({ "We want "
 * , ({ "b"
 * , 0
 * , ({ "bold" })
 * })
 * , "here"
 * })
 * })
 * })
 * })
 *
 * @since Added in LDMud 3.3.718.
 *
 */
mixed * xml_parse(string xml);

/**
 * xml_generate
 *
 * Converts the given <xml> array into an XML conform string, if
 * possible. The <xml> argument array must have the following structure.
 * 
 * It must contain tag arrays of three elements, with the following
 * indices:
 * 
 * string XML_TAG_NAME
 * The name of the XML tag.
 * 
 * mapping XML_TAG_ATTRIBUTES
 * All attributes given to the XML tag as mapping where the key
 * is the attribute name and the value is its string value.
 * 
 * If the xml tag does not contain any attributes, this element
 * is set 0:
 * 
 * mixed * XML_TAG_CONTENTS
 * The contents of this xml tag as array. This array may
 * contain either strings, or arrays of sub-tags again with
 * three elements (see example)
 * 
 * If the xml tag does not contain anything, the element is
 * set 0.
 * 
 * In case the parameter does not follow these rules, errors are raised.
 * The method returns a valid XML string otherwise.
 * 
 * The function is available only if the driver is compiled with Iksemel
 * support. In that case, __XML_DOM__ is defined.
 *
 * @example 
 * xml_generate(({ "abc", 0, 0 })) -> "<abc/>"
 * xml_generate(({ "abc", ([ "xyz" : "cde" ]), 0 })) -> "<abc xyz="cde"/>"
 * 
 * mixed *xml = ({ "book"
 * , ([ "language" : "common" ])
 * , ({ ({ "title"
 * , 0
 * , ({ "This is a title" })
 * })
 * , ({ "chapter"
 * , 0
 * , ({ "This is a chapter" })
 * })
 * , ({ "chapter"
 * , 0
 * , ({ "We want "
 * , ({ "b"
 * , 0
 * , ({ "bold" })
 * })
 * , "here"
 * })
 * })
 * })
 * })
 * 
 * xml_generate(xml)
 * // -> "<book language="common"><title>This is the title</title>"
 * // "<chapter>This is a chapter</chapter><chapter>We want "
 * // "<b>bold</b> here.</chapter></book>"
 *
 * @since Added in LDMud 3.3.718.
 *
 */
string xml_generate(mixed *xml);

/**
 * write_file
 *
 * Append the string <str> to the file <file>. Returns 1 for success
 * and 0 if any failure occurred.
 * 
 * If <flags> is 1, the file is removed first; thus making the
 * 'append' effectively an 'overwrite'. Default for <flags> is 0.
 * 
 * <encoding> denotes the encoding to be used for saving the string
 * in the file. If it is not given or 0, the H_FILE_ENCODING driver
 * hook will be used.
 *
 * @since LDMud 3.3.523 added the <flags> parameter.
        LDMud 3.6.0 added the <encoding> parameter.
 *
 */
int write_file(string file, string str);

int write_file(string file, string str, int flags);

int write_file(string file, string str, int flags, string encoding);

/**
 * write_bytes
 *
 * Write string str to file file by overwriting the old bytes at
 * position start. If start is a negative value then it will be
 * counted from the end of the file. The file will not be
 * appended, instead the function will be aborted. Returns 1 for
 * success 0 for failure during execution.
 * 
 * Note: since version 3.2@232, write_bytes() is able to append
 * to the file.
 *
 *
 */
int write_bytes(string file, int start, bytes str);

/**
 * write
 *
 * Write out something to the current user. What exactly will
 * be printed in the end depends of the type of msg.
 * 
 * If it is a string or a number then just prints it out.
 * 
 * If it is an object then the object will be printed in the
 * form: "OBJ("+object_name((object)mix)+")"
 * 
 * If it is an array just "<ARRAY>" will be printed.
 * If it is a mapping just "<MAPPING>" will be printed.
 * If it is a closure just "<CLOSURE>" will be printed.
 * 
 * If the write() function is invoked by a command of an living
 * but not interactive object and the given argument is a string
 * then the lfun catch_tell() of the living will be invoked with
 * the message as argument.
 *
 * @example 
 * write("Hello world!\n"); 
 * 
 * // Just print out a string.
 * 
 * write(this_player());
 * 
 * // This will print out something like "OBJ(std/player#1234)".
 * 
 * write( ({ "blub" }) );
 * 
 * // Will print out "<ARRAY>".
 *
 * @param msg The message to write.
 */
void write(mixed msg);

/**
 * wizlist_info
 *
 * Returns an array with the interesting entries of the wizlist.
 * Needs to be privileged by the master object.
 * 
 * The result is an array with one entry for every wizard (uid).
 * Every entry is an array itself:
 * 
 * ```
 * string w[WL_NAME]        // = Name of the wizard.
 * int    w[WL_COMMANDS]    // = Weighted number of commands execute by objects of this wizard.
 * int    w[WL_COST],
 * int    w[WL_GIGACOST]    // = Weighted sum of eval_costs.
 * int    w[WL_TOTAL_COST],
 * int    w[WL_TOTAL_GIGACOST] // = Total sum of eval_costs.
 * int    w[WL_HEART_BEATS]    // = Weighted count of heart_beats.
 * int    w[WL_CALL_OUT]       // = Reserved for call_out() (unused yet).
 * int    w[WL_ARRAY_TOTAL]    // = Total size of arrays in elements.
 * int    w[WL_MAPPING_TOTAL]  // = Total size of mappings in elements.
 * int    w[WL_STRUCT_TOTAL]   // = Total size of structs in elements.
 * mixed  w[WL_EXTRA]          // = Extra wizlist-info if set.
 * ```
 * 
 * The 'weighted' entries decay every hour by 10%.
 *
 * @since LDMud 3.2.10 split the old WL_EVAL_COST into WL_COST and WL_GIGACOST
          to accomodate for longer uptimes, and introduced
          WL_TOTAL_COST/WL_TOTAL_GIGACOST.
        LDMud 3.3.174 added WL_MAPPING_TOTAL.
        LDMud 3.3.? added WL_STRUCT_TOTAL.
 *
 */
mixed * wizlist_info();

/**
 * widthof
 *
 * Returns the number of values per key of mapping <map>.
 * If <map> is 0, the result is 0.
 *
 * @example 
 * mapping m = ([ "foo": 1;2 ]);
 * widthof(m)  --> returns 2
 *
 * @since Introduced in LDMud 3.2.6.
 *
 */
int widthof(mapping map);

/**
 * walk_mapping
 *
 * Calls ob->func(key, &value1, ..., &valueN, extra,...) resp. applies
 * the closure to every entry in the mapping. The keys are passed
 * by value, the values are passed by reference and can be
 * changed in the function.
 * 
 * Any number of extra arguments is accepted and passed.
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 *
 * @since Introduced in 3.2@61
 *
 */
void walk_mapping(mapping m, string func, varargs mixed extra );

void walk_mapping(mapping m, string func, string|object ob, varargs mixed extra );

void walk_mapping(mapping m, closure cl, varargs mixed extra );

/**
 * variable_list
 *
 * Return an array with information about <ob>s variables. For
 * every variable, 1 to 3 values (depending on <flags>) are
 * stored in the result array conveying in this order:
 * - the name of the variable
 * - the variable flags (see below)
 * - the return type (listed in <lpctypes.h>)
 * - the value of the variable
 * 
 * <ob> may be given as true object or as a filename. In the latter
 * case, the efun does not try to load the object before proceeding.
 * 
 * If <ob> is not the current object and the value of the variable is
 * requested, a privilege_violation ("variable_list", <ob>) occurs.
 * 
 * <flags> determines both which information is returned for every
 * variable, and which variables should be considered at all.
 * Its value is created by bin-or'ing together following flags from
 * <functionlist.h>:
 * 
 * Control of returned information:
 * RETURN_FUNCTION_NAME    include the variable name
 * RETURN_FUNCTION_FLAGS   include the variable flags
 * RETURN_FUNCTION_TYPE    include the variable type as an integer
 * RETURN_FUNCTION_LPCTYPE include the variable type as an lpctype
 * RETURN_VARIABLE_VALUE   include the variable value
 * 
 * Control of listed variables:
 * NAME_INHERITED      don't list if defined by inheritance
 * TYPE_MOD_STATIC ==
 * TYPE_MOD_NOSAVE     don't list if nosave ('static') variable
 * TYPE_MOD_PRIVATE    don't list if private
 * TYPE_MOD_PROTECTED  don't list if protected
 * NAME_HIDDEN         don't list if not visible through inheritance
 * 
 * The 'flags' information consists of the bin-or of the list control
 * flags given above, plus the following:
 * 
 * TYPE_MOD_VIRTUAL    variable is inherited virtually
 * TYPE_MOD_NO_MASK    variable is nomask
 * TYPE_MOD_PUBLIC     variable is public
 * 
 * All these flags are defined in <functionlist.h>, the
 * return types are defined in <lpctypes.h>.
 *
 * @since Introduced in LDMud 3.2.10.
        LDMud 3.6.7 introduced RETURN_FUNCTION_LPCTYPE.
 *
 */
/**
 * variable_exists
 *
 * Look up a variable <str> in the current object, respectively
 * in the object <ob>.
 * 
 * The result is the name of the program the variable is defined
 * in. This can be either object_name(ob), or the name of an
 * inherited program. If !compat mode, the returned name always
 * begins with a '/'.
 * 
 * If <flags> can be passed as NAME_HIDDEN to return information
 * about static and protected variables in other objects. It is
 * not possible to return information about private variables.
 * 
 * If the variable cannot be found (because it doesn't exist or
 * it is not visible to the caller), the result is 0.
 *
 * @since Introduced in LDMud 3.2.10.
 *
 */
string variable_exists(string str);

string variable_exists(string str, int flags);

string variable_exists(string str, object|lwobject ob);

string variable_exists(string str, object|lwobject ob, int flags);

/**
 * utime
 *
 * Return the time since 1. Jan 1970, 00:00:00 GMT in microsecond
 * precision.
 * 
 * Return is an array:
 * int[0]: number of seconds elapsed
 * int[1]: number of microseconds within the current second.
 *
 * @example 
 * write(ctime(utime())+"\n");
 * 
 * // Print out the current date and time.
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int * utime();

/**
 * users
 *
 * Return an array containing all interactive users.
 *
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER*} An array of all interactive users.
 */
object * users();

/**
 * upper_case
 *
 * Convert all characters in str to upper case, and return the
 * new string.
 *
 * @example 
 * upper_case("Heya!") -> "HEYA!"
 *
 *
 */
string upper_case(string str);

/**
 * unshadow
 *
 * The calling object stops shadowing any other object.
 * If the calling object is being shadowed, that is also stopped.
 *
 *
 */
void unshadow();

/**
 * unquote
 *
 * Removes a quote from quoted arrays and symbols. When the
 * last quote from a symbol is removed, the result is a string.
 *
 * @example 
 * unquote('foo) -> "foo"
 * unquote( '({1,2,3}) ) -> ({1,2,3})
 *
 * @since Introduced in LDMud 3.2.9 .
 *
 */
mixed * unquote(quoted_array);

string|symbol unquote(symbol);

/**
 * unmkmapping
 *
 * Take mapping <map> and return an array of arrays with the keys
 * and values from the mapping.
 * 
 * The return array has the form ({ keys[], data0[], data1[], ... }),
 * with keys[] being the array of all keys, data0[] the array of
 * all values in the first column, data1[] the array of all values
 * in the second column, etc. In particular, the data for key[x]
 * is stored in data0[x], data1[x], etc.
 * 
 * unmkmapping() is inverse to mkmapping(), so that
 * 
 * apply(#'mkmapping, unmkmapping(m)) == m
 * 
 * holds.
 *
 * @example 
 * mapping m = ([ 1:10;20, 2:11;21 ]);
 * unmkmapping(m)
 * --> returns ({ ({1, 2}), ({ 10, 11 }), ({ 20, 21 }) })
 *
 * @since Introduced in LDMud 3.2.6.
 *
 */
mixed * unmkmapping(mapping map);

/**
 * unique_array
 *
 * Groups objects together for which the separator function returns the
 * same value. obarr should be an array of objects, other types are
 * ignored.
 * 
 * If the separator function is defined by name, it is searched and
 * called in the objects from <obarr>. If <extra> arguments are given,
 * they are passed to the function as arguments.
 * 
 * If the separator function is defined as a closure, it will be passed
 * the objects from <obarr> as first argument, with the <extra> arguments
 * (if any) passed following.
 * 
 * If the <skip> argument is given (it is required when <extra> arguments
 * are to be used), and the return value from the separator function call
 * matches this value, the object in question will _not_ be included in
 * the returned array. Default value for <skip> is the number 0.
 * 
 * The returned array is an array of arrays of objects in the form:
 * 
 * ({ ({ Same1:1, Same1:2, ... Same1:N }),
 * ({ Same2:1, Same2:2, ... Same2:N }),
 * ....
 * ({ SameM:1, SameM:2, ... SameM:N }) })
 *
 * @example 
 * mixed *arr;
 * arr=unique_array(users(), "_query_level", -1);
 * 
 * This will return an array of arrays holding all user objects
 * grouped together by their user levels. Wizards have a user
 * level of -1 so they will not appear in the the returned array.
 *
 * @since LDMud 3.3 added the possibility to call closures, and to
          pass extra arguments to the separator function.
 *
 */
<object|lwobject>** unique_array(<object|lwobject> *obarr, string|closure fun);

<object|lwobject>** unique_array(<object|lwobject> *obarr, string|closure fun, mixed skip);

<object|lwobject>** unique_array(<object|lwobject> *obarr, string|closure fun, varargs mixed extra, mixed skip);

/**
 * unbound_lambda
 *
 * Constructs a lambda closure that is not bound to an object,
 * like lambda function in LISP.
 * The closure cannot contain references to global variables, and
 * all lfun closures are inserted as is, since there is no native
 * object for this closure. You need to bind it before it can be
 * called. Ordinary objects can only bind to themselves, binding
 * to other objects causes a privilege violation(). The point is
 * that previous_object for calls done from inside the closure
 * will reflect the object doing bind_lambda(), and all object /
 * uid based security will also refer to this object.
 * 
 * The first argument is an array describing the arguments
 * (symbols) passed to the closure upon evaluation by funcall()
 * or apply(), the second arg forms the code of the closure.
 *
 * @since Introduced in 3.2@82.
 *
 */
closure unbound_lambda(mixed *args, mixed code);

/**
 * typeof
 *
 * Returns a code for the type of the argument, as defined in
 * <lpctypes.h>.
 *
 * @since Introduced in 3.2@63.
 *
 */
int typeof(mixed t);

/**
 * trim
 *
 * Remove all leading and trailing characters <ch> from the string
 * <s> and return the new string.
 * 
 * <ch> may be given as a single character, or a string of characters.
 * If <ch> is not given, it defaults to the whitespace " \t".
 * 
 * <where> can be used to modify where the characters are removed:
 * 
 * TRIM_LEFT  (1):      remove the leading characters
 * TRIM_RIGHT (2):      remove the trailing characters
 * TRIM_BOTH  (3 or 0): remove both leading and trailing characters
 *
 * @example 
 * trim("   1234   ")                  --> "1234"
 * trim("   1234   ", TRIM_RIGHT)      --> "   1234"
 * trim("   1234   ", TRIM_BOTH, " 1") --> "234"
 *
 * @since Introduced in LDMud 3.2.7.
 *
 */
string trim(string s);

string trim(string s, int where);

string trim(string s, int where, int ch);

string trim(string s, int where, string ch);

/**
 * transpose_array
 *
 * transpose_array(({ ({1,2,3}), ({a,b,c}) }))
 * == ({ ({1,a}), ({2,b}), ({3,c}) })
 * 
 * transpose_array() applied to an alist results in an array of
 * ({ key, data }) pairs, useful if you want to use sort_array()
 * or filter() on the alist.
 *
 * @example 
 * sort_array(transpose_array(({ m_indices(map), m_values(map) })),
 * lambda(({ 'a, 'b }),
 * ({ #'<, ({ #'[, 'a, 0 }),
 * ({ #'[, 'b, 0}) }) )
 * 
 * The given mapping 'map' is returned as an array of
 * ({ key, data }) pairs, sorted by the keys.
 *
 *
 */
mixed * transpose_array(mixed *arr);

/**
 * transfer
 *
 * This efun is for backward compatibility only. It is only
 * available in compat mode.
 * 
 * Move the object "item" to the object "dest". All kinds of
 * tests are done, and a number is returned specifying the
 * result:
 * 
 * 0: Success.
 * 1: To heavy for destination.
 * 2: Can't be dropped.
 * 3: Can't take it out of it's container.
 * 4: The object can't be inserted into bags etc.
 * 5: The destination doesn't allow insertions of objects.
 * 6: The object can't be picked up.
 * 
 * If an object is transfered to a newly created object, make
 * sure that the new object first is transfered to it's
 * destination.
 * 
 * The efun calls add_weight(), drop(), get(), prevent_insert(),
 * add_weight(), and can_put_and_get() where needed.
 *
 * @since Deprecated in LDMud 3.3; available only when compiled with
          USE_DEPRECATED.
 *
 */
int transfer(object item, object dest);

/**
 * traceprefix
 *
 * If called with a string, only objects matching this prefix will
 * be traced. The string must not contain a leading "/" because
 * the object names are stored internally without it. If called
 * with a number, the traceprefix will be ignored and all objects
 * will be traced. Returns the last traceprefix or 0 if there
 * wasn't any.
 * 
 * The master-lfun valid_trace() is called with ("traceprefix", prefix)
 * as arguments to verify the use of this efun.
 *
 * @example 
 * object obj;
 * string prefix;
 * obj = find_player("wessex");
 * prefix = object_name(obj);
 * prefix = prefix[1..];  /* cut off the leading "/" *\/
 * traceprefix(prefix);
 * /* From here on, only code in the object "std/player#69"
 * * will be traced.
 * *\/
 * trace(TRACE_CALL | TRACE_CALL_OTHER | TRACE_RETURN | TRACE_ARGS);
 * ...
 * trace(TRACE_NOTHING);
 *
 * @since LDMud 3.2.9 passes the <prefix> argument to the valid_trace()
        apply as well.
 *
 */
string traceprefix(string prefix);

string traceprefix(int dummy);

/**
 * trace
 *
 * Sets the trace flags and returns the old trace flags. When
 * tracing is on, a lot of information is printed during
 * execution and too much output can crash your connection or
 * even the whole driver.
 * 
 * Tracing is done on a per-connection basis: each interactive(!)
 * user may specifiy their own tracelevel and -prefix. Each gets the
 * traceoutput for just the code executed during the evaluation
 * of the commands he entered.
 * 
 * The trace bits are:
 * 
 * TRACE_NOTHING     (  0): stop tracing.
 * 
 * TRACE_CALL        (  1): trace all calls to lfuns.
 * TRACE_CALL_OTHER  (  2): trace call_others()s.
 * TRACE_RETURN      (  4): trace function returns.
 * TRACE_ARGS        (  8): print function arguments and results.
 * TRACE_EXEC        ( 16): trace all executed instructions.
 * TRACE_HEART_BEAT  ( 32): trace heartbeat code.
 * TRACE_APPLY       ( 64): trace driver applies.
 * TRACE_OBJNAME     (128): print the object names.
 * 
 * TRACE_EXEC and TRACE_HEART_BEAT should be avoided as they cause
 * massive output! TRACE_OBJNAME should be avoided when you know
 * what you trace.
 * 
 * The master-lfun valid_trace() is called with ("trace", traceflags)
 * as argument to verify the use of this efun.
 *
 * @example 
 * object obj;
 * string prefix;
 * obj = find_player("wessex");
 * prefix = object_name(obj);
 * prefix = prefix[1..];  /* cut off the leading "/" *\/
 * traceprefix(prefix);
 * /* From here on, only code in the object "std/player#69"
 * * will be traced.
 * *\/
 * trace(TRACE_CALL|TRACE_CALL_OTHER|TRACE_RETURN|TRACE_ARGS);
 * ...
 * trace(TRACE_NOTHING);
 *
 * @since LDMud 3.2.9 passes the <traceflags> argument to the valid_trace()
        apply as well.
 *
 */
int trace(int traceflags);

/**
 * to_text
 *
 * The first argument is converted to a unicode string.
 * 
 * The first two variants convert an encoded text, given as
 * a sequence of bytes, to string. The second argument denotes
 * the name of the encoding used to produce the byte sequence.
 * 
 * The third variant just returns the argument.
 * 
 * The fourth variant converts a sequence of unicode characters
 * to string.
 *
 * @since Introduced in LDMud 3.6.0.
 *
 */
string to_text(bytes bytesequence, string encoding);

string to_text(int* bytes, string encoding);

string to_text(string unicode);

string to_text(int* characters);

/**
 * to_struct
 *
 * The given array, mapping or struct <data> is returned as a struct.
 * If a <template> struct is given, the returned struct is of the same
 * type. Without a template, an anonymous struct is returned in case of
 * arrays and mappings and in case of structs <data> is returned
 * unchanged.
 * 
 * If <data> is an array, its elements are assigned in order to the
 * resulting struct. For an anonymous struct, all elements of <data>
 * are assigned, for a templated struct only as many as fit into
 * the struct.
 * 
 * If <data> is a mapping and no template is given, the resulting
 * anonymous struct contains all elements from <data> with a string
 * key; the key name is used as struct member name.
 * 
 * If <data> is a mapping and a template is given, the struct
 * member names are used as keys for lookups in <data>; the found
 * data is assigned to the struct members.
 * 
 * If <data> is a struct and a template is given, a struct of the type
 * of template is created and all members from <data> are copied to the
 * new struct, which exist in both structs. This conversion is only
 * allowed between a struct and one of its base structs or a base struct
 * and one of its children. Otherwise an error is raised.
 * 
 * Neither <data> nor <template> will be changed in this process - the
 * result is a new struct value. The actual value of <template> does not
 * matter, only its type.
 * 
 * Since the returned struct can't be known at compile time, the
 * efun is declared to return 'mixed'.
 *
 * @since Introduced in LDMud 3.3.250 .
        LDMud 3.3.344 added the template argument.
        LDMud 3.3.433 added the conversion from mappings.
        LDMud 3.3.720 added the conversion of structs into another struct.
 *
 */
mixed to_struct(mixed *|mapping data);
mixed to_struct(mixed *|mapping data, struct template t);
mixed to_struct(struct data d);
mixed to_struct(struct data d, struct template t);

/**
 * to_string
 *
 * The argument is converted to a string. Works with int, float,
 * object, arrays, structs, symbols, strings and closures.
 * 
 * Converts closures and structs into an appropriate name (this
 * has mostly debugging purposes).
 * 
 * CAVEAT: Arrays are considered exploded strings, ie. arrays of
 * Unicode codepoints (i.e. each number is one Unicode character),
 * and are 'imploded' up to the first non-number entry, whatever
 * comes first. That means that to_string(({ 49, 50 })) will return
 * "12" and not "({ 49, 50 })".
 *
 * @since LDMud 3.2.8 adds lambda closures to the accepted data types.
        LDMud 3.3.250 adds structs to the accepted data types.
 *
 */
string to_string(mixed s);

/**
 * to_object
 *
 * The argument is converted into an object, if possible.
 * 
 * For strings, the object with a matching object_name() is
 * returned, or 0 if there is none, as find_object() does.
 * 
 * For (bound!) closures, the object holding the closure is
 * returned (for 'alien lfun closures' this is the object which
 * created the closure, not the object the lfun is defined in).
 * 
 * Objects and the number 0 return themselves.
 *
 *
 */
object to_object(string arg);

object to_object(closure arg);

object to_object(object arg);


/**
 * to_lpctype
 *
 * Interprets the given string as an lpc type. This efun basically
 * returns the same type as the [<type>] literal.
 *
 * @since Introduced in LDMud 3.6.7.
 *
 */
lpctype to_lpctype(string type);

/**
 * to_int
 *
 * Floats are truncated to integer values, strings with leadings
 * digits are converted to integers up to the first non-digit.
 * lfun-closures are converted into their function index (not adjusted
 * for inheritance), variable closure are converted into their variable
 * index.
 * Integers are just returned.
 * 
 * Regarding floats, it is important to keep rounding effects
 * in mind: to_int(3.1*10.0) does not return 31, but instead 30,
 * because internally the result of the multiplication is 30.999999.
 * 
 * The function supports the '0x', '0o' and '0b' base prefixes.
 *
 * @since Introduced in 3.2.1@2.
        LDMud 3.2.11/3.3.611 added support for the base prefixes.
 *
 */
int to_int(string i);

int to_int(float f);

int to_int(int i);

int to_int(closure c);


/**
 * to_float
 *
 * Ints are expanded to floats, strings are converted up to the
 * first character that doesnt belong into a float.
 * Floats are just returned.
 *
 *
 */
float to_float(int f);

float to_float(string f);

float to_float(float f);


/**
 * to_bytes
 *
 * The first argument is converted to a byte sequence.
 * 
 * The first two variants convert a unicode string resp. a sequence
 * of unicode characters to a byte sequence that represents
 * the encoded string. The second argument denotes the name of
 * the encoding to use.
 * 
 * The third variant just returns the argument.
 * 
 * The fourth variant converts an array of bytes to a byte string.
 *
 * @since Introduced in LDMud 3.6.0.
 *
 */
bytes to_bytes(string unicode, string encoding);

bytes to_bytes(int* characters, string encoding);

bytes to_bytes(bytes bytesequence);

bytes to_bytes(int* bytes);

/**
 * to_array
 *
 * Strings and symbols are converted to an int array that
 * consists of the args characters. Note that the string "12" will be
 * converted to the array ({ 33, 34 }), and not ({ 33, 34, 0 }) (the
 * LDMud versions prior to 3.3 returned the latter array).
 * 
 * Byte sequences are converted into an array of these bytes.
 * 
 * Quoted arrays are ``dequoted'', and arrays are left as they
 * are.
 * 
 * Structs are converted into a normal array.
 * 
 * Union lpc types are split into their union member types
 * (in no particular order).
 *
 * @since LDMud 3.3.250 added structs to the accepted data types.
 *
 */
mixed * to_array(string arr);

mixed * to_array(bytes arr);

mixed * to_array(symbol arr);

mixed * to_array(quotedarray arr);

mixed * to_array(mixed * arr);

mixed * to_array(struct s arr);

mixed * to_array(lpctype arr);



/**
 * tls_refresh_certs
 *
 * Reload the certificates and certificate revocation information.
 * 
 * If there are no key and certificate files to be found, this efun
 * will keep the current keys and certificates, to keep TLS working.
 * CAs and CRLs are cleared and reloaded in any case.
 * 
 * Note that when using GnuTLS a call to tls_refresh_certs()
 * while a connection is in the middle of a TLS handshake might
 * result in a wrong key to be used.
 *
 * @since Introduced in LDMud 3.3.714/3.2.15.
 *
 */
void tls_refresh_certs();

/**
 * tls_query_connection_state
 *
 * tls_query_connection_state() returns a positive number if <ob>'s
 * connection is TLS secured, 0 if it's unsecured, and a negative number
 * if the TLS connection setup is still being set-up.
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
 *
 */
int tls_query_connection_state(object ob);

/**
 * tls_query_connection_info
 *
 * If <ob> does not have a TLS connection or if the connection
 * is still being set-up, or if <ob> is not interactive, the efun
 * returns 0.
 * 
 * If <ob> has a TLS connection, tls_query_connection_info()
 * returns an array that contains some parameters of <ob>'s
 * connection:
 * 
 * int|string [TLS_CIPHER]: the cipher used
 * int        [TLS_COMP]:   the compression used
 * int        [TLS_KX]:     the key-exchange used
 * int        [TLS_MAC]:    the digest algorithm used
 * int|string [TLS_PROT]:   the protocol used
 * 
 * To translate these numbers into strings, <tls.h> offers a
 * number of macros:
 * 
 * TLS_xxx_TABLE: a literal array of strings describing the
 * value in question.
 * TLS_xxx_NAME(x): a macro translating the numeric result
 * value into a string.
 * 
 * xxx: CIPHER, COMP, KX, MAC, PROT
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
 *
 */
int * tls_query_connection_info(object ob);

/**
 * tls_init_connection
 *
 * tls_init_connection() tries to start a TLS secured connection to
 * the interactive object <ob> (or this_object() if <ob> is not given).
 * 
 * Result:
 * errorcode < 0: unsuccessful, use tls_error() to get an useful
 * description of the error
 * number > 0: the secure connection is still being set up in the
 * background
 * number == 0: the secure connection is active.
 * 
 * OpenSSL only:
 * 
 * If the callback <fun>/<fun>:<fob> is specified, it will be called
 * once the fate of the secure connection has been determined. The
 * first argument will be the return code from the handshake
 * (errorcode < 0 on failure, or 0 on success), followed by the
 * interactive object <ob> and any <extra> arguments.
 * 
 * If the TLS setup fails, it is not necessary to call
 * tls_deinit_connection().
 * 
 * IMPORTANT: During the TLS handshake nothing else must be sent
 * to the client! For the most cases (TLS-capable clients logging in)
 * this means that the TLS handshake is the first and only thing the
 * client gets to see while the handshake is in progress.
 * 
 * The driver automatically suppresses the printing of the prompt
 * while the TLS handshake is in progress.
 * 
 * If tls_init_connection() is called in the master::connect() function,
 * the driver will either call the set callback in place of logon(), or
 * if not callback has been set, delay the call of logon() until the
 * state of the connection is clear.
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
        LDMud 3.2.13/3.3.713 streamlined the handling of secure connections
        during logon.
 *
 */
int tls_init_connection(object ob);

int tls_init_connection(object ob, string fun, string|object fob, varargs mixed extra);

int tls_init_connection(object ob, closure fun, varargs mixed extra);

/**
 * tls_error
 *
 * tls_error() returns a string describing the error behind the
 * error number errorno.
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
 *
 */
string tls_error(int errorno);

/**
 * tls_deinit_connection
 *
 * tls_deinit_connection() shuts down a TLS connection to
 * the interactive object <ob> (or this_object() if <ob> is not
 * given) but the connection is not closed.
 * 
 * Under normal circumstances there is no need to use this efun: most
 * clients operate in either secure or unsecure mode, but don't allow
 * switching connection security on the fly.
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
 *
 */
void tls_deinit_connection(object ob);

/**
 * tls_check_certificate
 *
 * tls_check_certificate() checks the certificate of the secured
 * connection bound to <obj> (default is the current object).  If
 * <obj> is not interactive, or if TLS is not available, an error
 * is thrown.
 * 
 * If <obj> doesn't have a secure connection up and running, an
 * error is thrown.
 * Otherwise, the result is an array with these values:
 * 
 * int [0]   : Result code of SSL_get_verify_result (see 'man 1 verify',
 * subsection DIAGNOSTICS for possible values)
 * array [1] : array with 3*n entries of extra x509 data.
 * structure is:
 * 3*i    : numerical form of object name,
 * e.g. "2.5.4.3"
 * 3*i + 1: long or short name if available,
 * e.g. "commonName"
 * 3*i + 2: value
 * array [2] : if extra is set:
 * array with 3*n entries of x509 extension data
 * data structure is:
 * 3*i    : numerical form of extension name
 * 3*i + 1: long or short name of extension
 * name if available
 * 3*i + 2: array of strings with the data
 * structure of [1]
 * 
 * Note: An X509 certificate can have more than one object with
 * the same name.
 *
 * @since Introduced in LDMud 3.3.672/3.2.11.
        LDMud 3.3.711/3.2.12 modified the behaviour to return the
        low-level API result value, and to throw an error if the connection
        is not secure.
 *
 */
mixed * tls_check_certificate(object obj);

mixed * tls_check_certificate(object obj, int extra);

/**
 * tls_available
 *
 * If the global TLS initialisation could not been set up,
 * tls_is_available() returns 0, otherwise 1.
 * It is not very useful calling any other tls_*-efun if this one
 * returns 0, since there is no TLS-encryption available.
 * Most likely the global initialisation fails due to missing or
 * unreadable key resp. certificate-file.
 *
 * @since Introduced in LDMud 3.3.474 and following, backported to 3.2.11.
 *
 */
int tls_available();

/**
 * time
 *
 * Return number of seconds ellapsed since 1. Jan 1970, 0.0:0 GMT
 * 
 * The time is based on the time provided by the host system, however,
 * the driver makes sure that the result of time() is monotonically
 * increasing (ie. changes only to bigger numbers).
 * 
 * The result of time() does not change during the course of a command
 * execution.
 *
 * @example 
 * write(ctime(time())+"\n");
 * 
 * Print out the current date and time.
 *
 *
 */
int time();

/**
 * throw
 *
 * Abort execution. If the current program execution was
 * initiated by catch(), that catch expression will
 * return arg as error code.
 * 
 * Calling throw() without previous catch() does not make sense
 * and will result in an ``throw without catch'' error.
 *
 * @example 
 * catch(throw("aborting execution"));
 * This will just print the string "aborting execution".
 *
 *
 */
void throw(mixed arg);

/**
 * this_player
 *
 * Return the current command giver.  This can be an interactive
 * user or a living object like a npc.
 * 
 * If called from inside the heart_beat() of a not living object
 * 0 will be returned.
 *
 * @example 
 * if (this_player() != this_interactive())
 *   write("Hey, somebody must have forced us to do a command!\n");
 *
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} Current command giver.
 */
object this_player();

/**
 * this_object
 *
 * Return the object pointer for this object. This is not to be
 * confused with the internal name of an object, which is used by
 * the id() function.
 *
 *
 */
object|lwobject this_object();

/**
 * this_interactive
 *
 * `this_interactive()` returns the current interactive object, if
 * any, i.e. the one who "hit the RETURN key".
 *
 *
 */
object this_interactive();

/**
 * this_coroutine
 *
 * Returns the innermost coroutine in the caller stack.
 * Returns 0 if there is no coroutine.
 *
 * @since Coroutines were introduced in LDMud 3.6.5.
 *
 */
coroutine this_coroutine();

/**
 * text_width
 *
 * Returns the approximate screen width of the given string.
 * 
 * Normally the width is the same as the string length, but this efun
 * takes ANSI escape sequences and wide unicode characters into account.
 * Thus the result might be smaller or larger than the string length.
 * 
 * If the string contains line breaks the width of the widest line
 * is returned.
 * 
 * Note that the actual rendering of unicode strings is entirely
 * dependent upon the client's capabilities, regional context and the
 * fonts used there. So this efun will only return a guess for the
 * displayed width.
 *
 * @example 
 * text_width("\e[1mHeya!\e[0m") -> 5
 *
 * @since Introduced in LDMud 3.6.2.
 *
 */
int text_width(string str);

/**
 * test_bit
 *
 * Return 0 or 1 of bit n was set in string str.
 * 
 * Each character contains 6 bits. So you can store a value
 * between 0 and 63 in one character (2^6=64). Starting character
 * is the blank " " which has the value 0. The first character in
 * the string is the one with the lowest bits (0-5).
 *
 * @example 
 * test_bit("_",5);
 * 
 * Returns 1 because "_" stands for the number 63 and therefore
 * the 6th bit is set.
 * 
 * test_bit(" ",3);
 * 
 * Returns 0 because " " stands for 0 and no bit is set.
 *
 *
 */
int test_bit(string str, int n);

/**
 * terminal_colour
 *
 * If <map> is given as a non-0 value, this efun expands all
 * colour-defines of the form "%^KEY%^" (see below for details) from the
 * input-string and replaces them by the apropriate values found
 * for the color-key specified by <map>.
 * 
 * If <map> is a mapping, the entries queries have the
 * format "KEY" : "value", non-string contents are ignored with one
 * exception: if the mapping contains an entry 0:value, it is used
 * for all otherwise unrecognized keys. The value in this case can be
 * a string, or a closure. If it is a closure, it takes the key as
 * argument and has to return the replacement string.
 * 
 * If <map> is given as a closure, it is called with the KEYs to
 * replace, and has to return the replacement string.
 * 
 * The special keys "%^%^" and "%%^^" are always replaced with the
 * literal "%^".
 * 
 * The parameters wrap and indent are both optional, if only wrap is
 * given then the str will be linewrapped at the column given with
 * wrap. If indent is given too, then all wrapped lines will be
 * indented with the number of blanks specified with indent.
 * 
 * The wrapper itself ignores the length of the color macros and that
 * what they contain, it wraps the string based on the length of the
 * other chars inside. Therefore it is color-aware.
 * 
 * If <map> is given as 0, the efun does no colour-define detection
 * and replacement at all, but still does linewrapping and indentation
 * if requested. This way terminal_colour() doubles as a simple
 * line wrapping function, duplicating the functionality also
 * provided by sprintf("%-=s").
 * 
 * 
 * KEY RECOGNITION STRATEGY
 * 
 * As mentioned above, the special keys "%^%^" and "%%^^" are always
 * replaced with the literal "%^" and play no role in the following
 * considerations.
 * 
 * The input string is supposed to follow this syntax:
 * 
 * text { '%^' colorkey '%^' text } [ '%^' colorkey ]
 * 
 * or in words: the efun splits up the string at every '%^' it finds
 * and then treats every second substring as color key.
 * 
 * 
 * Note that this is different from the way MudOS treats the
 * input string. MudOS uses this syntax:
 * 
 * key_or_text { '%^' key_or_text }
 * 
 * or in words: the MudOS efun splits the string at every '%^' and
 * then tries to treat every substring as color key. One can achieve
 * the MudOS behaviour with this LPC function:
 * 
 * string mudos_terminal_colour(string str, mapping ext, int w, int i) {
 * return terminal_colour("%^"+implode(explode(str, "%^")-({""})
 * ,"%^%^")
 * , ext, w, i);
 * }
 *
 * @example 
 * mapping trans;
 * string str;
 * 
 * trans = ([ "GREEN" : "ansi-green", "RED" : "", "BLUE" : 1 ]);
 * 
 * str = terminal_colour( "%^GREEN%^ and %^RED%^ and %^BLUE%^", trans );
 * 
 * This will result in str == "ansi-green and  and BLUE"
 * 
 * %^GREEN%^ is expanded to ansi-green because trans defines that,
 * %^RED%^ is stripped because trans defines that as "" and
 * %^BLUE%^ gets the %^'s removed because the contents of trans are
 * not valid (i.e. no string). The same would happen to %^DEFINES%^
 * where the key is not found inside the trans mapping.
 * 
 * Caveat: to replace adjacent keys, use the efun like this:
 * 
 * str = terminal_colour( "%^GREEN%^%^RED%^", trans );
 * 
 * A command like
 * 
 * str = terminal_colour( "%^GREEN%^RED%^", trans );
 * 
 * will return the logical but sometimes unexpected "ansi-greenRED".
 * 
 * 
 * Some words about wrapping:
 * 
 * a string wrapped without indent would look like this:
 * 
 * "this is the first line\nand this is the second line"
 * 
 * a string wrapped with indent 3 would look like:
 * 
 * "this is the first line\n   and this is the indented second one"
 *
 * @since Efun idea and initial implementation taken from MudOS; the key
        recognition strategy (including pure wrapping mode) was straightened
        out in LDMud 3.2.8.
        LDMud 3.2.9/3.3.58 added the use of closures to specify the colour
        mappings.
        LDMud 3.2.9/3.3.102 officialized the "%%^^" replacement pattern for
        better MudOS compatibility.
 *
 */
varargs string terminal_colour(string str, void|mapping|closure map, int wrap, int indent);

/**
 * tell_room
 *
 * Send a message <str> to all living objects in the room ob. ob
 * can also be the name of the room given as a string. If a
 * receiving object is not a interactive user the lfun
 * catch_tell() of the object will be invoked with the message as
 * argument. If living objects define catch_tell(), the string
 * will also be sent to that instead of being written to the
 * user. If the object is given as its filename, the driver
 * looks up the object under that name, loading it if necessary.
 * If array *exclude is given, all objects contained in
 * *exclude are excluded from the message str.
 * 
 * If the second arg is an array/mapping/struct/object, catch_msg() will
 * be called in all listening livings.
 *
 * @example 
 * tell_object(environment(this_player()), "Hi!\n");
 * 
 * Just send a simple "Hi!" to all livings in the current.
 * 
 * Object 1 (living):
 * void catch_tell(string str) {
 * write("Received: "+str+"\n");
 * }
 * Object 2:
 * void func() {
 * ...
 * tell_room(environment(this_player()), "HiHo!\n");
 * ...
 * }
 * 
 * This examples shows how tell_room() together with catch_tell() works.
 *
 * @since LDMud 3.3.686 added the use of a mapping/struct/object as second
        argument.
 *
 */
void tell_room(string|object ob, string str);

void tell_room(string|object ob, string str, object *exclude);

void tell_room(string|object ob, mixed *|mapping|struct s|object|lwobject msg);

void tell_room(string|object ob, mixed *|mapping|struct s|object|lwobject msg, object *exclude);

/**
 * tell_object
 *
 * Send a message str to object ob (which is looked up and if necessary
 * loaded if given by name).
 * 
 * If the second argument is a string, the message will be printed
 * to <ob> if it is an interactive user, otherwise it will be passed to
 * the lfun catch_tell() of the target living.
 * 
 * If the second argument is an array/mapping/struct/object, it will be
 * passed to the lfun catch_msg() in the target.
 *
 * @example 
 * ```
 * object who;
 * who=find_player("wessex");
 * tell_object(who, "Hi!\n");
 * ```
 * Just tell Wessex a simple "Hi!".
 * 
 * Object 1 (living with the name "dummymonster"):
 * ```
 * void catch_tell(string str) {
 * write("Received: "+str+"\n");
 * }
 * ```
 * Object 2:
 * ```
 * void func() {
 * object who;
 * who=find_living("dummymonster");
 * tell_object(who, "Follow me, mortal one!\n");
 * ... 
 * }
 * ```
 * 
 * This examples shows how tell_object() together with
 * catch_tell() works.
 *
 * @since LDMud 3.2.11 introduced the 'mixed *' form for symmetry reasons.
        LDMud 3.3.686 added the use of a mapping/struct/object as second
        argument.
 *
 */
void tell_object(object|string ob, string str);

void tell_object(object|string ob, mixed *|mapping|struct s|object|lwobject msg);

/**
 * tan
 *
 * Returns the tangent of the argument.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float tan(int|float f);

/**
 * symbolp
 *
 * Returns true, if arg is a symbol.
 *
 * @example 
 * symbolp('foo) returns 1.
 *
 * @since Introduced in 3.2@70
 *
 */
int symbolp(mixed arg);

/**
 * symbol_variable
 *
 * Constructs an identifier (lfun) closure from the global
 * variable arg of the current program. The variable may be given as a
 * symbol, by name or by its ordinal number in the objects
 * variable table.
 * If there is no such variable, or if it is not visible outside
 * the object, 0 is returned.
 * 
 * If the argument is an integer, and the variable is inherited
 * and private in the inherited object (i.e. hidden), then a
 * privilege violation will occur.
 *
 * @example 
 * int base;
 * int var;
 * symbol_variable("var")    -> #'<this_object>->var
 * symbol_variable(0)        -> #'<this_object>->base
 *
 * @since Enabled since 3.2.1@8.
 *
 */
closure symbol_variable(string arg);

closure symbol_variable(symbol arg);

closure symbol_variable(int arg);

/**
 * symbol_function
 *
 * Constructs a lfun closure, efun closure or operator closure
 * from the first arg (string or symbol). For lfuns, the second
 * arg is the object that the lfun belongs to, specified by
 * the object itself or by its name (the object will be loaded
 * in the second case)
 * 
 * If the closure is created for an lfun in an object other than
 * the current object, the result is an 'alien lfun closure'. Such
 * closures are bound to the object executing the symbol_function()
 * (this is what to_object() will return), even though the actual
 * code is in that other object (which get_type_info() will return).
 * 
 * Private lfuns can never be accessed this way, static and
 * protected lfuns only if <ob> is the current object.
 *
 * @example 
 * symbol_function("efun::users")          -> #'users
 * symbol_function("QueryProp", other_obj) -> other_obj->QueryProp()
 *
 * @since Introduced in 3.2@70.
 *
 */
closure symbol_function(symbol arg);

closure symbol_function(string arg);

closure symbol_function(string arg, object|lwobject|string ob);

/**
 * swap
 *
 * Swap out an object. This efun is only used for system internal
 * debugging and can cause a crash.
 * 
 * <flags> can be given to specify which parts of <obj> to swap.
 * It is a bitmask of the following:
 * 
 * 1: Swap program
 * 2: Swap variables
 * 
 * The default (also when 0 given) is both (3).
 *
 * @since LDMud 3.6.4 introduced the second argument.
 *
 */
void swap(object obj, int flags = 0);

/**
 * structp
 *
 * Return 1 if arg is a struct.
 *
 * @since Introducted in LDMud 3.3.273.
 *
 */
int structp(mixed arg);

/**
 * struct_info
 *
 * Return information about the structure of struct <st> in an array.
 * If <st> has a base struct, <what> determines how the information
 * is returned:
 * 
 * <what> == SINFO_FLAT:
 * All members of <st>, including those inherited from the base
 * struct, are returned on the top level of the result.
 * The base struct is signified by just its name.
 * 
 * <what> == SINFO_NESTED:
 * Only the members defined in <st> itself are returned on
 * the top level of the result. The information for the base
 * struct is a array by itself, as it would be returned
 * by a call to struct_info() for a base struct instance.
 * 
 * The elements in the resulting array are:
 * 
 * string [SI_NAME]:        the name of the struct
 * string [SI_PROG_NAME]:   the name of program defining the struct
 * string [SI_PROG_ID]:     the id of the program defining the struct
 * mixed  [SI_BASE]:        0, or the base struct information
 * mixed *[SI_MEMBER+0]:    the first member information
 * mixed *[SI_MEMBER+n]:    the last member information
 * 
 * The member information entries are arrays themselves with
 * these elements:
 * 
 * string [SIM_NAME]:  name of the member
 * int    [SIM_TYPE]:  the type of the member (compile-time value)
 * string [SIM_EXTRA]: 0, or if the member is a struct, the
 * struct name
 *
 * @since Introduced in LDMud 3.3.344.
        LDMud 3.3.417 introduced SI_PROG_NAME and SI_PROG_ID in exchange
          for SI_UNIQUE_NAME.
 *
 */
mixed * struct_info(struct st s, int what);

/**
 * strstr
 *
 * Returns the index of <str2> in <str> searching from position <pos>
 * on forward.
 * 
 * The returned index is relativ to the beginning of the string.
 * If <str2> is not found in <str>, -1 is returned.
 * 
 * If <pos> is negativ, it designates the start position relative
 * to the end of the string (the search will still proceed towards
 * the end of the string).
 *
 *
 */
int strstr(string str, string str2);

int strstr(string str, string str2, int pos);

int strstr(bytes  str, bytes  str2);

int strstr(bytes  str, bytes  str2, int pos);

/**
 * strrstr
 *
 * Returns the index of the first occurance of <str2> in <str> searching
 * from position <pos> (default: -1 == string end) on backward.
 * In other words: the index of the last occurance of <str2> before
 * the given position <pos>.
 * 
 * The returned index is relativ to the beginning of the string.
 * 
 * If <str2> is not found in <str>, -1 is returned.
 * 
 * If <pos> is negativ, it designates the start position relative
 * to the end of the string (the search will still proceed towards
 * the beginning of the string).
 *
 * @since Introduced in LDMud 3.2.10.
 *
 */
int strrstr(string str, string str2);

int strrstr(string str, string str2, int pos);

int strrstr(bytes  str, bytes  str2);

int strrstr(bytes  str, bytes  str2, int pos);

/**
 * stringp
 * @param arg The argument to check.
 * @returns {arg is string} 1 if arg is a string.
 */
int stringp(mixed arg);

/**
 * strftime
 *
 * The function strftime() formats the given time in <clock> as a formatted
 * string, similar to ctime(). Unlike ctime(), strftime() accepts a format
 * string with placeholders for the different elements. The format string
 * consists of zero or more conversion specifiers (see below) and ordinary
 * characters. Ordinary charaecters are just copied to the result. A
 * conversion specifier starts with a percent sign ('%'). If no format
 * string is given, a default of "%c" will be used.
 * 
 * The argument <clock> is the number of seconds since the epoch (00:00:00
 * UTC, January 1, 1970), as returned by time/mktime(). If <clock> is not
 * given, the current result of time() will be used.
 * 
 * The argument <localized> specifies, whether the result will be in english
 * (the classic "C" locale) or in the language configured on the host
 * computer (e.g. german). The language has to be configured with the
 * environment variables LC_TIME or LC_ALL (please ask your admins). If
 * <localized> is not given, the default is 1.
 * 0: use classic "C" locale (english)
 * 1: use current locale on the host computer (national representation).
 *
 * @example 
 * write(strftime("Today is %A, %d. %B %Y.\n"))
 * results in "Today is Monday, 24. September 2007.\n"
 *
 * @since Introduced in LDMud 3.3.718.
 *
 */
string strftime();

string strftime(string fmt);

string strftime(int clock);

string strftime(string fmt, int clock);

string strftime(string fmt, int clock, int localized);

/**
 * sscanf
 *
 * Parse a string str using the format fmt. fmt can contain
 * strings seperated by %d and %s. Every %d and %s corresponds to
 * one of var1, var2, ... .
 * 
 * The match operators in the format string have one of these
 * formats:
 * %[+][!|~][<size>[.<minmatch>]]<type>
 * 
 * <type> may be:
 * d: matches any number.
 * D: matches any number.
 * U: matches any unsigned number.
 * s: matches any string.
 * %: matches the % character.
 * t: matches whitespace (spaces and tab characters), but does
 * not store them (the simple ' ' matches just spaces and
 * can't be given a size specification).
 * 
 * <size> is the expected field size, <minmatch> the demanded
 * minimal match length (defaults are 0 for strings and 1 for
 * numbers). Each of these both may be specified numerically, or
 * as '*' - then the value of the variable at the current place
 * in the argument list is used.
 * 
 * Specifying + will require that the characters after the field
 * match as well, or the match will be deemed unsuccessful (the variable
 * might still get assigned, though).
 * 
 * Specifying ! will perform the match, but neither store the
 * result nor count the match.
 * 
 * Specifying ~ will perform and count the match, but not store
 * the result.
 * 
 * If the %s specifier is not at the end of the format string,
 * it is matched only if the following character(s) or format
 * is found, too. See below for an example.
 * 
 * The difference between %d and %D/%U is that the latter will abort
 * an immediately preceeding %s as soon as possible, whereas the
 * former will attempt to make largest match to %s first.
 * %D/%U will still not skip whitespace, use %.0t%D to skip optional
 * whitespace.
 * 
 * If a number is matched that exceeds the numerical limits of
 * integers the match is deemed unsuccessful.
 * 
 * The number of matched arguments will be returned.
 * 
 * The function sscanf is special, in that arguments are passed
 * by reference automatically.
 *
 * @example 
 * string who, what;
 * if (sscanf("throw frisbee to rover",
 * "throw %s to %s", what, who) != 2)
 * write("Usage: throw <what> to <who>\n");
 * else
 * write("You throw a "+what+" to "+who+" to get his attention.\n");
 * 
 * sscanf("ab", "%s%s", who, what)
 * ==> result 2, who = "", what = "ab"
 * 
 * sscanf("ab", "%s %s", who, what)
 * ==> result 0, who = 0, what = 0
 * 
 * sscanf("ab ", "%s %s", who, what)
 * ==> result 2, who = "ab", what = ""
 *
 * @since LDMud 3.3.713/3.2.13 introduced the '+' specifier.
 *
 */
int sscanf(string str, string fmt, mixed var1, varargs mixed var2);

/**
 * sqrt
 *
 * Returns the square root of the argument.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float sqrt(int|float s);

/**
 * sprintf
 * @param fmt the format string.
 * @param args the arguments to be formatted.
 * @returns the formatted string.
 *
 * Most of the characters in the format string (FMT) get passed
 * straight through to the output (ie: printed or put in the
 * return string), to format the arguments into the string it is
 * necessary to include an argument format string (AFS) in the
 * FMT.  An AFS is a series of characters starting with a percent
 * sign "%" and terminated with a argument type specifier.
 * To include a "%" sign in the output, it is necessary to include a
 * double percent sign "%%". The sequence "%^" will output "%^" again.
 * 
 * Valid argument type specifiers are:
 * "s" : the argument is a string.
 * "d" : the argument is an integer to be included in decimal
 * representation.
 * "i" : same as "d".
 * "b" : the argument is an integer to be included in binary
 * representation.
 * "o" : the argument is an integer to be included in octal
 * representation.
 * "x" : the argument is an integer to be included in hexadecimal
 * representation.
 * "X" : as "x" except letters are capitalised.
 * "e","E","f","g","G" : the argument is a float to be included in
 * decimal representation; see examples for details
 * "c" : the argument is an int to included as a character
 * "O" : the argument is an LPC datatype to be printed in an arbituary
 * format, this is for debugging purposes.
 * If the argument is an object then the function
 * printf_obj_name() on the master object is called with the
 * object as a parameter, the string returned is included in
 * brackets at the end of object file name.
 * If 0 is returned then nothing is appended after the file name.
 * "Q"   Like "O", except that special characters in strings are
 * printed in LPC notation.
 * 
 * Between the percent sign and the argument type specifier in
 * the AFS, the following modifiers can be included to specify
 * the formatting information.  Order is not important unless
 * otherwise specified.  "n" is used to specify a integer, which
 * can be a "*" in which case the next argument is used as the
 * number.
 * 
 * Modifiers:
 * n    specifies the field size. If the size is prepended with
 * a 0, the argument is printed with leading zeroes.
 * "."n  specifies the precision, for simple (not columns or tables)
 * strings specifies the truncation length.
 * ":"n  n specifies both the field size _and_ the presision, if n is
 * prepended by a zero then the pad string is set to "0".
 * "'X'" the pad string is set to the char(s) between the single
 * quotes, if the field size is also prepended with a zero then
 * which ever is specified last will overrule.
 * NOTE:  to include "'" in the pad string, you must use "\\'"
 * (as the backslash has to be escaped past the interpreter),
 * similarly, to include "\" requires "\\\\".
 * " "   pad positive integers with a space.
 * "+"   pad positive integers with a plus sign.
 * "-"   left aligned within field size.
 * NB: std (s)printf() defaults to right alignment, which is
 * unnatural in the context of a mainly string based language
 * but has been retained for "compatibility" ;)
 * "|"   centered within field size.
 * "$"   justified to field size. Ignored unless the type specifier
 * is 's'.
 * "="   column mode.  Ignored unless the argument type specifier is 's'.
 * Field size must be specified, if precision is specified then
 * it specifies the width for the string to be wordwrapped in, if
 * not then the field size is. The field size specifies the width
 * of the column and has the effect that the last line of the
 * column is padded with spaces to achieve this length.
 * "#"   For strings: table mode.
 * Field size must be specified, if precision is
 * specified then it specifies the number of columns in
 * the table, otherwise the number is "optimally"
 * generated (as few lines and columns as possible).
 * Table mode is passed a list of backslash-n separated
 * 'words' which are put in a format similar to that of
 * ls.
 * For %O/%Q: compact output.
 * "@"   the argument is an array.  the corresponding AFS (minus all
 * "@") is applied to each element of the array.
 * 
 * When the formatting of an element results in several output lines
 * (column or table mode) and no explicit pad strings has been
 * defined, then the efun removes any padding whitespace before
 * the newlines of all but the last line. However, if an explicit
 * pad string has been given, even if it is the simple ' ', then
 * the padding will not be removed.
 *
 * @since LDMud 3.2.9 added the "%^" sequence for compatibility with
          terminal_colour(), added the "%Q" sequence, clarified the meaning of
          leading 0s in the field size modifier, clarified the interaction
          between the padding and newlines, and added the '$' formatter for
          justified printing of strings.
        LDMud 3.2.10 added modifier '#' for '%O'/'%Q' and the datatype '%b'.
 *
 * @example 
 * sprintf("decimal=%d, octal=%o, hexadecimal=%x\n", 7, 7, 7);
 * 
 * sprintf("array=%O\n", ({1, 2, 3}));
 * 
 * this will return the following:
 * ({ /* sizeof() == 3 *\/
 * 1,
 * 2,
 * 3
 * })
 * An array will be printed recursively and each element of the
 * array will be indented. Can also be used as a debugging tool.
 * 
 * sprintf("%-*#s\n", 80, implode(get_dir("~/."), "\n"));
 * 
 * sprintf("foo")                      // returns "foo"
 * 
 * sprintf("%s","foo")                 // returns "foo"
 * sprintf("%7s","foo")                // returns "    foo"
 * sprintf("%-7s","foo")               // returns "foo    "
 * sprintf("%|7s","foo")               // returns "  foo  "
 * sprintf("%7'.'s","foo")             // returns "....foo"
 * sprintf("%-7'+-'s","foo")           // returns "foo+-+-"
 * sprintf("%|9'-+'s","foo")           // returns "-+-foo-+-"
 * sprintf("%3s","foobarbloh")         // returns "foobarbloh"
 * sprintf("%3.6s","foobarbloh")       // returns "foobar"
 * sprintf("%6.3s","foobarbloh")       // returns "   foo"
 * sprintf("%:6s","foobarbloh")        // returns "foobar"
 * sprintf("%:3s","foobarbloh")        // returns "foo"
 * sprintf("%*.*s",-7,2,"foobarbloh")  // returns "fo     "
 * 
 * sprintf("%=12s","this is a very long sentence\n")
 * // returns "   this is a\n"
 * //         "   very long\n"
 * //         "    sentence\n"
 * sprintf("%=-12s","this is a very long sentence\n")
 * // returns "this is a\n"
 * //         "very long\n"
 * //         "sentence\n"
 * sprintf("%=|12s","this is a very long sentence\n")
 * // returns "  this is a\n"
 * //         "  very long\n"
 * //         "  sentence\n"
 * sprintf("%=10.6s","this is a very long sentence\n")
 * // returns "      this\n"
 * //         "      is a\n"
 * //         "      very\n"
 * //         "      long\n"
 * //         "    senten\n"
 * //         "        ce\n"
 * sprintf("%#-40.3s\n",
 * "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\n")
 * // returns "one          five         nine\n"
 * //         "two          six          ten\n"
 * //         "three        seven        \n"
 * //         "four         eight        \n"
 * sprintf("%#-40s\n",
 * "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\n")
 * // returns "one     three   five    seven   nine\n"
 * //         "two     four    six     eight   ten\n"
 * 
 * sprintf("%@-5s",({"foo","bar","bloh"})) // returns "foo  bar  bloh "
 * 
 * sprintf("%d",123)                   // returns "123"
 * sprintf("%7d",123)                  // returns "    123"
 * sprintf("%-7d",123)                 // returns "123    "
 * sprintf("%d/%d",123,-123)           // returns "123/-123"
 * sprintf("% d/% d",123,-123)         // returns " 123/-123"
 * sprintf("%+d/%+d",123,-123)         // returns "+123/-123"
 * sprintf("%+5d/%5d",123,123)         // returns " +123/  123"
 * sprintf("%|6d",123)                 // returns "  123 "
 * sprintf("%|10d",123)                // returns "    123   "
 * sprintf("%|10d%3s",123,"foo")       // returns "    123   foo"
 * 
 * sprintf("%o",16)                    // returns "20"
 * sprintf("%'0'3o",8)                 // returns "010"
 * 
 * sprintf("%x",123)                   // returns "7b"
 * sprintf("%X",123)                   // returns "7B"
 * 
 * sprintf("%f",123.5)                 // returns "124"
 * sprintf("%8.3f",123.5)              // returns " 123.500"
 * sprintf("%E",123.5)                 // returns "1E+02"
 * sprintf("%12.4e",123.5)             // returns "  1.2350e+02"
 * sprintf("%g",123.5)                 // returns "1e+02"
 * sprintf("%8.3G",123.5)              // returns "     124"
 * sprintf("%8.6g",123.5)              // returns "   123.5"
 *
 */
string sprintf(string fmt, varargs mixed args);

/**
 * sort_array
 *
 * Sort the copy either by the ordering function ob->wrong_order(a, b),
 * or by the closure expression <cl>.
 * 
 * Usually a shallow copy of <arr> is made first and the sorted copy is
 * returned as result. However, if <arr> is given as a reference, no copy
 * will be made and <arr> will be sorted in-place.
 * 
 * If the <arr> argument equals 0, the result is also 0.
 * 
 * <ob> is the object in which the ordering function is called
 * and may be given as object or by its filename. If <ob> is omitted
 * or neither a string nor an object, it defaults to this_object().
 * 
 * The elements from the array to be sorted are passed in pairs to
 * the function <wrong_order> as arguments, followed by the <extra>
 * arguments if any.
 * 
 * The function should return a positive number if the elements
 * are in the wrong order. It should return 0 or a negative
 * number if the elements are in the correct order.
 *
 * @example 
 * To sort an array
 * 
 * arr = ({ 3, 8, 1, 3 })
 * 
 * in ascending order with the help of the ordering function
 * 
 * int is_greater (int a, int b) {
 * return a > b;
 * }
 * 
 * the following uses of sort_array() are equivalent:
 * 
 * arr = sort_array(arr, "is_greater", this_object())
 * arr = sort_array(arr, "is_greater")
 * arr = sort_array(arr, #'is_greater)
 * arr = sort_array(arr, #'>)  (this is the preferred variant :-)
 * arr = sort_array(arr, lambda(({'a, 'b}), ({#'>, 'a, 'b})))
 * 
 * If no implicit shallow copy of <arr> should be made, pass <arr> as
 * reference:
 * 
 * sort_array(&arr, #'>)
 * 
 * A more complicated example is to sort the array
 * 
 * arr = ({ ({ "foo", 3 }), ({ "quux", 1 }), ... })
 * 
 * in ascending order by the second element of each subarray.
 * For this, the ordering function should be like
 * 
 * int is_greater (mixed *a, mixed *b) {
 * return a[1] > b[1];
 * }
 *
 * @since LDMud 3.2.8 added the support of extra arguments.
        LDMud 3.3.720 added the support of references to sort in-place.
 *
 */
mixed * sort_array(mixed *arr, string wrong_order);

mixed * sort_array(mixed *arr, string wrong_order, object|string ob);

mixed * sort_array(mixed *arr, string wrong_order, object|string ob, varargs mixed extra);

mixed * sort_array(mixed *arr, closure cl);

mixed * sort_array(mixed *arr, closure cl, varargs mixed extra);

/**
 * snoop
 *
 * Starts a snoop from 'snooper' on 'snoopee', or if 'snoopee' is not
 * given, terminates any snoop from 'snooper'.
 * 
 * Return <snoopee> on success, or 0 for a failure (including snooping
 * loops).
 * 
 * The snoop is checked with the master object for validity.  It
 * will also fail if a snoop would result in a recursive snoop
 * action.
 * 
 * <snooper> can be an interactive player, or an object. If it is
 * an interactive player, the snooped text is prepended with a
 * '%' and send directly to the players connection. If <snooper>
 * is an object, the snooped text is sent in two calls to the
 * object's catch_tell() lfun: the first call passes just the
 * "%" (plus the prompt if the object changed it), the second the
 * actual text.
 *
 *
 */
object snoop(object snooper);

object snoop(object snooper, object snoopee);

/**
 * sl_open
 *
 * Opens the file <filename> for use as a SQLite database.
 * If the file doesn't exists it will be created.
 * Only one open file per object is allowed. On success this
 * function returns 1, otherwise usually an error is thrown.
 * 
 * The function is available only if the driver is compiled with
 * SQLite support. In that case, __SQLITE__ is defined.
 *
 * @since Added in LDMud 3.3.713.
 *
 */
int sl_open(string filename);

/**
 * sl_insert_id
 *
 * After inserting a line into a table with an AUTO_INCREMENT field,
 * this efun can be used to return the (new) value of the AUTO_INCREMENT
 * field.
 * 
 * The function is available only if the driver is compiled with
 * SQLite support. In that case, __SQLITE__ is defined.
 *
 * @since Added in LDMud 3.3.713.
 *
 */
int sl_insert_id();

/**
 * sl_exec
 *
 * Executes the SQL statement <statement> for the current
 * SQLite database. The SQL statement may contain wildcards like
 * '?' and '?nnn', where 'nnn' is an integer. These wildcards
 * can be given as further parameters to sl_exec. With '?nnn'
 * the number of a specific parameter can be given, the first
 * parameter has number 1.
 * 
 * If the statement returns data, sl_exec returns an array
 * with each row (which is itself an array of columns) as
 * an element.
 * 
 * Pragma statements raise a privilege_violation ("sqlite_pragma",
 * ob, name, value). If the privilege is denied, an error is
 * thrown.
 * 
 * The function is available only if the driver is compiled with
 * SQLite support. In that case, __SQLITE__ is defined.
 *
 * @since Added in LDMud 3.3.713.
 *
 */
mixed * sl_exec(varargs string statement);

/**
 * sl_close
 *
 * Closes the SQLite database that is associated with the
 * current object.
 * 
 * The function is available only if the driver is compiled with
 * SQLite support. In that case, __SQLITE__ is defined.
 *
 * @since Added in LDMud 3.3.713.
 *
 */
void sl_close();

/**
 * sizeof
 *
 * Returns the number of elements of an array or struct, the number of
 * characters in a string, number of bytes in a byte sequence, or the
 * number of keys in a mapping.
 * 
 * As a special case, the number 0 can be passed, and the function
 * will return 0.
 * 
 * If there were any objects destroyed in the game since the mapping was
 * last checked for destructed keys, the mapping() needs to be checked
 * for destructed objects in keys first. In that case, the runtime
 * increases linear with the number of keys in the mapping (O(n)).
 * Otherwise the runtime is independent of the mappings size (O(1)).
 *
 * @since LDMud 3.2.9 added strings to the possible parameters.
        LDMud 3.3 added support for structs.
 *
 */
int sizeof(mixed * val);

int sizeof(string  val);

int sizeof(bytes   val);

int sizeof(mapping val);

int sizeof(struct xxx val);

/**
 * sin
 *
 * Returns the sinus of the argument.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float sin(int|float n);

/**
 * shutdown
 *
 * Shutdown the mud, setting the process result code to
 * <exit_code>, or 0 if not given.
 * 
 * Never use this efun. Instead if you have a need to shutdown
 * the mud use the shutdown command.  You may be asking yourself,
 * if you're not supposed to use it why is it here?  Sorry, I
 * cannot answer that.  Its top secret.
 * 
 * The efun causes a privilege violation.
 *
 * @since LDMud 3.2.11 introduced the exit code.
        LDMud 3.5.0 made the efun privileged.
 *
 */
void shutdown();

void shutdown(int exit_code);

/**
 * shadow
 *
 * The current object will become a shadow of ob. This efun
 * returns 1 on success, 0 otherwise.
 * 
 * The calling object must be permitted by the master object to
 * do the shadowing. In most installations, an object that
 * defines the function query_prevent_shadow() to return 1
 * can't be shadowed, and the shadow() function will return 0
 * instead of ob.
 * 
 * shadow() also fails if the calling object tries to shadow
 * a function that was defined as ``nomask'', if the program was
 * compiled with the #pragma no_shadow, or if the calling
 * object is already shadowing, is being shadowed, or has an
 * environment. Also the target ob must not be shadowing
 * something else.
 * 
 * If an object A shadows an object B then all call_other() to B
 * will be redirected to A. If object A has not defined the
 * function, then the call will be passed to B. There is only on
 * object that can call functions in B with call_other(), and
 * that is A. Not even object B can call_other() itself. All
 * normal (internal) function calls inside B will however remain
 * internal to B.
 *
 * @example 
 * With the three objects a.c, b.c and c.c
 * 
 * --- a.c ---
 * int fun() {
 * debug_message(sprintf("%O [a] fun()\n", this_object()));
 * }
 * 
 * void fun3() {
 * debug_message(sprintf("%O [a] fun3()\n", this_object()));
 * }
 * 
 * --- b.c ---
 * int fun() {
 * debug_message(sprintf("%O [b] fun()\n", this_object()));
 * find_object("a")->fun();
 * }
 * void fun2() {
 * debug_message(sprintf("%O [b] fun2()\n", this_object()));
 * find_object("a")->fun3();
 * this_object()->fun3();
 * }
 * 
 * void do_shadow(object target) { shadow(target, 1); }
 * 
 * --- c.c ---
 * int fun() {
 * debug_message(sprintf("%O [c] fun()\n", this_object()));
 * find_object("a")->fun();
 * }
 * void fun3() {
 * debug_message(sprintf("%O [c] fun3()\n", this_object()));
 * }
 * void do_shadow(object target) { shadow(target, 1); }
 * 
 * code like the following
 * 
 * object a, b, c;
 * 
 * a = load_object("a");
 * b = load_object("b");
 * c = load_object("c");
 * b->do_shadow(a);
 * c->do_shadow(a);
 * debug_message("--- a->fun() ---\n");
 * a->fun();
 * debug_message("--- b->fun() ---\n");
 * b->fun();
 * debug_message("--- c->fun() ---\n");
 * c->fun();
 * debug_message("--- b->fun2() ---\n");
 * b->fun2();
 * 
 * produces this output:
 * 
 * --- a->fun() ---
 * /c [c] fun()
 * /b [b] fun()
 * /a [a] fun()
 * --- b->fun() ---
 * /c [c] fun()
 * /b [b] fun()
 * /a [a] fun()
 * --- c->fun() ---
 * /c [c] fun()
 * /b [b] fun()
 * /a [a] fun()
 * --- b->fun2() ---
 * /b [b] fun2()
 * /a [a] fun3()
 * /c [c] fun3()
 * 
 * Note that the first call in b::fun2() find c::fun3()! Reason is that
 * for calls originating from b to a the driver assumes that all
 * shadows beyond c already had their chance. The second call however
 * was to b itself, which the gamedriver recognized as being shadowed
 * by c.
 *
 * @since Up to 3.2.1@46, destructing a shadowed object also destructs
        all shadows. Since 3.2.1@47, shadows may survive the
        destruction of the shadowee (unless the prepare_destruct() in
        the master object destructs them manually).

        Since LDMud 3.2.8, programs may protect themselves from being
        shadowed with the #pragma no_shadow.
 *
 */
int shadow(object ob);

/**
 * sha1
 *
 * Create and return a SHA1 message digest from <arg>.
 * <arg> may be a string, a byte sequence, or an array of numbers
 * (each considered to be a byte, ignoring all but the lowest 8 bits).
 * A string is converted to a UTF-8 byte sequence of which then the
 * digest will be created.
 * 
 * If <iterations> is given as a number greater than 0, it is
 * the number of iterations used in the digest calculation. If omitted,
 * the driver executes just one iteration.
 * 
 * The efun costs 5 ticks per iteration.
 *
 * @example 
 * string s;
 * 
 * s = sha1("Hello");
 * s = sha1( ({ 'H', 'e', 'l', 'l', 'o' })
 *
 * @since Introduced in LDMud 3.3.523.
        LDMud 3.3.712 added number arrays as argument, and the number
          of iterations.
        LDMud 3.3.717 added the iteration-based evaluation cost.
        Since LDMud 3.3.719 obsoleted by hash().
 *
 */
string sha1(string arg , int iterations );
string sha1(bytes  arg , int iterations );
string sha1(int  * arg , int iterations );

/**
 * sgn
 *
 * Return the sign of the argument.
 * 
 * arg  sgn(arg)
 * --------------
 * > 0   1
 * 0   0
 * < 0  -1
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int sgn(int|float arg);

/**
 * set_this_player
 *
 * Change the current command giver to <ob>. <ob> may be 0 if
 * you want to 'deactivate' the current command giver.
 * 
 * This efun is not privileged, therefore it should be redefined
 * by a nomask simul_efun which then either completely disables
 * the efun or at least performs some security checks.
 * It is easy to undermine a mudlibs security using this efun.
 *
 * @since Introduced in 3.2.1.
        LDMud 3.2.6 added the value 0 as acceptable parameter.
 *
 */
void set_this_player(object ob);

/**
 * set_this_object
 *
 * This is a privileged function, only to be used in the master
 * object or in the simul_efun object.
 * 
 * It changes the result of this_object() in the using function,
 * and the result of previous_object() in functions called in
 * other objects by call_other()/apply()/funcall(). Its effect will
 * remain till there is a return of an external function call, or
 * another call of set_this_object(). While executing code in the
 * master object's program or the primary simul_efun object's
 * program, set_this_object() is granted even if this_object() is
 * altered by set_this_object(). This does not apply to functions
 * inherited from other programs.
 * 
 * Use it with extreme care to avoid inconsistencies.  After a
 * call of set_this_object(), some LPC-constructs might behave in
 * an odd manner, or even crash the system. In particular, using
 * global variables or calling local functions (except by
 * call_other) is illegal and actively prevented.
 * 
 * Allowed are call_other(), map functions, access of local variables
 * (which might hold array pointers to a global array), simple arithmetic
 * and the assignment operators.
 *
 * @since LDMud 3.2.10 actively prevents references to global variables
        and function calls by address while set_this_object() is in
        effect.
 *
 */
void set_this_object(object|lwobject object_to_pretend_to_be);

/**
 * set_next_reset
 *
 * Instruct the gamedriver to reset this object not earlier than
 * in <delay> seconds. If a negative value is given as delay, the object
 * will never reset (useful for blueprints). If 0 is given, the
 * object's reset time is not changed.
 * 
 * Result is the former delay to the objects next reset (which can be
 * negative if the reset was overdue).
 * 
 * Note that the actual time the reset occurs depends on when
 * the object will be used after the given time delay.
 *
 * @example 
 * set_next_reset(15*60); // Next reset in 15 Minutes or later
 * set_next_reset(0)      --> just returns the time until the
 * next reset.
 *
 * @since Introduced in LDMud 3.2.6, adapted from Morgengrauen.
 *
 */
int set_next_reset(int delay);

/**
 * set_extra_wizinfo
 *
 * Set the value <extra> as the 'extra' information for the wizlist
 * entry of <wiz>.
 * 
 * If <wiz> is a regular or lightweight object, the entry of its
 * creator (uid) is used.
 * If <wiz> is a string (a creator aka uid), it names the entry
 * to use.
 * If <wiz> is the number 0, the data is set in the default wizlist
 * entry. It can be used to store data for the lifetime of this
 * driver run, like the time of the last reboot.
 * 
 * The <extra> argument may be any value.
 * 
 * The function causes a privilege violation.
 *
 *
 */
void set_extra_wizinfo(object   wiz, mixed extra);

void set_extra_wizinfo(lwobject wiz, mixed extra);

void set_extra_wizinfo(string   wiz, mixed extra);

void set_extra_wizinfo(int      wiz, mixed extra);

/**
 * set_environment
 *
 * The item is moved into its new environment env, which may be 0.
 * This efun is to be used in the move_object() hook, as it does
 * nothing else than moving the item - no calls to init() or such.
 * 
 * Don't use it in your own objects!
 *
 * @since Introduced in 3.2.1@1 as 'efun308()', renamed to 'set_environment()'
        in 3.2.6.
 *
 */
void set_environment(object item, object env);

/**
 * set_driver_hook
 *
 * This privileged efun sets the driver hook 'what' (values are
 * defined in <driver_hook.h>) to 'arg'.
 * The exact meanings and types of 'arg' depend of the hook set.
 * To remove a hook, set 'arg' to 0.
 * 
 * These hooks exist:
 * 
 * H_MOVE_OBJECT0
 * H_MOVE_OBJECT1
 * arg: unbound lambda
 * Mandatory hooks implementing the move_object() efun.
 * 
 * H_LOAD_UIDS
 * H_CLONE_UIDS
 * arg: unbound lambda or lfun closure
 * Mandatory hooks to determine the (e)uid of new objects.
 * 
 * H_CREATE_SUPER
 * H_CREATE_OB
 * H_CREATE_CLONE
 * H_RESET
 * H_CLEAN_UP
 * arg: lambda closure (H_CLEAN_UP also accepts a lfun
 * closure), function name.
 * Optional hooks for creation/reset/clean up-actions.
 * 
 * H_CREATE_LWOBJECT
 * H_CREATE_LWOBJECT_COPY
 * H_CREATE_LWOBJECT_RESTORE
 * arg: lambda closure, function name.
 * Optional hooks for creation of lightweight objects
 * with new_lwobject(), copy()/deep_copy() resp.
 * restore_value()/restore_object().
 * 
 * H_DEFAULT_METHOD
 * arg: lambda closure, lfun closure, function name.
 * Optional hook for default method implementation.
 * 
 * H_DEFAULT_PROMPT
 * arg: lambda closure, lfun closure, prompt string.
 * Optional hook for the default command prompt.
 * 
 * H_PRINT_PROMPT
 * arg: lambda closure, lfun closure, function name.
 * Optional hook to print the command prompt.
 * 
 * H_MODIFY_COMMAND
 * arg: lambda closure, lfun closure, function name, mapping
 * Optional hook for modifying player commands before the
 * parser sees them.
 * 
 * H_NOTIFY_FAIL
 * arg: lambda closure, lfun closure, string.
 * Mandatory hook to generate the default message if an entered
 * command couldn't be parsed and no notify_fail() command is
 * in effect.
 * 
 * H_SEND_NOTIFY_FAIL
 * arg: lambda closure, lfun closure, string.
 * Optional hook to deliver the notify fail message from a failed
 * command.
 * 
 * H_NO_IPC_SLOT
 * arg: string.
 * Optional hook specifying the 'sorry' messages if logins are
 * rejected due to fullness of the mud.
 * 
 * H_INCLUDE_DIRS
 * arg: lambda closure, lfun closure, string array.
 * Semi-mandatory hook specifying the directories where <>-type
 * include files are searched.
 * 
 * H_AUTO_INCLUDE
 * arg: lambda closure, lfun closure, string
 * Optional hook to specify a string to be included before the
 * source of every compiled LPC object.
 * 
 * H_AUTO_INCLUDE_EXPRESSION
 * H_AUTO_INCLUDE_BLOCK
 * arg: closure, string
 * Optional hook specifying a string to be prepended before
 * the string of a compile_string() call.
 * 
 * H_FILE_ENCODING
 * arg: lambda closure, lfun closure, string
 * Optonal hook specifying the name of the encoding to be used
 * for decoding a file (default: "ascii").
 * 
 * H_TELNET_NEG
 * arg: lambda closure, lfun closure, string.
 * Optional hook to specifiy how to perform a single telnet
 * negotiation.
 * 
 * H_NOECHO
 * arg: lambda closure, lfun closure, string.
 * Optional hook to specifiy how to perform the telnet actions
 * to switch the echo mode (used for e.g. password input_to()s).
 * 
 * H_ERQ_STOP
 * arg: lambda closure, lfun closure.
 * Optional hook to notify the mudlib about the termination of
 * the erq demon.
 * 
 * H_MSG_DISCARDED
 * arg: lambda closure, lfun closure, string
 * Optional hook to specify a message or take other measures
 * when a message had to be discarded.
 * 
 * See hooks(C) for a detailed discussion.
 *
 * @since Introduced in 3.2.1@1 as efun309(), renamed to
        set_driver_hook() in 3.2.1@13.
 *
 */
void set_driver_hook(int what, closure arg);

void set_driver_hook(int what, string arg);

void set_driver_hook(int what, string *arg);

/**
 * set_bit
 *
 * Return the new string where bit n is set in string str. Note
 * that the old string str is not modified.
 * 
 * Each character contains 6 bits. So you can store a value
 * between 0 and 63 in one character (2^6=64). Starting character
 * is the blank " " which has the value 0. The first charcter in
 * the string is the one with the lowest bits (0-5).
 * 
 * The new string will automatically be extended if needed.
 *
 * @example 
 * string s;
 * s=set_bit("?",5);
 * 
 * Because "?" has a value of 31 the variable s will now contain
 * the character "_" which is equal to 63 (31+2^5=63).
 * 
 * string s;
 * s=set_bit("78",3);
 * s=set_bit(s,8);
 * 
 * s will now contain the string "?<".
 *
 *
 */
string set_bit(string str, int n);

/**
 * send_udp
 *
 * Sends the <message> in an UDP packet to the given host and port
 * number.
 * 
 * The efun causes the privilege violation ("send_udp").
 * 
 * Returns 1 on success, 0 on failure.
 * 
 * Note: On some machines a failed send_udp() will not be registered
 * until the next send_udp() - the latter one might return '0' even
 * if itself was successful.
 *
 * @since LDMud 3.2.9 renamed this efun from send_imp(), and also changed the
          privilege violation string and the apply names.
 *
 */
int send_udp(string host, int port, bytes message);

int send_udp(string host, int port, int * message);

/**
 * send_erq
 *
 * A request of given type (<request>, default is 0), equipped
 * with the given <data>, is sent to the erq. If <callback> is
 * set to a closure, it will be called when the response from the
 * erq (a status code) arrives, if the response carries enough data to
 * work on.
 * 
 * <request> can be one of the request codes defined in <erq.h>.
 * The binary flag ERQ_CB_STRING defines whether the <callback>
 * closure expects the returned data packed into an array of
 * integers or as a string.
 * 
 * <data> may be a byte sequence, or an array of integers which are
 * then interpreted as bytes.
 * 
 * <callback>, if set, is a closure of either these forms:
 * 
 * !ERQ_CB_STRING: void <closure>(int *response_data, int len)
 * ERQ_CB_STRING: void <closure>(string response_data)
 * 
 * The result returned from the efun is 0 on failure to send the
 * data, or non-zero on a successful send.
 * 
 * The function causes a privilege violation "erq".
 *
 * @since Introduced in 3.2.1@61.
        Made a privileged function in 3.2.1@84
        LDMud 3.3.318 introduced the ERQ_CB_STRING flag.
 *
 */
int send_erq(int request, bytes|int * data, closure callback);

/**
 * say
 *
 * There are two major modes of calling:
 * 
 * If the first argument is a string <str>, it will be send to
 * all livings in the current room except to the initiator.
 * 
 * If the first argument is an array/mapping/struct/object <msg>, the
 * lfun catch_msg() of all living objects except the initiator will be
 * called.
 * This <msg> will be given as first argument to the lfun, and
 * the initiating object as the second.
 * CAVEAT: If the lfun catch_msg() modifies the content of <msg>, all
 * subsequent objects will receive the modified <msg>.
 * 
 * By specifying a second argument to the efun one can exclude
 * more objects than just the initiator. If the second argument
 * is a single object <exclude>, both the given object and the
 * initiator are excluded from the call. If the second argument
 * is an array <excludes>, all objects and just the objects in
 * this array are excluded from the call.
 * 
 * The 'initiator' is determined according to these rules:
 * - if the say() is called from within a living object, this
 * becomes the initiator
 * - if the say() is called from within a dead object as result
 * of a user action (i.e. this_player() is valid), this_player()
 * becomes the initiator.
 * - Else the object calling the say() becomes the initiator.
 *
 * @example 
 * say("Hi!\n");
 * say("Hi!\n", this_player());
 * Both calls are equal when called by a not living object.
 * 
 * Object 1 (living):
 * void catch_tell(string str) {
 * write("Received: "+str+"\n");
 * }
 * Object 2 (not living):
 * void func() {
 * ...
 * say("HiHo!\n");
 * ...
 * }
 * 
 * This examples shows how say() together with catch_tell()
 * works. The 2nd object must not be living so the write() will
 * go to the current user.
 * 
 * 
 * Object 1 (living):
 * void catch_msg(mixed *arr, object who) {
 * int i;
 * if(!arr) return;
 * for(i=0; i<sizeof(arr); i++)
 * tell_object(who, (stringp(arr[i]) ? arr[i] : "-/-")+"\n");
 * }
 * Object 2 (not living):
 * void func() {
 * ...
 * say( ({ "Hello", "there!" }) );
 * ...
 * }
 * 
 * This is a bit complex example to demonstrate how say() and
 * catch_msg() works. Here we also use a non living object to
 * send the message so the who in catch_msg() will be the current
 * user.
 *
 * @since LDMud 3.3.686 added the use of a mapping/struct/object as second
        argument.
 *
 */
void say(string str);

void say(string str, object exclude);

void say(string str, object *excludes);

void say(mixed *|mapping|struct s|object|lwobject msg);
void say(mixed *|mapping|struct s|object|lwobject msg, object exclude);
void say(mixed *|mapping|struct s|object|lwobject msg, object *excludes);

/**
 * save_value
 *
 * Encode the <value> into a string suitable for restoration with
 * restore_value() and return it.
 * 
 * The optional <format> argument determines the format of the savefile
 * to be written:
 * 
 * -1: use the driver's native format (default).
 * 0: original format, used by Amylaar LPMud and LDMud <= 3.2.8 .
 * 1: LDMud >= 3.2.9: no-lambda closures, symbols, quoted arrays
 * can be saved.
 * 2: LDMUd >= 3.5.0: floats are stored in a different way, which is
 * more compact and can store the new floats losslessly.
 * 
 * It is recommended to use version 2 or higher.
 * 
 * The created string consists of two lines, each terminated with
 * a newline character: the first line describes the format used to
 * save the value in the '#x:y' notation; the second line is the
 * representation of the value itself.
 * 
 * The format of the encoded value and of the format line matches
 * the format used by save_object() and restore_object().
 *
 * @since Introduced in LDMud 3.2.8.
        LDMud 3.2.9 added the saving of non-lambda closures, symbols,
          and quoted arrays, using the new savefile format version 1.
        LDMud 3.2.10 added the <format> argument.
        LDMud 3.5.0 added savefile format version 2.
 *
 */
string save_value(mixed value);

string save_value(mixed value, int format);

/**
 * save_object
 *
 * Encode the saveable variables of the current object into a string.
 * 
 * In the first form, the string is written to the file <name>.
 * A suffix ".c" will be stripped from the name, the suffix ".o"
 * may be added by the master object during the check in
 * valid_read(). Result is 0 if the save file could be created,
 * and non-zero on a non-fatal error (file could not be written,
 * or current object is destructed).
 * 
 * In the second form the string is returned directly. If the
 * object is destructed, the result is 0.
 * 
 * In both forms, the optional <format> argument determines the
 * format of the savefile to be written:
 * 
 * -1: use the driver's native format (default).
 * 0: original format, used by Amylaar LPMud and LDMud <= 3.2.8 .
 * 1: LDMud >= 3.2.9: non-lambda closures, symbols, quoted arrays
 * can be saved.
 * 2: LDMUd >= 3.5.0: floats are stored in a different way, which is
 * more compact and can store the new floats losslessly.
 * 
 * It is recommended to use version 2 or higher.
 * 
 * A variable is considered 'saveable' if it is not declared
 * as 'nosave' or 'static'.
 * 
 * Only lfuns bound to the current object can be saved.
 *
 * @since Since LDMud 3.2.8, save_object() returns a success value.
          The direct encoding into a string was added in LDMud 3.2.8, but
          may be moved into a different efun in future.
        LDMud 3.2.9 added the saving of non-lambda closures, symbols,
          and quoted arrays, using the new savefile format version 1.
        LDMud 3.2.10 added the <format> argument.
        LDMud 3.5.0 added savefile format version 2.
 *
 */
varargs int    save_object(string name, int format);
varargs string save_object(int format);

/**
 * rusage
 *
 * Return an array with current system resource usage statistics,
 * as returned by the getrusage(2) of Unix.
 * namely: utime, stime, maxrss, rus.ru_ixrss, rus.ru_idrss,
 * rus.ru_isrss, rus.ru_minflt, rus.ru_majflt, rus.ru_nswap,
 * rus.ru_inblock, rus.ru_oublock, rus.ru_msgsnd,
 * rus.ru_msgrcv, rus.ru_nsignals, rus.ru_nvcsw,
 * rus.ru_nivcsw
 * 
 * This function is optional.
 *
 *
 */
int * rusage();

/**
 * rmember
 *
 * Returns the index of the last occurance of second arg
 * in the first arg, or -1 if none found.
 * If <start> is given and non-negative, the search starts at
 * that position.
 *
 * @since Introduced in LDMud 3.2.10.
        LDMud 3.3.556 added the <start> parameter.
 *
 */
varargs int rmember(mixed *array, mixed elem , int start);
varargs int rmember(string s, int elem , int start);
varargs int rmember(bytes s, int elem , int start);

/**
 * rmdir
 *
 * Remove directory dir. Return 1 on success, 0 on failure.
 *
 *
 */
int rmdir(string dir);

/**
 * rm
 *
 * Remove the file. Returns 0 for failure and 1 for success.
 *
 *
 */
int rm(string file);

/**
 * reverse
 *
 * Reverse the content of array, string or byte sequence <arg> and
 * return the result. If <arg> is an integer, the bits in the
 * integer are reversed.
 * 
 * If called in the reference variant, the argument array itself
 * is reversed and then returned.
 *
 * @example 
 * reverse(0x306a) - returns 0x560c0000
 * 
 * reverse("test") - returns "tset"
 * 
 * mixed * arr = ({ 1, 2 });
 * reverse(arr)  - returns ({ 2, 1 }), leaves arr unchanged.
 * reverse(&arr) - returns ({ 2, 1 }), sets arr to ({ 2, 1 })
 *
 * @since Introduced in LDMud 3.3.529.
        LDMud 3.3.532 added the reversal of bits in an integer.
 *
 */
int     reverse(int arg);

string  reverse(string arg);

bytes   reverse(bytes arg);

mixed * reverse(mixed * arg);

mixed * reverse(mixed * & arg);

/**
 * restore_value
 *
 * Decode the string representation <str> of a value back into the value
 * itself and return it. <str> is a string as generated by save_value().
 * 
 * The '#x:y' version specification of the saveformat is optional,
 * however the driver will assume the old format version 0 in this case.
 * It is strongly recommended to regard the version specification as
 * non-optional in newly saved values.
 *
 * @since Introduced in LDMud 3.2.8.
        LDMud 3.2.9 added the restoring of non-lambda closures, symbols,
        and quoted arrays, using a new savefile format version.
        LDMud 3.5.0 added the possibility to restore version 2 with its higher
        float precision.
 *
 */
mixed restore_value(string str);

/**
 * restore_object
 *
 * Restore values of variables for current object from the file <name>,
 * or directly from the string <str>.
 * 
 * To restore directly from a string <str>, the string must begin
 * with the typical line "#x:y" as it is created by the save_object()
 * efun.
 * 
 * When restoring from a file, the name may end in ".c" which is stripped
 * off by the parser. The master object will probably append a .o to the
 * <name>. The validity of the filename is checked with a call to
 * check_valid_path().
 * 
 * Return 1 on success, 0 if there was nothing to restore.
 * 
 * Variables that has the type modifer 'nosave' will not be restored.
 * Example: nosave int xxx;
 * 
 * Lfun, variable and simul_efun closures are restored only if they
 * can be found (this excludes closures of private lfuns as well) - if
 * not, they are restored as value '0'.
 * 
 * If inheritance is used, then it might be possible that a
 * variable will exist with the same name in more than one place,
 * and thus appear in the  save file multiple times. When
 * restoring, the variables are restored in the order they are
 * found in the inheritance tree.  A good practice is to have
 * verbose and unique name on non-static variables, which also
 * will make it more easy to read or patch the save file
 * manually.
 *
 * @since Restoring directly from a string was added in LDMud 3.2.8 and
        may be moved in future into a separate efun.
        LDMud 3.2.9 added the restoring of non-lambda closures, symbols,
        and quoted arrays, using a new savefile format version.
        LDMud 3.5.0 added the possibility to restore version 2 with its higher
        float precision.
 *
 */
int restore_object(string name);

int restore_object(string str);

/**
 * replace_program
 *
 * Substitutes a program with the inherited program <program>. If
 * the object inherits only one program, the argument may be omitted
 * and the efun will automatically select the one inherited program.
 * 
 * This efun is useful if you consider the performance and memory
 * consumption of the driver. A program which doesn't need any additional
 * variables and functions (except during creation) can call
 * replace_program() to increase the function-cache hit-rate of the
 * driver which decreases with the number of programs in the system.
 * 
 * Rooms are a good example for the application of this function, as many
 * rooms just consist of an inherit statement and the configure function.
 * Any object can call replace_program() but looses all extra variables
 * and functions which are not defined by the inherited program.
 * 
 * When replace_program() takes effect, shadowing is stopped on
 * the object since 3.2@166.
 * 
 * It is not possible to replace the program of an object after (lambda)
 * closures have been bound to it. It is of course possible to first
 * replace the program and then bind lambda closures to it.
 * 
 * The program replacement does not take place with the call to the efun,
 * but is merely scheduled to be carried out at the end of the backend
 * cycle. This may cause closures to have references to then vanished
 * lfuns of the object. This poses no problem as long as these references
 * are never executed after they became invalid.
 *
 * @since LDMud 3.2.9 allowed to omit the argument if only one inherit
        exists.
 *
 */
void replace_program();

void replace_program(string program);

/**
 * rename_object
 *
 * Give the object <ob> a new object name <new_name>. Causes a privilege
 * violation. The new name must not contain a # character, except
 * at the end, to avoid confusion with clone numbers.
 *
 * @since Introduced in 3.2@55.
 *
 */
void rename_object(object ob, string new_name);

/**
 * rename
 *
 * The efun rename() will move from to the new name to. If from
 * is a file, then to may be either a file or a directory. If
 * from is a directory, then to has to be a directory. If to
 * exists and is a directory, then from will be placed in that
 * directory and keep its original name.
 * 
 * You must have write permission for from to rename the file.
 * 
 * It is only possible to change name of a directory within a
 * directory on machines running System V, i.e. it is not
 * possible to move to another directory. It is not possible to
 * move a directory across filesystems on any system.
 * 
 * On successfull completion rename() will return 0. If any error
 * occurs, a non-zero value is returned.
 *
 * @example 
 * rename("/players/wizard/obj.c", "/players/wizard/newobj.c");
 *
 *
 */
int rename(string from, string to);

/**
 * remove_interactive
 *
 * Close the connection to the interactive object ob.
 * 
 * For the time of the LPC execution, the object is only marked
 * internally as 'about to be closed', meaning that while all
 * output will be redirected to stdout, the actual network connection
 * will continue to exist until the LPC execution ends.
 *
 *
 */
void remove_interactive(object ob);

/**
 * remove_input_to
 *
 * Remove a pending input_to from the interactive <player> object.
 * If the optional <fun> is not given, the most recently added input_to
 * is removed.
 * 
 * If the optional <fun> is given, the efun tries to find and remove the
 * most recently added input_to matching the <fun> argument:
 * - <fun> is a string: the input_to functionname has to match
 * - <fun> is an object: the object the input_to function is bound to
 * has to match
 * - <fun> is a closure: the input_to closure has to match.
 * - <ob> and <fun> are given: both the object and the functionname
 * have to match
 * 
 * Return 1 on success, or 0 on failure (no input_to found, object is
 * not interactive or has no input_to pending).
 *
 * @example 
 * Remove all pending input_to from the current user, if any.
 * while (remove_input_to(this_interactive())) ;
 *
 * @since Introduced in LDMud 3.2.9 / 3.3.119.
 *
 */
int remove_input_to(object player);

int remove_input_to(object player, string fun);

int remove_input_to(object player, closure fun);

int remove_input_to(object player, object|lwobject fun);

int remove_input_to(object player, object|lwobject ob, string fun);

/**
 * remove_call_out
 *
 * Remove next pending call-out for function <fun> in the current
 * object, resp. the next pending call-out for closure <fun>.
 * The time left is returned.
 * 
 * -1 is returned if there were no call-outs pending to this
 * function.
 *
 * @example 
 * To remove every pending call-out to MyTimer() :
 * 
 * while (remove_call_out("MyTimer") != -1) /* continue *\/ ;
 *
 * @since Removing a call_out to a closure was introduced in 3.2.1@45.
 *
 */
int remove_call_out(string fun);

int remove_call_out(closure fun);

/**
 * remove_action
 *
 * If <verb> is a string: remove the first action defined by the current
 * object with the given <verb> from <ob> (default is this_player()).
 * Return 1 if the action was found and removed, and 0 else.
 * 
 * If <verb> is a number: if non-0, remove all actions defined by
 * the current object from <ob> (default is this_player()).
 * Return the number of actions removed.
 *
 * @since Introduced in 3.2.1.
        LDMud 3.2.10 added the ability to remove all actions.
 *
 */
int remove_action(int|string verb);

int remove_action(int|string verb, object ob);

/**
 * regreplace
 *
 * This function looks through txt looking for the regular
 * expression pattern. If it finds it, it replaces it by the
 * replacepattern.
 * 
 * The replacepattern can be a constant string, or a closure taking
 * the matched substring and the position at which it was found
 * as arguments and returning the replacement pattern string.
 * 
 * The flag is a bitmask of the usual regexp options. Additionally
 * the efun recognizes RE_GLOBAL: if set, the search and replace
 * is repeated as often as the pattern matches.
 * 
 * The function returns the modified string (or the original if it
 * wasn't modified).
 * 
 * The function behaves like the s/pattern/replacepattern/flags
 * in editors as ed/vi or sed. The power of this function lies in
 * replacing variable strings (as opposed to regexplode, where
 * you can explode by regular expression, but not implode...)
 *
 * @example 
 * string msgin;
 * 
 * /* Checks msgin for the string 'tells you: ' and all following
 * * characters and encloses those characters by <underline>
 * * and </underline>. global.
 * *\/
 * msgin = regreplace(msgin, "tells you: (.*)",
 * "tells you: <underline>\\1</underline>", 1);
 * 
 * /* replaces all <underline> html tags by the vt100 escape
 * * sequence for underline.
 * *\/
 * txt = regreplace(txt, "<underline>", "<ESC>[5m", 1);
 * 
 * /* Put the word HOUSE into lower case. *\/
 * txt = regreplace(txt, "HOUSE",
 * function string (string s) {return lower_case(s);},
 * 1);
 *
 * @since Introduced in 3.2.1@125.
        The use of a closure as replacepattern was introduced in
        LDMud 3.2.9.
 *
 */
string regreplace(string txt, string pattern,closure|string replacepattern, int flags);

/**
 * regmatch
 *
 * Match the string <txt> against <pattern> (interpreted according
 * to <opt> if given). If <start> is given, it is the start
 * position for the match and must be in the range [0..strlen(text)].
 * 
 * If there is no match, the result is 0. If there is a match, the exact
 * result is determined by the flag RE_MATCH_SUBS:
 * 
 * If the flag RE_MATCH_SUBS is not set, the result is the matched
 * expression.
 * 
 * If the flag RE_MATCH_SUBS is set, the result is an array of the
 * matched string(s) of the first match. Entry [0] is the full string
 * matching the <pattern>, following entries are the string segments
 * matching parenthesized subexpressions in <pattern>. If a particular
 * subexpression didn't have a match, the corresponding array entry will
 * be 0.
 * 
 * The last entry in the array will be the new start index in case you
 * want to repeat the match on the remaining parts of the string. This
 * new index is usually equal the length of the match, but at least one
 * higher than the original start index.
 *
 * @example 
 * regmatch("abcdefcdf", "cd")    -> "cd"
 * regmatch("abcdefcdf", "cd(e)") -> "cde"
 * 
 * regmatch("abcdefcdf", "cd", RE_MATCH_SUBS)    -> ({ "cd" })
 * regmatch("abcdefcdf", "cd(e)", RE_MATCH_SUBS) -> ({ "cde", "e" })
 *
 * @since Introduced in LDMud 3.3.198.
        Modified in 3.3.214 to return 0 for non-matches, and to take and
        return a start position.
        Since 3.5.0 a error is raised if RE_PCRE is specified in <opt>, but
        the driver lacks PCRE support.
 *
 */
string   regmatch(string text, string pattern);

string   regmatch(string text, string pattern, int opt);

string   regmatch(string text, string pattern, int opt, int start);

string * regmatch(string text, string pattern, int opt);

string * regmatch(string text, string pattern, int opt, int start);

/**
 * regexplode
 *
 * This function is similar to explode but accepts a regular
 * expression <pattern> as delimiter (interpreted according to <opt>
 * if given).
 * 
 * If flag RE_OMIT_DELIM is not set in <opt>, then every second element
 * in the result vector will be the text that matched the delimiter.
 * If the flag is set, then the result vector will contain only
 * the text between the delimiters.
 *
 * @example 
 * regexplode("abcdef", "cde")                -> ({ "ab", "cde", "f" })
 * regexplode("abcdef", "cde", RE_OMIT_DELIM) -> ({ "ab", "f" })
 *
 * @since Introduced in 3.2@61.
        LDMud 3.3 added the optional <opt> argument and the RE_OMIT_DELIM
          flag.
        Since 3.5.0 a error is raised if RE_PCRE is specified in <opt>, but
        the driver lacks PCRE support.
 *
 */
string * regexplode(string text, string pattern);

string * regexplode(string text, string pattern, int opt);

/**
 * regexp_package
 *
 * Return which regexp package is used by default:
 * 
 * RE_TRADITIONAL: traditional regexps
 * RE_PCRE:        PCRE
 * 
 * As the package can be selected at runtime through the
 * REGEXP_PACKAGE driver hook, there is no good way to determine
 * the package at LPC compile time.
 * Match the pattern <pattern> (interpreted according to <opt> if
 * given) against all strings in list, and return a new array with all
 * strings that matched.
 * 
 * If there is an error in the regular expression, a runtime
 * error will be raised.
 *
 * @example 
 * string strs;
 * string pattern;
 * 
 * if (regexp_package() == RE_PCRE)
 * pattern = "\\<help\\>.*\\<me\\>";
 * else
 * pattern = "\\bhelp\\b.*\\bme\\b";
 * 
 * if (strs = regexp(({"please, help me Sir John."}), pattern)) {
 * if (sizeof(strs)
 * write("It matches.\n");
 * }
 * 
 * The regular expression will test the given string (which is
 * packed into an array) if there is something like "help ... me"
 * inside of it.
 *
 * @since Introduced in LDMud 3.3.634.
 *
 */
int regexp_package();

/**
 * regexp
 *
 * Match the pattern <pattern> (interpreted according to <opt> if
 * given) against all strings in list, and return a new array with all
 * strings that matched.
 * 
 * If there is an error in the regular expression, a runtime
 * error will be raised.
 *
 * @example 
 * string strs;
 * string pattern;
 * 
 * if (regexp_package() == RE_PCRE)
 * pattern = "\\<help\\>.*\\<me\\>";
 * else
 * pattern = "\\bhelp\\b.*\\bme\\b";
 * 
 * if (strs = regexp(({"please, help me Sir John."}), pattern)) {
 * if (sizeof(strs)
 * write("It matches.\n");
 * }
 * 
 * The regular expression will test the given string (which is
 * packed into an array) if there is something like "help ... me"
 * inside of it.
 *
 * @since LDMud 3.3 added the optional <opt> argument.
        Since 3.5.0 a error is raised if RE_PCRE is specified in <opt>, but
        the driver lacks PCRE support.
 *
 */
string * regexp(string *list, string pattern);

string * regexp(string *list, string pattern, int opt);

/**
 * referencep
 *
 * returns true if arg was passed by reference to the current
 * function, instead of the usual call-by-value.
 * 
 * Note that arg has to be passed by reference to the efun,
 * a.g. referencep(&x).
 *
 *
 */
int referencep(mixed arg);

/**
 * read_file
 *
 * Reads lines from file.
 * If <start> is not given or 0, the file is read from the
 * beginning, else the efun starts reading at the beginning of line
 * <start>.
 * 
 * If <number> is not given or 0, the whole file is read, else
 * just the given amount of lines.
 * 
 * <encoding> denotes the encoding to be used for decoding the file.
 * If it is not given or 0, the H_FILE_ENCODING driver hook will
 * be used.
 * 
 * If <start> would be outside the actual size of the file, 0 is
 * returned instead of a string.
 * 
 * The maximum number of characters (not lines!) being read per
 * call is LIMIT_FILE (see query_limits()).
 *
 * @since LDMud 3.6.0 added the <encoding> parameter.
 *
 */
varargs string read_file(string file, int start, int number, string encoding);

/**
 * read_bytes
 *
 * Reads a given amount of bytes from file.
 * If <start> is not given or 0, the file is read from the
 * beginning, else from the <start>th byte on. If <start> is
 * negative, it is counted from the end of the file. If this
 * would extend beyond the beginning of the file, it is read
 * from the beginning.
 * <number> is the number of bytes to read. 0 or negative values
 * are possible, but not useful.
 * If <start> would be beyond the end of the file, 0 is returned
 * instead of a string.
 * 
 * The maximum bytes being read per call is LIMIT_BYTE (see
 * query_limits()).
 *
 * @since LDMud 3.6.5 accepts start offsets before the beginning of the file.
 *
 */
bytes read_bytes(string file, int start, int number);

/**
 * random
 *
 * Returns a number in the random range [0 .. n-1].
 * 
 * The random number generator is proven to deliver an equal distribution
 * of numbers over a big range, with no repetition of number sequences
 * for a long time. The downside of these (desirable) qualities is that
 * when generating numbers in a small range over short time, certain
 * numbers will appear far more often than others.
 * 
 * The only solution is the implementation of a special simul_efun which
 * takes special steps to implement an equal distribution over small
 * ranges and short times.
 *
 *
 */
int random(int n);

/**
 * raise_error
 *
 * Abort execution. If the current program execution was
 * initiated by catch(), that catch expression will return arg as
 * error code, else the arg will printed as error message.
 * 
 * This is very similar to throw(), but while throw() is intended to be
 * called inside catch(), raise_error() can be called anywhere.
 * Furthermore, raise_error() includes the complete error handling
 * with generation of a stack backtrace, making it a very expensive
 * function.
 *
 *
 */
void raise_error(string arg);

/**
 * quote
 *
 * Converts arrays to quoted arrays and strings to symbols.
 * Symbols and quoted arrays get quoted once more.
 *
 * @example 
 * quote("foo") -> 'foo
 * quote(({1,2,3})) -> '({1,2,3})
 *
 * @since Introduced in 3.2@70
 *
 */
mixed quote(mixed a);

/**
 * query_verb
 *
 * Return the verb of the current command, of 0 if not executing from
 * a command. If <flag> is 0 or not given, the verb as given by the user
 * is returned (this is the first word from the line input by the player,
 * up to but not including the first space or lineend). If <flag> is
 * non-0, the verb as specified in the add_action() statement is returned.
 *
 * @example 
 * void init() {
 * ...
 * add_action("sing","sing");
 * add_action("sing","chant", 1);
 * ...
 * }
 * int sing(string str) {
 * write("Your command was: "+query_verb()+(str ? str : "")+"\n");
 * write("The action verb was: "+query_verb(1)+(str ? str : "")+"\n");
 * return 1;
 * }
 * 
 * The command 'sing ...' will print:
 * Your command was: sing
 * The action verb was: sing
 * 
 * The command 'chant ...' will print:
 * Your command was: chant
 * The action verb was: chant
 * 
 * The command 'chantit ...' will print:
 * Your command was: chantit
 * The action verb was: chant
 *
 * @since LDMud 3.2.9 added the optional flag argument.
 *
 */
string query_verb();

string query_verb(int flag);

/**
 * query_notify_fail
 *
 * If <flag> is not given or 0: return the string or closure which
 * was last set as error message for this command (with notify_fail()).
 * 
 * If <flag> is given and 1: return the object which issued the last
 * notify_fail().
 * 
 * If nothing was set yet, return 0.
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.2.8 added the <flag> parameter.
 *
 */
mixed query_notify_fail();

mixed query_notify_fail(int flag);

/**
 * query_command
 *
 * Give the text of the current command, or 0 if not executing
 * from a command.
 * 
 * The text is the command as seen by the parser, ie. after
 * modify_command and after stripping trailing spaces.
 * 
 * query_command() returns 0 when invoked by a function which was started
 * by a call_out or the heart beat.  Also when a user logs in
 * query_command() returns 0.
 *
 * @example 
 * void init() {
 * ...
 * add_action("sing","sing");
 * ...
 * }
 * int sing(string str) {
 * write("Your command was:"+query_command()+"\n");
 * return 1;
 * }
 * 
 * When ever you type "sing ..." you get "Your command was: sing ...".
 *
 *
 */
string query_command();

/**
 * query_actions
 *
 * query_actions takes either an object or a filename as first
 * argument and a bitmask (int) or string as a second argument.
 * If the second argument is a string, query_actions() will return
 * an array containing information (see below) on the verb or
 * zero if the living object "ob" cannot use the verb. If the
 * second argument is a bitmask, query_actions() will return a
 * flat array containing information on all verbs added to ob.
 * The second argument is optional (default is QA_VERB).
 * QA_VERB       ( 1):  the verb
 * QA_TYPE       ( 2):  type
 * QA_SHORT_VERB ( 4):  short_verb
 * QA_OBJECT     ( 8):  object
 * QA_FUNCTION   (16): function
 * 
 * "type" is one of the values defined in <sent.h>
 * (which is provided with the parser source).
 * 
 * SENT_PLAIN        added with add_action (fun, cmd);
 * SENT_SHORT_VERB   added with add_action (fun, cmd, AA_SHORT);
 * SENT_NO_SPACE     added with add_action (fun, AA_NOSPACE);
 * SENT_MARKER       internal, won't be in the returned array
 * negative value: The verb given by the player has to match only
 * the leading -<value> characters of the action's verb.
 *
 *
 */
mixed * query_actions(object ob, mixed mask_or_verb);

/**
 * program_time
 *
 * Returns the creation (compilation) time of the object's
 * program. Default is this_object(), if no arg is given.
 * 
 * CAVEAT: If the objects program is swapped out, this efun
 * swaps it back in.
 *
 *
 */
int program_time();

int program_time(object|lwobject ob);

/**
 * program_name
 *
 * Returns the name of the program of <obj>, resp. the name of the
 * program of the current object if <obj> is omitted.
 * 
 * The returned name is usually the name from which the blueprint
 * of <obj> was compiled (the 'load name'), but changes if an object
 * replaces its programs with the efun replace_program().
 * 
 * As a special case, if <ob> is passed as 0, the function will
 * return 0.
 * 
 * The name always ends in '.c'. It starts with a '/' unless the
 * driver is running in COMPAT mode.
 * 
 * CAVEAT: This efun swaps in the program if it is swapped out.
 *
 * @example 
 * object o;
 * o = clone_object("/std/thing");
 * write(program_name(o));  --> writes "/std/thing.c" in !compat mode
 * and "std/thing.c"  in compat mode
 *
 * @since Introduced in LDMud 3.2.6.
        LDMud 3.2.9 allowed a 0 argument.
 *
 */
string program_name();

string program_name(object|lwobject obj);

/**
 * process_string
 *
 * Searches string str for occurrences of a "value by function
 * call", which is an implicit function call surrounded by @@. See
 * "value_by_function_call" in the principles section.
 * 
 * The value should contain a string like this:
 * @@function[:filename][|arg|arg]@@
 * 
 * <function> must return a string or else the string which should be
 * processed will be returned unchanged.
 * 
 * process_string() does not recurse over returned
 * replacement values. If a function returns another function
 * description, that description will not be replaced.
 * 
 * Both the filename and the args are optional.
 * 
 * Consecutive function calls can be written adjacent:
 * 
 * @@function1@@function2@@
 *
 * @example 
 * string foo(string str) {
 * return "ab"+str+"ef";
 * }
 * void func() {
 * write(process_string("@@foo|cd@@")+"\n");
 * }
 * 
 * The function func() will print out the string "abcdef".
 *
 * @since Because of the security problems, process_string() is an
        optional efun since 3.2.1@34
        LDMud 3.3.160 removed the undocumented 'feature' that a function call
        declaration could be terminated by a space. In turn this now allows
        the use of arguments with spaces.
 *
 */
string process_string(string str);

/**
 * printf
 * A cross between sprintf() and write(). Returns void and prints
 * the result string to the user.
 * @param format The format string.
 * @param {...mixed} args The arguments to be formatted. 
 */
void printf(string format, varargs mixed args);

/**
 * previous_object
 *
 * Returns an object pointer to the object that did a call (call_other(),
 * funcall(), etc) to the current object, if any. If that object is
 * destructed, the function returns 0.
 * 
 * If the optional arg is given, the call_other()s are followed
 * back i times (i.e. previous_object(1) returns the caller of
 * the caller): 0 <= i < caller_stack_depth(). If <i> is less than 0, the
 * first previous object is returned.
 * 
 * There is an important special case: in functions called by
 * the gamedriver in reaction to some external event (e.g. commands
 * added by add_action), previous_object() will return this_object(),
 * but previous_object(0) will return 0.
 *
 * @example 
 * int security() {
 * object|lwobject prev;
 * if (!(prev=previous_object()));
 * else if (getuid(prev)  != getuid(this_object()));
 * else if (geteuid(prev) != geteuid(this_object()));
 * else return 1;
 * return 0;
 * }
 * void highly_sensible_func() {
 * if (!security())
 * return;
 * ...
 * }
 * 
 * This example shows how we can check if the last call to a
 * function of the current object is secure or if we should abort
 * execution.
 *
 *
 */
object|lwobject previous_object();

object|lwobject previous_object(int i);

/**
 * present_clone
 *
 * This efun searches the inventory of object <env> (default is
 * this_object()) for an object with a specific blueprint.
 * The blueprint can be specified either by name <str>, or as the same
 * blueprint as of object <obj>. The matching criteria in both cases is
 * the load_name().
 * If <n> is given, the <n>th object in <env> is returned (if present),
 * otherwise the first object matching <str> or <obj>.
 * If no object in <env> matches the criteria, 0 is returned.
 * 
 * For plain driver this name starts with a '/', for COMPAT mode
 * drivers it doesn't.
 *
 * @example 
 * Assume that object 'env' contains the objects /obj/money#8,
 * /std/weapon#9, /std/weapon#12 and /obj/key in the given order.
 * 
 * +--------------------------------------------------+---------------+
 * | Function call                                    | returns       |
 * +--------------------------------------------------+---------------+
 * | present_clone("/obj/money", env)                 | /obj/money#8  |
 * | present_clone("/std/weapon#12", env)             | /std/weapon#9 |
 * | present_clone(find_object("/obj/money#14"), env) | /obj/money#8  |
 * | present_clone("/obj/key#18", env)                | /obj/key      |
 * | present_clone("/std/weapon#12", env, 2)          | /std/weapon#12|
 * | present_clone("/std/weapon#12", env, 3)          | 0             |
 * +--------------------------------------------------+---------------+
 *
 * @since Introduced in 3.2.7.
        Searching for the <n>th object was added in 3.3.718.
 *
 */
object present_clone(string str);

object present_clone(string str, int n);

object present_clone(string str, object env);

object present_clone(string str, object env, int n);

object present_clone(object obj);

object present_clone(object obj, int n);

object present_clone(object obj, object env);

object present_clone(object obj, object env, int n);

/**
 * present
 *
 * This efun checks if an object is present in a given environment.
 * The object is identified by id <str> or by an object <ob>. This
 * latter form of the efun can be used as a fast way to test for the
 * presence of a known object.
 * 
 * When searching objects by id, the efun by default returns the first
 * object found matching the id. In order to search for other than the
 * first object, a number can be specified either directly as the
 * argument <n>, or implicetely inside the <str> in the form "<id>
 * <n>".
 * 
 * By default, the efun searches first in the inventory of
 * this_object(), then in its environment. However, if <env> is given,
 * the efun searches just inside <env>.
 * 
 * When searching both inventory and environment of this_object(),
 * the numbering is applied linear over both spaces (see examples).
 * 
 * The driver identifies objects by calling the lfun id() in each
 * object.
 *
 * @example 
 * present("chest");
 * --> returns the first 'chest' object in this object.
 * 
 * present("chest 2")
 * --> returns the second 'chest' object in this object.
 * 
 * present("chest 2", 1)
 * --> returns the first 'chest 2' object in this object.
 * 
 * Assume there is one "chest" inside the current object, and
 * two in its environment:
 * present("chest", 1) -> returns the chest inside
 * present("chest", 2) -> returns the first chest outside
 * present("chest", 3) -> returns the second chest outside
 * 
 * A typical 2.4.5-implementation of the "do <id> <n>" command style
 * is:
 * 
 * void init() { add_action("open_chest", "open"); }
 * 
 * int open_chest (string str) {
 * if (present (str) != this_object ())
 * return 0; /* Not this chest *\/
 * ...
 * }
 *
 * @since LDMud 3.2.11/3.3.610 introduced the (str, n) argument form.
        LDMud 3.3.713 modified the <n> search behaviour so that the
          numbering is applied over both inventory and environment
          together. Before, the numbering was individual in each
          space, leading to situations where low-numbered objects in the
          environment were hidden by those in the inventory.
 *
 */
object present(string str);

object present(string str, int n);

object present(string str, object env);

object present(string str, int n, object env);

object present(object ob);

object present(object ob, object env);

/**
 * pow
 *
 * The function returns the value of <base> raised to the power of <exp>.
 *
 * @example 
 * pow(-2, 3)       - returns -8.0
 * pow(8, 1.0/3.0)  - returns 2.0
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.2.9 added integers as arguments.
 *
 */
float pow(int|float base, int|float exp);

/**
 * pointerp
 *
 * Return 1 if arg is a pointer, i.e. an array.
 *
 * @returns {arg is mixed*} 
 */
int pointerp(mixed arg);

/**
 * pg_query
 *
 * Queue a new query <query> to the database connection on the current
 * object. Return the unique id of the query. The query result itself
 * will be passed as argument to the callback function.
 * 
 * <flags> can be one of these values:
 * PG_RESULT_ARRAY: Pass the query result as array.
 * PG_RESULT_MAP:   Pass the query result as mapping.
 * 
 * The function is available only if the driver is compiled with
 * PostgreSQL support. In that case, __PGSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("pgsql", "pg_query").
 *
 * @since Added in 3.3.445.
        LDMud 3.3.640 added the privilege violation.
 *
 */
int pg_query (string query);

int pg_query (string query, int flags);

/**
 * pg_pending
 *
 * Return the number of pending queries for the connection on the given
 * object <obj> (default is the current object). The object has no
 * database connection, return -1.
 * 
 * The function is available only if the driver is compiled with
 * PostgreSQL support. In that case, __PGSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("pgsql", "pg_pending").
 *
 * @since Added in 3.3.445.
        LDMud 3.3.640 added the privilege violation.
 *
 */
int pg_pending();

int pg_pending(object obj);

/**
 * pg_conv_string
 *
 * Convert the string <str> into a string that is correctly interpretated
 * for usage as a string in pg_query(), e.g. ' is replaced with \' and so
 * on.
 * 
 * The function is available only if the driver is compiled with
 * PostgreSQL support. In that case, __PGSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("pgsql", "pg_connect").
 *
 * @since Added in 3.3.708.
 *
 */
string pg_conv_string(string str);

/**
 * pg_connect
 *
 * Open a database connection as directed by <conn>, and assign the
 * callback function <fun>/<cl> with the optional <extra> parameters
 * to it.
 * 
 * The object holding the callback function becomes the controlling
 * object; obiously it is an error to assign more than one connection
 * to the same controlling object.
 * 
 * The <conn> string is in the format accepted by Postgres'
 * PQconnectStart() API functions. Pass an empty string to use the
 * default options, or a string holding the '<key>=<value>' options
 * separated by whitespace.
 * 
 * The most useful options are:
 * dbname:   The database name
 * user:     The user name to connect as.
 * password: Password to be used.
 * 
 * Return 0 on success, and -1 on failure.
 * 
 * The function is available only if the driver is compiled with
 * PostgreSQL support. In that case, __PGSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("pgsql", "pg_connect").
 *
 * @since Added in 3.3.445.
        LDMud 3.3.640 added the privilege violation.
 *
 */
int pg_connect(string conn, string fun);

int pg_connect(string conn, string fun, string|object obj,varargs mixed extra );

int pg_connect(string conn, closure cl, varargs mixed extra );

/**
 * pg_close
 *
 * Close the database connection for the current object, if there is one.
 * 
 * The function is available only if the driver is compiled with
 * PostgreSQL support. In that case, __PGSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("pgsql", "pg_close").
 *
 * @since Added in 3.3.445.
        LDMud 3.3.640 added the privilege violation.
 *
 */
void pg_close();

/**
 * parse_command
 *
 * parse_command() is basically a spiffed up sscanf operating
 * on word basis and targeted at recognizing object descriptions from
 * command strings.
 * 
 * The efun takes the command string <cmd> and the object(s) <env>/<arr>
 * and tries to match it against the format string <fmt>. Successfully
 * matched elements are assigned to the variables <var>.... The result
 * from the efun is 1 if the command could be fully matched, and 0
 * otherwise.
 * 
 * If the objects are given as a single object <env>, the efun matches
 * against the given object and all objects contained therein. Otherwise,
 * if the objects are given as an array <arr> of objects, the efun
 * matches only against the given objects.
 * 
 * The format string <fmt> consists of words, syntactic markers, and
 * %-directives for the values to parse and return in the variables.
 * A typical example is " 'get' / 'take' %i " or
 * " 'spray' / 'paint' [paint] %i ". The elements in detail are:
 * 
 * 'word': obligatory text
 * [word]: optional text
 * /     : Alternative marker
 * %o    : Single item, object
 * %s    : Any text
 * %w    : Any word
 * %p    : One of a list of prepositions.
 * If the variable associated with %p is used to pass
 * a list of words to the efun, the matching will take
 * only against this list.
 * %l    : non-compat: Living objects
 * compat: a single living object
 * %i    : Any objects
 * %d    : Number >= 0, or when given textual: 0-99.
 * 
 * A <word> in this context is any sequence of characters not containing
 * a space. 'living objects' are searched by calls to the (simul)efuns
 * find_player() and find_living(): both functions have to accept a name
 * as argument and return the object for this name, or 0 if there
 * is none.
 * 
 * The results assigned to the variables by the %-directives are:
 * 
 * %o : returns an object
 * %s : returns a string of words
 * %w : returns a string of one word
 * %p : if passed empty: a string
 * if passed as array of words: var[0] is the matched word
 * %i : returns an array with the following content:
 * [0]: int: the count/number recognized in the object spec
 * > 0: a count (e.g. 'three', '4')
 * < 0: an ordinal (e.g. 'second', 'third')
 * = 0: 'all' or a generic plural such as 'apples'
 * [1..]: object: all(!) objects matching the item description.
 * In the <env> form this may be the whole
 * recursive inventory of the <env> object.
 * It is up to the caller to interpret the recognized numeral
 * and to apply it on the list of matched objects.
 * %l : non-compat: as %i, except that only living objects are
 * returned.
 * compat: as %o, except that only a living object is returned.
 * 
 * %i (and non-compat-%l) match descriptions like 'three red roses',
 * 'all nasty bugs' or 'second blue sword'.
 * 
 * Note: Patterns of type: "%s %w %i" might not work as one would expect.
 * %w will always succeed so the arg corresponding to %s will always be
 * empty.
 * 
 * To make the efun useful it must have a certain support from the
 * mudlib: it calls a set of functions in objects to get the
 * information it needs to parse a string.
 * 
 * 1. string *parse_command_id_list()
 * Normal singular names of the object.
 * 
 * 2. string *parse_command_plural_id_list() - optional
 * Plural forms of the names returned by 1.
 * If this function doesn't exist, the parser tries to pluralize
 * the names returned by 1.
 * 
 * 3. string *parse_command_adjectiv_id_list() -  optional
 * All adjectives associated with this object.
 * 
 * All names and adjectives may consist of several words separated
 * by spaces.
 * 
 * These functions should exist in all objects and are therefore best
 * put into a mandatory inherit file (e.g. /std/object.c).
 * 
 * In addition the master object may offer the same functions to provide
 * reasonable defaults (like 'thing' as generic singular name):
 * 
 * string *parse_command_id_list()
 * - Would normally return: ({ "one", "thing" })
 * 
 * string *parse_command_plural_id_list()
 * - Would normally return: ({ "ones", "things", "them" })
 * 
 * string *parse_command_adjectiv_id_list()
 * - Would normally return ({ "iffish" })
 * 
 * Two additional functions in the master object provide the default
 * list of prepositions (needed for %p) and the single 'all' word:
 * 
 * string *parse_command_prepos_list()
 * - Would normally return: ({ "in", "on", "under", "behind",
 * "beside" })
 * 
 * string parse_command_all_word()
 * - Would normally return: "all"
 * 
 * 
 * int parse_command(string, object|object*, string, destargs...)
 *
 * @example 
 * object *items;
 * parse_command("take apple",environment(this_player()),
 * " 'get' / 'take' %i ", items);
 *
 * @since LDMud 3.3.258 removed the compat-mode parse_command().
 *
 */
int parse_command(string cmd, object  env, string fmt, varargs mixed &var );
int parse_command(string cmd, object *arr, string fmt, varargs mixed &var );

/**
 * or_bits
 *
 * <str1> and <str2> are both bitstrings. The result of the function
 * is a bitstring with the binary-or of <str1> and <str2>,
 * ie. a string in which a bit is set if the corresponding
 * bit in <str1> or <str2> (or both) is set.
 *
 * @example 
 * string s1, s2, s3;
 * 
 * s1 = set_bit("", 3); s1 = set_bit(s1, 15);  -> s1 is "( ("
 * s2 = set_bit("", 3); s2 = set_bit(s2, 4);   -> s2 is "8"
 * 
 * s3 = or_bits(s1, s2);
 * 
 * -> s3 is now "8 (", ie. a bitstring with bits 3, 4 and 15 set.
 *
 *
 */
string or_bits(string str1, string str2);

/**
 * objects
 *
 * Returns an array of objects from the global object list.
 * 
 * The first three forms will return objects starting
 * with position <pos> (or the first object, if <pos> was
 * not given).
 * 
 * The fourth and fifth form will start with the object
 * following <prev_ob> in the object list.
 * 
 * The efun will return at most <num> objects if <num> was
 * given, otherwise all remaining objects. If the number of
 * objects exceeds the maximum array size, an error is thrown.
 *
 * @since Introduced in LDMud 3.5.0.
 *
 */
object* objects();

object* objects(int pos);

object* objects(int pos, int num);

object* objects(object prev_ob);

object* objects(object prev_ob, int num);

/**
 * objectp
 *
 * Return 1 if arg is an object.
 *
 * @returns {arg is object} 1 if arg is an object, 0 otherwise.
 */
int objectp(mixed arg);

/**
 * object_time
 *
 * Returns the creation time of the given object.
 * Default is for this_object(), if no arg is given.
 *
 *
 */
int object_time();

int object_time(object ob);

/**
 * object_name
 * @param ob The object to get the name of.
 * @returns the name of an object `ob` or, if no argument is given, of
 * the current object.
 * 
 * As a special case, if <ob> is 0, the function returns 0.
 * 
 * This name is the name under which the object is stored in the
 * muds object table. It is initialised at the creation of the
 * object such that blueprints are named after the file they are
 * compiled from (without the trailing '.c'), and clones receive
 * the name of their blueprint, extended by '#' followed by
 * a unique non-negative number. These rules also apply to
 * virtual objects - the real name/type of virtual objects
 * is ignored.
 * 
 * The name of an object can be changed with rename_object(), and
 * object_name() will reflect any of these changes.
 * 
 * The returned name always begins with '/' (absolute path),
 * except when the parser runs in COMPAT mode.
 *
 * @example 
 * find_object(object_name(ob)) == ob
 * // This is guaranteed to be true for all objects ob that are not
 * // destructed.
 *
 * @since 0 is accepted as argument since 3.2.9. 
 */
string object_name();
string object_name(object ob);

/**
 * object_info
 *
 * Returns some internal information about object <ob>. The
 * Argument <what> determines which information is returned.
 * 
 * It can be either a configuration option as given to
 * configure_object() or one of the following options:
 * 
 * 
 * 
 * Object Flags:
 * 
 * <what> == OI_ONCE_INTERACTIVE:
 * 1 if <ob> was once (or still is) interactive, 0 else.
 * 
 * <what> == OI_RESET_STATE:
 * 1 if <ob> is (still) reset, 0 else.
 * 
 * <what> == OI_WILL_CLEAN_UP:
 * 1 if <ob>'s clean_up() will be called, 0 else.
 * 
 * <what> == OI_LAMBDA_REFERENCED:
 * 1 if <ob> has lambdas (and there replace_program()
 * is not allowed anymore), 0 else.
 * 
 * <what> == OI_REPLACED:
 * 1 if the program for <ob> was replaced, 0 else.
 * 
 * 
 * 
 * Program Flags:
 * 
 * <what> == OI_NO_INHERIT:
 * 1 if the program can't be inherited.
 * 
 * <what> == OI_NO_CLONE:
 * 1 if the program/blueprint can't be cloned.
 * 
 * <what> == OI_NO_SHADOW:
 * 1 if the program's functions can't be shadowed.
 * 
 * <what> == OI_SHARE_VARIABLES:
 * 1 if clones of this program share their initial
 * variable values with the blueprint.
 * 
 * 
 * 
 * Swapping Information:
 * 
 * <what> == OI_SWAPPED:
 * 1 if <ob> is swapped, 0 else.
 * 
 * <what> == OI_PROG_SWAPPED:
 * 1 if <ob>'s program is swapped, 0 else.
 * 
 * <what> == OI_VAR_SWAPPED:
 * 1 if <ob>'s variables are swapped, 0 else.
 * 
 * <what> == OI_SWAP_NUM:
 * The swap number for <ob>s program, or -1 if not swapped.
 * 
 * 
 * 
 * Time Information:
 * 
 * <what> == OI_NEXT_RESET_TIME:
 * Time of the next reset.
 * 
 * <what> == OI_NEXT_CLEANUP_TIME:
 * Time of the next data cleanup.
 * 
 * <what> == OI_LAST_REF_TIME:
 * Time of the last call to <ob>.
 * 
 * 
 * 
 * Object List:
 * 
 * <what> == OI_OBJECT_NEXT:
 * The next object in the global object list.
 * 
 * <what> == OI_OBJECT_PREV:
 * The previous object in the global object list.
 * 
 * <what> == OI_OBJECT_POS:
 * The position of <ob> in the global object list,
 * counting from 0 up. This can be expensive to compute.
 * 
 * 
 * 
 * Shadows:
 * 
 * <what> == OI_SHADOW_NEXT:
 * The next object in the shadow list, i.e. the object
 * that is shadowing <ob>, or 0 if <ob> is not shadowed.
 * 
 * <what> == OI_SHADOW_PREV:
 * The previous object in the shadow list, i.e. the object
 * that <ob> is currently shadowing, or 0 if <ob> is not a shadow.
 * 
 * <what> == OI_SHADOW_ALL:
 * Returns an array of all objects that are currently
 * shadowing <ob>, or an empty array if <ob> is not shadowed.
 * 
 * 
 * 
 * Object Statistics:
 * 
 * <what> == OI_OBJECT_REFS:
 * The number of references to <ob>.
 * 
 * <what> == OI_TICKS:
 * The accumulated evaluation cost spend in <ob> modulo 1000000000.
 * 
 * <what> == OI_GIGATICKS:
 * The accumulated evaluation cost spend in <ob> divided by 1000000000.
 * 
 * <what> == OI_DATA_SIZE:
 * The total size of the values held in the object's variables,
 * scaled down according to the extend of data sharing.
 * 
 * <what> == OI_DATA_SIZE_TOTAL:
 * The unmodified total size of the values held in the
 * object's variables
 * 
 * 
 * 
 * Program Statistics:
 * 
 * <what> == OI_PROG_REFS:
 * The number of references to <ob>'s program.
 * 
 * <what> == OI_NUM_FUNCTIONS:
 * The number of functions in the program.
 * 
 * <what> == OI_NUM_VARIABLES:
 * The number of variables in the program.
 * 
 * <what> == OI_NUM_STRINGS:
 * The number of strings in the program.
 * 
 * <what> == OI_NUM_INHERITED:
 * The number of explicitely inherited programs.
 * 
 * <what> == OI_NUM_INCLUDED:
 * The number of included files in the program.
 * 
 * <what> == OI_SIZE_FUNCTIONS:
 * The size needed for the function structures.
 * Note that this does not include size of the function code.
 * 
 * <what> == OI_SIZE_VARIABLES:
 * The size needed for the variable structures.
 * Note that this does not include size of the variable data,
 * See OI_DATA_SIZE/OI_DATA_SIZE_TOTAL for that.
 * 
 * <what> == OI_SIZE_STRINGS:
 * The size needed for the string pointers.
 * 
 * <what> == OI_SIZE_STRINGS_DATA:
 * The size needed for the string values,
 * scaled down according to the extend of data sharing.
 * 
 * <what> == OI_SIZE_STRINGS_DATA_TOTAL:
 * The unmodified size needed for the string values.
 * 
 * <what> == OI_SIZE_INHERITED:
 * The size needed for the inherit structures.
 * 
 * <what> == OI_SIZE_INCLUDED:
 * The size needed for the include structures.
 * 
 * <what> == OI_PROG_SIZE:
 * The size of the program structure.
 * 
 * <what> == OI_PROG_SIZE_TOTAL:
 * The total size of the program.
 *
 * @since Introduced in LDMud 3.2.6.
        Changes in LDMud 3.2.7:
          - new basic result OIB_REPLACED.
          - basic result OIB_IS_WIZARD is always 0 if set_is_wizard()
              is not available.
          - basic result OIB_APPROVED is gone.
        LDMud 3.2.8 added OIM_DATA_SIZE to the result of OINFO_MEMORY.
        LDMud 3.2.9 added the index mechanism, OIM_NUM_INCLUDES,
          OIM_NO_INHERIT, OIM_NO_SHADOW, OIM_NO_CLONE, OIM_SIZE_STRINGS_DATA,
          OIM_SIZE_STRINGS_TOTAL, and OIM_DATA_SIZE_TOTAL to the result
          of OINFO_MEMORY.
        LDMud 3.3.378 added the OIM_SHARE_VARIABLES to the result
          of OINFO_MEMORY.
        LDMud 3.3.654 added the OIB_NEXT_CLEANUP to the result of OINFO_BASIC.
        LDMud 3.5.0 redesigned the whole efun.
 *
 */
mixed object_info(object ob, int what);

/**
 * notify_fail
 *
 * Store str as the error message given instead of the default
 * message ``What ?''. The result is always 0.
 * 
 * If a closure is given, it is executed to return the error
 * message string, but not before all attempts to execute the
 * commandline failed (read: not at the time of the call to
 * notify_fail()). The closure receives as argument the original
 * commandgiver; usually it is identical to this_player(), unless
 * the modify_cmd hook changed that.
 * 
 * If notify_fail() is called more than once for this command, only the
 * last call will be used. However, calls to notify_fail() in nested
 * commands have no effect on this command.
 * 
 * The idea of this function is to give better error messages
 * instead of simply 'What ?'.
 * 
 * It is also better to use
 * notify_fail(message); return 0;
 * instead of
 * write(message); return 1;
 * 
 * Other objects will get the chance to evaluate the verb.
 *
 * @since Returntype changed in LDMud 3.2.6 from void to int.
        Since LDMud 3.2.7, notify-fail settings are saved over nested
        commands, and NPCs can see their notify-fail messages.
 *
 */
int notify_fail(string str);

int notify_fail(closure cl);

/**
 * next_inventory
 *
 * Get next object in the same inventory as ob. If ob is not
 * given, the current object will be used.
 * 
 * This efun is mostly used together with the efun
 * first_inventory().
 *
 *
 */
object next_inventory();

object next_inventory(object ob);

/**
 * next_bit
 *
 * Return the number of the next bit in bitstring <str> after position
 * <start>. Usually this is the next set bit, but if <find_cleared>
 * is given and not 0, the position of the next cleared bit is returned.
 * 
 * Note that finding cleared bits after the last set bit is limited to
 * the actual length of <str>.
 * 
 * Each character contains 6 bits. So you can store a value
 * between 0 and 63 in one character (2^6=64). Starting character
 * is the blank " " which has the value 0. The first character in
 * the string is the one with the lowest bits (0-5).
 *
 * @example 
 * string s;
 * int p;
 * 
 * s = set_bit("", 4); s = set_bit(s, 2);
 * 
 * for (p = -1; -1 != (p = next_bit(s, p); )
 * write(p+"\n");
 * 
 * --> will write 2 and 4
 *
 *
 */
int next_bit (string str, int start);

int next_bit (string str, int start, int find_cleared);

/**
 * new_lwobject
 *
 * Creates a new lightweight object from the program <name> and
 * returns it. The program will be loaded as a regular object,
 * called a blueprint, first, and then a lightweight object will
 * be created therefrom.
 * 
 * Note that the pathname must be complete, which means there are no
 * relative paths allowed. Any further arguments will be passed to
 * the H_CREATE_LWOBJECT hook to initialize the lightweight object.
 * 
 * If strict euids are enforced, the calling object must have a
 * non-zero euid.
 * 
 * Variable initialization is done similar to cloned objects with a call
 * to the internal lfun __INIT(). However, if #pragma share_variables is
 * in effect, the values for a lightweight object's variables are taken
 * from the current variables of the blueprint.
 * 
 * In the absence of share_variables, variables without explicit
 * initializers are initialized to 0.
 *
 * @example 
 * --- /lwo/stack.c ---
 * mixed* stack = ({});
 * 
 * int empty()
 * {
 * return sizeof(stack) == 0;
 * }
 * 
 * void push(mixed val)
 * {
 * stack += ({ val });
 * }
 * 
 * mixed pop()
 * {
 * mixed result;
 * 
 * if (empty())
 * raise_error("stack is empty.\n");
 * 
 * result = stack[<1];
 * stack = stack[..<2];
 * return result;
 * }
 * 
 * --- usage: ---
 * lwobject stack = new_lwobject("/lwo/stack");
 * 
 * stack.push("A");
 * return stack.pop();
 *
 * @since LDMud 3.6.5 introduced lightweight objects.
 *
 */
lwobject new_lwobject(varargs string name );

/**
 * net_connect
 *
 * Open a non-blocking TCP network connection to <host> and
 * <port>.  On success, the connection is bound to the current
 * object and the lfun logon() is called in the object.
 * 
 * Returns one of the following values:
 * NC_SUCCESS        Success
 * NC_EUNKNOWNHOST   the host address could not be resolved
 * NC_ENOSOCKET      error during socket creation
 * NC_ENOBIND        socket could not be bound
 * NC_ENOCONNECT     socket could not be connected
 * (Details of the last three errors can be found in the driver's error
 * log.)
 * NC_ECONNREFUSED   remote host not listening/refusing
 * NC_EMCONN         too many pending connections (transient, try
 * again later)
 * NC_ENORESSOURCES  insufficient system ressources (transient, try
 * again later)
 * 
 * If the driver is configured to support IPv6, <host> is first
 * interpreted as IPv6 hostname. If that fails, <host> is then
 * interpretd as IPv4 hostname.
 * 
 * If the connection can't be established immediately, the efun
 * returns 'success' and the driver will check in the background
 * for the progress of the connection. When it is established,
 * logon() will be called in the object. If the connection fails,
 * logon(-1) will be called in the object.
 * 
 * The efun raises a privilege violation ("net_connect", host, port).
 *
 * @since First version 1992 by Snake and LynX for Nemesis.
        Improved 1993 by Junky.
        Added to LDMud 3.2.10.
 *
 */
int net_connect(string host, int port);

/**
 * negate
 *
 * Unary minus. Returns the negative argument.
 *
 *
 */
int negate(int n);
float negate(float n);

/**
 * move_object
 *
 * The item, which can be an object_name or an object, is moved into
 * it's new environment dest, which can also be an object_name or an
 * object.
 * 
 * Since 3.2.1, the innards of move_object() are implemented in
 * the mudlib, using the M_MOVE_OBJECT0/1 driver hooks, and move_object()
 * might as well be an simul-efun.
 * 
 * The traditional implementation restricted for !compat mode
 * the <item> to the calling object only.
 *
 *
 */
void move_object(mixed item, mixed dest);

/**
 * mktime
 *
 * If the argument <ts> is an array with 9 elements (int) according to
 * the result of localtime(), this function returns the number of seconds
 * passed since the epoch (00:00:00 UTC, January 1, 1970).
 * mktime() interprets the input data according to the current timezone
 * setting of the host system.
 * This can be used to store a date or time as an integer value or to
 * compute differences betweens two different dates or times.
 * 
 * The array <ts> has to have the following structure:
 * int TM_SEC    (0):  seconds (0..59)
 * int TM_MIN    (1):  minutes (0..59)
 * int TM_HOUR   (2):  hours (0..23)
 * int TM_MDAY   (3):  day of month (1..31)
 * int TM_MON    (4):  day of year (0..11)
 * int TM_YEAR   (5):  year (e.g. 2001)
 * int TM_WDAY   (6):  day of week (0..6, sunday = 0)
 * int TM_YDAY   (7):  day of year (0..365)
 * inz TM_ISDST  (8):  Daylight Saving Time (1,0,-1)
 * 
 * TM_YDAY and TM_WDAY are ignored and can contain arbitrary
 * integer values.
 * TM_ISDST can be 1 (daylight saving time in effect), 0 (DST not in
 * effect) or -1. A value of -1 causes the mktime() function to attempt
 * to divine whether daylight saving time is in effect for the specified
 * time.
 *
 * @example 
 * A date and time (user input) shall be stored as unix timestamp:
 * // "Wed Oct 24 10:48:00 2007" corresponds to the returned time stamp:
 * int unixtime = mktime( ({0, 48, 09, 24, 09, 2007, 0, 01, 0}) );
 *
 * @since Introduced in LDMud 3.3.718.
 *
 */
int mktime(int *ts);

/**
 * mkmapping
 *
 * The first form returns a mapping with indices from 'arr1' and
 * values from 'arr2'... . arr1[0] will index arr2...[0], arr1[1]
 * will index arr2...[1], etc. If the arrays are of unequal size,
 * the mapping will only contain as much elements as are in the
 * smallest array.
 * 
 * The second form converts the given struct <st> into a mapping
 * using the struct member names as index values.
 *
 * @example 
 * mkmapping( ({ 1, 2 }), ({ 10, 11 }), ({ 20, 21, 22}))
 * returns ([ 1:10;20, 2:11;21 ])
 * 
 * struct s { int a; int *b; int c; };
 * mkmapping( (<s> a: 1, b: ({ 2, 3 }), c: 3 )
 * returns ([ "a":1, "b":({2,3}), "c":3 ])
 *
 * @since LDMud 3.3.433 added the conversion from structs.
 *
 */
mapping mkmapping(mixed *arr1, varargs mixed *arr2 );

mapping mkmapping(struct st s);

/**
 * mkdir
 *
 * Make a directory named path. Return 1 for success and 0 for
 * failure.
 *
 *
 */
int mkdir(string path);

/**
 * min
 *
 * Determine the minimum value of the <arg>uments and return it.
 * If min() is called with an array (which must not be empty) as only
 * argument, it returns the minimum value of the array contents.
 *
 * @example 
 * min(1)                     // returns 1
 * min(1, -1.1)               // returns -1.1
 * min("foo", "bar")          // returns "bar"
 * min( ({ "foo", "bar" }) )  // returns "bar"
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int    min(varargs int arg );
float  min(varargs float arg );
int    min(int *arg_array);
float  min(float *arg_array);
string min(varargs string arg );
bytes  min(varargs bytes arg );
string min(string|bytes *arg_array);
bytes  min(bytes *arg_array);

/**
 * member
 *
 * For arrays, strings and byte sequences, returns the index of the
 * first occurance of second arg in the first arg, or -1 if none found.
 * If <start> is given and non-negative, the search starts at
 * that position. A start position beyond the end of the string
 * or array will cause the efun to return -1.
 * 
 * For mappings it checks, if key is present in mapping m and
 * returns 1 if so, 0 if key is not in m.
 *
 * @since LDMud 3.3.556 added the <start> parameter.
 *
 */
varargs int member(mixed *array, mixed elem , int start);
varargs int member(string s, int elem , int start);
varargs int member(bytes s, int elem , int start);
int member(mapping m, mixed key);

/**
 * md5_crypt
 *
 * Crypt the string <str> the first two characters
 * from the string <seed> as a seed. If <seed> is an integer, then
 * a random seed is used.
 * 
 * The result has the first two characters as the seed.
 * 
 * The efun uses the MD5 algorithm for encryption, and the result
 * is compatible with the Apache password encryption.
 * 
 * If you want to let enter password information without echo,
 * input_to() can be used with special argument.
 *
 * @since Introduced in LDMud 3.3
 *
 */
string md5_crypt(string str, int seed);

string md5_crypt(string str, string seed);

string md5_crypt(bytes str, int seed);

string md5_crypt(bytes str, string seed);

/**
 * md5
 *
 * Create and return a MD5 message digest from <arg>.
 * <arg> may be a string, a byte sequence, or an array of numbers
 * (each considered to be a byte, ignoring all but the lowest 8 bits).
 * A string is converted to a UTF-8 byte sequence of which then the
 * digest will be created.
 * 
 * If <iterations> is given as a number greater than 0, it is
 * the number of iterations used in the digest calculation. If omitted,
 * the driver executes just one iteration.
 * 
 * The efun costs 5 ticks per iteration.
 *
 * @example 
 * string s;
 * 
 * s = md5("Hello");
 * s = md5( ({ 'H', 'e', 'l', 'l', 'o' }) )
 * s = md5( ({ 'H', 'e', 'l', 'l', 'o' }), 2 )
 *
 * @since Introduced in LDMud 3.2.9.
        LDMud 3.2.12 added number arrays as argument, and the number of
        interations.
        LDMud 3.3.717 added the iteration-based evaluation cost.
        Since LDMud 3.3.719 obsoleted by hash().
 *
 */
string md5(string arg , int iterations);
string md5(bytes arg , int iterations);
string md5(int *  arg , int iterations);

/**
 * max
 *
 * Determaxe the maximum value of the <arg>uments and return it.
 * If max() is called with an array (which must not be empty) as only
 * argument, it returns the maximum value of the array contents.
 *
 * @example 
 * max(1)                     - returns 1
 * max(1, 1.1)                - returns 1.1
 * max("foo", "bar")          - returns "foo"
 * max( ({ "foo", "bar" }) )  - returns "foo"
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
string|bytes max(varargs string|bytes arg );
string|bytes max(string|bytes *arg_array);
int|float    max(varargs int|float arg );
int|float    max(int|float *arg_array);

/**
 * match_command
 *
 * Take the command <command>, parse it, and return an array of all
 * matching actions added to <origin> (read: <origin> is the object
 * 'issuing' the command).
 * 
 * Each entry in the result array is itself an array of:
 * 
 * string [CMDM_VERB]:   The matched verb.
 * string [CMDM_ARG]:    The argument string remaining, or 0 if none.
 * object [CMDM_OBJECT]: The object defining the action.
 * string [CMDM_FUN]:    The name of the function to call in
 * CMDM_OBJECT, which may be static.
 * 
 * The efun is useful for both debugging, and for implementing your
 * own H_COMMAND handling.
 *
 * @since Introduced in LDMud 3.3.259.
 *
 */
mixed * match_command(string command, object origin);

/**
 * master
 *
 * Returns the master object.
 * 
 * If <dont_load> is false, the function first makes sure that
 * the master object exists.
 * If <dont_load> is true, the function just returns the current
 * master object, or 0 if the current master has been destructed.
 *
 * @since Introduced in LDMud 3.2.10.
 *
 */
object master();

object master(int dont_load);

/**
 * mappingp
 *
 * Returns 1 if the argument is a mapping, or 0 if it is not.
 *
 * @returns {arg is mapping} 1 if arg is a mapping, 0 otherwise.
 */
int mappingp(mixed arg);

/**
 * map_objects
 *
 * Similar to map(), but calls arr[n]->fun(extra,...). The returned value
 * replaces the object/string in returned array.
 * <arr> may contain a mixture of regular and lightweight objects and
 * object names as well.
 * 
 * Any number of extra arguments is allowed, which are all
 * passed. 0-entries in arr are ignored.
 *
 *
 */
mixed * map_objects(object   *arr, string fun, varargs mixed extra );

mixed * map_objects(lwobject *arr, string fun, varargs mixed extra );

mixed * map_objects(string   *arr, string fun, varargs mixed extra );

/**
 * map_indices
 *
 * ob->func() is called resp. cl applied to every element in the mapping,
 * with the key of the element as first argument, and then the extra args
 * that were given to map_indices (these args must not be protected
 * references like &(i[0])).  The data item in the mapping is replaced by
 * the return value of the function. ob can also be a file_name of an
 * object.
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 * 
 * Note that if mapping m has more than one value per key, these
 * are ignored: the resulting mapping always has one value per key.
 * 
 * Also note that the behaviour of this function is different from
 * map(<array>).
 *
 * @example 
 * m = mkmapping(users());
 * m = map_indices(m, #'environment);
 *
 * @since In LDMud 3.2.6 renamed from map_mapping() and complemented by map().
 *
 */
mapping map_indices(mapping m, string func, varargs string|object ob );

mapping map_indices(mapping m, varargs closure cl );

/**
 * map
 *
 * Call the function <ob>-><func>() resp. the closure <cl> for every
 * element of the string, array, struct or mapping <arg>, and return a
 * result made up from the returned values.
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 * 
 * If <arg> is an string, array or struct, the function will be called
 * with each of the array/struct elements as first parameter, followed
 * by the <extra> arguments. The result of the efun is an array/struct
 * with all the results returned from the function calls. Thus the
 * operation could be described as:
 * 
 * foreach(index) result[index] = ob->func(arg[index], extra...)
 * 
 * If <arg> is an string/array/struct, and a mapping is specified
 * instead of a function, the result is an array/struct with the
 * values found in the mapping for the original values, resp. with the
 * original values for which no mapping entry exists. If a column index
 * <idx> is given, that column of the mapping is used. In other words:
 * 
 * foreach(index)
 * if (arg[index] exists as key in map)
 * result[index] = map[arg[index]] or map[arg[index], idx]
 * else
 * result[index] = arg[index]
 * 
 * If <arg> is a string, the only allowed replacement values are
 * numbers, of which only the lower 8 bit will be considered.
 * 
 * 
 * If <arg> is a mapping, the function will be called with
 * each of the mapping keys as first, and (if existing) the
 * associated values as second parameter, followed by the <extra>
 * arguments (these must not be protected references like &(i[0]). The
 * result of the efun is a mapping of all results of the function calls,
 * stored under their corresponding key.
 * 
 * Depending on the width of the mapping <arg>, the operation can
 * be described as:
 * 
 * foreach (key in arg)
 * switch (widthof(arg))
 * case 0:
 * result[key] = ob->func(key, 0, extra...)
 * case 1:
 * result[key] = ob->func(key, arg[key], extra...)
 * else  :
 * result[key] = ob->func( key
 * , ({ arg[key,0] ...arg[key,width-1] })
 * , extra...)
 * 
 * The advantage of this approach is that the two types of
 * multi-dimensional mappings (mappings with multiple values
 * per key, and mappings of arrays) can be treated in the same way.
 * 
 * Note however that the resulting mapping always has one value
 * per key.
 * 
 * Historical Note: map() used with arrays behaves like map_array(),
 * but used with mappings generalises map_indices()!
 *
 * @example 
 * arr = ({ 1, 2, 3, 4 });
 * m = ([ 1:-1, 3:-3 ]);
 * 
 * map(arr, #'%, 2)  --> returns ({ 1, 0, 1, 0 })
 * map(arr, m)       --> returns ({ -1, 2, -3, 4 })
 *
 * @since Introduced in LDMud 3.2.6, obsoletes map_array().
        LDMud 3.2.8 added the feature of mapping an array through a mapping.
        LDMud 3.3.439 added mapping of strings.
        LDMud 3.3.719 added the <idx> parameter for mapping through mappings.
 *
 */
mixed * map(mixed *arg, string func, string|object ob, varargs mixed extra);
mixed * map(mixed *arg, closure cl, varargs mixed extra);
varargs mixed * map(mixed *arg, mapping m, int idx);
mixed * map(struct arg s, string func, string|object ob, varargs mixed extra);
mixed * map(struct arg s, closure cl, varargs mixed extra);
varargs mixed * map(struct arg s, mapping m , int idx);
mapping map(mapping arg, string func, string|object ob, varargs mixed extra);
mapping map(mapping arg, closure cl, varargs mixed extra);
string map(string arg, string func, string|object ob, varargs mixed extra);
string map(string arg, closure cl, varargs mixed extra);
varargs string map(string arg, mapping m , int idx);

/**
 * make_shared_string
 *
 * Puts <str> in the table of shared strings of the game.
 * 
 * If the string is used by several variables/objects this
 * saves memory. Keys of alists and mappings are always shared
 * strings.
 * 
 * In LDMud 3.3, this function is no longer necessary: strings
 * are shared as much as possible anyway, and the driver automatically
 * converts untabled strings into tabled strings after some time.
 *
 * @since Introduced in LDMud 3.2.6; following a suggestion from Tubmud.
        Deprecated in LDMud 3.3.531.
 *
 */
string make_shared_string(string str);
bytes make_shared_string(bytes str);

/**
 * m_values
 *
 * Returns an array with the values of mapping 'map'.
 * If <index> is given as a number between 0 and the width of
 * the mapping, the values from the given column are returned,
 * else the values of the first column.
 *
 * @example 
 * mapping m = ([ "foo":1;2;3, "bar":4;5;6, "baz":7;8;9 ])
 * m_values(m)     --> returns ({ 1, 4, 7 }) or some permutation thereof
 * m_values(m, 0)  --> returns ({ 1, 4, 7 }) (ditto)
 * m_values(m, 1)  --> returns ({ 2, 8, 9 }) (ditto)
 * 
 * Note that exact order of the values in the resulting arrays is not
 * specified, and may vary after any change to the mapping. The only
 * guarantee given is that if m_indices() and m_values() are taken at the
 * same time, the order of both results is identical.
 *
 *
 */
mixed * m_values(mapping map);

mixed * m_values(mapping map, int index);

/**
 * m_reallocate
 *
 * Create a new mapping with <width> values per key and fill it
 * with the values from mapping <m>. If <m> has less than <width>
 * values per key, the extra values in the result are set to 0.
 * If <m> has more values per key, the extra values are ignored.
 * 
 * The mapping <m> is not changed.
 *
 * @example 
 * mapping m = ([ "foo":1;2;3, "bar":4;5;6 ])
 * 
 * m_reallocate(m, 1) --> returns ([ "foo":1,       "bar:4 ])
 * m_reallocate(m, 4) --> returns ([ "foo":1;2;3;0, "bar:4;5;6;0 ])
 *
 * @since Introduced in LDMud 3.2.6, suggested by Tubmud.
 *
 */
mapping m_reallocate(mapping m, int width);

/**
 * m_indices
 *
 * Returns an array containing the indices of mapping 'map'.
 *
 *
 */
mixed * m_indices(mapping map);

/**
 * m_entry
 *
 * Query the mapping <map> for the entry for <key> and return all
 * its values in one array.
 * 
 * If <map> does not contain <key>, 0 is returned.
 * 
 * Note: the efun m_add() can be used to add all values for an entry
 * at once.
 *
 * @example 
 * mapping m = ([ 1:"foo";-1, 2:"bar";-2 ]);
 * 
 * m_entry(m, 0) -> 0
 * m_entry(m, 1) -> ({ "foo", -1 })
 *
 * @since Introduced in LDMud 3.2.10.
 *
 */
mixed * m_entry(mapping map, mixed key);

/**
 * m_delete
 *
 * Remove the entry with index 'key' from mapping 'map'. The
 * changed mapping 'map' is also returned as result.
 * If the mapping does not have an entry with index 'key',
 * nothing is changed.
 *
 *
 */
mapping m_delete(mapping map, mixed key);

/**
 * m_contains
 *
 * If the mapping contains the key map, the corresponding values
 * are assigned to the data arguments, which must be passed by
 * reference, and 1 is returned. If key is not in map, 0 is
 * returned and the data args are left unchanged.
 * It is possible to use this function for a 0-value mapping, in
 * which case it has the same effect as member(E).
 *
 * @since Renamed from 'mapping_contains()' in LDMud 3.2.6.
 *
 */
int m_contains(varargs mixed &data1, map, key);

/**
 * m_allocate
 *
 * Reserve memory for a mapping.
 * 
 * <size> is the number of entries (i.e. keys) to reserve, <width> is
 * the number of data items per entry. If the optional width is
 * omitted, 1 is used as default.
 * 
 * This is useful only when you are going to construct a mapping
 * whose approximate size you know beforehand, to save overhead on
 * repeated memory allocations. If you don't fill in data for all the
 * allocated elements, any leftovers will be eventually freed some time
 * later (see remark below).
 * It is also useful if you want the mapping to have a certain width
 * even if you don't provide all the data items for the keys yet.
 * 
 * If the goal is just to create an empty mapping with a certain
 * width, the following notations can be used:
 * 
 * ([ ]) : creates an empty mapping of width 1.
 * 
 * ([:width ]) : creates an empty mapping the given <width>, where
 * <width> can be any expression yielding an integer result. In
 * fact this notation is compiled as 'm_allocate(0, width)' .
 *
 * @example 
 * m_allocate(3, 7) -> mapping with 7 values per key, and with space
 * for 3 entries.
 * 
 * ([:2*3 ]) -> same as m_allocate(0, 6)
 *
 * @since Renamed from 'allocate_mapping' in LDMud 3.2.6.
        The ([:width ]) notation was introduced in LDMud 3.2.9 / 3.3.208.
 *
 */
mapping m_allocate(int size);

mapping m_allocate(int size, int width);

/**
 * m_add
 *
 * Add (or replace) an entry with index <key> in mapping <map>.
 * The modified mapping is also returned as result.
 * 
 * The values for the entry are taken from the <data> arguments.
 * Unassigned entry values default to 0, extraneous <data> arguments
 * are ignored.
 * 
 * The difference between m_add() and the operator += is that for
 * the latter you might need to create a temporary mapping that
 * contains the entries to add, which m_add() doesn't.
 *
 * @example 
 * mapping m;
 * 
 * m = ([ "foo" ]);
 * m_add(m, "bar", 1) --> ([ "foo", "bar" ])
 * 
 * m = ([ "foo":1 ]);
 * m_add(m, "bar", 1) --> ([ "foo":1, "bar":1 ])
 * 
 * m = ([ "foo":1;2 ]);
 * m_add(m, "bar", 1) --> ([ "foo":1;2, "bar":1;0 ])
 * m_add(m, "baz", ({ 4, 5 })... )
 * --> ([ "foo":1;2, "bar":1;0, "baz":4;5 ])
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
varargs mapping m_add(mapping map, mixed key, varargs mixed data);

/**
 * lwobjectp
 *
 * Return 1 if arg is a lightweight object.
 *
 *
 */
int lwobjectp(mixed arg);

/**
 * lwobject_info
 *
 * Returns some internal information about the lightweight
 * object <lwob>. The  Argument <what> determines which
 * information is returned.
 * 
 * It can be either a configuration option as given to
 * configure_object() or one of the following options:
 * 
 * 
 * 
 * Lightweight Object Information:
 * 
 * <what> == LI_LWOBJECT_REFS:
 * The number of references to <lwob>.
 * 
 * <what> == LI_DATA_SIZE:
 * The total size of the values held in the object's variables,
 * scaled down according to the extend of data sharing.
 * 
 * <what> == LI_DATA_SIZE_TOTAL:
 * The unmodified total size of the values held in the
 * object's variables
 * 
 * 
 * 
 * Program Flags:
 * 
 * <what> == LI_NO_INHERIT:
 * 1 if the program can't be inherited.
 * 
 * <what> == LI_NO_CLONE:
 * 1 if the program/blueprint can't be cloned.
 * 
 * <what> == LI_SHARE_VARIABLES:
 * 1 if lightweight objects of this program share their
 * initial variable values with the blueprint.
 * 
 * 
 * 
 * Program Statistics:
 * 
 * <what> == LI_PROG_REFS:
 * The number of references to <lwob>'s program.
 * 
 * <what> == LI_NUM_FUNCTIONS:
 * The number of functions in the program.
 * 
 * <what> == LI_NUM_VARIABLES:
 * The number of variables in the program.
 * 
 * <what> == LI_NUM_STRINGS:
 * The number of strings in the program.
 * 
 * <what> == LI_NUM_INHERITED:
 * The number of explicitely inherited programs.
 * 
 * <what> == LI_NUM_INCLUDED:
 * The number of included files in the program.
 * 
 * <what> == LI_SIZE_FUNCTIONS:
 * The size needed for the function structures.
 * Note that this does not include size of the function code.
 * 
 * <what> == LI_SIZE_VARIABLES:
 * The size needed for the variable structures.
 * Note that this does not include size of the variable data,
 * See LI_DATA_SIZE/LI_DATA_SIZE_TOTAL for that.
 * 
 * <what> == LI_SIZE_STRINGS:
 * The size needed for the string pointers.
 * 
 * <what> == LI_SIZE_STRINGS_DATA:
 * The size needed for the string values,
 * scaled down according to the extend of data sharing.
 * 
 * <what> == LI_SIZE_STRINGS_DATA_TOTAL:
 * The unmodified size needed for the string values.
 * 
 * <what> == LI_SIZE_INHERITED:
 * The size needed for the inherit structures.
 * 
 * <what> == LI_SIZE_INCLUDED:
 * The size needed for the include structures.
 * 
 * <what> == LI_PROG_SIZE:
 * The size of the program structure.
 * 
 * <what> == LI_PROG_SIZE_TOTAL:
 * The total size of the program.
 *
 * @since Introduced in LDMud 3.6.5.
 *
 */
mixed lwobject_info(lwobject lwob, int what);

/**
 * lower_case
 *
 * Convert all characters in str to lower case, and return the
 * new string.
 *
 * @example 
 * lower_case("Heya!") -> "heya!"
 *
 *
 */
string lower_case(string str);

/**
 * log
 *
 * Returns the natural logarithm of its argument.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float log(int|float arg);

/**
 * localtime
 *
 * Interpret the argument clock as number of seconds since Jan,
 * 1st, 1970, 0:00, and return the time in local time in a nice structure.
 * if <clock> is not specified, time() is used as default.
 * 
 * Alternatively, accept an array of two ints: the first is <clock>
 * value as in the first form, the second int is the number of
 * microseconds elapsed in the current second, which is ignored.
 * 
 * The result is an array of integers:
 * 
 * int TM_SEC   (0) : Seconds (0..59)
 * int TM_MIN   (1) : Minutes (0..59)
 * int TM_HOUR  (2) : Hours (0..23)
 * int TM_MDAY  (3) : Day of the month (1..31)
 * int TM_MON   (4) : Month of the year (0..11)
 * int TM_YEAR  (5) : Year (e.g.  2001)
 * int TM_WDAY  (6) : Day of the week (Sunday = 0)
 * int TM_YDAY  (7) : Day of the year (0..365)
 * int TM_ISDST (8) : TRUE: Daylight saving time
 *
 * @example 
 * printf("Today is %s\n",
 * ({ "Sunday", "Monday", "Tuesday", "Wednesday",
 * "Thursday", "Friday", "Saturday" })[localtime()[TM_WDAY]]);
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int * localtime(int clock);

int * localtime(int *uclock);

/**
 * load_object
 *
 * Load the object from the file <name> (which can not be empty) and
 * return it. If the object already exists, just return it.
 * 
 * This efun can be used only to load blueprints - for clones, use
 * the efun clone_object().
 * 
 * If strict euids are enforced, the cloning object must have
 * a non-zero euid.
 *
 * @example 
 * // Update and reload the standard player object
 * destruct(find_object("/std/player"));
 * load_object("/std/player");
 *
 * @since Introduced in LDMud 3.2.6.
        LDMud 3.3.716/3.4.3 requires that the <name> is not empty.
 *
 */
object load_object(string name);

/**
 * load_name
 *
 * Return the load name for the object <obj> which may be a regular
 * or lightweight object or the name of an object.
 * 
 * If <obj> is a clone or a lightweight object, return the
 * load_name() of <obj>'s blueprint.
 * If <obj> is a blueprint, return the filename from which the
 * blueprint was compiled.
 * 
 * If <obj> is given by name but not/no longer existing, the
 * function synthesizes the load name as it should be and returns
 * that. If the given name is illegal, the function returns 0.
 * 
 * As a special case, if <ob> is 0, the function returns 0.
 * 
 * For virtual objects this efun returns the original load_name of the
 * object created by the virtual compiler.
 * 
 * If <obj> is omitted, the name for the current object is returned.
 * 
 * In contrast to the object_name(), the load name can not be changed
 * by with rename_object() or a VC. However, if an object uses
 * replace_program() the load name no longer reflects the actual
 * behaviour of an object.
 * 
 * The returned name starts with a '/', unless the driver is running
 * in COMPAT mode.
 *
 * @example 
 * object o;
 * o = clone_object("/std/thing");
 * write(load_name(o));  --> writes "/std/thing" in !compat mode
 * and "std/thing"  in compat mode
 * write(load_name("/std/thing"));  --> same as above
 * write(load_name("/std/thing#4n5")); --> writes 0
 *
 * @since Introduced in LDMud 3.2.6.
        Strings are accepted as arguments since 3.2.8.
        0 is accepted as argument since 3.2.9.
 *
 */
string load_name();

string load_name(object obj);

string load_name(lwobject obj);

string load_name(string obj);

/**
 * living
 *
 * Return true if ob is a living object (that is,
 * enable_commands() has been called from inside the ob).
 * ob may be 0.
 * @param ob the object to check
 * @returns {ob is __LPC_CONFIG_LIBFILES_PLAYER} 1 if ob is a living object, 0 otherwise
 * @example 
 * living(this_player())
 *
 *
 */
int living(object ob);

/**
 * limited
 *
 * Call the function <fun> with any given <args> as parameters,
 * and execute it with the given runtime limits.
 * 
 * After the function exits, the currently active limits are restored.
 * Result of the efun is the result of the closure call.
 * 
 * The runtime limits can be given in two ways: as an array (like the
 * one returned from query_limits(), or as a list of tagged values.  If
 * the efun is used without any limit specification, all limits are
 * supposed to be 'unlimited'.
 * 
 * The limit settings recognize three special values:
 * LIMIT_UNLIMITED: the limit is deactivated
 * LIMIT_KEEP:      the former setting is kept
 * LIMIT_DEFAULT:   the 'global' default setting is used.
 * 
 * For LIMIT_COST, the special values have these meaning:
 * LIMIT_UNLIMITED: at maximum 1 tick is accounted
 * LIMIT_KEEP:      LIMIT_COST is set to 0
 * LIMIT_DEFAULT:   LIMIT_COST is set to -100
 * 
 * The efun causes a privilege violation ("limited", current_object,
 * fun, limits-array).
 *
 * @example 
 * limited(#'function)
 * --> executes function with no limits at all
 * 
 * limited(#'function, ({ 200000 }), "foo")
 * --> executes function with an eval_cost limit of 200000, and
 * calls function as <function>("foo").
 * 
 * limited(lambda(0, ({#'function, "foo"})), LIMIT_EVAL, 200000)
 * --> executes function with an eval_cost limit of 200000, and
 * calls function as <function>("foo").
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.3.563 introduced LIMIT_COST.
        LDMud 3.3.677 introduced LIMIT_MAPPING_KEYS, LIMIT_MAPPING_SIZE.
        LDMud 3.5.0 introduced LIMIT_MEMORY.
 *
 */
mixed limited(closure fun);

mixed limited(closure fun, int tag, varargs int value );

mixed limited(closure fun, int *limits);

mixed limited(closure fun, int *limits, mixed *args);

/**
 * last_instructions
 *
 * Returns an array showing the 'length' last executed
 * instructions in disassembled form. If 'verbose' is non-zero
 * (the default), line number information are also included.
 * Each string is built as this:
 * 
 * Opcode-Address: Opcode Operand Mnemonic (Stackdepth) Linenumber
 * 
 * The Stackdepth information consists of two numbers <rel>:<abs>:
 * <rel> is the relative stack usage in this function, <abs> is the
 * absolute stack usage.
 * 
 * The linenumber information is appended if requested and a new
 * source line is reached. Also, calls between objects produce a
 * 
 * Objectname Programname Linenumber
 * 
 * entry in the resulting array (in verbose mode only).
 * 
 * There is a preconfigured upper limit for the backtrace.
 *
 * @since Introduced in 3.2.1@34.
        The absolute stack depth information was added in LDMud 3.2.8.
 *
 */
string * last_instructions(int length, int verbose);

/**
 * last_bit
 *
 * Return the number of the last set bit in bitstring <str>.
 * 
 * Each character contains 6 bits. So you can store a value
 * between 0 and 63 in one character (2^6=64). Starting character
 * is the blank " " which has the value 0. The first character in
 * the string is the one with the lowest bits (0-5).
 *
 * @example 
 * string s;
 * 
 * s = set_bit("", 4); s = set_bit(s, 2);
 * 
 * last_bit(s) --> returns 4
 *
 *
 */
int last_bit(string str);

/**
 * lambda
 *
 * Constructs a lambda closure, like lambda function in LISP.
 * The closure is bound to the creating object, and thus can contain
 * references to global variables.
 * 
 * The first argument is an array describing the arguments
 * (symbols) passed to the closure upon evaluation by funcall()
 * or apply().
 *
 * @since Introduced in 3.2@70.
 *
 */
closure lambda(mixed *arr, mixed m);

/**
 * json_serialize
 *
 * This efun creates a JSON object from the given LPC variable and
 * returns the object encoded as a LPC string. For container types like
 * arrays, mappings and structs, this will be done recursively.
 * 
 * Only the following LPC types are serialized. All other LPC types cause
 * a  runtime error.
 * <int>        -> JSON int
 * <float>      -> JSON double
 * <string>     -> JSON string
 * <mapping>    -> JSON objects
 * <array>      -> JSON arrays
 * <struct>     -> JSON objects
 * 
 * The function is available only if the driver is compiled with Iksemel
 * support. In that case, __JSON__ is defined.
 *
 * @example 
 * json_serialize(42)              -> "42"
 * json_serialize(42.0)            -> "42.0"
 * json_serialize("hello world\n") -> "\"hello world\\n\""
 * json_serialize(({1,2,3,4,5,6})) -> "[ 1, 2, 3, 4, 5, 6 ]"
 * json_serialize(([ "test 1": 42, "test 2": 42.0 ]))
 * -> "{ \"test 2\": 42.000000, \"test 1\": 42 }"
 *
 * @since Added in LDMud 3.5.0
 *
 */
string json_serialize(mixed data);

/**
 * json_parse
 *
 * This efun parses the JSON object encoded as string in <jsonstr> into a
 * suitable LPC type.
 * 
 * Handles the following JSON types:
 * <null>        -> int (0)
 * <boolean>     -> int (0 or 1)
 * <int | int64> -> int
 * <double>      -> float
 * <string>      -> string
 * <object>      -> mapping
 * <array>       -> arrays
 * All other JSON types cause a runtime error.
 * 
 * The JSON object can nest other JSON objects.
 * 
 * The function is available only if the driver is compiled with Iksemel
 * support. In that case, __JSON__ is defined.
 *
 * @example 
 * json_parse("42")              -> 42
 * json_parse("42.0")            -> 42.0
 * json_parse("\"hello world\\n\"")   -> "hello world\n"
 * json_parse("[ 1, 2, 3, 4, 5, 6 ]") -> ({1,2,3,4,5,6})
 * json_parse("{ \"test 2\": 42.000000, \"test 1\": 42 }")
 * -> ([ "test 1": 42, "test 2": 42.0 ])
 *
 * @since Added in LDMud 3.5.0
 *
 */
mixed json_parse(string jsonstring);

/**
 * invert_bits
 *
 * Invert the status of all bits in bitstring <str> and return the
 * new string.
 * 
 * Note that the total number of bits (ie the string length) stays
 * the same.
 *
 * @example 
 * string s;
 * 
 * s = set_bit("", 3); s = set_bit(s, 4); s = set_bit(s, 15);
 * --> s is now  "8 ("
 * 
 * invert_bits(s) --> returns "G_W"
 *
 *
 */
string invert_bits(string str);

/**
 * intp
 *
 * Return 1 if arg is an integer number.
 *
 * @returns {arg is int} 1 if arg is an integer number, 0 otherwise
 */
int intp(mixed arg);

/**
 * interactive_info
 *
 * Returns some internal information about the interactive user <ob>.
 * The argument <what> determines which information is returned.
 * 
 * It can be either a configuration option as given to
 * configure_interactive() or one of the following options:
 * 
 * 
 * 
 * Connection Information:
 * 
 * <what> == II_IP_NAME:
 * The hostname of <ob>. The hostname will asynchronously
 * looked up by the ERQ daemon and might therefore not be
 * available at the time of the first connection.
 * If no name is available the address will be returned.
 * 
 * <what> == II_IP_NUMBER:
 * The IP address of <ob> given as a string.
 * 
 * <what> == II_IP_PORT:
 * The client port number of <ob>.
 * 
 * <what> == II_IP_ADDRESS:
 * The full socket address structure given as an array of bytes.
 * 
 * For IPv4 (sockaddr_in):
 * array[0.. 1]: sin_family
 * array[2.. 3]: sin_port
 * array[4.. 7]: sin_addr
 * array[8..15]: undefined.
 * 
 * For IPv6 (sockaddr_in6):
 * array[ 0.. 1]: sin6_family
 * array[ 2.. 3]: sin6_port
 * array[ 4.. 7]: sin6_flowinfo
 * array[ 8..23]: sin6_addr
 * array[24..27]: sin6_scope_id
 * 
 * <what> == II_MUD_PORT:
 * The server port number that <ob> connected to.
 * 
 * 
 * 
 * Telnet Related Information:
 * 
 * <what> == II_MCCP_STATS:
 * Statistics about the current compression of <ob> given
 * as an array ({ uncompressed bytes, compressed bytes }).
 * 
 * If the connection is not compressed, 0 is returned.
 * 
 * Available only if the driver is compiled with MCCP enabled;
 * __MCCP__ is defined in that case.
 * 
 * 
 * 
 * Input Handling:
 * 
 * <what> == II_INPUT_PENDING:
 * If <ob> has an input_to() pending, the object that has called
 * the input_to() is returned, else 0.
 * 
 * <what> == II_EDITING:
 * If <ob> is currently editing with ed() and ed() was called with
 * an exit function, then the object that has called ed()
 * will be returned, 0 otherwise.
 * 
 * <what> == II_IDLE:
 * The number of seconds that the interactive object <ob> has been
 * idle.
 * 
 * <what> == II_NOECHO:
 * The current no-echo mode of <ob>:
 * 0: Normal echo mode
 * 1: no-echo mode was requested (INPUT_NOECHO input is pending)
 * 2: no-echo mode was acknowledged by the client (this does not
 * happen, if the mudlib handles this with the H_NOECHO hook).
 * 
 * <what> == II_CHARMODE:
 * Whether charmode is active for <ob>.
 * The values are similar to II_NOECHO.
 * 
 * 
 * 
 * Output Handling:
 * 
 * <what> == II_SNOOP_NEXT:
 * Returns the user who is currently snooping <ob>.
 * The calling object must be privileged by the master object
 * via valid_query_snoop().
 * 
 * <what> == II_SNOOP_PREV:
 * Returns the victim who is currently snooped by <ob>.
 * The calling object must be privileged by the master object
 * via valid_query_snoop().
 * 
 * <what> == II_SNOOP_ALL:
 * Returns all objects who are currently snooping <ob>.
 * Only one object can snoop <ob> directly, but that user might
 * be snooped, too, and so building a chain that is returned
 * as an array.
 * 
 * The calling object must be privileged by the master object
 * via valid_query_snoop().
 *
 * @since Introduced in LDMud 3.5.0.
 *
 */
mixed interactive_info(object ob, int what);

/**
 * interactive
 *
 * Return non-zero if ob is an interactive user. If ob is omitted,
 * this_object() will be used. The return value is 1 if the
 * object is interactive, else 0.
 *
 *
 */
int interactive();
int interactive(object ob);

/**
 * input_to_info
 *
 * Construct an array of all input_to's pending for this interactive
 * <player>.  The first entry in the array is the least recently added
 * input_to, the last element the most recently added one.
 * 
 * Every item in the array is itself an array of 2 or more entries:
 * 0:   The object (only if the function is a string).
 * 1:   The function (string or closure).
 * 2..: The argument(s).
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
mixed * input_to_info(object player);

/**
 * input_to
 *
 * Enable next line of user input to be sent to the function <fun>
 * as an argument. Exception: if the next input
 * line starts with a "!", it will be parsed as a command resp.
 * passed to the most recent input_to() given with the
 * INPUT_IGNORE_BANG flag.
 * The function <fun> may be static, but must not be private (or
 * it won't be found).
 * 
 * Note that fun is not called immediately but after pressing the
 * RETURN key.
 * 
 * Usually, if input_to() is called more than once in the same execution,
 * only the first call has any effect. This behaviour can be
 * modified by specifying the INPUT_APPEND flag which will append
 * the given input_to to the already existing input_tos (see
 * EXAMPLES).
 * 
 * Also, if a command given during an input_to() (using the "!"
 * escape) issues its own input_to(), the previous input_to() is
 * suspended until the new input_to() has been handled, then the
 * previous one becomes active again.
 * 
 * The optional argument <flag> may be a binary-OR ('|') of the
 * following option values:
 * 
 * INPUT_NOECHO  (1):
 * The line given by the player will not be echoed, and is
 * not seen if snooped.
 * 
 * A change of this mode not possible with telnet disabled.
 * 
 * INPUT_CHARMODE  (2):
 * The connection is switched from line- into charmode to
 * retrieve a single character(!) from the player.
 * 
 * Is telnet disabled, then only the handling of the
 * incoming data by the driver is changed - the client
 * program of the player will remain in its current mode.
 * 
 * After execution of <fun>, the connection is switched
 * back into linemode unless a subsequent input_to( , 2)
 * has been issued.
 * 
 * Lineends are received exactly as the client sent them:
 * "\n", "\r" followed by "\n", or just "\r".
 * 
 * Note that the players frontend is free to stay in
 * linemode all the time: even if you request a single
 * character, the player might be forced to type (and send)
 * that character plus the return key. Usually your function
 * will then receive the complete input line (including the
 * newline character sequence!) in one call.
 * 
 * If you plan to stay in charmode a longer time , you can
 * reduce the call overhead by using set_combine_charset()
 * to retrieve sequences of certain characters as one string
 * instead of one-by-one. In a screen-oriented editor for
 * example this would be most of the printable characters.
 * 
 * INPUT_PROMPT (4):
 * The argument following the <flag> argument is used as
 * prompt for the input. If this flag is not given, and thus
 * no prompt specified, nothing will be printed.
 * 
 * INPUT_NO_TELNET (8):
 * Modifies the INPUT_CHARMODE flag: the driver will switch
 * it's internal handling of incoming data, but not send out
 * any telnet commands to switch the client's behaviour.
 * 
 * INPUT_APPEND (16):
 * Append the input_to to the list of currently pending input_tos
 * (if any).
 * 
 * INPUT_IGNORE_BANG  (128):
 * Input lines starting with '!' (or whatever the input
 * escape character was configured to be) will _not_ be parsed as
 * commands, but are given to the function as well. Usage
 * of this option is privileged.
 * 
 * The optional trailing args will be passed as second and
 * subsequent args to the function fun.
 *
 * @example 
 * void func() {
 * ...
 * input_to("enter_name", INPUT_PROMPT, "Please enter your name:");
 * /* The traditional way of doing this was:
 * *   write("Please enter your name:");
 * *   input_to("enter_name");
 * *\/
 * ...
 * }
 * enter_name(string str) {
 * write("Is '"+str+"' really your name?? *giggle*\n");
 * ...
 * }
 * 
 * When reaching the input_to() statement the driver
 * continues the function func() but also asks the user for
 * input. If you entered whatever is asked and press RETURN the
 * driver will invoke the enter_name() function with the
 * string you entered as argument to it.
 * 
 * 
 * void func() {
 * ..
 * input_to("enter_firstname");
 * input_to("enter_lastname, INPUT_APPEND);
 * ...
 * }
 * 
 * This sequence will queue two input_tos: the input first goes
 * to enter_firstname(); and when this function is done
 * (including any non-INPUT_APPEND input_to()s on its own), the next
 * input will go to enter_lastname().
 * 
 * 
 * Note that the list of input_to-s is treated as a flat list:
 * 
 * void func() {
 * ..
 * input_to("func1");
 * input_to("func2", INPUT_APPEND);
 * }
 * 
 * void func1() {
 * ..
 * input_to("func3", INPUT_APPEND);
 * }
 * 
 * void func2() { ... }
 * void func3() { ... }
 * 
 * This code will result in the functions being called in the order
 * func(), func1(), func2(), func3(); and not func(), func1(), func3(),
 * func2().
 *
 * @since The meaning of the flag parameter was extended in 3.2.1@93.
        The limited "stacking" of input_to()s issued from !-commands
        was implemented in LDMud 3.2.8.
        Since LDMud 3.2.8 the function can be given as a closure.
        LDMud 3.2.9/3.3.125 introduced the INPUT_PROMPT flag and argument.
        LDMud 3.2.11/3.3.593 added the INPUT_NO_TELNET flag.
        LDMud 3.2.11/3.3.637 added the INPUT_APPEND flag.
        LDMud 3.3 changed the handling of newline sequences in charmode
          to verbatim passing. Earlier drivers passed an empty string
          instead.
        LDMud 3.3 allowed the driver to be configured to use a different
          input escape character.
 *
 */
void input_to(string|closure fun);

void input_to(string|closure fun, varargs int flag );

void input_to(string|closure fun, int flag, varargs string|closure prompt );

/**
 * inherit_list
 *
 * Returns the names of all files inherited by <ob>, including
 * <ob>s own filename. If <ob> is omitted, it defaults to the current
 * object. The value of <flags> determines the structure of the output.
 * 
 * <flag> = INHLIST_FLAT (0, default):
 * The result is an array of filenames, starting the with the filename
 * of <ob> itself, followed by the names of all inherited objects
 * in breadth order.
 * 
 * <flag> = INHLIST_TREE (1):
 * The result is an array starting the with the filename
 * of <ob> itself, followed by the all directly inherited
 * objects. If one of the inherited objects has no inherits by itself,
 * then its name will be stored directly in the array. If one inherited
 * object has inherits by itself, a subvector will be created and
 * stored in the result vector. The subvector(s) have the same
 * structure as the main result vector.
 * 
 * <flag> = INHLIST_TAG_VIRTUAL (2):
 * All names in the result are prefixed with a tag: "  " (two spaces)
 * for normal inherits, "v " for virtual inherits.
 * 
 * All flags can be combined with binary-|, just _FLAT and _TREE are
 * mutually exclusive.
 * 
 * If objects, including <ob>, had been undergone a replace_program(),
 * the returned filenames will reflect the actual active program.
 * 
 * The returned names always begin with '/' (absolute path), except
 * when the parser runs in COMPAT mode.
 *
 * @example 
 * Given this inheritance structure:
 * 
 * / c - d
 * a
 * \ b
 * 
 * the efun will give the following results:
 * 
 * inherit_list(a) -> ({ "a", "c", "b", "d" })
 * inherit_list(c) -> ({ "c", "d" })
 * inherit_list(a, 1) -> ({ "a", ({ "c", "d" }), "b" })
 *
 * @since Before 3.2.8, the returned names never started with a '/'.
        LDMud 3.2.9/3.3.111 added the tree representation.
        LDMud 3.2.9/3.3.125 added the tagging of virtual inherits.
 *
 */
string * inherit_list();

string * inherit_list(object|lwobject ob);

string * inherit_list(object|lwobject ob, int flags);

/**
 * include_list
 *
 * Return information about all files included into the compilation
 * of <ob>, including <ob> program's own filename.
 * If <ob> is omitted, it defaults to the current object.
 * 
 * In the resulting array(s), the information for one include file takes
 * up three elements:
 * 
 * string [i+0]: the name as it appeared in the program, including the
 * delimiters ("" or <>, resp.).
 * string [i+1]: the absolute filename of the include file.
 * int    [i+2]: the inclusion depth (usually 1, more for nested
 * includes).
 * 
 * The first entry in the result is the program's own name in [i+0],
 * the other two elements [i+1] and [i+2] are 0.
 * 
 * The <flag> determines the exact structure of the result:
 * 
 * <flag> = INCLIST_FLAT (0, default):
 * The result is a flat array of the entries, starting the with
 * the entry for <ob> itself, followed by the entries for all
 * included files in the order they were encountered.
 * 
 * <flag> = INCLIST_TREE (1):
 * The result is an array starting the with the entry
 * of <ob> itself, followed by the entries for all directly included
 * files. If one of the included files has no nested includes by itself,
 * then its information will be stored directly in the array.
 * If one included file has includes by itself, a subvector will
 * be created and stored in the result vector (again in [i+0], with
 * [i+1] and [i+2] being 0). These subvectors have the same
 * structure as the main result vector.
 * 
 * If objects, including <ob>, had been undergone a replace_program(),
 * the returned filenames will reflect the actual active program.
 * 
 * The returned proper include filenames always begin with '/' (absolute
 * path), even when the parser runs in COMPAT mode. The filename of
 * the object itself however does not begin with a '/' in COMPAT
 * mode.
 *
 * @example 
 * Given this source code (and /sys as system include directory):
 * 
 * a.c:  #include "b.h"
 * #include <c.h>
 * b.h:  #include "d.h"
 * c.h:  #define BAR
 * d.h:  #define FOO
 * 
 * the efun will give these results:
 * 
 * include_list(a, INCLIST_FLAT)
 * -> ({ "a.c", 0, 0
 * , "\"b.h\"", "/.../b.h", 1
 * , "\"d.h\"", "/.../d.h", 2
 * , "<c.h>",   "/sys/c.h", 1
 * })
 * 
 * include_list(a, INCLIST_TREE)
 * -> ({ "a.c", 0, 0
 * , ({ "\"b.h\"", "/.../b.h", 1
 * , "\"d.h\"", "/.../d.h", 2
 * }), 0, 0
 * , "<c.h>",   "/sys/c.h", 1
 * })
 *
 * @since Implemented in LDMud 3.2.9/3.3.128.
 *
 */
string * include_list();

string * include_list(object|lwobject ob);

string * include_list(object|lwobject ob, int flags);

/**
 * implode
 *
 * Concatenate all strings found in array arr, with the string
 * del between each element. Only strings are used from the array.
 * Works similar with arrays of byte sequences.
 *
 * @example 
 * function                                        returns
 * -------------------------------------------------------------------
 * implode(({ "foo", "bar", "" }), "*")            "foo*bar*"
 * implode(({ "a", 2, this_object(), "c" }), "b")  "abc"
 * 
 * Together with explode() this can be used as a search and replace
 * function of strings:
 * implode(explode("a short text", " "), "_")      "a_short_text"
 * 
 * But nowadays you can also use
 * regreplace("a short text", " ", "_", 1)
 * instead.
 *
 *
 */
string implode(string *arr, string del);

bytes implode(bytes *arr, bytes del);

/**
 * idna_to_unicode
 *
 * Convert string <name> from idna representation (8z punycode)
 * to UTF-8.
 * 
 * If an error occurs, an exception is thrown.
 * 
 * The efun is available only if the system supports libidn - in
 * that case __IDNA__ is defined.
 *
 * @since Introduced in LDMud 3.3.713.
 *
 */
string idna_to_unicode(string name);

/**
 * idna_to_ascii
 *
 * Convert string <name> from UTF-8 to idna representation (8z punycode).
 * 
 * If an error occurs, an exception is thrown.
 * 
 * The efun is available only if the system supports libidn - in
 * that case __IDNA__ is defined.
 *
 * @since Introduced in LDMud 3.3.713.
 *
 */
string idna_to_ascii(string name);

/**
 * idna_stringprep
 *
 * Prepare the UTF-8 string <str> according to the stringprep
 * <profile> (see also libidn stringprep(3)).
 * 
 * <profile> and <flags> are one of the values defined in <idn.h>.
 * 
 * If an error occurs, an exception is thrown.
 * 
 * The efun is available only if the system supports libidn - in
 * that case __IDNA__ is defined.
 *
 * @since Introduced in LDMud 3.3.713.
 *
 */
string idna_stringprep(string str, int profile, int flags);

/**
 * hmac
 *
 * Calculate the Hashed Message Authenication Code for <arg> based
 * on the digest <method> and the password <key>. Return the HMAC.
 * Any strings given as <key> or <arg> are converted to a UTF-8
 * byte sequence before being used.
 * 
 * <method> is one of the TLS_HASH_ constants defined in tls.h; not
 * all recognized methods may be supported for a given driven:
 * 
 * TLS_HASH_SHA1      (1)
 * TLS_HASH_SHA224    (2)
 * TLS_HASH_SHA256    (3)
 * TLS_HASH_SHA384    (4)
 * TLS_HASH_SHA512    (5)
 * TLS_HASH_MD5       (6)
 * TLS_HASH_RIPEMD160 (7)
 * 
 * If the driver is compiled without OpenSSL or GCrypt support
 * an error is thrown.
 *
 * @example 
 * string s;
 * 
 * s = hmac(TLS_HASH_SHA1, "secret", "Hello");
 * s = hmac(TLS_HASH_SHA1, "secret", ({ 'H', 'e', 'l', 'l', 'o' }) )
 *
 * @since Introduced in LDMud 3.3.714.
 *
 */
string hmac(int method, string key, string arg );

string hmac(int method, string key, bytes  arg );

string hmac(int method, string key, int *  arg );

string hmac(int method, bytes  key, string arg );

string hmac(int method, bytes  key, bytes  arg );

string hmac(int method, bytes  key, int *  arg );

/**
 * heart_beat_info
 *
 * This function returns an array of all objects having their heart
 * beat turned on.
 *
 *
 */
object * heart_beat_info();

/**
 * hash
 *
 * Calculate the hash from <arg> as determined by <method>. The hash is
 * calculated with <iterations> iterations, default is 1 iteration.
 * If <arg> is a string, it will be converted to a UTF-8 byte sequence
 * of which then the hash will be created.
 * 
 * <method> is one of the TLS_HASH_ constants defined in tls.h; not
 * all recognized methods may be supported for a given driven:
 * 
 * TLS_HASH_SHA1      (1)
 * TLS_HASH_SHA224    (2)
 * TLS_HASH_SHA256    (3)
 * TLS_HASH_SHA384    (4)
 * TLS_HASH_SHA512    (5)
 * TLS_HASH_MD5       (6)
 * TLS_HASH_RIPEMD160 (7)
 * 
 * If the driver is compiled without OpenSSL or GCrypt support
 * only TLS_HASH_SHA1 and TLS_HASH_MD5 are available.
 * 
 * The efun costs 10 ticks per iteration.
 *
 * @example 
 * string s;
 * 
 * s = hash(TLS_HASH_SHA1, "Hello", 2);
 * s = hash(TLS_HASH_SHA1, ({ 'H', 'e', 'l', 'l', 'o' }) )
 *
 * @since Introduced in LDMud 3.3.714.
        LDMud 3.3.719 added the iteration-based evaluation cost.
 *
 */
varargs string hash(int method, string arg , int iterations  );
varargs string hash(int method, bytes  arg , int iterations  );
varargs string hash(int method, int *  arg , int iterations  );

/**
 * gmtime
 *
 * Interpret the argument clock as number of seconds since Jan,
 * 1st, 1970, 0:00, and return the time in UTC in a nice structure.
 * if <clock> is not specified, time() is used as default.
 * 
 * Alternatively, accept an array of two ints: the first is <clock>
 * value as in the first form, the second int is the number of
 * microseconds elapsed in the current second, which is ignored.
 * 
 * The result is an array of integers:
 * 
 * int TM_SEC   (0) : Seconds (0..59)
 * int TM_MIN   (1) : Minutes (0..59)
 * int TM_HOUR  (2) : Hours (0..23)
 * int TM_MDAY  (3) : Day of the month (1..31)
 * int TM_MON   (4) : Month of the year (0..11)
 * int TM_YEAR  (5) : Year (e.g.  2001)
 * int TM_WDAY  (6) : Day of the week (Sunday = 0)
 * int TM_YDAY  (7) : Day of the year (0..365)
 * int TM_ISDST (8) : TRUE: Daylight saving time
 *
 * @example 
 * printf("Today is %s\n",
 * ({ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
 * "Friday", "Saturday" })[gmtime()[TM_WDAY]]);
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int * gmtime(int clock);

int * gmtime(int *uclock);

/**
 * getuid
 *
 * User-ids are not used in compat mode.
 * Get user-id of the object, i.e. the name of the wizard or
 * domain that is responsible for the object. This name is also
 * the name used in the wizlist. If no arg is given, use
 * this_object() as default.
 *
 * @since Since 3.2.1@47, this creator() is an alias for this efun.
 *
 */
string getuid(object|lwobject ob);

/**
 * geteuid
 *
 * Get the effective user-id of the object (mostly a wizard or
 * domain name). Standard objects cloned by this object will get
 * that userid. The effective userid is also used for checking access
 * permissions. If ob is omitted, is this_object() as default.
 *
 * @since Since 3.2.1@47, this efun is availabe only when using euids.
        Since 3.2.7, this efun is always available.
 *
 */
string geteuid(object|lwobject ob);

/**
 * get_type_info
 *
 * Returns info about the type of arg, as controlled by the flag.
 * 
 * If the optional argument <flag> is not given, an array is
 * returned whose first element is an integer denoting the data
 * type, as defined in <lpctypes.h>. The second entry can contain
 * additional information about arg.
 * 
 * If <flag> flag is the number 0, only the first element of that array
 * (i.e. the data type) is returned (as int). If <flag> is 1, the
 * second element is returned.
 * 
 * If <arg> is a closure or coroutine, the <flag> setting 2 lets the
 * efun return the object of the closure resp. coroutine (which for
 * 'lfun closures' is the object the lfun is defined in, which is not
 * necessarily the object the closure is bound to).
 * 
 * If <arg> is a struct, the <flag> setting 2 lets the efun
 * return the base name of the struct.
 * 
 * If <arg> is a lfun, context closure or coroutine, the <flag>
 * setting 3 lets the efun return the name of the program the closure
 * resp. coroutine was defined in. For other closures, <flag>
 * setting 3 returns 0.
 * 
 * If <arg> is a lfun, context closure or coroutine, the <flag>
 * setting 4 lets the efun return the name of the function.
 * For other closures, <flag> setting 4 returns 0.
 * 
 * For every other <flag> setting, -1 is returned.
 * 
 * The secondary information is:
 * - for mappings the width, ie the number of data items per key.
 * - for symbols and quoted arrays the number of quotes.
 * - for closures, the (internal) closure type, as defined in
 * <lpctypes.h>.
 * - for strings 0 for shared strings, and non-0 for others.
 * - for structs the unique identifier string.
 * - for Python objects the name of the type.
 * - -1 for all other datatypes.
 *
 * @since Introduced in 3.2@127
        Flag setting 2 was introduced in 3.2.1@84.
        Secondary string information was introduced in 3.2.7.
        Up to 3.2.7 inclusive, get_type_info(closure,2) did not return
          the object from a lambda closure or bound-lambda closure.
        In the 3.2 branch, the 'flag' argument could be of any type.
        LDMud 3.3.276 added the secondary information for structs.
        LDMud 3.3.548 added flag setting '3' for lfun/context closures.
        LDMud 3.3.708 added flag setting '4' for lfun/context closures.
 *
 */
mixed get_type_info(mixed arg);

mixed get_type_info(mixed arg, int flag);

/**
 * get_extra_wizinfo
 *
 * Returns the 'extra' information that was set for the given
 * wizard <wiz> in the wizlist.
 * 
 * If <wiz> is a regular or lightweight object, the entry of its
 * creator (uid) is used.
 * If <wiz> is a string (a creator aka uid), it names the entry
 * to use.
 * If <wiz> is the number 0, the data is get from the default wizlist
 * entry.
 * 
 * The function causes a privilege violation.
 *
 *
 */
mixed get_extra_wizinfo(object   wiz);

mixed get_extra_wizinfo(lwobject wiz);

mixed get_extra_wizinfo(string   wiz);

mixed get_extra_wizinfo(int      wiz);

/**
 * get_eval_cost
 *
 * Returns the remaining evaluation cost the current
 * execution (the current command) may use up.
 * 
 * It starts at a driver given high value and
 * is reduced with each executed statement.
 *
 * @since The initial value was made available as macro in LDMud 3.2.6.
 *
 */
int get_eval_cost();

/**
 * get_error_file
 *
 * Return information about the last error which occurred for
 * <name> (where <name> is a valid name from the wiz list).
 * 
 * Result is an array of four elements: the filename of the
 * program where the error occurred, the linenumber in the
 * program, the error message (runtime error messages usually
 * start with a '*'), and a numerical flag (the 'forget flag') if
 * the error information has been queried already.
 * 
 * If there is no error stored for the given <name>, 0 is
 * returned.
 * 
 * If <set_forget_flag> is non-zero, the 'forget' flag is set
 * for the error message after it has been returned.
 *
 *
 */
mixed * get_error_file(string name, int set_forget_flag);

/**
 * get_dir
 *
 * This function takes a path as argument and returns an array of file
 * names and attributes in that directory.
 * 
 * Returns 0 if the directory to search in does not exist.
 * 
 * The filename part of the path may contain '*' or '?' as wildcards:
 * every '*' matches an arbitrary amount of characters (or just itself),
 * a '?' matches any character. Thus get_dir("/path/*") would return an
 * alphabetically sorted array of all files in directory "/path", or
 * just ({ "/path/*" }) if this file happens to exist.
 * 
 * To query the content of a directory, use the directory name with a
 * trailing '/' or '/.', for example get_dir("/path/."). Use the
 * directory name as it is to get information about the directory itself.
 * 
 * The optional second argument mask can be used to get
 * information about the specified files.
 * 
 * GETDIR_EMPTY    (0x00)  get_dir returns an empty array (not very
 * useful).
 * GETDIR_NAMES    (0x01)  put the alphabetically sorted file names into
 * the returned array.
 * GETDIR_SIZES    (0x02)  put the file sizes unsorted into the returned
 * array. directories have size FSIZE_DIR (-2).
 * GETDIR_DATES    (0x04)  put the file modification dates (in seconds
 * since 01/01/1970) unsorted into the
 * returned array.
 * GETDIR_ACCESS   (0x40)  put the file access dates unsorted into
 * the returned array.
 * GETDIR_MODES    (0x80)  put the unix file modes unsorted into
 * the returned array.
 * 
 * GETDIR_ALL      (0xDF)  Return all.
 * 
 * GETDIR_PATH     (0x10)  if this mask bit is set, the filenames with
 * the full path will be returned
 * (GETDIR_NAMES is implied).
 * GETDIR_UNSORTED (0x20)  if this mask bit is set, the result of will
 * _not_ be sorted.
 * 
 * Note: You should use GETDIR_NAMES|GETDIR_UNSORTED to get the entries
 * in the same order as with GETDIR_SIZES and GETDIR_DATES.
 * 
 * The values of mask can be added together.
 *
 * @example 
 * function                         returns
 * -------------------------------------------------------------------
 * get_dir("/obj/.")                all files contained in directory /obj.
 * get_dir("/obj/")                 the same as get_dir("/obj/")
 * 
 * get_dir("/obj/sword.c")          ({ "sword.c" }) if /obj/sword.c
 * exists (it may be a file or a
 * directory), otherwise ({ }) if
 * /obj is a directory,
 * otherwise 0.
 * 
 * get_dir("/obj/*")                ({ "*" }) if * exists.
 * otherwise and normally an
 * alphabetically sorted array with all
 * names of files and directories in
 * /obj if /obj is a directory,
 * otherwise 0.
 * 
 * get_dir("/obj/sword.c", GETDIR_SIZES)  ({ <size of /obj/sword.c> })
 * if that file exists.
 * get_dir("/obj/.", GETDIR_NAMES)  the same as get_dir("/obj/.").
 * get_dir("/obj/.", GETDIR_SIZES)  an array with the sizes of the files
 * in /obj, not sorted by names.
 * get_dir("/obj/.", GETDIR_NAMES|GETDIR_SIZES|GETDIR_DATES) or shorter
 * get_dir("/obj/.", GETDIR_ALL)    an one-dimensional array that
 * contains for each file in /obj its
 * name, its size and its modification
 * date, sorted by names, for example
 * ({
 * "axe.c"  ,  927, 994539583,
 * "sword.c", 1283, 998153903,
 * }).
 * 
 * get_dir("/obj/sword.c", GETDIR_NAMES|GETDIR_PATH)
 * ({ "/obj/sword.c" }) if applicable.
 * get_dir("/obj/sword.c", GETDIR_PATH)  Short form of the same query.
 * 
 * 
 * transpose_array(({ get_dir(str, GETDIR_NAMES|GETDIR_UNSORTED)
 * , get_dir(str, GETDIR_SIZES)
 * , get_dir(str, GETDIR_DATES) }));
 * This returns an array of arrays, with filename, size and
 * filetime as elements, not sorted by names, for example
 * ({
 * ({ "sword.c", 1283, 998153903 }),
 * ({ "axe.c"  ,  927, 994539583 }),
 * }).
 *
 * @since LDMud 3.2.9 added GETDIR_PATH.
        LDMud 3.2.11/3.3.648 added GETDIR_ACCESS and GETDIR_MODES.
 *
 */
mixed * get_dir(string str);

mixed * get_dir(string str, int mask);

/**
 * garbage_collection
 *
 * Tell the parser to initiate a garbage collection after the
 * current execution ended. Depending on the type of memory
 * allocator used, this GC is more less thorough.
 * 
 * If the 'smalloc' memory allocator is used, the GC produces
 * output to a log file. The default name of the log file is
 * specified at program start, but can be modified at runtime:
 * 
 * With the <filename> argument a log file for the GC output
 * different from the default log file can be specified.
 * 
 * If <flag> is not given or 0, the output from the next
 * and only the next GC will go into the log file. If the file
 * already exists, the new output will be appended.
 * 
 * If <flag> is 1, the <filename> will be used as the new
 * default log file for all following GCs. If the file already
 * exists, it will be overwritten from the start.
 * 
 * If a different memory allocator is used, the GC does not produce
 * output and the <filename> and <flag> arguments are ignored.
 * 
 * Calling this efun causes a privilege_violation.
 *
 * @example 
 * garbage_collection()
 * [ GC occurs -> logs into default file ]
 * 
 * garbage_collection("/GCLOG")
 * [ GC occurs -> logs into "/GCLOG" ]
 * 
 * garbage_collection("/GCLOG", 1)
 * [ GC occurs -> logs into "/GCLOG", sets default log to "/GCLOG" ]
 * 
 * garbage_collection("/GCLOG")
 * garbage_collection("/GCLOG2")
 * [ GC occurs -> logs into "/GCLOG" ]
 * 
 * garbage_collection("/GCLOG", 1)
 * garbage_collection("/GCLOG2")
 * [ GC occurs -> logs into "/GCLOG2", sets default log to "/GCLOG" ]
 *
 * @since LDMud 3.2.9 added the <filename> argument.
        LDMud 3.3.209 added the <flag> argument.
        LDMUd 3.5.0 made the efun privileged.
 *
 */
void garbage_collection();

void garbage_collection(string filename);

void garbage_collection(string filename, int flag);

/**
 * functionlist
 *
 * Returns an array with information about <ob>s lfunctions. For every
 * function, 1 to 4 values (depending on <flags>) are stored in
 * the result array conveying in this order:
 * - the name of the function
 * - the function flags (see below)
 * - the return type (listed in <lpctypes.h>)
 * - the number of accepted argumens
 * 
 * <ob> may be given as regular or lightweight object or as a filename.
 * In the latter case, the efun does not try to load the object before
 * proceeding.
 * 
 * <flags> determines both which information is returned for every
 * function, and which functions should be considered at all.
 * Its value is created by bin-or'ing together following flags from
 * <functionlist.h>:
 * 
 * Control of returned information:
 * RETURN_FUNCTION_NAME    include the function name
 * RETURN_FUNCTION_FLAGS   include the function flags
 * RETURN_FUNCTION_TYPE    include the return type as an integer
 * RETURN_FUNCTION_LPCTYPE include the return type as lpctype value
 * RETURN_FUNCTION_NUMARG  include the number of arguments.
 * 
 * The name RETURN_FUNCTION_ARGTYPE is defined but not implemented.
 * 
 * Control of listed functions:
 * NAME_INHERITED      don't list if defined by inheritance
 * TYPE_MOD_STATIC     don't list if static function
 * TYPE_MOD_PRIVATE    don't list if private
 * TYPE_MOD_PROTECTED  don't list if protected
 * NAME_HIDDEN         don't list if not visible through inheritance
 * 
 * The 'flags' information consists of the bin-or of the list control
 * flags given above, plus the following:
 * 
 * TYPE_MOD_VARARGS    function takes varargs
 * NAME_UNDEFINED      function not defined yet, but referenced.
 * NAME_CROSS_DEFINED  function is defined to be in a different program
 * TYPE_MOD_NO_MASK    function is nomask
 * TYPE_MOD_PUBLIC     function is public
 *
 * @since LDMud 3.6.7 introduced RETURN_FUNCTION_LPCTYPE.
 *
 */
mixed * functionlist(object|lwobject|string ob, int flags);

/**
 * function_exists
 *
 * Look up a function <str> in the current object, respectively
 * in the object <ob>. Depending on the value of <flags>, one
 * of the following informations is returned:
 * 
 * <flags> == FEXISTS_PROGNAME (0, default):
 * Return the name of the program the function is defined in.
 * This can be either object_name(ob), or the name of an inherited
 * program. If !compat mode, the returned name always begins
 * with a '/'.
 * 
 * <flags> == FEXISTS_FILENAME (1):
 * Return the name of the file the function is defined in (this
 * may be an include file). If !compat mode, the returned name
 * always begins with a '/'.
 * 
 * <flags> == FEXISTS_LINENO (2):
 * Return the line number within the source file.
 * 
 * <flags> == FEXISTS_ALL (3):
 * Return an array with all the above information, plus information
 * about the function type/flags/number of arguments.
 * 
 * The returned array contains this information:
 * string [FEXISTS_PROGNAME]: the program name
 * string [FEXISTS_FILENAME]: the filename
 * int    [FEXISTS_LINENO]:   the linenumber
 * int    [FEXISTS_NUMARG]:   the number of arguments to the function
 * int    [FEXISTS_TYPE]:     the return type of the function
 * int    [FEXISTS_FLAGS]:    the function flags
 * 
 * The <flags> value can be or-ed to NAME_HIDDEN to return
 * information about static and protected functions in other objects.
 * It is not possible to return information about private functions.
 * 
 * If the function cannot be found (because it doesn't exist or
 * it is not visible to the caller), the result is 0.
 *
 * @example 
 * function_exists("create")
 * function_exists("create", that_object, NAME_HIDDEN|FEXISTS_ALL);
 *
 * @since LDMud 3.2.10 broadened the range of returned values and introduced
          the <flags> argument.
        LDMud 3.2.12/3.3.713 added the function type/flags/number of arguments
          to the result of FEXISTS_ALL.
 *
 */
mixed function_exists(string str);

mixed function_exists(string str, int flags);

mixed function_exists(string str, object|lwobject ob);

mixed function_exists(string str, object|lwobject ob, int flags);

/**
 * funcall
 *
 * Evaluates the closure. The extra args will be passed as args
 * to the closure. If cl is not a closure, it will simply be
 * returned.
 *
 * @example 
 * mixed eval(object ob, string func, mixed *args)
 * {
 * return funcall(#'call_other, ob, func, args);
 * }
 * 
 * This will result in calling
 * 
 * ob->func(args).
 * 
 * In combination with the '...' operator, the functionality
 * of apply() can be implemented:
 * 
 * mixed eval(object ob, string func, mixed *args)
 * {
 * return funcall(#'call_other, ob, func, args...);
 * }
 * 
 * will result in calling
 * 
 * ob->func(args[0],args[1],...,args[sizeof(args)-1]).
 *
 * @since Introduced in 3.2@70.
        Returning a non-closure as it is even when args are given was
        introduced with 3.2.1.
 *
 */
mixed funcall(closure cl, varargs mixed arg );

/**
 * floor
 *
 * Round the <arg>ument downwards the nearest whole number, returning
 * that value. If the <arg>ument value is an integer, the result will
 * be that value, converted to float.
 *
 * @example 
 * floor(4.5)  - returns  4.0
 * floor(-4.5) - returns -5.0
 * floor(5)    - returns  5.0
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.2.9 added integers as argument values.
 *
 */
float floor(float arg);

/**
 * floatp
 *
 * Returns 1 if the arg is a floating point number, 0 else.
 *
 * @returns {n is float} 1 if n is a float, 0 else.
 */
int floatp(mixed n);

/**
 * first_inventory
 *
 * Get the first object in the inventory of ob, where ob is
 * either an object or the file name of an object. If ob is not
 * given, the current object is assumed.
 *
 * @example 
 * This efun is mostly used in the following context:
 * 
 * for(ob=first_inventory(container);ob;ob=next_inventory(ob)) {
 * <some actions>
 * }
 * 
 * If you use such calls frequently then it would be very useful
 * to use a preprocessor macro:
 * 
 * #define FORALL(x, y) for(x=first_inventory(y);x;x=next_inventory(x))
 * 
 * So the above example could be written like this:
 * 
 * FORALL(ob, container) {
 * <some actions>
 * }
 * 
 * Warning: If the object ob is moved inside <some actions>, then
 * next_inventory() will return an object from the new inventory
 * of ob. You also shouldn't call next_inventory() on destructed
 * objects. So in case of move and/or destruction the following
 * is a better solution:
 * 
 * for(ob=first_inventory(container);ob;) {
 * next=next_inventory(ob);
 * <some actions and moves and/or removes>
 * ob=next;
 * }
 *
 *
 */
object first_inventory();

object first_inventory(string ob);

object first_inventory(object ob);

/**
 * find_object
 *
 * Find an object with the object_name str. If the object isn't loaded,
 * it will not be found.
 *
 * @example 
 * object obj;
 * obj = find_object("std/thing");
 * obj = find_object("std/thing.c");
 * obj = find_object("/std/thing");
 * obj = find_object("/std/thing.c");
 * 
 * All four statements are equal.
 * 
 * obj = find_object("/std/thing#42");
 * 
 * returns the clone whose object_name is "std/thing#42", if
 * it exists.
 *
 *
 */
object find_object(string str);

/**
 * find_input_to
 *
 * Find the input_to most recently added to the interactive <player>
 * object matching the <fun> argument:
 * - <fun> is a string: the input_to functionname has to match
 * - <fun> is an object: the object the input_to function is bound to
 * has to match
 * - <fun> is a closure: the input_to closure has to match.
 * - <ob> and <fun> are given: both the object and the functionname have
 * to match
 * 
 * Return -1 if not found, or the position in the input_to stack (0
 * being _least_ recently added input_to).
 *
 * @since Introduced in LDMud 3.2.9.
 *
 */
int find_input_to(object player, string fun);

int find_input_to(object player, closure fun);

int find_input_to(object player, object|lwobject fun);

int find_input_to(object player, object|lwobject ob, string fun);

/**
 * find_call_out
 *
 * Find the first call-out due to be executed for function <func>
 * in the current object resp. for the closure <func>, and return the
 * time left. If no call-out is found return -1.
 *
 * @since Finding a call_out to a closure was introduced in 3.2.1@45.
 *
 */
int find_call_out(string func);

int find_call_out(closure func);

/**
 * filter_objects
 *
 * Similar to filter_array() but calls arr[n]->fun(extra, ...).
 * If the call returns != 0, the object arr[n] ist included in
 * the returned array.
 * 0-entries in arr are ignored.
 *
 *
 */
<object|lwobject> * filter_objects(<object|lwobject> *arr,string fun, varargs mixed extra );

/**
 * filter_indices
 *
 * ob->func() is called resp. cl applied to every element in the
 * mapping, with first argument being the key of the
 * element, and then the extra args that were given to
 * filter_indices (these args must not be protected references like
 * &(i[0]). If the function returns true, the element is
 * added to the result mapping. ob can also be an object_name of an
 * object.
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 *
 * @since In LDMud 3.2.6 renamed from filter_mapping() and generalised
        by efun filter().
 *
 */
mapping filter_indices(mapping m, string func, varargs string|object ob );
mapping filter_indices(mapping m, varargs closure cl );

/**
 * filter
 *
 * Call the function <ob>-><func>() resp. the closure <cl> for
 * every element of the array, or mapping <arg>, and return a
 * result made from those elements for which the function call
 * returns TRUE.  The <extra> arguments are passed as additional
 * parameters to the function calls and must not be references of
 * array of mapping elements (like &(i[1]) ).
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 * 
 * 
 * If <arg> is an array or struct, the function will be called with
 * each of the array/struct values as first parameter, followed by the
 * <extra> arguments. If the result from the function call is true,
 * the array element in question is included into the efun result.
 * 
 * If the efun is used with a mapping <map> instead of a function,
 * every array element which is key in <map> is included into the
 * result.
 * 
 * 
 * If <arg> is a mapping, the function will be called with
 * each of the mapping keys as first, and (if existing) the
 * associated values as second parameter, followed by the <extra>
 * arguments. If the result is true, the mapping element in question
 * is included into the result.
 * 
 * Depending on the width of the mapping <arg>, the function
 * call takes one of three forms:
 * 
 * widthof(arg) == 0: ob->func(key, 0, extra...)
 * == 1: ob->func(key, arg[key], extra...)
 * > 1: ob->func( key
 * , ({ arg[key,0] ...arg[key,width-1] })
 * , extra...)
 * 
 * The advantage of this approach is that the two types of
 * multi-dimensional mappings (mappings with multiple values
 * per key, and mappings of arrays) can be treated in the same way.
 * 
 * If <arg> is a string, the function will be called with each of the
 * characters of the string. If the result is true, the character in
 * question is included into the result.
 *
 * @since Introduced in LDMud 3.2.6, obsoletes filter_array().
        LDMud 3.3.439 added filtering of strings.
 *
 */
mixed * filter(mixed *arg, string fun, string|object ob, varargs mixed extra);
mixed * filter(mixed *arg, closure cl, varargs mixed extra);
mixed * filter(mixed *arg, mapping map, varargs mixed extra);
string  filter(string arg, string fun, string|object ob, varargs mixed extra);
string  filter(string arg, closure cl, varargs mixed extra);
string  filter(string arg, mapping map, varargs mixed extra);
mapping filter(mapping arg, string func, string|object ob, varargs mixed extra);
mapping filter(mapping arg, closure cl, varargs mixed extra);

/**
 * file_size
 *
 * Returns the size of the file in bytes.
 * 
 * Size FSIZE_NOFILE (-1) indicates that the file either does not exist,
 * or that it is not readable for the calling object/user.
 * Size FSIZE_DIR (-2) indicates that it is a directory.
 *
 *
 */
int file_size(string file);

/**
 * extern_call
 *
 * Returns zero, if the function that is currently being executed
 * was called by a local call, non-zero for call_other(), driver
 * applies, closure calls, etc. Currently the only return value
 * for them is 1, but later the various methods may be
 * distinguished by means of the return value.
 *
 * @since Introduced in 3.2@263 resp. 3.2.1@12
 *
 */
int extern_call();

/**
 * explode
 *
 * Return an array of strings, created when the string str is split
 * into substrings as divided by del. When given a byte sequence
 * returns an array of byte sequences in a similar fashion.
 * 
 * implode(explode(str, del), del) == str is always true.
 *
 * @example 
 * function                    returns
 * -------------------------------------------------------------------
 * explode(" ab cd ef ", " ")  ({ "", "ab", "cd", "ef", "" })
 * explode("abc", "abc")       ({ "", "" })
 * explode("", "")             ({ "" })
 * explode("", <whatever>)     ({ "" })
 * explode("abc", "xyz")       ({ "abc" })
 * explode("abc", "")          ({ "a", "b", "c" })
 *
 * @since Date of change is unknown.
        explode(" ab cd ef ", " ") formerly returned ({ "ab", "cd", "ef" })
        instead of ({ "", "ab", "cd", "ef", "" }), i. e. the empty strings
        were ignored. The new behaviour is more consistent, because now
        implode(explode(str, del), del) == str is always true.
        Since 3.5.0 explode("","") returns ({""}), so it is guaranteed to
        return a non-empty array.
 *
 */
string * explode(string str, string del);

bytes *  explode(bytes str, bytes del);

/**
 * expand_define
 *
 * Expands the macro <name> with the argument(s) <arg>... (default is
 * one empty string "").
 * Result is the expanded macro, or 0 if there is no macro with
 * that name.
 * 
 * This efun is applicable only while an object is compiled,
 * therefore its usage is restricted to a few functions like the
 * H_INCLUDE_DIRS driver hook, or the masters runtime_error()
 * function.
 *
 * @example 
 * While compiling 'foo.c':
 * expand_define("__FILE__") --> "foo.c"
 *
 * @since Introduced in 3.2.1@93.
 *
 */
string expand_define(string name);

string expand_define(string name, varargs string arg );

/**
 * exp
 *
 * The exponential function.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float exp(int|float n);

/**
 * execute_command
 *
 * Low-level access to the command parser: take the <command>, parse it
 * into verb and argument and call the appropriate action added to
 * <origin> (read: <origin> is the object 'issuing' the command).
 * For the execution of the function(s), this_player() is set to
 * player. The function also sets results of query_command() and
 * query_verb() to match the given <command>.
 * 
 * The result is non-0 if the command was found and execute, and 0
 * otherwise.
 * 
 * The efun raises a privilege violation ("execute_command",
 * this_object(), origin, command).
 * 
 * Note that this function does not use the H_MODIFY_COMMAND
 * and H_NOTIFY_FAIL hooks; the notify_fail() efun is can be used,
 * but must be evaluated by the caller.
 *
 * @since Introduced in LDMud 3.2.7.
 *
 */
int execute_command(string command, object origin, object player);

/**
 * exec
 *
 * exec() switches the connection from the interactive object old
 * to the object new. If the new object is also interactive, it's
 * connection will be transferred to the old object, thus
 * exchaning the two connections between the object. If the new
 * object is not interactive, the old will not be interactive
 * anymore after the exec call succeeded.
 * 
 * The result is 1 on success, and 0 on failure.
 * 
 * exec() is used to load different "user objects" or to reconnect
 * link dead users.
 * 
 * To provide security mechanisms, the interpreter calls
 * master->valid_exec(current_program, new, old), which must
 * return anything other than 0 to allow this exec() invocation.
 * 
 * After the exec(), if arg 2 was this_player(), this_player()
 * becomes arg 1, else vice versa. Ditto for this_interactive().
 * 
 * Take care when writing a simul-efun around exec(): the
 * 'current_program' passed to the valid_exec() function will be
 * that of the simul-efun object. To get around this, use
 * bind_lambda() to bind #'exec to the real object and funcall()
 * the resulting closure.
 *
 * @example 
 * ob = clone_object("std/player");
 * exec(ob, this_object());
 * destruct(this_object());
 *
 * @since LDMud 3.2.9 added the switchover of this_interactive().
 *
 */
int exec(object new, object old);

/**
 * environment
 *
 * Returns the surrounding object of obj, which may be given by name.
 * If no argument is given, it returns the surrounding of the current
 * object.
 * 
 * Destructed objects do not have an environment.
 *
 * @example 
 * ```lpc
 * object room;
 * room = environment(this_player());
 * ```
 * This will return the current room you are in.
 * @param obj The object to get the environment of.
 */
object environment();

object environment(object obj);

object environment(string obj);

/**
 * efun
 *
 * This directory contains descriptions for the efuns of LDMud 3.3.
 * 
 * These are functions that are supplied by the driver and can be
 * called by any LPC object (somewhat similar to system calls in the
 * C library).
 * 
 * There a few kinds of efuns:
 * 
 * - 'optional'
 * 
 * A mud's maintainer is free to deactivate these efuns when
 * compiling the driver:
 * 
 * break_point()
 * db_*()
 * pg_*()
 * sl_*()
 * parse_command()
 * process_string()
 * rusage()
 * swap()
 * transfer()
 * tls_available()
 * tls_check_certificate()
 * tls_deinit_connection()
 * tls_error()
 * tls_init_connection()
 * tls_query_connection_info()
 * tls_query_connection_state()
 * tls_refresh_certs()
 * xml_generate()
 * xml_parse()
 * json_serialize()
 * json_parse()
 * 
 * - 'preliminary' or 'experimental'
 * 
 * The behaviour of these efuns is not fixed yet, and may change
 * with further releases:
 * 
 * tls_*()
 * xml_generate()
 * xml_parse()
 * 
 * - 'deprecated' or 'obsolete'
 * 
 * These efuns should no longer be used, they are merely provided
 * for backwards compatibility:
 * 
 * make_shared_string()
 * md5()
 * sha1()
 *
 *
 */
/**
 * ed
 *
 * Calling without arguments will start the editor ed with the
 * name of the error file, that was returned by
 * master->valid_read(0, geteuid(this_player()), "ed_start",
 * this_player()), usually something like ~/.err. If that file is
 * empty, ed will immediatly exit again.
 * Calling ed() with argument file will start the editor on the
 * file. If the optional argument func is given, this function
 * will be called after exiting the editor.
 * 
 * The editor ed is almost ed(1) compatible.
 *
 *
 */
void ed();

void ed(string file);

void ed(string file, string func);

/**
 * dump_driver_info
 *
 * Dumps information specified by <what> into a file
 * specified by <filename>. If <filename> is omitted,
 * a default file name is used. The function calls
 * master->valid_write() to check that it can write
 * the files. The file in question is always written anew
 * 
 * On success the efun returns 1, or 0 if an error occurred.
 * 
 * <what> == DDI_OBJECTS:
 * Dumps information about all live objects.
 * Default filename is '/OBJ_DUMP',
 * valid_write() will read 'objdump' for the function.
 * 
 * For every object, a line is written into the file with the
 * following information in the given order:
 * - object name
 * - size in memory, shared data counted only once
 * - size in memory if data wouldn't be shared
 * - number of references
 * - 'HB' if the object has a heartbeat, nothing if not.
 * - the name of the environment, or '--' if the object
 * has no environment
 * - in parentheses the number of execution ticks spent
 * in this object
 * - the swap status:
 * nothing if not swapped,
 * 'PROG SWAPPED' if only the program is swapped
 * 'VAR SWAPPED' if only the variables are swapped
 * 'SWAPPED' if both program and variables are swapped
 * - the time the object was created
 * 
 * <what> == DDI_OBJECTS_DESTRUCTED:
 * Dumps information about all destructed objects.
 * Default filename is '/DEST_OBJ_DUMP',
 * valid_write() will read 'objdump' for the function.
 * 
 * For every object, a line is written into the file with the
 * following information in the given order:
 * - object name
 * - number of references
 * - 'NEW' if the object was destructed in this execution
 * thread, nothing if it is older already.
 * 
 * <what> == DDI_OPCODES:
 * Dumps usage information about the opcodes.
 * Default filename is '/OPC_DUMP',
 * valid_write() will read 'opcdump' for the function.
 * 
 * <what> == DDI_MEMORY:
 * Dumps a list of all allocated memory blocks (if the allocator
 * supports this).
 * Default filename is '/MEMORY_DUMP',
 * valid_write() will read 'memdump' for the function,
 * and the new data will be appended to the end of the file.
 * 
 * If the allocator doesn't support memory dumps, this call will
 * always return 0, and nothing will be written.
 * 
 * This works best if the allocator is compiled with
 * MALLOC_TRACE and/or MALLOC_LPC_TRACE.
 * 
 * NOTE: Make sure that this option can't be abused!
 *
 * @since Introduced in LDMud 3.5.0.
 *
 */
int dump_driver_info(int what);

int dump_driver_info(int what, string filename);

/**
 * driver_info
 *
 * Returns some internal information about the driver.
 * The argument <what> determines which information is returned.
 * 
 * It can be either a configuration option as given to
 * configure_driver() or one of the following options:
 * 
 * 
 * 
 * Driver Environment:
 * 
 * <what> == DI_BOOT_TIME:
 * The time() when the driver was started.
 * 
 * 
 * 
 * LPC Runtime status:
 * 
 * <what> == DI_CURRENT_RUNTIME_LIMITS:
 * Return an array with the current runtime limits.
 * The entries in the returned array are:
 * 
 * int[LIMIT_EVAL]:         the max number of eval costs
 * int[LIMIT_ARRAY]:        the max number of array entries
 * int[LIMIT_MAPPING_SIZE]: the max number of mapping values
 * int[LIMIT_MAPPING_KEYS]: the max number of mapping entries
 * (LIMIT_MAPPING is an alias for LIMIT_MAPPING_KEYS)
 * int[LIMIT_BYTE]:         the max number of bytes handled with
 * one read_bytes()/write_bytes() call.
 * int[LIMIT_FILE]:         the max number of bytes handled with
 * one read_file()/write_file() call.
 * int[LIMIT_CALLOUTS]:     the number of callouts at one time.
 * int[LIMIT_COST]:         how to account the current cost.
 * int[LIMIT_MEMROY]:       the max. number of bytes which can be
 * _additionally_ allocated/used
 * _per top-level execution thread_
 * 
 * For all limits except LIMIT_COST a limit of '0' aka LIMIT_UNLIMITED
 * means 'no limit'.
 * 
 * The value for LIMIT_COST has these meanings:
 * 
 * value > 0: the execution will cost minimum(<value>, actual cost) .
 * value = 0: if the current LIMIT_EVAL is larger than the calling
 * LIMIT_EVAL, the evaluation will cost only 10; otherwise
 * the full cost will be accounted.
 * value < 0: (-value)% of the current evaluation cost will be
 * accounted; -100 obviously means 'full cost'.
 * 
 * <what> == DI_EVAL_NUMBER:
 * Return the current evaluation number.
 * The number is incremented for each top-level call. Top-level
 * calls are initiated by the driver, usually in reaction to an
 * external event:
 * - commands (added by add_action)
 * - heart_beat, reset, clean_up
 * - calls from call_out or input_to
 * - master applies triggered by external events
 * - calls of driver hooks in reaction to external events
 * - send_erq callbacks
 * - logon in interactives
 * 
 * The number can be used to detect cases where the same code is
 * executed twice in the same top level evaluation (say, heart_beat),
 * and also for time stamps for ordering some events.
 * 
 * Please note that the counter may overflow, especially on 32 bit
 * systems. As a result, it can also be negative.
 * 
 * 
 * 
 * Network configuration:
 * 
 * <what> == DI_MUD_PORTS:
 * Returns an array with all open ports, which the driver
 * listens for player connections on.
 * 
 * <what> == DI_UDP_PORT:
 * Returns the port number of the UDP socket.
 * 
 * 
 * 
 * Memory management:
 * 
 * <what> == DI_MEMORY_RESERVE_USER:
 * Current size of the user memory reserve.
 * The user memory reserve is allocated at startup and is used
 * when the driver runs out of memory.
 * 
 * <what> == DI_MEMORY_RESERVE_MASTER:
 * Current size of the master memory reserve.
 * The master memory reserve is allocated at startup and is used
 * when the driver runs out of memory while executing master
 * code.
 * 
 * <what> == DI_MEMORY_RESERVE_SYSTEM:
 * Current size of the system memory reserve.
 * The system memory reserve is allocated at startup and is used
 * when the driver runs out of memory while executing internal
 * operations.
 * 
 * 
 * 
 * Traces:
 * 
 * <what> == DI_TRACE_CURRENT:
 * Returns the current stack trace in array form.
 * 
 * If the array has more than one entries, the first entry is 0 or
 * the name of the object with the heartbeat which started the
 * current thread; all following entries describe the call stack
 * starting with the topmost function called.
 * 
 * All call entries are arrays themselves with the following elements:
 * 
 * int[TRACE_TYPE]: The type of the call frame:
 * TRACE_TYPE_SYMBOL (0): a function symbol (shouldn't happen).
 * TRACE_TYPE_SEFUN  (1): a simul-efun.
 * TRACE_TYPE_EFUN   (2): an efun closure.
 * TRACE_TYPE_LAMBDA (3): a lambda closure.
 * TRACE_TYPE_LFUN   (4): a normal lfun.
 * 
 * mixed[TRACE_NAME]: The 'name' of the called frame:
 * _TYPE_EFUN:   either the name of the efun, or the code of
 * the instruction for operator closures
 * _TYPE_LAMBDA: the numeric lambda identifier.
 * _TYPE_LFUN:   the name of the lfun.
 * 
 * string[TRACE_PROGRAM]: The (file)name of the program holding
 * the code.
 * 
 * string[TRACE_OBJECT]:  The name of the object for which the code
 * was executed. For lightweight objects
 * this is 0.
 * 
 * int[TRACE_LOC]:
 * _TYPE_LAMBDA: current program offset from the start of the
 * closure code.
 * _TYPE_LFUN:   the line number.
 * 
 * <what> == DI_TRACE_CURRENT_DEPTH:
 * Return the current number of frames on the control stack
 * (recursion depth).
 * 
 * <what> == DI_TRACE_CURRENT_AS_STRING:
 * Returns the current stack trace as a string.
 * 
 * <what> == DI_TRACE_LAST_ERROR:
 * Returns the stack trace of the last error in array form
 * (same format as DI_TRACE_CURRENT). Stack traces of errors
 * before the last GC might not be available anymore.
 * 
 * <what> == DI_TRACE_LAST_ERROR_AS_STRING:
 * Returns the stack trace of the last error as a string.
 * 
 * <what> == DI_TRACE_LAST_UNCAUGHT_ERROR:
 * Returns the stack trace of the last uncaught error in array form
 * (same format as DI_TRACE_CURRENT). Stack traces of errors
 * before the last GC might not be available anymore.
 * 
 * <what> == DI_TRACE_LAST_UNCAUGHT_ERROR_AS_STRING:
 * Returns the stack trace of the last uncaught error as a string.
 * 
 * 
 * 
 * LPC Runtime statistics:
 * 
 * <what> == DI_NUM_FUNCTION_NAME_CALLS:
 * Number of function calls by name (like call_other).
 * 
 * <what> == DI_NUM_FUNCTION_NAME_CALL_HITS:
 * Function calls by name are cached (to accelerate
 * lookup of the corresponding program code).
 * This returns the number of cache hits.
 * 
 * <what> == DI_NUM_FUNCTION_NAME_CALL_MISSES:
 * The number of function call cache misses.
 * 
 * <what> == DI_NUM_OBJECTS_LAST_PROCESSED:
 * Number of listed objects processed in the last backend cycle.
 * 
 * <what> == DI_NUM_HEARTBEAT_TOTAL_CYCLES:
 * Total number of heart_beats cycles so far.
 * 
 * <what> == DI_NUM_HEARTBEAT_ACTIVE_CYCLES:
 * Number of active heart_beat cycles executed so far
 * (ie. cycles in which at least one heart_beat() function
 * was called).
 * 
 * <what> == DI_NUM_HEARTBEATS_LAST_PROCESSED:
 * Number of heart_beats calls in the last backend cycle
 * 
 * <what> == DI_NUM_STRING_TABLE_STRINGS_ADDED:
 * Number of distinct strings added to the string table so far.
 * 
 * <what> == DI_NUM_STRING_TABLE_STRINGS_REMOVED:
 * Number of distinct strings removed from the string table so far.
 * 
 * <what> == DI_NUM_STRING_TABLE_LOOKUPS_BY_VALUE:
 * Number of string searches by value.
 * 
 * <what> == DI_NUM_STRING_TABLE_LOOKUPS_BY_INDEX:
 * Number of string searches by address.
 * 
 * <what> == DI_NUM_STRING_TABLE_LOOKUP_STEPS_BY_VALUE:
 * Number of lookup steps needed for string searches by value.
 * 
 * <what> == DI_NUM_STRING_TABLE_LOOKUP_STEPS_BY_INDEX:
 * Number of lookup steps needed for string searches by address.
 * 
 * <what> == DI_NUM_STRING_TABLE_HITS_BY_VALUE:
 * Number of successful lookups of strings by value.
 * 
 * <what> == DI_NUM_STRING_TABLE_HITS_BY_INDEX:
 * Number of successful lookups of strings by address.
 * 
 * <what> == DI_NUM_STRING_TABLE_COLLISIONS:
 * Number of distinct strings added to an existing hash chain so far.
 * 
 * <what> == DI_NUM_REGEX_LOOKUPS:
 * Number of requests for new regexps.
 * 
 * <what> == DI_NUM_REGEX_LOOKUP_HITS:
 * Number of requested regexps found in the table.
 * 
 * <what> == DI_NUM_REGEX_LOOKUP_MISSES:
 * Number of requested regexps not found in the table.
 * 
 * <what> == DI_NUM_REGEX_LOOKUP_COLLISIONS:
 * Number of requested new regexps which collided with a cached one.
 * 
 * 
 * 
 * Network statistics:
 * 
 * <what> == DI_NUM_MESSAGES_OUT:
 * Number of messages sent to a player.
 * 
 * <what> == DI_NUM_PACKETS_OUT:
 * Number of packets sent to a player.
 * 
 * <what> == DI_NUM_PACKETS_IN:
 * Number of packets received from a player.
 * 
 * <what> == DI_SIZE_PACKETS_OUT:
 * Number of bytes sent to a player.
 * 
 * <what> == DI_SIZE_PACKETS_IN:
 * Number of bytes received from a player.
 * 
 * 
 * 
 * Load:
 * 
 * <what> == DI_LOAD_AVERAGE_COMMANDS:
 * A float value that shows the number of executed player commands
 * per second.
 * 
 * <what> == DI_LOAD_AVERAGE_LINES:
 * A float value that shows the number of compiled code lines
 * per second.
 * 
 * <what> == DI_LOAD_AVERAGE_PROCESSED_OBJECTS:
 * A float value that shows the average number of objects processed
 * each backend cycle.
 * 
 * <what> == DI_LOAD_AVERAGE_PROCESSED_OBJECTS_RELATIVE:
 * Average number of objects processed each cycle, expressed
 * as percentage (0..1.0) of the number of present objects.
 * 
 * <what> == DI_LOAD_AVERAGE_PROCESSED_HEARTBEATS_RELATIVE:
 * Average number of heart_beats called each cycle, expressed
 * as fraction (0..1.0) of the number of active heartbeats.
 * 
 * 
 * 
 * Memory use statistics:
 * 
 * <what> == DI_NUM_ACTIONS:
 * Number of allocated actions.
 * 
 * <what> == DI_NUM_CALLOUTS:
 * Number of pending call_outs.
 * 
 * <what> == DI_NUM_HEARTBEATS:
 * Number of objects with a heartbeat.
 * 
 * <what> == DI_NUM_SHADOWS:
 * Number of allocated shadows.
 * 
 * <what> == DI_NUM_OBJECTS:
 * Number of objects.
 * 
 * <what> == DI_NUM_OBJECTS_SWAPPED:
 * Number of objects that are swapped-out.
 * 
 * <what> == DI_NUM_OBJECTS_IN_LIST:
 * Number of objects in the object list
 * (i.e. not destructed objects).
 * 
 * <what> == DI_NUM_OBJECTS_IN_TABLE:
 * Number of objects in the object table.
 * 
 * <what> == DI_NUM_OBJECTS_DESTRUCTED:
 * Number of destructed, but still referenced objects.
 * (Not counting DI_NUM_OBJECTS_NEWLY_DESTRUCTED).
 * 
 * <what> == DI_NUM_OBJECTS_NEWLY_DESTRUCTED:
 * Number of newly destructed objects (ie. objects destructed
 * in this execution thread, that will really be destroyed in
 * the next backend cycle).
 * 
 * <what> == DI_NUM_OBJECT_TABLE_SLOTS:
 * Number of hash slots provided by the object table.
 * 
 * <what> == DI_NUM_PROGS:
 * Size occupied by the object table.
 * 
 * <what> == DI_NUM_PROGS_SWAPPED:
 * Number of swapped-out program blocks
 * 
 * <what> == DI_NUM_PROGS_UNSWAPPED:
 * Number of programs that were swapped-out, are now swapped-in,
 * but still have allocated space in the swap file.
 * 
 * <what> == DI_NUM_ARRAYS:
 * Number of currently existing arrays.
 * 
 * <what> == DI_NUM_MAPPINGS:
 * Number of currently existing mappings.
 * 
 * <what> == DI_NUM_MAPPINGS_CLEAN:
 * Number of clean mappings (mappings without a hash part).
 * 
 * <what> == DI_NUM_MAPPINGS_HASH:
 * Number of hash mappings.
 * 
 * <what> == DI_NUM_MAPPINGS_HYBRID:
 * Number of hybrid mappings (mappings that have a
 * condensed and hash part).
 * 
 * <what> == DI_NUM_STRUCTS:
 * Number of currently existing structs.
 * 
 * <what> == DI_NUM_STRUCT_TYPES:
 * Number of currently existing struct types.
 * 
 * <what> == DI_NUM_VIRTUAL_STRINGS:
 * Number of currently existing virtual strings
 * (identical strings are counted separately).
 * 
 * <what> == DI_NUM_STRINGS:
 * Number of real strings (identical strings
 * are counted once).
 * 
 * <what> == DI_NUM_STRINGS_TABLED:
 * Number of directly tabled strings.
 * 
 * <what> == DI_NUM_STRINGS_UNTABLED:
 * Number of untabled strings.
 * 
 * <what> == DI_NUM_STRING_TABLE_SLOTS:
 * Number of hash slots in the string table.
 * 
 * <what> == DI_NUM_STRING_TABLE_SLOTS_USED:
 * Number of hash chains in the string table.
 * 
 * <what> == DI_NUM_REGEX:
 * Number of cached regular expressions.
 * 
 * <what> == DI_NUM_REGEX_TABLE_SLOTS:
 * Number of slots in the regexp cache table.
 * 
 * <what> == DI_NUM_LVALUES:
 * Number of lvalues (values referenced by &var).
 * 
 * <what> == DI_NUM_NAMED_OBJECT_TYPES:
 * Number of named object types.
 * 
 * <what> == DI_NUM_NAMED_OBJECT_TYPES_TABLE_SLOTS:
 * Number of table entries for named object types.
 * 
 * <what> == DI_NUM_COROUTINES:
 * Number of coroutines.
 * 
 * <what> == DI_NUM_LWOBJECTS:
 * Number of lightweight objects.
 * 
 * <what> == DI_NUM_LPC_PYTHON_REFS:
 * Number of references to Python objects from LPC.
 * 
 * <what> == DI_NUM_PYTHON_LPC_REFS:
 * Number of references to LPC values from Python.
 * 
 * <what> == DI_SIZE_ACTIONS:
 * Total size of allocated actions.
 * 
 * <what> == DI_SIZE_CALLOUTS:
 * Total size of pending call_outs.
 * 
 * <what> == DI_SIZE_HEARTBEATS:
 * Total size of the heart_beat list.
 * 
 * <what> == DI_SIZE_SHADOWS:
 * Total size of allocated shadows.
 * 
 * <what> == DI_SIZE_OBJECTS:
 * Total size of objects (not counting the size of the values
 * of their variables).
 * 
 * <what> == DI_SIZE_OBJECTS_SWAPPED:
 * Total size of swapped-out variable blocks.
 * 
 * <what> == DI_SIZE_OBJECT_TABLE:
 * Size occupied by the object table.
 * 
 * <what> == DI_SIZE_PROGS:
 * Total size of all programs.
 * 
 * <what> == DI_SIZE_PROGS_SWAPPED:
 * Total size of swapped-out program blocks
 * 
 * <what> == DI_SIZE_PROGS_UNSWAPPED:
 * Total size of unswapped program blocks
 * 
 * <what> == DI_SIZE_ARRAYS:
 * Total size of all arrays (not counting additional sizes
 * of array element values).
 * 
 * <what> == DI_SIZE_MAPPINGS:
 * Total size of all mapping (not counting additional sizes
 * of contained values).
 * 
 * <what> == DI_SIZE_STRUCTS:
 * Total size of all structs (not counting additional sizes
 * of contained values).
 * 
 * <what> == DI_SIZE_STRUCT_TYPES:
 * Total size of all struct type definitions.
 * 
 * <what> == DI_SIZE_STRINGS:
 * Total size of all strings.
 * 
 * <what> == DI_SIZE_STRINGS_TABLED:
 * Total size of all tabled strings.
 * 
 * <what> == DI_SIZE_STRINGS_UNTABLED:
 * Total size of all untabled strings.
 * 
 * <what> == DI_SIZE_STRING_TABLE:
 * Size of the string table structure itself.
 * 
 * <what> == DI_SIZE_STRING_OVERHEAD:
 * Size of the overhead per string (compared to a raw string).
 * 
 * <what> == DI_SIZE_REGEX:
 * Total size of all cached regular expressions.
 * 
 * <what> == DI_SIZE_BUFFER_FILE:
 * The size of the memory buffer for file operations.
 * 
 * <what> == DI_SIZE_BUFFER_SWAP:
 * The size of the memory buffer for the swap file.
 * 
 * <what> == DI_SIZE_NAMED_OBJECT_TYPES_TABLE:
 * The size of the table for named object types.
 * 
 * <what> == DI_SIZE_LWOBJECTS:
 * The size of all lightweight objects (not counting the size
 * of the values of their variables).
 * 
 * <what> == DI_SIZE_COROUTINES
 * The size of all coroutines (not counting the size of any
 * values held by the coroutines).
 * 
 * 
 * 
 * Memory swapper statistics:
 * 
 * <what> == DI_NUM_SWAP_BLOCKS:
 * Number of blocks in the swap file.
 * 
 * <what> == DI_NUM_SWAP_BLOCKS_FREE:
 * Number of free blocks in the swap file.
 * 
 * <what> == DI_NUM_SWAP_BLOCKS_REUSE_LOOKUPS:
 * Number of searches for blocks to reuse in the swap file.
 * 
 * <what> == DI_NUM_SWAP_BLOCKS_REUSE_LOOKUP_STEPS:
 * Total number of lookup steps in searches for blocks
 * to reuse in the swap file.
 * 
 * <what> == DI_NUM_SWAP_BLOCKS_FREE_LOOKUPS:
 * Number of searches for blocks to free in the swap file.
 * 
 * <what> == DI_NUM_SWAP_BLOCKS_FREE_LOOKUP_STEPS:
 * Total number of lookup steps in searches for blocks
 * to free in the swap file.
 * 
 * <what> == DI_SIZE_SWAP_BLOCKS:
 * Size of the swap file.
 * 
 * <what> == DI_SIZE_SWAP_BLOCKS_FREE:
 * Size of free blocks in the swap file.
 * 
 * <what> == DI_SIZE_SWAP_BLOCKS_REUSED:
 * Total reused space in the swap file.
 * 
 * <what> == DI_SWAP_RECYCLE_PHASE:
 * True if the swapper is currently recycling free block.
 * 
 * 
 * 
 * Memory allocator statistics:
 * 
 * <what> == DI_MEMORY_ALLOCATOR_NAME:
 * The name of the allocator: "sysmalloc", "smalloc", "slaballoc
 * 
 * <what> == DI_NUM_SYS_ALLOCATED_BLOCKS:
 * Number of memory blocks requested from the operating system.
 * 
 * <what> == DI_NUM_LARGE_BLOCKS_ALLOCATED:
 * Number of large allocated blocks.
 * (With smalloc: The large allocated blocks include
 * the small chunk blocks.)
 * 
 * <what> == DI_NUM_LARGE_BLOCKS_FREE:
 * Number of large free blocks.
 * 
 * <what> == DI_NUM_LARGE_BLOCKS_WASTE:
 * Number of unusable large memory fragments.
 * 
 * <what> == DI_NUM_SMALL_BLOCKS_ALLOCATED:
 * Number of small allocated blocks.
 * 
 * <what> == DI_NUM_SMALL_BLOCKS_FREE:
 * Number of small free blocks.
 * 
 * <what> == DI_NUM_SMALL_BLOCKS_WASTE:
 * Number of unusably small memory fragments.
 * 
 * <what> == DI_NUM_SMALL_BLOCK_CHUNKS:
 * Number of small chunk/slab blocks.
 * (That are large blocks that are used as a
 * base for small blocks.)
 * 
 * <what> == DI_NUM_UNMANAGED_BLOCKS:
 * Number of unmanaged (non-GC-able) allocations.
 * 
 * <what> == DI_NUM_FREE_BLOCKS_AVL_NODES:
 * Number of AVL nodes used to manage the large free
 * blocks. This value might go away again.
 * 
 * <what> == DI_SIZE_SYS_ALLOCATED_BLOCKS:
 * Total size of memory requested from the operating system.
 * 
 * <what> == DI_SIZE_LARGE_BLOCKS_ALLOCATED:
 * Total size of large allocated blocks.
 * 
 * <what> == DI_SIZE_LARGE_BLOCKS_FREE:
 * Total size of large free blocks.
 * 
 * <what> == DI_SIZE_LARGE_BLOCKS_WASTE:
 * Total size of unusable large memory fragments.
 * 
 * <what> == DI_SIZE_LARGE_BLOCK_OVERHEAD:
 * The overhead of every large block allocation.
 * 
 * <what> == DI_SIZE_SMALL_BLOCKS_ALLOCATED:
 * Total size of small allocated blocks.
 * 
 * <what> == DI_SIZE_SMALL_BLOCKS_FREE:
 * Total size of small free blocks.
 * 
 * <what> == DI_SIZE_SMALL_BLOCKS_WASTE:
 * Total size of unusably small memory fragments.
 * 
 * <what> == DI_SIZE_SMALL_BLOCK_OVERHEAD:
 * The overhead of every small block allocation.
 * 
 * <what> == DI_SIZE_SMALL_BLOCK_CHUNKS:
 * Total size of small chunk/slab blocks.
 * 
 * <what> == DI_SIZE_UNMANAGED_BLOCKS:
 * Total size of unmanaged (non-GC-able) allocations.
 * 
 * <what> == DI_SIZE_MEMORY_USED:
 * The amount of memory currently allocated from the allocator.
 * 
 * <what> == DI_SIZE_MEMORY_UNUSED:
 * The amount of memory allocated from the system, but
 * not used by the driver.
 * 
 * <what> == DI_SIZE_MEMORY_OVERHEAD:
 * Amount of memory used for the management of the memory.
 * 
 * <what> == DI_NUM_INCREMENT_SIZE_CALLS:
 * Number of requests to increase the size of a memory block.
 * 
 * <what> == DI_NUM_INCREMENT_SIZE_CALL_SUCCESSES:
 * Number of successful requests to increase the
 * size of a memory block.
 * 
 * <what> == DI_SIZE_INCREMENT_SIZE_CALL_DIFFS:
 * Total size of additionally allocated memory by
 * increasing already allocated memory blocks.
 * 
 * <what> == DI_NUM_REPLACEMENT_MALLOC_CALLS:
 * Number of allocations done through the
 * clib functions (if supported by the allocator).
 * 
 * <what> == DI_SIZE_REPLACEMENT_MALLOC_CALLS:
 * Total size of allocations done through the
 * clib functions (if supported by the allocator).
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_CALLS_FULL:
 * Total number of requests to defragment all small memory chunks.
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_CALLS_TARGETED:
 * Total number of requests to defragment small memory chunks
 * for a desired size.
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_CALL_TARGET_HITS:
 * Total number of successful requests to defragment small
 * memory chunks for a desired size.
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_BLOCKS_INSPECTED:
 * Number of blocks inspected during defragmentations.
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_BLOCKS_MERGED:
 * Number of blocks merged during defragmentations.
 * 
 * <what> == DI_NUM_MEMORY_DEFRAGMENTATION_BLOCKS_RESULTING:
 * Number of defragmented blocks (ie. merge results).
 * 
 * <what> == DI_MEMORY_EXTENDED_STATISTICS:
 * If the driver was compiled with extended memory statistics,
 * they are returned in this entry; if the driver was compiled
 * without the statistics, 0 is returned.
 * 
 * The array contains NUM+2 entries, where NUM is the number
 * of distinct small block sizes. Entry [NUM] describes the
 * statistics of oversized small blocks (smalloc) resp. for
 * all slabs (slaballoc), entry [NUM+1] summarizes all large
 * blocks. Each entry is an array of these fields:
 * 
 * int DIM_ES_MAX_ALLOC:
 * Max number of allocated blocks of this size.
 * 
 * int DIM_ES_CUR_ALLOC:
 * Current number of allocated blocks of this size.
 * 
 * int DIM_ES_MAX_FREE:
 * Max number of allocated blocks of this size.
 * 
 * int DIM_ES_CUR_FREE:
 * Current number of allocated blocks of this size.
 * 
 * float DIM_ES_AVG_XALLOC:
 * Number of explicit allocation requests per
 * second.
 * 
 * float DIM_ES_AVG_XFREE:
 * Number of explicit deallocation requests per
 * second.
 * 
 * int DIM_ES_FULL_SLABS:
 * Number of fully used slabs (slaballoc only).
 * 
 * int DIM_ES_FREE_SLABS:
 * Number of fully free slabs (slaballoc only).
 * 
 * int DIM_ES_TOTAL_SLABS:
 * Total number of slabs: partially used, fully used
 * and fully free (slaballoc only).
 * 
 * The allocation/deallocation-per-second statistics do
 * not cover internal shuffling of the freelists.
 * 
 * The slab statistics (entry [NUM], slaballoc only) shows
 * in the AVG statistics the frequence with which slabs were
 * allocated from resp. returned to the large memory pool.
 * 
 * 
 * 
 * Status texts:
 * 
 * <what> == DI_STATUS_TEXT_MEMORY:
 * A printable string containing information about
 * the memory usage.
 * 
 * <what> == DI_STATUS_TEXT_TABLES:
 * A printable string containing information about
 * the LPC runtime.
 * 
 * <what> == DI_STATUS_TEXT_SWAP:
 * A printable string containing information about
 * the swap system.
 * 
 * <what> == DI_STATUS_TEXT_MALLOC:
 * A printable string containing information about
 * memory allocations.
 * 
 * <what> == DI_STATUS_TEXT_MALLOC_EXTENDED:
 * A printable strings with extended memory statistics
 * (if the driver was compiled with them).
 * 
 * 
 * Misc Status:
 * 
 * <what> == DI_NUM_SIMUL_EFUNS_TABLED:
 * The number of known simul_efuns (active or not) in the simul_efun
 * table.
 *
 * @since Introduced in LDMud 3.5.0.
 *
 */
mixed driver_info(int what);

/**
 * destruct
 *
 * Completely destroy and remove object ob (if not already done so).
 * After the call to destruct(), no global variables will exist any
 * longer, only local ones, and arguments.
 * 
 * If an object self-destructs, it will not immediately terminate
 * execution. If the efun this_object() will be called by the
 * destructed object, the result will be 0. Furthermore, all
 * calls to other objects and to simul-efuns will be ignored, instead
 * the driver will return 0 als 'call' result.
 * 
 * To keep things consistent, most mudlibs frown upon the
 * destruct()ion of other objects, and instead demand call_others
 * to a specific lfun in the object to destruct (traditionally
 * named "remove"). This will then ensure correct update of e.g.
 * weights, volumes etc. Additionally or instead, the master apply
 * prepare_destruct() can be used for this 'cleanup' functionality.
 * 
 * The interpreter does not really destruct the object
 * immediately, but marks it as deleted, removes it from the list
 * of all objects, and puts it onto a list of to-be-destructed
 * objects. The actual freeing occurs only when all references to
 * a destructed object have gone. Thus it is possible, that an
 * object occupies memory long after it has been destructed,
 * although the object is not visible anywhere anymore from
 * outside.
 *
 * @example 
 * ob->remove();
 * if(ob)        /* still there, probably ob does not provide remove() *\/
 * destruct(ob);
 * 
 * This is a way of destructing an object but giving it a chance
 * to do it by itself.
 *
 * @since Changed in 3.2.7 to accept destructed objects as argument, too.
 *
 */
void destruct(object ob);

/**
 * deep_inventory
 *
 * Returns an array of the objects contained in the inventory of
 * ob (or this_object() if no arg given) and in the inventories
 * of these objects, climbing down recursively.
 * 
 * If <depth> is given and not 0, the result is limited as follows:
 * 
 * <depth> > 0: Only the objects in the first <depth> levels of
 * inventory are returned.
 * <depth> < 0: Only the objects in level -<depth> of inventory are
 * returned.
 * 
 * In this, level '1' is the inventory of <ob> itself.
 *
 * @example 
 * Given the following inventory structure
 * 
 * ob
 * +- ob1
 * +- ob2
 * |   `- ob21
 * |  ob3
 * |   `- ob31
 * +- ob4
 * 
 * deep_inventory(ob)     => ({ob1, ob2, ob3, ob4, ob21, ob31})
 * deep_inventory(ob, 1)  => ({ob1, ob2, ob3, ob4})
 * deep_inventory(ob, 2)  => ({ob1, ob2, ob3, ob4, ob21, ob31})
 * deep_inventory(ob, -2) => ({ob21, ob31})
 *
 * @since LDMud 3.3.554 added the <depth> parameter.
 *
 */
object * deep_inventory();

object * deep_inventory(object ob);

object * deep_inventory(object ob, int depth);

/**
 * deep_copy
 *
 * Create a deep copy of <arg> and return it. For arrays, mappings,
 * structs and lightweight objects this means that a new array, mapping,
 * struct resp. lightweight object is created with copies of the
 * original content. Embedded arrays, mappings, structs or lightweight
 * objects are truly copied, too.
 * 
 * For other values this function is a no-op.
 * 
 * If a lightweight objects was copied, the H_CREATE_LWOBJECT_COPY hook
 * will be called to finish initialization of the lightweight object.
 * 
 * If DYNAMIC_COST is defined, every nested array, mapping, struct and
 * lightweight objects counts towards the evaluation cost in both size
 * and nesting depth.
 *
 * @example 
 * mixed *a, *b;
 * 
 * a = ({ 1, ({ 21, 22 }) });
 * b = deep_copy(a);
 * a[0] = -1; a[1][0] = -21;
 * --> a is now   ({ -1, ({ -21, 22 }) })
 * b is still ({  1, ({  21, 22 }) })
 *
 * @since Introduced in LDMud 3.2.6.
        LDMud 3.2.9 added the dynamic cost to the efun.
 *
 */
mixed deep_copy(mixed arg);

/**
 * debug_message
 *
 * Prints the given text to stdout, stderr, the <host>.debug.log file,
 * or any combination of these.
 * 
 * The parameter <flags> is a combination of bitflags determining the
 * target and the mode of writing.
 * 
 * The target flags are: DMSG_STDOUT, DMSG_STDERR and DMSG_LOGFILE.
 * If the flag DMSG_STAMP is given, the message is prepended with the
 * current date and time in the format 'YYYY.MM.DD HH:MM:SS '.
 * 
 * If <flags> is given as 0, left out, or contains no target
 * definition, debug_message() will print to stdout and to the logfile.
 *
 * @example 
 * debug_message("This goes to stdout and the logfile.\n");
 * debug_message("This goes to stderr.\n", DMSG_STDERR);
 * debug_message("This goes to stdout and stderr.\n"
 * , DMSG_STDOUT | DMSG_STDERR);
 * 
 * debug_message("This goes to stdout and the logfile, with timestamp.\n"
 * , DMSG_STAMP);
 * debug_message("This goes to stdout and has the timestamp in front.\n"
 * , DMSG_STDOUT | DMSG_STAMP);
 *
 * @since Introduced in 3.2.1@34.
        LDMud 3.2.9 introduced the <flags> parameter.
 *
 */
void debug_message(string text);

void debug_message(string text, int flags);

/**
 * db_insert_id
 *
 * After inserting a line into a table with an AUTO_INCREMENT field,
 * this efun can be used to return the (new) value of the AUTO_INCREMENT
 * field.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_insert_id").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int db_insert_id(int handle);

/**
 * db_handles
 *
 * Returns an array with all open handles to the SQL-server.
 * As mySQL is most of the time limited to 100 connections, you
 * should not let this number grow too big. The handles are sorted
 * in a special order: The last used handle is the first one and
 * the handle that hasn't been used for the longest time is
 * the last one. If no handles are open, an empty array is returned.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_handles").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int * db_handles();

/**
 * db_fetch
 *
 * Retrieve _ONE_ line of result of the latest SQL-action to the server
 * based on the handle <handle>. If not more results are on the server,
 * 0 is returned.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_fetch").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
mixed db_fetch(int handle);

/**
 * db_exec
 *
 * Execute the SQL-statement <statement> for the connection <handle> to
 * the SQL-server. The result is the handle if all went okay. If there
 * was an error in the statement, 0 is returned.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_exec").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int db_exec(int handle, string statement);

/**
 * db_error
 *
 * Return a string describing the error which occurred during the last
 * database transaction. If the last database transaction was successful,
 * this call returns 0.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_error").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
string db_error(int handle);

/**
 * db_conv_string
 *
 * Convert the string <str> into a string that is correctly interpretated
 * for usage as a string in db_exec(), e.g. ' is replaced with \' and so
 * on.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 *
 * @since Added in 3.2.9 .
 *
 */
string db_conv_string(string str);

/**
 * db_connect
 *
 * Connect to the database <database> on the local mySQL-server.
 * The return-value is the handle for this connection. Automatic
 * reconnects are enabled for this connection; see mysql(C) for
 * implications.
 * If the database does not exist or the server is NOT started,
 * a runtime-error is raised.
 * 
 * If specified, the connection is made for <user> with <password>.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_connect").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int db_connect(string database);

int db_connect(string database, string user);

int db_connect(string database, string user, string password);

/**
 * db_coldefs
 *
 * Return an array with the column names of the current table.
 * If the database didn't return a result, the result of this efun
 * is 0.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_coldefs").
 *
 * @since Added in 3.2.9.
        LDMud 3.2.11 added the privilege violation.
 *
 */
string * db_coldefs(int handle);

/**
 * db_close
 *
 * Close the server-connection with the handle <handle>
 * Return the handle-number on success.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_close").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int db_close(int handle);

/**
 * db_affected_rows
 *
 * Return the number of affected rows of the last SQL-statement that
 * has been sent to the SQL-server via handle <handle>.
 * Only useful for DELETE- or UPDATE-operations.
 * 
 * The function is available only if the driver is compiled with
 * mySQL support. In that case, __MYSQL__ is defined.
 * 
 * The efun triggers a privilege violation ("mysql", "db_affected_rows").
 *
 * @since Added in 3.2.9 .
        LDMud 3.2.11 added the privilege violation.
 *
 */
int db_affected_rows(int handle);

/**
 * ctime
 * @param clock The number of seconds since Jan, 1st, 1970, 0.00.
 * Interpret the argument clock as number of seconds since Jan,
 * 1st, 1970, 0.00 and convert it to a nice date and time string.
 * If clock is not specified, time() is used as default.
 * 
 * The second form is like the first, except that it takes as argument
 * an array of ints as it is returned from utime(): int[0] is the number
 * of seconds like before, int[1] is the number of microseconds within
 * that second.
 *
 * @example 
 * write(ctime()+"\n");
 * 
 * // This will print out something like "Fri Jul 17 19:13:33 1992".
 *
 * @since LDMud 3.2.9 introduced the second form.
 *
 */
varargs string ctime(int clock);
varargs string ctime(int *uclock);

/**
 * crypt
 *
 * Crypt the string <str> the first two characters
 * from the string <seed> as a seed. If <seed> is an integer, then
 * a random seed is used.
 * 
 * The result has the first two characters as the seed.
 * 
 * If you want to let enter password information without echo,
 * input_to() can be used with special argument.
 *
 *
 */
string crypt(string str, int seed);

string crypt(string str, string seed);

string crypt(bytes str, int seed);

string crypt(bytes str, string seed);

/**
 * creator
 *
 * This efun is for backward compatibility only. It is only
 * available in compat mode.
 * 
 * Returns the creator (i.e. the name of the wizard or domain) of
 * the object. Default for ob is this_object().
 *
 * @since Since 3.2.1@47, this efun is an alias for getuid().
 *
 */
string creator(object|lwobject ob);

/**
 * count_bits
 *
 * Count the number of set bits in bitstring <str> and return the number
 * as result.
 *
 * @example 
 * string s;
 * 
 * s = set_bit("", 3); s = set_bit(s, 15);
 * 
 * count_bits(s) --> returns 2
 *
 *
 */
int count_bits(string str);

/**
 * cos
 *
 * Returns the cosinus of the argument.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float cos(int|float n);

/**
 * copy_file
 *
 * The efun copy_file() will copy the file <from> to the new name <to>.
 * If <to> exists and is a directory, then <from> will be placed in that
 * directory and keep its original name.
 * 
 * You must have read permission for <from> and write permission for
 * the target file to copy the file.
 * 
 * On successfull completion copy_file() will return 0. If any error
 * occurs, a non-zero value is returned.
 *
 * @example 
 * copy_file("/players/wizard/obj.c", "/players/wizard/newobj.c");
 *
 * @since LDMud 3.2.9 restricted the error behaviour to returning non-0.
 *
 */
int copy_file(string from, string to);

/**
 * copy_bits
 *
 * Copy the bitrange [<srcstart>..<srcstart>+<copylen>[ from
 * bitstring <src> and copy it into the bitstring <dest> starting
 * at <deststart>, overwriting the original bits at those positions.
 * 
 * The resulting combined string is returned, the input strings remain
 * unaffected.
 * 
 * If <srcstart> is not given, <src> is copied from the start.
 * If <srcstart> is negative, it is counted from one past the last set
 * bit in the string (ie. '-1' will index the last set bit).
 * 
 * If <deststart> is not given, <dest> will be overwritten from the start.
 * If <deststart> is negative, it is counted from one past the last set
 * bit in the string (ie. '-1' will index the last set bit).
 * 
 * If <copylen> is not given, it is assumed to be infinite, ie. the result
 * will consist of <dest> up to position <deststart>, followed by
 * the data copied from <src>.
 * If <copylen> is negative, the function will copy the abs(<copylen>)
 * bits _before_ <srcstart> in to the result.
 * 
 * None of the range limits can become negative.
 *
 * @example 
 * copy_bits(src, dest, 10)    === src[10..]
 * copy_bits(src, dest, 10, 5) === dest[0..4] + src[10..]
 * copy_bits(src, dest, 10, 5, 3)
 * === dest[0..4] + src[10..12] + dest[8..]
 * 
 * (The src[]/dest[] is just for explanatory purposes!)
 *
 * @since Introduced in LDMud 3.3.166.
 *
 */
varargs string copy_bits(string src, string dest, int srcstart , int deststart , int copylen);

/**
 * copy
 *
 * Create a shallow copy of <arg> and return it. For arrays, mappings,
 * structs and lightweight objects this means that a new array, mapping,
 * struct resp. lightweight object is created with copies of the
 * original content. Embedded arrays, mappings, structs or lightweight
 * objects are copied by reference!
 * 
 * For other values this function is a no-op.
 * 
 * If a lightweight objects was copied, the H_CREATE_LWOBJECT_COPY hook
 * will be called to finish initialization of the lightweight object.
 *
 * @example 
 * mixed *a, *b;
 * 
 * a = ({ 1, ({ 21, 22 }) });
 * b = copy(a);
 * a[0] = -1; a[1][0] = -21;
 * --> a is now ({ -1, ({ -21, 22 }) })
 * b is now ({  1, ({ -21, 22 }) })
 *
 * @since Introduced in LDMud 3.2.6.
 *
 */
mixed copy(mixed arg);

/**
 * configure_object
 *
 * Sets the option <what> to the value <data> on the object <ob>
 * or the default for all objects if <ob> is 0.
 * 
 * If the first argument <ob> is not this_object(), the privilege
 * violation ("configure_object", this_object(), ob, what, data)
 * occurs.
 * 
 * As <what>, the following arguments are accepted:
 * 
 * <what> == OC_COMMANDS_ENABLED
 * Sets whether <ob> can use commands normally accessible to
 * users (1) or not (0). This also marks the object as "living".
 * 
 * <what> == OC_HEART_BEAT
 * Enables (1) or disables (0) the heart beat for <ob>. The
 * driver will apply the lfun heart_beat() to the <ob> every
 * __HEARTBEAT_INTERVAL__ seconds, if it is enabled.
 * A shadow over the heart_beat() lfun will be ignored.
 * 
 * If the heart beat is not needed for the moment, then do disable
 * it. This will reduce system overhead.
 * 
 * Note that heart_beat()s are called only if there are enabled
 * via configuer_driver(DC_ENABLE_HEART_BEATS), which is the
 * default.
 * 
 * <what> == OC_EUID
 * Set effective uid to <data>. <data> must be a string or 0.
 * This call will always trigger a privilege violation check,
 * even if <ob> is this_object().
 * 
 * If strict euid usage is enforced, objects with euid 0 cannot
 * load or clone other objects or do any file operations.
 * 
 * 
 * The current values for these options can be queried using
 * object_info().
 *
 * @since Introduced in LDMud 3.5.0.
 *
 */
void configure_object(object ob, int what, mixed data);

/**
 * configure_lwobject
 *
 * Sets the option <what> to the value <data> on the object <lwob>
 * or the default for all lightweight objects if <lwob> is 0.
 * 
 * If the first argument <lwob> is not this_object(), the privilege
 * violation ("configure_lwobject", this_object(), lwob, what, data)
 * occurs.
 * 
 * As <what>, the following arguments are accepted:
 * 
 * <what> == LC_EUID
 * Set effective uid to <data>. <data> must be a string or 0.
 * This call will always trigger a privilege violation check,
 * even if <lwob> is this_object().
 * 
 * If strict euid usage is enforced, lightweight objects with
 * euid 0 cannot load or clone other objects or do any file
 * operations.
 * 
 * 
 * The current values for these options can be queried using
 * lwobject_info().
 *
 * @since Introduced in LDMud 3.6.5.
 *
 */
void configure_lwobject(lwobject lwob, int what, mixed data);

/**
 * configure_interactive
 *
 * Sets the option <what> to the value <data> on the interactive <ob>
 * or the default for all interactives if <ob> is 0.
 * 
 * If the first argument <ob> is not this_object(), the privilege
 * violation ("configure_interactive", this_object(), ob, what, data)
 * occurs.
 * 
 * As <what>, the following arguments are accepted:
 * 
 * <what> == IC_MAX_WRITE_BUFFER_SIZE
 * Sets the maximum amount of data to be held pending for writing
 * per player to <data> bytes. A value of -1 means unlimited,
 * 0 deactivates the write buffer.
 * 
 * <what> == IC_SOCKET_BUFFER_SIZE
 * Changes the socket buffer size to the given size in bytes.
 * Not every operating system might provide this option to
 * change the buffer size.
 * 
 * The buffer size is used for sending, when the remote side isn't
 * getting the data fast enough. When the socket buffer is full,
 * the driver will buffer in its internal write buffer (see
 * IC_MAX_WRITE_BUFFER_SIZE). When that gets full, too, then
 * messages are discarded.
 * 
 * <what> == IC_COMBINE_CHARSET_AS_STRING
 * Set the set of characters which can be combined into a single
 * string when already received en-bloc in charmode from the
 * interactive user <ob>. Non-combinable characters and single
 * received characters are returned as separate strings as usual.
 * 
 * The newline '\n', the NUL character '\0' and non-ASCII
 * characters (unicode characters > 127) are always
 * non-combinable.
 * 
 * The given string should contain all combinable characters.
 * If given as the number 0, the default combine charset is
 * re-established.
 * 
 * <what> == IC_COMBINE_CHARSET_AS_ARRAY
 * Set the set of characters which can be combined into a single
 * string, just like IC_COMBINE_CHARSET_AS_STRING.
 * 
 * The given array shall contain an array of up to 16 integers
 * that are interpreted as 8-bit-values. Each character is encoded
 * as one bit (ASCII characters 0-7 in the first integer, and so on).
 * So a character <n> is treated as combinable if
 * 
 * array[n/8] & (1 << n%8)
 * 
 * If the array contains less elements, the missing elements will
 * be regarded as 0 (non-combinable characters).
 * 
 * <what> == IC_CONNECTION_CHARSET_AS_STRING
 * Set the set of characters which can be output to the interactive
 * user <ob>. All other characters are discarded. This does only
 * apply to characters in the ASCII character set (first 128
 * characters). This does not apply to unicode characters > 127
 * or to binary_message().
 * 
 * The given string should contain all allowed characters.
 * If given as the number 0, the default charset is re-established.
 * 
 * <what> == IC_CONNECTION_CHARSET_AS_ARRAY
 * Set the set of characters which can be output to the interactive
 * user <ob>, just like IC_CONNECTION_CHARSET_AS_STRING.
 * 
 * The given array shall contain an array of up to 16 integers
 * that are interpreted as 8-bit-values. Each character is encoded
 * as one bit (ASCII characters 0-7 in the first integer, and so on).
 * So a character <n> is allowed to be output if
 * 
 * array[n/8] & (1 << n%8)
 * 
 * If the array contains less elements, the missing elements will
 * be regarded as 0 (not allowed, ie. to be discarded).
 * 
 * <what> == IC_QUOTE_IAC
 * Sets whether the character 255 (telnet IAC) shall be quoted
 * by prepending another IAC character, so it will not be interpreted
 * by the telnet protocol. Enable with 1, disable with 0. By default
 * it is enabled and does only apply if character 255 is allowed to
 * be output (ie. it is part of the connection charset).
 * 
 * <what> == IC_TELNET_ENABLED
 * Enables (1) or disables (0) the telnet machine for the interactive
 * user <ob>. When deactivated the driver won't handle telnet
 * negotiations (eg. H_TELNET_NEG won't be called), they will be
 * part of the user input. Also INPUT_NOECHO won't be effective
 * as the driver won't send any telnet negotiations itself.
 * 
 * <what> == IC_MCCP
 * Starts oder ends MCCP compression of the driver -> client traffic.
 * <data> must be the MCCP version (either TELOPT_COMPRESS or
 * TELOPT_COMPRESS2 from <telnet.h>). When the telnet machine
 * is disabled, any value other then zero will do, and the compression
 * starts without a telnet preamble.
 * 
 * Available only if the driver is compiled with MCCP enabled;
 * __MCCP__ is defined in that case.
 * 
 * <what> == IC_PROMPT
 * Sets the prompt for the interactive user <ob> to <data>. The
 * prompt can either be a string or a closure that will be called
 * each time the prompt is shown.
 * 
 * <what> == IC_MAX_COMMANDS
 * Sets the max number of commands the interactive user <ob> is
 * allowed to execute per second to <data>. A negative value means
 * 'unlimited' and is the setting for newly created connections.
 * 
 * A 'command' in this context means every received data packet
 * which causes a LPC call - actions and calls to input_to()
 * alike.
 * 
 * <what> == IC_MODIFY_COMMAND
 * Sets an object that will act as a modifier for each command.
 * All commands for the interactive user <ob> will be passed to
 * data->modify_command() before actually being executed.
 * <data> must be given as an object.
 * 
 * When an object is set, the H_MODIFY_COMMAND hook wont be
 * called anymore. 0 as argument will stop the command modification
 * and reinstall the use of that driver hook.
 * 
 * This mechanism is intended to expand aliases on quicktypers
 * or the like. The name of the lfun called can be changed
 * from modify_command() to something else using the
 * H_MODIFY_COMMAND_FNAME hook.
 * 
 * <what> == IC_ENCODING
 * Sets the encoding to convert the network input to/from.
 * All received bytes (except telnet negotiations) will be converted
 * using this encoding to the internal unicode representation.
 * And all text strings will be converted back to this encoding
 * when sent to the interactive.
 * 
 * Default is "ISO-8859-1//TRANSLIT".
 *
 * @since Introduced in LDMud 3.3.719.
        IC_ENCODING introduced in LDMud 3.6.0.
 *
 */
void configure_interactive(object ob, int what, mixed data);

/**
 * configure_driver
 *
 * This efun configures runtime adjustable bahviour of the driver.
 * 
 * Sets the option <what> to the value <data>.
 * 
 * This function always causes the privilege_violation
 * ("configure_driver", this_object(), what, data).
 * 
 * <what> == DC_MEMORY_LIMIT
 * Set new soft and hard memory limits for the driver.
 * <data> is expected to be an array with two elements, which have to
 * be integers giving the amount of memory in bytes.
 * ({<soft memory limit>, <hard memory limit>})
 * 
 * <what> == DC_ENABLE_HEART_BEATS
 * Globally enable the calling of Heartbeats, if <data> is 1,
 * globally disable them if <data> is 0.
 * If called during heartbeat processing, the change comes into effect
 * at the next backend cycle.
 * 
 * <what> == DC_LONG_EXEC_TIME
 * Set the time considered as (too) long for top-level executions. If
 * an execution exceeds this time, a stack trace will be written to
 * the debug log. The execution will continue at that point.
 * <data> is an integer and measured in microseconds.
 * A time of 0 disables the detection of long executions.
 * 
 * <what> == DC_DATA_CLEAN_TIME
 * Sets the average time between clean-ups of an objects data
 * structures. This is not to be confused with the standard cleanup
 * time which determines when H_CLEAN_UP is called. A long time for
 * data cleanup may lead to larger memory consumption and prevents
 * destructed objects being cleaned up. A too short time may lead to
 * high loads and lag on the machine. The actual time delay will be a
 * time between 0.9*DC_DATA_CLEAN_TIME and 1.1*DC_DATA_CLEAN_TIME.
 * Default at driver startup are 3600s.
 * <data> is an integer and measured in seconds.
 * 
 * <what> == DC_TLS_CERTIFICATE
 * Sets the current certificate used for new TLS sessions.
 * It can be one of the certificates in the key directory
 * (command line option --tls-keydirectory) or the main
 * certificate (given with --tls-certfile).
 * Default is the main certificate or else the first
 * certificate found in the directory. The chosen certificate at the
 * time of the tls_init_connection() call is used for that connection.
 * <data> is a string containing the SHA1 fingerprint
 * of the certificate with hexadecimal numbers,
 * it may contain colons or whitespaces (for example
 * "5A:FE:CA:57:1E:50:5E:1E:C7:ED:BA:11:AD:50:10:75:0F:7A:1E:50").
 * When loading certificates their fingerprints are printed
 * on stdout and into the logfile.
 * 
 * <what> == DC_TLS_DHE_PARAMETER
 * Sets new parameters for the Diffie-Hellman keyexchange for new TLS
 * sessions. The paramters must be given as a PEM encoded string
 * (e.g. the output of 'openssl dhparam -5 2048').
 * If <data> is 0, the built-in defaults will be restored.
 * If importing the new parameters fails (e.g. due to an incorrect
 * format), the driver tries to keep the old parameters
 * 
 * <what> == DC_TLS_CIPHERLIST
 * Sets a new list of ciphers (OpenSSL) or priorities (GnuTLS) to use.
 * For the correct format, please refer to the help of 'openssl
 * ciphers' or documentation of priority strings in GnuTLS.
 * With GnuTLS a syntax error in the list causes an error.
 * With OpenSSL an error is only raised of none of the given ciphers
 * could be selected.
 * By default, the preferred ciphers of the driver take precedence
 * This can be changed in the priority strings for GnuTLS, but
 * currently not for OpenSSL.
 * 
 * <what> == DC_EXTRA_WIZINFO_SIZE
 * Indicate that the wizlist should contain an array of the given size
 * with extra info for each wizard. A negative value indicates
 * a non-array value.
 * 
 * The value is only used to allocate a proper empty 'extra' value
 * for newly created wizlist entries.
 * 
 * <what> == DC_DEFAULT_RUNTIME_LIMITS
 * Sets the default runtime limits, that will be used for each thread.
 * They will be in effect as the initial limits with the next thread.
 * The limits must be given as an array with the following entries:
 * 
 * int[LIMIT_EVAL]:         the max number of eval costs
 * int[LIMIT_ARRAY]:        the max number of array entries
 * int[LIMIT_MAPPING_SIZE]: the max number of mapping values
 * int[LIMIT_MAPPING_KEYS]: the max number of mapping entries
 * int[LIMIT_BYTE]:         the max number of bytes handled with
 * one read_bytes()/write_bytes() call.
 * int[LIMIT_FILE]:         the max number of bytes handled with
 * one read_file()/write_file() call.
 * int[LIMIT_CALLOUTS]:     the number of callouts at one time.
 * int[LIMIT_COST]:         how to account the current cost.
 * int[LIMIT_MEMROY]:       the max. number of bytes which can be
 * _additionally_ allocated/used
 * _per top-level execution thread_.
 * 
 * The limit settings recognize three special values:
 * 
 * LIMIT_UNLIMITED:  the limit is deactivated
 * LIMIT_KEEP:       the former setting is kept
 * LIMIT_DEFAULT:    the 'global' default setting is used.
 * 
 * For LIMIT_COST, the special values have these meaning:
 * LIMIT_UNLIMITED:  at maximum 1 tick is accounted
 * LIMIT_KEEP:        LIMIT_COST is set to 0
 * LIMIT_DEFAULT:     LIMIT_COST is set to -100
 * 
 * <what> == DC_SWAP_COMPACT_MODE
 * Sets free swap space shall be reused immediately to keep
 * the swap file as small as possible.
 * (Same as the --swap-compact command line switch.)
 * 
 * <what> == DC_SWAP_TIME
 * Sets the time until the program of an unused object is swapped out
 * (if possible). Setting the interval to 0 disables swapping of
 * programs.
 * <data> is an integer and measured in seconds.
 * (Same as the --swap-time command line switch.)
 * 
 * <what> == DC_SWAP_VAR_TIME
 * Sets the time until the variables of an unused object are swapped
 * out. Setting the interval to 0 disables swapping of variables.
 * <data> is an integer and measured in seconds.
 * (Same as the --swap-variables command line switch.)
 * 
 * <what> == DC_CLEANUP_TIME
 * Sets the time until the cleanup hook is called in unused objects.
 * <data> is an integer and measured in seconds.
 * (Same as the --cleanup-time command line switch.)
 * 
 * <what> == DC_RESET_TIME
 * Sets the default time until the reset hook is called in objects.
 * The change will take effect for each object after its next reset.
 * <data> is an integer and measured in seconds.
 * (Same as the --reset-time command line switch.)
 * 
 * <what> == DC_DEBUG_FILE
 * Sets the debug log file.
 * The filename can be given relative to the mudlib directory
 * or absolute with regard to the operating system.
 * Settings this option will force closing and reopening
 * the log file (even if the name didn't change).
 * 
 * <what> == DC_SIGACTION_SIGHUP
 * <what> == DC_SIGACTION_SIGINT
 * <what> == DC_SIGACTION_SIGUSR1
 * <what> == DC_SIGACTION_SIGUSR2
 * Sets the default action when the driver encounters those
 * POSIX signals. It can be set to one of the following options:
 * 
 * DCS_DEFAULT:
 * This is the default action: Call handle_external_signal()
 * in the master and act upon its result.
 * 
 * DCS_IGNORE:
 * Ignore the signal.
 * 
 * DCS_TERMINATE:
 * Terminate the process immediately.
 * 
 * DCS_SHUTDOWN:
 * Do a graceful shutdown.
 * 
 * DCS_INFORM_MASTER:
 * Call handle_external_signal(), but ignore its result.
 * 
 * DCS_RELOAD_MASTER:
 * Reload the master object.
 * 
 * DCS_THROW_EXCEPTION:
 * Cause an error in the currently running LPC or Python
 * function.
 *
 * @since Introduced in LDMud 3.3.719.
        DC_ENABLE_HEART_BEATS was added in 3.5.0.
        DC_LONG_EXEC_TIME was added in 3.5.0.
        DC_DATA_CLEAN_TIME was added in 3.5.0.
        DC_EXTRA_WIZINFO_SIZE was added in 3.5.0.
        DC_TLS_CERTIFICATE was added in 3.5.0.
        DC_TLS_DHE_PARAMETER was added in 3.5.0.
        DC_TLS_CIPHERLIST was added in 3.5.0.
        DC_SWAP_COMPACT_MODE was added in 3.5.0.
        DC_SWAP_TIME was added in 3.5.2
        DC_SWAP_VAR_TIME was added in 3.5.2
        DC_CLEANUP_TIME was added in 3.5.2
        DC_RESET_TIME was added in 3.5.2
        DC_DEBUG_FILE was added in 3.5.2.
        DC_SIGACTION_* were added in 3.5.2.
 *
 */
void configure_driver(int what, mixed data);

/**
 * compile_string
 *
 * Compiles <str> into a closure. The closure will be bound to the
 * current object. By default the string will be interpreted as an
 * LPC expression. The string may also contain preprocessor directives
 * (which must occur on their own line).
 * 
 * The argument names are given as the first argument <args>.
 * 
 * Optionally the function accepts a struct with additional options.
 * All entries in this struct are optional. These are the members:
 * 
 * functions:
 * variables:
 * structs:
 * A mapping or closure for the lookup of functions, variables,
 * resp. structs during compilation. A mapping is looked up using
 * the name, the closure will be called with the name as its only
 * argument. The name of the function, variable, resp. struct will
 * be given as a symbol. The result (mapping value resp. closure
 * return value) should be:
 * - for <functions> a closure,
 * - for <variables> a reference, and
 * - for <structs> a template struct (i.e. a struct whose data
 * is irrelevant, only its type will be used).
 * 
 * use_object_functions:
 * use_object_variables:
 * use_object_structs:
 * If set (integer != 0) the compiled code may reference the
 * current object's functions, variables, resp. structs. However
 * successful lookups in <variables>, <functions>, resp. <structs>
 * have precedence. Private variables, functions and structs
 * cannot be accessed this way.
 * 
 * compile_expression:
 * If set (integer != 0) the string is interpreted as an expression
 * (eg. "1+1") and therefore must not contain a terminal semicolon.
 * If no compile mode is selected, this is the default.
 * 
 * compile_block:
 * If set (integer != 0) the string is interpreted as a block (code
 * between braces), the surrounding braces can be omitted. To return
 * a value, the code needs a return statement.
 * 
 * as_async:
 * If set (integer != 0) the code will be compiled as a coroutine,
 * i.e. the resulting closure will return a coroutine when called.
 * 
 * detect_end:
 * If set (integer != 0) the driver will try(!) to detect the end
 * of the expression/block and return the remaining string in <str>
 * (<str> needs to be passed as a reference for this).
 * An end is detected if the word or character following a full
 * expression or block is not suitable to continue the expression
 * or block. Also a comma will end an expression.
 * 
 * When compiling expressions the result of the H_AUTO_INCLUDE_EXPRESSION
 * driver hook will be prepended, for blocks the H_AUTO_INCLUDE_BLOCK
 * hook will be used.
 *
 * @example 
 * funcall(compile_string(({'a,'b}), "a+b"), 1, 2);
 *
 * @since Introduced in LDMud 3.6.7.
 *
 */
closure compile_string(symbol* args, string str);
closure compile_string(symbol* args, string str, struct compile_string_options opts);
closure compile_string(symbol* args, string &str, struct compile_string_options opts);

/**
 * command_stack_depth
 *
 * Return the number of nested commands, ie. the depth of the command
 * stack
 *
 * @since Introduced in LDMud 3.2.7.
 *
 */
int command_stack_depth();

/**
 * command_stack
 *
 * Return an array describing the current command stack. The array has
 * command_stack_depth() entries, the first describing the top-level
 * command, and the last describing the current one.
 * 
 * Each entry is an array itself with these entries:
 * 
 * string [CMD_VERB]:    the verb of this command
 * string [CMD_TEXT]:    the full command text
 * object [CMD_ORIGIN]:  the original command giver
 * object [CMD_PLAYER]:  the current command giver
 * mixed  [CMD_FAIL]:    the notify_fail setting (or 0).
 * mixed  [CMD_FAILOBJ]: the object which set the notify_fail setting.
 * 
 * CMD_ORIGIN and CMD_PLAYER are usually the same; there is a difference
 * only if the modify_command hook changes the command giver with
 * set_this_player().
 * 
 * Note that any of the entries may be returned as 0.
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.2.8 added the CMD_FAILOBJ result.
 *
 */
mixed * command_stack();

/**
 * command
 *
 * Execute str as a command given directly by the user. Any
 * effects of the command will apply to the current object,
 * or to the given <ob>ject.
 * 
 * Return value is 0 for failure. Otherwise a numeric value is
 * returned which tells the evaluation cost. Bigger number means
 * higher cost.  The evaluation cost is approximately the number
 * of LPC machine code instructions executed.
 * 
 * If command() is called on another object, it is not possible
 * to call static functions in this way, to give some protection
 * against illegal forces.
 * 
 * Commands are stacked, meaning that after the given command <str>
 * has finished, the old settings of this_player(), query_verb()
 * etc, are restored.
 *
 * @since Up to 3.2.6 in native mode, commands could be applied to the current
        object only.
        Since 3.2.7, commands are stacked.
 *
 */
int command(string str);
int command(string str, object ob);

/**
 * closurep
 *
 * Returns 1 if the argument is a closure.
 *
 * @since Introduced in 3.2@70
 *
 */
int closurep(mixed c);

/**
 * clones
 *
 * The efuns returns an array with all clones of a certain blueprint.
 * The array is subject to the usual runtime limits.
 * 
 * If <obj> is given, all clones of the blueprint of <obj> (which
 * may be <obj> itself) are returned, otherwise all clones of the
 * current object resp. of the current object's blueprint. If <obj>
 * is given as string, it must name an existing object.
 * 
 * <what> selects how to treat clones made from earlier versions
 * of the blueprint:
 * == 0: (default) return the clones of the current blueprint only.
 * == 1: return the clones of the previous blueprints only.
 * == 2: return all clones of the blueprint.
 * 
 * Note: this efun is computationally expensive.
 * 
 * If the driver is compiled with DYNAMIC_COSTS, the cost of this
 * efun is proportional to the number of objects in the game.
 *
 * @example 
 * object o, p;
 * o = clone_object("/std/thing"); /* or "std/thing" in COMPAT mode *\/
 * destruct(find_object("/std/thing"));
 * p = clone_object("/std/thing");
 * 
 * clones("/std/thing")    --> returns ({ p })
 * clones("/std/thing", 0) --> returns ({ p })
 * clones("/std/thing", 1) --> returns ({ o })
 * clones("/std/thing", 2) --> returns ({ o, p })
 *
 * @since Introduced in LDMud 3.2.8.
        LDMud 3.2.9 added the dynamic cost.
 *
 */
object * clones();

object * clones(int what);

varargs object * clones(string|object obj , int what);

/**
 * clonep
 *
 * The efun returns 1 if <obj> is a clone, and 0 if it is not.
 * The <obj> can be given as the object itself, or by its name.
 * If <obj> is omitted, the current object is tested.
 * Arguments of other types return 0.
 * Objects with replaced programs no longer count as clones.
 *
 * @example 
 * object o;
 * o = clone_object("/std/thing");
 * write(clonep(o));                           --> writes "1"
 * write(clonep("/std/thing"))                 --> writes "0"
 * 
 * (In COMPAT_MODE use "std/thing" as the filename)
 *
 * @since Introduced in LDMud 3.2.6, changed in 3.2.7 so that objects
        with replaced programs no longer count as clones.
 *
 */
int clonep();

int clonep(object obj);

int clonep(string obj);

int clonep(mixed  arg);

/**
 * clone_object
 *
 * Clone a new object from definition <name>, or alternatively from
 * the object <template>. In both cases, the new object is given
 * an unique name and returned.
 * 
 * The original used for cloning, called blueprint, should not be
 * used in the system, just for cloning. The cloned objects
 * contain only the data but the blueprint also the function code.
 * The blueprint is the one without a unique number at the end of
 * the object's name. The clone_object() function never
 * returns a blue print.
 * 
 * If the <name> or <template> designates a cloned object itself,
 * the system looks up the blueprint object _by name_.
 * 
 * Any further arguments will be passed to the H_CREATE_CLONE
 * hook to initialize the cloned object.
 * 
 * If the blueprint exists and has a heart_beat(), clone_object()
 * turns it off.
 * 
 * Note that the pathname must be complete, which means there are no
 * relative paths allowed.
 * 
 * If strict euids are enforced, the cloning object must have
 * a non-zero euid.
 * 
 * 
 * -- Variable Initialization --
 * 
 * In general, variables are initialized for blueprints and clones alike
 * with a call to the internal lfun __INIT().
 * 
 * However, if #pragma share_variables is in effect (either explicitely
 * given in the source or implicitly as runtime option), the values for
 * a clone's uninitialized variables are taken from the _current_
 * variables of the object's blueprint.
 * 
 * In the absence of share_variables, variables without explicit
 * initializers are initialized to 0.
 *
 * @example 
 * // Clone a torch (filename in non-compat format)
 * object torch;
 * torch = clone_object("/obj/torch");
 * 
 * // Clone two keys (filename in compat format)
 * object key1, key2;
 * key1 = clone_object(load_object("obj/key"));
 * key2 = clone_object(key1);
 * 
 * // Create a specialized weapons blueprint.
 * --- std/weapon.c: ---
 * #pragma share_variables
 * int weapon_class = 1;
 * 
 * --- broadsword.c: ---
 * inherit "/std/weapon";
 * 
 * int create() {
 * weapon_class = 2;
 * replace_program("/std/weapon");
 * }
 *
 * @since Modified in LDMud 3.2.6 to take an object as argument.
        LDMud 3.3.378 consolidated the variable initialization with the
        share_variables pragma.
 *
 */
object clone_object(varargs string name );
object clone_object(varargs object template );

/**
 * clear_bit
 *
 * Return the new string where bit n is cleared in string str.
 * Note that the old string str is not modified.
 * 
 * Each character contains 6 bits. So you can store a value
 * between 0 and 63 ( 2^6=64) in one character. Starting
 * character is the blank character " " which has the value 0.
 * The first charcter in the string is the one with the lowest
 * bits (0-5). 
 *
 * @example 
 * string s;
 * s=clear_bit("_",5);
 * 
 * Because "_" is the highest possible value (63), the variable s
 * will now contain the charcter "?" wich is equal to 31
 * (63-2^5=31).
 * 
 * string s;
 * s=clear_bit("?<",3);
 * s=clear_bit(s,8);
 * 
 * s will now contain the string "78". "?" equals 31 and "<"
 * equals 28. Now "?<" is equal to 31+28<<6=31+1792=1823 which is
 * in binary notation (highest bit on the right side)
 * 11111000111. Now clearing the bit 3 and bit 8 (bit numbering
 * starts with zero) will result in 11101000011. The first 6 bits
 * are in decimal notation 23 and the next 6 are equal to 24. Now
 * the 23 is the character "7" and 24 is the "8". So the string s
 * contains "78".
 *
 *
 */
string clear_bit(string str, int n);

/**
 * check_type
 *
 * Returns 1 if the first argument <arg> fulfills the type <type>,
 * 0 otherwise.
 * 
 * This check is similar to runtime type checks. The target type
 * doesn't need to match exactly, but a variable of that type should
 * be able to hold the argument.
 *
 * @since Introduced in LDMud 3.6.7
 *
 */
int check_type(mixed arg, lpctype type);

/**
 * ceil
 *
 * Round the <arg>ument upwards the nearest whole number, returning
 * that value. If the <arg>ument value is an integer, the result will
 * be that value, converted to float.
 *
 * @example 
 * ceil(4.5)  - returns 5.0
 * ceil(-4.5) - returns -4.0
 * ceil(4)    - returns 4.0
 *
 * @since Introduced in LDMud 3.2.7.
        LDMud 3.2.9 allowed integers as argument values.
 *
 */
float ceil(int|float arg);

/**
 * catch
 *
 * Evaluate the expressions. If there is no error, 0 is returned.
 * If there is an error, the evaluation of the expressions stops at
 * that point, and a string with the error message is returned.
 * 
 * System error messages start with a leading '*', user-defined
 * error values (other than 0) as given to throw() and raise_error() are
 * returned as they are.
 * 
 * If at the time the catch() is encountered less than
 * __CATCH_EVAL_COST__ eval ticks are left, a runtime error will be
 * thrown from inside the catch() (and thus caught like every other
 * error) and the expressions will not be executed. The 'reserve'
 * modifier can be used to reserve a different amount of eval ticks.
 * 
 * The default behaviour of catch() can be changed using modifiers:
 * 
 * 'nolog':   Normally, the caught error will be logged in the
 * error logs for easier debugging. With this
 * modifier, the log is suppressed.
 * 
 * 'publish': Normally, master::runtime_error() is not called
 * for a caught error. This modifier instructs
 * catch() to call it nevertheless.
 * 
 * 'reserve <expr>': The expression has to evaluate to a number
 * greater than 0 and is used to determine the amount
 * of eval ticks to reserve, instead of the default
 * of __CATCH_EVAL_COST__. The minimum required
 * are 2 * __MASTER_EVAL_COST__.
 * 'limit <expr>': The expression has to evaluate to a number
 * greater than 0 and is used to limit the eval cost
 * for the evaluation of the expression.
 * 
 * catch() itself is not expensive as far as execution time is
 * concerned: it is about the same as a intra-object function call.
 * 
 * throw() is not very expensive either, but does include the
 * internal cleanup of several structures.
 * 
 * Real runtime errors on the other hand are expensive regardless
 * of whether they are caught or not, as they include the generation
 * of the stack backtrace.
 * 
 * catch() is not really an efun but a compiler directive.
 *
 * @example 
 * object obj;
 * string err;
 * if (err = catch(obj = clone_object("/foo/bar/baz")))
 * write("Cannot clone object, reason:"+err"+\n");
 *
 * @since LDMud 3.2.9 introduced the 'nolog' catch() as experimental feature.
        LDMud 3.2.10 implemented 'nolog' as official form and added
          'publish'.
        LDMud 3.3.559 moved the check regarding __CATCH_EVAL_COST__ inside
          the catch().
        LDMud 3.3.560 added the 'reserve' modifier.
        LDMud 3.6.7 added the 'limit' modifier.
 *
 */
// mixed catch(expr, expr... );
//mixed catch(expr, expr, ... ; modifiers);
// NOTE: catch is handled in parser 

/**
 * capitalize
 *
 * Convert the first character in str to upper case, and return
 * the new string.
 *
 * @example 
 * capitalize("heya!") -> "Heya!"
 *
 *
 */
string capitalize(string str);

/**
 * caller_stack_depth
 *
 * Returns the number of previous objects on the stack. This
 * can be used for security checks.
 *
 *
 */
int caller_stack_depth();

/**
 * caller_stack
 *
 * Returns an array of the previous_object()s who caused the
 * call_other() to this_object().
 * previous_object(i) equals caller_stack()[i].
 * 
 * If you pass the optional argument <add_interactive> (as true value)
 * this_interactive() is appended to the array, or 0 if there is no
 * current interactive.
 * 
 * Note: calls to 'alien lfun closures' (see symbol_function(E))
 * generate two entries on the stack if the bound object differs
 * from the closure object: the first is for the bound object,
 * the second for the closure object.
 *
 * @example 
 * interactive object A enters a command which causes
 * a call to a function in object B, that one calls a
 * function in object C and that, in turn, in object D
 * 
 * If D now calls caller_stack() the result would be: ({C,B}).
 * If it calls caller_stack(1) the result is: ({C,B,A}).
 *
 * @since Introduced in LDMud 3.2.6, suggested by Tubmud.
 *
 */
<object|lwobject>* caller_stack();

<object|lwobject>* caller_stack(int add_interactive);

/**
 * call_strict
 *
 * Similar to call_other(). Call a member function <fun> in another
 * object <ob> if the function is defined and publicly accessible.
 * Any of the optional extra arguments are passed to the function.
 * Result is the value returned from the called function.
 * 
 * ob.fun(args) and ob."fun"(args) are equivalent to
 * call_strict(ob, "fun", args).
 * "ob_name".fun(args) and "ob_name"."fun"(args) are equivalent to
 * call_strict("ob_name", "fun", args);
 * ob.(fun)(args) is equivalent to call_strict(ob, fun, args),
 * "ob_name".(fun)(args) is equivalent to
 * call_strict("ob_name", fun, args).
 * 
 * If ob::fun does not define a publicly accessible function, the
 * efun will call the H_DEFAULT_METHOD hook if set. If the hook
 * is not set or can't resolve the call either, the efun will raise
 * a runtime error.
 * 
 * Calls to the master object never use the H_DEFAULT_METHOD hook.
 * To force non-default calls, the efun call_direct_strict() can
 * be used.
 * 
 * ob can also be an object_name. If a string is passed for ob
 * and an object with that name can't be found or loaded, an
 * error occurs.
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in an array and yield the final
 * result. Array elements can be objects or the names of existing
 * objects. If a call to any of the objects failes, the efun will
 * raise a runtime error.
 *
 * @since Introduced in LDMud 3.6.2.
 *
 */
unknown call_strict(object|string ob, varargs string func );
unknown call_strict(object*|string* ob, varargs string func );

/**
 * call_resolved
 *
 * Similar to call_other(). If ob->func() is defined and publicly
 * accessible, any of the optional extra arguments are passed to
 * ob->func(...). The result of that function call is stored in
 * result, which must be passed by reference.
 * 
 * The efun returns 1 if the function could be called.
 * If ob::fun does not define a publicly accessible function, the
 * efun will call the H_DEFAULT_METHOD hook if set. If the hook
 * is not set or can't resolve the call either, the efun will return 0.
 * If the hook is set and can resolve the call, the efun will return -1.
 * 
 * Calls to the master object never use the H_DEFAULT_METHOD hook.
 * To force non-default calls, the efun call_direct_resolved() can
 * be used.
 * 
 * ob can also be an object_name. If a string is passed for ob
 * and an object with that name can't be found or loaded, an
 * error occurs.
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in two arrays, one for the result
 * of the function calls that will be stored in the result parameter,
 * and one for the efun result codes that will finally be returned from
 * the efun. Array elements can be objects or the names of existing
 * objects; destructed objects and 0s will yield a '0' as result in
 * both arrays, but don't cause an error.
 *
 * @since LDMud 3.3.113 introduced the H_DEFAULT_METHOD hook.
        LDMud 3.6.2 added array calls.
 *
 */
int call_resolved(mixed result, object ob, varargs string func );

int* call_resolved(mixed* result, object* ob, varargs string func );

/**
 * call_out_info
 *
 * Get information about all pending call outs. The result is an
 * array in which every entry is itself an array describing one
 * call_out. Each of these arrays consists of 3 or more elements:
 * 
 * 1. The object the function/closure is called in.
 * 2. The function or closure.
 * 3. The delay to go
 * 4ff. The optional argument(s)
 * 
 * Callouts for destructed objects will not be contained in the
 * list.
 *
 *
 */
mixed * call_out_info();

/**
 * call_out
 *
 * Set up a call to function fun in the current object, or to
 * closure cl. The call will take place after <delay> seconds, with the
 * remaining argument list provided.
 * <delay> can be a minimum time of 0 (negative values are implicitly
 * treated as 0), but the real delay will be something between <delay>
 * and <delay> + __ALARM_TIME__.
 * 
 * call_out() saves and restores the current user. It is now
 * possible to use say() or write() which rely on a current
 * user to be something useful.
 * 
 * call_out() can only call functions by name <fun> which are publicly
 * accessible, i.e. "public" and "static" functions. "private" and
 * "protected" functions can't be called.
 * 
 * If <fun> does not define a publicly accessible function, the
 * efun will call the H_DEFAULT_METHOD hook if set.
 * Calls to the master object never use the H_DEFAULT_METHOD hook.
 * 
 * The execution of the call_out()s implies a simple (not
 * exhaustive) measure against rabbits: the evaluation costs of
 * those call_outs() executing at the same time are summed up on
 * a per-UID base. If the summed-up costs exceed the given maximum,
 * a 'too long evaluation' error will occur and any remaining
 * call_outs() of this user scheduled for the same time are
 * discarded.
 * 
 * If two call_out()s were started with the same target time
 * the one that was issued first will be executed first.
 *
 * @example 
 * call_out("RefreshMe", 10);
 * 
 * This will call the function RefreshMe() in 10 seconds without
 * any arguments. The function RefreshMe() can then call out
 * itself again which will result in a loop (not in a recursion)
 * which can be used to check or set up things in the object in
 * intervals. Be aware that callouts are stored in a linear
 * list, and so are somewhat expensive for the driver.
 * 
 * And YES: self-replicating call_out()s, where each call_out()
 * creates two or more other call_out()s in a loop (so called
 * 'rabbits') slow the mud down very fast, and are even able
 * to crash it. No need to try it yourself.
 *
 *
 */
void call_out(string fun, int delay, varargs mixed arg );
void call_out(closure cl, int delay, varargs mixed arg );

/**
 * call_other
 *
 * Call a member function <fun> in another object <ob> with an
 * the argument(s) <arg...>. Result is the value returned from
 * the called function (or 0 for non-existing or void functions).
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in an array and yield the final
 * result.  Array elements can be objects or the names of existing
 * objects; destructed objects and 0s will yield a '0' as result, but
 * don't cause an error.
 * 
 * The object(s) can be given directly or via a string (i.e. its
 * object_name). If it is given by a string and the object does not
 * exist yet, it will be loaded.
 * 
 * ob->fun(args) and "ob_name"->fun(args) is equivalent to
 * call_other(ob, "fun", args). Nowadays the ob_name string can
 * also be a variable.
 * 
 * ob->fun(args) and ob->"fun"(args) are equivalent to
 * call_other(ob, "fun", args). ob->(fun)(args) are equivalent
 * to call_other(ob, fun, args) where fun is a runtime expression
 * returning the function name.
 * 
 * If ob::fun does not define a publicly accessible function, the
 * efun will call the H_DEFAULT_METHOD hook if set. If the hook
 * is not set or can't resolve the call either, call_other()
 * will return 0, which is indistinguishable from a function returning 0.
 * 
 * Calls to the master object never use the H_DEFAULT_METHOD hook.
 * To force non-default calls, the efun call_direct() can be used.
 * 
 * "publicly accessible" means "public" when calling other objects,
 * and "public" or "static" when calling this_object(). "private"
 * and "protected" function can never be called with call_other().
 * 
 * The return type of call_other() is 'any' be default. However,
 * if your LPC code uses #pragma strict_types, the return type is
 * 'unknown', and the result of call_other() must be casted to
 * the appropriate type before you can use it for anything.
 *
 * @example 
 * // All the following statements call the lfun QueryProp()
 * // in the current player with the argument P_SHORT.
 * string str, fun;
 * 
 * str = (string)call_other(this_player(), "QueryProp", P_SHORT);
 * fun = "QueryProp";
 * str = (string)call_other(this_player(), fun, P_SHORT);
 * 
 * str = (string)this_player()->QueryProp(P_SHORT);
 * str = (string)this_player()->"QueryProp"(P_SHORT);
 * fun = "QueryProp";
 * str = (string)this_player()->(fun)(P_SHORT);
 * 
 * You have to do explicit type casting because of the unknown
 * return type, if you have set #pragma strict_types.
 * 
 * // This statement calls the lfun short() in all interactive users
 * // and stores the collected results in a variable.
 * string *s;
 * 
 * s = (string *)users()->short();
 * 
 * !Compat: call_other("/users/luser/thing", "???", 0);
 * Compat: call_other("users/luser/thing", "???", 0);
 * 
 * This looks a bit weird but it was used very often to just load
 * the object by calling a not existing function like "???".
 * Fortunately nowadays there is an efun load_object() for this
 * purpose.
 *
 * @since In LDMud 3.2.8 the following improvements were made:
         - the forms x->"y"() and x->(y)() are recognized;
         - the form x->y() no longer clashes with a local variable also
           called "y";
         - a simul_efun call_other() also catches ->() calls.
         - call_other can be applied on arrays of objects.
        LDMud 3.2.10 made the call on arrays of objects configurable.
        LDMud 3.3.113 introduced the H_DEFAULT_METHOD hook.
        LDMud 3.5.0 made the call on arrays of objects non-optional.
 *
 */
unknown call_other(object ob, string fun, varargs mixed arg );
unknown call_other(object *ob, string fun, varargs mixed arg );

/**
 * call_direct_strict
 *
 * Similar to call_other(). Call a member function <fun> in another
 * object <ob> if the function is defined and publicly accessible.
 * Any of the optional extra arguments are passed to the function.
 * Result is the value returned from the called function.
 * 
 * This efun is a twin to call_strict(), with the difference
 * being that call_direct_strict() never calls a default method.
 * 
 * Thus if ob::fun does not define a publicly accessible function,
 * the efun will raise a runtime error.
 * 
 * ob can also be an object_name. If a string is passed for ob
 * and an object with that name can't be found or loaded, an
 * error occurs.
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in an array and yield the final
 * result. Array elements can be objects or the names of existing
 * objects. If a call to any of the objects failes, the efun will
 * raise a runtime error.
 *
 * @since Introduced in LDMud 3.6.2.
 *
 */
unknown call_direct_strict(object|string ob, varargs string func );
unknown call_direct_strict(object*|string* ob, varargs string func );

/**
 * call_direct_resolved
 *
 * Similar to call_direct(). If ob->func() is defined and publicly
 * accessible, any of the optional extra arguments are passed to
 * ob->func(...). The result of that function call is stored in
 * result, which must be passed by reference.
 * 
 * This efun is a twin to call_resolved(), with the difference
 * being that call_direct_resolved() never calls a default method.
 * 
 * The efun returns 1 if the function could be called.
 * If ob::fun does not define a publicly accessible function, the
 * efun will return 0.
 * 
 * ob can also be an object_name. If a string is passed for ob, and
 * no object with that name does exist, an error occurs.
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in two arrays, one for the result
 * of the function calls that will be stored in the result parameter,
 * and one for the efun result codes that will finally be returned from
 * the efun. Array elements can be objects or the names of existing
 * objects; destructed objects and 0s will yield a '0' as result in
 * both arrays, but don't cause an error.
 *
 * @since Introduced in LDMud 3.3.113 with the H_DEFAULT_METHOD hook.
        LDMud 3.6.2 added array calls.
 *
 */
int call_direct_resolved(mixed result, object ob, varargs string func );
int* call_direct_resolved(mixed* result, object* ob, varargs string func );

/**
 * call_direct
 *
 * Call a member function <fun> in another object <ob> with
 * argument(s) <arg...>. Result is the value returned from
 * the called function (or 0 for non-existing or void functions).
 * 
 * This efun is a twin to call_other(), with the difference
 * being that call_direct() never calls a default method.
 * 
 * Additionally the efun accepts an array of objects as <ob>: the
 * function is called with the same arguments in all the given objects.
 * The single results are collected in an array and yield the final
 * result.  Array elements can be objects or the names of existing
 * objects; destructed objects and 0s will yield a '0' as result, but
 * don't cause an error.
 * 
 * The object(s) can be given directly or via a string (i.e. its
 * object_name). If it is given by a string and the object does not
 * exist yet, it will be loaded.
 * 
 * ob->fun(args) and "ob_name"->fun(args) is equivalent to
 * call_other(ob, "fun", args). Nowadays the ob_name string can
 * also be a variable.
 * 
 * ob->fun(args) and ob->"fun"(args) are equivalent to
 * call_other(ob, "fun", args). ob->(fun)(args) are equivalent
 * to call_other(ob, fun, args) where fun is a runtime expression
 * returning the function name.
 * 
 * If ob::fun does not define a publicly accessible function, the
 * call_other() will return 0, which is indistinguishable from
 * a function returning 0.
 * 
 * "publicly accessible" means "public" when calling other objects,
 * and "public" or "static" when calling this_object(). "private"
 * and "protected" function can never be called with call_other().
 * 
 * The return type of call_other() is 'any' be default. However,
 * if your LPC code uses #pragma strict_types, the return type is
 * 'unknown', and the result of call_other() must be casted to
 * the appropriate type before you can use it for anything.
 *
 * @example 
 * ```
 * // All the following statements call the lfun QueryProp()
 * // in the current player with the argument P_SHORT.
 * string str, fun;
 * 
 * str = (string)call_direct(this_player(), "QueryProp", P_SHORT);
 * fun = "QueryProp";
 * str = (string)call_direct(this_player(), fun, P_SHORT);
 * ```
 * You have to do explicit type casting because of the unknown
 * return type, if you have set #pragma strict_types.
 * ```
 * // This statement calls the lfun short() in all interactive users
 * // and stores the collected results in a variable.
 * string *s;
 * 
 * s = (string *)call_direct(users(), "short");
 * ```
 * @since Introduced in LDMud 3.3.113 with the H_DEFAULT_METHOD hook.
        LDMud 3.2.10 made the call on arrays of objects configurable.
        LDMud 3.5.0 made the call on arrays of objects non-optional.
 *
 */
unknown call_direct(object ob, string fun, varargs mixed arg );
unknown call_direct(object *ob, string fun, varargs mixed arg );

/**
 * call_coroutine
 *
 * Continues execution of the coroutine.
 * 
 * The value will be passed as the result of its last suspension
 * point (the previous yield() call of its execution). If the
 * coroutine is at its start, the value will be discarded.
 * 
 * The coroutine may pass execution to other coroutines through
 * await() and yield() calls. A yield() call without a coroutine,
 * a return statement or simply the end of the statement block
 * will return to the caller.
 * 
 * The result of the call will be the value given to the yield()
 * or return statement.
 *
 * @since Coroutines were introduced in LDMud 3.6.5.
 *
 */
mixed call_coroutine(coroutine cr, mixed value = 0);

/**
 * bytesp
 *
 * Return 1 if arg is a byte sequence.
 *
 * @since Introducted in LDMud 3.6.0.
 *
 */
int bytesp(mixed arg);

/**
 * break_point
 *
 * This function is for system internal use and should never be called by
 * user objects. It is supposed to check the stack integrity and aborts
 * the driver when it detects corruption.
 *
 *
 */
//void break_point();

/**
 * blueprint
 *
 * The efuns returns the blueprint for the given object <ob>, or for
 * the current object if <ob> is not specified.
 * 
 * If the blueprint is destructed, or its program replaced, the efun
 * returns 0.
 * 
 * For objects with replaced programs, the efun returns the blueprint
 * for the replacement program.
 * In COMPAT mode the returned blueprint does not start with a "/".
 *
 * @example 
 * ```
 * blueprint("/std/thing"))               -> /std/thing
 * blueprint(find_object("/std/thing"))   -> /std/thing
 * blueprint(clone_object("/std/thing"))  -> /std/thing
 * ```
 * @since Introduced in LDMud 3.2.9.
 *
 */
object blueprint();

object blueprint(string|object|lwobject ob);

/**
 * bind_lambda
 *
 * Binds an unbound lambda closure to an object and return it.
 * The efun can also be used to rebind an efun-, simul-efun
 * or operator closure to a different object.
 * 
 * If the optional argument ob is not this_object(), the privilege
 * violation ("bind_lambda", this_object(), ob) occurs.
 *
 * @since Introduced in 3.2@82.
 *
 */
closure bind_lambda(closure c, object|lwobject ob);

/**
 * binary_message
 *
 * Flush output and send output directly with write WITHOUT IAC QUOTING.
 * The message may contain zeroes if given as int *.
 * The messages goes to this_object(), but only if interactive.
 * return value: number of characters actually written.
 * Any 'allowed charset' setting is ignored.
 * 
 * Flag settings are interpreted bitwise and may be ored
 * together (only for clients not using MCCP compression):
 * 
 * Bit 0 (value 1): when set, add_message() is used instead of
 * write(). Thus no previous flushing of the buffer is
 * needed, but the output is not immediate, nor can the
 * number of bytes actually sent be determined - the return
 * value is undefined.
 * Bit 1 (value 2): The buffer is flushed _after_ adding the
 * message. Useful only in conjunction with Bit 0.
 * 
 * The idea behind the flag settings is that sending command
 * codes for colours and other things needs to bypass the allowed
 * charset filters, but isn't important enough to waste bandwith
 * on a synchronous transmission.
 *
 * @since Introduced in 3.2.1@40.
        Argument 'flags' introduced in 3.2.1@60.
 *
 */
int binary_message(int *|bytes message, int flags);

/**
 * baseof
 *
 * Test if the type of struct <b> is a base of struct <s> (the
 * values of <b> and <s> are irrelevant). Results are:
 * 0: <b> is not a base of <s>, nor is <b> of equal type as <s>
 * (though <s> might be a base of <b>).
 * 1: <b> is a true base of <s>
 * 2: <b> and <s> are the same struct type
 *
 * @since Introducted in LDMud 3.3.344.
 *
 */
int baseof(struct b s1, struct s s2);

/**
 * attach_erq_demon
 *
 * This privileged efun is to set/change the connection of the
 * driver to the external erq demon, thus in effect changing the
 * demons.
 * 
 * The connection of the given interactive 'ob'ject is taken away(!)
 * from it and stored as the erq-connection. The object itself is
 * then no longer needed, but may stay alive - it is just another
 * non-interactive object then.
 * 
 * In the second form, the string will be combined as suffix to
 * the filename ERQFILE<obname>, which is then the binary to be
 * forked off as new erq demon. The communication with this erq
 * will take place over unix domain sockets. ERQFILE defaults to
 * BINDIR/erq, where BINDIR is the configuration value for the
 * executable directory.
 * 
 * If there is alreay an erq demon connected to the driver, the
 * function will fail unless 'do_close' (default 0) is specified
 * as 1 (or any other odd integer): then the old connection will
 * be closed before attaching the new.
 * The efun returns 1 on success, else 0.
 *
 * @example 
 * To restart the (default) erq, write in
 * ```
 * master.c::stale_erq(closure c):
 * attach_erq_demon("", 0);
 * ```
 * @since Introduced in 3.2.1@61.
 *
 */
int attach_erq_demon(object ob,     int do_close);

int attach_erq_demon(string obname, int do_close);

/**
 * atan2
 *
 * Returns the angle part of the polar coordinates of the point (x, y)
 * in the range (-pi, pi].
 * 
 * Note the exchange of the coordinates x and y in the parameter list
 * reflecting the sequenz in the gradient to angle transformation
 * atan(y / x).
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float atan2(int|float y, int|float x);

/**
 * atan
 *
 * Returns the argument's arcus tangent.
 *
 * @since LDMud 3.2.9 added integers as arguments.
 *
 */
float atan(int|float n);

/**
 * asin
 *
 * Returns the arcus sine of its argument.
 *
 *
 */
float asin(float n);

/**
 * apply
 *
 * Evaluates the closure <cl> with the following arguments.
 * If the last argument is an array or struct, it will be
 * flattened: ie. the array/struct itself will be removed and its
 * contents added to the argument list of <cl>
 * 
 * If <cl> is not a closure, it will simply be returned (and all
 * other arguments are ignored).
 *
 * @example 
 * The flattening of the last argument is the important difference
 * between apply() and funcall(). For example:
 * ```
 * mixed eval(object ob, string func, mixed *args)
 * {
 * return apply(#'call_other, ob, func, args);
 * }
 * ```
 * This will result in calling
 * ```
 * ob->func(args[0],args[1],...,args[sizeof(args)-1]).
 * ```
 * Using funcall() instead of apply() would have given us
 * ```
 * ob->func(args).
 * ```
 * 
 * Of course, with the '...' operator we could also write
 * ```
 * mixed eval(object ob, string func, mixed *args)
 * {
 * return funcall(#'call_other, ob, func, args...);
 * }
 * ```
 * and achieve the same result.
 *
 * @since Introduced in 3.2@70
        LDMud 3.2.8 adds the returning of a non-closure as first
        argument.
        LDMud 3.3 added the '...' operator and thus made apply() in fact
        redundant.
        LDMud 3.3.266 added support for structs.
 *
 */
mixed apply(varargs closure cl );

/**
 * and_bits
 *
 * <str1> and <str2> are both bitstrings. The result of the function
 * is a bitstring with the binary-and of <str1> and <str2>,
 * ie. a string in which a bit is set only if both corresponding
 * bits in the input strings are set, too.
 *
 * @example 
 * ```
 * string s1, s2, s3;
 * 
 * s1 = set_bit("", 3); s1 = set_bit(s1, 15);  -> s1 is "( ("
 * s2 = set_bit("", 3); s2 = set_bit(s2, 4);   -> s2 is "8"
 * 
 * s3 = and_bits(s1, s2);
 * 
 * -> s3 is now "8", ie. a bitstring with bit 3 set only.
 * ```
 *
 */
string and_bits(string str1, string str2);

/**
 * allocate
 *
 * Allocate an array of size elements. The number of elements
 * must be >= 0 and not bigger than a system maximum (usually
 * 1000).
 * 
 * If <init_value> is given, all array elements will be set
 * to this value (if <init_value> is an array or mapping, a shallow
 * copy will be created for each element), otherwise they all will be 0.
 * 
 * In the second form (using an array of sizes instead of one size),
 * the efun will allocate a multidimensional array, that is an array
 * of arrays.
 * 
 * Note that this function is hardly needed anymore, because
 * arrays can be added by the + operator, and can be constructed
 * and initialized by the ({ }) operator. The functions only
 * use is to construct big empty arrays.
 *
 * @example 
 * ```
 * string *buffer;
 * buffer = allocate(50);
 * buffer = allocate(50, "");
 * 
 * buffer = allocate( ({ 2, 3 }) )
 * --> ({ ({ 0, 0, 0 }), ({ 0, 0, 0 }) })
 * ```
 * @since LDMud 3.2.9 added the initialization value and the multi-dimensional
          allocation.
 *
 */
mixed * allocate(int size);

mixed * allocate(int size, mixed init_value);

mixed * allocate(int *sizes);

mixed * allocate(int *sizes, mixed init_value);

/**
 * all_inventory
 *
 * Returns an array of the objects contained in the inventory of
 * ob, or of this_object(), if no arg given.
 *
 *
 */
object * all_inventory();

object * all_inventory(object ob);

/**
 * all_environment
 *
 * Returns an array with all environments object <o> is in. If <o> is
 * omitted, the environments of the current object is returned.
 * 
 * If <o> has no environment, or if <o> is destructed, 0 is returned.
 *
 * @example 
 * If o is a match in a matchbox which is in a box in a chest,
 * in a room, all_environment(o) will return
 * ({ matchbox, box, chest, room }).
 *
 * @since Introduced in LDMud 3.2.6, suggested by Tubmud.
 *
 */
object * all_environment();

object * all_environment(object o);

/**
 * add_action
 *
 * Set up a local function fun to be called when user input
 * matches the command cmd. Functions called by a user command
 * will get the arguments as a string. It must then return 0 if
 * it was the wrong command, otherwise 1.
 * 
 * If it was the wrong command, the parser will continue
 * searching for another command, until one returns 1 or give an
 * error message to the user.
 * 
 * For example, there can be a wand and a rod. Both of these
 * objects define as command "wave". One of them will be randomly
 * called first, and it must look at the argument, and match
 * against "wand" or "rod" respectively.
 * 
 * The function associated to a command will be called with a
 * string as argument which stands for the given words behind the
 * typed command. The verb entered can be retrieved using the
 * query_verb() efun and is always the first word in the input
 * line up to the first space.
 * 
 * Always have add_action() called only from an init() routine.
 * The object defining these commands must be present to the
 * user, either being the user, being carried by the user,
 * being the room around the user, or being an object in the
 * same room as the user. If the player leaves this vicinity of the
 * object, the actions are automatically removed.
 * 
 * Actions can also be removed on demand with the remove_actions() efun.
 * 
 * If argument <flag> is AA_SHORT (1), then the arguments may
 * follow the verb without separating space. Any arguments after
 * the first space are passed as argument string.
 * 
 * If argument <flag> is AA_NOSPACE (2), then again the arguments
 * may follow the verb without separating space. In contrast to
 * AA_SHORT, all characters following the verb are passed as
 * the argument string. However, note that the characters immediately
 * following the given verb are passed as argument AND as result
 * of query_verb().
 * 
 * If argument <flag> is AA_IMM_ARGS (3), then again the arguments
 * may follow the verb without separating space. All characters following
 * the given verb are passed as argument, and only as argument.
 * 
 * If argument <flag> is negative, the verb given by the player
 * has to match only the leading -<flag> characters of the verb <cmd>.
 * 
 * Never use one of the functions 'create' 'reset' 'init' 'exit'
 * 'heart_beat' etc as the first argument to add_action(). In
 * general, a function with a name defined in /doc/applied should
 * have the behaviour defined there.
 *
 * @example 
 * ```
 * add_action("GoInside", "enter");
 * ```
 * 
 * When typing "enter" the function GoInside() will be invoked.
 * ```
 * add_action("DisFunc", "dis", AA_SHORT);
 * ```
 * Whenever you type in a command which starts with "dis" the
 * function DisFunc() will be called. To get the real word which
 * was typed in (because until now you only know that it was a
 * command beginning with "dis") you have to call the efun
 * query_verb().
 * ```
 * add_action("DisFunc", "disconnect", AA_NOSPACE);
 * ```
 * The function DisFunc() will be called for all commands which
 * use "disconnect" or a shortened form like "di", "dis" or
 * "discon" as verb. The command 'disconnecting' will _not_
 * be recognized. To get the real word which was typed in
 * you have to call the efun query_verb().
 * 
 * ```
 * add_action("...", "cmd");
 * add_action("...", "xcmd", AA_SHORT);
 * add_action("...", "scmd", AA_NOSPACE);
 * add_action("...", "icmd", AA_IMM_ARGS);
 * ```
 * When given the following commands, the driver will parse it
 * as described below. 'verb' is what query_verb() would return,
 * 'arg' is what would be passed to the command function.
 * ```
 * "cmd"          -> verb "cmd",     arg 0
 * "cmd foo bar"  -> verb "cmd",     arg "foo bar"
 * 
 * "xcmd"         -> verb "xcmd",    arg 0
 * "xcmd foo"     -> verb "xcmd",    arg "foo"
 * "xcmdfoo"      -> verb "xcmdfoo", arg 0
 * "xcmd foo bar" -> verb "xcmd",    arg "foo bar"
 * "xcmdfoo bar"  -> verb "xcmdfoo", arg "bar"
 * 
 * "scmd"         -> verb "scmd",    arg 0
 * "scmd foo"     -> verb "scmd",    arg " foo"
 * "scmdfoo"      -> verb "scmdfoo", arg "foo"
 * "scmd foo bar" -> verb "scmd",    arg " foo bar"
 * "scmdfoo bar"  -> verb "scmdfoo", arg "foo bar"
 * 
 * "icmd"         -> verb "icmd",    arg 0
 * "icmd foo"     -> verb "icmd",    arg " foo"
 * "icmdfoo"      -> verb "icmd",    arg "foo"
 * "icmd foo bar" -> verb "icmd",    arg " foo bar"
 * "icmdfoo bar"  -> verb "icmd",    arg "foo bar"
 * ```
 * @since The flag < 0 argument was supported since 3.2@127, but not
        really implemented before LDMud 3.2.8.
        LDMud 3.2.9 introduced the AA_IMM_ARGS flag.
        LDMud 3.3 removed the historical add_action(fun) notation.
        Since LDMud 3.5 the function can be given as a closure.
 *
 */
void add_action(string|closure fun, string cmd);
void add_action(string|closure fun, string cmd, int flag);

/**
 * acos
 *
 * Returns the arcus cosine of the argument.
 *
 *
 */
float acos(float n);

/**
 * abs
 *
 * Returns the absolute value of the argument <arg>.
 *
 * @example 
 * ```
 * abs(-18)    // returns 18
 * abs(11)     // returns 11
 * abs(-1.974) // returns 1.974
 * ```
 *
 * @since Introduced in LDMud 3.2.6.
 *
 */
int   abs(int arg);

float abs(float arg);

