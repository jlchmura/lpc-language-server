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
 * Any extra arguments are forwarded to the callback; an optional trailing
 * integer is treated as PCRE flags.
 *
 */
string pcre_replace_callback( string subject, string pattern, function fun, mixed extra... );
string pcre_replace_callback( string subject, string pattern, string fun, object | string ob, mixed extra... );

/**
 * pcre_replace()
 *
 * returns a string where all captured groups have been replaced by the
 * elements of the replacement array. Number of subgroups and the size of the
 * replacement array must match.
 *
 * The optional pcre_flags argument is a bitmask of PCRE option flags
 * (e.g. case-insensitive, multiline) applied when compiling the pattern.
 *
 */
string pcre_replace(string input, string pattern, string *replacments, void|int pcre_flags);

/**
 * pcre_match_all() - find all matches
 *
 * Similiar to php preg_match_all, this EFUN returns a array of string arrays,
 * containing all matches and captured groups.
 *
 * Each element of the result describes one match: a string array whose
 * first element is the full matched text and whose remaining elements are
 * that match's captured groups, in order.
 *
 * The optional pcre_flags argument is a bitmask of PCRE option flags
 * (e.g. case-insensitive, multiline) applied when compiling the pattern.
 *
 */
<string*>* pcre_match_all(string input, string pattern, void|int pcre_flags);

/**
 * pcre_match() - regular expression handler
 *
 * analog with regexp efun for backwards compatibility reasons but utilizing
 * the PCRE library.
 *
 * When the subject is a single string, returns nonzero if the pattern
 * matches it and zero otherwise. In this form a lone third integer
 * argument is treated as pcre_flags.
 *
 * The optional pcre_flags argument is a bitmask of PCRE option flags
 * (e.g. case-insensitive, multiline) applied when compiling the pattern.
 *
 */
int pcre_match(string subject, string pattern, void|int pcre_flags);

/**
 * pcre_match() - regular expression handler
 *
 * analog with regexp efun for backwards compatibility reasons but utilizing
 * the PCRE library.
 *
 * When given an array of lines, returns an array holding those lines which
 * match the pattern. The optional 'flag' argument is a bit field: with bit
 * 2 set, the non-matching lines are returned instead; with bit 1 set, the
 * result is of the form ({ index1 + 1, match1, ..., indexn + 1, matchn })
 * where each index is the position of the following line in 'lines'.
 *
 * The optional pcre_flags argument is a bitmask of PCRE option flags
 * (e.g. case-insensitive, multiline) applied when compiling the pattern.
 *
 */
string *pcre_match(string *lines, string pattern, void|int flag, void|int pcre_flags);

/**
 * pcre_extract() - extract matching parts
 *
 * returns an array of captured groups specified in pattern.
 *
 * If include_names is nonzero, a mapping of named capture groups to their
 * matched values is appended as the final element of the returned array.
 * The optional pcre_flags argument is a bitmask of PCRE option flags
 * (e.g. case-insensitive, multiline) applied when compiling the pattern.
 *
 */
string *pcre_extract(string input, string pattern, void|int include_names, void|int pcre_flags);

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
    mixed default_value, int pcre_flags);

