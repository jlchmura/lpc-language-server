// filesystem.h

/**
 * write_file() - 将字符串写入文件
 *
 * 将字符串 'str' 追加到文件 'file' 中。返回 0 或 1 表示失败或成功。
 * 如果 flag 为 1，write_file 将覆盖而不是追加。
 *
 */
varargs int write_file( string file, string str, int flag );

/**
 * write_bytes() - 将连续的一系列字节写入文件
 *
 * 此函数将 'series' 中的字节写入由 'path' 指定的文件，从字节 # 'start' 开始。
 * 如果失败则返回零 (0)，否则返回 1。
 *
 */
int write_bytes( string path, int start, string series );

/**
 * stat() - 返回有关文件或目录的信息
 *
 * 如果 str 是常规文件的名称（不是目录），则 stat() 将返回与该文件相关的信息数组。
 * 数组的格式如下：
 * 
 * ({ file_size, last_time_file_touched, time_object_loaded, time_file_created })
 * 
 * 如果 stat 被调用的对象是目录（而不是常规文件），或者第二个参数为 -1，则 stat() 的行为与 get_dir(3) 相同。
 *
 * @param {string} str - 要获取信息的文件或目录
 * @param {int} flag 默认值为 0，如果为 0，则返回信息数组；如果为 -1，则返回子数组数组
 */
mixed stat( string str, int flag );

/**
 * rmdir() - 删除一个目录
 *
 * 删除目录 'dir'。
 *
 */
int rmdir( string dir );

/**
 * rm() - 删除一个文件
 *
 * 删除文件 'file'。返回 0 表示失败，1 表示成功。
 *
 */
int rm( string file );

/**
 * rename() - 重命名一个文件
 *
 * 将文件 <src> 重命名为 <dst>。
 *
 */
int rename( string src, string dst );

/**
 * read_file() - 将文件读入字符串
 *
 * 从文件中读取一行文本到字符串中。第二个和第三个参数是可选的。
 * 如果仅指定第一个参数，将返回整个文件（作为字符串）。
 * 
 * start_line 是您希望读取的行的行号。此例程将在您尝试超出文件末尾时返回 0，
 * 或如果您尝试从非正行读取。
 *
 */
varargs string read_file( string file, int start_line, int number_of_lines );

/**
 * read_bytes()  -  将连续的一系列字节从文件读取到字符串中
 *
 * 此函数从名为 'path' 的文件的字节 # 'start' 开始读取 'length' 字节。
 * 这些字节作为字符串返回。注意 (start + length) 不能超出文件末尾，否则
 * read_bytes 将失败。如果省略第二个和第三个参数，将返回整个文件。
 *
 */
string read_bytes( string path, int start, int length );

/**
 * mkdir() - 创建一个目录
 *
 * 创建指定的目录。如果成功返回 1，失败返回 0。
 *
 */
int mkdir( string directory );

/**
 * link() - 将文件链接到另一个文件
 *
 * 创建一个链接 <reference> 到文件 <original>。
 * 此 efun 会在主对象中调用 valid_link(original, reference)。
 * 如果 valid_link() 返回 0，则 link() 调用失败。
 * 如果 valid_link() 返回 1，则 link() 成功，前提是如果使用相同的参数调用 rename() 会成功。
 * 
 * 注意：此 efun 创建硬链接，而不是符号链接。
 * https://www.geeksforgeeks.org/difference-between-hard-link-and-soft-link/
 *
 */
void link( string original, string reference );

/**
 * get_dir() - 返回与文件系统目录相关的信息
 *
 * 如果 'dir' 是文件名（支持 '*' 和 '?' 通配符），将返回一个字符串数组，
 * 包含所有与该规范匹配的文件名。如果 'dir' 是目录名（以斜杠结束--即："/u/"，
 * "/adm/"，等），将返回该目录中的所有文件名。
 * 
 * 如果以第二个参数 -1 调用，get_dir 将返回一个子数组数组，每个子数组的格式为：
 * 
 * ({ filename, size_of_file, last_time_file_touched })
 * 
 * 其中 filename 是一个字符串，last_time_file_touched 是一个整数，
 * 表示从 1970 年 1 月 1 日以来的秒数（与 time(3) 格式相同）。
 * size_of_file 元素是 file_size(3) 返回的相同值；文件的大小（以字节为单位），
 * 或 -2 如果它是目录。
 * 
 * @param {string} dir - 要获取信息的目录
 * @param {int} flag 默认值为 0，如果为 0，则返回字符串数组；如果为 -1，则返回子数组数组
 */
varargs mixed *get_dir(string dir, int flag);

/**
 * file_size() - 获取文件的大小
 *
 * file_size() 返回文件 <file> 的大小（以字节为单位）。大小为 -1 表示 <file> 
 * 不存在，或您无法读取。大小为 -2 表示 <file> 是一个目录。
 *
 */
int file_size( string file );

/**
 * cp() - 复制一个文件
 *
 * 将文件 <src> 复制到文件 <dst>。
 *
 */
int cp( string src, string dst );
