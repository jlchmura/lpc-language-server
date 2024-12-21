// pcre.h

/**
 * pcre_version() - 返回使用的已编译PCRE库的版本
 *
 * 返回使用的已编译PCRE库的版本
 *
 */
string pcre_version(void);

/**
 * pcre_replace_callback() - 字符串替换使用回调函数获取替换字符串
 *
 * 返回一个字符串，其中所有捕获的组已被函数指针fun或对象ob中的函数fun的返回值替换。（使用匹配字符串和匹配编号调用，编号从0开始）
 *
 */
string pcre_replace_callback(string input, string pattern, string|function, mixed *args...);

/**
 * pcre_replace()
 *
 * 返回一个字符串，其中所有捕获的组已被替换数组的元素替换。子组数量和替换数组的大小必须匹配。
 *
 */
string pcre_replace(string input, string pattern, string *replacments);

/**
 * pcre_match_all() - 查找所有匹配项
 *
 * 类似于php的preg_match_all，这个EFUN返回一个字符串数组的数组，包含所有匹配项和捕获的组。
 *
 */
mixed pcre_match_all(string input, string pattern);

/**
 * pcre_match() - 正则表达式处理器
 *
 * 由于向后兼容的原因与正则表达式efun类似，但利用了PCRE库。
 *
 */
mixed pcre_match(string|string *lines, string pattern, void|int flag);

/**
 * pcre_extract() - 提取匹配部分
 *
 * 返回模式中指定的捕获组的数组。
 *
 */
string *pcre_extract(string input, string pattern);

/**
 * pcre_cache() - 返回pcre缓存的内容
 *
 * 返回pcre缓存的内容（不是很有用）。
 *
 */
mapping pcre_cache(void);

/**
 * pcre_assoc() - 正则模式子字符串提取器
 *
 * 由于向后兼容的原因与reg_assoc efun类似，但利用了PCRE库。
 *
 */
varargs mixed *pcre_assoc(string input, string *patterns, 
    mixed *token_aray, 
    mixed default_value);
