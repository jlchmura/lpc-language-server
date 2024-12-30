// internals.h

/**
 * traceprefix() - sets the prefix determining which objects to trace
 *
 * If  the  the traceprefix is set (i.e. not 0) tracing will only occur in
 * objects having a name with the set prefix.
 *
 */
string traceprefix( string prefix );

/**
 * trace() - sets trace flags and returns the old ones.
 *
 * Sets  the trace flags and returns the old trace flags.  When tracing is
 * on a lot of information is printed during execution.
 * 
 * The trace bits are:
 * 
 * 1   Trace all function calls to lfuns.
 * 
 * 2   Trace all calls to "call_other".
 * 
 * 4   Trace all function returns.
 * 
 * 8   Print arguments at function calls and return values.
 * 
 * 16  Print all executed stack machine instructions (produces  a  lot  of
 * output!).
 * 
 * 32  Enable trace in heart beat functions.
 * 
 * 64  Trace calls to apply.
 * 
 * 128 Show object name in tracing.
 *
 */
int trace( int traceflags );

/**
 * time_expression()  -  return the amount of real time that an expression
took
 *
 * Evaluate <expr>.  The amount of real time that passed during the evalu‐
 * ation  of  <expr>,  in microseconds, is returned.  The precision of the
 * value is not necessarily 1 microsecond; in fact, it  probably  is  much
 * less precise.
 *
 */
int time_expression( mixed expr );

/**
 * swap - swap out a file explicitly
 *
 * This  efun  should be reserved for debugging only.  It allows an object
 * to be explicitly swapped out.  If enabled, it is  strongly  recommended
 * that a simul_efun override (for this efun) be used to prevent abuse.
 * 
 * Note:  objects which have been destructed, already swapped out, contain
 * a heart beat, cloned, inherited, or interactive, cannot be swapped out.
 *
 */
void swap( object );

/**
 * set_malloc_mask()  -  sets the mask controlling display of malloc debug
info
 *
 * This efun is only available when DEBUGMALLOC and DEBUGMALLOC_EXTENSIONS
 * are  both defined in options.h at driver build time.  The mask controls
 * what memory-related debugging information is displayed  as  the  driver
 * allocates  and  deallocates memory.  Read md.c in the driver source for
 * more information.
 *
 */
void set_malloc_mask( int mask );

/**
 * set_debug_level()  -  sets the debug level used by the driver's debug()
macro
 *
 * The purpose of this efun is to allow the amount and type of
 * debugging information produced to be controlled from within the mud
 * (while the driver is running).
 * 
 * The information is printed to stdout as well as to the file specified in
 * the runtime configuration file as the "debug log file" setting.
 * 
 * The level is a bitmask integer or a string. If using an integer, multiple
 * levels can be set by using the bitwise OR operator (|).
 * 
 * The following levels are available:
 * "call_out"        1 << 0
 * "d_flag"          1 << 2
 * "connections"     1 << 3
 * "mapping"         1 << 4
 * "sockets"         1 << 5
 * "comp_func_tab"   1 << 6
 * "LPC"             1 << 7
 * "LPC_line"        1 << 8
 * "event"           1 << 9
 * "dns"             1 << 10
 * "file"            1 << 11
 * "add_action"      1 << 12
 * "telnet"          1 << 13
 * "websocket"       1 << 14
 * 
 * When level is an integer, the debug level will be set to that value,
 * erasing any previous settings.
 * 
 * If level is a string, the debug level for that option will be toggled on,
 * while all other options will be preserved.
 *
 */
void set_debug_level( int | string level );

/**
 * set_config() - set various driver config settings during runtime
 *
 * This efun is used to set the driver's various config settings during
 * runtime. Please refer to the "runtime_config.h" include file for a list of
 * currently recognized options.
 * 
 * Note that this only modifies the currently running options and will not
 * persist across driver restarts.
 *
 * // set the driver's heartbeat to 1000 milliseconds
 * set_config(__RC_HEARTBEAT_INTERVAL_MSEC__, 1000)
 * 
 * // adjust the driver's limit for call_out(0)
 * set_config(__RC_CALL_OUT_ZERO_NEST_LEVEL__, 250)
 *
 */
void set_config( int option, mixed value );

/**
 * rusage() - reports information gathered by the getrusage() system call
 *
 * This  efun  collects  information  gathered  via the getrusage() system
 * call.  Read the getrusage() man  page  for  more  information  on  what
 * information   will   be  collected.   Some  systems  do  not  have  the
 * getrusage() system call but do have the times() system call.  On  those
 * systems,  only  "utime"  and  "stime"  will  be  available.   Times are
 * reported in milliseconds.
 * 
 * Here is an example usage of rusage():
 * 
 * void
 * create()
 * {
 * mapping info;
 * 
 * info = rusage();
 * write("user time = " + info["utime"] + "ms\n");
 * write("system time = " + info["stime"] + "ms\n");
 * }
 * 
 * The available fields are:
 * 
 * utime, stime, maxrss, ixrss, idrss, isrss, minflt,  majflt,  nswap,
 * inblock, oublock, msgsnd, msgrcv, nsignals, nvcsw, nivcsw.
 *
 */
mapping rusage( void );

/**
 * refs - return the number of references to a data structure
 *
 * The number of references to 'data' will be returned by refs().  This is
 * useful for deciding whether or not to make a copy of a  data  structure
 * before returning it.
 *
 */
int refs( mixed data );

/**
 * query_load_average() - forces an error to occur in an object.
 *
 * This  function  returns a string which reports two things: 1) user com‐
 * mands per second, and 2) compiled lines per second.
 *
 */
string query_load_average( void );

/**
 * opcprof() - reports statistics on calling frequencies of various efuns
 *
 * This  function dumps a list of statistics on each efunction and eopera‐
 * tor.  If no argument is specified, then the information will be  dumped
 * to  files  named  /OPCPROF.efun  and /OPCPROF.eoper.  If an argument is
 * specified, then that name is used as the filename for the dump.
 *
 */
void opcprof( string | void );

/**
 * mud_status() - report various driver and mudlib statistics
 *
 * This  function  writes  driver  and  mudlib  statistics to the caller's
 * screen.  If extra is non-zero,  then  additional  information  will  be
 * written.   This  function  replaces  the hardcoded 'status' and 'status
 * tables' commands in vanilla 3.1.2.
 *
 */
void mud_status( int extra );

/**
 * moncontrol() - turns on/off profiling during execution
 *
 * If passed 1, moncontrol() enables profiling.  If passed 0, moncontrol()
 * disables profiling.  It can be called many times during execution, typ‐
 * ical use is to profile only certain parts of driver execution.  moncon‐
 * trol() has no effect if profiling is  not  enabled  at  driver  compile
 * time.
 *
 */
void moncontrol( int on );

/**
 * memory_info - obtain info on object/overall memory usage
 *
 * If  optional argument 'ob' is given, memory_info() returns the approxi‐
 * mate amount of memory that 'ob' is using.  If  no  argument  is  given,
 * memory_info()  returns the approximate amount of memory that the entire
 * mud is using.  Note that the amount of memory the mud is using does not
 * necessarily  correspond  to  the amount of memory actually allocated by
 * the mud from the system.
 *
 */
varargs int memory_info( object ob );

/**
 * malloc_status() - report various statistics related to memory usage.
 *
 * This  function  writes  memory usage statistics to the caller's screen.
 * This function replaces the hardcoded 'malloc' command in vanilla 3.1.2.
 * Note  that  the  output  produced by malloc_status() depends upon which
 * memory management package is chosen  in  options.h  when  building  the
 * driver.
 *
 */
void malloc_status( void );

/**
 * get_config() - query various driver config settings
 *
 * This efun is used to query the driver's various config settings.
 * Please refer to the "runtime_config.h" include file for a list of currently
 * recognized options.
 *
 * get_config( __RC_HEARTBEAT_INTERVAL_MSEC__ );
 * get_config( __RC_CALL_OUT_ZERO_NEST_LEVEL__ );
 *
 */
string | int get_config( int );

/**
 * dumpallobj()  - report various statistics on all objects that have been
loaded
 *
 * This function dumps a list of statistics on all objects that have  been
 * loaded.   If  no  argument  is  specified, then the information will be
 * dumped to a file named /OBJ_DUMP.  If an argument  is  specified,  then
 * that name is used as the filename for the dump.
 *
 */
void dumpallobj( string | void );

/**
 * dump_socket_status() - display the status of each LPC socket
 *
 * dump_socket_status()  is  a diagnostic facility which displays the cur‐
 * rent status of all LPC sockets configured into the MudOS driver.  It is
 * useful  for debugging LPC sockets applications.  Each row in the output
 * corresponds to a single LPC socket.  The first row corresponds  to  LPC
 * socket descriptor 0, the second row, 1, etc.  The total number of sock‐
 * ets is configured when the driver is built.
 * 
 * The first column "Fd" is the operating system file  descriptor  associ‐
 * ated  with the LPC socket.  "State" is the current operational state of
 * the LPC socket.  "Mode" is the socket mode, which is passed as an argu‐
 * ment to socket_create().  The local and remote addresses are the Inter‐
 * net address and port numbers in Internet dot notations.  '*'  indicates
 * an  address  or  which  is  0.  N.B. LPC sockets that are in the CLOSED
 * state are not currently in use; therefore the data displayed  for  that
 * socket may be idiosyncratic.
 * 
 * The  following  output  was generated on Portals, where the only socket
 * application running at the time was MWHOD.  It indicates that two sock‐
 * ets  are  current in use, one is listening for connection requests on a
 * STREAM mode socket.  The other is waiting for incoming data on a  DATA‐
 * GRAM mode socket.
 * 
 * Fd    State      Mode      Local Address      Remote Address
 * --  ---------  --------  -----------------  ------------------
 * 13   LISTEN     STREAM   *.6889             *.*
 * 14    BOUND    DATAGRAM  *.6888             *.*
 * -1    CLOSED      MUD    *.*                *.*
 *
 */
void dump_socket_status( void );

/**
 * dump_prog() - dump/disassemble an LPC object
 *
 * dump_prog()  dumps  information  about  the program of 'obj' to a file,
 * 'file', or "/PROG_DUMP" if 'file' is not given.  If the current  object
 * does not have write access to the file, it fails.
 * 
 * Flags  can be a combination of the following values: 1 - include a dis‐
 * assembly of the i-code 2 - include line number information
 *
 * @param {object} ob - the object to dump
 * @param {int} flags - the flags to use, defaults to 
 * @param {string} file - the file to dump to, defaults to "/PROG_DUMP"
 */
varargs void dump_prog(object ob, int flags, string file);

/**
 * dump_file_descriptors() - dump the MudOS process file descriptor table
 *
 * This  function  is provided to assist in debugging the MudOS driver and
 * helps overcome deficiencies in some UN*X implementations which  do  not
 * provide  equivalent  or  superior  debugging  facilities as part of the
 * operating system itself.  The interpretation of the output is very sys‐
 * tem-dependent.  Each file descriptor is checked to determine whether it
 * refers to an open file.  If so, information is displayed from the "stat
 * structure" returned by the fstat() system call.
 * 
 * The following output was produced on Lambda Realms running on a Sequent
 * DYNIX/ptx system:
 * 
 * Fd  Device Number  Inode   Mode    Uid    Gid      Size
 * --  -------------  -----  ------  -----  -----  ----------
 * 0     3      2    10319  c  666      0      3           0
 * 1    79      7   164598  f  644   2862      1      789522
 * 2    79      7   164598  f  644   2862      1      789522
 * 3    40    33b     6925  c    0   2862      1           0
 * 4    40    2a4     6943  c    0   2862      1           0
 * 5    79      7   164599  f  600   2862      1       44784
 * 6    40    2e2   145996  c    0   2862      1           0
 * 7    79      7   164601  f  644   2862      1         506
 *
 */
void dump_file_descriptors( void );

/**
 * debugmalloc() - dumps information on malloc'd memory to a file.
 *
 * This efun is only available when DEBUGMALLOC and DEBUGMALLOC_EXTENSIONS
 * are both defined in options.h at driver build time.  The  debugmalloc()
 * efun will dump information on those chunks of memory allocated by DMAL‐
 * LOC() and related macros if the mask bitwise and'd  (&)  with  the  tag
 * supplied  by  the macro (i.e. (mask & tag)) is non-zero.  Read md.c and
 * config.h in the driver source for more information.
 *
 */
void debugmalloc( string filename, int mask );

/**
 * debug_levels
 *
 * Returns a mapping of the current debug levels, where the keys are the
 * names of the debug levels and the values 0 (disabled) or the integer
 * value representing the bitmask value of the debug level.
 *
 * set_debug_level( (1 << 0) | (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5) );
 * printf("%O\n", debug_levels());
 * 
 * Result:
 * ([ /* sizeof() == 14 *\/
 * "telnet" : 0,
 * "file" : 0,
 * "LPC_line" : 0,
 * "mapping" : 16,
 * "d_flag" : 4,
 * "add_action" : 0,
 * "event" : 0,
 * "comp_func_tab" : 0,
 * "sockets" : 32,
 * "dns" : 0,
 * "websocket" : 0,
 * "LPC" : 0,
 * "connections" : 8,
 * "call_out" : 1,
 * ])
 *
 */
mapping debug_levels();

/**
 * debug_info() - display debug information
 *
 * debug_info()  is  a general-purpose facility which may be used to debug
 * the MudOS driver.  The debugging information requested is determined by
 * the  first  argument.  Successive arguments are determine by the opera‐
 * tion selected.
 * 
 * The existing operations (0 and 1) require a second  object  type  argu‐
 * ment, and may be used to display the various fields of the MudOS object
 * structure.
 * 
 * The following LPC code was used to generate the sample output:
 * 
 * /* di0.c *\/
 * create() {
 * debug_info(0, this_object());
 * }
 * 
 * O_HEART_BEAT      : FALSE
 * O_IS_WIZARD       : FALSE
 * O_ENABLE_COMMANDS : FALSE
 * O_CLONE           : FALSE
 * O_DESTRUCTED      : FALSE
 * O_SWAPPED         : FALSE
 * O_ONCE_INTERACTIVE: FALSE
 * O_RESET_STATE     : FALSE
 * O_WILL_CLEAN_UP   : FALSE
 * O_WILL_RESET: TRUE
 * total light : 0
 * next_reset  : 720300560
 * time_of_ref : 720299416
 * ref         : 2
 * swap_num    : -1
 * name        : 'u/c/cynosure/di0'
 * next_all    : OBJ(bin/dev/_update)
 * This object is the head of the object list.
 * 
 * /* di1.c *\/
 * create() {
 * debug_info(1, this_object());
 * }
 * 
 * program ref's 1
 * Name u/c/cynosure/di1.c
 * program size 10
 * num func's 1 (16)
 * num strings 0
 * num vars 0 (0)
 * num inherits 0 (0)
 * total size 104
 *
 */
mixed debug_info( int operation... );

/**
 * cache_stats() - report various driver and mudlib statistics
 *
 * This  efun  is only available if CACHE_STATS is defined in options.h at
 * driver build time.  This efun  dumps  statistics  on  the  call_other()
 * cache hit rate to the caller's screen.
 *
 */
void cache_stats( void );

