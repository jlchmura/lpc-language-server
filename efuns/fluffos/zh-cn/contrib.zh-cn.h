// contrib.h

/**
 * zonetime - 返回给定时区字符串的 ctime(int) 
 *
 * 返回给定时区字符串的 ctime(int)。
 *
 */
string zonetime(string timezone, int timestamp);

/**
 * variables - 返回全局变量名称的数组
 *
 * int == 0:
 * 返回全局变量名称的数组
 * 
 * int != 0
 * 返回包含变量名称和类型的数组的数组
 * @param {object} ob - 要查询的对象
 * @param {int} flag (可选) 默认值为 0
 */
mixed *variables(object ob, int flag);

/**
 * upper_case() - 返回一个字符串，源字符串中的每个字母都被大写。
 *
 * 返回一个新字符串，其中 <text> 中的每个字符都被转换为大写。
 *
 * string text = upper_case( "I like cheese." ) ; // "I LIKE CHEESE."
 *
 */
string upper_case(string text);

/**
 * test_load - 测试一个文件是否可加载
 *
 * 测试一个文件是否可加载。如果文件可加载，将返回 1，
 * 否则返回 0。如果尝试加载的文件包含错误，
 * 将会报告这些错误，这种情况下，您可能需要将
 * 函数调用包装在 catch 语句中以获取 0 的结果。
 *
 */
int test_load( string filename );

/**
 * terminal_colour() - 返回一个被包装和缩进的字符串，其中驱动程序
 * 将字符串中的 %^KEY%^ 替换为提供的映射中 KEY 的匹配值。
 *
 * 字符串：要解析为 '%^KEY%^' 序列
 * 映射：'KEY：值' 对
 * 第一个整数：在打印的符号后换行
 * 如果整数 < 0，则用空格填充行
 * 
 * wrap = 4：
 * '12\n345'
 * wrap = -4：
 * '12 \n345 '
 * 
 * minwrap: 2
 * 
 * 第二个整数：缩进一定的空格
 * maxindent: wrap-2
 * 
 * 返回被包装和缩进的字符串，每个 '%^KEY%^' 都被替换为 KEY 的值
 * 如果未找到 '%^KEY%^' 序列，则返回原始字符串
 * （难道至少应该被包装和缩进吗？）
 *
 */
string terminal_colour(string, mapping, int | void, int | void);

/**
 * string_difference - 返回 levenshtein 差异
 *
 * 返回 levenshtein 差异
 *
 */
int string_difference(string, string);


/**
 * store_variable - 将一个值存储在对象的全局变量中
 *
 * 此 efun 将值存储在 `ob` 中的全局变量 variable_name 中。
 * 
 * `variable_name` 是全局变量的名称。
 * `value` 是要存储在全局变量中的数据。
 * `ob` 如果未指定，则默认为 this_object()。
 * 
 * 如果未指定 `ob`，则 `variable_name` 可以是继承层次结构中的任何全局变量，无论作用域如何。如果指定了 `ob`，则 `variable_name` 必须是公共作用域。
 * 
 * 这可能是一个潜在的安全隐患，因此，您可能希望重载此函数以执行安全检查。
 *
 * store_variable( "weight", 150, this_player() ) ;
 *
 */
void store_variable(string variable_name, mixed value, void|object ob);

/**
 * store_class_member
 *
 * 将 <value> 存储在 <instantiated_class> 的 <class_element>th 成员中。
 * 
 * 返回 <instantiated_class> 的更新版本。
 *
 * class person {
 * string name ;
 * int age ;
 * string city ;
 * }
 * 
 * void fun()
 * {
 * class person me = new(class person) ;
 * 
 * me->name = "Foo" ;
 * me->age = 42 ;
 * me->city = "Fooville" ;
 * 
 * write( sprintf("%O\n", me) ) ;
 * 
 * // 结果:
 * // CLASS( 3 elements
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * //  )
 * 
 * me = store_class_member( me, 1, 43 ) ;
 * 
 * write( sprintf("%O\n", me) ) ;
 * 
 * // 结果:
 * // CLASS( 3 elements
 * //   "Foo",
 * //   43,
 * //   "Fooville"
 * //  )
 * }
 *
 */
mixed store_class_member(mixed instantiated_class, int class_element, mixed value);

/**
 * shuffle
 *
 * 随机重排列给定数组的元素（改变原数组!!!）
 *
 */
mixed *shuffle(mixed *arr);

/**
 * 
 *
 * 
 *
 */

/**
 * send_nullbyte - 发送 '\0' 到交互式
 *
 * 发送 '\0' 到交互式，返回 -2 表示错误，1 表示成功
 *
 */
int send_nullbyte(object);

/**
 * roll_MdN() - 骰子掷骰生成器，您可以指定骰子的数量和每个骰子的面数，如果提供了则加上奖励。
 *
 * 掷 `sides` 面的骰子 `rolls` 次，返回所有掷骰的总和
 * 
 * 如果提供了 `bonus`，将加上奖励并返回结果。
 *
 * // 掷一个 1d4
 * roll_MdN(1, 4)
 * 
 * // 掷 2d6
 * roll_MdN(2, 6)
 * 
 * // 掷一个 1d10，并加上 15
 * roll_MdN(1, 10, 15)
 * @param {int} rolls - 骰子的数量
 * @param {int} sides - 每个骰子的面数
 * @param {int} bonus - （可选）加到掷骰上的奖励，默认为 0
 */
int roll_MdN(int rolls, int sides, int bonus);

/**
 * restore_from_string() - 类似于 restore_object()，但从字符串中恢复变量，其中字符串与 restore_object() 中的格式相同
 *
 * 使用字符串作为 restore_object 使用文件的含义
 * @param {string} str - 要恢复的字符串
 * @param {int} flag - 默认为 0
 */
void restore_from_string(string str, int flag);

/**
 * replaceable - 检查对象是否可被替换
 *
 * string *func 默认为 ({ "create", "__INIT" })，包含一个
 * 可以在检查中忽略的函数列表
 * 
 * 检查对象是否定义了任何函数（除了 create 之外）
 * 
 * 如果没有并且对象不是 simul_efun 对象且不是 ???，则返回 1
 * 其他情况下返回 0
 *
 */
int replaceable(object, void | string *func);

/**
 * repeat_string() - 重复一个字符串指定次数。
 *
 * 返回一个新的字符串
 * 
 * - repeats <= 0: ""
 * - repeats > 0 原始字符串重复 int 次或在不超过最大字符串长度的
 * 最大次数内重复
 * 
 * maxstrlen = 5:
 * repeat_string("ab", 3) = "abab"
 * 
 * maxstrlen >=6:
 * repeat_string("ab", 3) = "ababab"
 *
 */
string repeat_string(string str, int repeats);

/**
 * remove_shadow() - 从指定对象中移除所有阴影，或从另一个对象中移除
 * 指定阴影。不会销毁阴影。
 *
 * ob 默认为 this_object()
 * 如果对象被销毁或不是阴影且不是被阴影的，则返回 0
 * 否则返回 1
 * 
 * ob <- shadow1 <- shadow2
 * 
 * remove(shadow2): ob <- shadow1 shadow2
 * remove(shadow1): ob <- shadow2 shadow1
 * remove(ob): shadow1 <- shadow2 ob
 * 
 * #ifndef NO_SHADOWS
 *
 */
int remove_shadow(object ob);

/**
 * remove_interactive - 移除交互对象
 *
 * 如果参数对象是交互式并且未被销毁，则使其断开连接并失去
 * 交互状态。当操作成功时返回 1。
 * 
 * 此函数要求在选项文件中定义 PACKAGE_CONTRIB。
 *
 */
int remove_interactive(object interactive);

/**
 * remove_get_char() - 取消当前活跃的 input_to
 *
 * 取消当前活跃的 input_to
 * 设置 interactive->carryover = NULL
 * 设置 interactive->num_carry = 0
 * 
 * 如果缺少参数返回 -3
 * 如果对象被销毁或不是交互对象返回 -2
 * 如果没有 active input_to 返回 -1
 * 否则返回 1
 *
 */
int remove_get_char(object interactive);

/**
 * remove_charmode() - 切换交互对象到行模式
 *
 * 切换交互对象到行模式
 * 
 * 如果缺少参数返回 -1
 * 在出错的情况下返回 -2（对象被销毁或不是交互对象）
 * 当前 input_to 标志中的 char_mode 会被取消
 *
 */
int remove_charmode(object);

/**
 * real_time
 *
 * 返回本地服务器时间
 *
 */
int real_time();

/**
 * query_replaced_program
 *
 * 对象默认为 this_object()
 * 
 * 如果对象调用了 replace_program， 此函数返回替换的对象路径
 *
 */
string query_replaced_program(void | object);

/**
 * query_num
 *
 * 警告：仅限英语！！！
 * 
 * 将 `num` 转换为字符串表示。如果 `many` 大于 0 且 `num` 大于 `many`，则结果字符串为 "many"。
 * 
 * 任何大于 99,999 的 `num` 始终为 "many"，任何小于 0 的 `num` 也是如此。
 * @param {int} num - 要转换的数字
 * @param {int} many - （可选）默认为 0
 */
varargs string query_num(int num, int many);

/**
 * query_notify_fail
 *
 * 返回当前 notify_fail 设置（funcp 或字符串）
 * #ifndef NO_ADD_ACTION
 *
 */
mixed query_notify_fail();

/**
 * query_ip_port - 返回连接的本地端口
 *
 * 对象默认为 this_player()
 * 
 * 返回连接的本地端口， 如果对象不是交互对象则返回 0
 *
 */
int query_ip_port(void | object);

/**
 * query_charmode
 *
 * 如果缺少参数返回 -1
 * 如果出错返回 -2（对象被销毁或不是交互对象）
 * 如果交互对象处于行模式返回 0
 * 否则返回 !0（实际值取决于编译时定义）
 *
 */
int query_charmode(object);

/**
 * program_info
 *
 * 对象默认为所有对象
 * 
 * 返回的映射包含：
 * 
 * - 头部大小 : int
 * - 代码大小 : int
 * - 函数大小 : int
 * - 变量大小 : int
 * - 类大小 : int
 * - 继承大小 : int
 * - 保存类型大小 : int
 * - 总大小 : int
 *
 */
mapping program_info(void | object);

/**
 * pluralize - 返回复数形式
 *
 * 仅限英语！
 * 
 * 返回复数形式：
 * '一栋红色房子' -> '红色房子'
 * '一袋米' -> '米袋'
 *
 */
string pluralize(string);


/**
 * num_classes - 返回对象使用的类的数量
 *
 * 返回对象使用的类的数量
 *
 */
int num_classes(object);

/**
 * network_stats
 *
 * 返回映射：
 * 
 * - 总接收数据包数量 : int
 * - 总接收数据量 : int
 * - 总发送数据包数量 : int
 * - 总发送数据量 : int
 * 
 * - 端口 X 的接收数据包数量 : int
 * - 端口 X 的接收数据量 : int
 * - 端口 X 的发送数据包数量 : int
 * - 端口 X 的发送数据量 : int
 * 
 * #ifdef PACKAGE_SOCKETS:
 * 
 * - 套接字的接收数据包数量 : int
 * - 套接字的接收数据量 : int
 * - 套接字的发送数据包数量 : int
 * - 套接字的发送数据量 : int
 *
 */
mapping network_stats();

/**
 * named_livings - 返回命名的生物
 *
 * 返回所有那些具有
 * set_living_name 和 enable_command 被调用的生物 [请参见 efun::livings()] #ifndef NO_ADD_ACTION
 *
 */
object *named_livings( void );

/**
 * min() - 在数组中搜索最小值
 *
 * 搜索 (int|float|string) 数组中的最小值。如果 flag 为 0 或
 * 被省略，则返回最小值，否则返回其首次出现的索引。
 *
 */
mixed min(mixed * arr);
mixed min(mixed * arr, int flag);

/**
 * memory_summary()
 *
 * 返回映射：
 * ([
 * "prog1" : ([ 
 * "var1" : mem_usage,
 * ...
 * ]),
 * ...
 * ])
 *
 */
mapping memory_summary();

/**
 * max() - 在数组中搜索最大值
 *
 * 搜索 (int|float|string) 数组中的最大值。如果 flag 为 0 或
 * 被省略，则返回最大值，否则返回其首次出现的索引。
 *
 */
mixed max(mixed * arr); 
mixed max(mixed * arr, int flag);

/**
 * is_daylight_savings_time
 *
 * 如果给定时区的给定时间处于夏令时区域，则返回 1
 * 如果不在，则返回 0
 * 出现错误时返回 -1
 *
 */
int is_daylight_savings_time(string, int);

/**
 * heart_beats - 返回所有启用心跳的对象的数组
 *
 * 返回所有启用心跳的对象的数组
 *
 */
object *heart_beats( void );

/**
 * get_garbage() - 获取所有没有环境或库存且不是影子对象的克隆。
 *
 * 返回一个数组，包含所有（最多**MAX_ARRAY_SIZE**）那些克隆的(!)对象，这些对象
 * 没有环境或库存，并且不是影子另一个对象，也没有设置 object->super
 *
 */
object *get_garbage();

/**
 * functions() - 返回传入对象中所有函数的名称字符串数组或混合数组。
 *
 * 返回一个包含在<ob>中找到的函数名称的字符串数组。返回的函数将包括所有函数，无论是公共的、
 * 保护的还是私有的。<flag>参数默认为零。
 * 
 * Flag: 0
 * 返回: 包含函数名称的字符串数组，包括所有继承的函数。
 * ({ "func1", "func2", "func3", "func4", ... })
 * 
 * Flag: 1
 * 返回: 一个包含附加信息的混合数组的二维数组，关于每个函数，包括所有继承的函数。
 * 
 * ({
 * ({
 * "func1",    // 函数名
 * 2,          // 函数中的参数数量
 * "int",      // 函数的返回类型
 * "object",   // 第一个参数
 * "string *", // 第二个参数
 * }),
 * ...
 * })
 * 
 * Flag: 2
 * 类似于Flag 0，但排除继承的函数。
 * 
 * Flag: 3
 * 类似于Flag 1，但排除继承的函数。
 *
 * @param {object} ob - 要查询的对象
 * @param {int} flag (可选) 默认为0
 */
mixed *functions(object ob, int flag);

/**
 * function_owner - 返回定义给定函数的对象
 *
 * 返回定义给定函数的对象。
 *
 */
object function_owner(function);

/**
 * file_length - 返回文件的行数
 *
 * 返回
 * 
 * - 行数
 * - -1 在出现错误时（例如权限不足）
 * - -2 如果文件是目录
 *
 */
int file_length(string);

/**
 * fetch_variable - 获取存储在对象全局变量中的值
 *
 * 此 efun 返回存储在 ob 中的全局变量 `variable_name` 的值。
 * 
 * `variable_name` 是全局变量的名称。
 * `ob` 默认为 this_object()，如果未指定。
 * 
 * 如果未指定 `ob`，则 `variable_name` 可以是继承层次结构中的任何全局变量，无论其作用域如何。
 * 如果指定了 `ob`，则 `variable_name` 必须是公共作用域。
 * 
 * 这可能存在安全隐患，因此，您可能希望重载此函数以执行安全检查。
 *
 * int weight = fetch_variable( "weight", this_player() ) ;
 * printf("%d\n", weight") ;
 * 
 * // 结果: 150
 *
 */
mixed fetch_variable(string variable_name, void|object ob);

/**
 * fetch_class_member() - 返回已实例化类的指定索引成员的值。
 *
 * 给定一个<instantiated_class>，返回第<index>个成员的值。
 * 当你有一个没有数据成员标签的匿名类时，这尤其有用。
 *
 * mixed me = assemble_class( ({ "Foo", 42, "Fooville" }) ) ;
 * int age ;
 * string name, city ;
 * 
 * name = fetch_class_member( me, 0 ) ;
 * age = fetch_class_member( me, 1 ) ;
 * city = fetch_class_member( me, 2 ) ;
 *
 */
mixed fetch_class_member( mixed instantiated_class, int index );

/**
 * event() - 使用指定参数在其他对象中调用 event_* 。类似于 call_other，但没有返回类型。
 *
 * 在目标的 "event_" + event_name 中调用。 "event_" + event_name 必须是一个公共函数。
 * 
 * 目标可以是一个单一对象或对象数组。
 * 
 * 如果目标是一个单一对象，事件 efun 将首先调用该对象中的事件函数，然后调用
 * 该对象的所有 inventory 中每个对象的事件函数。
 * 
 * 如果目标是一个对象数组，事件 efun 将调用所有指定对象中的事件函数。
 * 与单一目标版本不同，它不会级联到每个对象的库存中。
 * 
 * efun 会将调用对象作为第一个参数，并传递所有指定的参数。
 *
 * // 在一个房间中
 * 
 * // 将在房间上调用 event_heal_up，然后对房间中的每个对象
 * event( this_object(), "heal_up", 50, 50 ) ;
 * 
 * // 将在 users() efun 的结果中调用 event_heal_up
 * event( users(), "heal_up", 25, 25 ) ;
 * 
 * // 在玩家对象中
 * 
 * // 为了利用这个事件，写一个 event_heal_up 在玩家
 * // 对象中以接收调用
 * void event_heal_up(object source, int health, int mana)
 * {
 * message("heal", sprintf("你被 %O 治愈了 %d 点生命值和 %d 点魔法值。\n", health, mana, source), this_object()) ;
 * }
 *
 */
void event(object | object * target, string event_name, mixed *args...);

/**
 * element_of() - 返回给定数组的随机元素
 *
 * 返回给定数组的随机元素
 *
 */
mixed element_of(mixed *arr);

/**
 * disassemble_class() - 给定一个已实例化的类，返回一个包含类的每个成员值的 mixed* 数组。
 *
 * 给定一个<instantiated_class>，返回一个混合数组，其中包含所有成员的值。
 *
 * class person {
 * string name ;
 * int age ;
 * string city ;
 * }
 * 
 * void fun()
 * {
 * mixed *result ;
 * class person me = new(class person);
 * 
 * me->name = "Foo" ;
 * me->age = 42 ;
 * me->city = "Fooville" ;
 * 
 * result = disassemble_class( me ) ;
 * 
 * write( sprintf("%O\n", result ) ) ;
 * 
 * // ({ /* sizeof() == 3 *\/
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * // })
 * }
 *
 */
mixed *disassemble_class( mixed instantiated_class );

/**
 * debug_message() - 记录调试信息
 *
 * 在驱动程序的 <stderr> 文件描述符上打印给定消息，并将其附加到调试日志中。
 *
 */
void debug_message(string msg);

/**
 * mixed copy(mixed arg) - 返回数组、缓冲区、类或映射的深拷贝
 *
 * arg 可能是以下之一：
 * 
 * - 数组
 * - 缓冲区（如果编译进驱动程序）
 * - 类
 * - 映射
 * 
 * 返回深拷贝
 * 
 * 当你希望有通过引用传递的数据，但又不想改变原始数据时，这特别有用。
 *
 */
mixed copy(mixed arg);

/**
 * compressedp() - 返回交互连接是否使用telopt压缩
 *
 * 返回交互连接是否使用telopt压缩
 * #ifdef PACKAGE_COMPRESS
 *
 */
int compressedp(object ob);

/**
 * classes() - 返回对象使用的类的名称
 *
 * 返回一个字符串数组，包含 <ob> 使用的类的名称。
 * 
 * <verbose> 参数是可选的，默认值为 0。
 * 
 * 如果 <verbose> 非零，则将返回额外的信息。
 *
 * string *classes_used = classes( ob ) ;
 * // ({ "class_name", }) ;
 * 
 * mixed *classes_used = classes( ob, 1 ) ;
 * 
 * // ({
 * //     ({
 * //         "class_name",
 * //         ({
 * //             "member_name",
 * //             "type"
 * //         }),
 * //         ...
 * //     }),
 * //     ...
 * // })
 *
 */
mixed *classes(object ob, int verbose);

/**
 * base_name - 返回不带对象ID (OID) 的基本名称
 *
 * 在第一个版本中，返回 <text> 中的段落，直到但不包括第一个出现的 #。
 * 
 * 与第一个版本类似，但首先对 <ob> 执行 file_name。
 * 
 * 与第二个版本类似，但对象是 this_object()。
 *
 * string path = base_name( "/std/object#123" ) ;  // "/std/object"
 * 
 * object ob = new("/std/object) ;
 * string path = base_name( ob ) ;                 // "/std/object"
 * 
 * // 在 /std/object 中
 * string path = base_name() ;                     // "/std/object"
 *
 */
string base_name(string text);
string base_name(object ob);
string base_name();

/**
 * assemble_class() - 提供一个数组，返回由该数组成员组成的类。
 *
 * 接收一个 <elements> 数组并返回一个实例化的类。
 *
 * mixed *elements = ({ "Foo", 42, "Fooville" }) ;
 * mixed cl = assemble_class( elements ) ;
 * 
 * write( sprintf( "%O\n", cl ) ) ;
 * 
 * // CLASS( 3 elements
 * //   "Foo",
 * //   42,
 * //   "Fooville"
 * //  )
 *
 */
mixed assemble_class( mixed *elements );

/**
 * abs() - 返回一个数的绝对值
 *
 * 返回提供的 <number> 的绝对值。
 *
 * int value = abs( 10 );      // 10
 * int value = abs( -10 );     // 10
 * float value = abs( 3.14 );  // 3.140000
 * float value = abs( -3.14 ); // 3.140000
 *
 */
mixed abs( int | float number );
