// ffi.h

/**
 * ffi_load() - load a native shared library
 *
 * Opens the shared library at `path` (via dlopen/LoadLibrary) and
 * returns a positive library handle for use with ffi_symbol() and
 * ffi_prepare(). Returns 0 on failure; call ffi_error() for the reason.
 *
 * An empty `path` opens the driver's own process image, giving access
 * to already-linked C symbols such as libc/libm (`sqrt`, `abs`, ...).
 *
 * Every call is gated by the master apply valid_ffi("load", path,
 * caller); the default master denies it. This efun is only present when
 * the driver is built with package_ffi (`__PACKAGE_FFI__`).
 *
 */
int ffi_load( string path );

/**
 * ffi_unload() - release a library handle
 *
 * Releases a library handle returned by ffi_load(). Function handles
 * prepared from it become invalid. Libraries are also released when the
 * driver shuts down.
 *
 */
void ffi_unload( int lib );

/**
 * ffi_symbol() - resolve a symbol to its raw address
 *
 * Resolves the symbol `name` in library `lib` and returns its raw
 * native address as an integer, or 0 if not found.
 *
 * To *call* a C function you do not need this — use ffi_prepare(), which
 * resolves the symbol itself. ffi_symbol() is for taking the address of
 * a data symbol (read it with ffi_peek()) or of a function to pass to C
 * as an FFI_POINTER argument.
 *
 * Gated by the master apply valid_ffi("symbol", name, caller).
 *
 */
int ffi_symbol( int lib, string name );

/**
 * ffi_prepare() - describe a C function signature for calling
 *
 * Resolves `name` in `lib`, builds the platform call frame for the
 * described signature, and returns a callable function handle for
 * ffi_call(). `ret_type` and each element of `arg_types` are type codes
 * from <ffi.h> (FFI_INT32, FFI_DOUBLE, FFI_POINTER, ...).
 *
 * Gated by the master apply valid_ffi("prepare", name, caller). Errors
 * if the symbol is missing or a type code is invalid.
 *
 */
int ffi_prepare( int lib, string name, int ret_type, int *arg_types );

/**
 * ffi_call() - call a prepared C function
 *
 * Calls the function handle `func` returned by ffi_prepare(). `args`
 * must have exactly the prepared argument count; each element is an
 * int, a float, or a buffer (never a string — LPC strings are
 * UTF-8-native and never implicitly marshalled to char*), matching the
 * prepared argument type codes.
 *
 * The return value follows `ret_type`: an int or float for scalar
 * types, a buffer for an owned FFI_POINTER result or an int address for
 * a raw foreign pointer, and 0 for FFI_VOID. Argument-count or -type
 * mismatches raise an error rather than calling C with a bad frame.
 *
 */
mixed ffi_call( int func, mixed *args );

/**
 * ffi_alloc() - allocate a native memory block as a buffer
 *
 * Returns a zeroed buffer of `nbytes` bytes whose storage is the native
 * memory block itself, suitable for structs, out-parameters, and
 * pointer arguments to ffi_call(). The block is reference-counted like
 * any buffer and freed by the GC; ffi_free() releases it early.
 *
 */
buffer ffi_alloc( int nbytes );

/**
 * ffi_free() - free a native memory block
 *
 * Releases a buffer allocated by ffi_alloc(). Optional — the block is
 * also reclaimed by the garbage collector when no LPC value references
 * it. Using `mem` after freeing it is an error.
 *
 */
void ffi_free( buffer mem );

/**
 * ffi_write() - write a typed scalar into a buffer
 *
 * Writes `value` as the scalar type `type_code` (a code from <ffi.h>)
 * at byte `offset` within `mem`. `value` is an int for integer/pointer
 * types or a float for FFI_FLOAT/FFI_DOUBLE. Used to fill struct fields
 * and out-parameters before an ffi_call().
 *
 */
void ffi_write( buffer mem, int offset, int type_code, mixed value );

/**
 * ffi_read() - read a typed scalar from a buffer
 *
 * Reads the scalar of type `type_code` (a code from <ffi.h>) stored at
 * byte `offset` within `mem`, returning an int for integer/pointer
 * types or a float for FFI_FLOAT/FFI_DOUBLE. Combine with
 * ffi_struct_layout() to read C struct fields symbolically.
 *
 */
mixed ffi_read( buffer mem, int offset, int type_code );

/**
 * ffi_sizeof() - size of a scalar type code
 *
 * Returns the size in bytes, on this platform, of the scalar C type
 * named by `type_code` (a code from <ffi.h>). Useful for sizing
 * ffi_alloc() blocks and computing offsets by hand.
 *
 */
int ffi_sizeof( int type_code );

/**
 * ffi_peek() - copy bytes from a raw foreign address into a buffer
 *
 * Copies `nbytes` bytes starting at the raw native `address` into a
 * fresh owned buffer. This is the only way bytes behind a foreign
 * pointer — for example a `char *` returned by a C function — become an
 * LPC value. Pass -1 for `nbytes` to copy a NUL-terminated string up to
 * an internal cap. Decode text with string_decode() once you have the
 * bytes.
 *
 */
buffer ffi_peek( int address, int nbytes );

/**
 * ffi_address() - raw native address of a buffer
 *
 * Returns the raw native address of the first byte of `mem` as an
 * integer — for passing to C as a pointer value or for pointer
 * comparisons. The address is valid only while `mem` is alive.
 *
 */
int ffi_address( buffer mem );

/**
 * ffi_struct_layout() - compute a C struct's field layout
 *
 * Given an array of scalar type codes (from <ffi.h>), one per struct
 * field, returns `({ total_size, ({ offset0, offset1, ... }) })`
 * honoring the platform's alignment rules. Size an ffi_alloc() block to
 * `total_size` and use the offsets with ffi_read()/ffi_write(). The
 * tools/ffi generator emits these arrays from a C header.
 *
 */
mixed *ffi_struct_layout( int *field_types );

/**
 * ffi_callback() - expose an LPC function to C as a callback
 *
 * Wraps the LPC function pointer `fn` in a libffi closure with the
 * given return and argument type codes (from <ffi.h>), and returns a
 * callback handle. Pass ffi_callback_addr() of that handle to C as an
 * FFI_POINTER argument so a C library (a comparator for qsort(), an
 * event handler, ...) can call back into LPC.
 *
 * Gated by the master apply valid_ffi("callback", 0, caller).
 *
 */
int ffi_callback( function fn, int ret_type, int *arg_types );

/**
 * ffi_callback_addr() - raw address of a callback closure
 *
 * Returns the raw native code address of the closure for callback
 * handle `cb` (from ffi_callback()), as an integer — the value to hand
 * to C as an FFI_POINTER argument.
 *
 */
int ffi_callback_addr( int cb );

/**
 * ffi_callback_free() - release a callback closure
 *
 * Releases the libffi closure for callback handle `cb`. Optional — the
 * closure is also reclaimed by the GC. Do not free a callback while C
 * still holds its address.
 *
 */
void ffi_callback_free( int cb );

/**
 * ffi_error() - most recent FFI error message
 *
 * Returns the most recent FFI error message for the current thread —
 * for example the reason a ffi_load() returned 0 — or the empty string
 * if there has been no error. Efuns on the FFI surface raise an LPC
 * error on misuse; ffi_error() reports the failures that are signalled
 * by a 0 return instead.
 *
 */
string ffi_error();

/**
 * ffi_status() - counts of open FFI handles
 *
 * Returns a mapping of live-handle counts for introspection and leak
 * checks, with integer values under the keys "libraries" (open
 * ffi_load() handles), "functions" (prepared ffi_prepare() handles),
 * and "callbacks" (live ffi_callback() closures).
 *
 */
mapping ffi_status();
