// internals.h

/**
 * traceprefix() - 设置确定哪些对象进行追踪的前缀
 *
 * 如果设置了追踪前缀（即不为0），则只有名称带有设置前缀的对象才会进行追踪。
 *
 */
string traceprefix( string prefix );

/**
 * trace() - 设置追踪标志并返回旧的标志。
 *
 * 设置追踪标志并返回旧的追踪标志。当追踪开启时，在执行期间会打印大量信息。
 * 
 * 追踪位是：
 * 
 * 1   追踪所有对lfuns的函数调用。
 * 
 * 2   追踪所有对“call_other”的调用。
 * 
 * 4   追踪所有函数返回。
 * 
 * 8   在函数调用和返回值时打印参数。
 * 
 * 16  打印所有执行的堆栈机器指令（产生大量输出！）。
 * 
 * 32  在心跳函数中启用追踪。
 * 
 * 64  追踪对apply的调用。
 * 
 * 128 在追踪中显示对象名称。
 *
 */
int trace( int traceflags );

/**
 * time_expression() - 返回表达式所花费的真实时间
 *
 * 评估<expr>。在评估<expr>期间经过的真实时间（以微秒为单位）将被返回。该值的精度不一定为1微秒；实际上，它可能要低得多。
 *
 */
int time_expression( mixed expr );

/**
 * swap - 显式交换文件
 *
 * 此efun应仅保留用于调试。它允许对象显式交换出。如果启用，强烈建议使用模拟efun覆盖（用于此efun）以防止滥用。
 * 
 * 注意：已被销毁、已经交换出、包含心跳、克隆、继承或互动的对象，无法被交换出。
 *
 */
void swap( object );

/**
 * set_malloc_mask() - 设置控制显示内存分配调试信息的掩码
 *
 * 此efun仅在构建驱动时在options.h中同时定义DEBUGMALLOC和DEBUGMALLOC_EXTENSIONS时可用。该掩码控制在驱动分配和释放内存时显示哪些内存相关的调试信息。有关更多信息，请参阅驱动源代码中的md.c。
 *
 */
void set_malloc_mask( int mask );

/**
 * set_debug_level() - 设置驱动的debug()宏使用的调试级别
 *
 * 此efun的目的是允许从mud内部控制生成的调试信息的量和类型（在驱动运行时）。
 * 
 * 信息将同时打印到stdout和在运行时配置文件中指定的“调试日志文件”设置的文件中。
 * 
 * 级别是一个位掩码整数或字符串。如果使用整数，可以使用按位或运算符（|）设置多个级别。
 * 
 * 可用的级别如下：
 * "call_out"        1 << 0
 * "d_flag"          1 << 2
 * "connections"     1 << 3
 * "mapping"         1 << 4
 * "sockets"         1 << 5
 * "comp_func_tab"   1 << 6
 * "LPC"             1 << 7
 * "LPC_line"        1 << 8
 * "event"           1 << 9
 * "dns"             1 << 10
 * "file"            1 << 11
 * "add_action"      1 << 12
 * "telnet"          1 << 13
 * "websocket"       1 << 14
 * 
 * 当级别为整数时，调试级别将设置为该值，清除任何以前的设置。
 * 
 * 如果级别是字符串，选项的调试级别将切换为开启，而所有其他选项将被保留。
 *
 */
void set_debug_level( int | string level );

/**
 * set_config() - 在运行时设置各种驱动配置设置
 *
 * 此efun用于在运行时设置驱动的各种配置设置。有关当前识别的选项列表，请参阅“runtime_config.h”包含文件。
 * 
 * 请注意，这仅会修改当前运行的选项，并不会在驱动重启时保留。
 *
 * // 将驱动的心跳设置为1000毫秒
 * set_config(__RC_HEARTBEAT_INTERVAL_MSEC__, 1000)
 * 
 * // 调整驱动对call_out(0)的限制
 * set_config(__RC_CALL_OUT_ZERO_NEST_LEVEL__, 250)
 *
 */
void set_config( int option, mixed value );

/**
 * rusage() - 报告通过 getrusage() 系统调用收集的信息
 *
 * 该 efun 收集通过 getrusage() 系统调用收集的信息。有关将收集哪些信息的更多信息，请阅读 getrusage() 手册页。一些系统并没有 getrusage() 系统调用，但有 times() 系统调用。在这些系统上，仅会提供 "utime" 和 "stime"。时间以毫秒为单位报告。
 * 
 * 以下是 rusage() 的示例用法：
 * 
 * void
 * create()
 * {
 * mapping info;
 * 
 * info = rusage();
 * write("用户时间 = " + info["utime"] + "ms\n");
 * write("系统时间 = " + info["stime"] + "ms\n");
 * }
 * 
 * 可用字段为：
 * 
 * utime, stime, maxrss, ixrss, idrss, isrss, minflt, majflt, nswap,
 * inblock, oublock, msgsnd, msgrcv, nsignals, nvcsw, nivcsw.
 *
 */
mapping rusage( void );

/**
 * refs - 返回对数据结构的引用数量
 *
 * refs() 将返回对 'data' 的引用数量。这在决定是否在返回数据结构之前进行复制时非常有用。
 *
 */
int refs( mixed data );

/**
 * query_load_average() - 强制对象发生错误。
 *
 * 此函数返回一个字符串，该字符串报告两件事：1）每秒用户命令，2）每秒编译行数。
 *
 */
string query_load_average( void );

/**
 * opcprof() - 报告各种 efun 的调用频率统计信息
 *
 * 该函数转储每个 efunction 和 eoperator 的统计信息。如果未指定参数，则信息将转储到名为 /OPCPROF.efun 和 /OPCPROF.eoper 的文件中。如果指定了参数，则该名称将用作转储的文件名。
 *
 */
void opcprof( string | void );

/**
 * mud_status() - 报告各种驱动程序和 mudlib 统计信息
 *
 * 此函数将驱动程序和 mudlib 统计信息写到调用者的屏幕上。如果 extra 非零，则将写入额外的信息。此函数替换了 vanilla 3.1.2 中硬编码的 'status' 和 'status tables' 命令。
 *
 */
void mud_status( int extra );

/**
 * moncontrol() - 开启/关闭执行过程中的分析
 *
 * 如果传入 1，moncontrol() 启用分析。如果传入 0，moncontrol() 禁用分析。在执行过程中的很多次调用中，典型用法是在驱动程序执行的某些部分进行分析。如果在驱动程序编译时没有启用分析，则 moncontrol() 无效。
 *
 */
void moncontrol( int on );

/**
 * memory_info - 获取对象/整体内存使用情况的信息
 *
 * 如果提供了可选参数 'ob'，memory_info() 将返回 'ob' 使用的内存的近似数量。如果没有提供参数，memory_info() 将返回整个 mud 使用的内存的近似数量。请注意，mud 使用的内存量不一定与 mud 从系统中实际分配的内存量一致。
 *
 */
varargs int memory_info( object ob );

/**
 * malloc_status() - 报告与内存使用相关的各种统计信息。
 *
 * 此函数将内存使用统计信息写到调用者的屏幕上。此函数替换了 vanilla 3.1.2 中硬编码的 'malloc' 命令。请注意，malloc_status() 产生的输出取决于在构建驱动程序时在 options.h 中选择的内存管理程序包。
 *
 */
void malloc_status( void );

/**
 * get_config() - 查询各种驱动程序配置设置
 *
 * 此 efun 用于查询驱动程序的各种配置设置。有关当前识别的选项列表，请参阅 "runtime_config.h" 包含文件。
 *
 * get_config( __RC_HEARTBEAT_INTERVAL_MSEC__ );
 * get_config( __RC_CALL_OUT_ZERO_NEST_LEVEL__ );
 *
 */
string | int get_config( int );

/**
 * dumpallobj() - 报告已加载的所有对象的各种统计信息
 *
 * 此函数转储已加载的所有对象的统计信息。如果未指定参数，则信息将转储到名为 /OBJ_DUMP 的文件中。如果指定了参数，则该名称将用作转储的文件名。
 *
 */
void dumpallobj( string | void );

/**
 * dump_socket_status() - 显示每个 LPC 套接字的状态
 *
 * dump_socket_status() 是一个诊断工具，它显示 MudOS 驱动程序中配置的所有 LPC 套接字的当前状态。它对于调试 LPC 套接字应用程序非常有用。输出中的每一行对应于一个 LPC 套接字。第一行对应于 LPC 套接字描述符 0，第二行对应于 1，以此类推。套接字的总数是在构建驱动程序时配置的。
 * 
 * 第一列 "Fd" 是与 LPC 套接字关联的操作系统文件描述符。"State" 是 LPC 套接字的当前操作状态。"Mode" 是套接字模式，在调用 socket_create() 时作为参数传递。局部和远程地址是互联网地址和端口号以互联网点符号表示。'*' 表示某个地址或端口为 0。注意，处于 CLOSED 状态的 LPC 套接字当前未在使用，因此为该套接字显示的数据可能是特殊的。
 * 
 * 以下输出是在 Portals 上生成的，当时运行的唯一套接字应用程序是 MWHOD。它表明当前有两个套接字在使用，一个在 STREAM 模式套接字上监听连接请求，另一个在 DATAGRAM 模式套接字上等待传入数据。
 * 
 * Fd    状态      模式      本地地址      远程地址
 * --  ---------  --------  -----------------  ------------------
 * 13   LISTEN     STREAM   *.6889             *.*
 * 14    BOUND    DATAGRAM  *.6888             *.*
 * -1    CLOSED      MUD    *.*                *.*
 *
 */
void dump_socket_status( void );

/**
 * dump_prog() - 转储/反汇编一个LPC对象
 *
 * dump_prog() 将'obj'的程序信息转储到一个文件'file'中，或者如果未给定'file'则转储到"/PROG_DUMP"。如果当前对象没有写入该文件的权限，则操作失败。
 * 
 * Flags可以是以下值的组合：1 - 包含i-code的反汇编 2 - 包含行号信息
 *
 * @param {object} ob - 要转储的对象
 * @param {int} flags - 要使用的标志，默认为
 * @param {string} file - 要转储到的文件，默认为"/PROG_DUMP"
 */
varargs void dump_prog( object ob );

/**
 * dump_file_descriptors() - 转储MudOS进程文件描述符表
 *
 * 此函数提供用于调试MudOS驱动程序的帮助，并有助于克服某些UN*X实现中存在的缺陷，这些实现不提供作为操作系统一部分的等效或更高级的调试功能。输出的解释非常依赖于系统。每个文件描述符都会被检查以确定它是否指向一个打开的文件。如果是，则从fstat()系统调用返回的"stat结构"中显示信息。
 * 
 * 以下输出是在运行Sequent DYNIX/ptx系统的Lambda Realms上生成的：
 * 
 * Fd  设备号  Inode   模式    用户ID    组ID      大小
 * --  -------------  -----  ------  -----  -----  ----------
 * 0     3      2    10319  c  666      0      3           0
 * 1    79      7   164598  f  644   2862      1      789522
 * 2    79      7   164598  f  644   2862      1      789522
 * 3    40    33b     6925  c    0   2862      1           0
 * 4    40    2a4     6943  c    0   2862      1           0
 * 5    79      7   164599  f  600   2862      1       44784
 * 6    40    2e2   145996  c    0   2862      1           0
 * 7    79      7   164601  f  644   2862      1         506
 *
 */
void dump_file_descriptors( void );

/**
 * debugmalloc() - 转储有关malloc内存的信息到一个文件。
 *
 * 这个efun只有在DEBUGMALLOC和DEBUGMALLOC_EXTENSIONS在驱动程序构建时都在options.h中定义的情况下才可用。debugmalloc() efun将转储由DMALLOC()和相关宏分配的内存片段的信息，如果与宏提供的标记的掩码按位与（&）结果非零。详情请阅读驱动程序源代码中的md.c和config.h。
 *
 */
void debugmalloc( string filename, int mask );

/**
 * debug_levels
 *
 * 返回当前调试级别的映射，其中键是调试级别的名称，值是0（禁用）或表示调试级别的位掩码值的整数值。
 *
 * set_debug_level( (1 << 0) | (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5) );
 * printf("%O\n", debug_levels());
 * 
 * 结果：
 * ([ /* sizeof() == 14 *\/
 * "telnet" : 0,
 * "file" : 0,
 * "LPC_line" : 0,
 * "mapping" : 16,
 * "d_flag" : 4,
 * "add_action" : 0,
 * "event" : 0,
 * "comp_func_tab" : 0,
 * "sockets" : 32,
 * "dns" : 0,
 * "websocket" : 0,
 * "LPC" : 0,
 * "connections" : 8,
 * "call_out" : 1,
 * ])
 *
 */
mapping debug_levels();

/**
 * debug_info() - 显示调试信息
 *
 * debug_info() 是一个通用的工具，可以用于调试MudOS驱动程序。请求的调试信息由第一个参数决定。后续参数则由所选择的操作决定。
 * 
 * 现有的操作（0和1）需要第二个对象类型参数，可以用于显示MudOS对象结构的各种字段。
 * 
 * 以下LPC代码用于生成示例输出：
 * 
 * /* di0.c *\/
 * create() {
 * debug_info(0, this_object());
 * }
 * 
 * O_HEART_BEAT      : FALSE
 * O_IS_WIZARD       : FALSE
 * O_ENABLE_COMMANDS : FALSE
 * O_CLONE           : FALSE
 * O_DESTRUCTED      : FALSE
 * O_SWAPPED         : FALSE
 * O_ONCE_INTERACTIVE: FALSE
 * O_RESET_STATE     : FALSE
 * O_WILL_CLEAN_UP   : FALSE
 * O_WILL_RESET: TRUE
 * total light : 0
 * next_reset  : 720300560
 * time_of_ref : 720299416
 * ref         : 2
 * swap_num    : -1
 * name        : 'u/c/cynosure/di0'
 * next_all    : OBJ(bin/dev/_update)
 * 此对象是对象列表的头部。
 * 
 * /* di1.c *\/
 * create() {
 * debug_info(1, this_object());
 * }
 * 
 * program ref's 1
 * Name u/c/cynosure/di1.c
 * program size 10
 * num func's 1 (16)
 * num strings 0
 * num vars 0 (0)
 * num inherits 0 (0)
 * total size 104
 *
 */
mixed debug_info( int operation... );

/**
 * cache_stats() - 报告各种驱动程序和mudlib统计信息
 *
 * 此efun仅在驱动程序构建时在options.h中定义了CACHE_STATS的情况下可用。该efun将转储调用者屏幕上的call_other()缓存命中率的统计信息。
 *
 */
void cache_stats( void );
