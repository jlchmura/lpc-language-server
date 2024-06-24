// pcre.h

/**
 * pcre_version() - returns the version of the compiled PCRE library used
 *
 * returns the version of the compiled PCRE library used
 *
 */
string pcre_version(void);

/**
 * pcre_replace_callback() - string replace uses a callback to get the replace string
 *
 * returns a string where all captured groups have been replaced by the return
 * value of function pointer fun or function fun in object ob. (called with the
 * matched string and match number, starting with 0)
 *
 */
string pcre_replace_callback(string input, string pattern, string|function, mixed *args...);

/**
 * pcre_replace()
 *
 * returns a string where all captured groups have been replaced by the
 * elements of the replacement array. Number of subgroups and the size of the
 * replacement array must match.
 *
 */
string pcre_replace(string input, string pattern, string *replacments);

/**
 * pcre_match_all() - find all matches
 *
 * Similiar to php preg_match_all, this EFUN returns a array of string arrays,
 * containing all matches and captured groups.
 *
 */
mixed pcre_match_all(string input, string pattern);

/**
 * pcre_match() - regular expression handler
 *
 * analog with regexp efun for backwards compatibility reasons but utilizing
 * the PCRE library.
 *
 */
mixed pcre_match(string|string *lines, string pattern, void|int flag);

/**
 * pcre_extract() - extract matching parts
 *
 * returns an array of captured groups specified in pattern.
 *
 */
string *pcre_extract(string input, string pattern);

/**
 * pcre_cache() - return content of the pcre cache
 *
 * returns content of the pcre cache (not all that useful).
 *
 */
mapping pcre_cache(void);

/**
 * pcre_assoc() - A regular pattern substring extractor
 *
 * analog with reg_assoc efun for backwards compatibility reasons but utilizing
 * the PCRE library.
 *
 */
varargs mixed *pcre_assoc(string input, string *patterns, 
    mixed *token_aray, 
    mixed default_value);

