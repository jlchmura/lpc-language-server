// parsing.h

/**
 * query_verb() - 返回当前正在执行的命令名称
 *
 * 给出当前命令的名称，如果不是从命令执行，则返回 0。
 * 此函数在多个命令（动词）可能导致同一函数执行时非常有用，
 * 需要确定是哪个动词调用了此函数。
 *
 */
string query_verb( void );

/**
 * process_value() - 从描述的函数调用中获取一个值
 *
 * 获取一个语法模式的替代。模式的形式为：
 * 
 * "function[:filename][|arg1|arg2....|argN]"
 * 
 * 返回的值可以是任何类型。
 * 
 * 注意对象和参数都是用括号标记为可选的，
 * 并且括号不包含在实际模式中。
 *
 */
mixed process_value( string calldescription );

/**
 * process_string() - 返回替换了调用描述的字符串
 *
 * 通过用在解释模式时返回的内容替换特定的语法模式来处理字符串。
 * 
 * 语法模式的形式为：
 * 
 * "@@function[:filename][|arg1|arg2....|argN]@@"
 * 
 * 这被解释为一次调用：
 * 
 * filename->function(arg1, arg2, ....., argN)
 * 
 * 注意 process_string 不会递归处理返回的替代值。
 * 如果一个函数返回另一个语法模式，该描述将不会被替换。
 * 
 * 在 'combinestring' 中的所有此类出现都会被处理并替换，
 * 如果返回值是字符串的话。如果返回值不是字符串，
 * 则该模式将保持未替换状态。
 * 
 * 注意对象和参数都是用括号标记为可选的，
 * 并且括号不包含在实际模式中。
 *
 * 一个字符串：
 * "你被 @@query_the_name:/obj/monster#123@@ 向东追赶。"
 * 
 * 被替换为：
 * "你被兽人向东追赶。"
 * 
 * 假设 monster#123 中的 query_the_name 返回 "兽人"。
 *
 */
string process_string( string combinestring );

/**
 * parse_sentence() - 解析给定字符串中的命令
 *
 * 此 efun 调用驱动程序解析器，并告诉它解析并执行
 * 给定字符串中的命令。该 efun 可能返回一个整数
 * 错误代码，或一个字符串错误消息。如果返回字符串消息，
 * 应该显示给玩家。整数代码为：
 * 
 * * 1: 命令处理正常
 * * 0: 未找到匹配命令，没有处理
 * * -1: 找到匹配命令但没有匹配任何规则。
 * * -2: 一条规则有意义，但所有 "can" 或 "direct" 应用都返回 0。
 *
 */
mixed parse_sentence(string, void | int, void | object *, void | mapping);

/**
 * parse_refresh()
 *
 * 解析包缓存有关对象的信息以提高性能。
 * 这意味着如果任何缓存的信息发生变化，
 * 你需要告诉 MudOS 清除缓存。这就是此 efun 的作用。
 * 如果下面的任何应用返回的信息发生变化，
 * 你需要调用 parse_refresh() 以便解析器知道它已改变。
 * 例如，如果对象的名称发生变化，或者在施法将其
 * 从蓝色变为红色时，形容词发生变化 - 之后调用 parse_refresh()。
 * 此 efun 会清除调用它的对象的缓存。
 *
 */
void parse_refresh();

/**
 * parse_init()
 *
 * efun parse_init() 用于告诉 MudOS 该对象
 * 可能会被解析包使用或被使用。如果你的对象
 * 没有调用此方法，则尝试使用其他解析 efuns 将
 * 产生运行时错误，解析器在搜索匹配项时将忽略该对象。
 * 建议在标准对象的 create() 中调用 parse_init()。
 *
 */
void parse_init();

/**
 * parse_command() - 尝试将字符串与给定模式匹配
 *
 * parse_command() 是一个改进版的 sscanf(3)，
 * 以单词为基础操作。它的工作原理类似于 sscanf(3)，
 * 需要一个模式和一个可变参数集合作为目标。
 * 仅与 sscanf(3) 一起，是唯一的 efun 使用引用传递
 * 其他变量而不是数组。也就是说，parse_command() 返回
 * 值在其参数中。
 * 
 * 如果 'command' 被认为与 'pattern' 匹配，
 * parse_command() 返回 1。
 * 
 * 'env' 或 'oblist' 参数可以持有一个对象，
 * 或对象的列表。如果它持有单个对象，则通过
 * 添加对象的深度库存自动创建对象的列表，
 * 即这两者是相同的：
 * 
 * parse_command(cmd, environment(), pattern, arg)
 * 
 * 和
 * 
 * parse_command( cmd, ({ environment() }) +
 * deep_inventory(environment()), pattern, arg)
 * 
 * 'pattern' 是一个单词和格式的列表：
 * 
 * 示例字符串 = " 'get' / 'take' %i "
 * 语法：
 * 'word'          必需文本
 * [word]          可选文本
 * /               选择标记
 * %o              单个项目，对象
 * %l              活动对象
 * %s              任何文本
 * %w              任何单词
 * %p              列表中的一个（介词）
 * %i              任何项目
 * %d              数字 0- 或 tx(0-99)
 * 
 * 'arg' 列表是零个或多个参数。这些是结果变量，
 * 如同 sscanf。注意每个 %_ 需要一个变量。
 * 
 * 不同 %_ 的返回类型：
 * %o      返回一个对象
 * %s      返回一个字符串的单词
 * %w      返回一个字符串的一个单词
 * %p      可以在输入时持有一个字词的列表数组
 * 或一个空变量
 * 返回：
 * 如果空变量：返回一个字符串
 * 如果数组：array[0] = 匹配单词
 * %i      返回一个特殊数组形式：
 * [0] = (int) +(wanted) -(order) 0(all)
 * [1..n] (object) 对象指针
 * %l      返回一个特殊数组形式：
 * [0] = (int) +(wanted) -(order) 0(all)
 * [1..n] (object) 对象指针
 * 这些仅是生物对象。
 * %d      返回一个数字
 * 
 * 唯一使用从对象加载的所有信息的 % 类型是 %i 和 %l。
 * 这些实际上是相同的，只是 %l 从对象列表中
 * 过滤出所有非生物对象。
 * 
 * %i 和 %l 的返回值也是最复杂的。它们返回一个数组，
 * 首先是一个数字，然后是所有可能的匹配对象。
 * 一个典型的字符串被 %i/%l 匹配，看起来像：
 * '三朵红玫瑰'，'所有可恶的虫子' 或 '第二把蓝剑'，
 * 数字表明匹配的是哪个数字构造：
 * 
 * 如果数字 >0 则匹配的是三、四、五等
 * 如果数字 <0 则匹配的是第二、二十一等
 * 如果数字==0 则匹配的是 '所有' 或通用复数形式，
 * 如 '苹果'。
 * 
 * 如果 (parse_command("spray car",environment(this_player()),
 * " 'spray' / 'paint' [paint] %i ",items))
 * {
 * /*
 * 如果模式匹配成功那么 items 持有的是一个返回数组，
 * 如上述 'destargs' %i 所描述的那样。
 * *\/
 * }
 *
 */
int parse_command( string command, object|object* env,
                   string pattern, mixed arg... );

/**
 * parse_add_rule() - 为动词添加解析规则
 *
 * 此处 "verb" 是命令词（例如 "look"，"read" 等），
 * "rule" 是要添加的解析规则。规则由两部分构成 -
 * 令牌和介词。令牌用于匹配各种对象或字符串，
 * 而介词是用来指定含义的固定位置词（如 "with" 或 "in"）。
 * 
 * MudOS 接受我知道的六个令牌：
 * 
 * OBJ - 匹配单个对象
 * OBS - 匹配一个或多个对象
 * LIV - 匹配单个生物对象
 * LVS - 匹配一个或多个生物对象
 * WRD - 匹配单个单词
 * STR - 匹配一个或多个单词
 *
 */
void parse_add_rule(string verb, string rule);
