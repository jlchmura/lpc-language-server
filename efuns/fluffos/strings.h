// strings.h

/**
 * trim() - Remove leading and trailing whitespaces
 *
 * Remove all leading and trailing whitespace (or other characters 'ch')
 * from the string 'str' and return a new string.
 *
 */
string trim( string str );
string trim( string str, string ch);

/**
 * set_bit() - set a bit in a bitstring
 *
 * Return 0 or 1 of bit 'n' was set in string 'str'.
 *
 */
int test_bit( string str, int n );

/**
 * strwidth() - returns the display width of a string
 *
 * strwidth() returns the number of columns to display string 'str'.
 * 
 * The driver uses rules defined in https://www.unicode.org/reports/tr11/tr11-36.html
 * to calcuate character width.
 * 
 * Control characters have no width. Wide characters, including emojis are two
 * columns wide. This rule is also used by sprintf() to layout strings.
 *
 */
int strwidth( string str );

/**
 * Search for substrings in a string
 *
 * `strsrch()` searches  for  the first occurance of the string 'substr' in
 * the string 'str'.  The last occurance of 'substr' can be found by passing  '-1' as the 3rd argument (which is optional).  
 * If the second argument 
 * is an integer, that character is found  (a la C's  strchr()/strrchr().)  
 * The empty string or null value cannot be searched for.
 *
 */
varargs int strsrch( string str, string substr, int flag );
varargs int strsrch( string str, int char, int flag );

/**
 * Return the number of UTF-8 characters in a supplied string
 * 
 * strlen() returns the number of characters in the string 'str'.
 * 
 * LPC strings are UTF-8 encoded. Driver calcuate numbers of characters
 * according to the Unicode concept "Extended Grapheme Cluster", as defined in
 * "https://www.unicode.org/reports/tr29/".
 * 
 * ```lpc
 * strlen("abc") == 3
 * strlen("你好") == 2
 * ```
 */
int strlen( string str );

/**
 * stringp() - determine whether or not a given variable is a string
 *
 * @returns {arg is string} 1 if 'arg' is a string.
 */
int stringp( mixed arg );

/**
 * 
 *
 * Encode the given string str(in UTF-8) using given encoding, return an
 * buffer of bytes.
 *
 */
buffer string_encode(string str, string encoding);

/**
 * 
 *
 * Decode the given buffer with given encoding into an UTF-8 string.
 *
 */
string string_decode(buffer buf, string encoding);

/**
 * strcmp() - determines the lexical relationship between two strings.
 *
 * This  implementation  of  strcmp()  is  identical  to the one found in C
 * libraries.  If string one lexically precedes string two, then  strcmp()
 * returns  a number less than 0.  If the two strings have the same value,
 * strcmp() returns 0.  If string two lexically precedes string one,  then
 * strcmp()  returns  a number greater than 0.  This efunction is particu‐
 * larly useful in the compare functions needed by sort_array(3).
 *
 */
int strcmp( string one, string two );

/**
 * sscanf() - match substrings in a string.
 *
 * Parse a string 'input' using the string format 'fmt', which can contain
 * words separated by specifiers.  Every specifier corresponds to a match-
 * ing function argument passed into  sscanf()  after the string 'fmt', in
 * order of appearance and assigning the matched values By Reference.  The
 * number of specifiers included in 'fmt' should match the number of func-
 * tion arguments included after string 'fmt'.
 * 
 * Specifiers:
 * %s          -   match a string
 * %d          -   match an integer
 * %f          -   match a float
 * %x          -   match a base 16 number and convert to base 10
 * %(regexp)   -   match a regexp pattern
 * 
 * The "*" may be used in a specifier (e.g. "%*s") to skip over a match in
 * the input string and not assign it to a function argument.   A "%%" may
 * be used to match the "%" character,  which will also be skipped over in
 * the function arguments.
 * 
 * The LPC sscanf() is similar to its C counterpart however it does behave
 * somewhat differently.  It is not necessary or possible to pass the add-
 * ress of  variables into sscanf  (simply pass the name of the variable).
 * 
 * Another difference is that  in the LPC  sscanf(),  sscanf(str, "%s %s",
 * str1, str2)  will parse the  first word in  str into str1  and the rem-
 * ainder of str into str2.
 * 
 * The "%s" specifier can match an empty string, which can be an undesired
 * result.  sscanf(" ", "%s %s", str1, str2)  will return 2, with str1 and
 * str2 being assigned an "" empty string.
 *
 * Basic Usage:
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
 * Numeric:
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
 * Regexp:
 * string str1, str2;
 * sscanf("one two", "%([a-z]+) %([a-z]+)", str1, str2) == 2
 * str1 == "one" && str2 == "two"
 *
 */
int sscanf(string input, string fmt, mixed outvars... );

/**
 * printf, sprintf - formatted output conversion
 *
 * An  implementation  of (s)printf() for LPC, with quite a few extensions
 * Implemented by Lynscar (Sean A Reith).
 * 
 * This version supports the following as modifiers:
 * 
 * " "     pad positive integers with a space.
 * 
 * "+"     pad positive integers with a plus sign.
 * 
 * "-"     left adjusted within field size.
 * NB: std (s)printf() defaults to right justification,  which  is
 * unnatural  in the context of a mainly string based language but
 * has been retained for "compatability".
 * 
 * "|"     centered within field size.
 * 
 * "="     column mode if strings are greater than  field  size.  This  is
 * only meaningful with strings, all other types ignore this. Col‐
 * umns are auto-magically word wrapped.
 * 
 * "#"     table mode, print a list of '\n' separated 'words' in  a  table
 * within the field size.  only meaningful with strings.
 * 
 * n       specifies  the  field  size,  a '*' specifies to use the corre‐
 * sponding arg as the field size.  If n is prepended with a zero,
 * then  is padded zeros, else it is padded with spaces (or speci‐
 * fied pad string).
 * 
 * "."n    precision of n, simple strings truncate after this  (if  preci‐
 * sion  is greater than field size, then field size = precision),
 * tables use precision to specify the number of columns (if  pre‐
 * cision  not  specified  then  tables calculate a best fit), all
 * other types ignore this.
 * 
 * ":"n    n specifies the fs _and_ the precision, if n is prepended by  a
 * zero then it is padded with zeros instead of spaces.
 * 
 * "@"     the argument is an array.  the corresponding format_info (minus
 * the "@") is applyed to each element of the array.
 * 
 * "'X'"   The char(s) between the single-quotes are used to pad to  field
 * size  (defaults  to  space)  (if both a zero (in front of field
 * size) and a pad string are specified, the one specified  second
 * overrules).   NOTE:  to include "'" in the pad string, you must
 * use "\'" (as the backslash has to be escaped  past  the  inter‐
 * preter), similarly, to include "\" requires "\\".
 * 
 * The following are the possible type specifiers.
 * 
 * %       in  which  case  no  arguments  are  interpreted,  and a "%" is
 * inserted, and all modifiers are ignored.
 * 
 * O       the argument is an LPC datatype.
 * 
 * s       the argument is a string.
 * 
 * d, i    the integer arg is printed in decimal.
 * 
 * c       the integer arg is to be printed as a character.
 * 
 * o       the integer arg is printed in octal.
 * 
 * x       the integer arg is printed in hex.
 * 
 * X       the integer arg is printed in hex (with A-F in capitals).
 * 
 * f       floating point number
 *
 * Basic Usage:
 * ```lpc
 * sprintf("%s is %i", "X", 1)   =   "X is 1"
 * ```
 * 
 * Alignment:
 * ```lpc
 * sprintf("%-20s", "left")      =   "left                "
 * sprintf("%20|s", "center")    =   "       center       "
 * sprintf("%20s", "right")      =   "               right"
 * sprintf("%-20'-'s", "left")   =   "left----------------"
 * sprintf("%20'-'|s", "center") =   "-------center-------"
 * sprintf("%20'-'s", "right")   =   "---------------right"
 * ```
 * 
 * Numeric:
 * sprintf("%.2f", 1.2345)       =   "1.23"
 * sprintf("%10.2f", 1.2345)     =   "      1.23"
 * sprintf("%10.6f", 0.123)      =   "  0.123000"
 * 
 * Dynamic Field Size:
 * sprintf("%-*s", 10, "ten")    =   "ten       "
 * sprintf("%|*s", 20, "twenty") =   "       twenty       "
 * sprintf("%*s", 30, "thirty")  =   "                        thirty"
 *
 */
varargs void printf(string format, mixed args...);
varargs string sprintf(string format, mixed args...);

/**
 * sha1() - hash a string using SHA-1
 *
 * Returns the SHA-1 hash of string `str` or buffer `bf` using SHA-1.
 * 
 * This requires PACKAGE_CRYPTO to be enabled when compiling the driver.
 * 
 * Note:
 * The `hash(algo, str)` external function can handle SHA-1 and more.
 *
 * sha1("something") = "1af17e73721dbe0c40011b82ed4bb1a7dbe3ce29"
 *
 */
string sha1(buffer|string str);

/**
 * set_bit() - set a bit in a bitstring
 *
 * Return  the  new string where bit 'n' is set in string 'str'. Note that
 * the old string 'str' is not modified.
 * 
 * The max value of 'n' is limited. Ask the administrator if you  want  to
 * now the maximum value.
 * 
 * The new string will automatically be extended if needed.
 * 
 * Bits are packed 6 per byte in printable strings.
 *
 */
string set_bit( string str, int n );

/**
 * rtrim() - Remove trailing whitespaces (and others)
 *
 * Remove all trailing whitespace (or other characters 'ch') from the
 * string 'str' and return a new string.
 *
 */
string rtrim( string str );
string rtrim( string str, string ch);

/**
 * replace_string() - replace all instances of a string within a string
 *
 * replace_string()  returns  str  with  all instances of pattern replaced
 * with replace.  If pattern has zero length then str is returned  unmodi‐
 * fied.   If  the resultant string would exceed the maximum string length
 * then replace_string() returns an undefinedp(), non-stringp() value.
 * 
 * replace_string() can be used to remove  characters  from  a  string  by
 * specifying a pattern and a zero-length replace parameter.  For example,
 * replace_string("  1  2  3   ",   "   ",   "")   would   return   "123".
 * replace_string() executes faster this way then explode()/implode().
 * 
 * The  4th and 5th arguments are optional (to retain backward compatibil‐
 * ity.)  The extra arguments have the following effect:
 * 
 * 4 args
 * The 4th argument specifies the maximum number  of  replacements  to
 * make  (the  count starts at 1). A value of 0 implies 'replace all',
 * and thus, acts as replace_string() with 3  arguments  would.  E.g.,
 * replace_string("xyxx", "x", "z", 2) would return "zyzx".
 * 
 * 5 args
 * The  4th  and 5th arguments specify the range of matches to replace
 * between, with the following constraints:
 * - first < 1 : change all from the start.
 * - last == 0, or last > max_matches : change all to end
 * - first > last : return the unmodified array.
 * E.g., replace_string("xyxxy", "x", "z", 2, 3) returns "xyzzy".
 *
 */
string replace_string( str, pattern, replace );
string replace_string( str, pattern, replace, max );
string replace_string( str, pattern, replace, first, last );

/**
 * regexp() - regular expression handler
 *
 * Typically  when  presented with an array of lines of text and a regular
 * expression, regexp(3) returns an array  containing  those  lines  which
 * match  the  pattern  specified  by  the regular expression. If the flag
 * (default 0) has bit 2 set, then non-matches will be returned instead of
 * matches.  If the flag  has bit 1 set, the array returned will be of the
 * form ({ index1 + 1, match1, ..., indexn + 1, matchn }) where index1  is
 * the index of 1st match/non match in the array lines.
 *
 */
int regexp(string str, string pattern, void | int flag);
string *regexp(string *lines, string pattern, void | int flag);

/**
 * reg_assoc() - A regular pattern substring extractor
 *
 * reg_assoc takes a string and explodes it into substrings  matching  the
 * regular expression pattern-strings given in pat_arr and associates them
 * with tokens given in tok_arr. If def (default 0) is given, it is  asso‐
 * ciated  with  a  non-match. The return value is an array of two arrays,
 * the 1st being an array of the form
 * 
 * ({ non-match1, match1, non-match2, match2, ...,
 * non-match n, match n, non-match n+1 })
 * 
 * and the 2nd holds the tokens corresponding to the matches in order
 * 
 * ({ def, token corresponding to match1, ....,  def,           token
 * corresponding to match n, def }).
 * 
 * pat_arr  and  tok_arr  must  be  of  the same sizes, the ith element in
 * tok_arr being the corresponding token to the ith  element  of  pat_arr.
 * pat_arr can only hold strings.
 * 
 * If pat_arr (and hence tok_arr) has size 0 then the return value is sim‐
 * ply ({ ({ str }), ({ def }) }).
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
 * will return
 * ({ ({ "Blah ", "\"blah\"", " test ", "203", " hhh j ", "308", " ",
 * "\"bacdcd\b\"", "acb" }),
 * ({ "no-match", F_STRING, "no-match", F_NUM, "no-match", F_NUM,
 * "no-match", F_STRING, "no-match" }) })
 *
 */
mixed *reg_assoc(string  str,  string *pat_arr, mixed *tok_arr, void | mixed def);

/**
 * oldcrypt() - encrypt a string
 *
 * Encrypt the string `str` using the first two characters from string
 * `seed`. If `seed` is zero, then a random seed will be used.
 * 
 * The encrypted result can be used as the `seed` of a second encrypt,
 * which will return the original encrypted result if both `str` inputs
 * were identical.
 *
 * Example of verifying a password using oldcrypt():
 * 
 * // turn user input into crypted password
 * string cryptPasswd = oldcrypt(input, 0);
 * 
 * // store crypted password in user save somewhere
 * 
 * // compare login input to stored crypted password
 * if (oldcrypt(input, cryptPasswd) == cryptPasswd) {
 * // valid password
 * } else {
 * // invalid password attempt
 * }
 *
 */
string oldcrypt( string str, string seed );

/**
 * ltrim() - Remove leading whitespaces (and others)
 *
 * Remove all leading whitespace (or other characters 'ch') from the
 * string 'str' and return a new string.
 *
 */
string ltrim( string str );
string ltrim( string str, string ch);

/**
 * lower_case() - return the lowercase version of a given string
 *
 * Return the lowercase version of a given string (original string remains
 * unchanged).
 *
 */
string lower_case( string str );

/**
 * implode() - concatenate strings
 *
 * Concatenate  all  strings  found  in array 'arr', with the string 'del'
 * between each element. Only strings are used from the  array.   elements
 * that are not strings are ignored.
 *
 */
string implode( mixed *arr, string del );

/**
 * hash() - hash a string with the specified algorithm
 *
 * Returns the hash of string `str` by the `algo` algorithm.
 * 
 * Aglorithm `algo` can be one of:
 * md4 md5 sha1 sha224 sha256 sha384 sha512 ripemd160
 * 
 * This requires PACKAGE_CRYPTO to be enabled when compiling the driver.
 *
 * hash("md4", "Something")        =   "abc554cae9acd8f168101954383335df"
 * hash("md5", "Something")        =   "73f9977556584a369800e775b48f3dbe"
 * hash("ripemd160", "Something")  =   ...40 characters...
 * hash("sha1", "Something")       =   ...40 characters...
 * hash("sha224", "Something")     =   ...56 characters...
 * hash("sha256", "Something")     =   ...64 characters...
 * hash("sha384", "Something")     =   ...96 characters...
 * hash("sha512", "Something")     =   ...128 characters...
 *
 */
string hash( string algo, string str );

/**
 * explode() - break up a string
 *
 * explode() returns an array of strings, created when the string <str> is
 * split into pieces as divided by the delimiter <del>.
 *
 * explode(str," ") will return as an array all of the words (separated by
 * spaces) in the string <str>.
 *
 */
string *explode( string str, string del );

/**
 * crypt() - encrypt a string
 *
 * Encrypt the string `str` using string `seed`. If `seed` is zero, then
 * a random seed will be used.
 * 
 * The encrypted result can be used as the `seed` of a second encrypt,
 * which will return the original encrypted result if both `str` inputs
 * were identical.
 *
 * Example of verifying a password using crypt():
 * 
 * // turn user input into crypted password
 * string cryptPasswd = crypt(input, 0);
 * 
 * // store crypted password in user save somewhere
 * 
 * // compare login input to stored crypted password
 * if (crypt(input, cryptPasswd) == cryptPasswd) {
 * // valid password
 * } else {
 * // invalid password attempt
 * }
 *
 */
string crypt( string str, string seed );

/**
 * clear_bit() - zero a bit in a bit string
 *
 * Return  the  new  string where bit <n> is cleared in string <str>. Note
 * that the old string <str> is not modified.
 *
 */
string clear_bit( string str, int n );

/**
 * capitalize() - capitalize a string
 *
 * Convert  the first character in <str> to upper case, and return the new
 * string.
 *
 */
string capitalize( string str );

