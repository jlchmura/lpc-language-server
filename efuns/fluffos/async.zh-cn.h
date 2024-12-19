// async.h

/**
 * async_write() - 将字符串追加到文件中，然后执行回调
 *
 * 将字符串 'str' 追加到文件 'file' 中。如果标志为 1，write_file
 * 将覆盖而不是追加。
 * 
 * 与 write_file 不同，它返回 0 表示失败或 1 表示成功，此 efun
 * 将返回 -1 表示失败，0 表示成功给回调函数。
 * 
 * 回调函数应该遵循以下格式：
 * 
 * function (int res) {
 * // -1 表示失败
 * //  0 表示成功
 * }
 *
 */
void async_write( string file, string str, int flag, function callback );

/**
 * async_read() - 将文件读入字符串中，然后执行回调
 *
 * 从文件中读取一行文本到字符串中。通常，read_file
 * 需要第二个和第三个参数指定起始行和要读取的行数，但 async_read 将返回
 * 整个文件内容给回调函数。
 * 
 * 回调函数应该遵循以下格式：
 * 
 * function(mixed res) {
 * // -1 表示文件未读
 * // 其他情况返回字符串的文件内容
 * }
 *
 */
void async_read( string file, function callback );

/**
 * async_getdir() - 返回与文件系统目录相关的信息
 *
 * 如果 'dir' 是文件名（支持 '*' 和 '?' 通配符），返回一个字符串数组
 * 到回调函数，其中包含所有匹配的文件名。如果 'dir' 是目录名（以斜杠结尾--即：
 * "/u/", "/adm/", 等），将返回该目录中的所有文件名。
 * 
 * 与 get_dir 例程不同，此 efun 不需要一个整数第二个
 * 参数来指定更多信息（文件名、文件大小、最后修改时间）。
 * 
 * 回调函数应该遵循以下格式：
 * 
 * function(mixed res) {
 * // 0 表示目录不存在
 * // 空数组表示没有匹配的文件存在
 * // 匹配文件名的数组
 * }
 *
 */
void async_getdir( string dir, function callback );

/**
 * async_db_exec() - 执行 SQL 语句然后执行回调
 *
 * 此函数将针对给定的数据‐库句柄执行传递的 SQL 语句。
 * 
 * 返回数据库句柄给提供的回调函数。
 * 
 * 回调函数应该遵循以下格式：
 * 
 * ```c
 * async_db_exec(
 * handle,
 * sql_query,
 * function (int rows) { // 匹配的行数
 * mixed *results = db_fetch(handle, 1);
 * db_close(handle);
 * }
 * );
 * ```
 *
 */
void async_db_exec( int handle, string sql_query, function callback );
