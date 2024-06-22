/**
 * Calls a function in another object or objects with optional arguments.
 *
 * call_other() calls a function named 'func' in another object 'ob' or in each object within an array of objects 'obs'.
 * It can pass optional arguments to the function being called. The return value from the function call is returned by
 * call_other. If calling on an array of objects, an array of return values is produced, corresponding to each object.
 *
 * @param {object | object[]} ob_or_obs The object or array of objects in which to call the function.
 * @param {string | mixed[]} func_or_args The name of the function to call, or an array where the first element is the function name and the remaining elements are arguments to pass to the function.
 * @param {...mixed} args Optional arguments to pass to the function.
 * @return {unknown | unknown[]} The return value from the function call, or an array of return values if called on an array of objects.
 * @example mixed result = call_other(target_object, "get_status");
 * @example mixed[] results = call_other(all_objects, "get_status");
 */
unknown call_other(object | object[] ob_or_obs, string | mixed[] func_or_args, ...args);

/**
 * Schedules a delayed function call in the same object based on real time.
 *
 * call_out_walltime() is similar to call_out but schedules the function call based on real seconds,
 * not game loop ticks. The delay can be specified in seconds or fractions of a second, allowing for
 * precise timing. This function is useful for events that need to occur at specific real-world times
 * rather than in-game time intervals.
 *
 * @param {string | function} fun The name of the function to call or a function pointer.
 * @param {int | float} delay The delay before the function is called, in real seconds or fractions thereof.
 * @param {...mixed} arg Optional arguments to pass to the function.
 * @return {int} The handle for the scheduled call, which can be used with remove_call_out.
 * @see remove_call_out(), call_out_info(), call_out()
 */
int call_out_walltime(string | function fun, int | float delay, mixed... arg);

/**
 * Schedules a future function call in the same object.
 *
 * call_out schedules a future call of the function 'fun' in this_object(). The call will occur after
 * a delay specified in seconds, with each of the provided arguments 'arg' passed to the function. The
 * arguments can be of any type. If the gametick in the runtime configuration is less than 1000, the
 * delay can be specified as a float in milliseconds (gametick / 1000), representing a value divisible
 * by the gametick. Delays not equally divisible by the gametick value will be rounded up to the next
 * game tick. A delay of 0 has a special meaning, which is not detailed here.
 *
 * This function is useful for scheduling events or actions to occur after a specific time interval,
 * allowing for timed interactions or delayed responses within the game environment.
 *
 * @param {string | function} fun The name of the function to call or a function pointer.
 * @param {int | float} delay The delay before the function is called, in seconds or milliseconds.
 * @param {...mixed} arg Optional arguments to pass to the function.
 * @return {int} The handle for the scheduled call, which can be used with remove_call_out to cancel the call.
 * @example int handle = call_out("reminder", 60, "Time to check the oven!");
 */
int call_out(string | function fun, int | float delay, mixed... arg);


/**
 * Returns information about the functions involved in calling this function.
 *
 * call_stack() provides details about the call stack at the point where it is invoked. Depending on the
 * value of the 'option' parameter, different types of information can be returned:
 * - If 'option' is 0, it returns an array of the names of the programs on the call stack, with the first
 *   one being the most recent (i.e., the currently running program).
 * - If 'option' is 1, it returns the objects in which those programs are executing.
 * - If 'option' is 2, the names of the functions on the call stack are returned.
 * - If 'option' is 3, the value of origin() in that frame is returned.
 * - If 'option' is 4, the values will be the full file paths and the line numbers.
 *
 * This function is useful for debugging or for understanding the context in which a particular piece of
 * code is executed.
 *
 * @param {int} option Specifies the type of information to return about the call stack.
 * @return {mixed[]} An array of information about the call stack, the type of which depends on the 'option' parameter.
 * @example string *call_stack_info = call_stack(2); // Returns the names of the functions on the call stack.
 * @see origin()
 */
string *call_stack(int option);

/**
 * Catches an evaluation error during the execution of an expression.
 *
 * catch() evaluates the expression 'expr'. If the evaluation completes without error, 0 is returned.
 * If an error occurs during the evaluation, a string describing the error is returned. This string
 * begins with a '*'. The throw() function can be used in conjunction with catch() to immediately
 * return a value from within the caught expression, except for 0. It's important to note that catch()
 * is not a standard function call but a compiler directive, indicating its unique operation at compile
 * time rather than runtime.
 *
 * Due to its performance cost, catch() should be used sparingly and only in situations where an error
 * could compromise the consistency or stability of the program.
 *
 * @param {mixed} expr The expression to evaluate.
 * @return {mixed} 0 if no error occurs, or a string describing the error if one occurs.
 * @example mixed result = catch( risky_operation() );
 */
mixed catch(mixed expr);

/**
 * Determines how the current function was called.
 *
 * origin() returns an integer specifying the method by which the current function was invoked.
 * This can be useful for debugging or controlling access to certain functions based on their
 * call origin. The return value corresponds to a specific origin type, as detailed below:
 *
 * - 1: Driver (heart_beats, etc)
 * - 2: Local function call
 * - 4: call_other()
 * - 8: simul_efun object via a simul_efun call
 * - 16: call_out()
 * - 32: called by an efun (sort_array, etc)
 * - 64: function_pointer
 * - 128: functional
 *
 * @return {int} An integer representing the call origin.
 * @example int call_type = origin();
 */
int origin(void);

/**
 * Returns the object(s) that called the current function.
 *
 * previous_object() returns an object pointer to the object, if any, that called the current
 * function. Local function calls do not change the previous_object() to the current object,
 * but leave it unchanged. If passed a positive integer, it traverses back the given number
 * of previous objects in the calling chain. previous_object(0) is equivalent to calling
 * previous_object() without arguments, previous_object(1) refers to the previous object's
 * previous_object(), and so on. previous_object(-1) returns an array containing all of the
 * previous objects in the calling chain.
 *
 * This function is useful for determining the caller in a sequence of function calls, which
 * can be helpful for debugging, access control, or tracking the flow of execution.
 *
 * @param {int | void} steps Optional. The number of steps to go back in the calling chain.
 * @return {object | object[]} An object pointer or an array of object pointers.
 * @example object caller = previous_object();
 * @example object[] call_chain = previous_object(-1);
 */
mixed previous_object(int | void steps);

/**
 * Determines whether or not a given object is shadowing another.
 *
 * shadowp() checks if the object 'ob' is currently shadowing another object. If 'ob' is shadowing
 * another object, the function returns the object being shadowed. If 'ob' is not shadowing any
 * object, it returns 0. This function is useful for identifying shadow relationships between
 * objects, which can affect how calls are processed and how data is accessed or modified.
 *
 * @param {object} ob The object to check for shadowing.
 * @return {object | int} The object being shadowed, or 0 if 'ob' is not shadowing any object.
 * @see shadow(), objectp(), valid_shadow()
 */
object shadowp(object ob);

/**
 * Removes a pending call_out.
 *
 * remove_call_out() can be used in three forms:
 * - When given a string 'fun', it removes the next pending call_out for the function named 'fun' in the current object.
 *   The return value is the number of seconds remaining before the call_out was to be executed, or -1 if there was no
 *   call_out pending for this function.
 * - When given an integer 'handle', it removes a pending call_out identified by this handle, which was returned from
 *   the call_out() function. The return value is the number of seconds remaining before the call_out was to be executed,
 *   or -1 if there was no valid call_out identified by the handle.
 * - When called without arguments, it removes all pending call_outs in the current object. The return value is the number
 *   of call_outs that were removed.
 *
 * This function is useful for managing delayed function calls, allowing for their cancellation or postponement.
 *
 * @param {string | int | void} fun_or_handle Optional. The name of the function or the handle of the call_out to remove.
 * @return {int} The number of seconds remaining before the call_out was to be executed, the number of call_outs removed, or -1 if no matching call_out was found.
 * @example int time_left = remove_call_out("scheduled_function");
 * @example int removed = remove_call_out();
 */
int remove_call_out(mixed fun_or_handle);

/**
 * Shadows one or more functions in some object.
 *
 * shadow() is used to shadow functions in another object 'ob'. If 'flag' is 1 or missing,
 * the current object will shadow 'ob'. If 'flag' is 0, then the function either returns 0,
 * or the object that is already shadowing 'ob'.
 *
 * The master object defines the function "valid_shadow()". If it returns 1, the target object
 * can't be shadowed, and the "shadow()" function will return 0 instead of 'ob'.
 *
 * If an object 'a' shadows an object 'b', then all "call_other(func)" to 'b' will be redirected
 * to 'a'. If object 'a' has not defined the function, then the call will be forwarded to 'b'
 * (as if there were no shadow). There is only one object that can call functions in 'b' with
 * call_other(), and that is 'a'. Not even object 'b' can "call_other()" itself. All normal
 * (internal) function calls inside 'b' will however remain internal to 'b'.
 *
 * There are two ways to remove the shadow. Either destruct it, or the object that was shadowed.
 * In the latter case, the shadow will also be destructed automatically.
 *
 * @param {object} ob The object to be shadowed.
 * @param {int} flag If 1 or missing, the current object will shadow 'ob'. If 0, returns either 0 or the object already shadowing 'ob'.
 * @return {object | int} The object being shadowed, or 0 if the shadowing is not permitted or if 'flag' is 0 and 'ob' is not being shadowed.
 */
object shadow(object ob, int flag);

/**
 * Returns the object pointer of the calling object.
 *
 * this_object() returns the object pointer of this object. This function is useful when
 * an object wants to call functions that are not in the same source file but are in the
 * same object (via inheritance).
 *
 * @return {object} The object pointer of the calling object.
 * @see this_player(3), previous_object(3), origin(3)
 */
object this_object(void);

/**
 * Forces an error to occur in an object.
 *
 * The throw() efun may be used to force an error to occur in an object. When used in conjunction,
 * throw() and catch() allow the programmer to choose what error message is displayed when a runtime
 * error occurs. When throw() is used, it should be used in conjunction with the catch(3) efun.
 * Here is a typical usage:
 *
 *    string err;
 *    int rc;
 *
 *    err = catch(rc = ob->move(dest));
 *    if (err) {
 *
 * @param {mixed} error The error message or object to be thrown.
 */
void throw(mixed error);