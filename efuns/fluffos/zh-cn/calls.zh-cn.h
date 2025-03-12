// calls.h

/**
 * throw() - 强制对象发生错误。
 *
 * throw() efun 可用于强制对象发生错误。当与 catch()结合使用时，程序员
 * 可以选择在运行时错误发生时显示的错误信息。当使用 throw() 时，它应
 * 与 catch(3) efun 一起使用。以下是一个典型用法：
 * 
 * string err;
 * int rc;
 * 
 * err = catch(rc = ob->move(dest));
 * if (err) {
 * throw("move.c: ob->move(dest): " + err + "\n");
 * return;
 * }
 *
 */
void throw(mixed);

/**
 * this_object() - 返回调用对象的对象指针
 *
 * 返回该对象的对象指针。当对象想要调用不在同一源文件中的函数时，
 * 该函数非常有用，但却在同一对象中（通过继承）。
 *
 */
object this_object( void );

/**
 * shadow() - 在某个对象中影藏一个或多个函数
 *
 * 如果 'flag' 为 1 或缺失，则当前对象将影藏 'ob'。如果 'flag' 为 0，则
 * 返回 0，或返回已经影藏 'ob' 的对象。
 * 
 * 主对象定义了函数 "valid_shadow()"。如果返回 1，则目标对象无法
 * 被影藏，并且 "shadow()" 函数将返回 0 而不是 'ob'。
 * 
 * 如果对象 'a' 影藏了对象 'b'，则对 'b' 的所有 "call_other(func)"
 * 将被重定向到 'a'。如果对象 'a' 没有定义该函数，则调用将
 * 转发到 'b'（就像没有影藏一样）。只有一个对象可以通过
 * call_other() 调用 'b' 中的函数，那个对象是 'a'。甚至连对象 'b'
 * 也不能 "call_other()" 自己。然而，所有 'b' 内部的正常（内部）函数
 * 调用将依然保持在 'b' 内部。
 * 
 * 有两种方法可以移除影藏。要么销毁它，要么销毁被影藏的对象。在后一种
 * 情况下，影藏也会自动被销毁。
 * 
 * 结果是，有可能在另一个对象后面隐藏一个对象，但一切都可以是完全透明的。
 * shadow() efun 使得可以在不更改相关对象代码的情况下改变对象的行为。
 * shadow() 的一个可能用途是为各种玩家类（盗贼、战士、法师等）添加
 * 特殊能力。这个用法将使得玩家对象保持比如果各种类的代码必须
 * 在玩家对象本身中时更简单。
 *
 */
varargs object shadow( object ob, int flag );

/**
 * remove_call_out() - 移除待处理的 call_out
 *
 * 在第一种形式中，该函数移除当前对象中函数 <fun> 的下一个待处理
 * 调用。返回值是未调用回调之前剩余的秒数，若没有待处理的调用
 * 则返回 -1。
 * 
 * 在第二种形式中，该函数移除已由 call_out() 函数返回的 <handle>
 * 所标识的待处理调用。返回值是该 call_out 被调用之前的剩余秒数，
 * 或 -1，如果指定的 <handle> 没有有效的 call_out。
 * 
 * 在第三种形式中，将移除当前对象的所有待处理调用。在这种情况下，
 * 返回值始终为 0。
 *
 */
int remove_call_out( string fun );
int remove_call_out( int handle );
int remove_call_out();

/**
 * shadowp() - 确定给定对象是否正在影藏另一个对象
 *
 * 返回 'ob' 正在影藏的对象，如果它没有影藏任何对象，则返回零 (0)。
 *
 */
object shadowp( object ob );

/**
 * previous_object() - 返回调用当前函数的对象(s)
 *
 * 返回指针到调用当前函数的对象（如果有的话）。注意，局部函数调用
 * 不会将 previous_object() 设置为当前对象，而是保持不变。如果传递
 * 正整数，则将返回调用链中之前的对象。previous_object(0) 与
 * previous_object() 相同，previous_object(1) 是前一个对象的 previous_object()，
 * 依此类推。previous_object(-1) 将返回一个包含所有之前对象的数组。
 *
 */
mixed previous_object( int | void );

/**
 * origin() - 确定当前函数是如何被调用的
 *
 * @returns 一个字符串，指定当前函数是如何被调用的。
 * 当前值有：
 * 
 * "driver"            驱动程序（心跳等）
 * "local"             本地函数调用
 * "call_other"        call_other()
 * "simul"             通过 simul_efun 调用 simul_efun 对象
 * "internal"          call_out() 等
 * "efun"              由 efun 调用（如 sort_array 等）
 * "function pointer"  函数指针
 * "functional"        功能性
 */
string origin();

/**
 * catch() - 捕获评估错误
 *
 * 评估 <expr>。如果没有错误，返回 0。如果有标准错误，将返回一个
 * 字符串（带前导 '*'）。
 * 
 * 函数 throw() 也可以用来立即返回任何值，除了 0。catch() 不是真正的
 * 函数调用，而是对编译器的指令。
 * 
 * catch() 是有一定成本的，不应该随便使用。相反，应在错误会破坏一致性
 * 的地方使用。
 *
 * void example1() {
 * object ob ;
 * mixed err ;
 * 
 * err = catch( ob = load_object("/obj/weapon/sword") ) ;
 * if(err) throw("加载指定文件时出错。") ;
 * }
 * 
 * void example2() {
 * mixed err = catch {
 * string file, *files = ({
 * "/u/g/gesslar/one",     // 好文件
 * "/u/g/gesslar/two",     // 坏文件
 * "/u/g/gesslar/three",   // 好文件
 * }) ;
 * 
 * foreach(file in files) load_object(file) ;
 * } ;
 * 
 * if(err) printf("ERR: %O", err) ;
 * }
 * 
 * // ERR: "*在加载对象 '/u/g/gesslar/two' 时出错"
 *
 */

// 这将通过解析器处理
// mixed catch( mixed expr );

/**
 * call_stack - 返回关于调用此函数的函数的信息
 *
 * 如果 int `option` 参数为 0，call_stack() 返回在调用栈上的函数名称的
 * 数组，第一个是最近的（即当前运行的程序）。如果 int 参数为 1，call_stack
 * 返回正在执行该程序的对象。如果为 2，将返回函数名称。如果为 3，将返回
 * 在该帧中的 origin() 的值。如果为 4，返回值将是完整的文件路径和行号。
 *
 */
varargs string *call_stack(int option);

/**
 * call_out_walltime - 同一对象中延迟的函数调用
 *
 * 此 efun 与 call_out 相同，只是它不在游戏循环中安排调用，而是在实际
 * 秒中执行。延迟可以为秒或秒的小数部分。
 *
 */
int call_out_walltime( string | function fun, int | float delay, mixed arg ... );

/**
 * call_out - 同一对象中的延迟函数调用
 *
 * 在 this_object() 中安排未来调用函数 <fun>。调用将在 <delay> 秒后进行，
 * 所有提供的参数 <arg> 中都有。<arg> 可以是任何类型。
 * 
 * 如果运行时配置中的游戏刻（gametick）小于 1000，则可以将 <delay> 指定
 * 为毫秒中的浮点数（gametick / 1000）表示一个能被游戏刻整除的值。
 * 不等于游戏刻值的 <delay> 将向上四舍五入到下一个游戏刻。
 * 特殊的 <delay> 为 0，请参见下文。
 * 
 * 例如，如果您的游戏刻设置为 250ms，您可以以四分之一秒的粒度执行
 * callouts。call_out( "function", 0.75 ) 将在 3 个游戏刻（750 毫秒）内执行
 * <fun>，从而在调用时提供更精确的定时。
 * 
 * <delay> 为 0（或 0.0），将在调用的同一游戏刻执行 <fun>，在执行所有
 * 之前的 call_out 之后。可能在同一游戏刻执行的 call_outs(0)s 的数量
 * 可以通过运行时配置中的 "call_out(0) 嵌套级别" 属性进行配置。
 * 
 * 请注意，不能依赖 <fun> 中的 write() 或 say()，因为 this_player() 设置为 0。
 * 请改用 tell_object()。
 * 
 * 运行时配置值 "this_player in call_out" 存在以解决上述问题。
 * 
 * 返回值是一个整数，表示 call_out 的句柄，可用作 remove_call_out() 的参数。
 *
 */
int call_out( string | function fun, int | float delay, mixed arg ... );

/**
 * call_other() - call a function in another object
 *
 * Calls  a  function in another object, with [optional] argument(s).  The
 * return value is returned from the other object, so it cannot  be  known
 * at  compile  time  and may need to be cast if using type checking.  The
 * function named 'func' will be called in 'ob', with arguments 3, 4,  etc
 * given as arguments 1, 2, etc to 'func' in 'ob'.  call_other will return
 * the return value of 'func'.  If the first argument is an array  instead
 * of  an object, then the call will be done in all elements of that array
 * (all elements should be of type object), and an array of  returns  will
 * be  returned.   If argument 2 is an array instead of a string, then the
 * first element in the array should be a string, the  function  to  call,
 * and all other elements will be passed to the function in the order they
 * appear in the array.
 * 
 * There is a much more attractive way to do call_others:
 * 
 * object ob | object *obs -> func ( ... );
 * 
 * ie,
 * 
 * call_other(ob, "query", "name");
 * 
 * could be written as:
 * 
 * ob->query("name");
 * 
 * Using an array as second argument, the same call could be written:
 * 
 * call_other(ob, ({ "query", "name" }));
 * 
 * An example of using an array as the first argument:
 * 
 * users()->quit();
 *
 */
mixed call_other( object|object* ob, string|mixed * funcArgs... );
