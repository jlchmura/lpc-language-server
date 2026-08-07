// promises.h

/**
 * promise_create() - create a new pending promise
 *
 * Returns a new promise in the pending state. A promise is a first-class
 * LPC value (`typeof` returns `"promise"`) holding the eventual result of
 * an asynchronous operation. It settles exactly once, either fulfilled via
 * promise_resolve() or rejected via promise_reject(); reactions attached
 * with promise_then() run on a later gametick after settlement.
 *
 * Promises compare by identity (`p == q` is true only for the same
 * promise) and may be used as mapping keys. They are not saved by
 * save_object().
 *
 * ```c
 * promise delay(int seconds) {
 *     promise p = promise_create();
 *     call_out( (: promise_resolve, p, 1 :), seconds);
 *     return p;
 * }
 * ```
 *
 * @see promise_resolve, promise_reject, promise_then, promise_status, promise_result
 */
promise promise_create();

/**
 * promise_resolve() - fulfill a pending promise
 *
 * Fulfills the pending promise 'p' with 'value' (0 if omitted). Reactions
 * attached with promise_then() and suspended `await` expressions resume on
 * a later gametick -- never synchronously from this call.
 *
 * If 'value' is itself a promise, 'p' adopts its eventual state instead of
 * fulfilling immediately (flattening): 'p' stays pending until 'value'
 * settles, then settles the same way. Resolving a promise with itself is
 * an error.
 *
 * It is an error to settle a promise that is already settled.
 *
 * @see promise_create, promise_reject, promise_then
 */
varargs void promise_resolve( promise p, void | mixed value );

/**
 * promise_reject() - reject a pending promise
 *
 * Rejects the pending promise 'p' with 'reason' (0 if omitted). Rejection
 * handlers attached with promise_then()/promise_catch() run on a later
 * gametick; an `await` suspended on 'p' raises 'reason' as an error at the
 * await point (catchable with `acatch`).
 *
 * It is an error to settle a promise that is already settled.
 *
 * A rejected promise whose rejection is never observed (no handler
 * attached, result never read) is reported to the debug log when it is
 * deallocated.
 *
 * @see promise_resolve, promise_catch, promise_then
 */
varargs void promise_reject( promise p, void | mixed reason );

/**
 * promise_then() - attach settlement handlers, chaining a new promise
 *
 * Attaches handlers to 'p' and returns a new promise for the handler's
 * result. When 'p' settles (or on the next gametick, if already settled):
 *
 * - fulfilled: on_fulfilled(result) runs; its return value fulfills the
 * chained promise (a returned promise is adopted). If omitted, the
 * fulfillment passes through unchanged.
 * - rejected: on_rejected(reason) runs; its return value FULFILLS the
 * chained promise (the rejection is handled). If omitted, the rejection
 * passes through to the chained promise.
 *
 * An error inside a handler rejects the chained promise with the error
 * text (reported like a caught error).
 *
 * Like call_out(0), handlers run without a command context by default;
 * with the "this player in call_out" driver option, this_player() at
 * attach time is restored during the handler.
 *
 * ```c
 * promise_then(fetch_account(uid),
 *     function(mapping acc) { return acc["balance"]; },
 *     function(mixed err)   { log_file("bank", err + "\n"); return -1; });
 * ```
 *
 * @see promise_catch, promise_create, promise_resolve, promise_reject
 */
varargs promise promise_then( promise p, void | function on_fulfilled, void | function on_rejected );

/**
 * promise_catch() - attach a rejection handler
 *
 * Shorthand for promise_then(p, 0, on_rejected): attaches only a rejection
 * handler and returns the chained promise. Fulfillment passes through
 * unchanged; a rejection runs on_rejected(reason), whose return value
 * fulfills the chained promise.
 *
 * @see promise_then, promise_reject
 */
promise promise_catch( promise p, function on_rejected );

/**
 * promise_status() - query a promise's state
 *
 * Returns the current state of promise 'p':
 *
 * ```
 * 0   pending
 * 1   fulfilled
 * 2   rejected
 * ```
 *
 * @see promise_result, promise_create
 */
int promise_status( promise p );

/**
 * promise_result() - read a settled promise's value or rejection reason
 *
 * Returns the fulfillment value or rejection reason of the settled promise
 * 'p'. It is an error to call this on a pending promise (check
 * promise_status() first, or use promise_then() / `await` instead).
 *
 * Reading a rejected promise's result counts as observing the rejection:
 * the unhandled-rejection report is suppressed for it.
 *
 * @see promise_status, promise_then
 */
mixed promise_result( promise p );

/**
 * async_info() - list the currently suspended async function frames
 *
 * Returns one mapping per async function that is currently suspended at an
 * `await`, oldest first. Each entry has:
 *
 * ```
 * "id"            int      stable identity, increasing with park order
 * "object"        object   the object whose function is suspended
 * "function"      string   the suspended function's name
 * "file"          string   source file of the await point
 * "line"          int      line of the await point
 * "promise"       promise  the promise the async call returned
 * "awaiting"      promise  the promise being awaited
 * "ready"         int      1 if `awaiting` has settled and the resume
 *                          is already queued for a later gametick
 * "acatch_depth"  int      number of acatch() regions around the await
 * ```
 *
 * This is the async counterpart of call_out_info(): a debugging and
 * monitoring view of pending work. An empty array means nothing is
 * suspended.
 *
 * The number of concurrently suspended frames is capped by the driver
 * option "max suspended async functions"; async_info() is the way to see
 * what is holding those slots.
 *
 * Unrelated to the async_read()/async_write() family from the async
 * package, which offloads file and database I/O to worker threads.
 *
 * @see call_out_info, promise_status, promise_then
 */
mapping *async_info();
