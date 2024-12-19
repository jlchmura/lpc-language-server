// mudlib.h

/**
 * wizardp()  - 确定给定对象是否已执行 enable_wizard()
 *
 * 如果参数已经执行了 enable_wizard()，返回 1。
 *
 */
int wizardp( object );

/**
 * seteuid() - 设置对象的有效用户 ID (euid)
 *
 * 将有效 UID 设置为 'str'。 master.c 中的 valid_seteuid() 控制可以
 * 将对象的 euid 设置为哪些值。
 * 
 * 当该值为 0 时，当前对象的 uid 可以通过 export_uid() 改变，仅此而已。
 * 
 * 但是当值为 0 时，该对象无法加载或克隆其他对象。
 *
 */
int seteuid( string str );

/**
 * set_privs() - 设置对象的权限字符串
 *
 * 将 'ob' 的权限字符串设置为 'privs'。
 * 
 * 该 efun 仅在编译时定义了 PRIVS 时可用。
 *
 */
void set_privs( object ob, string privs );

/**
 * set_living_name() - 为生活对象设置名字
 *
 * 在一个活着的对象上设置一个生活名字。完成此操作后，可以通过 "find_living()" 找到该对象。
 *
 */
void set_living_name( string name );

/**
 * set_light() - 更新或查询对象的光照等级
 *
 * 传递 <light_level_adjustment> 为 0 查询对象的当前光照等级。正数将增加光照等级，而负数将减少光照等级。
 *
 */
int set_light( int light_level_adjustment );

/**
 * set_author - 设置与对象关联的作者。
 *
 * 每个对象都有一个作者和一个域用于跟踪作者和域的统计信息。域只能在
 * master 对象的 domain_file(4) 函数中设置，然而作者则不同。作者可以通过
 * author_file(4) 在 master 对象中初始化为某个默认值，也可以使用 set_author efun 更改。
 * 
 * set_author 更改调用该函数的对象的作者。该作者将获得所有未来该对象
 * 影响 mudlib 统计的操作的信用。注意，这可能会导致 "objects" 和 "array_size"
 * 类别中出现一些奇怪的数字，因为对象可能在原始作者的信用下初始化了数组
 * 或创建，但可能会在另一个作者下被销毁或释放正在使用的数组，从而减少
 * 先前未添加那些相同数字的计数。为了解决这个问题，最好仅在 create(4) 内使用
 * set_author，并尽可能在分配任何数组之前使用它。
 *
 */
void set_author( string author );

/**
 * query_privs() - 返回对象的权限字符串
 *
 * 返回对象的权限字符串。权限字符串在编译时通过对 master 对象中的
 * privs_file() 的调用来确定，并可以通过 set_privs() efun 进行更改。
 * 
 * 该 efun 仅在编译时定义了 PRIVS 时可用。
 *
 */
varargs string query_privs( object ob );

/**
 * livings() - 返回所有生活对象的数组
 *
 * 返回指向所有生活对象的指针数组（已调用 enable_commands() 的对象）。
 *
 */
object *livings( void );

/**
 * living() - 检测给定对象是否“活着”
 *
 * @returns 如果 `ob` 是一个生活对象（即，如果 `enable_commands()` 已被 `ob` 调用），则返回 true。
 * @param ob - 要检查的对象
 */
varargs int living( object ob );

/**
 * getuid() - 返回对象的用户 ID (uid)
 *
 * 返回对象的用户 ID。对象的 uid 在对象创建时由 creator_file() 函数确定。
 *
 */
string getuid( object ob );

/**
 * geteuid() - 返回对象或函数的有效用户 ID
 *
 * 如果给定一个对象参数，geteuid 返回该对象的有效用户 ID (euid)。如果给定一个
 * 类型为 'function' 的参数，它返回创建该 'function' 变量的对象的 euid。
 * 如果在函数变量构造时，该对象没有 euid，则存储对象的 uid。
 *
 */
string geteuid( object|function );

/**
 * find_living() - 找到与给定 ID 匹配的生活对象
 *
 * 首先查找被标记为生活的对象，并回答 ID <str>。生活对象是调用了
 * enable_commands() 的对象。该对象必须使用 set_living_name() 设置了名称，
 * 以便其名称将被输入到用于加快查找生活对象的哈希表中。
 *
 */
object find_living( string str );

/**
 * export_uid() - 设置另一个对象的 uid
 *
 * 将 <ob> 的 uid 设置为 this_object(). 的有效 uid。仅在 <ob> 的有效 uid 为 0 时可能。
 *
 */
int export_uid( object ob );

/**
 * enable_wizard() - 赋予对象巫师特权
 *
 * 
 *
 */
void enable_wizard( void );

/**
 * domain_stats() - 返回域的统计信息
 *
 * domain_stats() 和 author_stats() 都返回存储在映射中的信息。如果没有指定参数，
 * 则返回所有域（或所有作者）的信息，每个域或作者一个映射条目。如果指定了参数，
 * 则返回一个映射，该映射对应于该域或作者，键为：moves, cost, errors,
 * heart_beats, worth, array_size, 和 objects。每个键对应整数值。moves 是进入
 * 给定域的对象移动的数量。cost 是与给定域（或作者）相关的对象累计的评估
 * 数（eval_cost）。errors 是与给定域的对象发生的错误数量。heart_beats 是对
 * 拥有给定域的对象进行的心跳调用的数量。worth 是由 add_worth(3) efunction
 * 维护的值（通常用于跟踪某个巫师给出与收入的多少）。array_size 是所分配数组的
 * 大小（以字节为单位）。objects 是由给定域创建的对象数量。当没有参数调用时，
 * 返回的映射具有如下形式：
 * 
 * ([ domain0 : info0, domain1 : info1, ... ])
 * 
 * 然后 info0 的形式为：
 * 
 * ([ "moves" : moves, "cost" : cost, "errors" : errors,
 * "heart_beats" : heart_beats, "worth" : worth,
 * "array_size" : array_size, "objects" : objects ])
 * 
 * 当带参数调用时，返回的映射将具有 info0 的形式。
 *
 */
mapping domain_stats( void|string domain  );

/**
 * author_stats() - 返回作者的统计信息
 *
 * domain_stats() 和 author_stats() 都返回存储在映射中的信息。如果没有指定参数，
 * 则返回所有域（或所有作者）的信息，每个域或作者一个映射条目。如果指定了参数，
 * 则返回一个映射，该映射对应于该域或作者，键为：moves, cost, errors,
 * heart_beats, worth, array_size, 和 objects。每个键对应整数值。moves 是进入
 * 给定域的对象移动的数量。cost 是与给定域（或作者）相关的对象累计的评估
 * 数（eval_cost）。errors 是与给定域的对象发生的错误数量。heart_beats 是对
 * 拥有给定域的对象进行的心跳调用的数量。worth 是由 add_worth(3) efunction
 * 维护的值（通常用于跟踪某个巫师给出与收入的多少）。array_size 是所分配数组的
 * 大小（以字节为单位）。objects 是由给定域创建的对象数量。当没有参数调用时，
 * 返回的映射具有如下形式：
 * 
 * ([ domain0 : info0, domain1 : info1, ... ])
 * 
 * 然后 info0 的形式为：
 * 
 * ([ "moves" : moves, "cost" : cost, "errors" : errors,
 * "heart_beats" : heart_beats, "worth" : worth,
 * "array_size" : array_size, "objects" : objects ])
 * 
 * 当带参数调用时，返回的映射将具有 info0 的形式。
 *
 */
mapping author_stats( void|string domain  );
