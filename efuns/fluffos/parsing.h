// parsing.h

/**
 * query_verb() - return the name of the command currently being executed
 *
 * Give the name of the current command, or 0 if not executing from a com‐
 * mand.  This function is useful when several commands (verbs) may  cause
 * the  same  function  to  execute and it is necessary to determine which
 * verb it was that invoked the function.
 *
 */
string query_verb( void );

/**
 * process_value() - give a value from a described function call
 *
 * Get  the  replacement  of  one syntactic pattern. The pattern is on the
 * form:
 * 
 * "function[:filename][|arg1|arg2....|argN]"
 * 
 * The returned value can be of any type.
 * 
 * Note that both object and arguments are marked optional with the brack‐
 * ets and that the brackets are not included in the actual pattern.
 *
 */
mixed process_value( string calldescription );

/**
 * process_string() - give a string with replaced calldescriptions
 *
 * Processes  a  string by replacing specific syntactic patterns with what
 * is returned when the pattern is interpreted as a function call descrip‐
 * tion.
 * 
 * The syntactic patterns are on the form:
 * 
 * "@@function[:filename][|arg1|arg2....|argN]@@"
 * 
 * This is interpreted as a call:
 * 
 * filename->function(arg1, arg2, ....., argN)
 * 
 * Note  that  process_string  does  not recurse over returned replacement
 * values. If a function returns another syntactic pattern, that  descrip‐
 * tion will not be replaced.
 * 
 * All  such  occurrences  in 'combinestring' is processed and replaced if
 * the return value is a string. If the return value is not a  string  the
 * pattern will remain unreplaced.
 * 
 * Note that both object and arguments are marked optional with the brack‐
 * ets and that the brackets are not included in the actual pattern.
 *
 * A string:
 * "You are chased by @@query_the_name:/obj/monster#123@@ eastward."
 * 
 * is replaced by:
 * "You are chased by the orc eastward."
 * 
 * Assuming that query_the_name in monster#123 returns "the orc".
 *
 */
string process_string( string combinestring );

/**
 * parse_sentence() - parse the command contained in the given string
 *
 * This efun calls the driver parser and tells it to parse and execute the
 * command contained in the given string. The efun may return an integer
 * error code, or a string error message. If a string message is returned,
 * it should be displayed to the player. The integer codes are:
 * 
 * * 1: command has been processed ok
 * * 0: no matching command was found, no processing done
 * * -1: A matching command was found but none of its rules were matched.
 * * -2: A rule made sense but all "can" or "direct" applies returned 0.
 *
 */
mixed parse_sentence(string, void | int, void | object *, void | mapping);

/**
 * parse_refresh()
 *
 * The parsing package caches information about objects in order to improve
 * performance. This means that if any information that gets cached is
 * changed, you need to tell MudOS to clear the cache. That's what this efun
 * does. If the information returned by any of the applies below changes, you
 * need to call parse_refresh() so that the parser knows it has changed. For
 * example if the name of an object changes, or perhaps an adjective changes
 * as a spell is cast to change it from blue to red - call parse_refresh()
 * afterwards. The efun clears the cache for the object that called it.
 *
 */
void parse_refresh();

/**
 * parse_init()
 *
 * The efun parse_init() is used to tell MudOS that this object is one
 * that may use or be used by the parsing package. If your object does
 * not call this then trying to use other parsing efuns will generate a
 * runtime error and the parser will ignore the object when searching
 * for matches. Suggest call parse_init() from create() in the standard
 * object.
 *
 */
void parse_init();

/**
 * parse_command() - try to match a string with a given pattern
 *
 * parse_command()  is  a piffed up sscanf(3) operating on word basis.  It
 * works similar to sscanf(3) in that it takes a pattern  and  a  variable
 * set  of  destination  arguments. It is together with sscanf(3) the only
 * efun to use pass by reference for other variables  than  arrays.   That
 * is, parse_command() returns values in its arguments.
 * 
 * parse_command()  returns  1  if 'command' is considered to have matched
 * 'pattern'.
 * 
 * The 'env' or 'oblist' parameter either holds an object  or  a  list  of
 * objects.  If  it holds a single object than a list of objects are auto‐
 * matically created by adding the deep_inventory of the object,  ie  this
 * is identical:
 * 
 * parse_command(cmd, environment(), pattern, arg)
 * 
 * and
 * 
 * parse_command( cmd, ({ environment() }) +
 * deep_inventory(environment()), pattern, arg)
 * 
 * 'pattern' is a list of words and formats:
 * 
 * Example string = " 'get' / 'take' %i "
 * Syntax:
 * 'word'          obligatory text
 * [word]          optional text
 * /               Alternative marker
 * %o              Single item, object
 * %l              Living objects
 * %s              Any text
 * %w              Any word
 * %p              One of a list (prepositions)
 * %i              Any items
 * %d              Number 0- or tx(0-99)
 * 
 * The  'arg'  list  is zero or more arguments. These are the result vari‐
 * ables as in sscanf. Note that one variable is needed for each %_
 * 
 * The return types of different %_ is:
 * %o      Returns an object
 * %s      Returns a string of words
 * %w      Returns a string of one word
 * %p      Can on entry hold a list of word in array
 * or an empty variable
 * Returns:
 * if empty variable: a string
 * if array: array[0] = matched word
 * %i      Returns a special array on the form:
 * [0] = (int) +(wanted) -(order) 0(all)
 * [1..n] (object) Objectpointers
 * %l      Returns a special array on the form:
 * [0] = (int) +(wanted) -(order) 0(all)
 * [1..n] (object) Objectpointers
 * These are only living objects.
 * %d      Returns a number
 * 
 * The only types of % that uses  all  the  loaded  information  from  the
 * objects  are %i and %l. These are in fact identical except that %l fil‐
 * ters out all nonliving objects from the list of objects  before  trying
 * to parse.
 * 
 * The return values of %i and %l is also the most complex. They return an
 * array consisting of first a number and then all possible objects match‐
 * ing.   As  the  typical  string matched by %i/%l looks like: 'three red
 * roses', 'all nasty bugs' or 'second blue sword'  the  number  indicates
 * which of these numerical constructs was matched:
 * 
 * if numeral >0 then three, four, five etc were matched
 * if numeral <0 then second, twentyfirst etc were matched
 * if numeral==0 then 'all' or a generic plural form such as
 * 'apples' were matched.
 *
 * if (parse_command("spray car",environment(this_player()),
 * " 'spray' / 'paint' [paint] %i ",items))
 * {
 * /*
 * If the pattern matched then items holds a return array as
 * described under 'destargs' %i above.
 * *\/
 * }
 *
 */
int parse_command( string command, object|object* env,
                   string pattern, mixed arg... );

/**
 * parse_add_rule() - add parsing rules for a verb
 *
 * Here "verb" is the command word (e.g. "look", "read" etc), The "rule" is
 * the parsing rule to add. Rules are made up from two parts - tokens, and
 * prepositions. Tokens are used to match various objects or strings, and
 * prepositions are fixed positional words to specify meaning (like "with"
 * or "in").
 * 
 * The MudOS accepts six tokens that I'm aware of:
 * 
 * OBJ - matches a single object
 * OBS - matches one or more objects
 * LIV - matches a single, living object
 * LVS - matches one or more living objects
 * WRD - matches a single word
 * STR - matches one or more words
 *
 */
void parse_add_rule(string verb, string rule);

