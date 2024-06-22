/**
 * Allocate an array.
 *
 * Allocate an array of <size> elements. The number of elements must be
 * >= 0 and not bigger than a system maximum (usually ~10000). All elements
 * are initialized to 0 by default.
 *
 * If the optional second argument is provided, the values are initialized
 * to that argument, unless the second argument is a functional. In that case,
 * the functional will be evaluated for each array element, with the first
 * argument passed to the functional being the number of the array element.
 * @example
 * allocate( 5, (: $1 + 3 :) ) => ({ 3, 4, 5, 6, 7 })
 * @param {int} size The size of the array to allocate.
 * @param {void | mixed} value (Optional) The value to initialize each element of the array to,
 *                             or a functional to be evaluated for each element.
 * @return {mixed *} The newly allocated array with initialized values.
 */
varargs mixed *allocate(int size, void | mixed value);

/**
 * Identifies whether a given variable is an array.
 *
 * Returns 1 if 'arg' is an array, otherwise returns 0.
 *
 * @param {mixed} arg The variable to check.
 * @return {int} 1 if 'arg' is an array, otherwise 0.
 * @example int is_array = arrayp( ({ 1, 2, 3, 4 }) ); // 1
 * @example int is_array = arrayp( "Foo" ); // 0
 * @see mapp(3), stringp(3), objectp(3), intp(3), bufferp(3), floatp(3),
 *      functionp(3), nullp(3), undefinedp(3), errorp(3), pointerp(3)
 */
int arrayp(mixed arg);

/**
 * Return an element randomly from the array.
 *
 * Returns a random element from an array 'arr'. If the array is empty,
 * the behavior is undefined.
 *
 * @param {mixed *} arr The array to select a random element from.
 * @return {mixed} A random element from the array.
 * @example mixed random_element = element_of( ({ "apple", "banana", "cherry" }) );
 */
mixed element_of(mixed *arr);

/**
 * Return a selective sub-array based on a filter function.
 *
 * filter_array() returns an array holding the items of 'arr' which passed
 * successfully through the function 'fun' found in object 'ob'. The function
 * 'fun' is called for each element in 'arr' with that element as the parameter.
 * The second parameter 'extra' and following parameters are sent in each call
 * if given. An object is considered to have passed successfully through 'fun'
 * (and hence is included in the return array) if 'fun' returns 1. If 'f' is
 * passed it is used instead of 'ob->fun()'. If 'arr' is not an array, then 0
 * will be returned.
 *
 * @param {mixed *} arr The array to filter.
 * @param {string | function} fun The function name in 'ob' or a function pointer to use for filtering.
 * @param {object | string} ob The object in which the filter function is located, or the object name as a string.
 * @param {mixed} extra Optional additional arguments to pass to the filter function.
 * @return {mixed *} An array of elements that passed the filter function.
 * @example mixed *filtered = filter_array( ({ 1, 2, 3, 4 }), "is_even", this_object() );
 * @see sort_array(), map_array(), filter(), map()
 */
varargs mixed *filter_array(mixed *arr, mixed fun, mixed ob, mixed extra, ...);

/**
 * Modify an array of elements via application of a function.
 *
 * map_array() returns an array holding the items of 'arr' mapped through either
 * 'ob->fun()' or 'f'. The function is called for each element in 'arr'
 * with that element as a parameter. A second parameter 'extra' and following parameters
 * are sent in each call if given. The value returned by 'ob->fun(arr[index], extra)'
 * or 'f(arr[index], extra, ...)' replaces the existing element in the array.
 * If 'arr' is not an array, then 0 will be returned.
 *
 * @param {mixed *} arr The array to map.
 * @param {string | function} fun The function name in 'ob' or a function pointer to use for mapping.
 * @param {object | mixed} ob The object in which the mapping function is located, or the first extra parameter if 'fun' is a function pointer.
 * @param {mixed} extra Optional additional arguments to pass to the mapping function.
 * @return {mixed *} An array of elements that have been mapped through the function.
 * @example mixed *mapped = map_array( ({ 1, 2, 3, 4 }), "add_one", this_object() );
 * @see filter_array(), sort_array(), map(), filter()
 */
varargs mixed *map_array(mixed *arr, mixed fun, mixed ob, mixed extra, ...);

/**
 * Returns the index of an occurrence of a given item in an array or string.
 *
 * member_array() returns the index of the first occurrence of 'item' in array 'arr',
 * or the first occurrence at or after 'start'. If the item is not found, then -1 is returned.
 * Note, if the second argument is a string, the first parameter must be an int
 * representing the character you are looking for in the provided string.
 *
 * @param {mixed} item The item to search for in the array or string.
 * @param {mixed * | string} arr The array or string to search within.
 * @param {void | int} start The index to start the search from (optional).
 * @return {int} The index of the first occurrence of 'item', or -1 if not found.
 * @example int index = member_array( "red", ({ "red", "blue", "red", "green", "red", }) );
 */
int member_array(mixed item, mixed * | string arr, void | int start);

/**
 * Identifies whether a given variable is an array.
 *
 * Returns 1 if 'arg' is an array, otherwise returns 0.
 *
 * @param {mixed} arg The variable to check.
 * @return {int} 1 if 'arg' is an array, otherwise 0.
 * @example int is_array = pointerp( ({ 1, 2, 3, 4 }) ); // 1
 * @example int is_array = pointerp( "Foo" ); // 0
 * @see mapp(3), stringp(3), objectp(3), intp(3), bufferp(3), floatp(3),
 *      functionp(3), nullp(3), undefinedp(3), errorp(3), arrayp(3)
 */
int pointerp(mixed arg);

/**
 * Rearrange the elements in the array in random order.
 *
 * shuffle() takes an array 'arr' and rearranges its elements in random order.
 * The function returns the shuffled array. The original array is not modified.
 *
 * @param {mixed *} arr The array to shuffle.
 * @return {mixed *} The shuffled array.
 * @example mixed *shuffled_array = shuffle( ({ 1, 2, 3, 4, 5 }) );
 */
mixed *shuffle(mixed *arr);

/**
 * Sort an array using a comparison function in an object.
 *
 * This form returns an array with the same elements as 'arr', but
 * quicksorted in ascending order according to the rules in 'ob->fun()'.
 * 'ob->fun()' will be passed two arguments for each call. It should
 * return -1, 0, or 1, depending on the relationship of the two arguments
 * (lesser, equal to, greater than).
 *
 * @param {mixed *} arr The array to sort.
 * @param {string} fun The name of the function to use for sorting.
 * @param {object} ob The object on which the sort function will be called.
 * @return {mixed *} The sorted array.
 */
 mixed *sort_array(mixed *arr, string fun, object ob);

 /**
  * Sort an array using a function pointer.
  *
  * This form does the same thing as the first but allows a function pointer
  * to be used instead. The function pointed to by 'f' will be called with two
  * arguments for each comparison and should return -1, 0, or 1.
  *
  * @param {mixed *} arr The array to sort.
  * @param {function} f The function pointer to use for sorting.
  * @return {mixed *} The sorted array.
  */
 mixed *sort_array(mixed *arr, function f);
 
 /**
  * Sort an array using built-in sort routines.
  *
  * This form returns an array with the same elements as 'arr', but
  * quicksorted using built-in sort routines. A 'direction' of 1 or 0 will
  * quicksort in ascending order, while a 'direction' of -1 will quicksort
  * in descending order. The array must be homogeneous, composed entirely of
  * a single type (string, int, or float). Arrays of arrays are sorted by
  * sorting based on the first element.
  *
  * @param {mixed *} arr The array to sort.
  * @param {int} direction The direction to sort in (1 or 0 for ascending, -1 for descending).
  * @return {mixed *} The sorted array.
  */
mixed *sort_array(mixed *arr, int direction);

/**
 * Partitions an array into groups based on a separator function or a custom function.
 *
 * unique_array() groups objects or elements together for which the 'separator' function
 * (when applied to objects) or the custom function 'f' (for mixed arrays) returns the same value.
 * For objects, 'obarr' should be an array of objects; other types are ignored. The 'separator'
 * function is called only once for each object in 'obarr'. The optional 'skip' parameter allows
 * pre-filtering on 'obarr', skipping elements which match 'skip'. In the second form, each element
 * of the array 'arr' is passed to 'f', and the elements are partitioned based on the return value
 * of 'f'. This allows for flexibility in the types of elements within 'arr'.
 *
 * @param {object * | mixed *} arr The array of objects or mixed elements to partition.
 * @param {string | function} separator_or_f The function name as a string to use as a separator for objects,
 *                                           or a function pointer for partitioning mixed arrays.
 * @param {void | mixed} skip (Optional) A value to skip during partitioning.
 * @return {mixed *} An array of arrays, each sub-array containing elements that were grouped together.
 * @example mixed *grouped_objects = unique_array( ({ obj1, obj2, obj3 }), "get_color", 0 );
 * @example mixed *grouped_elements = unique_array( ({ 1, 2, 3, 4 }), (: $1 % 2 :), 0 );
 */
varargs mixed *unique_array(mixed *arr, mixed separator_or_f, void | mixed skip);
