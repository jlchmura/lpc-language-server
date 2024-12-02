// sockets.h

/**
 * socket_write() - send a message from a socket
 *
 * socket_write()  sends  a  message  on a socket s. If the socket s is of
 * type STREAM or MUD, the  socket  must  already  be  connected  and  the
 * address  is  not  specified.  If  the  socket  is of type DATAGRAM, the
 * address must be specified.  The address is of the form: "127.0.0.1 23".
 *
 */
int socket_write( int s, mixed message,
                  void | string address );

/**
 * socket_status() - display the status of each LPC socket
 *
 * socket_status() returns an array of arrays; one for each socket.
 *
 */
mixed *socket_status(void | int);

/**
 * socket_release() - release ownership of a socket to another object
 *
 * socket_release()  is used to change ownership (and control) of a socket
 * to another object.  It is useful in daemon objects (like  inetd)  which
 * handle  connection  set-up  and  then  transfer  a  connected socket to
 * another object for further processing.
 * 
 * Socket ownership transfer involves  a  handshake  between  the  current
 * owner object and the socket to which the current owner wishes to trans‐
 * fer the socket.  The handshake is initiated  when  socket_release()  is
 * called.   socket_release() does appropriate security/integrity checking
 * and then calls the release_callback function in object ob.  This  func‐
 * tion is used to notify ob that socket ownership is being transferred to
 * it.  It is then ob's responsibility to call socket_acquire() within the
 * release  callback  function.   If  socket_acquire()  is called then the
 * handshake is complete and socket ownership has been successfully trans‐
 * ferred  to  ob.  ob may decline to accept responsibility for the socket
 * by not calling socket_acquire(),  in  which  case  ownership  does  not
 * change and the current socket owner must decide how to respond to this.
 * 
 * If  the  socket  owner is successfully transfered then socket_release()
 * returns EESUCCESS.  If ob does not accept ownership for the socket then
 * EESOCKNOTRLSD is returned.  Other errors can be returned based on secu‐
 * rity violation, bad socket descriptor vbalues, etc.
 *
 */
int socket_release( int socket, object ob,
                    string release_callback );

/**
 * socket_listen() - listen for connections on a socket
 *
 * To accept connections, a socket is first created with socket_create(3),
 * the socket is them put into listening mode with  socket_listen(3),  and
 * the connections are accepted with socket_accept(3). The socket_listen()
 * call applies only to sockets of type STREAM or MUD.
 * 
 * The argument listen_callback is the name of a function for  the  driver
 * to  call  when  a  connection is requested on the listening socket. The
 * listen callback should follow this format:
 * 
 * void listen_callback(int fd)
 * 
 * Where fd is the listening socket.
 *
 */


int socket_listen( int s, string listen_callback );

/**
 * socket_error() - return a text description of a socket error
 *
 * socket_error()  returns  a  string  describing  the  error signified by
 * error.
 *
 */


string socket_error( int error );

/**
 * socket_create() - create an efun socket
 *
 * socket_create()  creates  an efun socket. mode determines which type of
 * socket is created. Currently supported socket modes are:
 * 
 * 0  MUD             for sending LPC data types using TCP protocol.
 * 
 * 1  STREAM          for sending raw data using TCP protocol.
 * 
 * 2  DATAGRAM        for using UDP protocol.
 * 
 * 3  STREAM_BINARY   for exchange binary message with TCP protocol.
 * 
 * 4  DATAGRAM_BINARY for exchange binary message with UDP protocol.
 * 
 * The argument read_callback is the name of a function for the driver  to
 * call  when the socket gets data from its peer. The read callback should
 * follow this format:
 * 
 * void read_callback(int fd, mixed message, string addr)
 * 
 * Where fd is the socket which received the data, and message is the data
 * which was received, addr is the client address.
 * 
 * In non-binary mode, message will be sanitized with UTF8 encoding and returned as an string.
 * 
 * In binary mode, raw messages will be returned as a buffer.
 * 
 * The argument close_callback is the name of a function for the driver to
 * call if the socket closes unexpectedly, i.e. not as  the  result  of  a
 * socket_close(3) call. The close callback should follow this format:
 * 
 * void close_callback(int fd)
 * 
 * Where  fd  is the socket which has closed.  NOTE: close_callback is not
 * used with DATAGRAM mode sockets.
 *
 */
int socket_create( int mode, string read_callback,
                   void | string close_callback );

/**
 * socket_connect() - initiate a connection on a socket
 *
 * The  argument  s  is  a socket. s must be either a STREAM mode or a MUD
 * mode socket. address is the address to which the socket will attempt to
 * connect.  address is of the form: "127.0.0.1 23"
 * 
 * The  argument read_callback is the name of a function for the driver to
 * call when the socket gets data from its peer. The read callback  should
 * follow this format:
 * 
 * void read_callback(int fd, mixed message)
 * 
 * Where fd is the socket which received the data, and message is the data
 * which was received.
 * 
 * The argument write_callback is the name of a function for the driver to
 * call  when  the  socket  is  ready to be written to. The write callback
 * should follow this format:
 * 
 * void write_callback(int fd)
 * 
 * Where fd is the socket which is ready to be written to.
 *
 */


int socket_connect( int s, string address,
                    string read_callback,
                    string write_callback );

/**
 * socket_close() - close a socket
 *
 * socket_close() closes socket s. This frees a socket efun slot for use.
 *
 */


int socket_close( int s );

/**
 * socket_bind() - bind a name to a socket
 *
 * socket_bind()  assigns  a  name  to an unnamed socket. When a socket is
 * created with socket_create(3) it exists in a name space  (address  fam‐
 * ily)  but has no name assigned. socket_bind() requests that the port be
 * assigned to the socket s.
 *
 */


int socket_bind( int s, int port );

/**
 * socket_address() - return the remote address for an efun socket
 *
 * socket_address()  returns the remote address for an efun socket s.  The
 * returned address is of the form:
 * 
 * "127.0.0.1 23".
 *
 */


string socket_address( int s );

/**
 * socket_acquire() - assume ownership of a socket
 *
 * socket_acquire()   is   called  to  complete  the  handshake  begun  by
 * socket_release() for transferring ownership (and control) of  a  socket
 * to  a new object.  socket_release() calls the release callback function
 * within the new owner object to notify the object that it wishes to pass
 * control  of  the  socket on.  It is the responsibility of the new owner
 * socket to decide whether it wishes to accept the socket.  It  it  does,
 * then socket_acquire() is called to complete the transfer.  If not, then
 * the callback simply returns without completing the handshake.
 * 
 * In the former case the  handshake  is  completed  and  the  new  object
 * becomes  the socket owner.  The read, write and close callback function
 * parameters refer to functions within the new object.  These are  speci‐
 * fied  so that the MudOS driver will know which functions to call within
 * the  new  object.   Decling  to   acquire   the   socket   will   cause
 * socket_release()  to  return  EESOCKNOTRLSD  so  the  owner can perform
 * appropriate clean-up.
 * 
 * socket_acquire() may only be called within the context of  thr  release
 * callback function and only with the socket specified.
 *
 */


int socket_acquire( int socket, string read_callback,
                    string write_callback,
                    string close_callback );

/**
 * socket_accept() - accept a connection on a socket
 *
 * The argument s is a socket that has been created with socket_create(3),
 * bound to an address with socket_bind(3), and is listening  for  connec‐
 * tions after a socket_listen(3). socket_accept() extracts the first con‐
 * nection on the queue of pending connections, creates a new socket  with
 * the  same  properties  of s and allocates a new file descriptor for the
 * socket.  If  no  pending  connections  are  present   on   the   queue,
 * socket_accept()  returns  an  error  as  described  below. The accepted
 * socket is used to read and write data to and from the socket which con‐
 * nected  to  this  one;  it  is not used to accept more connections. The
 * original socket s remains open for accepting further connections.
 * 
 * The argument read_callback is the name of a function for the driver  to
 * call when the new socket (not the accepting socket) receives data.  The
 * write callback should follow this format:
 * 
 * void read_callback(int fd)
 * 
 * Where fd is the socket which is ready to accept data.
 * 
 * The argument write_callback is the name of a function for the driver to
 * call  when  the  new  socket  (not the accepting socket) is ready to be
 * written to. The write callback should follow this format:
 * 
 * void write_callback(int fd)
 * 
 * Where fd is the socket which is ready to be written to.
 * 
 * Note: The close_callback of the accepting socket (not the  new  socket)
 * is called if the new socket closes unexpectedly, i.e. not as the result
 * of a socket_close(3) call. The close callback should follow  this  for‐
 * mat:
 * 
 * void close_callback(int fd)
 * 
 * Where fd is the socket which has closed.
 *
 */


int socket_accept( int s, string read_callback,
                   string write_callback );


/**
 * Set the option for a socket.
 * @param socket 
 * @param option 
 * @param host 
 */
void socket_set_option(int socket, int option, int|string host);
