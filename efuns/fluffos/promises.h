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
 * exactly once -- fulfilled via promise_resolve(), rejected via
 * promise_reject(), or CANCELLED, the fourth state an uncaught
 * promise_cancel() leaves on an `async` function's own promise; reactions
 * attached with promise_then() run from the microtask drain after
 * settlement -- never synchronously, but still within the same gametick.
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
 * DRIVER NOTE (not in the FluffOS docs; reported as fluffos#1388):
 * that holds for a DIRECT
 * promise_resolve(p, p), which errors. When the cycle arrives indirectly --
 * a promise_then() handler returning the very promise its result settles,
 * or an `async` body returning its own promise -- there is no call to fail,
 * and 'p' rejects with PROMISE_REASON_SELF_RESOLVED, the string
 * "*promise resolved with itself", instead.
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
 * DRIVER NOTE (not in the FluffOS docs; reported as fluffos#1387):
 * omitting 'reason' does NOT reject
 * with 0. The driver substitutes PROMISE_REASON_NO_REASON, the string
 * "*promise rejected", so a bare reject is never falsy -- `acatch`, like
 * `catch`, signals failure by yielding the reason and success by yielding
 * 0, so `mixed err = acatch(await p); if (err)` would take the SUCCESS
 * branch on a real rejection. An explicitly falsy reason,
 * promise_reject(p, 0), is still the caller's choice and still ambiguous;
 * promise_status() is the unambiguous test. Rejecting a promise with
 * ITSELF is likewise an error, which their docs do not mention either.
 *
 * It is an error to settle a promise that is already settled, or one whose
 * fate is already committed to a pending adoption, or the promise an
 * `async` function returned.
 *
 * That last refusal covers `async` function promises ONLY. The ones the
 * driver hands out for a pending operation -- call_out(delay),
 * async_read()/async_write()/async_getdir(), and the promise promise_then()
 * returns -- stay settleable, which is what makes a consumer-side timeout
 * possible. Settling one of those FIRST does mean the driver's own result
 * is dropped when it arrives, SILENTLY: a pre-settled async_read() promise
 * discards the file contents, and a pre-resolved one turns a read failure
 * into an apparent success. Settle a promise you did not create only when
 * you mean to stop caring about its result.
 *
 * A rejected promise whose rejection is never observed (no handler
 * attached, result never read) is reported to the debug log when it is
 * deallocated:
 *
 * ```
 * Unhandled promise rejection (rejected by /obj/thing at /obj/thing.lpc:42): reason
 * ```
 *
 * The report names where the promise was REJECTED because deallocation can
 * be arbitrarily far from the rejection, and the reason alone often will
 * not identify it -- `(int) 0` is an ordinary rejection value for the
 * promise forms of async_read() and friends.
 *
 * @see promise_resolve, promise_catch, promise_then
 */
varargs void promise_reject( promise p, void | mixed reason );

/**
 * promise_then() - attach settlement handlers, chaining a new promise
 *
 * Attaches handlers to 'p' and returns a new promise for the handler's
 * result. Handlers run from the microtask drain when 'p' settles -- or, if
 * 'p' is ALREADY settled, from the drain later in the CURRENT gametick,
 * never on the next one. Delivery is never synchronous with this call:
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
 * Attaching ERRORS when the microtask drain is already saturated -- more
 * than "max pending promise deliveries" settlements queued and not yet
 * delivered (100000 by default; 0 disables the ceiling). A handler that
 * attaches reactions faster than the drain retires them would otherwise
 * grow that queue without bound, and there is no LPC frame to blame or
 * eval budget to exceed, since every delivery is armed with a fresh one.
 * This is the promise counterpart of the "call_out(0) nest level" limit;
 * async_info(1)["pending_deliveries"] is the queue depth it measures.
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
 * runtime error ("Bad argument 2 to promise_then()").
 *
 * It shares promise_then()'s body, and so its saturation ceiling too:
 * attaching errors once more than "max pending promise deliveries"
 * settlements are queued.
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
 * 0   PROMISE_PENDING
 * 1   PROMISE_FULFILLED
 * 2   PROMISE_REJECTED
 * 3   PROMISE_CANCELLED
 * ```
 *
 * The names come from the driver's own <promise.h>, shared between driver
 * and mudlib so the two cannot drift; prefer them to the bare numbers.
 *
 * Cancelled is a negative settlement -- `await`, promise_then() /
 * promise_catch(), and the fail-fast combinators treat it like a rejection
 * -- but it is not a fault. `acatch` still yields the reason string
 * (PROMISE_REASON_CANCELLED); use this CODE, not that string, to tell a
 * cancellation from a rejection, since a mudlib can forge the string with
 * throw().
 *
 * @see promise_result, promise_cancel, promise_create
 */
int promise_status( promise p );

/**
 * promise_result() - read a settled promise's value or rejection reason
 *
 * Returns the fulfillment value, rejection reason, or cancellation reason
 * of the settled promise 'p'. It is an error to call this on a pending
 * promise (check promise_status() first, or use promise_then() / `await`
 * instead).
 *
 * Reading a rejected or cancelled promise's result counts as observing it:
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
 * a value whose type is not known statically. Under `strict_types` a
 * variable already declared `promise` needs no test.
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
 * is not restricted that way: any value may be one, including a promise --
 * so promisep() on promise_result() of a REJECTED promise, or on what
 * `acatch` yields, can be 1.
 *
 * @returns {arg is promise} 1 if 'arg' is a promise.
 * @see promise_create, promise_status, promise_result, typeof
 */
int promisep( mixed arg );

/**
 * promise_all() - wait for every promise, failing on the first rejection
 *
 * Returns a promise that fulfills with an array of every input's value,
 * POSITIONALLY: entry 'i' of the result is the value of promises[i],
 * whatever order they settled in.
 *
 * If any input rejects, the returned promise rejects immediately with that
 * reason and the remaining inputs are ignored -- they keep running, since
 * nothing here cancels anything. Only the FIRST rejection is reported; use
 * promise_all_settled() to see every outcome.
 *
 * If the input that decided it was CANCELLED rather than rejected, the
 * returned promise is cancelled too -- promise_status() reports
 * PROMISE_CANCELLED -- so the distinction survives the combinator.
 *
 * An element that is not a promise counts as already fulfilled with
 * itself, which is why the parameter is `mixed *` rather than `promise *`:
 * the output of an ordinary map() can be passed straight in unwrapped.
 *
 * An empty array fulfills immediately with an empty array.
 *
 * ```c
 * async void load(string *names) {
 *     mixed *rows = await promise_all(map(names, (: fetch($1) :)));
 *
 *     // rows[i] corresponds to names[i]
 *     write("loaded " + sizeof(rows) + "\n");
 * }
 * ```
 *
 * @see promise_any, promise_race, promise_all_settled, promise_then
 */
promise<mixed *> promise_all( mixed *promises );

/**
 * promise_any() - take the first promise that succeeds
 *
 * Returns a promise that fulfills with the value of the first input to
 * FULFILL. Rejections are tolerated -- collected rather than propagated --
 * so one failing source does not spoil the result.
 *
 * Only if EVERY input rejects does the returned promise reject, and then
 * with an array of the reasons, positionally: entry 'i' is promises[i]'s
 * reason.
 *
 * Contrast promise_race(), which is settled by the first input to settle
 * either way -- there, a rejection wins the race.
 *
 * An element that is not a promise counts as already fulfilled with
 * itself. An empty array rejects: there is nothing that could ever satisfy
 * it.
 *
 * ```c
 * async string first_reachable(string *mirrors) {
 *     // whichever mirror answers first; a failure is ignored unless all fail
 *     return await promise_any(map(mirrors, (: fetch($1) :)));
 * }
 * ```
 *
 * @see promise_all, promise_race, promise_all_settled
 */
promise promise_any( mixed *promises );

/**
 * promise_race() - settle as the first input settles, either way
 *
 * Returns a promise that settles exactly as the FIRST INPUT TO SETTLE does
 * -- fulfilled with its value, rejected with its reason, or cancelled with
 * it if that input was cancelled. A rejection wins a race; that is the
 * difference from promise_any(), which ignores rejections until every input
 * has failed.
 *
 * The losing inputs are not cancelled. They keep running and their results
 * are discarded, so a race is a way to stop WAITING, not a way to stop
 * work. To stop the work itself, see promise_cancel().
 *
 * An element that is not a promise counts as already fulfilled with
 * itself, and therefore wins the race outright.
 *
 * An EMPTY ARRAY IS AN ERROR, not a promise that never settles. This
 * departs from JavaScript deliberately: here a permanently pending promise
 * that something awaits is a parked frame holding its object, its program
 * and one "max suspended async functions" slot for the life of the driver,
 * so the mistake is refused where it is made.
 *
 * ```c
 * // bound a wait without touching the operation's own promise
 * async mixed with_timeout(promise p, int secs) {
 *     return await promise_race(({ p, timeout_promise(secs) }));
 * }
 * ```
 *
 * @see promise_any, promise_all, promise_all_settled, promise_cancel
 */
promise promise_race( mixed *promises );

/**
 * promise_all_settled() - wait for every promise and report each outcome
 *
 * Returns a promise that fulfills once every input has settled -- it never
 * rejects. The value is an array of one mapping per input, positionally,
 * describing how that input ended:
 *
 * ```
 * ([ "status": PROMISE_FULFILLED, "value":  v ])
 * ([ "status": PROMISE_REJECTED,  "reason": r ])
 * ([ "status": PROMISE_CANCELLED, "reason": r ])
 * ```
 *
 * The status codes are promise_status()'s, so one vocabulary covers both.
 * A fulfilled entry has no "reason" key, and a rejected or cancelled entry
 * has no "value" key, so undefinedp() tells a success from a failure as
 * reliably as "status" does -- though only "status" tells a cancellation
 * from a fault.
 *
 * Use this instead of promise_all() when a partial failure is a result
 * rather than an error -- fanning work out over many objects and reporting
 * which of them succeeded, for instance.
 *
 * An element that is not a promise counts as already fulfilled with
 * itself. An empty array fulfills immediately with an empty array.
 *
 * ```c
 * async void reindex(object *rooms) {
 *     mapping *results = await promise_all_settled(map(rooms, (: $1->rebuild() :)));
 *     int i;
 *
 *     foreach (mapping r in results) {
 *         if (r["status"] == PROMISE_REJECTED) {
 *             write("room " + i + " failed: " + r["reason"] + "\n");
 *         }
 *         i++;
 *     }
 * }
 * ```
 *
 * @see promise_all, promise_any, promise_race, promise_status
 */
promise<mapping *> promise_all_settled( mixed *promises );

/**
 * promise_cancel() - ask an async function to give up
 *
 * Requests cancellation of the `async` function body that owns 'p'. The
 * body's NEXT `await` raises a catchable error whose value is the string
 * PROMISE_REASON_CANCELLED, the string "*async function cancelled".
 *
 * Returns 1 if a cancellation was armed, 0 if there was nothing left to
 * cancel -- the body already finished, or it returned a still-pending
 * promise and is gone. A body racing its canceller to completion is a
 * normal outcome, not an error.
 *
 * Cancellation is COOPERATIVE, NOT PREEMPTIVE. A body part-way through a
 * stretch of straight-line code finishes that stretch first; a body that
 * never awaits again runs to completion and its cancellation is never
 * delivered at all. Nothing is torn down mid-expression.
 *
 * The raise behaves like any other rejection arriving at that `await`: it
 * unwinds through enclosing `acatch` regions, runs defer() handlers in
 * order, and -- if nothing catches it -- CANCELS 'p' with the same reason.
 * That is a settlement of its own, not a rejection: promise_status() reports
 * 3, while `acatch` still yields only the reason string, so the status code
 * is the test that cannot be forged. A body that catches its cancellation
 * and then fails on its own settles as REJECTED, not cancelled.
 *
 * Downstream links inherit the cancellation the same way: an `await` on 'p',
 * a promise_then() pass-through, an adoption, and the fail-fast combinators
 * promise_all() and promise_race() all carry it, and promise_all_settled()
 * records the input as PROMISE_CANCELLED.
 *
 * A body parked on a promise that will never settle is still cancelled
 * promptly: it is detached from that promise and its rejection scheduled
 * directly, so cancellation is never hostage to the thing being awaited.
 *
 * The raise CLEARS the request. A body that catches its own cancellation
 * may go on to `await` cleanup work and even return a value, in which case
 * 'p' fulfills normally. Cancellation is a request a body may decline, not
 * a verdict; cancel again if you mean it again. The alternative -- a sticky
 * flag -- would make every cleanup `await` throw, leaving a body no way to
 * release what it holds.
 *
 * ```c
 * async int worker() {
 *     mixed err = acatch(await slow_thing());
 *
 *     if (err) {
 *         await write_log("gave up");   // does NOT re-raise
 *         return 0;
 *     }
 *     return 1;
 * }
 * ```
 *
 * It is an error to cancel a promise that is not an `async` function's:
 * only a body has a "next await" for the cancellation to arrive at. A
 * promise_create() promise is already settleable by whoever owns it; an
 * async_read()/async_write()/async_getdir() promise cannot stop the worker
 * thread that is already doing the I/O; a call_out(delay) promise is not
 * cancellable at all -- use the classic call_out() form and
 * remove_call_out(); and rejecting a promise_then() chain link cannot stop
 * its upstream. To stop WAITING for any of those without stopping the work,
 * race them against a timer -- see promise_race().
 *
 * Cancellation does not propagate. If a cancelled body was awaiting another
 * async function's promise, that inner body keeps running: its promise is
 * first-class and may have other awaiters, handlers attached with
 * promise_then(), or simply be stored somewhere, and rejecting it would
 * settle it for all of them. A body that wants the inner work stopped too
 * can catch its own cancellation and cancel the inner promise it holds.
 *
 * @see promise_race, promise_status, promise_reject, async_info
 */
int promise_cancel( promise p );

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
 * Calling it ERRORS when more than "max pending promise deliveries"
 * yields are already waiting for the loop -- the same ceiling
 * promise_then() attaches under, and for the same reason. A pending yield
 * is retained memory the caller can no longer see: unlike a
 * promise_create() promise, DISCARDING the returned value does not free
 * it, because the registry holds a reference until the loop runs. A
 * synchronous loop calling async_yield() and dropping each result would
 * otherwise grow that registry for as long as its eval budget lasts.
 *
 * On the WebAssembly build the loop is the page's: the promise settles on
 * the host's next call into the driver, which is the same guarantee -- the
 * page has had its turn -- at whatever rate the host drives it.
 *
 * async_yield() does not reset the evaluation budget. A delivery is armed
 * with a whole "maximum evaluation cost" when it starts, and a resumed
 * frame is a new delivery, so a function that yields periodically is
 * metered per resumption rather than as one long run.
 *
 * @see async_info, promise_then, call_out
 */
promise async_yield();
