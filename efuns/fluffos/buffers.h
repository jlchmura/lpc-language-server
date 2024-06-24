// buffers.h

/**
 * write_buffer() - write a buffer to a file, or read into a buffer from a
source
 *
 * If 'dest' is a file, then 'source' must be an int (and will be  written
 * to the file in network-byte-order), a buffer, or a string, and 'source'
 * will be written to the file 'dest' starting at byte # 'start'.
 * 
 * If 'dest' is a buffer, then 'source' will be written  into  the  buffer
 * starting  at  byte  # 'start' in the buffer.  If 'source' is an int, it
 * will be written in network-byte-order.
 *
 */
int write_buffer( string | buffer dest,
                  int start,
                  mixed source );

/**
 * read_buffer() - read from a file and return a buffer, or return part of
a buffer as a string
 *
 * If 'src' is a string (filename), then the filename will be read, start‐
 * ing  at  byte # 'start', for 'len' bytes, and returned as a buffer.  If
 * neither argument is given, the entire file is read.
 * 
 * If 'src' is a buffer, then characters are read from the  buffer  begin‐
 * ning  at  byte  #  'start' in the buffer, and for 'len' # of bytes, and
 * returned as a string.
 * 
 * Note that the maximum number of bytes you can read from a file and into
 * a buffer is controlled via the 'maximum byte transfer' parameter in the
 * runtime config file.
 *
 */
string | buffer read_buffer( string | buffer src,
                             int start,
                             int len );

/**
 * crc32() - compute the cycle redundancy code for a buffer or string
 *
 * Computes  and  returns  the CRC-32 code for the given buffer or string, 'x'.
 *
 */
int crc32( buffer | string x );

/**
 * bufferp() - identifies whether a given variable is a buffer
 *
 * Return 1 if 'arg' is a buffer value and zero (0) otherwise.
 *
 * int is_buffer = bufferp( allocate_buffer(10) ); // 1
 * int is_buffer = bufferp( "Foo" ); // 0
 *
 */
int bufferp( mixed arg );

/**
 * buffer_transcode() - transcode a buffer from one encoding to another
 *
 * Transcode given buffer from encoding 'from_encoding' to encoding
 * 'to_encoding'.
 *
 */
buffer buffer_transcode(buffer src,
                        string from_encoding,
                        string to_encoding);

/**
 * allocate_buffer() - allocate a buffer
 *
 * Allocate  a  buffer of <size> elements.  The number of elements must be
 * >= 0 and not bigger than a system maximum (usually ~10000).   All  ele‐
 * ments are initialized to 0.
 *
 */
buffer allocate_buffer( int size );

