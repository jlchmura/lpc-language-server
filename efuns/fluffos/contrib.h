/**
 * Returns the absolute value of a number.
 *
 * abs() returns the absolute value of the supplied <number>. This function can operate on both
 * integers and floating-point numbers, returning a value of the same type.
 *
 * @param {int | float} number The number to compute the absolute value of.
 * @return {mixed} The absolute value of <number>, as an int or float.
 * @example int value = abs(10);      // 10
 * @example int value = abs(-10);     // 10
 * @example float value = abs(3.14);  // 3.140000
 * @example float value = abs(-3.14); // 3.140000
 */
mixed abs(int | float number);

/**
 * Provided an array, return a class composed of the members of that array.
 *
 * assemble_class() takes an array of <elements> and returns an instantiated class.
 * This function is useful for dynamically creating class instances from an array of values.
 *
 * @param {mixed[]} elements An array of elements to be assembled into a class.
 * @return {mixed} An instantiated class composed of the members of the array.
 * @example mixed *elements = ({ "Foo", 42, "Fooville" });
 *  mixed cl = assemble_class(elements);
 *  write(sprintf("%O\n", cl)); // CLASS( 3 elements
 */
mixed assemble_class(mixed *elements);

/**
 * Returns the base name without object id (OID) of a text, object, or this_object().
 *
 * base_name() can be used in three forms:
 * - When given a string <text>, it returns the segment of the <text> up to, but not including, the first occurrence of '#'.
 * - When given an object <ob>, it performs file_name on <ob> first, then applies the same logic as the first form.
 * - When called without arguments, it applies the logic to this_object().
 *
 * @param {string | object} text_or_ob Optional. The text or object to extract the base name from.
 * @return {string} The base name without the object id.
 * @example string base = base_name("/path/to/object#123"); // "/path/to/object"
 *  string base = base_name(this_object());
 *  string base = base_name(); // Assuming this is called within an object.
 */
string base_name(mixed text_or_ob);

/**
 * Returns an array of class names used by an object, optionally with detailed information.
 *
 * classes() can be called with an object <ob> to return an array of class names used by <ob>.
 * If the <verbose> parameter is non-zero, additional information about each class is returned,
 * including member names and types.
 *
 * @param {object} ob The object to query for class usage.
 * @param {int} verbose Optional. If non-zero, returns detailed information about each class.
 * @return {mixed*} An array of class names, or detailed class information if <verbose> is non-zero.
 * @example string* classes_used = classes(ob);
 *          // ({ "class_name", });
 * @example mixed* classes_used = classes(ob, 1);
 *          // ({
 *          //     ({
 *          //         "class_name",
 *          //         ({
 *          //             "member_name",
 *          //             "type"
 *          //         }),
 *          //         ...
 *          //     }),
 *          //     ...
 *          // })
 * @see num_classes(3)
 */
mixed* classes(object ob, int verbose);

/**
 * Returns if interactive connection uses telopt compress.
 *
 * compressedp() returns a non-zero value if the interactive connection associated with the object <ob>
 * uses telopt compress. This function is useful for determining if data compression is enabled for a
 * player's connection.
 *
 * @param {object} ob The object to query for telopt compress usage.
 * @return {int} Non-zero if telopt compress is used, otherwise 0.
 * @example int is_compressed = compressedp(this_player());
 */
int compressedp(object ob);

/**
 * Returns a deep copy of an array, buffer, class, or mapping.
 *
 * copy() takes a single argument <arg> which can be an array, buffer (if compiled into the driver),
 * class, or mapping, and returns a deep copy of it. This function is particularly useful when you
 * wish to have data that is passed by reference in LPC (like arrays and mappings) to be duplicated
 * so that modifications to the copy do not affect the original.
 *
 * @param {mixed} arg The data structure to copy. Can be an array, buffer, class, or mapping.
 * @return {mixed} A deep copy of the provided data structure.
 * @example mixed copy_result = copy(original_data);
 */
mixed copy(mixed arg);

/**
 * Logs a debug message.
 *
 * debug_message() prints the given message <msg> on the stderr file descriptor of the driver
 * and appends it to the debug log. This function is useful for logging debug information that
 * can help in tracking down issues or understanding the flow of execution.
 *
 * @param {string} msg The message to log.
 */
void debug_message(string msg);