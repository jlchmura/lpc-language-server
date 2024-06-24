// async.h

/**
 * async_write() - appends a string to a file then executes a callback
 *
 * Append  the string 'str' into the file 'file'. If flag is 1, write_file
 * overwrites instead of appending.
 * 
 * Unlike write_file, which returns 0 for failure or 1 for success, this efun
 * will return -1 for failure and 0 for success to the callback.
 * 
 * The callback should follow this format:
 * 
 * function (int res) {
 * // -1 for failure
 * //  0 for success
 * }
 *
 */
void async_write( string file, string str, int flag, function callback );

/**
 * async_read() - read a file into a string then executes a callback
 *
 * Read  a  line  of text from a file into a string.  Normally, read_file
 * takes a second and third arguments for start_line and number_of_lines to
 * read, but async_read will return the entire file to the callback.
 * 
 * The callback should follow this format:
 * 
 * function(mixed res) {
 * // -1 for file not read
 * // string file contents otherwise
 * }
 *
 */
void async_read( string file, function callback );

/**
 * async_getdir() - returns information pertaining to a filesystem directory
 *
 * If  'dir' is a filename ('*' and '?' wildcards are supported), an array
 * of strings is returned to the callback containing all filenames that match
 * the specification. If 'dir' is a directory name (ending with a slash--ie:
 * "/u/", "/adm/", etc), all filenames in that directory are returned.
 * 
 * Unlike the get_dir routine, this efun does not take an integer second
 * argument to specify more information (filename, filesize, last touched).
 * 
 * The callback should follow this format:
 * 
 * function(mixed res) {
 * // 0 when directory doesn't exist
 * // empty array when no matching files exist
 * // array of matching filenames
 * }
 *
 */
void async_getdir( string dir, function callback );

/**
 * async_db_exec() - executes an sql statement then executes a callback
 *
 * This function will execute the passed sql statement for the given data‐
 * base handle.
 * 
 * Returns the database handle to the callback function provided.
 * 
 * The callback should follow this format:
 * 
 * ```c
 * async_db_exec(
 * handle,
 * sql_query,
 * function (int rows) { // number of matched rows
 * mixed *results = db_fetch(handle, 1);
 * db_close(handle);
 * }
 * );
 * ```
 *
 */
void async_db_exec( int handle, string sql_query, function callback );

