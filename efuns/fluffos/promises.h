// promises.h

/**
 * promise_create() - create a new pending promise
 *
 * Returns a new promise in the pending state, with no declared payload
 * type -- it is a `promise<mixed>`, assignable to any `promise<T>`
 * variable. Only an `async` function's own promise carries a declared
 * payload.
 *
 * A promise is a first-class LPC value (`typeof` returns `"promise"`)
 * holding the eventual result of an asynchronous operation. It settles
 * exactly once, either fulfilled via promise_resolve() or rejected via
 * promise_reject(); reactions attached with promise_then() run from the
 * microtask drain after settlement -- never synchronously, but still
 * within the same gametick.
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
 * attached with promise_then() and suspended `await` expressions resume
 * from the microtask drain -- never synchronously from this call, but
 * still within the same gametick.
 *
 * If 'value' is itself a promise, 'p' adopts its eventual state instead of
 * fulfilling immediately (flattening): 'p' stays pending until 'value'
 * settles, then settles the same way. Resolving a promise with itself is
 * an error.
 *
 * It is an error to settle a promise that is already settled -- including
 * one whose fate is already committed to a pending adoption: after
 * promise_resolve(p, q) with 'q' still pending, a second
 * promise_resolve(p, ...) or promise_reject(p, ...) errors even though 'p'
 * itself has not settled yet.
 *
 * It is likewise an error to settle the promise an `async` function
 * returned -- that promise is the function body's result channel. The
 * promises the driver hands out for a pending operation (call_out(delay),
 * async_read()/async_write()/async_getdir(), and the one promise_then()
 * returns) stay settleable.
 *
 * @see promise_create, promise_reject, promise_then
 */
varargs void promise_resolve( promise p, void | mixed value );

/**
 * promise_reject() - reject a pending promise
 *
 * Rejects the pending promise 'p' with 'reason' (0 if omitted). Rejection
 * handlers attached with promise_then()/promise_catch() run from the
 * microtask drain -- never synchronously from this call, but still within
 * the same gametick; an `await` suspended on 'p' raises 'reason' as an
 * error at the await point (catchable with `acatch`).
 *
 * It is an error to settle a promise that is already settled, or one whose
 * fate is already committed to a pending adoption, or the promise an
 * `async` function returned.
 *
 * A rejected promise whose rejection is never observed (no handler
 * attached, result never read) is reported to the debug log when it is
 * deallocated. The report names where the promise was REJECTED, since
 * deallocation can be arbitrarily far from the rejection.
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
 * Like call_out(0) callbacks, handlers are governed by the "this_player
 * in call_out" driver option: with the option enabled (the default),
 * this_player() at attach time is restored during the handler; with it
 * disabled, handlers run without a command context.
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
 * Attaches only a rejection handler and returns the chained promise.
 * Fulfillment passes through unchanged; a rejection runs
 * on_rejected(reason), whose return value fulfills the chained promise.
 *
 * This is the rejection-only half of promise_then(), which cannot be
 * spelled with promise_then() itself: its second argument must be a
 * function whenever a third is given, so promise_then(p, 0, f) is a
 * runtime error.
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
 * promisep() - test whether a value is a promise
 *
 * Returns 1 if 'arg' is a promise, 0 otherwise. The *p() type test for the
 * `promise` type, equivalent to `typeof(arg) == "promise"`.
 *
 * The argument is `mixed` on purpose: the question is only interesting for
 * a value whose type is not known statically. A variable already declared
 * `promise` needs no test.
 *
 * ```c
 * mixed p = promise_create();
 *
 * promisep(p);      // 1
 * promisep(0);      // 0
 * promisep("x");    // 0
 * ```
 *
 * A promise is never a valid FULFILLED value -- resolving a promise with a
 * promise adopts it -- so promisep() on the value an `await` yields, or on
 * promise_result() of a fulfilled promise, is always 0. A rejection reason
 * is not restricted that way: any value may be one, including a promise.
 *
 * @returns {arg is promise} 1 if 'arg' is a promise.
 * @see promise_create, promise_status, promise_result, typeof
 */
int promisep( mixed arg );

/**
 * async_info() - list the currently suspended async function frames
 *
 * With no argument (or 0), returns one mapping per async function that is
 * currently suspended at an `await`, oldest first. Each entry has:
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
 *                          is already queued on the microtask drain
 * "acatch_depth"  int      number of acatch() regions around the await
 * ```
 *
 * This is the async counterpart of call_out_info(): a debugging and
 * monitoring view of pending work. An empty array means nothing is
 * suspended.
 *
 * With a non-zero argument, returns a single mapping describing the
 * SCHEDULER rather than the suspended frames:
 *
 * ```
 * "suspended"           int  suspended frames (sizeof of the above)
 * "pending_deliveries"  int  settlements queued on the microtask drain
 *                            but not yet delivered
 * "drain_yields"        int  monotonic count of drain turns that ended with
 *                            work still queued and re-posted themselves
 * "drain_eval_budget"   int  the effective per-turn eval-cost budget (us)
 * "drain_arms_loop"     int  monotonic count of EXTERNAL settles -- I/O
 *                            completions armed via the event loop
 * ```
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
mapping async_info( int stats );

/**
 * async_yield() - give the event loop a turn from inside an async function
 *
 * Returns a promise fulfilled with 0 on the next pass of the driver's event
 * loop -- after the driver has read pending network input, queued commands
 * and fired due timers.
 *
 * `await async_yield();` is therefore a cooperative preemption point: it
 * parks the async function at a suspension point that is safe by
 * construction and resumes it on a later microtask-drain turn, with the
 * loop having run in between. Use it to break a long computation into
 * pieces the driver can serve players around:
 *
 * ```c
 * async void reindex(mixed *rows) {
 *     int i;
 *
 *     foreach (mixed row in rows) {
 *         index(row);
 *         if (++i % 500 == 0) {
 *             await async_yield();
 *         }
 *     }
 * }
 * ```
 *
 * Awaiting an ordinary settled promise does NOT do this. It parks, but the
 * resume is re-queued into the same drain turn, which is what lets a
 * sequential `await` loop run at full speed. `await call_out(0)` does not do
 * it either -- a call_out(0) runs on the same gametick, and the
 * "call_out(0) nest level" limit will refuse one used as a yield inside a
 * loop. `await call_out(1)` does reach the loop, but costs a whole gametick.
 *
 * The promise is an ordinary promise: it can be stored, chained with
 * promise_then(), or awaited from more than one place. Two calls made
 * before the loop next runs return two distinct promises that settle at the
 * same moment, sharing a single wake-up.
 *
 * async_yield() does not reset the evaluation budget. A delivery is armed
 * with a whole "maximum evaluation cost" when it starts, and a resumed
 * frame is a new delivery, so a function that yields periodically is
 * metered per resumption rather than as one long run.
 *
 * @see async_info, promise_then, call_out
 */
promise async_yield();
