/**
 * Executes an SQL statement asynchronously, then executes a callback function.
 *
 * async_db_exec() executes the passed SQL statement using the given database handle.
 * After execution, it returns the database handle to the provided callback function.
 * The callback function should be prepared to handle the database handle as its argument.
 *
 * @param {int} handle The database handle.
 * @param {string} sql_query The SQL query to execute.
 * @param {function} callback The callback function to execute after the SQL query.
 * @example void callback(int handle) { \/* Handle callback logic here *\/ }
 * @example async_db_exec( db_handle, "SELECT * FROM users", callback );
 */
void async_db_exec(int handle, string sql_query, function callback);

/**
 * Asynchronously returns information pertaining to a filesystem directory.
 *
 * async_getdir() is used to asynchronously retrieve the contents of a directory
 * or a list of files matching a pattern. If 'dir' specifies a pattern with wildcards
 * ('*' and '?'), an array of strings matching the pattern is returned. If 'dir'
 * specifies a directory name (ending with a slash, e.g., "/u/", "/adm/"), all filenames
 * within that directory are returned. The results are passed to the provided callback function.
 *
 * Unlike get_dir, async_getdir does not support specifying additional information
 * (like filesize or last modified time) through a second argument.
 *
 * The callback function should be able to handle a single argument, which is the result
 * of the directory query as an array of strings.
 *
 * @param {string} dir The directory path or filename pattern to query.
 * @param {function} callback The callback function to execute with the query result.
 * @example void callback(mixed res) { \/* Handle the result *\/ }
 * @example async_getdir( "/u/*", callback );
 */
void async_getdir(string dir, function callback);

/**
 * Reads a file into a string then executes a callback with the file contents.
 *
 * async_read() reads the entire contents of a file specified by 'file' into a string.
 * After reading, it executes the 'callback' function, passing the file contents as an argument.
 * If the file cannot be read, the callback receives -1. Unlike read_file, async_read does not
 * support reading specific lines or a range of lines; it always attempts to read the entire file.
 *
 * The callback function should be prepared to handle either a string containing the file contents
 * or -1 if the file could not be read.
 *
 * @param {string} file The path to the file to read.
 * @param {function} callback The callback function to execute with the file contents or -1.
 * @example void callback(mixed res) { /* Handle file contents or error *\/ }
 * @example async_read( "/path/to/file.txt", callback );
 */
void async_read(string file, function callback);

/**
 * Appends a string to a file then executes a callback with the operation result.
 *
 * async_write() appends the string 'str' to the file specified by 'file'. If 'flag' is set to 1,
 * the function overwrites the file instead of appending to it. This function is asynchronous and
 * executes the 'callback' function upon completion, passing -1 for failure or 0 for success as an argument.
 *
 * Unlike write_file, which is synchronous and returns 0 for failure or 1 for success directly,
 * async_write uses a callback mechanism to report success or failure.
 *
 * The callback function should be prepared to handle an integer argument indicating the result:
 * -1 for failure, and 0 for success.
 *
 * @param {string} file The path to the file to write or append to.
 * @param {string} str The string to append or write into the file.
 * @param {int} flag Set to 1 to overwrite the file, or 0 to append.
 * @param {function} callback The callback function to execute with the result.
 * @example void callback(int res) { /* Handle result *\/ }
 * @example async_write( "/path/to/file.txt", "Hello, World!", 0, callback );
 */
void async_write(string file, string str, int flag, function callback);

