// calls.h

/**
 * throw() - forces an error to occur in an object.
 *
 * The  throw()  efun may be used to force an error to occur in an object.
 * When used in conjunction, throw() and catch() allow the  programmer  to
 * choose  what  error  message  is displayed when a runtime error occurs.
 * When throw() is used,  it  should  be  used  in  conjunction  with  the
 * catch(3) efun.  Here is a typical usage:
 * 
 * string err;
 * int rc;
 * 
 * err = catch(rc = ob->move(dest));
 * if (err) {
 * throw("move.c: ob->move(dest): " + err + "\n");
 * return;
 * }
 *
 */
void throw(mixed);

/**
 * this_object() - return the object pointer of the calling object
 *
 * Return the object pointer of this object.  This function is useful when
 * an object wants to call functions that are not in the same source  file
 * but are in the same object (via inheritance).
 *
 */
object this_object( void );

/**
 * shadow() - shadow one or more functions in some object
 *
 * If  'flag'  is  1  or missing, then current object will shadow 'ob'. If
 * 'flag' is 0, then either 0 will be returned,  or  the  object  that  is
 * already shadowing 'ob'.
 * 
 * The master object defines the function "valid_shadow()".  If it returns
 * 1 the target object can't be shadowed, and the "shadow()" function will
 * return 0 instead of 'ob'.
 * 
 * If  an object 'a' shadows an object 'b', then all "call_other(func)" to
 * 'b' will be redirected to 'a'. If object 'a' has not defined the  func‐
 * tion,  then  the  call  will  be  forwarded to 'b' (as if there were no
 * shadow).  There is only one object that can call functions in 'b'  with
 * call_other(),  and  that is 'a'. Not even object 'b' can "call_other()"
 * itself. All normal (internal) function calls inside  'b'  will  however
 * remain internal to 'b'.
 * 
 * There  are  two  ways  to remove the shadow. Either destruct it, or the
 * object that was shadowed. In the latter case, the shadow will  also  be
 * destructed automatically.
 * 
 * The result is that it is possible to hide an object behind another one,
 * but everything can be  totally  transparent.   The  shadow()  efunction
 * makes  it possible to change the behavior of an object without changing
 * the code for the object in question.  One possible use for shadow()  is
 * to  add  special  capabilities  to  various  classes of players (thief,
 * fighter, mage, etc).  This usage would make it  possible  to  keep  the
 * player object much simpler than it could be if the code for the various
 * classes had to be in the player object itself.
 *
 */
varargs object shadow( object ob, int flag );

/**
 * remove_call_out() - remove a pending call_out
 *
 * In  the  first form this function removes the next pending call out for
 * function <fun> in the current object.  The return  value  is the number
 * of  seconds  remaining  before  the callback was to be called, or -1 if
 * there was no call out pending to this function.
 * 
 * In the second form, this function removes a pending call out identified
 * by  the  <handle>  returned  from the  call_out()  function. The return
 * value is the number of remaining seconds before the call_out was to  be
 * called,  or -1  if  there  was  no  valid  call_out  identified  by the
 * specified <handle>.
 * 
 * In the third form all pending call outs for the current object will be
 * removed. In this case the return value is always 0.
 *
 */
int remove_call_out( string fun );
int remove_call_out( int handle );
int remove_call_out();

/**
 * shadowp()  -  determine  whether  or  not  a  given object it shadowing
another
 *
 * Returns the object that 'ob' is shadowing, or zero (0)  if  it  is  not
 * shadowing any object.
 *
 */
object shadowp( object ob );

/**
 * previous_object() - returns the object(s) that called the current func‐
tion
 *
 * Returns an object pointer to the object, if any,  that  called  current
 * function.   Note that local function calls do not set previous_object()
 * to the current object, but leave it unchanged.  If  passed  a  positive
 * integer, it goes back the given number of previous objects in the call‐
 * ing chain.  previous_object(0) is the same as previous_object(), previ‐
 * ous_object(1)  is the previous object's previous_object(), etc.  previ‐
 * ous_object(-1) returns an array containing all of the previous objects.
 *
 */
mixed previous_object( int | void );

/**
 * origin() - determine how the current function was called
 *
 * @returns a string specifying how the current function was called.
 * Current values are:
 * 
 * "driver"            Driver (heart_beats, etc)
 * "local"             Local function call
 * "call_other"        call_other()
 * "simul"             simul_efun object via a simul_efun call
 * "internal"          call_out(), etc
 * "efun"              called by an efun (sort_array, etc)
 * "function pointer"  function_pointer
 * "functional"        functional
 */
string origin();

/**
 * catch() - catch an evaluation error
 *
 * Evaluate  <expr>.  If  there  is no error, 0 is returned. If there is a
 * standard error, a string (with a leading '*') will be returned.
 * 
 * The function throw() can also be used to immediately return any  value,
 * except 0. catch() is not really a function call, but a directive to the
 * compiler.
 * 
 * The catch() is somewhat costly, and should not be used  just  anywhere.
 * Rather, use it at places where an error would destroy consistency.
 *
 * void example1() {
 * object ob ;
 * mixed err ;
 * 
 * err = catch( ob = load_object("/obj/weapon/sword") ) ;
 * if(err) throw("There was an error loading the specified file.") ;
 * }
 * 
 * void example2() {
 * mixed err = catch {
 * string file, *files = ({
 * "/u/g/gesslar/one",     // good file
 * "/u/g/gesslar/two",     // bad file
 * "/u/g/gesslar/three",   // good file
 * }) ;
 * 
 * foreach(file in files) load_object(file) ;
 * } ;
 * 
 * if(err) printf("ERR: %O", err) ;
 * }
 * 
 * // ERR: "*Error in loading object '/u/g/gesslar/two'"
 *
 */

// This will be handled through the parser
// mixed catch( mixed expr );

/**
 * call_stack - returns information about the functions involved in calling
this function
 *
 * If the int `option` argument is 0, call_stack() returns an array of the
 * names of the on the call stack, with the first one being the most recent
 * (i.e. the currently running program).  If the int argument is 1, call_stack
 * returns the objects in which that program is executing.  If it is 2, the
 * name of the functions are returned.  If it is 3, the value of origin() in
 * that frame is returned. If it is 4, the value will be the full file path
 * and the line number.
 *
 */
varargs string *call_stack(int option);

/**
 * call_out_walltime - delayed function call in same object
 *
 * This efun is identical to call_out except it does not schedule the
 * call on the game loop. Rather, in real seconds. The delay can be in
 * seconds or fraction of a second.
 *
 */
int call_out_walltime( string | function fun, int | float delay, mixed arg ... );

/**
 * call_out - delayed function call in same object
 *
 * Schedule a future call of function <fun> in this_object(). The call will
 * take place in <delay> seconds, with each of the arguments <arg> provided.
 * <arg> can be of any type.
 * 
 * If the gametick in the runtime config is less than 1000, you may specify
 * a <delay> as a float in milliseconds (gametick / 1000) representing a
 * value that is divisible by the gametick. A <delay> which is not equally
 * divisible by the gametick value will be rounded up to the next game tick.
 * A <delay> of 0 is special, see below.
 * 
 * For example, if your gametick is set to 250ms in the runtime config,
 * you may perform callouts with a granularity of a quarter of a second.
 * call_out( "function", 0.75 ) will execute the <fun> in 3 game ticks
 * (750 milliseconds), thereby affording more precision over timing
 * when calling out.
 * 
 * A <delay> of 0 (or 0.0), will perform <fun> on the same gametick in which
 * it was called after all previous call_outs have been executed. The number
 * of call_outs(0)s which may be executed on the same gametick may be
 * configured via the "call_out(0) nest level" property in the runtime config.
 * 
 * Please note that you can't rely on write() or say() in <fun> since
 * this_player() is set to 0. Use tell_object() instead.
 * 
 * The runtime config value "this_player in call_out" exists to remedy the
 * above problem.
 * 
 * The return value is an integer representing the handle of the call_out
 * which may be used as an argument to remove_call_out().
 *
 */
int call_out( string | function fun, int | float delay, mixed arg ... );

/**
 * call_other() - call a function in another object
 *
 * Calls  a  function in another object, with [optional] argument(s).  The
 * return value is returned from the other object, so it cannot  be  known
 * at  compile  time  and may need to be cast if using type checking.  The
 * function named 'func' will be called in 'ob', with arguments 3, 4,  etc
 * given as arguments 1, 2, etc to 'func' in 'ob'.  call_other will return
 * the return value of 'func'.  If the first argument is an array  instead
 * of  an object, then the call will be done in all elements of that array
 * (all elements should be of type object), and an array of  returns  will
 * be  returned.   If argument 2 is an array instead of a string, then the
 * first element in the array should be a string, the  function  to  call,
 * and all other elements will be passed to the function in the order they
 * appear in the array.
 * 
 * There is a much more attractive way to do call_others:
 * 
 * object ob | object *obs -> func ( ... );
 * 
 * ie,
 * 
 * call_other(ob, "query", "name");
 * 
 * could be written as:
 * 
 * ob->query("name");
 * 
 * Using an array as second argument, the same call could be written:
 * 
 * call_other(ob, ({ "query", "name" }));
 * 
 * An example of using an array as the first argument:
 * 
 * users()->quit();
 *
 */
mixed call_other( object|object* ob, string|mixed * funcArgs... );

