// interactive.h

/**
 * write() - 发送消息给当前玩家
 *
 * 将消息 'str' 发送给当前玩家。 'str' 也可以是一个数字，
 * 将被转换为字符串。
 * 
 * 此 efun 不会调用 receive_message() 应用。因此如果希望它被
 * 该应用捕获，您可能需要覆盖此 efun。
 *
 */
void write( mixed str );

/**
 * users() - 返回包含所有交互玩家的对象数组
 *
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER*} 一个对象数组，包含所有交互玩家。
 *
 */
object *users( void );

/**
 * userp() - 确定给定对象是否曾经是交互式的
 *
 * @returns 1 如果参数曾经是交互式的。
 *
 */
int userp(object ob);

/**
 * this_user - 当前交互玩家对象
 *
 * 返回导致调用函数被调用的玩家对象。
 * 
 * 此 efun 是 `this_player(0)` 的别名，请参阅 this_player(3) 的文档。
 *
 * @param {int} flag - 如果非零，返回交互玩家对象。默认为 0
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - 交互玩家对象
 */
varargs object this_user(int flag);


/**
 * this_player - 当前玩家对象
 *
 * 返回导致调用函数被调用的玩家对象。注意，即使在玩家对象内
 * 调用 this_player() 可能返回与 this_object() 不同的值。
 * 如果以 this_player(1) 调用，则返回的值将是导致调用函数
 * 被调用的交互对象。this_player(1) 在某些情况下可能返回与
 * this_player() 不同的值（例如，当 admin 使用 command() 强制
 * 玩家执行某个命令时）。
 * 
 * `this_user` 和 `this_interactive` 是 `this_player` 的别名，具有
 * 不同的默认标志。
 *
 * @param {int} flag - 如果非零，返回交互玩家对象。默认为 0
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - 玩家对象
 */
varargs object this_player( int flag );

/**
 * this_interactive - 当前交互玩家对象
 *
 * 返回导致调用函数被调用的玩家对象。即使由于
 * enable_commands() 或 command() 后来发生了变化，这仍然返回
 * this_player() 最初的值。
 * 
 * 此 efun 是 `this_player(1)` 的别名，请参阅 this_player(3) 的文档。
 *
 * @param {int} flag - 如果非零，返回交互玩家对象。默认为 1
 */
varargs object this_interactive( int flag );

/**
 * telnet_nop() - 发送一个 TELNET NOP 消息
 *
 * 如果用户在 telnet 下，则发送一个 TELNET_IAC TELNET_NOP
 * 序列，方便保持连接存活。
 *
 */
void telnet_nop();

/**
 * telnet_msp_oob() - 发送一个 OOB MSP 消息
 *
 * 如果用户在 telnet 下，则发送一个 IAC SB TELOPT_MSP
 * 消息 IAC SE 序列，具体文档见 
 * https://wiki.mudlet.org/w/Manual:Supported_Protocols#MSP
 *
 */
void telnet_msp_oob(string);

/**
 * telnet_ga() - 发送一个 TELNET GA 消息
 *
 * 如果用户在 telnet 下，则发送一个 TELNET_IAC TELNET_GA
 * 序列，适用于那些不以换行符结束的提示。
 *
 */
void telnet_ga();

/**
 * snoop() - 监听一个交互用户
 *
 * 当两个参数都被使用时，开始由 'snooper' 对 'snoopee' 的监听。
 * 如果省略第二个参数，则关闭 'snoopee' 的所有监听。
 * snoop() 的安全性通常由一个 simul_efun 控制。
 * 在两个参数的情况下，snoop() 成功返回 'snoopee'，而在
 * 单个参数的情况下返回 'snooper'。返回 0 表示失败。
 *
 */
varargs object snoop( object snooper, object snoopee );

/**
 * shout() - 向所有生物对象发送消息
 *
 * 将字符串 'str' 发送给所有生物对象，但不包括 this_player()。
 * 
 * 此 efun 不会调用 receive_message() 应用，因此如果希望它被
 * 该应用捕获，您可能需要覆盖此 efun。
 *
 */
void shout( string str );

/**
 * set_this_user - 当前交互玩家对象
 *
 * 此 efun 是 `set_this_player(who)` 的别名，请参阅
 * set_this_player(3) 的文档。
 *
 */
void set_this_user( object who );
void set_this_player( object who );

/**
 * set_this_player - 更改当前玩家对象
 *
 * set_this_player() 将 'who' 设置为 this_player() 的新值。这个 efun
 * 仅在定义了 __NO_ADD_ACTION__ 时可用，因为在 __NO_ADD_ACTION__
 * 下，命令的解析和分派是 mudlib 的责任。
 * 
 * 'who' 也可以为零，此时 this_player() 被设置为零。
 *
 */
void set_this_player( object who );
void set_this_user( object who );

/**
 * 
 *
 * 为当前玩家设置输出/输入编码。
 * 
 * 如果给定的编码名称不可用，将抛出错误。可用的编码名称
 * 取决于您的 ICU 版本，通常，中文使用 GBK。
 * 
 * 如果没有参数，重置玩家为无编码，这意味着 UTF-8。
 * 
 * 返回来自 ICU 的规范编码名称，它将与 query_encoding() 返回的相同。
 *
 */
varargs string set_encoding( string encoding );

/**
 * send_gmcp() - 发送 GMCP 消息
 *
 * 为这个对象发送 GMCP '消息' 到用户的客户端。
 * 
 * 有关有效负载格式的信息，请参见：http://www.gammon.com.au/gmcp，
 * https://github.com/keneanung/GMCPAdditions
 * 
 * 注意：send_gmcp() 应仅在用户对象内调用。
 *
 */
void send_gmcp( string message );

/**
 * say() - 向同一环境中的所有用户发送消息
 *
 * 向发起者的环境、同一环境中的所有物品以及发起者内部的所有物品发送消息。
 * 发起者是 this_player()，除非 this_player() == 0，此时发起者是 this_object()。
 * 
 * 第二个参数是可选的。如果指定了第二个参数 'obj'，则消息会发送给
 * 所有对象，除了 'obj'。如果 'obj' 不是对象，而是对象数组，那么
 * 所有这些对象都将被排除在接收消息之外。
 * 
 * 此 efun 不会调用 receive_message() 应用，所以如果您希望它能被这个应用捕获，您可能希望重写此 efun。
 *
 */
varargs void say( string str, object obj );

/**
 * resolve() - 将互联网地址解析为域名，或反之亦然
 *
 * resolve() 解析 'address'，它应该是 "127.0.0.1" 形式的互联网地址
 * 或域名，转换为其域名或互联网地址。当解析完成后，'callback_func'
 * 将在当前对象中被调用。回调的格式为：
 * 
 * void callback(string address, string resolved, int key);
 * 
 * 'key' 将与调用 resolve() 返回的数字匹配。'address' 将是主机的
 * 域名，而 'resolved' 是点分十进制的 IP 地址。如果查找失败，未知值将为 0。
 *
 */
int resolve( string address, string callback_func );
int resolve( string address, closure callback_func );

/**
 * remove_action - 取消绑定一个命令动词到本地函数
 *
 * remove_action(3) 取消将动词 cmd 从对象函数 fun 解绑。
 * 基本上，remove_action() 是 add_action(3) 和 add_verb(3) 的补充。
 * 当不再需要一个动词时，可以用 remove_action() 解绑。
 *
 */
int remove_action( string fun, string cmd );

/**
 * receive() - 向当前对象显示消息
 *
 * 此 efun 是驱动程序中 add_message() 函数的接口。
 * 其目的是向当前对象显示消息。如果当前对象是交互式的，则返回 1，
 * 否则返回 0。通常，receive() 是从 catch_tell(4) 或 receive_message(4)
 * 中调用的。
 *
 */
int receive( string message );

/**
 * query_snooping() - 返回一个对象正在窃听的对象
 *
 * 如果 'ob'（一个交互式对象）正在窃听另一个交互式对象，
 * 则返回被窃听的对象。否则，返回 0。
 *
 */
object query_snooping( object ob );

/**
 * query_snoop() - 返回一个交互式对象的窃听者
 *
 * 如果 'ob'（一个交互式对象）正在被另一个交互式对象窃听，
 * 则返回窃听该对象的对象。否则，返回 0。
 *
 */
object query_snoop( object ob );

/**
 * query_ip_number() - 返回玩家对象的 IP 地址
 *
 * 返回玩家 'ob' 的 IP 地址（点分十进制形式或 IPv6 形式）。
 *
 */
varargs string query_ip_number( object ob );

/**
 * query_ip_name() - 返回给定玩家对象的 IP 名称。
 *
 * 返回玩家 'ob' 的 IP 的 DNS PTR 记录。在新连接到服务器时，
 * 将触发异步 DNS 反向查找。
 * 
 * 在查找完成之前，返回的结果与 'query_ip_number(3)' 相同。
 * 
 * 查找完成后，如果查找成功，该函数将返回此对象 IP 的 DNS PTR 值。
 * 如果查找失败（由于网络问题、未为该 IP 配置 PTR 记录等），
 * 此函数将继续返回与 'query_ip_number(3)' 相同的结果。
 * 
 * 该结果被缓存，此函数没有开销。
 *
 */
string query_ip_name( object ob );

/**
 * query_idle()  -  查询一个交互式玩家闲置了多少秒
 *
 * 查询玩家对象 (ob) 已闲置的秒数。
 *
 */
int query_idle( object ob );

/**
 * query_host_name() - 返回主机名
 *
 * query_host_name() 返回主机的名称。
 *
 */
string query_host_name( void );

/**
 * 
 *
 * 获取当前玩家的输入/输出编码。
 * 
 * 注意：您获得的名称是 ICU 内部名称，这将与 set_encoding() 返回的结果相同，但可能是您传递的名称，也可能不是，但它们指的是相同的编码。
 *
 */
string query_encoding();

/**
 * printf, sprintf - 格式化输出转换
 *
 * 这是 LPC 的 (s)printf() 的实现，具有一些扩展
 * 实现者：Lynscar (Sean A Reith)。
 * 
 * 此版本支持以下修饰符：
 * 
 * " "     用空格填充正整数。
 * 
 * "+"     用加号填充正整数。
 * 
 * "-"     在字段大小内左对齐。
 * 注意：标准 (s)printf() 默认右对齐，但在主要基于字符串的语言中这是不自然的，但为了“兼容性”保留了这一点。
 * 
 * "|"     在字段大小内居中。
 * 
 * "="     如果字符串大于字段大小，则为列模式。这对于字符串是有意义的，所有其他类型会忽略此设置。列会自动换行。
 * 
 * "#"     表格模式，打印以 '\n' 分隔的 'words' 列表，在字段大小内。仅对字符串有效。
 * 
 * n       指定字段大小，星号 '*' 表示使用相应的参数作为字段大小。如果 n 前面加了零，则填充为零，其他情况下填充为空格（或指定的填充字符串）。
 * 
 * "."n    精度为 n，简单字符串在此之后截断（如果精度大于字段大小，则字段大小 = 精度），表格使用精度来指定列数（如果没有指定精度，则表格会计算最佳适配），所有其他类型都会忽略此设置。
 * 
 * ":"n    n 同时指定字段大小和精度，如果 n 前面加了零，则填充为零而不是空格。
 * 
 * "@"     参数是一个数组。相应的格式信息（去掉 "@"）应用于数组的每个元素。
 * 
 * "'X'"   单引号之间的字符用于填充到字段大小（默认为空格）（如果同时指定了零（在字段大小前）和填充字符串，则第二个指定的优先）。 注意：要在填充字符串中包含 "'"，必须使用 "\'"（因为反斜杠必须在解释器中转义），同样，要包括 "\" 需要 "\\"。
 * 
 * 下面是可能的类型说明符。
 * 
 * %       在这种情况下，不解释任何参数，并插入一个 "%"，并且所有修饰符都会被忽略。
 * 
 * O       参数是 LPC 数据类型。
 * 
 * s       参数是字符串。
 * 
 * d, i    整数参数以十进制形式打印。
 * 
 * c       整数参数以字符形式打印。
 * 
 * o       整数参数以八进制形式打印。
 * 
 * x       整数参数以十六进制形式打印。
 * 
 * X       整数参数以大写字母 A-F 的十六进制形式打印。
 * 
 * f       浮点数
 *
 * 基本用法：
 * printf("%s is %i", "X", 1)    =   "X is 1"
 * 
 * 对齐:
 * printf("%-20s", "left")       =   "left                "
 * printf("%20|s", "center")     =   "       center       "
 * printf("%20s", "right")       =   "               right"
 * printf("%-20'-'s", "left")    =   "left----------------"
 * printf("%20'-'|s", "center")  =   "-------center-------"
 * printf("%20'-'s", "right")    =   "---------------right"
 * 
 * 数字:
 * printf("%.2f", 1.2345)        =   "1.23"
 * printf("%10.2f", 1.2345)      =   "      1.23"
 * printf("%10.6f", 0.123)       =   "  0.123000"
 * 
 * 动态字段大小:
 * printf("%-*s", 10, "ten")     =   "ten       "
 * printf("%|*s", 20, "twenty")  =   "       twenty       "
 * printf("%*s", 30, "thirty")   =   "                        thirty"
 *
 */
void printf( string format... );
string sprintf( string format... );

/**
 * int notify_fail( string | function str );
 *
 * 将 'str' 存储为错误消息，以便在从通过 add_action() 设置的动作中返回 0 时返回，而不是默认消息 'What?'。该消息将在返回 0 时显示。 这是一种显示错误消息的首选方式，因为它允许其他对象有机会响应相同的动词（命令）。 不要使用 write() 显示错误消息，因为这将要求您返回 1（除非您想看到 write() 的结果以及 'What?' 消息）。 但是，如果您确实返回 1，则没有其他对象将有机会响应用户命令。
 * 
 * 如果传递的是函数而不是字符串，则调用该函数而不是打印消息。如果函数返回一个字符串，则该字符串将用作失败消息。此外，this_player() 被正确设置，因此可以使用 write()。
 * 
 * 如果多次调用 "notify_fail()"，则只有最后一次调用有效。
 * 
 * 这个函数的理念是允许比 'What?' 更好的错误消息。
 *
 */
int notify_fail( string | function str );

/**
 * message - 向“生物”对象发送消息
 *
 * message() 在目标列表中的所有对象中调用 apply receive_message(mixed type, string message)，排除在排除列表中的对象。 这为对象提供了消息，使它们能够根据接收到的消息类型采取适当的行动。
 * 
 * 消息类型可用于过滤、格式化、调整等。例如 'combat'，'shout'，'emergency'，'system' 等等。
 * 
 * 消息是一个包含要发送的文本的字符串。
 * 
 * 目标是接收消息的对象列表。 这可以是单个对象字符串或对象指针，或可能是数组。如果目标是非生物，则其环境中的所有对象都将接收消息。
 * 
 * 排除是一个不应接收该消息的对象列表。 这可以是一个对象或对象数组。
 *
 * message("say", "You say: Hello!", this_player());
 * message("say", this_player()->query_cap_name() + " says: Hello!", environment(this_player()), ({ this_player() }));
 *
 */
void message( mixed type, string message, mixed target, mixed exclude );

/**
 * interactive() - 检测给定对象是否为互动对象
 *
 * 如果'ob'是一个互动玩家，返回非零值。 如果玩家已经链接死亡，则返回0。
 *
 */
varargs int interactive( object ob );

/**
 * input_to()  - 使下一行输入发送到指定的函数
 *
 * 使用户的下一行输入作为参数发送到本地函数'fun'。输入行不会被驱动解析。
 * 
 * 注意，input_to是非阻塞的，这意味着调用input_to的对象不会暂停等待输入。
 * 相反，该对象将继续执行input_to之后的任何语句。指定的函数'fun'不会在用户输入
 * 收集之前被调用。
 * 
 * 如果在同一执行中多次调用“input_to()”，只有第一次调用有效。
 * 
 * 如果可选参数'flag'非零，则玩家提供的行不会被回显，并且在被监听时不可见
 * （这对于收集密码很有用）。
 * 
 * 函数'fun'将以用户输入作为其第一个参数（字符串）被调用。 任何额外的参数
 * 传递给input_to的参数将作为随用户输入后的参数传递给'fun'。
 *
 */
varargs void input_to(string | function fun, mixed flag, mixed args... );

/**
 * in_input() - 确定玩家是否正在输入到input_to中
 *
 * 如果对象当前正在输入到input_to或get_char中，则返回1。
 *
 * @param {object} ob - 要检查的对象，默认为F_THIS_OBJECT
 */
int in_input( object ob );

/**
 * in_edit() - 确定玩家是否在编辑器中
 *
 * 如果给定对象在编辑器中，则返回正在编辑的文件，否则返回0。
 *
 * @param {object} ob - 要检查的对象，默认为F_THIS_OBJECT
 */
varargs string in_edit( object ob );

/**
 * has_zmp
 *
 * 如果互动用户在其客户端启用了ZMP协议，则返回非零值。 如果用户未启用，则返回0。
 *
 */
int has_zmp(object user);

/**
 * has_mxp
 *
 * 如果互动用户在其客户端启用了MXP协议，则返回非零值。 如果用户未启用，则返回0。
 *
 */
int has_mxp(object user);

/**
 * has_gmcp() - 返回给定互动用户的客户端是否启用了GMCP协议
 *
 * 如果互动用户在其客户端启用了GMCP协议，则此函数将返回1，否则返回0。
 * 
 * 注意：
 * FluffOS要求在运行时配置中设置以下选项以支持GMCP协议。
 *
 */
int has_gmcp( object user );

/**
 * get_char  - 使输入的下一个字符发送到指定函数
 *
 * 使用户输入的下一个字符作为参数发送到函数'fun'。输入字符不会被驱动解析。
 * 
 * 注意，get_char是非阻塞的，这意味着调用get_char的对象不会暂停等待输入。
 * 相反，该对象将继续执行get_char之后的任何语句。指定的函数'fun'不会在用户输入
 * 收集之前被调用。
 * 
 * 如果在同一执行中多次调用“get_char()”，只有第一次调用有效。
 * 
 * 如果可选参数'flag'非零，则玩家提供的字符不会被回显，并且在被监听时不可见
 * （这对于收集密码很有用）。
 * 
 * 函数'fun'将以用户输入作为其第一个参数（字符串）被调用。 任何额外的参数
 * 传递给get_char的参数将作为随用户输入后的参数传递给'fun'。
 *
 */
varargs void get_char( string | function fun, int flag... );

/**
 * find_player() - 按名称查找玩家
 *
 * 类似于find_living()，但仅搜索那些互动的对象或曾经互动的对象。
 * @returns {__LPC_CONFIG_LIBFILES_PLAYER} - 玩家对象
 */
object find_player( string str );

/**
 * exec()  - 将玩家（互动）连接从一个对象切换到另一个对象
 *
 * 此efun允许将与给定对象的互动链接迁移到另一个对象。
 * 也就是说，在成功的exec(to, from)调用之后，interactive(to)将返回1，
 * interactive(from)将返回0。控制'from'的玩家将在exec()调用后开始控制'to'。
 * 注意这是一个强大的函数，其使用必须受到限制，如果你希望安全地进行mud。
 * 限制exec()使用的正确方法是创建一个同名的simul_efun，然
 * 后使用valid_override(4)限制simul_efun重载的使用（即efun::exec()）。
 * exec()函数如果切换成功，则返回1（否则返回0）。
 *
 */
int exec( object to, object from );


/**
 * enable_commands() - 允许对象使用“玩家”命令
 *
 * enable_commands() 将 this_object() 标记为一个活对象，并允许它
 * 使用 add_action() 添加的命令（通过使用 command()）。当
 * enable_commands() 被调用时，驱动程序还会寻找本地功能
 * catch_tell()，如果找到了，每次向该对象发送消息（通过 say() 例如）时都会调用它。
 * 
 * 自 FluffOS 3.0-alpha7 起：此函数现在接受 int，默认为 0。
 * 这与旧形式的含义相同，仅仅是重新启用命令，但并没有
 * 设置动作。（它应该在之前调用 disable_commands() 时被清除）
 * 
 * 当 setup_actions > 0 时，驱动程序将重新设置所有动作，
 * 通过在其环境、兄弟对象和库存对象上调用 init()（按此顺序）。
 * @since 3.0-alpha7.1
 */
void enable_commands( int setup_actions = 0 );

/**
 * ed() - 编辑一个文件
 *
 * 这个 efun 仅在 __OLD_ED__ 被定义时可用。
 * 
 * 这是一个有趣的函数。它将启动一个本地编辑器，编辑一个可选
 * 文件。这个编辑器几乎兼容 UNIX ed。当在编辑器中时，输入 'h' 获取帮助。
 * 
 * <write_fn> 函数允许 mudlib 处理文件锁和修改文件的管理日志。
 * 当编辑器写入一个文件时，驱动程序将调用 <write_fn> 函数两次。
 * 第一次，函数在写入发生之前被调用 -- <flag> 将为 0。
 * 如果函数返回 TRUE，写入将继续；否则将中止。第二次，
 * 函数在写入完成后被调用 -- <flag> 将非零。这个回调
 * 函数的形式应该是：
 * 
 * int write_fn(string fname, int flag)
 * 
 * 当编辑器退出时，驱动程序将回调 <exit_fn> 函数。
 * 此函数允许 mudlib 进行清理。这个回调
 * 函数的形式是：
 * 
 * void exit_fn()
 * 
 * 可选的 <restricted> 标志限制编辑器的能力，例如插入文件和使用
 * 不同文件名进行保存。
 *
 */
varargs void ed( string file, string exit_fn, int restricted );
varargs void ed( string file, string write_fn, string exit_fn, int restricted );

/**
 * disable_wizard() - 移除对象的巫师特权
 *
 * enable_wizard() 的相反操作。禁用当前对象的巫师特权。
 *
 */
void disable_wizard( void );

/**
 * disable_commands() - 将活对象变为非活对象
 *
 * 将活对象变为非活对象，即 add_actions 无效，
 * livingp 返回 false，并且如果对象是交互式的，禁止用户输入
 * 其他命令，除了用于 input_to 的命令。disable_commands
 * 始终返回 0。
 * 
 * 调用 disable_commands() 还会清除由其他对象之前添加的
 * 所有动作，它还会移除由该对象定义的动作。
 *
 */
int disable_commands( void );

/**
 * commands() - 返回一些有关用户可以执行的动作的信息
 *
 * 返回一个数组，数组中包含 4 项描述可用于 this_object() 的动作。
 * 第一个项目是命令本身（如通过 add_action() 传递）。
 * 第二个是标志集（作为 add_action 的第三个参数传递，通常默认为 0）。
 * 第三个是定义动作的对象。第四个是要调用的函数（“<function>”如果是函数指针）。
 *
 */
mixed *commands( void );

/**
 * command() - 执行一个命令，如同该对象给出
 *
 * 执行 'str' 对象 'ob' 的命令，如果省略 'ob'，则对 this_object()。
 * 请注意，第二个参数的可用性由本地管理员决定，通常情况下不可用，
 * 这时会导致错误。失败时返回 0，否则返回一个数字值，
 * 这是 LPC "评估成本" 的命令。更大的数字意味着更高的成本，
 * 但整个规模是主观的和不可靠的。
 *
 */
varargs int command( string str, object ob );

/**
 * add_action() - 将命令动词绑定到本地函数
 *
 * 设置一个本地函数 <fun>，当用户输入与命令 <cmd> 匹配时调用。
 * 由玩家命令调用的函数将以字符串作为参数。它必须返回 0，
 * 如果这是错误的命令，否则返回 1。
 * 
 * 如果第二个参数是一个数组，则数组中的所有命令将调用第二个函数。
 * 可以通过 query_verb() 找出哪个命令调用了该函数。
 * 
 * 如果这是错误的命令，解析器将继续查找另一个命令，
 * 直到找到一个返回 true 或给出错误信息给玩家。
 * 
 * 通常 add_action() 仅在 init() 例程中调用。定义命令的对象必须在玩家面前，
 * 可以是玩家，或者被玩家携带，或者是玩家周围的房间，或
 * 者是与玩家在同一个房间中的对象。
 * 
 * 如果参数 <flag> 为 1，则仅需要命令的前导字符匹配动词 <cmd>，
 * 并且完整动词由 query_verb() 返回。如果参数 <flag> 为 2，
 * 则再次仅需要前导字符匹配，但 query_verb() 只将返回
 * <cmd> 之后的字符。
 *
 */
void add_action( string | function fun, string | string * cmd);
void add_action( string | function fun, string | string * cmd, int flag);


