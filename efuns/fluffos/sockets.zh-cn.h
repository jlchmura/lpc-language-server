// sockets.h

/**
 * socket_write() - 从套接字发送消息
 *
 * socket_write() 在套接字 s 上发送一条消息。如果套接字 s 的类型是
 * STREAM 或 MUD，则该套接字必须已经连接，且地址未指定。如果套接字
 * 是 DATAGRAM 类型，则必须指定地址。地址的格式为："127.0.0.1 23"。
 *
 */
int socket_write( int s, mixed message,
                  void | string address );

/**
 * socket_status() - 显示每个 LPC 套接字的状态
 *
 * socket_status() 返回一个数组，每个套接字对应一个数组。
 *
 */
mixed *socket_status(void | int);

/**
 * socket_release() - 将套接字的所有权转移给另一个对象
 *
 * socket_release() 用于将套接字的所有权（和控制权）转移给另一个
 * 对象。这在处理连接设置的守护进程对象（如 inetd）中非常有用。
 * 它会在将一个已连接的套接字转移给另一个对象以便进一步处理时使用。
 * 
 * 套接字所有权的转移涉及到当前所有者对象与欲转移的套接字之间的
 * 握手。当调用 socket_release() 时，握手被引发。socket_release()
 * 执行适当的安全/完整性检查，然后调用对象 ob 中的 release_callback
 * 函数。此函数用于通知 ob 套接字所有权正在转移给它。随后，ob 有
 * 责任在释放回调函数内调用 socket_acquire()。如果调用了 socket_acquire()
 * ，则握手完成，套接字所有权成功转移至 ob。如果 ob 不接受套接字的
 * 责任而不调用 socket_acquire()，则所有权不发生变化，当前的套接字
 * 拥有者必须自行决定如何响应。
 * 
 * 如果套接字所有者成功转移，则 socket_release() 返回 EESUCCESS。如果
 * ob 不接受套接字所有权，则返回 EESOCKNOTRLSD。其他错误可能基于
 * 安全违规、无效的套接字描述符值等返回。
 *
 */
int socket_release( int socket, object ob,
                    string release_callback );

/**
 * socket_listen() - 监听套接字上的连接
 *
 * 要接受连接，首先使用 socket_create(3) 创建一个套接字，然后使用
 * socket_listen(3) 将套接字置于监听模式，并使用 socket_accept(3)
 * 接受连接。socket_listen() 调用仅适用于 STREAM 或 MUD 类型的
 * 套接字。
 * 
 * 参数 listen_callback 是在监听套接字上请求连接时，驱动程序要调用
 * 的一个函数的名称。监听回调函数应遵循以下格式：
 * 
 * void listen_callback(int fd)
 * 
 * 其中 fd 是监听套接字。
 *
 */
int socket_listen( int s, string listen_callback );

/**
 * socket_error() - 返回套接字错误的文本描述
 *
 * socket_error() 返回一个字符串，描述由 error 表示的错误。
 *
 */
string socket_error( int error );

/**
 * socket_create() - 创建一个 efun 套接字
 *
 * socket_create() 创建一个 efun 套接字。mode 决定创建的套接字类型。
 * 当前支持的套接字模式有：
 * 
 * 0  MUD             使用 TCP 协议发送 LPC 数据类型。
 * 
 * 1  STREAM          使用 TCP 协议发送原始数据。
 * 
 * 2  DATAGRAM        使用 UDP 协议。
 * 
 * 3  STREAM_BINARY   使用 TCP 协议交换二进制消息。
 * 
 * 4  DATAGRAM_BINARY 使用 UDP 协议交换二进制消息。
 * 
 * 参数 read_callback 是在套接字从其对等体获取数据时，驱动程序要调用
 * 的一个函数的名称。读取回调应遵循以下格式：
 * 
 * void read_callback(int fd, mixed message, string addr)
 * 
 * 其中 fd 是接收到数据的套接字，message 是接收到的数据，addr 是客户的地址。
 * 
 * 在非二进制模式下，message 将使用 UTF8 编码进行清理并作为字符串返回。
 * 
 * 在二进制模式下，原始消息将作为缓冲区返回。
 * 
 * 参数 close_callback 是在套接字意外关闭时（即不是由于 socket_close(3)
 * 调用的结果），驱动程序要调用的一个函数的名称。关闭回调应遵循
 * 以下格式：
 * 
 * void close_callback(int fd)
 * 
 * 其中 fd 是已关闭的套接字。注意：close_callback 不适用于 DATAGRAM 模式的套接字。
 *
 */
int socket_create( int mode, string read_callback,
                   void | string close_callback );

/**
 * socket_connect() - 在套接字上发起连接
 *
 * 参数 s 是一个套接字，s 必须是 STREAM 模式或 MUD 模式的套接字。
 * address 是套接字尝试连接的地址。address 的格式为："127.0.0.1 23"
 * 
 * 参数 read_callback 是在套接字从其对等体获取数据时，驱动程序要调用
 * 的一个函数的名称。读取回调应遵循以下格式：
 * 
 * void read_callback(int fd, mixed message)
 * 
 * 其中 fd 是接收到数据的套接字，message 是接收到的数据。
 * 
 * 参数 write_callback 是在套接字准备好写入时，驱动程序要调用的一个
 * 函数的名称。写入回调应遵循以下格式：
 * 
 * void write_callback(int fd)
 * 
 * 其中 fd 是准备好写入的套接字。
 *
 */
int socket_connect( int s, string address,
                    string read_callback,
                    string write_callback );

/**
 * socket_close() - 关闭一个套接字
 *
 * socket_close() 关闭套接字 s。这将释放一个套接字 efun 槽以供使用。
 *
 */
int socket_close( int s );

/**
 * socket_bind() - 将名称绑定到一个套接字
 *
 * socket_bind() 将一个名称分配给一个未命名的套接字。当通过 socket_create(3)
 * 创建一个套接字时，它存在于一个命名空间（地址族）中，但未分配名称。
 * socket_bind() 请求将端口分配给套接字 s。
 *
 */
int socket_bind( int s, int port );

/**
 * socket_address() - 返回 efun 套接字的远程地址
 *
 * socket_address() 返回 efun 套接字 s 的远程地址。返回的地址格式为：
 * 
 * "127.0.0.1 23"。
 *
 */
string socket_address( int s );

/**
 * socket_acquire() - 假定一个套接字的所有权
 *
 * socket_acquire() 是在 socket_release() 开始的握手中调用，以将
 * 套接字的所有权（和控制权）转移给一个新对象。socket_release() 在
 * 新拥有者对象内调用释放回调函数，以通知该对象希望将套接字的控制权
 * 转交给它。新的所有者套接字需要决定是否希望接受该套接字。如果接受，
 * 则调用 socket_acquire() 完成转移。如果不接受，则回调函数简单返回
 * 而不完成握手。
 * 
 * 在前一种情况下，握手完成，新对象成为套接字所有者。读取、写入和关闭
 * 回调函数参数指的是新对象内的函数。这些参数是为了让 MudOS 驱动程序
 * 知道在新对象内调用哪些函数。拒绝获取套接字将导致 socket_release()
 * 返回 EESOCKNOTRLSD，从而使所有者能够执行适当的清理。
 * 
 * socket_acquire() 只能在释放回调函数的上下文中调用，并且只能与指定的
 * 套接字一起调用。
 *
 */
int socket_acquire( int socket, string read_callback,
                    string write_callback,
                    string close_callback );

/**
 * socket_accept() - 在套接字上接受连接
 *
 * 参数 s 是一个通过 socket_create(3) 创建的套接字，已通过
 * socket_bind(3) 绑定到地址，并在 socket_listen(3) 后开始监听
 * 连接。socket_accept() 从待处理连接的队列中提取第一个连接，创建
 * 一个具有与 s 相同属性的新套接字，并为该套接字分配新的文件描述符。
 * 如果在队列上没有待处理连接，socket_accept() 将返回一个错误，如
 * 下所述。已接受的套接字用于从这个套接字读取和写入数据；它不用于
 * 接受更多连接。原始套接字 s 仍然打开以接受进一步连接。
 * 
 * 参数 read_callback 是当新套接字（而非接受套接字）接收到数据时，
 * 驱动程序要调用的一个函数的名称。读取回调应遵循以下格式：
 * 
 * void read_callback(int fd)
 * 
 * 其中 fd 是准备接受数据的套接字。
 * 
 * 参数 write_callback 是当新套接字（而非接受套接字）准备好写入时，
 * 驱动程序要调用的一个函数的名称。写入回调应遵循以下格式：
 * 
 * void write_callback(int fd)
 * 
 * 其中 fd 是准备好写入的套接字。
 * 
 * 注意：如果新套接字意外关闭，即不是由于 socket_close(3) 调用的结果，
 * 接受套接字的 close_callback 会被调用。关闭回调应遵循以下格式：
 * 
 * void close_callback(int fd)
 * 
 * 其中 fd 是已关闭的套接字。
 *
 */
int socket_accept( int s, string read_callback,
                   string write_callback );


/**
 * 设置套接字的选项。
 * @param socket 
 * @param option 
 * @param host 
 */
void socket_set_option(int socket, int option, int|string host);
