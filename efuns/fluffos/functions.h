// functions.h

/**
 * functionp()  -  determine whether or not a given variable is a function pointer, and if so what kind
 * @param arg - The variable to check
 * @returns {arg is function} 1 if arg is a function pointer, 0 otherwise
 * 
 * Return nonzero if 'arg' is a function pointer and zero  (0)  otherwise.
 * Function  pointers are variables of type 'function' as indicated in the
 * documentation for the type 'function', for example:
 * ```c
 * f = (: obj, func :);
 * ```
 * The return value indicates the type of function pointer using the  val‐
 * ues given in the driver include file "include/function.h".
 * 
 * function pointer type       value
 * ---------------------       -----
 * call_other                  FP_CALL_OTHER
 * lfun                        FP_LOCAL
 * efun                        FP_EFUN
 * simul_efun                  FP_SIMUL
 * functional                  FP_FUNCTIONAL
 * 
 * In addition, the following values will be added in some cases:
 * FP_HAS_ARGUMENTS            arguments provided
 * FP_OWNER_DESTED             creator has been dested
 * FP_NOT_BINDABLE             not rebindable)
 * 
 * The last set of values are bit values and can be tested with bit opera‐
 * tions. The value FP_MASK is provided for ignoring the bit values and
 * testing the basic type of the function pointer.
 * 
 * Examples:
 * 
 * To test if a function variable is an efun pointer:
 * ```c
 * if ((functionp(f) & FP_MASK) == FP_EFUN) ...
 * ```
 * to test if it has args:
 * ```c
 * if (functionp(f) & FP_HAS_ARGUMENTS) ...
 * ```
 */
int functionp( mixed arg );

/**
 * evaluate() - evaluate a function pointer
 *
 * If f is a function, f is called with the rest of the arguments.  Other‐
 * wise, f is returned.  evaluate(f, ...) is the same as (*f)(...).
 *
 */
mixed evaluate(mixed f... );

/**
 * defer() - execute function after current function ends
 *
 * Call function pointer *f when current function ends (even if it
 * was due to a runtime error).
 * 
 * For example:
 * 
 * void create()
 * {
 * ::create();
 * 
 * defer( (: enable_commands :) );
 * }
 * 
 * The effect the defer() function has is it will cause the
 * enable_commands() efun to be called after the execution of the
 * create() function ends.  The argument passed to defer() can be
 * any function type.
 *
 */
void defer(function f);

/**
 * bind() - change the owner of a function pointer
 *
 * Returns  a  function pointer that is exactly the same as f, but belongs
 * to the object 'ob' instead of the object that created f.  Useful if the
 * creator  of 'f' has been destructed, or f is an efun pointer to an efun
 * which does something to 'this_object'.
 * 
 * For example:
 * 
 * void make_living(object ob) {
 * function f;
 * 
 * f = bind( (: enable_commands :), ob );
 * 
 * evaluate(f); }
 * 
 * The effect of the above is the same as if 'ob' itself had evaluated the
 * enable_commands() efun.  Note that there are security risks involved in
 * this, as bind() allows you to force another object to run  a  piece  of
 * code.   To  protect  against this, there is a valid_bind() master apply
 * which must return 1 or the call to bind() will fail.
 *
 */
function bind(function f, object ob);

