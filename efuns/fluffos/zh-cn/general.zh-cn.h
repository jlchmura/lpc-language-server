// general.h

/**
 * undefinedp() - 确定给定变量是否未定义。
 *
 * 如果 'arg' 是未定义的，则返回 1。 'arg' 在以下情况下将未定义：
 * 
 * 1. 它是一个变量，其值等于对一个不存在的方法的 call_other 调用的返回值（例如 arg = call_other(obj, "???")）。
 * 
 * 2. 它是一个变量，其值等于对一个不存在的映射元素的访问的返回值（例如 arg = map[not_there]）。
 *
 */
int undefinedp( mixed arg );

/**
 * uncompress_file
 *
 * 待完成
 *
 */
int uncompress_file(string, string);

/**
 * uncompress
 *
 * 待完成
 *
 */
buffer uncompress(string | buffer);

/**
 * typeof() - 返回表达式的类型
 *
 * 返回表达式的类型。返回值在 <type.h> 中给出。它们是：
 * 
 * T_INT           "int"
 * T_STRING        "string"
 * T_ARRAY         "array"
 * T_OBJECT        "object"
 * T_MAPPING       "mapping"
 * T_FUNCTION      "function"
 * T_FLOAT         "float"
 * T_BUFFER        "buffer"
 * T_CLASS         "class"
 * 
 * T_INVALID          "*invalid*"
 * T_LVALUE           "*lvalue*"
 * T_LVALUE_BYTE      "*lvalue_byte*"
 * T_LVALUE_RANGE     "*lvalue_range*"
 * T_LVALUE_CODEPOINT "*lvalue_codepoint*"
 * T_ERROR_HANDLER    "*error_handler*"
 * T_FREED            "*freed*"
 * T_UNKNOWN          "*unknown*"
 *
 */
string typeof( mixed var );

/**
 * translate
 *
 * 将给定的浮点数组进行坐标转换，返回转换后的浮点数组指针。
 * 
 * @param float * 需要转换的浮点数组指针
 * @param float x   转换过程中使用的 x 坐标参数
 * @param float y   转换过程中使用的 y 坐标参数
 * @param float z   转换过程中使用的 z 坐标参数
 * 
 * @returns float*  转换后的浮点数组指针
 */
float * translate(float *, float, float, float);

/**
 * start_request_term_type
 *
 * 启动请求终端类型的过程，待完成实现。
 * 
 * 此函数用于初始化或设置请求的终端类型，具体实现未完成。
 */
void start_request_term_type();


/**
 * sizeof()  -  返回数组、映射、缓冲区或字符串中的元素数量
 *
 * 返回数组、映射、字符串或缓冲区 'var' 中的元素数量。如果 'var' 不是数组、映射、字符串或缓冲区，则返回零 (0)。
 *
 */
int sizeof( mixed var );

/**
 * shallow_inherit_list
 *
 * 待完成
 *
 */
string * shallow_inherit_list(object);

/**
 * send_zmp
 *
 * 待完成
 *
 */
void send_zmp(string, string *);


/**
 * scale
 *
 * 待完成
 *
 */
float * scale(float *, float, float, float);

/**
 * save_variable() - 将变量的值保存为字符串
 *
 * 将变量的值保存为字符串。格式与 save/restore_object 相同。
 *
 */
string save_variable( mixed var );

/**
 * rotate_z
 *
 * 待完成
 *
 */
float * rotate_z(float *, float);

/**
 * rotate_y
 *
 * 待完成
 *
 */
float * rotate_y(float *, float);

/**
 * rotate_x
 *
 * 待完成
 *
 */
float * rotate_x(float *, float);

/**
 * restore_variable() - 从字符串恢复变量的值
 *
 * 从字符串恢复变量的值。使用的格式与 save/restore_object 相同。
 *
 */
mixed restore_variable( string value );

/**
 * request_term_type
 *
 * 待完成
 *
 */
void request_term_type();

/**
 * request_term_size
 *
 * 待完成
 *
 */
void request_term_size(int);

/**
 * parse_remove
 *
 * 待完成
 *
 */
void parse_remove(string);

/**
 * parse_my_rules
 *
 * 待完成
 *
 */
mixed parse_my_rules(object, string, int);

/**
 * parse_dump
 *
 * 待完成
 *
 */
string parse_dump();

/**
 * parse_add_synonym
 *
 * 待完成
 *
 */
void parse_add_synonym(string, string, string);


/**
 * nullp() - 判断给定变量是否为null。
 *
 * 如果'arg'为null，返回1。'arg'在以下情况下会为null：
 * 
 * 1. 它尚未被初始化。
 * 
 * 2. 它指向一个已析构的对象。
 * 
 * 3. 它是一个函数（形式）参数，对应于缺失的实际参数。
 * @template T
 * @param {T} arg - 要检查的变量
 * @returns {arg is 0} - 如果变量为null，返回1，否则返回0
 */

/**
 * norm
 *
 * 待补充
 *
 */

/**
 * next_bit
 *
 * 待补充
 *
 */

/**
 * map()  - 通过应用函数修改映射、数组或字符串
 *
 * 如果第一个参数是一个映射，map()的行为完全类似于map_map‐
 * ping()。如果它是一个数组，map()的行为完全类似于map_array()。如果
 * 它的参数是一个字符串，map()将每个字符（作为一个int）传递给
 * 函数，如果返回值是非零整数，则用返回值替换该字符。
 */
varargs mapping map( mapping x, string fun, object ob, mixed extra... );
varargs mapping map( mapping x, function f, mixed extra... );
varargs string map( string x, string fun, object ob, mixed extra... );
varargs string map( string x, function f, mixed extra... );
varargs mixed* map( mixed* x, string fun, object ob, mixed extra... );

/**
 * @template T, Y
 * @callback mapCallback
 * @param {T} element 要映射的元素
 * @returns {Y} map回调的返回值
 */

/**
 * map()  - 通过应用函数修改数组
 *
 * 如果第一个参数是一个映射，map()的行为完全类似于map_map‐
 * ping()。如果它是一个数组，map()的行为完全类似于map_array()。如果
 * 它的参数是一个字符串，map()将每个字符（作为一个int）传递给
 * 函数，如果返回值是非零整数，则用返回值替换该字符。
 * @template T
 * @template Y
 * @param {T*} x 要映射的数组 
 * @param {mapCallback<T,Y>} f 要应用于每个元素的回调函数
 * @param extra 传递给回调函数的额外参数
 * @returns {Y*} 映射值的数组
 */
varargs mixed* map( mixed* x, function f, mixed extra... );



/**
 * lookat_rotate2
 *
 * 待完成
 *
 */
float * lookat_rotate2(float *, float, float, float, float, float, float);

/**
 * lookat_rotate
 *
 * 待完成
 *
 */
float * lookat_rotate(float *, float, float, float);

/**
 * log2
 *
 * 待完成
 *
 */
float log2(float | int);

/**
 * log10
 *
 * 待完成
 *
 */
float log10(float | int);

/**
 * id_matrix
 *
 * 待完成
 *
 */
float * id_matrix();

/**
 * filter
 *
 * 返回一个新字符串、数组或映射，其元素与'source'中的元素相同，前提是这些元素通过过滤函数的测试。
 * 
 * 字符串被视为整数数组，因此过滤函数以字符串中每个字符的整数值进行调用。
 * 
 * 过滤函数必须接受至少一个参数，即要测试的元素，并返回一个真值（truthy）以表示该元素应包含在结果中，或返回一个假值（falsy）以表示应排除该元素。
 * 
 * 在映射的情况下，filter将把键和值传递给过滤函数。
 * 
 * 传递给filter()的任何附加参数将在所需参数之后传递给过滤函数。
 * 
 * 如果使用第一种语法，过滤函数作为call_other执行。如果ob是一个字符串，则假定它是要加载的对象的文件名，并在其上调用过滤函数。
 * @template {string|mapping|mixed*} T
 * @param {T} source - 要过滤的源
 * @returns {T} - 经过过滤的源
 */
mixed filter(string|mapping|mixed* source,
             string filter_function,
             object|string ob,
             mixed *extra...);
string|mapping filter(string|mapping source, function f, mixed *extra... );

/**
 * @template T
 * @callback filterCallback
 * @param {T} element The element to map
 * @returns The map callback return value
 */

/**
 * filter
 *
 * 返回一个新字符串、数组或映射，其元素与'source'中的元素相同，前提是这些元素通过过滤函数的测试。
 * 
 * 字符串被视为整数数组，因此过滤函数以字符串中每个字符的整数值进行调用。
 * 
 * 过滤函数必须接受至少一个参数，即要测试的元素，并返回一个真值（truthy）以表示该元素应包含在结果中，或返回一个假值（falsy）以表示应排除该元素。
 * 
 * 在映射的情况下，filter将把键和值传递给过滤函数。
 * 
 * 传递给filter()的任何附加参数将在所需参数之后传递给过滤函数。
 * 
 * 如果使用第一种语法，过滤函数作为call_other执行。如果ob是一个字符串，则假定它是要加载的对象的文件名，并在其上调用过滤函数。
 * @template T - string, mapping, or array
 * @param {T*} source - The source to filter
 * @param {filterCallback<T>} f - The filter function
 * @returns {T*} - The filtered source
 */       
mixed* filter(mixed* source, function f, mixed *extra... );

/**
 * explode_reversible
 *
 * 待完成
 *
 */
string * explode_reversible(string, string);

/**
 * dump_trace
 *
 * 待完成
 *
 */
mixed * dump_trace();

/**
 * dump_stralloc
 *
 * 待完成
 *
 */
string dump_stralloc(string);

/**
 * dump_jemalloc
 *
 * 待完成
 *
 */
void dump_jemalloc();

/**
 * dotprod
 *
 * 待完成
 *
 */
float dotprod(int * | float *, int * | float *);

/**
 * distance
 *
 * 待完成
 *
 */
float distance(int * | float *, int * | float *);

/**
 * destructed_objects
 *
 * 待完成
 *
 */
mixed * destructed_objects();

/**
 * compress_file
 *
 * 待完成
 *
 */
int compress_file(string, string);

/**
 * compress
 *
 * 待完成
 *
 */
buffer compress(string | buffer);

/**
 * clear_debug_level
 *
 * 此 efun 将为指定选项关闭调试级别。
 * 选项与 set_debug_level() 使用字符串时相同。
 *
 * call_out
 * d_flag
 * connections
 * mapping
 * sockets
 * comp_func_tab
 * LPC
 * LPC_line
 * event
 * dns
 * file
 * add_action
 * telnet
 * websocket
 *
 * clear_debug_level("call_out");
 *
 */
void clear_debug_level(string);

/**
 * classp
 *
 * 将返回项 `arg` 是否为一个类。如果 `arg` 是一个类，
 * 则该函数将返回 1，否则返回 0。
 *
 * class Person {
 * string name;
 * int age;
 * }
 * 
 * void runit() {
 * class Person p = new(class Person, name: "Bob", age: 42);
 * 
 * printf("classp(p) = %d", classp(p)); // 1
 * printf("classp(0) = %d", classp(0)); // 0
 * printf("classp(this_object()) = %d", classp(this_object())); // 0
 * }
 *
 */
int classp(mixed arg);

/**
 * check_memory
 *
 * 待补充
 *
 */
string check_memory(int);

/**
 * angle
 *
 * 待补充
 *
 */
float angle(int * | float *, int * | float *);

/**
 * act_mxp
 *
 * 待补充
 *
 */
void act_mxp();
