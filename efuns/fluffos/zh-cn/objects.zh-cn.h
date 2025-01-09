// objects.h

/**
 * virtualp()  -  确定给定变量是否指向虚拟对象
 *
 * @返回 如果参数是 objectp() 并且设置了 O_VIRTUAL 标志则返回 true (1)。驱动程序为通过 master.c 中的 'compile_object' 方法创建的对象设置 O_VIRTUAL 标志。
 *
 */
varargs int virtualp( object arg );

/**
 * 
 *
 * 向房间 'ob' 中的所有对象发送消息 'str'。 'ob' 也可以是房间的文件名（字符串）。如果指定了 'exclude'，则排除数组中的所有对象将不会接收此消息。
 *
 */
void tell_room( mixed ob, string str, object *exclude );

/**
 * tell_object() - 向对象发送消息
 *
 * 向对象 'ob' 发送消息 'str'。如果它是一个交互对象（玩家），则消息将发送给他，否则将发送到本地函数 "catch_tell()"。
 *
 */
void tell_object( object ob, string str );

/**
 * set_hide() - 设置可隐藏对象的隐藏标志
 *
 * 将对象的隐藏标志设置为 'flag'，该标志应为 0 或 1（关闭隐藏或开启隐藏）。只有那些 'master()->valid_hide(ob)' 返回 true 的对象才能使自己变为隐藏。当对象被隐藏时，只有其他可隐藏对象才能通过 find_object() 或返回多个对象的 efuns（如 users()、children()、all_inventory() 等）找到该对象。
 *
 */
void set_hide( int flag );

/**
 * set_heart_beat() - 启用或禁用对象的心跳
 *
 * 传递 'flag' 作为 0 会禁用对象的心跳。传递 'flag' 为 1 会导致 heart_beat() 在每个心跳（由你的本地管理员定义的一个变量，一般为 2 秒）中被调用一次。传递大于 1 的 'flag' 通常会设置两次调用 heart_beat() 之间的心跳数量，然而你的本地管理员可能已将系统配置为将任何大于 1 的 'flag' 视为 1。
 *
 */
int set_heart_beat( int flag );

/**
 * save_object() - 将对象中的变量值保存到文件
 *
 * 将此对象中所有非静态变量的值保存在文件 'name' 中。master 对象中的 valid_write() 决定这是否被允许。可选的第二个参数是一个位字段：如果位 0 为 1，则变量为零（0）也会被保存（通常情况下，它们不会被保存）。对象变量总是保存为 0。如果位 1 为 1，则保存文件将被压缩。
 *
 */
varargs int save_object( string name, int flag );

/**
 * restore_object()  -  通过文件恢复对象中的变量值
 *
 * 从文件 'name' 恢复当前对象的变量值。如果可选的第二个参数为 1，则所有非静态变量在恢复之前都不会被清零（通常情况下，它们会被清零）。
 * 
 * 在出现错误的情况下，受影响的变量将保持不变并给出错误。
 *
 */
varargs int restore_object( string name, int flag );

/**
 * reload_object() - 将对象恢复到刚加载的状态
 *
 * 当在 'ob' 上调用 reload_object() 时，所有驱动程序维护的属性将被重新初始化（心跳、延迟调用、光照、阴影等），所有变量将被重新初始化，并且会调用 create()。它具有类似于销毁/重新加载对象的效果，然而没有进行磁盘访问或解析。
 *
 */
void reload_object( object ob );

/**
 * query_heart_beat() - 查询对象的心跳状态
 *
 * 返回在 '对象' 上调用 set_heart_beat() 时传递的值。如果未给出对象，则默认为当前对象。如果对象没有心跳，则返回 0。
 * 
 * 如果未提供对象，则此 efun 将默认为 this_object()。
 *
 */
varargs int query_heart_beat( object );

/**
 * present() - 通过 id 查找对象
 *
 * 如果第一个参数是字符串，第二个参数缺失，则使用 id() 应用在对象的环境中搜索一个对象，如果它返回 1，表示匹配。
 * 
 * 如果第一个参数是字符串，第二个参数是对象，则只在该对象的库存中搜索目标，使用与上面相同的策略。
 * 
 * "foo 1" 意味着库存中的第一个 "foo"。库存中的第一个是最后一个进入的对象。
 * 
 * 如果第一个参数是对象，第二个参数缺失，则检查对象是否在该对象的库存中，或者作为该对象环境库存中的兄弟，返回对象的父对象。
 * 
 * 如果第一个参数是对象，第二个参数是对象，则检查 object1 是否在 object2 的库存中，如果为真，则返回 object1。
 * 
 * 如果对象是隐藏的（通过 set_hide()），并且当前对象不可隐藏，则返回 0。
 *
 */
varargs object present( mixed str, object ob );

/**
 * objects - 返回所有加载对象的数组
 *
 * 列出泥中的每一个已加载对象的数组由 objects() 返回。注意，如果系统的最大数组大小设置得过低，objects() 将截断其数组，这样可能会使其不太有用。
 * 
 * 如果给定可选的 'func' 参数，则在 this_object() 中将调用 func()，并以每个已加载的对象作为参数。如果函数返回非零，则该对象将由 objects() 返回，否则不会。
 * 
 * 如果给出了 'f'，它将像上面那样在所有对象上被调用。例如，objects( (: clonep :) ) 将返回所有存在的克隆列表。
 *
 */
object *objects( void | string | function func );

/**
 * objectp() - 确定给定变量是否为对象
 *
 * @返回 {arg 是对象} 如果 'arg' 是对象则返回 1。
 *
 * @returns {arg is object} 1 if 'arg' is an object.
 */
int objectp( mixed arg );

/**
 * next_inventory() - 返回同一库存中的下一个对象
 *
 * 返回与 'ob' 在同一库存中的下一个对象。
 * 
 * 警告：如果对象 'ob' 被 "move_object()" 移动，则 "next_inventory()" 将从新的库存中返回一个对象。
 *
 */
object next_inventory( object ob );

/**
 * new() - 加载对象/类的新副本
 *
 * 从 `filename` 克隆一个新对象，并给予它一个新的唯一名称。返回新对象。可选地，额外参数可以传递给 new()，这些参数将传递给新对象中的 'create()' 应用。
 * 
 * 如果第一个参数是类，则会创建该类的新副本并返回。可选地，可以传递额外参数给 new()，这些将用于初始化返回类中的值。如果您传递参数给类，则必须指定成员名称以及希望初始化的成员值。
 * 
 * ### 对象示例：
 * ```lpc
 * object ob = new("/obj/torch") ; // 克隆一个火把对象
 * object money = new("/obj/money", 10, "dollars" ) ; // 克隆一个货币对象并设置初始值
 * ``` 
 *
 * ### 类示例：
 * ```lpc
 * class ClassPerson {
 * string name ;
 * int age ;
 * }
 * 
 * class ClassPerson person = new(class ClassPerson) ;
 * person.name = "Bob" ;
 * person.age = 42 ;
 * // 或者
 * class ClassPerson person = new(class ClassPerson, name: "Bob", age: 42) ;
 * ```
 */
varargs object new(string filename, mixed args...);
varargs class ClassName new(class ClassName, mixed args... ) ;

/**
 * move_object() - 将当前对象移动到另一个环境
 *
 * 将当前对象移动到对象 `dest` 中。 dest 应该是一个文件名或一个对象。
 *
 */
void move_object( mixed dest );

/**
 * master() - 返回主对象
 *
 * 返回指向主对象的指针。
 * @returns {__LPC_CONFIG_LIBFILES_MASTER}
 */
object master( void );

/**
 * load_object() - 通过文件名查找或加载对象
 *
 * 找到文件名为 'str' 的对象。如果文件存在且对象尚未加载，则加载并返回该对象（如果可能）。
 *
 */
object load_object( string str );

/**
 * first_inventory() - 返回对象库存中的第一个项目
 *
 * 返回 <ob> 的库存中的第一个对象，其中 <ob> 可以是一个对象或对象的文件名。
 * 
 * 如果未提供对象，则该 efun 将默认为 this_object()。
 *
 */
object first_inventory( mixed ob );

/**
 * find_object() - 通过文件名查找对象
 *
 * 找到文件名为 'str' 的对象，该文件名可以通过 file_name() 返回的格式引用克隆对象。
 * 
 * 如果 'flag' 为 1，find_object() 将表现得像 load_object() 一样。
 *
 */
object find_object( string str, void | int flag );

/**
 * file_name() - 获取对象的文件名
 *
 * file_name() 返回 <ob> 被加载的文件名。如果对象是一个克隆对象，则 file_name() 将不是实际的磁盘文件名，而是对象最初被克隆的文件名，后面附加一个井号 (#) 及对象实例号。对象实例号在游戏启动时从 0 开始，并在每次克隆对象时增加 1，因此该数字对于每个克隆对象都是唯一的。<ob> 如果未指定，则默认为 this_object()。
 *
 */
varargs string file_name( object ob );

/**
 * environment() - 返回对象的环境
 *
 * 返回 <ob> 的包含对象（环境）。如果不提供参数，则 <ob> 默认为 this_object()。
 *
 */
varargs object environment( object ob );

/**
 * destruct() - 从游戏中移除对象
 *
 * 完全销毁并移除对象 'ob'。在调用 destruct() 之后，将不再存在任何全局变量，只有局部变量和参数。如果 'ob' 是 this_object()，执行将继续，但最好立即返回一个值。
 * 
 * 如果未提供对象，则该 efun 将默认为 this_object()。
 *
 */
varargs void destruct( object ob );

/**
 * deep_inventory() - 返回对象的嵌套库存
 *
 * 返回一个包含 <ob> 的库存及其包含的所有对象的数组，以及那些对象的库存中的所有对象，依此类推。
 * 
 * 如果未提供对象，则该 efun 将默认为 this_object()。
 *
 */
varargs object *deep_inventory( object ob );

/**
 * clonep() - 确定给定变量是否指向一个克隆对象
 *
 * 如果参数是 objectp() 且设置了 O_CLONE 标志，则返回 true (1)。驱动程序为通过 new(3) (clone_object(3)) 创建的对象设置 O_CLONE 标志。clonep() efun 在调用主副本（通过 call_other(3) 加载的对象）时不会返回 true。请注意，如果 clonep() 返回 true，则 file_name() 将返回一个包含 '#' 的字符串。clonep() 默认为 this_object()。
 *
 */
int clonep( void | mixed arg );

/**
 * clone_object() - 加载对象的副本
 *
 * 从定义 <name> 加载一个新对象，并赋予其一个新的唯一名称。返回新对象。具有非零环境的对象不能被克隆。可以选择性地将额外参数传递给 clone_object()，这些参数将传递给新对象中的 'create()'。
 *
 * object ob = clone_object("/obj/torch") ; // 克隆一个火把对象
 * object money = clone_object("/obj/money", 10, "dollars" ) ; // 克隆一个钱币对象并设置初始值
 *
 */
object clone_object( string name, mixed args... );

/**
 * children() - 返回从给定对象克隆的对象数组。
 *
 * 此 efunction 返回从文件名为 'name' 的对象克隆的对象数组，以及如果已加载的对象 'name' 本身。使用 children() 的一个示例是查找所有从用户对象克隆的对象：
 * 
 * ```
 * object *list;
 * 
 * list = children("/obj/user");
 * ```
 * 这使您能够找到所有用户（包括网络死亡和交互用户，而 users() 只报告交互用户）。
 *
 */
object *children( string name );

/**
 * all_inventory() - 返回对象的库存
 *
 * 返回一个包含 <ob> 中的所有对象的数组。
 * 
 * 如果未传递 ob，则该参数默认为 this_object()。
 *
 */
varargs object *all_inventory( object ob );
