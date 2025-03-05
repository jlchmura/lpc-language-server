// obsolete.h

/**
 * valid_seteuid
 *
 * Should return 1 if ob is allowed to set its euid to newid.
 * Objects are always allowed to set their euid to 0.
 *
 *
 */
int valid_seteuid(object ob, string newid);

/**
 * tail
 *
 * Print out the tail of a file. There is no specific amount of
 * lines given to the output. Only a maximum of about 1000 bytes will
 * be printed.
 *
 * @deprecated Deprecated in LDMud 3.3.720.
        Removed in LDMud 3.5.0
 *
 */
void tail(string file);

/**
 * strlen
 *
 * Returns the length of the string str.
 * This efun is DEPRECATED and replaced by sizeof().
 * Please do not use it in new code and start to phase
 * it out in old code.
 *
 * @deprecated Removed in LDMud 3.5.0
 *
 */
int strlen(string str);

/**
 * start_mccp_compress
 *
 * This efun must be called inside an interactive player and starts
 * the compression of the driver -> client traffic.
 * 
 * Return non-zero on success, and 0 on failure.
 * 
 * <telopt> denotes the MCCP version and must be either TELOPT_COMPRESS2
 * or TELOPT_COMRESS from <telnet.h>.
 * 
 * The only exception is when the telnet machine is disabled: then
 * any value will do. This can be used with dedicated clients
 * which send text uncompressed but expect to receive it compressed
 * (Java clients using InflaterInputStream for example).
 * 
 * Available only if the driver is compiled with MCCP enabled;
 * __MCCP__ is defined in that case.
 *
 * @deprecated Added in LDMud 3.3.447, backported to LDMud 3.2.10.
        LDMud 3.3.666 added the possibility to enable outgoing compression
        when the telnet machine is enabled (not backported).
 *
 */
int start_mccp_compress(int telopt);

/**
 * slice_array
 *
 * Returns an array that is a slice of the array <arr> from the
 * index <from> to the index <to>.
 * 
 * This is the old notation for arr[from..to] and supported
 * only for hysterical raisins.
 * 
 * DO NOT USE THIS EFUN ANYMORE.
 *
 * @deprecated Removed in LDMud 3.3.
 *
 */
mixed *slice_array(mixed *array, int from, int to);

/**
 * seteuid
 *
 * Set effective uid to str. The calling object must be
 * privileged to do so by the master object. In most
 * installations it can always be set to the current uid of the
 * object, to the uid of the creator of the object file, or to 0.
 * 
 * Result is 0 the euid could not be changed, and non-0 if it
 * was changed.
 * 
 * When this value is 0, the current object's uid can be changed
 * by export_uid(), and only then.
 * 
 * If strict euid usage is enforced, objects with euid 0 cannot
 * load or clone other objects.
 *
 * @deprecated Since 3.2.1@47, this efun is availabe only when using euids.
        Since 3.2.7, this efun is always available.
 *
 */
int seteuid(string str);

/**
 * set_prompt
 *
 * Set the prompt given by the first argument for the interactive
 * object instead of the default prompt. If the second argument
 * is omitted, this_player() is used as default. The first arg
 * can be a string or a closure.
 * 
 * The result returned is the old prompt.
 * 
 * If the first arg is the number 0, the prompt is not changed,
 * just returned.
 *
 *
 */
string set_prompt(mixed prompt, object ob);

/**
 * set_modify_command
 *
 * All commands for the current object (that must obviously be
 * interactive) will be passed to ob->modify_command() before
 * actually being executed. The argument can be passed an object
 * or an object_name.
 * 
 * When set_modify_command() was called, the parser won't expand
 * the standard abbreviations n,e,s,w,nw,sw,ne,se for that user
 * anymore, nor use any hook set for this.
 * 
 * 0 as argument will stop the command modification and reinstall
 * the standard abbreviations.
 * -1 as argument will just return the object previously set.
 * 
 * The return value is the object that was previously set with
 * set_modify_command(), if any.
 * 
 * This mechanism is intended to expand aliases on quicktypers
 * or the like. The name of the lfun called can be changed
 * from modify_command() to something else using the
 * H_MODIFY_COMMAND_FNAME hook.
 *
 * @deprecated Up to 3.2.1@108 the lfun called was hardcoded as
        'modify_command'. The hook H_MODIFY_COMMAND_FNAME introduced
        in 3.2.1@109 allows to change the name.
 *
 */
object set_modify_command(object c);
object set_modify_command(string c);
object set_modify_command(int c);

/**
 * set_max_commands
 *
 * Set the max number of commands the interactive <obj> is
 * allowed to execute per second to <num>. A negative value means
 * 'unlimited' and is the setting for newly created connections.
 * 
 * If <obj> is not given, the current interactive is queried.
 * 
 * The function raises a privilege_violation ("set_max_commands",
 * obj, num).  If the privilege is denied, the call is ignored.
 * 
 * A 'command' in this context means every received data packet
 * which causes a LPC call - actions and calls to input_to()
 * alike.
 *
 * @example 
 * To establish a mud-wide default for the maximum command rate,
 * write master::connect() like this:
 * 
 * object connect() {
 * object obj;
 * 
 * ...
 * set_max_commands(100);
 * return obj;
 * }
 * 
 * Upon return from the the function, the connection with its
 * modified max_commands will be rebound from the master object
 * to the returned object.
 *
 * @deprecated Introduced in LDMud 3.2.10.
 *
 */
void set_max_commands(int num);

void set_max_commands(int num, object obj);

/**
 * set_limits
 *
 * Set the default runtime limits from the given arguments. The new
 * limits will be in effect as the initial 'max limits' with the
 * next execution thread.
 * 
 * The arguments can be given in two ways: as an array (like the one
 * returned from query_limits(), or as a list of tagged values.
 * The limit settings recognize three special values:
 * 
 * LIMIT_UNLIMITED: the limit is deactivated
 * LIMIT_KEEP:      the former setting is kept
 * LIMIT_DEFAULT:   the 'global' default setting is used.
 * 
 * For LIMIT_COST, the special values have these meaning:
 * LIMIT_UNLIMITED: at maximum 1 tick is accounted
 * LIMIT_KEEP:      LIMIT_COST is set to 0
 * LIMIT_DEFAULT:   LIMIT_COST is set to -100
 * 
 * The efun causes a privilege violation ("set_limits", current_object,
 * limits-array).
 *
 * @example 
 * set_limits(({ 200000 }))
 * set_limits(LIMIT_EVAL, 200000)
 * --> set new default eval_cost limit to 200000
 * 
 * set_limits(({ LIMIT_UNLIMITED, LIMIT_KEEP, 5000 }))
 * set_limits(LIMIT_EVAL, LIMIT_UNLIMITED, LIMIT_ARRAY, LIMIT_KEEP,
 * LIMIT_MAPPING, 5000)
 * --> set new eval_cost limit to unlimited, keep the current
 * array size limit, and limit mapping sizes to 5000.
 *
 * @deprecated Introduced in LDMud 3.2.7.
        LDMud 3.3.563 introduced LIMIT_COST.
        LDMud 3.3.677 introduced LIMIT_MAPPING_KEYS, LIMIT_MAPPING_SIZE.
        LDMud 3.5.0 introduced LIMIT_MEMORY.
 *
 */
void set_limits(int tag, varargs int value );
void set_limits(int *limits);

/**
 * set_light
 *
 * An object is by default dark. It can be set to not dark by
 * calling set_light(1). The environment will then also get this
 * light. The returned value is the total number of lights in
 * this room. So if you call set_light(0) it will return the
 * light level of the current object.
 * 
 * Note that the value of the argument is added to the light of
 * the current object.
 *
 *
 */
int set_light(int n);

/**
 * set_is_wizard
 *
 * Change object ob's wizardhood flag.
 * If n is 0, it is cleared, if n is, it is set, if n is -1 the
 * current status is reported. The return value is always the old
 * value of the flag. Using this function sets a flag in the
 * parser, that affects permissions for dumpallobj etc, which are
 * by default free for every user.
 *
 * @deprecated Since 3.2.7 this efun is optional.
 *
 */
int set_is_wizard(object ob, int n);

/**
 * set_heart_beat
 *
 * Enable or disable heart beat. The driver will apply the lfun
 * heart_beat() to the current object every __HEARTBEAT_INTERVAL__
 * seconds, if it is enabled. A shadow over the heart_beat() lfun
 * will be ignored.
 * 
 * If the heart beat is not needed for the moment, then do disable it.
 * This will reduce system overhead.
 * 
 * Return true for success, and false for failure.
 * 
 * Disabling an already disabled heart beat (and vice versa
 * enabling and enabled heart beat) counts as failure.
 * 
 * Note that heart_beat()s are called only if there are interactive
 * players in the game.
 *
 *
 */
int set_heart_beat(int flag);

/**
 * set_extra_wizinfo_size
 *
 * Indicate that the wizlist should contain an array of this size
 * with extra info foreach wizard. A negative value indicates
 * a non-array value.
 * 
 * Causes a privilege violation.
 * 
 * The value is only used to allocate a proper empty 'extra' value
 * for newly created wizlist entries.
 *
 *
 */
void set_extra_wizinfo_size(int i);

/**
 * set_connection_charset
 *
 * Set the set of characters that can be output to the
 * interactive user (this does not apply to binary_message()).
 * The function must be called by the interactive user object
 * itself.
 * 
 * The charset can be given either directly as a string, or
 * indirectly as a bitvector. If the charset is given as the
 * number 0, the default connection charset is re-established.
 * 
 * The bitvector is interpreted as an array of 8-bit-values and
 * might contain up to 32 elements. Character n is allowed to be
 * output if sizeof(bitvector) > n/8 && bitvector[n/8] & (1 << n%8) .
 * 
 * If quote_iac is 0 and char 255 is allowed to be output, IAC
 * will be output unmodified.
 * If quote_iac is 1 and char 255 is allowed to be output, char
 * 255 will be quoted so that it is not interpreted as IAC by the
 * telnet protocol. This is the default.
 *
 * @deprecated Introduced in 3.2.1@40.
        LDMud 3.2.8 added the ability to specify the charset as a string.
        LDMud 3.2.10 added the ability to reset the charset to the default.
 *
 */
void set_connection_charset(int *bitvector, int quote_iac);
void set_connection_charset(string charset, int quote_iac);
void set_connection_charset(int zero, int quote_iac);

/**
 * set_combine_charset
 *
 * Set the set of characters which can be combined into a single string
 * when already received en-bloc in charmode from the current interactive
 * user.
 * 
 * Non-combinable characters and single received characters are returned
 * as separate strings as usual. The function must be called with the
 * interactive user being the command giver.
 * 
 * The newline '\n' and the NUL character '\0' are always non-combinable.
 * 
 * The charset can be given either directly as a string, or indirectly
 * as a bitvector. If given as the number 0, the default combine
 * charset is re-established.
 * 
 * The bitvector is interpreted as an array of 8-bit-values and might
 * contain up to 32 elements. Character n is allowed to be output
 * if sizeof(bitvector) > n/8 && bitvector[n/8] & (1 << n%8) .
 *
 * @example 
 * // In a screen-oriented editor, most of the printable characters
 * // (excluding answers to editor prompts 'j', 'n' and 'q') can be
 * // combined into strings.
 * set_combine_charset("abcdefghijklmoprstuvwxz0123456789"
 * "ABCDEFGHIJKLMOPRSTUVWXZ");
 * 
 * // Disable any previous setting.
 * set_combine_charset("");
 *
 * @deprecated Introduced in LDMud 3.2.8.
        LDMud 3.2.10 added the ability to reset the charset to the default.
 *
 */
void set_combine_charset(int *bitvector);

void set_combine_charset(string charset);

varargs void set_combine_charset(int zero);

/**
 * set_buffer_size
 *
 * Changes the socket buffer size for this_interactive() to size,
 * up to a preconfigured maximum, result is the old buffer size
 * (or -1 on systems which aren't able to change the socket
 * buffer).
 * Modifying the buffer size may result in a better IO
 * throughput, but can also worsen it.
 *
 * @deprecated Introduced in 3.2.1@34
 *
 */
int set_buffer_size(int size);

/**
 * set_auto_include_string
 *
 * The arg will be automatically included into every compiled LPC
 * object. This is useful to enforce global definitions, e.g.
 * ``#pragma rtt_checks'' or ``#pragma strict_types''.  The
 * calling object needs to be privileged by the master object.
 * 
 * Note that the auto-include-string is cleared when the master
 * object is reloaded.
 *
 * @deprecated LDMud 3.2.9 replaced this efun with driver hook H_AUTO_INCLUDE.
          This old version is available if the driver is compiled
          with USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
void set_auto_include_string (string arg);

/**
 * send_imp
 *
 * Sends The message in an UDP packet to the given host and port
 * number.
 * 
 * The message can be given either as string, or as array of
 * bytes. The latter variant allows to send binary data as well.
 * 
 * The efun causes a privilege violation. If USE_DEPRECATED is in effect,
 * it first tries privilege violation ("send_imp"), and, if this one
 * returns 0, then it tries privilege violation ("send_udp").
 * If USE_DEPRECATED is not in effect, it just tries privilege
 * violation ("send_udp").
 * 
 * Returns 1 on success, 0 on failure.
 * 
 * Note: On some machines a failed send_imp() will not be registered
 * until the next send_imp() - the latter one might return '0' even
 * if itself was successful.
 *
 * @deprecated LDMud 3.2.9 renamed this efun to send_udp(), and also changed the
          privilege violation string and the apply names. This old version
          is available if the driver is compiled with USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
int send_imp(string host, int port, string message);

int send_imp(string host, int port, int * message);

/**
 * rxcache.doc
 *
 * 
 *
 * @deprecated Fully integrated into the driver with the 3.2 line.
 *
 */
/**
 * receive_imp
 *
 * Handle a received IMP message.
 * 
 * This function is called for every message received on the IMP
 * port. Usually it is passed on to some object that handles
 * inter mud communications.
 * 
 * The driver first calls receive_udp(). If that method doesn't exist
 * and if the driver is compiled with USE_DEPRECATED, it will then
 * call receive_imp().
 *
 * @deprecated The 'hostport' argument was added in 3.2.1.
        LDMud 3.2.9 renamed this method to receive_udp(); this old version
        is supported if the driver is compiled with USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
void receive_imp(string host, string msg, int hostport);

/**
 * query_udp_port
 *
 * Returns the port number of the UDP socket.
 *
 * @deprecated LDMud 3.2.9 renamed this efun from query_imp_port().
 *
 */
int query_udp_port(void);

/**
 * query_snoop
 *
 * Returns the user who currently snoops victim. The calling
 * object must be privileged by the master object.
 *
 *
 */
object query_snoop(object victim);

/**
 * query_shadowing
 *
 * The function returns the object which <obj> is currently
 * shadowing, or 0 if <obj> is not a shadow.
 *
 * @deprecated Introduced in 3.2.1@73.
 *
 */
object query_shadowing (object obj);

/**
 * query_once_interactive
 *
 * True if the object is or once was interactive.
 *
 * @returns {ob is __LPC_CONFIG_LIBFILES_PLAYER} 1 if ob is or once was interactive, 0 otherwise.
 */
int query_once_interactive(object ob);

/**
 * query_mud_port
 *
 * Returns the port number the parser uses for user connections.
 * 
 * If no argument is given, the port for this_player() is
 * returned. If this_player() is not existing or not interactive,
 * the first port number open for connections is returned.
 * 
 * If an user object is given, the port used for its connection
 * is returned.
 * If a positive number is given, the <num>th port number the
 * parser uses for connections is returned (given that there are
 * that many ports).
 * If -1 is given, the number of ports open for connections is
 * returned.
 *
 *
 */
int query_mud_port(void);

int query_mud_port(object user);

int query_mud_port(int num);

/**
 * query_mccp_stats
 *
 * This efun gives you statistics about current compression
 * of the player ( default this_player() ).
 * 
 * You get an array with ({ uncompressed bytes , compressed bytes }).
 * If the connection is not compressed it returns 0.
 * 
 * It raises an error on not-interactive objects.
 * 
 * Available only if the driver is compiled with MCCP enabled;
 * __MCCP__ is defined in that case.
 *
 * @deprecated Added in LDMud 3.3.447, backported to LDMud 3.2.10.
 *
 */
int * query_mccp_stats();

int * query_mccp_stats(object player);

/**
 * query_mccp
 *
 * This efun returns current whether the client uses compression
 * or not ( default this_player() ).
 *
 * @deprecated Added in LDMud 3.3.447, backported to LDMud 3.2.10.
 *
 */
int query_mccp();

int query_mccp(object player);

/**
 * query_load_average
 *
 * Returns the load of the mud. Two figures are given, executed
 * commands/second and compiled lines/second.
 *
 *
 */
string query_load_average(void);

/**
 * query_limits
 *
 * Return an array with the current runtime limits, resp. if <defaults>
 * is true, the default runtime limits. The entries in the returned
 * array are:
 * 
 * int[LIMIT_EVAL]:    the max number of eval costs
 * int[LIMIT_ARRAY]:   the max number of array entries
 * int[LIMIT_MAPPING_SIZE]: the max number of mapping values
 * int[LIMIT_MAPPING_KEYS]: the max number of mapping entries
 * (LIMIT_MAPPING is an alias for LIMIT_MAPPING_KEYS)
 * int[LIMIT_BYTE]:    the max number of bytes handled with
 * one read_bytes()/write_bytes() call.
 * int[LIMIT_FILE]:    the max number of bytes handled with
 * one read_file()/write_file() call.
 * int[LIMIT_CALLOUTS]: the number of callouts at one time.
 * int[LIMIT_COST]:    how to account the current cost.
 * int[LIMIT_MEMROY]:  the max. number of bytes which can be
 * _additionally_ allocated/used
 * _per top-level execution thread_
 * 
 * For all limits except LIMIT_COST a limit of '0' aka LIMIT_UNLIMITED
 * means 'no limit'.
 * 
 * The value for LIMIT_COST has these meanings:
 * 
 * value > 0: the execution will cost minimum(<value>, actual cost) .
 * 
 * value = 0: if the current LIMIT_EVAL is larger than the calling
 * LIMIT_EVAL, the evaluation will cost only 10; otherwise
 * the full cost will be accounted.
 * 
 * value < 0: (-value)% of the current evaluation cost will be
 * accounted; -100 obviously means 'full cost'.
 *
 * @example 
 * query_limits()
 * --> returns the current runtime limits
 * 
 * query_limits(1)
 * --> returns the default runtime limits
 *
 * @deprecated Introduced in LDMud 3.2.7.
        LIMIT_CALLOUTS introduced in LDMud 3.2.9.
        LIMIT_COST introduced in LDMud 3.3.563.
        LDMud 3.3.677 introduced LIMIT_MAPPING_KEYS, LIMIT_MAPPING_SIZE.
        LDMud 3.5.0 introduced LIMIT_MEMORY.
 *
 */
int * query_limits();
int * query_limits(int d);

/**
 * query_ip_number
 *
 * Give the ip-number for the current user or the optional
 * argument ob.
 * 
 * If ob is given as reference (and it must be a valid object then),
 * it will upon return be set to the struct sockaddr_in of the queried
 * object, represented by an array of integers, one integer per
 * address byte:
 * ob[0.. 1]: sin_family
 * ob[2.. 3]: sin_port
 * ob[4.. 7]: sin_addr
 * ob[8..15]: undefined.
 *
 * @deprecated The return of the struct sockaddr_in was introduced in 3.2.1@81.
 *
 */
string query_ip_number(object  ob);

string query_ip_number(mixed & ob);

/**
 * query_ip_name
 *
 * Give the ip-name for user the current user or for the
 * optional argument ob. An asynchronous process 'hname' is used
 * to find out these names in parallel. If there are any failures
 * to find the ip-name, then the ip-number is returned instead.
 *
 *
 */
string query_ip_name(object ob);

/**
 * query_input_pending
 *
 * If ob is interactive and currently has an input_to() pending,
 * the object that has called the input_to() is returned,
 * else 0.
 *
 *
 */
object query_input_pending(object ob);

/**
 * query_imp_port
 *
 * Returns the port number that is used for the inter mud
 * protocol.
 *
 * @deprecated LDMud 3.2.9 renamed this efun to query_udp_port(). This version
        is available if the driver is compiled with USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
int query_imp_port(void);

/**
 * query_idle
 *
 * Query how many seconds an interactive object <ob> has been idle.
 * If <ob> is not an interactive object an error will be thrown.
 *
 *
 */
int query_idle(object ob);

/**
 * query_editing
 *
 * Returns 1 if the ob is interactive and currently editing
 * with ed(). If ed() was called with a function name as
 * second argument, the object where ed() was called is returned,
 * else 0.
 *
 *
 */
mixed query_editing(object ob);

/**
 * parse_command
 *
 * parse_command() is basically a spiffed up sscanf operating on
 * word basis and targeted at recognizing object descriptions
 * from command strings.
 * 
 * The efun takes the command string <cmd> and the object(s)
 * <env>/<arr> and tries to match it against the format string
 * <fmt>. Successfully matched elements are assigned to the
 * variables <var>.... The result from the efun is 1 if the
 * command could be fully matched, and 0 otherwise.
 * 
 * If the objects are given as a single object <env>, the efun
 * matches against the given object and all objects contained
 * therein. Otherwise, if the objects are given as an array <arr>
 * of objects, the efun matches only against the given objects.
 * 
 * If <env> is 0, environment(this_player()) is used as default.
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
 * The implementation of parse_command() differs between compat
 * mode and non-compat mode drivers mainly in how the efun
 * retrieves the necessary information from the mudlib objects.
 *
 * @deprecated LDMud 3.3.258 removed the compat-mode parse_command().
 *
 */
int parse_command (string cmd, object  env, string fmt, varargs mixed &var );
int parse_command (string cmd, object* arr, string fmt, varargs mixed &var );

/**
 * order_alist
 *
 * Creates an alist.
 * 
 * Either takes an array containing keys, and others containing
 * the associated data, where all arrays are to be of the same
 * length, or takes a single array that contains as first member
 * the array of keys and has an arbitrary number of other members
 * containing data, each of wich has to be of the same length as
 * the key array. Returns an array holding the sorted key array
 * and the data arrays; the same permutation that is applied to
 * the key array is applied to all data arrays.
 * 
 * Complexity is O(n * lg(n) + n * m), where n is the number of
 * elements in the key array and m is the number of data arrays + 1.
 * 
 * Note that the dimensions of the arrays are used the other
 * way than in lisp to allow for faster searching.
 * 
 * Keys have to be of type integer, string or object. Types can
 * be mixed.
 * 
 * The function is available only if the driver is compiled with
 * alist support. In that case, __ALISTS__ is defined.
 *
 * @deprecated LDMud 3.3 made this an optional efun.
 *
 */
mixed * order_alist(mixed *keys,varargs mixed *|void data );

/**
 * obsolete
 *
 * This directory contains descriptions for features removed from
 * the game driver, since they can come in handy when reworking
 * old LPC code.
 *
 *
 */

/**
 * member_array
 *
 * Returns the index of the first occurence of item in array arr,
 * or occurence of a character in a string. If not found, then -1
 * is returned.
 * 
 * If you want to search through an alist, use assoc() because
 * member_array() is good for unsorted but assoc() is faster for
 * sorted arrays.
 *
 * @deprecated Superseeded by member().
        Removed in LDMud 3.3.
 *
 */
int member_array(mixed item, mixed *arr);

int member_array(mixed item, string arr);

/**
 * mapping_contains
 *
 * If the mapping contains the key map, the corresponding values
 * are assigned to the data arguments, which massed be passed by
 * reference, and 1 is returned. If key is not in map, 0 is
 * returned and the data args are left unchanged.
 * It is possible to use this function for a 0-value mapping, in
 * which case it has the same effect as member(E).
 *
 * @deprecated Renamed to 'm_contains()' in LDMud 3.2.6.
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
int mapping_contains(varargs mixed &data1, map, key);

/**
 * map_mapping
 *
 * ob->func() is called resp. cl applied to every element in the mapping,
 * with the key of the element as first argument, and then the extra args
 * that were given to map_mapping (these args must not be protected
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
 * map_array().
 *
 * @deprecated In LDMud 3.2.6 renamed to map_indices().
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
mapping map_mapping(mapping m, string func, varargs string|object ob );

mapping map_mapping(mapping m, varargs closure cl );

/**
 * map_array
 *
 * Returns an array holding the items of arr mapped through
 * ob->fun(element, extra) resp. the closure cl. The function fun
 * in ob is called for each element in arr with that element as
 * parameter. A second parameter extra is sent in each call if
 * given. ob can be an object or a string. Principal function:
 * 
 * foreach (index) arr[index] = ob->fun(arr[index],extra);
 * 
 * The value returned by ob->fun(array[index],extra) replaces the
 * existing element in the array. If arr is not an array, then 0
 * will be returned.
 * 
 * The extra argument is optional and must not be a protected reference
 * like &(i[0]). If <ob> is omitted, or neither a string nor an object,
 * it defaults to this_object().
 *
 * @deprecated Since LDMud 3.2.6 obsoleted by map().
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
mixed *map_array(mixed *arr, string fun, string|object ob, mixed extra);

mixed *map_array(mixed *arr, closure cl, mixed extra);

/**
 * m_sizeof
 *
 * Returns the number of indices in mapping 'map'.
 * This function is in fact an alias for sizeof().
 *
 * @deprecated Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
int m_sizeof(mapping map);

/**
 * intersect_alist
 *
 * Does a fast set intersection on alist key vectors (NOT on full alists!).
 * The operator '&' does set intersection on arrays in general.
 * 
 * The function is available only if the driver is compiled with
 * alist support. In that case, __ALISTS__ is defined.
 *
 * @example 
 * new_list = intersect_alist(list1, list2);
 *
 * @deprecated LDMud 3.3 made this an optional efun.
 *
 */
mixed * intersect_alist(mixed * list1, mixed * list2);

/**
 * insert_alist
 *
 * 1. Form: Alist Insertion
 * 
 * The <key> and all following <data> values are inserted
 * into the <alist>. If an entry for <key> already exists
 * in the list, just the data values are replaced. The number
 * of <data> values must match the number of data arrays
 * in the alist, naturally.
 * 
 * Result is the updated <alist>.
 * 
 * 2. Form: Key Insertion
 * 
 * Insert the <key> into the (ordered) array of <keys>, so that
 * subsequent assoc()s can perform quick lookups. Result is the
 * index at which <key> was inserted (or already found).
 * 
 * CAVEAT: when working with string keys, the index might no longer
 * be valid after the next call to insert_alist().
 * 
 * Complexity: O(lg(n) + a*n) where n is the number of keys and
 * s is a very small constant (for block move);
 * 
 * The function is available only if the driver is compiled with
 * alist support. In that case, __ALISTS__ is defined.
 *
 * @deprecated LDMud 3.3 made this an optional efun.
 *
 */
mixed * insert_alist(mixed key, varargs mixed data, mixed * alist);
int     insert_alist(mixed key, mixed * keys);

/**
 * initialisation
 *
 * There are two different flavours of initialisations, selectable
 * in config.h :
 * 
 * i)  #undef INITIALIZATION_BY___INIT
 * ------------------------------------
 * Initialisation is done at compile time. This is fast and costs
 * no extra code in the program.
 * Allowed expressions currently include integer literals,
 * string literals, integer operators, string addition, bracketing,
 * array constructors, the empty mapping and structs.
 * When an object with initialised variables is cloned or inherited,
 * all initialised variables are copied from the blueprint.
 * A special application of this feature is to have an initialised
 * non-empty array or a mapping; it will be shared by all clones or
 * inheriting objects unless an assignment to the variable -
 * as opposed to an assignment to an element of the array/mapping -
 * is done in all clones etc.
 * To prevent unauthorised changes in initialised arrays/mappings,
 * you can declare the variables as private or use
 * a nomask reset/create that checks for undesired inheritance.
 * 
 * ii) #define INITIALIZATION_BY___INIT
 * -------------------------------------
 * Creates a function names __INIT() from all variable
 * initialisations and from calls to __INIT() in all inherited
 * objects, and runs this function at object creation time.
 * Any efun can be used in the expressions for variable
 * initialisations, even ones with severe side effects, like
 * destruct() or shutdown().  The code created for __INIT() is
 * a little worse than a medium-skilled lpc-programmer would
 * generate, because it is scattered all over the program.
 *
 * @deprecated Since LDMud 3.3, order_alist() is no longer accepted without
          INITIALIZATION_BY___INIT.
        LDMud 3.3.378 replaced this static choice of initialisation
          methods by compile-time pragmas.
 *
 */
/**
 * get_root_uid
 *
 * Return the string to be used as root-uid.
 * Under !native, the function is expendable.
 *
 * @deprecated In 3.2.1@40, get_root_uid() was renamed to get_master_uid()
        and recieved a new semantic.
 *
 */
string get_root_uid(void);

/**
 * get_max_commands
 *
 * Return the max number of commands the interactive <obj> is
 * allowed to execute per second. A negative result means
 * 'unlimited'.
 * 
 * If <obj> is not given, the current interactive is queried.
 * For non-interactive objects the result is 0.
 * 
 * A 'command' in this context means every received data packet
 * which causes a LPC call - actions and calls to input_to()
 * alike.
 *
 * @deprecated Introduced in LDMud 3.2.10.
 *
 */
int get_max_commands();

int get_max_commands(object obj);

/**
 * get_connection_charset
 *
 * Return the connection charset of the current interactive in the form
 * requested by <mode>:
 * <mode> == CHARSET_VECTOR: return as bitvector
 * <mode> == CHARSET_STRING: return as string
 * 
 * Alternatively, the status of the IAC quoting can be queried:
 * <mode> == CHARSET_QUOTE_IAC:
 * Return 0 if IACs are not quoted, return 1 if they are.
 * 
 * The bitvector is interpreted as an array of 8-bit-values and might
 * contain up to 32 elements. Character n is "combinable"
 * if sizeof(bitvector) > n/8 && bitvector[n/8] & (1 << n%8) .
 * 
 * If there is no current interactive, the function returns 0.
 *
 * @deprecated Introduced in LDMud 3.2.10.
 *
 */
mixed get_connection_charset(int mode);

/**
 * get_combine_charset
 *
 * Return the combine charset of the current interactive in the form
 * requested by <mode>:
 * <mode> == CHARSET_VECTOR: return as bitvector
 * <mode> == CHARSET_STRING: return as string
 * 
 * The bitvector is interpreted as an array of 8-bit-values and might
 * contain up to 32 elements. Character n is "combinable"
 * if sizeof(bitvector) > n/8 && bitvector[n/8] & (1 << n%8) .
 * 
 * If there is no current interactive, the function returns 0.
 *
 * @deprecated Introduced in LDMud 3.2.10.
 *
 */
mixed get_combine_charset(int mode);

/**
 * filter_mapping
 *
 * ob->func() is called resp. cl applied to every element in the
 * mapping, with first argument being the key of the
 * element, and then the extra args that were given to
 * filter_mapping (these args must not be protected references like
 * &(i[0]). If the function returns true, the element is
 * element, and then the extra args that were given to
 * added to the result mapping. ob can also be a file_name of an
 * object.
 * 
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 *
 * @deprecated In LDMud 3.2.6 renamed to filter_indices().
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
mapping filter_mapping(mapping m, string func, varargs string|object ob );
mapping filter_mapping(mapping m, varargs closure cl );

/**
 * filter_array
 *
 * Returns an array holding the items of arr filtered through
 * ob->fun(element, extra, ...), the closure cl, or the mapping map.
 * The function 'fun' in 'ob' resp. the closure 'cl' is called
 * for each element in arr with that element as parameter. The
 * extra and following parameters are in each call if given.
 * The mapping 'map' is likewise indexed by each element.
 * If ob->fun(arr[index], extra) returns != 0 resp.
 * map[arr[index]] exists, the element is included in the
 * returned array.
 * 
 * If arr is not an array, an error occurs.
 * 
 * The extra argument(s) are optional and must not be protected
 * references like &(i[0]).
 * If <ob> is omitted, or neither a string nor an object, it
 * defaults to this_object().
 * 
 * Since 3.2.1@36, the second arg can also be a mapping. Then
 * only the elements of the array which belong to the map (as
 * keys) will be returned (i.e. map[arr[index]] != 0).
 *
 * @deprecated Since LDMud 3.2.6 obsoleted by efun filter().
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3 .
 *
 */
mixed *filter_array(mixed *arr, string fun, string|object ob, varargs mixed extra );
mixed *filter_array(mixed *arr, closure cl, varargs mixed extra );
mixed *filter_array(mixed *arr, mapping map, varargs mixed extra );

/**
 * file_name
 *
 * Get the name of an object <ob> or, if no argument is given, of
 * the current object.
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
 * find_object(file_name(ob)) == ob
 * 
 * This is guaranteed to be true for all objects ob that are not
 * destructed.
 *
 * @deprecated In LDMud 3.2.6 renamed to object_name(), this old name is
        available as alias.
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3 .
 *
 */
string file_name();

string file_name(object ob);

/**
 * extract
 *
 * Extract a substring from a string.
 * This is the old notation for str[from..to] and supported
 * only for hysterical raisins.
 * 
 * DO NOT USE THIS EFUN ANYMORE.
 *
 * @deprecated Removed in LDMud 3.3.
 *
 */
string extract(string str, int from, int to);

string extract(string str, int from);

/**
 * export_uid
 *
 * Set the uid of object ob to the current object's effective uid.
 * It is only possible when object ob has an effective uid of 0.
 *
 * @deprecated Since 3.2.1@47, this efun is availabe only when using euids.
        Since 3.2.7, this efun is always available.
 *
 */
void export_uid(object ob);

/**
 * end_mccp_compress
 *
 * This efun must be called inside an interactive player and stops
 * the compression of the driver -> client traffic.
 * 
 * Returns non-zero on success, and zero on a failure.
 * 
 * Available only if the driver is compiled with MCCP enabled;
 * __MCCP__ is defined in that case.
 *
 * @deprecated Added in LDMud 3.3.447, backported to LDMud 3.2.10.
 *
 */
int end_mccp_compress();

/**
 * enable_telnet
 *
 * Enable or disable the telnet machine for the interactive object <obj>.
 * Return the previous state of the telnet machine as result.
 * 
 * <num> > 0 : enable telnet machine (default)
 * = 0 : disable telnet machine
 * < 0 : just query the current state of the telnet machine.
 * <obj> : the interactive object, default is the current interactive.
 * For non-interactive objects the function raises an error.
 * 
 * The function raises a privilege_violation ("enable_telnet", obj, num)
 * if <num> is >= 0. If the privilege is denied, the call is ignored.
 * 
 * WARNING: Careless use of this efun can cause great confusion for both
 * driver and clients! The efun exists mainly to support PSYCmuve, and
 * may vanish if a more consistent way of handling network connections
 * is introduced.
 *
 * @deprecated Introduced in LDMud 3.2.10.
 *
 */
int enable_telnet(int num);

int enable_telnet(int num, object obj);

/**
 * enable_commands
 *
 * Enable this object to use commands normally accessible to
 * users. This also marks the current object as "living".
 * 
 * Avoid to call this function from other places then from inside
 * create() (or reset(0) in compat mode), because the command
 * giver will be set to this object.
 *
 * @example 
 * void create() {
 * enable_commands();
 * set_living_name("dummymonster");
 * }
 * 
 * This will make the current object a living object which then
 * can be accessed via find_living("dummymonster").
 *
 *
 */
void enable_commands();

/**
 * efun308
 *
 * The item is moved into its new environment env, which may be 0.
 * This efun is to be used in the move_object() hook, as it does
 * nothing else than moving the item - no calls to init() or such.
 * 
 * Don't use it in your own objects!
 *
 * @deprecated Introduced in 3.2.1@1, renamed to 'set_environment()' in LDMud 3.2.6.
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3 .
 *
 */
void efun308(object item, object env);

/**
 * disable_commands
 *
 * Disable this object to use commands normally accessible to
 * users.
 * 
 * This is the opposite to the efun enable_commands().
 *
 *
 */
void disable_commands();

/**
 * define_include_dirs
 *
 * Return an array of string patterns giving the absolut paths
 * where to search an include file. The patterns have to have a
 * %s at the place where the name given in the #include statement
 * has to be inserted.
 *
 * @deprecated Dropped in 3.2.1, replaced by H_INCLUDE_DIRS hook.
 *
 */
string *define_include_dirs(void);

/**
 * debug_info
 *
 * Gather some driver internal debug information according
 * to the setting of flag:
 * 
 * DINFO_OBJECT (0): Information like heart_beat, enable_commands
 * etc. of the specified object will be printed, and 0 returned.
 * 
 * DINFO_MEMORY (1): Memory usage information like how many strings,
 * variables, inherited files, object size etc. will be printed
 * about the specified object, and 0 returned.
 * 
 * DINFO_OBJLIST (2): Objects from the global object list are
 * returned.  If the optional second arg is omitted, the first
 * element (numbered 0) is returned. If the second arg is a
 * number n, the n'th element of the object list returned. If the
 * second arg is an object, it's successor in the object list is
 * returned.  If the optional <arg2> is omitted, the first
 * element(s) (numbered 0) is returned. If the <arg2> is a
 * number n, the n'th element(s) of the object list returned. If the
 * <arg2> is an object, it's successor(s) in the object list is
 * The optional <arg3> specifies the maximum number of objects
 * returned. If it's 0, a single object is returned. If it is
 * a positive number m, an array with at max 'm' objects is
 * returned. This way, by passing __INT_MAX__ as <arg3> it is
 * possible to create an array of all objects in the game
 * (given a suitable maximum array size).
 * 
 * DINFO_MALLOC (3): Equivalent to typing ``malloc'' at the command
 * line. No second arg must be given. Returns 0.
 * 
 * DINFO_STATUS (4): Collect the status information of the driver.
 * The optional second arg can be 0, "tables", "swap", "malloc",
 * "malloc extstats" or any other argument accepted by the actual
 * driver.  The result is a printable string with the status
 * information, or 0 if an invalid argument was given.
 * 
 * DINFO_DUMP (5): Dump the information specified by <arg2> into the
 * filename specified by <arg3>. If <arg3> is omitted, a default
 * file name is used. The function calls master->valid_write() to
 * check that it can write the files. The file in question is
 * always written anew.
 * 
 * Result is 1 on success, or 0 if an error occurred.
 * 
 * <arg2> == "objects": dump information about all live objects.
 * Default filename is '/OBJ_DUMP', the valid_write() will read
 * 'objdump' for the function.
 * 
 * For every object, a line is written into the file with the
 * following information in the given order:
 * - object name
 * - size in memory, shared data counted only once
 * - size in memory if data wouldn't be shared
 * - number of references
 * - 'HB' if the object has a heartbeat, nothing if not.
 * - the name of the environment, or '--' if the object has no
 * environment
 * - in parentheses the number of execution ticks spent in this
 * object
 * - the swap status:
 * nothing if not swapped,
 * 'PROG SWAPPED' if only the program is swapped
 * 'VAR SWAPPED' if only the variabes are swapped
 * 'SWAPPED' if both program and variables are swapped
 * - the time the object was created
 * 
 * <arg2> == "destructed": dump information about all destructed
 * objects.  Default filename is '/DEST_OBJ_DUMP', the
 * valid_write() will read 'objdump' for the function.
 * 
 * For every object, a line is written into the file with the
 * following information in the given order:
 * - object name
 * - number of references
 * - 'NEW' if the object was destructed in this executiong
 * thread, nothing if it is older already.
 * 
 * <arg2> == "opcodes": dump usage information about the opcodes.
 * Default filename is '/OPC_DUMP', the valid_write() will read
 * 'opcdump' for the function.
 * 
 * <arg2> == "memory": dump a list of all allocated memory
 * blocks (if the allocator supports this).
 * Default filename is '/MEMORY_DUMP', the valid_write()
 * will read 'memdump' for the function, and the new data
 * will be appended to the end of the file.
 * 
 * If the allocator doesn't support memory dumps, this call will
 * always return 0, and nothing will be written.
 * 
 * This works best if the allocator is compiled with
 * MALLOC_TRACE and/or MALLOC_LPC_TRACE.
 * 
 * NOTE: Make sure that this option can't be abused!
 * 
 * 
 * DINFO_DATA (6): Return raw information about an aspect of
 * the driver specified by <arg2>. The result of the function
 * is an array with the information, or 0 for unsupported values
 * of <arg2>.
 * 
 * If <arg3> is given and in the range of array indices
 * for the given <arg2>, the result will be just the indexed array
 * entry, but not the full array.
 * 
 * Allowed values for <arg2> are: DID_STATUS, DID_SWAP, DID_MALLOC.
 * 
 * <arg2> == DID_STATUS (0): Returns the "status" and "status tables"
 * information. Following indices are defined:
 * 
 * int DID_ST_BOOT_TIME
 * The time() when the mud was started.
 * 
 * int DID_ST_ACTIONS
 * int DID_ST_ACTIONS_SIZE
 * Number and size of allocated actions.
 * 
 * int DID_ST_SHADOWS
 * int DID_ST_SHADOWS_SIZE
 * Number and size of allocated shadows.
 * 
 * int DID_ST_OBJECTS
 * int DID_ST_OBJECTS_SIZE
 * Total number and size of objects.
 * 
 * int DID_ST_OBJECTS_SWAPPED
 * int DID_ST_OBJECTS_SWAP_SIZE
 * Number and size of swapped-out object variable blocks.
 * 
 * int DID_ST_OBJECTS_LIST
 * Number of objects in the object list.
 * 
 * int DID_ST_OBJECTS_NEWLY_DEST
 * Number of newly destructed objects (ie. objects destructed
 * in this execution thread).
 * 
 * int DID_ST_OBJECTS_DESTRUCTED
 * Number of destructed but still referenced objects, not
 * counting the DID_ST_OBJECTS_NEWLY_DEST.
 * 
 * int DID_ST_OBJECTS_PROCESSED
 * Number of listed objects processed in the last backend
 * cycle.
 * 
 * float DID_ST_OBJECTS_AVG_PROC
 * Average number of objects processed each cycle, expressed
 * as percentage (0..1.0).
 * 
 * int DID_ST_OTABLE
 * Number of objects listed in the object table.
 * 
 * int DID_ST_OTABLE_SLOTS
 * Number of hash slots provided by the object table.
 * 
 * int DID_ST_OTABLE_SIZE
 * Size occupied by the object table.
 * 
 * int DID_ST_HBEAT_OBJS
 * Number of objects with a heartbeat.
 * 
 * int DID_ST_HBEAT_CALLS
 * Number of active heart_beat cycles executed so far
 * (ie. cycles in which at least one heart_beat() function
 * was called).
 * 
 * int DID_ST_HBEAT_CALLS_TOTAL
 * Total number of heart_beats cycles so far.
 * 
 * int DID_ST_HBEAT_SLOTS
 * int DID_ST_HBEAT_SIZE
 * Number of allocated entries in the heart_beat table
 * and its size.
 * 
 * int DID_ST_HBEAT_PROCESSED
 * Number of heart_beats called in the last backend cycle.
 * 
 * float DID_ST_HBEAT_AVG_PROC
 * Average number of heart_beats called each cycle, expressed
 * as fraction (0..1.0).
 * 
 * int DID_ST_CALLOUTS
 * int DID_ST_CALLOUT_SIZE
 * Number and total size of pending call_outs.
 * 
 * int DID_ST_ARRAYS
 * int DID_ST_ARRAYS_SIZE
 * Number and size of all arrays.
 * 
 * int DID_ST_MAPPINGS
 * int DID_ST_MAPPINGS_SIZE
 * Number and size of all mappings.
 * 
 * int DID_ST_HYBRID_MAPPINGS
 * int DID_ST_HASH_MAPPINGS
 * Number of hybrid (hash+condensed) and hash mappings.
 * 
 * int DID_ST_STRUCTS
 * int DID_ST_STRUCTS_SIZE
 * Number and size of all struct instances.
 * 
 * int DID_ST_STRUCT_TYPES
 * int DID_ST_STRUCT_TYPES_SIZE
 * Number and size of all struct type instances.
 * 
 * int DID_ST_PROGS
 * int DID_ST_PROGS_SIZE
 * Number and size of all programs.
 * 
 * int DID_ST_PROGS_SWAPPED
 * int DID_ST_PROGS_SWAP_SIZE
 * Number and size of swapped-out programs.
 * 
 * int DID_ST_USER_RESERVE
 * int DID_ST_MASTER_RESERVE
 * int DID_ST_SYSTEM_RESERVE
 * Current sizes of the three memory reserves.
 * 
 * int DID_ST_ADD_MESSAGE
 * int DID_ST_PACKETS
 * int DID_ST_PACKET_SIZE
 * Number of calls to add_message(), number and total size
 * of sent packets.
 * If the driver is not compiled with COMM_STAT, all three
 * values are returned as -1.
 * 
 * int DID_ST_PACKETS_IN
 * int DID_ST_PACKET_SIZE_IN
 * Number and total size of received packets.
 * If the driver is not compiled with COMM_STAT, all three
 * values are returned as -1.
 * 
 * int DID_ST_APPLY
 * int DID_ST_APPLY_HITS
 * Number of calls to apply_low(), and how many of these
 * were cache hits.
 * If the driver is not compiled with APPLY_CACHE_STAT, all two
 * values are returned as -1.
 * 
 * int DID_ST_STRINGS
 * int DID_ST_STRING_SIZE
 * Total number and size of string requests.
 * 
 * int DID_ST_STR_TABLE_SIZE
 * Size of the string table structure itself.
 * 
 * int DID_ST_STR_OVERHEAD
 * Size of the overhead per string.
 * 
 * int DID_ST_UNTABLED
 * int DID_ST_UNTABLED_SIZE
 * Total number and size of existing untabled strings.
 * 
 * int DID_ST_TABLED
 * int DID_ST_TABLED_SIZE
 * Total number and size of existing directly tabled strings.
 * 
 * int DID_ST_STR_CHAINS
 * Number of hash chains in the string table.
 * 
 * int DID_ST_STR_ADDED
 * Number of distinct strings added to the table so far.
 * 
 * int DID_ST_STR_DELETED
 * Number of distinct strings removed from the table so far.
 * 
 * int DID_ST_STR_COLLISIONS
 * Number of distinct strings added to an existing hash chain
 * so far.
 * 
 * int DID_ST_STR_SEARCHES
 * int DID_ST_STR_SEARCHLEN
 * Number and accumulated length of string searches by address.
 * 
 * int DID_ST_STR_SEARCHES_BYVALUE
 * int DID_ST_STR_SEARCHLEN_BYVALUE
 * Number and accumulated length of string searches by value.
 * 
 * int DID_ST_STR_FOUND
 * int DID_ST_STR_FOUND_BYVALUE
 * Number of successful searches by address resp. by value.
 * 
 * int DID_ST_RX_CACHED
 * Number of regular expressions cached.
 * 
 * int DID_ST_RX_TABLE
 * int DID_ST_RX_TABLE_SIZE
 * Number of slots in the regexp cache table, and size of the
 * memory currently held by it and the cached expressions.
 * 
 * int DID_ST_RX_REQUESTS
 * Number of requests for new regexps.
 * 
 * int DID_ST_RX_REQ_FOUND
 * Number of requested regexps found in the table.
 * 
 * int DID_ST_RX_REQ_COLL
 * Number of requested new regexps which collided with
 * a cached one.
 * 
 * int DID_ST_MB_FILE
 * The size of the 'File' memory buffer.
 * 
 * int DID_ST_MB_SWAP
 * The size of the 'Swap' memory buffer.
 * 
 * 
 * <arg2> == DID_SWAP (1): Returns the "status swap" information:
 * 
 * int DID_SW_PROGS
 * int DID_SW_PROG_SIZE
 * Number and size of swapped-out program blocks.
 * 
 * int DID_SW_PROG_UNSWAPPED
 * int DID_SW_PROG_U_SIZE
 * Number and size of unswapped program blocks.
 * 
 * int DID_SW_VARS
 * int DID_SW_VAR_SIZE
 * Number and size of swapped-out variable blocks.
 * 
 * int DID_SW_FREE
 * int DID_SW_FREE_SIZE
 * Number and size of free blocks in the swap file.
 * 
 * int DID_SW_FILE_SIZE
 * Size of the swap file.
 * 
 * int DID_SW_REUSED
 * Total reused space in the swap file.
 * 
 * int DID_SW_SEARCHES
 * int DID_SW_SEARCH_LEN
 * Number and total length of searches for block to reuse
 * in the swap file.
 * 
 * int DID_SW_F_SEARCHES
 * int DID_SW_F_SEARCH_LEN
 * Number and total length of searches for a block to free.
 * 
 * int DID_SW_COMPACT
 * TRUE if the swapper is running in compact mode.
 * 
 * int DID_SW_RECYCLE_FREE
 * TRUE if the swapper is currently recycling free block.
 * 
 * 
 * <arg2> == DID_MEMORY (2): Returns the "status malloc" information:
 * 
 * string DID_MEM_NAME
 * The name of the allocator: "sysmalloc", "smalloc",
 * "slaballoc"
 * 
 * int DID_MEM_SBRK          (slaballoc, smalloc)
 * int DID_MEM_SBRK_SIZE     (slaballoc, smalloc)
 * Number and size of memory blocks requested from the
 * operating system (non-mmapped memory).
 * 
 * int DID_MEM_LARGE         (slaballoc, smalloc)
 * int DID_MEM_LARGE_SIZE    (slaballoc, smalloc)
 * int DID_MEM_LFREE         (slaballoc, smalloc)
 * int DID_MEM_LFREE_SIZE    (slaballoc, smalloc)
 * Number and size of large allocated resp. free blocks.
 * smalloc: The large allocated blocks include the
 * small chunk blocks.
 * 
 * int DID_MEM_LWASTED       (slaballoc, smalloc)
 * int DID_MEM_LWASTED_SIZE  (slaballoc, smalloc)
 * Number and size of unusable large memory fragments.
 * 
 * int DID_MEM_CHUNK         (smalloc)
 * int DID_MEM_CHUNK_SIZE    (smalloc)
 * Number and size of small chunk blocks.
 * 
 * int DID_MEM_SLAB          (slaballoc)
 * int DID_MEM_SLAB_SIZE     (slaballoc)
 * Number and size of slabs (including fully free slabs).
 * 
 * int DID_MEM_SLAB_FREE      (slaballoc)
 * int DID_MEM_SLAB_FREE_SIZE (slaballoc)
 * Number and size of free slabs (part of DID_MEM_SLAB).
 * 
 * int DID_MEM_SMALL         (slaballoc, smalloc)
 * int DID_MEM_SMALL_SIZE    (slaballoc, smalloc)
 * int DID_MEM_SFREE         (slaballoc, smalloc)
 * int DID_MEM_SFREE_SIZE    (slaballoc, smalloc)
 * Number and size of small allocated resp. free blocks.
 * 
 * int DID_MEM_SWASTED       (smalloc)
 * int DID_MEM_SWASTED_SIZE  (smalloc)
 * Number and size of unusably small memory fragments.
 * 
 * int DID_MEM_SMALL_OVERHEAD_SIZE  (slaballoc)
 * Size of the slab management overhead (not including
 * the overhead incurred by each allocated small block).
 * 
 * int DID_MEM_MINC_CALLS    (slaballoc, smalloc)
 * int DID_MEM_MINC_SUCCESS  (slaballoc, smalloc)
 * int DID_MEM_MINC_SIZE     (slaballoc, smalloc)
 * Number of calls to malloc_increment(), the number
 * of successes and the size of memory allocated this
 * way.
 * 
 * int DID_MEM_PERM         (slaballoc, smalloc)
 * int DID_MEM_PERM_SIZE    (slaballoc, smalloc)
 * Number and size of permanent (non-GCable) allocations.
 * 
 * int DID_MEM_CLIB         (slaballoc, smalloc)
 * int DID_MEM_CLIB_SIZE    (slaballoc, smalloc)
 * Number and size of allocations done through the
 * clib functions (if supported by the allocator).
 * 
 * int DID_MEM_OVERHEAD     (slaballoc, smalloc)
 * Overhead for every allocation.
 * 
 * int DID_MEM_ALLOCATED    (slaballoc, smalloc)
 * The amount of memory currently allocated from the
 * allocator, including the overhead for the allocator.
 * 
 * int DID_MEM_USED         (slaballoc, smalloc)
 * The amount of memory currently used for driver data,
 * excluding the overhead from the allocator.
 * 
 * int DID_MEM_TOTAL_UNUSED (slaballoc, smalloc)
 * The amount of memory allocated from the system, but
 * not used by the driver.
 * 
 * int DID_MEM_DEFRAG_CALLS       (smalloc)
 * Total number of calls to defragment_small_lists().
 * 
 * int DID_MEM_DEFRAG_CALLS_REQ   (smalloc)
 * Number of calls to defragment_small_lists() with a
 * desired size.
 * 
 * int DID_MEM_DEFRAG_REQ_SUCCESS (smalloc)
 * Number of times, a defragmentation for a desired
 * size was successful.
 * 
 * int DID_MEM_BLOCKS_INSPECTED   (smalloc)
 * Number of blocks inspected during defragmentations.
 * 
 * int DID_MEM_BLOCKS_MERGED      (smalloc)
 * Number of blocks merged during defragmentations.
 * 
 * int DID_MEM_BLOCKS_RESULT      (smalloc)
 * Number of defragmented blocks (ie. merge results).
 * 
 * int DID_MEM_AVL_NODES          (slaballoc, smalloc)
 * Number of AVL nodes used to manage the large free
 * blocks. This value might go away again.
 * 
 * mixed * DID_MEM_EXT_STATISTICS (slaballoc, smalloc)
 * If the driver was compiled with extended smalloc
 * statistics, they are returned in this entry; if the
 * driver was compiled without the statistics, 0 is
 * returned.
 * 
 * This value might go away again.
 * 
 * The array contains NUM+2 entries, where NUM is the
 * number of distinct small block sizes. Entry [NUM]
 * describes the statistics of oversized small blocks
 * (smalloc) resp. for all slabs (slaballoc),
 * entry [NUM+1] summarizes all large blocks. Each
 * entry is an array of these fields:
 * 
 * int DID_MEM_ES_MAX_ALLOC:
 * Max number of allocated blocks of this size.
 * 
 * int DID_MEM_ES_CUR_ALLOC:
 * Current number of allocated blocks of this size.
 * 
 * int DID_MEM_ES_MAX_FREE:
 * Max number of allocated blocks of this size.
 * 
 * int DID_MEM_ES_CUR_FREE:
 * Current number of allocated blocks of this size.
 * 
 * float DID_MEM_ES_AVG_XALLOC:
 * Number of explicit allocation requests per
 * second.
 * 
 * float DID_MEM_ES_AVG_XFREE:
 * Number of explicit deallocation requests per
 * second.
 * 
 * int DID_MEM_ES_FULL_SLABS:
 * Number of fully used slabs (slaballoc only).
 * 
 * int DID_MEM_ES_FREE_SLABS:
 * Number of fully free slabs (slaballoc only).
 * 
 * int DID_MEM_ES_TOTAL_SLABS:
 * Total number of slabs: partially used, fully used
 * and fully free (slaballoc only).
 * 
 * The allocation/deallocation-per-second statistics do
 * not cover internal shuffling of the freelists.
 * 
 * The slab statistics (entry [NUM], slaballoc only)
 * shows in the AVG statistics the frequence with which
 * slabs were allocated from resp. returned to the large
 * memory pool.
 * 
 * 
 * DINFO_TRACE (7): Return the call stack 'trace' information as specified
 * by <arg2>. The result of the function is either an array (format
 * explained below), or a printable string. Omitting <arg2> defaults
 * to DIT_CURRENT.
 * 
 * <arg2> == DIT_CURRENT (0): Current call trace
 * == DIT_ERROR   (1): Most recent error call trace (caught
 * or uncaught)
 * == DIT_UNCAUGHT_ERROR (2): Most recent uncaught-error call
 * trace
 * Return the information in array form.
 * 
 * The error traces are changed only when an appropriate error
 * occurs; in addition a GC deletes them. After an uncaught
 * error, both error traces point to the same array (so the '=='
 * operator holds true).
 * 
 * If the array has more than one entries, the first entry is 0 or
 * the name of the object with the heartbeat which started the
 * current thread; all following entries describe the call stack
 * starting with the topmost function called.
 * 
 * All call entries are arrays themselves with the following
 * elements:
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
 * string[TRACE_PROGRAM]: The (file)name of the program holding the
 * code.
 * string[TRACE_OBJECT]:  The name of the object for which the code
 * was executed.
 * int[TRACE_LOC]:
 * _TYPE_LAMBDA: current program offset from the start of the
 * closure code.
 * _TYPE_LFUN:   the line number.
 * 
 * <arg2> == DIT_STR_CURRENT (3): Return the information about the
 * current call trace as printable string.
 * 
 * <arg2> == DIT_CURRENT_DEPTH (4): Return the current number of
 * frames on the control stack (recursion depth).
 * 
 * DINFO_EVAL_NUMBER (8): Return the current evaluation number.
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
 * @deprecated Since 3.2.7, DINFO_STATUS returns the status information instead
          of printing it.
        DINFO_DUMP introduced with 3.2.7.
        LDMud 3.2.8 added the data size of the object to the result of
          DINFO_MEMORY; the DINFO_DATA request; the DID_MEM_WASTED* stats.
        LDMud 3.2.9 added DINFO_TRACE; the indexing feature for DINFO_DATA;
          the 'destructed' DINFO_DUMP; the DID_MEM_CLIB*, DID_MEM_PERM*,
          DID_ST_OBJECTS_NEWLY_DEST, DID_ST_OBJECTS_DEST, DID_MEM_OVERHEAD,
          DID_MEM_ALLOCATED, DID_MEM_USED, DID_MEM_TOTAL_UNUSED, and
          DID_ST_HBEAT_CALLS_TOTAL stats.
        LDMud 3.2.10 added the object creation time to DINFO_DUMP:"objects",
          removed DID_MEM_UNUSED from DINFO_DATA:DID_MEMORY; added
          DID_ST_BOOT_TIME, DID_ST_MB_FILE and DID_ST_MB_SWAP to
          DINFO_DATA:DID_STATUS; removed DID_ST_CALLOUT_SLOTS and from
          DINFO_DATA:DID_STATUS; added the third argument to
          DINFO_OBJLIST, and changed the meaning of
          DID_ST_CALLOUT_SIZE and DID_ST_HBEAT_SIZE/_SLOTS.
        LDMud 3.3 replaced the string related DID_ST_ constants according to
          the new string implementation.
        LDMud 3.3.387 added the ptmalloc values for DINFO_DATA:DID_MEMORY.
        LDMud 3.3.479 added the DID_MEM_DEFRAG_ values
          for DINFO_DATA:DID_MEMORY.
        LDMud 3.3.526 added DINFO_DUMP:"memory".
        LDMud 3.3.533 added DID_MEM_AVL_NODES for DINFO_DATA:DID_MEMORY.
        LDMud 3.3.603 added DID_MEM_EXT_STATISTICS for
          DINFO_DATA:DID_MEMORY.
        LDMud 3.3.645 added DINFO_DATA:DID_ST_PACKETS_IN and
            DID_ST_PACKET_SIZE_IN.
        LDMud 3.3.679 removed DID_ST_IT_OVERHEAD and DID_ST_ITABLED*;
            added DID_ST_HYBRID_MAPPINGS and DID_ST_HASH_MAPPINGS.
        LDMud 3.3.718 added DIT_CURRENT_DEPTH to DINFO_TRACE.
        LDMud 3.3.719 added DINFO_EVAL_NUMBER
        LDMud 3.5.0 removed the ptmalloc values for DINFO_DATA:DID_MEMORY.
 *
 */
mixed debug_info(int flag);

mixed debug_info(int flag, mixed arg);

mixed debug_info(int flag, mixed arg2, mixed arg3);

/**
 * creator_file
 *
 * Return the name of the creator of a newly created object, i.e.
 * the name of the user that is responsible for the LPC source
 * file the object was loaded from. If the function returns 0,
 * the object can't be loaded and is destructed again
 * immediately.
 * 
 * In !compat mode, the returned string serves as the initial uid
 * (``cuid'') of the object. Objects whose cuid is the
 * backbone-id will then get the uid of the currently active user
 * as their userid instead.
 * 
 * Under compat mode this function is called as well and provides
 * the information returned by the creator() efun.
 * 
 * If this function is not provided by the master object, no
 * other object can be loaded.
 *
 * @deprecated Dropped in 3.2.1, replaced by the _UID driver hooks.
 *
 */
string creator_file(mixed ob);

/**
 * copy_mapping
 *
 * This efun is needed to create copies of mappings instead of
 * just passing a reference, like adding/subtraction from a
 * mapping do.
 *
 * @deprecated Superseeded by the copy() efun.
        Removed in LDMud 3.3.
 *
 */
mapping copy_mapping(mapping m);

/**
 * cat
 *
 * List the file found at path.
 * 
 * In most installations it is not legal to have '..' or spaces
 * in the path. This commands is normally connected to the "cat"
 * command that wizards have. It is also used by the "help"
 * command. The optional arguments start and num are start line
 * number and number of lines. If they are not given the whole
 * file is printed from the beginning.
 * 
 * The total number of lines will not exceed a system limit, which
 * normally is 50 lines.
 * 
 * cat() returns the number of lines read and printed if success,
 * 0 if no such file or no lines to read (if start or len is < 0,
 * or if the file has less than start lines).
 * 
 * This efun has been deprecated in 3.3.719. Please don't use it in new
 * code. Use either a combination of read_bytes() + tell_object() or the
 * sefun cat() from the driver package.
 *
 * @example 
 * cat("/doc/efun/cat", 5, 9);
 * 
 * This will print out the file "/doc/efun/cat" begining at line
 * 5 and ending with line 13.
 *
 * @deprecated Deprecated in LDMud 3.3.719.
        Removed in LDMud 3.5.0
 *
 */
int cat(string path, int start, int num);

/**
 * assoc
 *
 * All invocation forms search for a <key> in an <alist> (an array
 * of two equal-sized arrays) or in an ordered array <keys>.
 * An attempt to search in any other structure will yield an
 * unpredictable result.
 * 
 * Complexity: O(lg(n)) , where n is the number of keys.
 * 
 * 
 * 1. Form: Key Search
 * 
 * <key> is searched in the array <keys>, result is the index at
 * which <key> was found. If it isn't found, -1 is returned.
 * 
 * 
 * 2. Form: Alist Lookup
 * 
 * <key> is searched in the <alist>, result is the data associated
 * with <key> if it is found. If it isn't found, the result
 * will be 0, or <fail> if specified.
 * 
 * 
 * 3. Form: Ordered List Lookup
 * 
 * <key> is searched in the array <keys>, the index at which it
 * is found is as index into <data> to get the return value.
 * If <key> is not found, the reuslt will be 0, or <fail> if
 * specified.
 * 
 * For this to be useful, <data> has to be ordered so that
 * it matches <key>. This form of lookup is therefore used
 * primarily with multidimensional alists.
 * 
 * The function is available only if the driver is compiled with
 * alist support. In that case, __ALISTS__ is defined.
 *
 * @deprecated LDMud 3.3 made this an optional efun.
 *
 */
int   assoc(mixed key, mixed *keys);
varargs mixed assoc(mixed key, mixed *alist , mixed fail);
varargs mixed assoc(mixed key, mixed *keys, mixed *data , mixed fail);

/**
 * allocate_mapping
 *
 * Reserve memory for a mapping.
 * 
 * size is the number of entries (i.e. keys) to reserve, width is
 * the number of data items per entry. If the optional width is
 * omitted, 1 is used as default.
 * 
 * This is useful only when you are going to construct a mapping
 * whose approximate size you know beforehand, to save on malloc
 * overhead. If you don't fill in data for all the allocated
 * elements, any leftovers will be freed after the current
 * function execution ended. It is also useful if you want the
 * mapping to have a certain width even if you don't provide
 * all the data items for the keys yet.
 *
 * @deprecated Renamed to 'm_allocate()' in LDMud 3.2.6.
        Since LDMud 3.2.9, not available if driver is compiled without
          USE_DEPRECATED.
        Removed in LDMud 3.3.
 *
 */
mapping allocate_mapping(int size, int width);

/**
 * alists
 *
 * Alists provide a fast and convenient way to access data
 * associatively.
 * 
 * Alists are implemented as arrays of arrays, the first being
 * the array holding the keys, the others arrays holding
 * associated data. An empty alist is an array of empty arrays.
 * 
 * Note that the the dimensions of the arrays are used the other
 * way than in lisp to allow for faster searching.
 * 
 * Keys have to be of type integer, string or object. Types can
 * be mixed.
 * 
 * The search functions return an undefined value when another
 * list is given in place of a presorted key list.
 * 
 * A list with non-numeric keys retrieved by restore_object() has
 * to be readjusted by using order_alist(), especially after
 * reboot.
 * 
 * Deleting an entry can safely be done with exclude_array as
 * long as all associated data lists are treated like the key
 * array; index finding for such purposes can be done with assoc.
 * 
 * Typical applications: holding administrary information about
 * wizards, list of visitors in a pub, list of customers having
 * some sort of credit, information remembered about items etc.
 *
 * @deprecated LDMud 3.3 made alists an optional efun.
        LDMud 3.5 removed the support for alists.
 *
 */
/**
 * add_xverb
 *
 * 
 *
 * @deprecated Removed in LDMud 3.3, obsoleted by add_action().
 *
 */
/**
 * add_verb
 *
 * This function is connected to the add_action() function. It
 * will set up the command str to trigger a call to the function
 * set up by the previous call to add_action().
 * 
 * This function is now obsolete as the verb can be given directly
 * with add_action(). add_verb() remains for compatibility.
 * 
 * [marion Sun Jan 19 1992 Don't use it. This file is retained
 * because of somewhat nostalgic reasons.]
 *
 * @deprecated Removed in LDMud 3.3, obsoleted by add_action().
 *
 */
void add_verb(string str);

