// buffers.h

/**
 * write_buffer() - 将一个缓冲区写入文件，或从源读取到缓冲区
 *
 * 如果 'dest' 是一个文件，则 'source' 必须是一个整数（并将以网络字节序写入文件）、
 * 一个缓冲区或一个字符串，'source' 将从字节 # 'start' 开始写入文件 'dest'。
 * 
 * 如果 'dest' 是一个缓冲区，则 'source' 将从字节 # 'start' 开始写入该缓冲区。
 * 如果 'source' 是一个整数，则将以网络字节序写入。
 *
 */
int write_buffer( string | buffer dest,
                  int start,
                  mixed source );

/**
 * read_buffer() - 从文件中读取并返回一个缓冲区，或将缓冲区的一部分作为字符串返回
 *
 * 如果 'src' 是一个字符串（文件名），则将从字节 # 'start' 开始读取文件，读取 'len' 字节，
 * 并作为缓冲区返回。如果没有提供任何参数，则读取整个文件。
 * 
 * 如果 'src' 是一个缓冲区，则从字节 # 'start' 开始，从缓冲区中读取字符，并读取 'len' 字节，
 * 并作为字符串返回。
 * 
 * 请注意，从文件中读取到缓冲区的最大字节数是通过运行时配置文件中的 'maximum byte transfer' 参数控制的。
 *
 */
string | buffer read_buffer( string | buffer src,
                             int start,
                             int len );

/**
 * crc32() - 计算缓冲区或字符串的循环冗余码
 *
 * 计算并返回给定缓冲区或字符串 'x' 的 CRC-32 码。
 *
 */
int crc32( buffer | string x );

/**
 * bufferp() - 确定给定变量是否是一个缓冲区
 *
 * 如果 'arg' 是一个缓冲区值，则返回 1，否则返回零 (0)。
 *
 * int is_buffer = bufferp( allocate_buffer(10) ); // 1
 * int is_buffer = bufferp( "Foo" ); // 0
 *
 */
int bufferp( mixed arg );

/**
 * buffer_transcode() - 将缓冲区从一种编码转码到另一种编码
 *
 * 将给定的缓冲区从编码 'from_encoding' 转码到编码 'to_encoding'。
 *
 */
buffer buffer_transcode(buffer src,
                        string from_encoding,
                        string to_encoding);

/**
 * allocate_buffer() - 分配一个缓冲区
 *
 * 分配一个 <size> 元素的缓冲区。元素的数量必须 >= 0，并且不大于系统最大值（通常约为10000）。
 * 所有元素都初始化为 0。
 *
 */
buffer allocate_buffer( int size );
