// external.h

/**
 * external_start() - execute a shell command external to the driver
 *
 * Execute a shell command external to the driver.
 *
 * Commands that you would like to execute must be added to the runtime config.
 * The enumerated commands may then be invoked by their number as the first
 * argument to external_start `external_index`.
 *
 * This function returns the socket number which you should record for later
 * processing of the results from the external command. The classic callback
 * form is unchanged: it still returns that socket fd (`int`). The child is
 * started with posix_spawn() on POSIX and CreateProcess on Win32 (no
 * posix_spawn there).
 *
 * `args` - An array of the arguments passed to the external command, or a
 * space-separated string of arguments.
 * `read_call_back` - As data becomes available, this function will be called
 * with a string containing that data.
 * `write_call_back` - I am not 100% sure what would be written to the external
 * command, but, this is a required parameter.
 * `close_call_back` - When the socket closes, this function is called.
 *
 * The callbacks, when invoked, are passed:
 *
 * ```c
 * void read_call_back(int fd, string data);
 * void write_call_back(int fd);
 * void close_call_back(int fd);
 * ```
 *
 * OMIT the callbacks and external_start(index, args) returns a PROMISE
 * instead -- the same pattern as async_read(path) and call_out(delay).
 * It is fulfilled with ({ stdout, stderr, exit_code }) when the process
 * exits (a non-zero exit still fulfills -- read r[2]), or rejected with a
 * socket error (EESECURITY, EESOCKET, ...) if spawn fails, or with
 * "*external process aborted" if the owner is destructed first.
 *
 * ```c
 * mixed *r = await external_start( CURL_CMD, ({ "-s", url }) );
 * string body = r[0];
 * string err  = r[1];
 * int code    = r[2];
 * ```
 *
 * A handle from external_create() is started with external_run(), not this
 * efun.
 *
 * CANCELLING: this form has no handle. promise_reject(p, reason) of the
 * start promise KILLS the child, and 'p' stays rejected with 'reason' --
 * that is the one driver promise where rejecting also stops the work.
 * A timeout wrapper that rejects a gate promise instead does NOT kill the
 * child. For a handle, use external_kill() (stop, keep the result) or
 * external_close() (stop, discard).
 *
 * Configure the commands the driver will run by adding lines such as
 * `external_cmd_## : /path/to/command` to the runtime config, where ## is
 * the number passed as 'external_index':
 *
 * ```
 * # external commands
 * external_cmd_1 : /usr/bin/node
 * external_cmd_2 : /usr/bin/curl
 * ```
 *
 * This efun requires that PACKAGE_EXTERNAL be compiled into the driver.
 *
 * @see external_create, external_run, external_kill, external_write, external_close_stdin, external_stdout, external_stderr, external_exit_code, external_close, socket_write, socket_close, async_read, call_out
 */
int external_start( int external_index,
                    string | string * args,
                    string | function read_call_back,
                    string | function write_call_back,
                    void | string | function close_call_back );
promise<mixed *> external_start( int external_index, string | string * args );

/**
 * external_create() - allocate a handle for an external command
 *
 * Allocate a handle for a command configured as `external_cmd_N`. The
 * process is NOT started. Pass the handle to external_run() to run it
 * (awaitable), then read external_stdout(), external_stderr() and
 * external_exit_code() from the same handle.
 *
 * ```c
 * int h = external_create( CURL_CMD, ({ "-s", url }) );
 * mixed *r = await external_run(h);
 * string body = r[0];       // also external_stdout(h)
 * string err  = r[1];
 * int code    = r[2];
 * external_close(h);
 * ```
 *
 * Write to the child's stdin with external_write() (buffered until start,
 * then flushed). external_close_stdin() closes the write end so the child
 * sees EOF.
 *
 * 'args' is an array of arguments, or a space-separated string.
 *
 * The handle is OWNED by the calling object: another object cannot start,
 * read, write, or close it. Destructing the owner aborts a running process
 * and frees the handle.
 *
 * @see external_run, external_kill, external_start, external_write, external_close_stdin, external_stdout, external_stderr, external_exit_code, external_close
 */
int external_create( int external_index, string | string * args );

/**
 * external_run() - start a handle from external_create()
 *
 * Start the process for a handle from external_create() and return a
 * promise fulfilled with ({ stdout, stderr, exit_code }) when the process
 * exits (a non-zero exit still FULFILLS -- read r[2]), or rejected with a
 * socket error (EESECURITY, EESOCKET, ...) if spawn fails, or with
 * "*external process aborted" if the owner is destructed first. The child
 * is started with posix_spawn() (vfork fast path on glibc; Win32 uses
 * CreateProcess).
 *
 * ```c
 * int h = external_create( CURL_CMD, ({ "-s", url }) );
 * mixed *r = await external_run(h);
 * string body = external_stdout(h);  // same as r[0]
 * int code    = external_exit_code(h);  // same as r[2]
 * ```
 *
 * Drive stdin with external_write() (before or after start) and
 * external_close_stdin() when the child should see EOF:
 *
 * ```c
 * int h = external_create( CAT_CMD, ({ }) );
 * external_write(h, payload);
 * external_close_stdin(h);
 * mixed *r = await external_run(h);
 * ```
 *
 * A handle can be run only ONCE. Use external_start(index, args) when there
 * is no handle.
 *
 * CANCELLING:
 *
 * - external_kill(h) stops the child and KEEPS the handle: the run promise
 * still fulfills, with ({ stdout, stderr, 143 }).
 * - external_close(h) stops the child, frees the handle, and REJECTS the run
 * promise with "*external process aborted". Destructing the owner does the
 * same as external_close().
 * - promise_reject(p) of the run promise also kills the child; the promise
 * stays rejected with the given reason.
 *
 * @see external_create, external_start, external_kill, external_write, external_close_stdin, external_stdout, external_stderr, external_exit_code, external_close
 */
promise<mixed *> external_run( int handle );

/**
 * external_write() - write to an external command's stdin
 *
 * Append 'data' to the stdin of a handle from external_create(). Writes
 * BEFORE external_run() are buffered and flushed when the process starts.
 * Writes after start go to the stdin pipe (POSIX and Win32). On Win32,
 * stdout/stderr still share one socketpair; stdin is a separate anonymous
 * pipe so the child can ReadFile and WriteFile without deadlocking.
 *
 * The write end stays open until external_close_stdin() or
 * external_close(). Commands that read until EOF need the explicit close.
 *
 * ```c
 * int h = external_create( CAT_CMD, ({ }) );
 * external_write(h, "one\n");
 * mixed p = external_run(h);
 * external_write(h, "two\n");
 * external_close_stdin(h);
 * mixed *r = await p;
 * ```
 *
 * Returns 1 if the data was queued or written, 0 if stdin is already closed
 * or the process has exited (the data is dropped). Errors only if the handle
 * is invalid or not owned by this object.
 *
 * @see external_create, external_run, external_close_stdin, external_close
 */
int external_write( int handle, string data );

/**
 * external_close_stdin() - close an external command's stdin
 *
 * Close the write end of a handle's stdin after any buffered data is
 * flushed. The child then sees EOF. Does NOT kill the process or release
 * the handle; use external_close() for that.
 *
 * Safe to call before start: stdin is closed as soon as the process is
 * spawned and the pending buffer has been written.
 *
 * @see external_write, external_run, external_close
 */
void external_close_stdin( int handle );

/**
 * external_stdout() - collected stdout of an external_create() handle
 *
 * Return the stdout collected so far for 'handle'. Safe to call while the
 * process is still running (partial output) or after external_run(handle)
 * has fulfilled. After fulfillment this is the same string as r[0] of
 * ({ stdout, stderr, exit_code }) -- complete output, UTF-8 sanitized,
 * capped at __MAX_STRING_LENGTH__.
 *
 * @see external_create, external_run, external_stderr
 */
string external_stdout( int handle );

/**
 * external_stderr() - collected stderr of an external_create() handle
 *
 * Return the stderr collected so far for 'handle'. Same rules as
 * external_stdout().
 *
 * @see external_create, external_run, external_stdout
 */
string external_stderr( int handle );

/**
 * external_exit_code() - wait status of an external_create() handle
 *
 * -1 if the process has not exited yet. After `await external_run(h)`
 * fulfills, the child's wait status (the same as r[2] of the fulfillment
 * tuple): 0 on success, the exit code on a normal exit, and 128 + signo on
 * POSIX if the child died from a signal. A non-zero code does NOT reject
 * the start promise.
 *
 * @see external_create, external_run
 */
int external_exit_code( int handle );

/**
 * external_kill() - stop an external command, keep the handle
 *
 * Send SIGTERM to a running child (TerminateProcess with status 143 on
 * Win32, the same as 128 + SIGTERM). Returns 1 if a signal was sent, 0 if
 * the handle is not running (created, or already exited). Errors only if
 * the handle is invalid or not owned by this object.
 *
 * The run promise is NOT rejected. It fulfills when the child actually
 * exits, with ({ stdout, stderr, exit_code }) -- typically r[2] == 143.
 * Partial output stays on the handle.
 *
 * ```c
 * int h = external_create( SLEEP_CMD, ({ "20" }) );
 * mixed p = external_run(h);
 * call_out( (: external_kill, h :), 10);
 * mixed *r = await p;
 * external_close(h);
 * ```
 *
 * external_close(h) also kills a running child, but frees the handle and
 * rejects the run promise with "*external process aborted". Use
 * external_kill() when you still want the result.
 *
 * The omit-callback form has no handle: promise_reject(p, reason) of that
 * start promise kills the child. A timeout wrapper that rejects a gate
 * promise instead does NOT kill the child.
 *
 * @see external_run, external_close, external_start, promise_reject
 */
int external_kill( int handle );

/**
 * external_close() - release an external_create() handle
 *
 * Free the handle. If the process is still running it is aborted (the start
 * promise is rejected with "*external process aborted") and the child is
 * sent SIGTERM (or TerminateProcess on Windows). Destructing the owning
 * object closes every handle it still holds.
 *
 * @see external_create, external_run, external_kill
 */
void external_close( int handle );
