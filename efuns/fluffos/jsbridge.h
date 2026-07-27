// jsbridge.h

/**
 * js_eval() - evaluate JavaScript in the hosting page, synchronously
 *
 * Evaluates code as JavaScript in the context of the page (or node
 * process) hosting the WASM driver and returns the result as a string:
 * primitives are stringified, objects are JSON-encoded, undefined/null
 * become "". A thrown JavaScript exception is returned as the string
 * "JS error: ..." - it never unwinds into the driver.
 *
 * Only available on the WebAssembly build (guard LPC code with
 * #ifdef __PACKAGE_JSBRIDGE__).
 *
 */
string js_eval(string code);

/**
 * js_call() - call a JavaScript handler registered by the hosting page
 *
 * Invokes func from the page's handler table (Module.fluffos.handlers
 * in JavaScript) with args spread as individual string arguments. The
 * handler may return a value or a Promise; when it settles, the
 * optional callback runs on a later driver tick:
 *
 * void callback(string result, int success, int id)
 *
 * success is 1 with the handler's return value stringified (objects
 * JSON-encoded) as result, or 0 with an error description (missing
 * handler, thrown exception, rejected Promise). Returns a nonnegative
 * call id, also passed to the callback.
 *
 * Only available on the WebAssembly build (guard LPC code with
 * #ifdef __PACKAGE_JSBRIDGE__).
 *
 */
int js_call(string func, string *args, void|string|function callback);

/**
 * js_export() - register an LPC function the hosting page can call
 *
 * Registers func under name so the page's JavaScript can call into LPC
 * via Module.fluffos.callLPC(name, ...args). The callback runs on the
 * next driver tick as:
 *
 * mixed callback(string *args, int id)
 *
 * A string func names a function called on the registering object.
 * Re-registering a name replaces the previous entry; calling with only
 * name unregisters it. Returns 1 when a callback was registered, 0 when
 * the name was (or is now) unregistered.
 *
 * Only available on the WebAssembly build (guard LPC code with
 * #ifdef __PACKAGE_JSBRIDGE__).
 *
 */
int js_export(string name, void|string|function func);
