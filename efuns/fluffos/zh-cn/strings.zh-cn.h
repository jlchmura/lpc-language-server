// strings.h

/**
 * trim() - 移除前导和尾随空格
 *
 * 从字符串 'str' 中移除所有前导和尾随空白（或其他字符 'ch'），并返回一个新字符串。
 *
 */
string trim( string str );
string trim( string str, string ch);

/**
 * set_bit() - 在位字符串中设置一位
 *
 * 返回0或1，表示字符串 'str' 中的位 'n' 是否被设置。
 *
 */
int test_bit( string str, int n );

/**
 * strwidth() - 返回字符串的显示宽度
 *
 * strwidth() 返回显示字符串 'str' 所需的列数。
 * 
 * 驱动程序使用 https://www.unicode.org/reports/tr11/tr11-36.html 中定义的规则来计算字符宽度。
 * 
 * 控制字符没有宽度。宽字符，包括表情符号占两个列宽。这个规则也被 sprintf() 用于布局字符串。
 *
 */
int strwidth( string str );

/**
 * 在字符串中搜索子字符串
 *
 * `strsrch()` 在字符串 'str' 中搜索字符串 'substr' 的第一个出现。
 * 最后一次出现 'substr' 可以通过将 '-1' 作为第三个参数（可选）来找到。
 * 如果第二个参数是一个整数，则该字符被找到（类似于 C 的 strchr()/strrchr()）。
 * 不能搜索空字符串或空值。
 *
 */
varargs int strsrch( string str, string substr, int flag );
varargs int strsrch( string str, int char, int flag );

/**
 * 返回提供字符串中的 UTF-8 字符数
 * 
 * strlen() 返回字符串 'str' 中的字符数。
 * 
 * LPC 字符串是 UTF-8 编码的。驱动程序根据 Unicode 概念 "Extended Grapheme Cluster" 计算字符数，按 
 * "https://www.unicode.org/reports/tr29/" 中定义的方式。
 * 
 * ```lpc
 * strlen("abc") == 3
 * strlen("你好") == 2
 * ```
 */
int strlen( string str );

/**
 * stringp() - 判断给定变量是否为字符串
 *
 * @returns {arg is string} 如果 'arg' 是字符串则返回1。
 */
int stringp( mixed arg );

/**
 * 
 *
 * 使用给定编码对给定字符串 str（以 UTF-8 编码）进行编码，返回一个字节缓冲区。
 *
 */
buffer string_encode(string str, string encoding);

/**
 * 
 *
 * 使用给定编码解码给定缓冲区为 UTF-8 字符串。
 *
 */
string string_decode(buffer buf, string encoding);

/**
 * strcmp() - 确定两个字符串之间的词法关系。
 *
 * 此 strcmp() 的实现与 C 库中的实现相同。
 * 如果字符串一在词法上优先于字符串二，则 strcmp() 返回小于0的数字。
 * 如果两个字符串的值相同，则 strcmp() 返回0。
 * 如果字符串二在词法上优先于字符串一，则 strcmp() 返回大于0的数字。
 * 这个函数在 sort_array(3) 中的比较函数中特别有用。
 *
 */
int strcmp( string one, string two );

/**
 * sscanf() - 匹配字符串中的子字符串。
 *
 * 使用字符串格式 'fmt' 解析字符串 'input'，格式可以包含用特定符号分隔的单词。
 * 每个符号对应于在 sscanf() 中传入函数参数的匹配值，按出现的顺序并通过引用分配匹配的值。
 * 'fmt' 中包含的符号数量应与字符串 'fmt' 后面的函数参数数量匹配。
 * 
 * 符号：
 * %s          -   匹配一个字符串
 * %d          -   匹配一个整数
 * %f          -   匹配一个浮点数
 * %x          -   匹配一个基数为16的数字并转换为基数为10
 * %(regexp)   -   匹配一个正则表达式模式
 * 
 * 在符号中可以使用 "*"（例如 "%*s"）来跳过输入字符串中的匹配项，而不将其赋值给函数参数。
 * "%%" 用于匹配 "%" 字符，该字符也将在函数参数中被跳过。
 * 
 * LPC 的 sscanf() 类似于其 C 对应物，但在某些方面有些不同。无需或无法将变量的地址传入 sscanf（只需传入变量的名称）。
 * 
 * 另一个不同之处在于，在 LPC 的 sscanf() 中，sscanf(str, "%s %s", str1, str2) 将把 str 中的第一个单词解析到 str1，剩余的内容解析到 str2。
 * 
 * "%s" 符号可以匹配空字符串，这可能是一个不希望出现的结果。sscanf(" ", "%s %s", str1, str2) 将返回2，str1 和 str2 被赋值为空字符串 ""。
 *
 * 基本用法：
 * ```lpc
 * string what, who;
 * 
 * if (sscanf(input, "give %s to %s", what, who) == 2)
 * write("You give " + what + " to " + who + ".");
 * else
 * write("Give what to who?");
 * 
 * sscanf("give", "give %s to %s", what, who) == 0
 * what == UNDEFINED && who == UNDEFINED
 * 
 * sscanf("give item", "give %s to %s", what, who) == 1
 * what == "item" && who == UNDEFINED
 * 
 * sscanf("give item to name", "give %s to %s", what, who) == 2
 * what == "item" && who == "name"
 * ``` 
 * 
 * 数字：
 * int i;
 * sscanf("123", "%d", i) == 1
 * i == 123
 * 
 * float f;
 * sscanf("1.23", "%f", f) == 1
 * f == 1.230000
 * 
 * int b10;
 * sscanf("ABC", "%x", b10) == 1
 * b10 == 2748
 * 
 * 正则表达式：
 * string str1, str2;
 * sscanf("one two", "%([a-z]+) %([a-z]+)", str1, str2) == 2
 * str1 == "one" && str2 == "two"
 *
 */
int sscanf(string input, string fmt, mixed outvars... );

/**
 * printf, sprintf - 格式化输出转换
 *
 * LPC 的 (s)printf() 的实现，包含许多扩展
 * 由 Lynscar（Sean A Reith）实现。
 * 
 * 这个版本支持以下修饰符：
 * 
 * " "     用空格填充正整数。
 * 
 * "+"     用加号填充正整数。
 * 
 * "-"     在字段大小内左对齐。
 * 注意：标准 (s)printf() 默认为右对齐，这在主要以字符串为基础的语言中是不自然的，但为了"兼容性"保留了这一点。
 * 
 * "|"     在字段大小内居中。
 * 
 * "="     如果字符串大于字段大小，则为列模式。仅对字符串有意义。所有其他类型将忽略此设置。列将自动换行。
 * 
 * "#"     表格模式，在字段大小内以 '\n' 分隔的 'words' 列出。
 * 仅对字符串有意义。
 * 
 * n       指定字段大小， '*' 指定使用相应的参数作为字段大小。如果 n 之前带有零，则用零填充，否则用空格（或指定的填充字符串）填充。
 * 
 * "."n    精度 n，简单字符串在此处截断（如果精度大于字段大小，则字段大小 = 精度），表格使用精度来确定列数（如果未指定精度，则表格将计算最佳匹配），所有其他类型将忽略此设置。
 * 
 * ":"n    n 同时指定字段大小和精度，n 前面如果带有零，则用零填充，而不是空格。
 * 
 * "@"     参数为数组。每个数组元素都应用相应的格式信息（去掉 "@"）。
 * 
 * "'X'"   单引号之间的字符用于填充字段大小（默认为空格）。如果同时指定零（在字段大小前）和填充字符串，则第二个指定的会覆盖第一个。注意：要在填充字符串中包含 "'"，必须使用 "\'"（因为反斜杠在解释器中必须被转义），同样，要包含 "\" 需使用 "\\"。
 * 
 * 以下是可能的类型符号。
 * 
 * %       在这种情况下不解释任何参数，并插入 "%" 字符，所有修饰符将被忽略。
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
 * X       整数参数以十六进制形式打印（大写A-F）。
 * 
 * f       浮点数
 *
 * 基本用法：
 * ```lpc
 * sprintf("%s is %i", "X", 1)   =   "X is 1"
 * ``` 
 * 
 * 对齐：
 * ```lpc
 * sprintf("%-20s", "left")      =   "left                "
 * sprintf("%20|s", "center")    =   "       center       "
 * sprintf("%20s", "right")      =   "               right"
 * sprintf("%-20'-'s", "left")   =   "left----------------"
 * sprintf("%20'-'|s", "center") =   "-------center-------"
 * sprintf("%20'-'s", "right")   =   "---------------right"
 * ``` 
 * 
 * 数字：
 * sprintf("%.2f", 1.2345)       =   "1.23"
 * sprintf("%10.2f", 1.2345)     =   "      1.23"
 * sprintf("%10.6f", 0.123)      =   "  0.123000"
 * 
 * 动态字段大小：
 * sprintf("%-*s", 10, "ten")    =   "ten       "
 * sprintf("%|*s", 20, "twenty") =   "       twenty       "
 * sprintf("%*s", 30, "thirty")  =   "                        thirty"
 *
 */
varargs void printf(string format, mixed args...);
varargs string sprintf(string format, mixed args...);
/**
 * sha1() - 使用SHA-1对字符串进行哈希
 *
 * 返回字符串 `str` 或缓冲区 `bf` 的SHA-1哈希值。
 * 
 * 这在编译驱动程序时需要启用PACKAGE_CRYPTO。
 * 
 * 注意：
 * 外部函数 `hash(algo, str)` 可以处理SHA-1及更多。
 *
 * sha1("something") = "1af17e73721dbe0c40011b82ed4bb1a7dbe3ce29"
 *
 */
string sha1(buffer|string str);

/**
 * set_bit() - 在位字符串中设置某个比特
 *
 * 返回新字符串，其中字符串 'str' 中的比特 'n' 被设置。注意，
 * 旧字符串 'str' 不会被修改。
 * 
 * 'n' 的最大值是有限制的。如果您想知道最大值，请询问管理员。
 * 
 * 新字符串将在需要时自动扩展。
 * 
 * 在可打印字符串中，每字节打包6个比特。
 *
 */
string set_bit( string str, int n );

/**
 * rtrim() - 移除尾部空白（和其他字符）
 *
 * 从字符串 'str' 中移除所有尾部空白（或其他字符 'ch'），并返回新字符串。
 *
 */
string rtrim( string str );
string rtrim( string str, string ch);

/**
 * replace_string() - 替换字符串中的所有实例
 *
 * replace_string() 返回字符串 str，其中所有实例的模式被替换为 replace。
 * 如果模式的长度为零，则返回未修改的 str。如果结果字符串超出最大字符串长度，
 * 则 replace_string() 返回一个未定义的、非字符串的值。
 * 
 * replace_string() 可以通过指定模式和一个零长度的替换参数来移除字符串中的
 * 字符。例如，replace_string("  1  2  3   ",   "   ",   "") 将返回 "123"。
 * replace_string() 这样执行比 explode()/implode() 快。
 * 
 * 第4个和第5个参数是可选的（为了保持向后兼容性）。额外的参数具有以下效果：
 * 
 * 4个参数
 * 第4个参数指定要进行的最大替换次数（计数从1开始）。值为0表示“替换所有”，
 * 因此，它的作用与只有3个参数的replace_string()相同。例如，
 * replace_string("xyxx", "x", "z", 2) 将返回 "zyzx"。
 * 
 * 5个参数
 * 第4个和第5个参数指定要替换的匹配范围，具有以下约束：
 * - first < 1 : 从开始改变所有内容。
 * - last == 0，或 last > max_matches : 改变到结尾的所有内容。
 * - first > last : 返回未修改的数组。
 * 例如，replace_string("xyxxy", "x", "z", 2, 3) 返回 "xyzzy"。
 *
 */
string replace_string( str, pattern, replace );
string replace_string( str, pattern, replace, max );
string replace_string( str, pattern, replace, first, last );

/**
 * regexp() - 正则表达式处理器
 *
 * 通常，当提供一组文本行和一个正则表达式时，regexp(3) 返回一个数组，
 * 包含与正则表达式指定的模式匹配的那些行。如果标志（默认值为0）设置了位2，
 * 则将返回非匹配项而不是匹配项。如果标志设置了位1，则返回的数组将是
 * 形式为 ({ index1 + 1, match1, ..., indexn + 1, matchn })，其中 index1 是
 * 数组行中第1个匹配/非匹配的索引。
 *
 */
int regexp(string str, string pattern, void | int flag);
string *regexp(string *lines, string pattern, void | int flag);

/**
 * reg_assoc() - 正则模式子字符串提取器
 *
 * reg_assoc 接收一个字符串并将其按给定的正则表达式模式字符串 pat_arr 分解成
 * 子字符串，并将它们与在 tok_arr 中给出的标记关联起来。如果给定 def（默认值为0），
 * 它将与非匹配关联。返回值是一个包含两个数组的数组，第一个是形式为
 * 
 * ({ non-match1, match1, non-match2, match2, ...,
 * non-match n, match n, non-match n+1 })
 * 
 * 的数组，第二个则包含按顺序对应于匹配项的标记
 * 
 * ({ def, 与 match1 相对应的标记, ....,  def,           
 * 与 match n 相对应的标记, def })。
 * 
 * pat_arr 和 tok_arr 必须具有相同的大小，tok_arr 中的第 i 个元素是 pat_arr 中
 * 第 i 个元素的对应标记。pat_arr 只能包含字符串。
 * 
 * 如果 pat_arr（以及 tok_arr）的大小为0，则返回值为简单的
 * ({ ({ str }), ({ def }) })。
 *
 * #define STRING_PAT "\"(\\\\.|[^\\\"])*\""
 * #define NUM_PAT "[0-9]+" 
 * 
 * #define F_STRING 1
 * #define F_NUM 2
 * 
 * reg_assoc("Blah \"blah\" test 203 hhh j 308 \"bacdcd\b\"acb",
 * ({ STRING_PAT, NUM_PAT }), ({ F_STRING, F_NUM }), "no-match")
 * 
 * 将返回
 * ({ ({ "Blah ", "\"blah\"", " test ", "203", " hhh j ", "308", " ",
 * "\"bacdcd\b\"", "acb" }),
 * ({ "no-match", F_STRING, "no-match", F_NUM, "no-match", F_NUM,
 * "no-match", F_STRING, "no-match" }) })
 *
 */
mixed *reg_assoc(string  str,  string *pat_arr, mixed *tok_arr, void | mixed def);

/**
 * oldcrypt() - 加密字符串
 *
 * 使用字符串 `seed` 的前两个字符加密字符串 `str`。如果 `seed` 为零，
 * 将使用随机种子。
 * 
 * 加密结果可以用作第二次加密的 `seed`，如果两个 `str` 输入相同，
 * 则将返回原始的加密结果。
 *
 * 使用 oldcrypt() 验证密码的示例：
 * 
 * // 将用户输入转换为加密密码
 * string cryptPasswd = oldcrypt(input, 0);
 * 
 * // 在用户保存的某处存储加密密码
 * 
 * // 将登录输入与存储的加密密码进行比较
 * if (oldcrypt(input, cryptPasswd) == cryptPasswd) {
 * // 有效密码
 * } else {
 * // 无效密码尝试
 * }
 *
 */
string oldcrypt( string str, string seed );

/**
 * ltrim() - 移除前导空白（和其他字符）
 *
 * 从字符串 'str' 中移除所有前导空白（或其他字符 'ch'），并返回新字符串。
 *
 */
string ltrim( string str );
string ltrim( string str, string ch);

/**
 * lower_case() - 返回给定字符串的小写版本
 *
 * 返回给定字符串的小写版本（原始字符串保持不变）。
 *
 */
string lower_case( string str );

/**
 * implode() - 连接字符串
 *
 * 将数组 'arr' 中找到的所有字符串连接起来，在每个元素之间用字符串 'del'。
 * 仅使用数组中的字符串。非字符串的元素被忽略。
 *
 */
string implode( mixed *arr, string del );

/**
 * hash() - 使用指定算法对字符串进行哈希
 *
 * 返回字符串 `str` 的 `algo` 算法的哈希。
 * 
 * 算法 `algo` 可以是以下之一：
 * md4 md5 sha1 sha224 sha256 sha384 sha512 ripemd160
 * 
 * 这在编译驱动程序时需要启用PACKAGE_CRYPTO。
 *
 * hash("md4", "Something")        =   "abc554cae9acd8f168101954383335df"
 * hash("md5", "Something")        =   "73f9977556584a369800e775b48f3dbe"
 * hash("ripemd160", "Something")  =   ...40个字符...
 * hash("sha1", "Something")       =   ...40个字符...
 * hash("sha224", "Something")     =   ...56个字符...
 * hash("sha256", "Something")     =   ...64个字符...
 * hash("sha384", "Something")     =   ...96个字符...
 * hash("sha512", "Something")     =   ...128个字符...
 *
 */
string hash( string algo, string str );

/**
 * explode() - 拆分字符串
 *
 * explode() 返回一个字符串数组，创建于字符串 <str> 根据分隔符 <del> 被分割成多个部分时。
 *
 * explode(str," ") 将返回一个数组，包含字符串 <str> 中所有的词（以空格分隔）。
 *
 */
string *explode( string str, string del );

/**
 * crypt() - 加密字符串
 *
 * 使用字符串 `seed` 加密字符串 `str`。如果 `seed` 为零，
 * 则将使用随机种子。
 * 
 * 加密结果可以作为第二次加密的 `seed`，如果两个 `str` 输入相同，
 * 则将返回原始的加密结果。
 *
 * 使用 crypt() 验证密码的示例：
 * 
 * // 将用户输入转换为加密密码
 * string cryptPasswd = crypt(input, 0);
 * 
 * // 在用户保存的某处存储加密密码
 * 
 * // 将登录输入与存储的加密密码进行比较
 * if (crypt(input, cryptPasswd) == cryptPasswd) {
 * // 有效密码
 * } else {
 * // 无效密码尝试
 * }
 *
 */
string crypt( string str, string seed );

/**
 * clear_bit() - 清除位字符串中的某个比特
 *
 * 返回新字符串，其中字符串 <str> 中的比特 <n> 被清除。注意，
 * 旧字符串 <str> 不会被修改。
 *
 */
string clear_bit( string str, int n );

/**
 * capitalize() - 将字符串首字母大写
 *
 * 将 <str> 中的第一个字符转换为大写，并返回新字符串。
 *
 */
string capitalize( string str ); 

