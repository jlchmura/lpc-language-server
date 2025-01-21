// system.h

/**
 * uptime()  -  return the number of seconds elapsed since the last driver
reboot
 *
 * This function returns the number  of  seconds  since  the  last  driver
 * reboot.
 *
 */
int uptime( void );

/**
 * trace_start - start collecting driver trace
 *
 * Calling this function will start collecting tracing information from the
 * driver. This includes LPC function level execution information.
 * 
 * The trace collection will stop and write the json data to  `filename` on
 * `trace_end()`  or after  `auto_stop_sec`  seconds,  which defaults to 30
 * seconds.
 * 
 * Note: do not leave tracing enabled for too long or you will risk running
 * out of memory.
 * @param filename the file to write the trace data to
 * @param auto_stop_sec the number of seconds to collect trace data before stopping, defaults to 30 seconds
 */
varargs void trace_start(string filename, int auto_stop_sec);

/**
 * trace_end - stop collecting driver trace
 *
 * Calling this function will stop an active trace and write out the result
 * to the file provided by `trace_start(filename)`.
 * 
 * Note: do not leave tracing enabled for too long or you will risk running
 * out of memory.
 *
 */
void trace_end();

/**
 * time_ns() - return the number of nanoseconds since January 1, 1970
 *
 * Return the number of nanoseconds since midnight (GMT) January 1, 1970.
 *
 */
int time_ns( void );

/**
 * time() - return the number of seconds since January 1, 1970
 *
 * Return the number of seconds since midnight (GMT) January 1, 1970.
 *
 */
int time( void );

/**
 * sys_reload_tls() - Reload the TLS certificate and key for given port.
 *
 * Reload the TLS certificate and key for given port index, as specified in config file.
 * 
 * For example, if you defined external_port_1_tls in the config then you can calling sys_reload_tls(1) to reload
 * it. This allows you to update the certificate and key without restarting the server.
 * 
 * Note:
 * - you have to overwrite the previous cert/key file on disk before calling this function.
 * - reloading TLS for websocket port is not currently supported.
 *
 */
void sys_reload_tls ( int port_index );

/**
 * sys_network_ports() - display the active network ports
 *
 * Returns an array of arrays; one for each network port that is being actively
 * used.
 *
 */
mixed *sys_network_ports(void);

/**
 * strptime() - parse string as local time
 *
 * Parse given time 'str' with a format string, see:
 * https://man7.org/linux/man-pages/man3/strptime.3.html
 *
 */
int strptime( string fmt, string str );

/**
 * strftime() - format time as string
 *
 * Format given time with a format string, see:
 * https://man7.org/linux/man-pages/man3/strftime.3.html
 *
 */
string strftime( string fmt, int time );

/**
 * shutdown() - shutdown the driver
 *
 * This function shuts down the driver in a controlled fashion (as opposed
 * to how a crash would shut it down).  The 'how' argument  specifes  what
 * integer  value that driver should pass to exit().  The convention is to
 * pass 'how' as -1 when the script that restarts the driver should die as
 * well.   Thus a reboot command would use shutdown() while a halt command
 * would use shutdown(-1).  The script must explicitly  check  the  return
 * value  to  see  if  it is -1 if you wish to use this convention.  Obvi‐
 * ously, shutdown() is a sensitive function and should  be  secured.   As
 * with  exec(),  the  way to make it secure is to add a simul_efun of the
 * same name which does the appropriate security checks.  Be sure  to  set
 * valid_override(4) up (in master.c) to protect against efun::shutdown().
 *
 */
varargs void shutdown( int how );

/**
 * set_reset - modify the time until reset on an object
 *
 * Sets  the  time  until  reset  on  'ob' to 'time' seconds from now.  If
 * 'time' is omitted, the driver's normal reset time  setting  formula  is
 * applied to 'ob', that is,
 * 
 * reset time = current_time + reset_time / 2 + random(reset_time / 2)
 *
 */
varargs void set_reset( object ob, int time );

/**
 * set_eval_limit() - set the maximum evaluation cost
 *
 * set_eval_limit(),  with a nonzero argument, sets the maximum evaluation
 * cost that is allowed for any one thread before a runtime error  occurs.
 * With  a  zero argument, it sets the current evaluation counter to zero,
 * and the maximum  cost  is  returned.   set_eval_limit(-1)  returns  the
 * remaining evaluation cost.
 *
 */
void set_eval_limit( int );

/**
 * reset_eval_cost() - resets the evaluation cost remaining
 *
 * reset_eval_cost(),  resets the evaluation cost remaining to the maximum
 * evaluation cost.
 * 
 * Returns the new eval cost.
 *
 */
int reset_eval_cost();

/**
 * replace_program() - replaces the program in this_object()
 *
 * replace_program() replaces the program in this_object() with that of an
 * object it inherits.  The string argument is the filename of the  object
 * whose  program  is  to  be used.  Once the replacement takes place, the
 * current object effectively becomes a clone of that  other  object,  but
 * with  its  current  filename and global variable values. The program is
 * not actually replaced until the current execution is completed.
 *
 */
void replace_program( string str );

/**
 * reclaim_objects - reclaim any lingering objets
 *
 * Cycles  through  all  objects  that are loaded, and frees any lingering
 * objects that it can.  This could result in a sizable amount  of  memory
 * being  freed  up, depending on how the mud is coded.  Objects are typi‐
 * cally left lingering when a global variable in  more  than  one  object
 * contains  a  pointer  to it, and the object gets destructed.  This efun
 * returns the number of destructed objects encountered in variables.
 *
 */
int reclaim_objects( void );

/**
 * perf_counter_ns() - gives epoch time measurement in nanoseconds
 *
 * Return the number of nanoseconds since midnight (GMT) January 1, 1970.
 *
 */
int perf_counter_ns( void );

/**
 * max_eval_cost() - returns the maximum evaluation cost
 *
 * max_eval_cost() returns the number of instructions that can be executed
 * before the driver decides it is in an infinite loop.
 *
 */
void max_eval_cost();

/**
 * localtime() - convert to local time
 *
 * localtime() converts a time value (as returned by time()) into an array
 * of values which represents the time locally.  In the  past  time()  was
 * used to get the time in GMT (UTC), and then local definitions were used
 * to determine the local offset from GMT.  This roundabout approach is no
 * longer  necessary.  localtime() returns the seconds, minutes and hours,
 * the day, month and year, day of the week, day of the year, the name  of
 * the  local  timezone and how far the MUD is from GMT.  This information
 * is retrieved directly from the operating system and made  available  to
 * the driver without the use of MUD-specific configuration files.
 * 
 * localtime()  returns  an  array  containing the values specified above.
 * The index for each value is defined symbolically in  localtime.h.   The
 * following table summarizes the array returned by localtime().
 * 
 * int        LT_SEC      Seconds after the minute (0..59)
 * int        LT_MIN      Minutes after the hour (0..59)
 * int        LT_HOUR     Hour since midnight (0..23)
 * int        LT_MDAY     Day of the month (1..31)
 * int        LT_MON      Months since January (0..11)
 * int        LT_YEAR     Year (guarenteed to be >= 1900)
 * int        LT_WDAY     Days since Sunday (0..6)
 * int        LT_YDAY     Days since January 1 (0..365)
 * int        LT_GMTOFF   Seconds after GMT (UTC)
 * string     LT_ZONE     Timezone name
 * int        LT_ISDST    If DST is currently being observed
 *
 */
mixed *localtime( int time );

/**
 * inherits() - determine if an object inherits a given file
 *
 * inherits() returns 0 if obj does not inherit file, 1 if it inherits the
 * most recent copy of file, and 2 if it inherits an old copy of file.
 * 
 * If no object is passed as the second argument, this efun will default
 * to this_object().
 *
 */
int inherits( string file, object obj );

/**
 * inherit_list() - get a list of parents of an object
 *
 * Returns  an  array  of  filenames  of  objects  inherited by obj.  Only
 * directly inherited files are returned.  E.g.  if  A  inherits  B  which
 * inherits C, inherit_list(A) will return an array with B, but not C.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
string *inherit_list( object obj );

/**
 * function_profile() - get function profiling information for an object
 *
 * Returns  function  profiling  information for 'ob', or this_object() if
 * 'ob' is not specified.  This is only available if the driver  was  com‐
 * piled with PROFILE_FUNCTIONS defined.
 *
 */
mixed *function_profile( object ob );

/**
 * function_exists()  -  find  the  file containing a given function in an
object
 * @param str the name of the function to check for
 * @param ob the object to check in
 * @returns the file name of the object that defines the function  'str'  in
 * object  'ob'.  The  returned value can be other than 'file_name(ob)' if
 * the function is defined by an inherited object.
 * 
 * 0 is returned if the function was not defined.
 * 
 * Note that function_exists() does not check shadows.
 * 
 * If no object is passed as the second argument, this efun will default
 * to this_object().
 *
 */
varargs string function_exists( string str, object ob );

/**
 * flush_messages - send all pending messages to a user
 *
 * Normally, messages are queued, then sent all at once to minimize the
 * number of packets required.  This efun forces all pending messages to
 * be written immediately.  If no user is specified, messages for ALL users
 * are flushed.
 *
 */
int flush_messages();
int flush_messages(object user);

/**
 * find_call_out() - find a call out scheduled to be called
 *
 * Find a call out scheduled to be called either by function name or by
 * handle.
 * 
 * If the argument is a string, then the first call out due to be executed
 * for function 'func' is found, and the time left in seconds is returned.
 * If no call out is found, then return -1.
 * 
 * If the argument is an integer, then the call out with handle 'handle'
 * is found, and the time left in seconds is returned. If no call out is
 * found, then return -1.
 * 
 * This will find call outs scheduled by call_out() or call_out_walltime().
 * 
 * If the time remaining is fractional, then the result will be an integer,
 * the value of which will be floored.
 * 
 * Example:
 * int handle = call_out("func", 10);
 * printf("Remaining time: %O\n", find_call_out(handle));
 * // Remaining time: 10
 * 
 * int handle = call_out("func", 10.75);
 * printf("Remaining time: %O\n", find_call_out(handle));
 * // Remaining time: 10
 * 
 * This efun will only find call outs initiated by this_object().
 *
 */
int find_call_out( string func ) ;
int find_call_out( int handle ) ;

/**
 * eval_cost() - returns the evaluation cost remaining
 *
 * eval_cost()  returns  the  number  of instructions that can be executed
 * before the driver decides it is in an infinite loop.
 *
 */
int eval_cost();

/**
 * errorp() - determine whether or not a given variable is an error code
 *
 * Returns 1 if 'arg' is an integer that is an error code.
 * 
 * Eventually  efuns  will  be  modified to return standard error codes so
 * that code like this will be possible:
 * 
 * if (errorp(result = efun_call()))
 * printf("error = %d\n", result);
 * 
 * In future, there will also be a perror(result)  efun  to  return  error
 * string that goes with a particular error integer.
 *
 */
int errorp( mixed arg );

/**
 * error - generate a run-time error
 *
 * A  run-time error 'err' will be generated when error() is called.  Exe‐
 * cution of the current thread will halt, and the trace will be  recorded
 * to  the debug log.  'err' itself is allowed to have a length of maximal
 * 2045 characters not  counting  an  optional  '\n'  as  last  character.
 * Before processing if the error the optional '\n' will be removed, a '*'
 * will be prepended and an unconditional '\n' gets appended.
 * @throws err
 */
void error( string err );

/**
 * deep_inherit_list() - get a list of ancestors of an object
 *
 * Returns  an  array  of filenames of all objects inherited (directly and
 * indirectly) by obj.
 * 
 * If no object is supplied, this efun will default to this_object().
 *
 */
string *deep_inherit_list( object obj );

/**
 * ctime() - return a time string
 *
 * Gives  a  nice  string  with  current  date and time, with the argument
 * 'clock' that is the number of seconds since 1970.
 * 
 * If no arguments are provided, it will use the current time.
 *
 */
string ctime(void| int clock );

/**
 * call_out_info() - get pending call_out() information
 *
 * Get  information  about  all  pending  call outs. An array is returned,
 * where every item in the array consists  4  elements:  the  object,  the
 * function, the delay to go, and the optional argument.
 *
 */
mixed *call_out_info( void );

/**
 * all_previous_objects()  -  returns  an array of objects that called the
current function
 *
 * Returns an array of objects that called current  function.   Note  that
 * local  function  calls  do  not  set  previous_object()  to the current
 * object, but leave it unchanged.
 *
 */
object *all_previous_objects();

