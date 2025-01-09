// arrays.h

#undef ALL_ARRAY_TYPES
#define ALL_ARRAY_TYPES string*|int*|float*|object*|mixed*|function*
#undef ALL_PRIMITIVE_TYPES
#define ALL_PRIMITIVE_TYPES string|int|float|object|mixed|function

/**
 * unique_array() - partitions an array of objects into groups
 *
 * Groups objects together for which the 'separator' function returns  the
 * same  value.  'obarr'  should  be  an array of objects, other types are
 * ignored.  The 'separator' function is called only once in  each  object
 * in  'obarr'.   THe  optional  'skip'  parameter enables a pre-filter on
 * 'obarr', skipping elements which match 'skip'.  The second form works a
 * bit differently.  each element of the array is passed to f and the ele‐
 * ments are partitioned based on the return value of f.   In  particular,
 * the array does not need to be composed of objects.
 *
 * @template {object} T
 * @param {T*} obarr The array of objects to partition
 * @param separator The function to use to partition the array
 * @param {T} skip The value to skip
 * @returns {<T*>*} The partitioned array
 */
varargs mixed unique_array(object *obarr, string separator, mixed skip);

/**
 * @template T, Y
 * @callback uniqueArrayCallback
 * @param {T} element The element to test
 * @returns {Y} The map callback return value
 */


/**
 * unique_array() - partitions an array of objects into groups
 *
 * Groups objects together for which the 'separator' function returns  the
 * same  value.  'obarr'  should  be  an array of objects, other types are
 * ignored.  The 'separator' function is called only once in  each  object
 * in  'obarr'.   THe  optional  'skip'  parameter enables a pre-filter on
 * 'obarr', skipping elements which match 'skip'.  The second form works a
 * bit differently.  each element of the array is passed to f and the ele‐
 * ments are partitioned based on the return value of f.   In  particular,
 * the array does not need to be composed of objects.
 *
 * @template T
 * @param {T*} arr The array of objects to partition
 * @param {uniqueArrayCallback<T,Y>} f The function to use to partition the array
 * @param {T|void} skip The value to skip
 * @returns {<T*>*} The partitioned array
 */
varargs <mixed*>* unique_array(mixed *arr, function f, mixed skip );

/**
 * sort_array() - sort an array
 *
 * The  first  form  returns an array with the same elements as 'arr', but
 * quicksorted in ascending order according to the rules  in  'ob->fun()'.
 * 'ob->fun()'  will  be  passed  two  arguments for each call.  It should
 * return -1, 0, or 1, depending on the relationship of the two  arguments
 * (lesser, equal to, greater than).
 * 
 * The second form does the same thing but allows a function pointer to be
 * used instead.
 * 
 * The third form returns an array with the same elements  as  'arr',  but
 * quicksorted using built-in sort routines.  A 'direction' of 1 or 0 will
 * quicksort in ascending order, while a 'direction' of -1 will  quicksort
 * in  descending  order.   A  limitation of the built-in sort routines is
 * that the array must be homogeneous, composed entirely of a single type,
 * where  that type is string, int, or float.  Arrays of arrays are sorted
 * by sorting based on the first element, making database sorts possible.
 * @template {ALL_ARRAY_TYPES} T
 * @param {T} arr The array to sort
 * @returns {T} The sorted array
 */
mixed *sort_array( mixed *arr, string fun, object ob );
mixed *sort_array( mixed *arr, function f );
mixed *sort_array( mixed *arr, int direction );

/**
 * shuffle() - Rearrange the elements in the array in random order
 *
 * Shuffle the array and return.
 * @template {ALL_ARRAY_TYPES} T
 * @param {T} arr The array to shuffle
 * @returns {T} The shuffled array
 */
mixed *shuffle(mixed *arr);

/**
 * pointerp() - identifies whether a given variable is an array
 * @param {mixed} arg The argument to check 
 * @returns {arg is mixed*} 1 if 'arg' is an array, otherwise returns 0.
 * @example
 * int is_array = pointerp( ({ 1, 2, 3, 4 }) ); // 1
 * int is_array = pointerp( "Foo" ); // 0
 *
 */
int pointerp( mixed arg );

/**
 * member_array()  -  returns  index of an occurence of a given item in an
array or string
 *
 * Returns the index of the first occurence of 'item' in array  'arr',  or
 * the  first  occurence  at  or after 'start'.  If the item is not found,
 * then -1 is returned.
 * 
 * Note, if the second argument is a string, the first parameter must be an int
 * representing the character you are looking for in the provided string.
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
 * map_array() - modify an array of elements via application of a function
 *
 * Returns  an  array  holding  the  items  of 'arr' mapped through either
 * 'ob->fun()' or 'f'.  The function is called for each element  in  'arr'
 * with that element as a parameter. A second parameter 'extra' is sent in
 * each call if given.  Principal function:
 * ```c
 * foreach (index) arr[index] = ob->fun(arr[index],extra);
 * ```
 * The value returned by 'ob->fun(arr[.index.], extra)' replaces the existing
 * element in the array. If 'arr' is not an array, then 0 will be returned.
 *
 */
mixed *map_array( mixed *arr, string fun, object ob, mixed extra... );
mixed *map_array( mixed *arr, function f, mixed extra... );

/**
 * filter_array() - return a selective sub-array
 *
 * filter_array() returns an array holding the items of <arr> which passed
 * sucessfully through the function <fun> found in object <ob>.  The func‐
 * tion  <fun>  is  called  for each element in <arr> with that element as
 * parameter.  The second parameter <extra> and following  parameters  are
 * sent  in  each  call  if given.  An object is considered to have passed
 * sucessfully through <fun> (and hence is included in the  return  array)
 * if  <fun>  returns  1.  If f is passed it is used instead of ob->fun().
 * If <arr> is not an array, then 0 will be returned.
 *
 */
mixed *filter_array( mixed *arr, string fun, object|string ob, mixed extra... );
mixed *filter_array( mixed *arr, function f, mixed extra... );

/**
 * element_of() - Return an element randomly from the array
 *
 * Returns a random element from an array.
 *
 */
mixed element_of(mixed *arr);

/**
 * arrayp() - identifies whether a given variable is an array
 *
 * Returns 1 if 'arg' is an array, otherwise returns 0.
 * 
 * @param {mixed} arg The argument to check
 * @returns {arg is mixed*} 1 if 'arg' is an array, otherwise returns 0.
 * @example
 * int is_array = arrayp( ({ 1, 2, 3, 4 }) ); // 1
 * int is_array = arrayp( "Foo" ); // 0  
 */
int arrayp( mixed arg );

/**
 * allocate() - allocate an array
 *
 * Allocate an array of <size> elements. The number of elements must be
 * >= 0 and not bigger than a system maximum (usually ~10000). All elements
 * are initialized to 0 by default.
 * 
 * If the optional second argument is provided, the values are initialized
 * to that argument, unless the second argument is a functional. In that case,
 * the functional will be evaluated for each array element, with the first
 * argument passed to the functional being the number of the array element.
 *
 */
varargs mixed *allocate( int size, void | mixed value );

