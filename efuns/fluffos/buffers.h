/**
 * Allocates a buffer of a specified size.
 *
 * allocate_buffer() allocates a buffer with 'size' elements. The size must be
 * greater than or equal to 0 and not exceed a system-defined maximum (typically around 10000).
 * All elements in the allocated buffer are initialized to 0.
 *
 * @param {int} size The number of elements in the buffer.
 * @return {buffer} A buffer object with all elements initialized to 0.
 * @example buffer buf = allocate_buffer(1024);
 * @see bufferp(3), read_buffer(3), write_buffer(3), sizeof(3), to_int(3)
 */
buffer allocate_buffer(int size);

/**
 * Transcodes a buffer from one encoding to another.
 *
 * buffer_transcode() takes a buffer 'src' and converts it from the encoding specified
 * by 'from_encoding' to the encoding specified by 'to_encoding'. This function is useful
 * for converting data between different character sets or binary encodings.
 *
 * @param {buffer} src The source buffer to transcode.
 * @param {string} from_encoding The encoding of the source buffer.
 * @param {string} to_encoding The target encoding for the transcoded buffer.
 * @return {buffer} A new buffer containing the transcoded data.
 * @example buffer transcoded = buffer_transcode(src_buffer, "UTF-8", "ISO-8859-1");
 * @see string_encode(), string_decode()
 */
buffer buffer_transcode(buffer src, string from_encoding, string to_encoding);

/**
 * Identifies whether a given variable is a buffer.
 *
 * bufferp() returns 1 if 'arg' is a buffer value, and zero (0) otherwise.
 *
 * @param {mixed} arg The variable to check.
 * @return {int} 1 if 'arg' is a buffer, otherwise 0.
 * @example int is_buffer = bufferp( allocate_buffer(10) ); // 1
 * @example int is_buffer = bufferp( "Foo" ); // 0
 * @see mapp(3), stringp(3), pointerp(3), objectp(3), intp(3), floatp(3),
 *      functionp(3), nullp(3), undefinedp(3), errorp(3)
 */
int bufferp(mixed arg);

/**
 * Computes the cycle redundancy code (CRC-32) for a buffer or string.
 *
 * crc32() computes and returns the CRC-32 code for the given buffer or string 'x'.
 * This function is useful for verifying the integrity of data or for hashing purposes.
 *
 * @param {buffer | string} x The buffer or string to compute the CRC-32 code for.
 * @return {int} The CRC-32 code as an integer.
 * @example int crc = crc32("Hello, World!");
 */
int crc32(buffer | string x);

/**
 * Reads from a file and returns a buffer, or returns part of a buffer as a string.
 *
 * read_buffer() can operate in two modes based on the type of 'src':
 * - If 'src' is a string (filename), it reads from the file starting at byte 'start' for 'len' bytes,
 *   and returns the data as a buffer. If 'start' and 'len' are not specified, the entire file is read.
 * - If 'src' is a buffer, it reads characters from the buffer starting at byte 'start' for 'len' bytes,
 *   and returns the data as a string.
 *
 * @param {string | buffer} src The source from which to read. A filename or a buffer.
 * @param {int} start The starting byte position in 'src' from which to begin reading.
 * @param {int} len The number of bytes to read from 'src'.
 * @return {string | buffer} Depending on 'src', returns a buffer (if 'src' is a string) or a string (if 'src' is a buffer).
 * @example buffer file_contents = read_buffer("/path/to/file", 0, 1024);
 * @example string buffer_contents = read_buffer(existing_buffer, 0, 1024);
 */
string | buffer read_buffer(string | buffer src, int start, int len);

/**
 * Writes data to a file or into a buffer, starting at a specified byte position.
 *
 * write_buffer() can operate in two modes based on the type of 'dest':
 * - If 'dest' is a string (filename), 'source' can be an int, a buffer, or a string. The data from 'source'
 *   is written to the file named 'dest' starting at byte position 'start'. If 'source' is an int, it is
 *   written in network-byte-order.
 * - If 'dest' is a buffer, 'source' is written into this buffer starting at byte position 'start'. If 'source'
 *   is an int, it is written in network-byte-order.
 *
 * @param {string | buffer} dest The destination where the data will be written. A filename or a buffer.
 * @param {int} start The starting byte position in 'dest' where writing begins.
 * @param {mixed} source The data to write. Can be an int, a buffer, or a string.
 * @return {int} 1 on success, 0 on failure.
 * @example int success = write_buffer("/path/to/file", 0, "Hello, World!");
 * @example int success = write_buffer(existing_buffer, 0, 42);
 */
int write_buffer(string | buffer dest, int start, mixed source);

