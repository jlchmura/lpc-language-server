// arrays.h

#undef ALL_ARRAY_TYPES
#define ALL_ARRAY_TYPES string*|int*|float*|object*|mixed*|function*
#undef ALL_PRIMITIVE_TYPES
#define ALL_PRIMITIVE_TYPES string|int|float|object|mixed|function


/**
 * unique_array() - 将对象数组分区为组
 *
 * 根据'separator'函数返回的相同值将对象组合在一起。'obarr'
 * 应该是一个对象数组，其他类型将被忽略。'separator'函数只会在
 * 'obarr'中的每个对象上调用一次。可选的'skip'参数允许对
 * 'obarr'进行预过滤，跳过与'skip'匹配的元素。第二种形式则稍稍
 * 不同，数组的每个元素将被传递给f，并根据f的返回值进行分区。
 * 特别是，数组不需要由对象组成。
 *
 */
mixed unique_array( object *obarr, string separator, void | mixed skip);
mixed unique_array( mixed *arr, function f, void | mixed skip );

/**
 * sort_array() - 对数组进行排序
 *
 * 第一种形式返回一个与'arr'具有相同元素的数组，但是
 * 根据'ob->fun()'中的规则进行升序快速排序。
 * 'ob->fun()' 将在每次调用中传递两个参数。它应该
 * 返回 -1、0 或 1，具体取决于两个参数之间的关系
 * （小于、等于、大于）。
 * 
 * 第二种形式执行相同的操作，但允许使用函数指针。
 * 
 * 第三种形式返回一个与'arr'具有相同元素的数组，但是
 * 使用内置排序例程进行快速排序。'direction'为1或0时
 * 将快速排序为升序，而'direction'为-1时将快速排序为
 * 降序。内置排序例程的一个限制是，数组必须是同类的，
 * 完全由单一类型组成，其中该类型可以是string、int或float。
 * 数组中的数组通过基于第一个元素进行排序，从而使数据库
 * 排序成为可能。
 * @template {ALL_ARRAY_TYPES} T
 * @param {T} arr 要排序的数组
 * @returns {T} 排序后的数组
 */
mixed *sort_array( mixed *arr, string fun, object ob );
mixed *sort_array( mixed *arr, function f );
mixed *sort_array( mixed *arr, int direction );

/**
 * shuffle() - 将数组中的元素随机排列
 *
 * 随机打乱数组并返回。
 * @template {ALL_ARRAY_TYPES} T
 * @param {T} arr 要打乱的数组
 * @returns {T} 打乱后的数组
 */
mixed *shuffle(mixed *arr);

/**
 * pointerp() - 确定给定变量是否为数组
 * @param {mixed} arg 要检查的参数 
 * @returns {arg is mixed*} 如果'arg'是数组，则返回1，否则返回0。
 * @example
 * int is_array = pointerp( ({ 1, 2, 3, 4 }) ); // 1
 * int is_array = pointerp( "Foo" ); // 0
 *
 */
int pointerp( mixed arg );

/**
 * member_array()  -  返回给定项在数组或字符串中出现的索引
 *
 * 返回'item'在数组'arr'中第一次出现的索引，或者
 * 从'start'开始或之后的第一次出现。如果未找到
 * 项，则返回 -1。
 * 
 * 注意，如果第二个参数是一个字符串，第一个参数必须是一个
 * int，表示您在提供的字符串中要查找的字符。
 * @example
 * ```c
 * member_array( "red", ({ "red", "blue", "red", "green", "red", }) ) ;
 * // 0
 * 
 * member_array( "red", ({ "red", "blue", "red", "green", "red", }) , 1) ;
 * // 2
 * 
 * member_array( "blue", ({ "red", "blue", "red", "green", "red", }) , 3) ;
 * // -1
 * 
 * member_array( "purple", ({ "red", "blue", "red", "green", "red", }) ) ;
 * // -1
 * 
 * member_array('F', "Drink the FluffOS Kool-Aid!") ;
 * // 10
 * 
 * member_array('Z', "Drink the FluffOS Kool-Aid!") ;
 * // -1
 * ```
 */
varargs int member_array( mixed item, mixed * | string arr, void | int start );

/**
 * map_array() - 通过应用函数修改元素数组
 *
 * 返回一个数组，包含通过'ob->fun()'或'f'映射的'arr'项目。
 * 对'arr'中的每个元素调用该函数，并将该元素作为参数传递。
 * 如果提供了第二个参数'extra'，则在每次调用中也会传递它。
 * 主函数：
 * ```c
 * foreach (index) arr[index] = ob->fun(arr[index],extra);
 * ``` 
 * 'ob->fun(arr[.index.], extra)'返回的值替换数组中的现有元素。
 * 如果'arr'不是一个数组，则返回0。
 *
 */
mixed *map_array( mixed *arr, string fun, object ob, mixed extra... );
mixed *map_array( mixed *arr, function f, mixed extra... );

/**
 * filter_array() - 返回选择性的子数组
 *
 * filter_array() 返回一个数组，持有在数组<arr>中成功通过
 * 在对象<ob>中找到的函数<fun>的项目。对于'arr'中的每个
 * 元素，调用该函数作为参数。
 * 第二个参数<extra>及后续参数将在每次调用时传递
 * 如果给出。被认为已经成功通过<fun>（因此被包括在
 * 返回数组中）的对象是如果<fun>返回1。如果传入f，
 * 则将使用它替代ob->fun()。
 * 如果<arr>不是一个数组，则返回0。
 *
 */
mixed *filter_array( mixed *arr, string fun, object|string ob, mixed extra... );
mixed *filter_array( mixed *arr, function f, mixed extra... );

/**
 * element_of() - 从数组中随机返回一个元素
 *
 * 返回数组中的随机元素。
 *
 */
mixed element_of(mixed *arr);

/**
 * arrayp() - 确定给定变量是否为数组
 *
 * 如果'arg'是数组，则返回1，否则返回0。
 *
 * @param {mixed} arg 要检查的参数
 * @returns {arg is mixed*} 如果'arg'是数组，则返回1，否则返回0。
 * @example
 * int is_array = arrayp( ({ 1, 2, 3, 4 }) ); // 1
 * int is_array = arrayp( "Foo" ); // 0 
 */
int arrayp( mixed arg );

/**
 * allocate() - 分配数组
 *
 * 分配一个大小为<size>的数组。元素数量必须 >= 0，并且不大于系统最大值
 * （通常为 ~10000）。所有元素默认初始化为 0。
 * 
 * 如果提供了可选的第二个参数，则会将值初始化为该参数，除非
 * 第二个参数是一个函数。在这种情况下，函数将在每个数组元素
 * 上进行评估，第一个参数传递给函数为数组元素的编号。
 *
 */
varargs mixed *allocate( int size, void | mixed value );
