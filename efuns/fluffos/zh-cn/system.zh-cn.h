// system.h

/**
 * uptime()  -  返回自上次驱动重启以来经过的秒数
 *
 * 这个函数返回自上次驱动重启以来经过的秒数。
 *
 */
int uptime( void );

/**
 * trace_start - 开始收集驱动跟踪信息
 *
 * 调用此函数将开始收集来自驱动的跟踪信息。这包括LPC函数级别的执行信息。
 * 
 * 跟踪收集将在 `trace_end()` 被调用或在 `auto_stop_sec` 秒后停止，该值默认为30秒。
 * 
 * 注意：不要让跟踪启用太长时间，否则会有耗尽内存的风险。
 * @param filename 写入跟踪数据的文件 
 * @param auto_stop_sec 收集跟踪数据之前的秒数，默认为30秒
 */
varargs void trace_start(string filename, int auto_stop_sec);

/**
 * trace_end - 停止收集驱动跟踪信息
 *
 * 调用此函数将停止活动的跟踪并将结果写出到`trace_start(filename)`提供的文件中。
 * 
 * 注意：不要让跟踪启用太长时间，否则会有耗尽内存的风险。
 *
 */
void trace_end();

/**
 * time_ns() - 返回自1970年1月1日以来的纳秒数
 *
 * 返回自1970年1月1日午夜（GMT）以来经过的纳秒数。
 *
 */
int time_ns( void );

/**
 * time() - 返回自1970年1月1日以来的秒数
 *
 * 返回自1970年1月1日午夜（GMT）以来经过的秒数。
 *
 */
int time( void );

/**
 * sys_reload_tls() - 重新加载给定端口的TLS证书和密钥。
 *
 * 重新加载指定在配置文件中的端口索引的TLS证书和密钥。
 * 
 * 例如，如果您在配置中定义了external_port_1_tls，那么您可以调用sys_reload_tls(1)来重新加载
 * 它。这允许您在不重启服务器的情况下更新证书和密钥。
 * 
 * 注意：
 * - 在调用此函数之前，您必须覆盖磁盘上先前的证书/密钥文件。
 * - 目前不支持为WebSocket端口重新加载TLS。
 *
 */
void sys_reload_tls ( int port_index );

/**
 * sys_network_ports() - 显示活动网络端口
 *
 * 返回一个数组的数组；每个数组对应于正在被积极使用的网络端口。
 *
 */
mixed *sys_network_ports(void);

/**
 * strptime() - 将字符串解析为本地时间
 *
 * 使用格式字符串解析给定的时间 'str'，请参见：
 * https://man7.org/linux/man-pages/man3/strptime.3.html
 *
 */
int strptime( string fmt, string str );

/**
 * strftime() - 将时间格式化为字符串
 *
 * 使用格式字符串格式化给定时间，请参见：
 * https://man7.org/linux/man-pages/man3/strftime.3.html
 *
 */
string strftime( string fmt, int time );

/**
 * shutdown() - 关闭驱动
 *
 * 此函数以受控的方式关闭驱动（与崩溃时关闭的方式相对）。'how'参数指定驱动应该将哪个
 * 整数值传递给exit()。约定是当重启驱动的脚本也应该死亡时，将'how'传递为-1。
 * 因此，重启命令将使用shutdown()，而停止命令将使用shutdown(-1)。脚本必须明确检查
 * 返回值，以查看是否是-1，如果您希望使用此约定。显然，shutdown()是一个敏感函数，应该
 * 受到保护。与exec()一样，使其安全的方式是添加一个同名的simul_efun，并进行适当的安全检查。
 * 确保在master.c中设置valid_override(4)以保护against efun::shutdown()。
 *
 */
varargs void shutdown( int how );

/**
 * set_reset - 修改对象的重置时间
 *
 * 将 'ob' 的重置时间设置为从现在起 'time' 秒。如果 'time' 被省略，
 * 驱动程序的正常重置时间设置公式将应用于 'ob'，即：
 * 
 * 重置时间 = 当前时间 + 重置时间 / 2 + 随机(重置时间 / 2)
 *
 */
varargs void set_reset( object ob, int time );

/**
 * set_eval_limit() - 设置最大评估成本
 *
 * set_eval_limit()，使用非零参数，设置允许任何一个线程的最大
 * 评估成本，在此成本达到时，会发生运行时错误。使用零作为参数，
 * 会将当前评估计数器设置为零，并返回最大成本。set_eval_limit(-1)
 * 返回剩余的评估成本。
 *
 */
void set_eval_limit( int );

/**
 * reset_eval_cost() - 重置剩余评估成本
 *
 * reset_eval_cost()，将剩余评估成本重置为最大评估成本。
 * 
 * 返回新的评估成本。
 *
 */
int reset_eval_cost();

/**
 * replace_program() - 替换 this_object() 中的程序
 *
 * replace_program() 将 this_object() 中的程序替换为其继承的
 * 对象的程序。字符串参数是要使用的对象的文件名。一旦替换
 * 发生，当前对象实际上变成了那个其他对象的克隆，但保留了
 * 当前的文件名和全局变量值。程序实际上不会在当前执行
 * 完成之前被替换。
 *
 */
void replace_program( string str );

/**
 * reclaim_objects - 回收任何残留对象
 *
 * 循环遍历所有已加载的对象，并释放任何它可以释放的残留对象。
 * 这可能导致根据泥巴的编码释放大量内存。对象通常在一个
 * 全局变量在多个对象中包含对其的指针时被留下残留，而该对象
 * 被销毁。此 efun 返回在变量中遇到的被销毁对象的数量。
 *
 */
int reclaim_objects( void );

/**
 * perf_counter_ns() - 以纳秒为单位提供纪元时间测量
 *
 * 返回自 1970 年 1 月 1 日午夜 (GMT) 起的纳秒数。
 *
 */
int perf_counter_ns( void );

/**
 * max_eval_cost() - 返回最大评估成本
 *
 * max_eval_cost() 返回驱动程序决定进入无限循环之前可以执行的
 * 指令数量。
 *
 */
void max_eval_cost();

/**
 * localtime() - 转换为当地时间
 *
 * localtime() 将一个时间值（由 time() 返回）转换为一个
 * 表示当地时间的值数组。过去使用 time() 获取 GMT (UTC) 中的时间，
 * 然后使用本地定义确定与 GMT 的本地偏移。这个绕行的过程
 * 不再必要。localtime() 返回秒、分钟和小时、天、月和年、
 * 星期几、一年中的天数、本地时区的名称以及泥巴与 GMT 的
 * 时差。此信息直接从操作系统检索，并提供给驱动程序，
 * 无需使用泥巴特定的配置文件。
 * 
 * localtime() 返回一个包含上述值的数组。每个值的索引在
 * localtime.h 中被象征性地定义。以下表总结了 localtime()
 * 返回的数组。
 * 
 * int        LT_SEC      分钟后的秒数 (0..59)
 * int        LT_MIN      小时后的分钟数 (0..59)
 * int        LT_HOUR     自午夜以来的小时数 (0..23)
 * int        LT_MDAY     月中的天数 (1..31)
 * int        LT_MON      从一月起的月份数 (0..11)
 * int        LT_YEAR     年份（保证 >= 1900）
 * int        LT_WDAY     自周日以来的天数 (0..6)
 * int        LT_YDAY     从 1 月 1 日起的天数 (0..365)
 * int        LT_GMTOFF   自 GMT (UTC) 的秒数
 * string     LT_ZONE     时区名称
 * int        LT_ISDST    如果当前正在观察夏令时
 *
 */
mixed *localtime( int time );

/**
 * inherits() - 确定对象是否继承给定文件
 *
 * inherits() 如果 obj 不继承文件，则返回 0；如果
 * 继承了文件的最新副本，则返回 1；如果
 * 继承了文件的旧副本，则返回 2。
 * 
 * 如果没有对象作为第二个参数传入，则此 efun 将默认为
 * this_object()。
 *
 */
int inherits( string file, object obj );

/**
 * inherit_list() - 获取对象的父对象列表
 *
 * 返回一个数组，包含 obj 继承的文件名。仅返回直接
 * 继承的文件。例如，如果 A 继承 B，B 继承 C，
 * inherit_list(A) 将返回一个数组包含 B，而不包含 C。
 * 
 * 如果没有对象被提供，此 efun 将默认为 this_object()。
 *
 */
string *inherit_list( object obj );

/**
 * function_profile() - 获取对象的函数性能分析信息
 *
 * 返回 'ob' 的函数性能分析信息，如果 'ob' 没有指定，
 * 则返回 this_object()。只有在驱动程序进行了 PROFILE_FUNCTIONS
 * 编译时，这才可用。
 *
 */
mixed *function_profile( object ob );

/**
 * function_exists()  -  查找对象中给定函数所在的文件
 * @param str 要检查的函数名称
 * @param ob 要检查的对象
 * @returns 定义函数 'str' 的对象的文件名 'ob'。
 * 返回值可以与 'file_name(ob)' 不同，如果函数是由一个继
 * 承的对象定义的。
 * 
 * 如果函数未定义，则返回 0。
 * 
 * 请注意，function_exists() 不检查阴影。
 * 
 * 如果没有对象作为第二个参数传入，则此 efun 将默认为
 * this_object()。
 *
 */
varargs string function_exists( string str, object ob );

/**
 * flush_messages - 发送所有待处理的消息给用户
 *
 * 通常，消息会被排队，然后一次性发送，以最小化所需的
 * 数据包数量。此 efun 强制所有待处理的消息立即写入。
 * 如果没有指定用户，则所有用户的消息都会被刷新。
 *
 */
int flush_messages();
int flush_messages(object user);
/**
 * find_call_out() - 查找计划调用的呼叫
 *
 * 查找计划调用的呼叫，可以通过函数名称或句柄进行查找。
 * 
 * 如果参数是一个字符串，那么找到第一个计划执行的函数 'func' 的呼叫，返回剩余的时间（秒数）。
 * 如果没有找到呼叫，则返回 -1。
 * 
 * 如果参数是一个整数，那么找到句柄为 'handle' 的呼叫，返回剩余的时间（秒数）。
 * 如果没有找到呼叫，则返回 -1。
 * 
 * 这将找到通过 call_out() 或 call_out_walltime() 调度的呼叫。
 * 
 * 如果剩余时间是分数值，则结果将是一个整数，其值将被取整向下。
 * 
 * 示例：
 * int handle = call_out("func", 10);
 * printf("Remaining time: %O\n", find_call_out(handle));
 * // 剩余时间：10
 * 
 * int handle = call_out("func", 10.75);
 * printf("Remaining time: %O\n", find_call_out(handle));
 * // 剩余时间：10
 * 
 * 此 efun 只会找到由 this_object() 初始化的呼叫。
 *
 */
int find_call_out( string func ) ;
int find_call_out( int handle ) ;

/**
 * eval_cost() - 返回剩余的评估成本
 *
 * eval_cost() 返回在驱动程序判断处于无限循环之前可以执行的指令数量。
 *
 */
int eval_cost();

/**
 * errorp() - 确定给定变量是否为错误代码
 *
 * 如果 'arg' 是一个错误代码的整数，则返回 1。
 * 
 * 最终 efuns 将被修改为返回标准错误代码，以便可以使用如下代码：
 * 
 * if (errorp(result = efun_call()))
 * printf("error = %d\n", result);
 * 
 * 将来，还将有一个 perror(result) efun 返回与特定错误整数相关的错误字符串。
 *
 */
int errorp( mixed arg );

/**
 * error - 生成运行时错误
 *
 * 当调用 error() 时，将生成一个运行时错误 'err'。当前线程的执行将中止，调试日志将记录追踪信息。
 * 'err' 本身允许最大长度为 2045 个字符，不包括最后一个可选的 '\n' 字符。
 * 在处理错误之前，将移除可选的 '\n'，并在前面添加 '*'，并在后面附加一个无条件的 '\n'。
 * @throws err
 */
void error( string err );

/**
 * deep_inherit_list() - 获取对象的祖先列表
 *
 * 返回一个数组，包含所有直接和间接继承自 obj 的对象的文件名。
 * 
 * 如果未提供对象，此 efun 将默认使用 this_object()。
 *
 */
string *deep_inherit_list( object obj );

/**
 * ctime() - 返回时间字符串
 *
 * 返回一个包含当前日期和时间的字符串，参数 'clock' 是自 1970 年以来的秒数。
 * 
 * 如果未提供参数，将使用当前时间。
 *
 */
string ctime(void| int clock );

/**
 * call_out_info() - 获取待处理的 call_out() 信息
 *
 * 获取所有待处理呼叫的信息。返回一个数组，其中数组中的每个项包含 4 个元素：对象、函数、延迟时间和可选参数。
 *
 */
mixed *call_out_info( void );

/**
 * all_previous_objects() - 返回调用当前函数的对象数组
 *
 * 返回调用当前函数的对象数组。请注意，本地函数调用不会将 previous_object() 设置为当前对象，而是保持不变。
 *
 */
object *all_previous_objects();
