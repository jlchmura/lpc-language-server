// interactive.h

/**
 * write() - send a message to current player
 *
 * Write  a  message  'str' to current player. 'str' can also be a number,
 * which will be translated to a string.
 * 
 * This efun does not invoke the receive_message() apply. so you may wish to
 * override this efun if you wish it to be captured by this apply.
 *
 */
void write( mixed str );

/**
 * users() - return an array of objects containing all interactive players
 *
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER*} An array of objects, containing all interactive players.
 *
 */
object *users( void );

/**
 * userp() - determine if a given object was once interactive
 *
 * @returns 1 if the arg was once interactive.
 *
 */
int userp(object ob);

/**
 * this_user - the current interactive player object
 *
 * Return the object representing the player that caused the calling func‐
 * tion to be called.
 * 
 * This efun is an alias for `this_player(0)`, refer to the docs for
 * this_player(3).
 *
 * @param {int} flag - if non-zero, return the interactive player object. Defaults to 0
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - the interactive player object
 */
varargs object this_user(int flag);


/**
 * this_player - the current player object
 *
 * Return the object representing the player that caused the calling func‐
 * tion to be called.  Note that  this_player()  may  return  a  different
 * value  than this_object() even when called from within a player object.
 * If this_player is called as this_player(1) then the returned value will
 * be  the  interactive  that  caused  the  calling function to be called.
 * this_player(1) may return a different value than this_player() in  cer‐
 * tain  cases  (such  as  when  command()  is used by an admin to force a
 * player to perform some command).
 * 
 * `this_user`  and  `this_interactive` are aliases for `this_player` with
 * different default flags.
 *
 * @param {int} flag - if non-zero, return the interactive player object. Defaults to 0
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - the player object
 */
varargs object this_player( int flag );

/**
 * this_interactive - the current interactive player object
 *
 * Return the object representing the player that caused the calling func‐
 * tion to be called.  This returns what this_player() was originally even
 * if it changed later due to enable_commands() or command().
 * 
 * This efun is an alias for `this_player(1)`, refer to the docs for
 * this_player(3).
 *
 * @param {int} flag - if non-zero, return the interactive player object. Defaults to 1
 */
varargs object this_interactive( int flag );

/**
 * telnet_nop() - send an TELNET NOP message
 *
 * if user is under telnet, then send an TELNET_IAC TELNET_NOP sequence, useful
 * to keep the connection alive.
 *
 */
void telnet_nop();

/**
 * telnet_msp_oob() - send an OOB MSP message
 *
 * if user is under telnet, then send an IAC SB TELOPT_MSP msg IAC SE sequence,
 * as documented in https://wiki.mudlet.org/w/Manual:Supported_Protocols#MSP
 *
 */
void telnet_msp_oob(string);

/**
 * telnet_ga() - send an TELNET GA message
 *
 * if user is under telnet, then send an TELNET_IAC TELNET_GA sequence,
 * useful for prompts that don't terminate with a newline character.
 *
 */
void telnet_ga();

/**
 * snoop() - snoop an interactive user
 *
 * When   both  arguments  are  used,  begins  snooping  of  'snoopee'  by
 * 'snooper'.  If the second argument is omitted, turns off  all  snooping
 * by  'snoopee'.   Security  for  snoop()  is  normally  controlled  by a
 * simul_efun.  snoop() returns 'snoopee' if successful in  the  two-argu‐
 * ment  case,  and  'snooper' if it was successful in the single-argument
 * case.  A return of 0 indicates failure.
 *
 */
varargs object snoop( object snooper, object snoopee );

/**
 * shout() - sends a message to all living objects
 *
 * Sends the string 'str' to all living objects except this_player().
 * 
 * This efun does not invoke the receive_message() apply, so you may wish to
 * override this efun if you wish it to be captured by this apply.
 *
 */
void shout( string str );

/**
 * set_this_user - the current interactive player object
 *
 * This efun is an alias for `set_this_player(who)`, refer to the docs for
 * set_this_player(3).
 *
 */
void set_this_user( object who );
void set_this_player( object who );

/**
 * set_this_player - change the current player object
 *
 * set_this_player()   causes   'who'   to   become   the   new  value  of
 * this_player().  This efun  is  only  available  with  __NO_ADD_ACTION__
 * defined,  and is included since with __NO_ADD_ACTION__ parsing and dis‐
 * patching of commands is the mudlib's responsibility.
 * 
 * 'who' can also be zero, in which this_player() is set to zero.
 *
 */
void set_this_player( object who );
void set_this_user( object who );

/**
 * 
 *
 * set output/input encoding for current player.
 * 
 * If given encoding name is not avaiable, a error will be thrown. The avaiable encoding name
 * depends on your ICU version, Generally, use GBK for chinese.
 * 
 * If no argument present, reset the player to no encoding, which means UTF-8.
 * 
 * Returns the canonical encoding name from ICU, and it will be the same as query_encoding() returns.
 *
 */
varargs string set_encoding( string encoding );

/**
 * send_gmcp() - send a GMCP message
 *
 * Sends a GMCP 'message' for this_object() to the user's client.
 * 
 * For payload formatting information see: http://www.gammon.com.au/gmcp,
 * https://github.com/keneanung/GMCPAdditions
 * 
 * Note: send_gmcp() should only be called from within a user object.
 *
 */
void send_gmcp( string message );

/**
 * say() - send a message to all users in the same environment
 *
 * Sends  a message to the environment of the originator, all items in the
 * same environment, and all items inside of the originator.  The origina‐
 * tor  is  this_player(),  unless  this_player() == 0, in which case, the
 * originator is this_object().
 * 
 * The second argument is optional.  If second argument  'obj'  is  speci‐
 * fied,  the  message  is  sent  to all except 'obj'.  If 'obj' is not an
 * object, but an array of objects, all those objects  are  excluded  from
 * receiving the message.
 * 
 * This efun does not invoke the receive_message() apply, so you may wish to
 * override this efun if you wish it to be captured by this apply.
 *
 */
varargs void say( string str, object obj );

/**
 * resolve() - resolve an internet address to domain name, or vice versa
 *
 * resolve()  resolves  'address',  which should be an internet address in
 * the form "127.0.0.1" or a domain name, into its domain name, or  inter‐
 * net  address.   When  the  resolve is complete, 'callback_func' will be
 * called in the current object.  The form of the callback is:
 * 
 * void callback(string address, string resolved, int key);
 * 
 * 'key' will match  up  with  the  number  that  the  call  to  resolve()
 * returned.   'address'  will  be  the  domain  name  of  the  host,  and
 * 'resolved' the dotted decimal ip address.  The unknown value will be  0
 * if the lookup failed.
 *
 */
int resolve( string address, string callback_func );
int resolve( string address, closure callback_func );

/**
 * remove_action - unbind a command verb from a local function
 *
 * remove_action(3)  unbinds a verb cmd from an object function fun. Basi‐
 * cally,  remove_action()  is  the  complement   to   add_action(3)   and
 * add_verb(3).  When a verb is no longer required, it can be unbound with
 * remove_action().
 *
 */
int remove_action( string fun, string cmd );

/**
 * receive() - displays a message to the current object
 *
 * This  efun is an interface to the add_message() function in the driver.
 * Its purpose is to display a message to the current object.  It  returns
 * 1  if the current object is interactive, 0 otherwise.  Often, receive()
 * is called from within catch_tell(4) or receive_message(4).
 *
 */
int receive( string message );

/**
 * query_snooping() - return the object than an object is snooping
 *
 * If 'ob' (an interactive object) is snooping another interactive object,
 * the snooped object is returned.  Otherwise, 0 is returned.
 *
 */
object query_snooping( object ob );

/**
 * query_snoop() - return the snooper of an interactive object
 *
 * If 'ob' (an interactive object) is being snooped by another interactive
 * object, the snooping object is returned.  Otherwise, 0 is returned.
 *
 */
object query_snoop( object ob );

/**
 * query_ip_number() - return the ip number for a player object
 *
 * Return  the  ip-number  (dotted  decimal  form or IPv6 form) for player
 * 'ob'.
 *
 */
varargs string query_ip_number( object ob );

/**
 * query_ip_name() - return the ip name of a given player object.
 *
 * Return  the  DNS  PTR record for player 'ob's IP .  An asynchronous DNS
 * reverse lookup is triggered on new connection to the server.
 * 
 * Before  lookup  finishes,  this  function  returns   same   result   as
 * 'query_ip_number(3)'.
 * 
 * After  lookup  finishes,  if  lookup  is  succesful, this funciton will
 * return the DNS PTR value for the IP of this object. If  lookup  failed,
 * (due  to  network  issues,  PTR record not configured for this IP etc),
 * this function will continue to return  same  result  as  'query_ip_num‐
 * ber(3)'.
 * 
 * The result is cached, there is no overhead for this function.
 *
 */
string query_ip_name( object ob );

/**
 * query_idle()  -  determine  how  many seconds an interactive player has
been idle
 *
 * Query how many seconds a player object (ob) has been idling.
 *
 */
int query_idle( object ob );

/**
 * query_host_name() - return the host name
 *
 * query_host_name() returns the name of the host.
 *
 */
string query_host_name( void );

/**
 * 
 *
 * get the input/ouput encoding for current player.
 * 
 * Note: the name you get are ICU internal names, which will be the same returned by set_encoding(), but may or
 * maynot be the one you passed in, but they refer to the same encoding.
 *
 */
string query_encoding();

/**
 * printf, sprintf - formatted output conversion
 *
 * An  implementation  of (s)printf() for LPC, with quite a few extensions
 * Implemented by Lynscar (Sean A Reith).
 * 
 * @param format the format string
 * @param args the arguments to format
 * @description 
 * This version supports the following as modifiers:
 * 
 * " "     pad positive integers with a space.
 * 
 * "+"     pad positive integers with a plus sign.
 * 
 * "-"     left adjusted within field size.
 * NB: std (s)printf() defaults to right justification,  which  is
 * unnatural  in the context of a mainly string based language but
 * has been retained for "compatability".
 * 
 * "|"     centered within field size.
 * 
 * "="     column mode if strings are greater than  field  size.  This  is
 * only meaningful with strings, all other types ignore this. Col‐
 * umns are auto-magically word wrapped.
 * 
 * "#"     table mode, print a list of '\n' separated 'words' in  a  table
 * within the field size.  only meaningful with strings.
 * 
 * n       specifies  the  field  size,  a '*' specifies to use the corre‐
 * sponding arg as the field size.  If n is prepended with a zero,
 * then  is padded zeros, else it is padded with spaces (or speci‐
 * fied pad string).
 * 
 * "."n    precision of n, simple strings truncate after this  (if  preci‐
 * sion  is greater than field size, then field size = precision),
 * tables use precision to specify the number of columns (if  pre‐
 * cision  not  specified  then  tables calculate a best fit), all
 * other types ignore this.
 * 
 * ":"n    n specifies the fs _and_ the precision, if n is prepended by  a
 * zero then it is padded with zeros instead of spaces.
 * 
 * "@"     the argument is an array.  the corresponding format_info (minus
 * the "@") is applyed to each element of the array.
 * 
 * "'X'"   The char(s) between the single-quotes are used to pad to  field
 * size  (defaults  to  space)  (if both a zero (in front of field
 * size) and a pad string are specified, the one specified  second
 * overrules).   NOTE:  to include "'" in the pad string, you must
 * use "\'" (as the backslash has to be escaped  past  the  inter‐
 * preter), similarly, to include "\" requires "\\".
 * 
 * The following are the possible type specifiers.
 * 
 * %       in  which  case  no  arguments  are  interpreted,  and a "%" is
 * inserted, and all modifiers are ignored.
 * 
 * O       the argument is an LPC datatype.
 * 
 * s       the argument is a string.
 * 
 * d, i    the integer arg is printed in decimal.
 * 
 * c       the integer arg is to be printed as a character.
 * 
 * o       the integer arg is printed in octal.
 * 
 * x       the integer arg is printed in hex.
 * 
 * X       the integer arg is printed in hex (with A-F in capitals).
 * 
 * f       floating point number
 *
 * Basic Usage:
 * ```lpc
 * printf("%s is %i", "X", 1)    =   "X is 1"
 * ```
 * 
 * Alignment:
 * ```lpc
 * printf("%-20s", "left")       =   "left                "
 * printf("%20|s", "center")     =   "       center       "
 * printf("%20s", "right")       =   "               right"
 * printf("%-20'-'s", "left")    =   "left----------------"
 * printf("%20'-'|s", "center")  =   "-------center-------"
 * printf("%20'-'s", "right")    =   "---------------right"
 * ```
 * 
 * Numeric:
 * ```lpc
 * printf("%.2f", 1.2345)        =   "1.23"
 * printf("%10.2f", 1.2345)      =   "      1.23"
 * printf("%10.6f", 0.123)       =   "  0.123000"
 * ```
 * 
 * Dynamic Field Size:
 * ```lpc
 * printf("%-*s", 10, "ten")     =   "ten       "
 * printf("%|*s", 20, "twenty")  =   "       twenty       "
 * printf("%*s", 30, "thirty")   =   "                        thirty"
 * ```
 */
void printf( string format, mixed args... );
string sprintf( string format, mixed args... );

/**
 * int notify_fail( string | function str );
 *
 * Store  'str' as the error message to be returned instead of the default
 * message 'What?'.  The message will be displayed if a 0 is returned from
 * an action setup via add_action().  This is the preferred way to display
 * error messages since it allows other objects a chance to respond to the
 * same  verb  (command).  Do not use write() to display the error message
 * since this will require you to return a 1 (unless you want to  see  the
 * result of the write() in addition to the 'What?' message).  However, if
 * you do return a 1, then no other objects will get a chance  to  respond
 * to the user command.
 * 
 * If  a  function  is  passed instead of a string, the function is called
 * instead of printing a message.  If the function returns a string,  that
 * string is used as the failure message.  Also, this_player() is set cor‐
 * rectly, so write() can be used.
 * 
 * If "notify_fail()" is called more than once, only the  last  call  will
 * have an effect.
 * 
 * The  idea  behind  this function is to allow better error messages than
 * 'What?'.
 *
 */
int notify_fail( string | function str );

/**
 * message - deliver messages to "living" objects
 *
 * message() calls the apply receive_message(mixed type, string message) in
 * all objects in the target list excluding those in the exclude list.  This
 * provides the objects with the message, allowing them to take appropriate
 * actions based upon the type of message received.
 * 
 * The type of message can be used for filtering, formatting, adjusting, or
 * more. An example would be 'combat', 'shout', 'emergency', 'system', etc.
 * 
 * Message is a string containing the text to send.
 * 
 * Target is a list of objects to receive the message. This can be either
 * a single object string or object pointer, or may be an array of either.
 * If a target is non-living, all objects in its environment will receive
 * the message.
 * 
 * Exclude is a list of objects that should not receive the message. This
 * can either be one object or an array of objects.
 *
 * message("say", "You say: Hello!", this_player());
 * message("say", this_player()->query_cap_name() + " says: Hello!", environment(this_player()), ({ this_player() }));
 *
 */
void message( mixed type, string message, mixed target, mixed exclude );

/**
 * interactive() - detects whether or not a given object is an interactive
 *
 * Return non-zero if 'ob' is an interactive player. 0 will be returned if
 * he is link dead.
 *
 */
varargs int interactive( object ob );

/**
 * input_to()  - causes next line of input to be sent to a specified func‐
tion
 *
 * Enable next line of user input to be sent to the local  function  'fun'
 * as an argument. The input line will not be parsed by the driver.
 * 
 * Note  that input_to is non-blocking which means that the object calling
 * input_to does not pause waiting for input.  Instead the object  contin‐
 * ues  to  execute  any statements following the input_to.  The specified
 * function 'fun' will not be called until the user input  has  been  col‐
 * lected.
 * 
 * If  "input_to()"  is  called more than once in the same execution, only
 * the first call has any effect.
 * 
 * If optional argument 'flag' is non-zero, the line given by  the  player
 * will not be echoed, and is not seen if snooped (this is useful for col‐
 * lecting passwords).
 * 
 * The function 'fun' will be called with the  user  input  as  its  first
 * argument (a string). Any additional arguments supplied to input_to will
 * be passed on to 'fun' as arguments following the user input.
 *
 */
varargs void input_to(string | function fun, mixed flag, mixed args... );

/**
 * in_input() - determines if a player is inputting to an input_to
 *
 * Returns  1  if  the  object  is  currently  inputting to an input_to or
 * get_char.
 *
 * @param {object} ob - the object to check, defaults to F_THIS_OBJECT
 */
int in_input( object ob );

/**
 * in_edit() - determine if a player is in the editor
 *
 * If  the  given  object  is  in  the  editor,  the  file being edited is
 * returned, else zero.
 *
 * @param {object} ob - the object to check, defaults to F_THIS_OBJECT
 */
varargs string in_edit( object ob );

/**
 * has_zmp
 *
 * Return non-zero if interactive user has the ZMP protocol enabled in their
 * client. 0 will be returned if the user does not.
 *
 */
int has_zmp(object user);

/**
 * has_mxp
 *
 * Return non-zero if interactive user has the MXP protocol enabled in
 * their client. 0 will be returned if the user does not.
 *
 */
int has_mxp(object user);

/**
 * has_gmcp() - returns whether a given interactive user's client has
GMCP protocol enabled
 *
 * If the interactive user has the GMCP protocol enabled in their client,
 * this function will return 1, otherwise 0 will be returned.
 * 
 * Note:
 * FluffOS requires the following option to be set in the runtime config
 * in order to support the GMCP protocol.
 *
 */
int has_gmcp( object user );

/**
 * get_char  -  causes  next  character of input to be sent to a specified
function
 *
 * Enable next character of user input to be sent to the function 'fun' as
 * an argument. The input character will not be parsed by the driver.
 * 
 * Note  that get_char is non-blocking which means that the object calling
 * get_char does not pause waiting for input.  Instead the object  contin‐
 * ues  to  execute  any statements following the get_char.  The specified
 * function 'fun' will not be called until the user input  has  been  col‐
 * lected.
 * 
 * If  "get_char()"  is  called more than once in the same execution, only
 * the first call has any effect.
 * 
 * If optional argument 'flag' is non-zero, the char given by  the  player
 * will not be echoed, and is not seen if snooped (this is useful for col‐
 * lecting passwords).
 * 
 * The function 'fun' will be called with the  user  input  as  its  first
 * argument (a string). Any additional arguments supplied to get_char will
 * be passed on to 'fun' as arguments following the user input.
 *
 */
varargs void get_char( string | function fun, int flag, mixed args... );

/**
 * find_player() - find a player by name
 *
 * Similar  to  find_living(),  but only searches through objects that are
 * interactive, or were once interactive.
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - the player object
 */
object find_player( string str );

/**
 * exec()  - switches a player (interactive) connection from one object to
another
 *
 * This efunction allows the interactive link to  a  given  object  to  be
 * migrated to another object.  That is, after a successful exec(to, from)
 * call, interactive(to) will return 1 and interactive(from)  will  return
 * 0.   The player that was controlling 'from' will begin controlling 'to'
 * following the exec() call.  Note that this is a powerful  function  and
 * its use must be restricted if you wish to attempt to have a secure mud.
 * The proper way to restrict the use of exec() is to make a simul_efun of
 * the  same  name and then use valid_override(4) to restrict the use of a
 * simul_efun override (i.e. efun::exec()).  The exec() function returns 1
 * if the switch is successful (and 0 otherwise).
 *
 */
int exec( object to, object from );

/**
 * enable_commands() - allow object to use 'player' commands
 *
 * enable_commands() marks this_object() as a living object, and allows it
 * to use commands added with add_action()  (by  using  command()).   When
 * enable_commands()  is called, the driver also looks for the local func‐
 * tion catch_tell(), and if found, it will call it every time  a  message
 * (via say() for example) is given to the object.
 * 
 * Since  FluffOS  3.0-alpha7: This function now accept int, default to 0.
 * which has same meaning of old form.  which merely re-enables  commands,
 * but  don't  setup actions. (it should have been cleared when previously
 * called disable_commands())
 * 
 * When setup_actions > 0, Driver will re-setup all the actions by calling
 * init()  on  its  environment,  sibling  and inventory objects. (in that
 * order).
 * @param {int} setup_actions - if non-zero, re-setup actions by calling init() on its environment, sibling and inventory objects. Defaults to 0
 * @since 3.0-alpha7.1* 
 */
varargs void enable_commands(int setup_actions);

/**
 * ed() - edit a file
 *
 * This efun is only available if __OLD_ED__ is defined.
 * 
 * This  is  a funny function. It will start a local editor on an optional
 * file.  This editor is almost UNIX ed compatible.  When  in  the  editor
 * type 'h' for help.
 * 
 * The  <write_fn>  function  allows  the  mudlib to handle file locks and
 * administrative logging of files modified.  When the editor writes to  a
 * file,  the  driver  will  callback  the <write_fn> function twice.  The
 * first time, the function is called before  the  write  takes  place  --
 * <flag>  will  be  0.  If the function returns TRUE, the write will con‐
 * tinue, otherwise it will abort.   The  second  time,  the  function  is
 * called  after the write has completed -- <flag> will be non-zero.  This
 * callback function should have the form:
 * 
 * int write_fn(string fname, int flag)
 * 
 * When the editor is exited, the driver will callback the <exit_fn> func‐
 * tion.   This  function  allows  the  mudlib to clean up.  This callback
 * function has the form:
 * 
 * void exit_fn()
 * 
 * The optional <restricted> flag limits the editor's  capabilities,  such
 * as inserting a file, and saving using an alternate file name.
 *
 */
varargs void ed( string file, string exit_fn, int restricted );
varargs void ed( string file, string write_fn, string exit_fn, int restricted );

/**
 * disable_wizard() - remove wizard priveleges from an object
 *
 * The  opposite  of enable_wizard().  Disables wizard privileges from the
 * current object.
 *
 */
void disable_wizard( void );

/**
 * disable_commands() - makes a living object non-living
 *
 * Makes a living object non-living, that is, add_actions have no effects,
 * livingp returns false, and, if the object is interactive, disallows the
 * user  to type in commands other than for an input_to.  disable_commands
 * always returns 0.
 * 
 * calling disable_commands() also have side-effct of clearing all actions
 * previously  added  by  other  object,  it also removes actions that was
 * defined by this object.
 *
 */
int disable_commands( void );

/**
 * commands() - returns some information about actions the user can take
 *
 * Returns an array of an array of 4 items describing the actions that are
 * available to this_object().  The first item is the command  itself  (as
 * passed  to  add_action()).   The  second is the set of flags (passed to
 * add_action as the third argument, often defaulted to 0).  The third  is
 * the  object  that defined the action.  The fourth is the function to be
 * called ("<function>" if it is a function pointer).
 *
 */
mixed *commands( void );

/**
 * command() - execute a command as if given by the object
 *
 * Execute  'str'  for  object  'ob', or this_object() if 'ob' is omitted.
 * Note that the usability of the second argument  is  determined  by  the
 * local administrator and will usually not be available, in which case an
 * error will result.  In case of failure,  0  is  returned,  otherwise  a
 * numeric  value  is  returned, which is the LPC "evaluation cost" of the
 * command.  Bigger numbers mean higher cost, but the whole scale is  sub‐
 * jective and unreliable.
 *
 */
varargs int command( string str, object ob );

/**
 * add_action() - bind a command verb to a local function
 *
 * Set up a local function <fun> to be called when user input matches  the
 * command  <cmd>. Functions called by a player command will get the argu‐
 * ments as a string. It must then return 0 if it was the  wrong  command,
 * otherwise 1.
 * 
 * If  the second argument is an array, then all the commands in the array
 * will call the second function.  It is possible to find out  which  com‐
 * mand called the function with query_verb().
 * 
 * If  it  was  the  wrong command, the parser will continue searching for
 * another command, until one  returns  true  or  give  error  message  to
 * player.
 * 
 * Usually  add_action() is called only from an init() routine. The object
 * that defines commands must be present to the player, either  being  the
 * player,  being carried by the player, being the room around the player,
 * or being an object in the same room as the player.
 * 
 * If argument <flag> is 1, then only the leading characters of  the  com‐
 * mand  has  to  match  the verb <cmd> and the entire verb is returned by
 * query_verb().  If argument <flag> is 2, then again,  only  the  leading
 * characters must match, but query_verb() will only return the characters
 * following <cmd>.
 *
 */
void add_action( string | function fun, string | string * cmd);
void add_action( string | function fun, string | string * cmd, int flag);

