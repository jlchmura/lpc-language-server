// mappings.h

/**
 * values() - return an array of the values from the (key, value) pairs
           in a mapping
 *
 * values() returns an array of values corresponding to the value elements
 * in the (key, value) pairs stored in the mapping m.
 * 
 * For example, if:
 * 
 * mapping m;
 * 
 * m = (["hp" : 35, "sp" : 42, "mass" : 100]);
 * 
 * then
 * 
 * values(m) == ({35, 42, 100})
 * 
 * Note: the values will be returned in the same order as the  correspond‐
 * ing keys.
 *
 */
mixed *values( mapping m );

/**
 * unique_mapping() - create a mapping from an array based on a function
 *
 * Returns a mapping built in the following manner:
 * 
 * 'ob->fun()' or 'f' is evaluated for each member of the array.  The mem‐
 * bers for  which  the  function  returns  the  same  value  are  grouped
 * together, and associated with the return value as the key.
 * 
 * The  key/value  ordering  in the returned mapping is consistent but not
 * guaranteed to not change in the future.
 *
 */
mapping unique_mapping( mixed *arr, string fun, object ob,
                          mixed extra... );
mapping unique_mapping( mixed *arr, function f, mixed extra... );

/**
 * match_path() - search a mapping for a path
 *
 * match_path()  searches a mapping for a path.  Each key is assumed to be
 * a string.  The value is  completely  arbitrary.   The  efun  finds  the
 * largest matching path in the mapping.  Keys ended in '/' are assumed to
 * match paths with character that follow the '/', i.e. /  is  a  wildcard
 * for anything below this directory.
 *
 */
mixed match_path( mapping m, string str );

/**
 * mapp() - determine whether or not a given variable is a mapping
 *
 * Return 1 if 'arg' is a mapping.
 *
 */
int mapp( mixed arg );

/**
 * map_mapping()  -  modify  an  mapping  of elements via application of a
function
 *
 * Returns an mapping with the same keys as  map  whose  items  have  been
 * mapped  throught  'ob->fun()'  or 'f'.  The function is called for each
 * element in 'map' and the return value is  put  back  in  that  spot  in
 * 'map'.   'extra' and following are passed as parameters to the function
 * after the item.
 *
 */
mapping map_mapping( mapping map,
                     string fun,
                     object ob,
                     mixed extra... );
mapping map_mapping( mapping map, function f, mixed extra... );

/**
 * map_delete()  -  remove a (key, value) pair from a mapping based on the
key
 *
 * map_delete removes the (key, value) from the mapping  m  that  has  key
 * equal to element.
 * 
 * For example, given:
 * 
 * mapping names;
 * 
 * names = ([]);
 * names["truilkan"] = "john";
 * names["wayfarer"] = "erik";
 * names["jacques"] = "dwayne";
 * 
 * Then:
 * 
 * map_delete(names,"truilkan");
 * 
 * causes the mapping 'names' to be equal to:
 * 
 * (["wayfarer" : "erik", "jacques" : "dwayne"])
 * 
 * keys(names)  will  not  contain "truilkan" after map_delete(names,"tru‐
 * ilkan") is called [unless ("truilkan", *) is subsequently added back to
 * the mapping].
 *
 */
void map_delete( mapping m, mixed element );

/**
 * keys()  -  return an array of the keys from the (key, value) pairs in a
mapping
 *
 * keys() returns an array of keys (indices) corresponding to the keys  in
 * the (key, value) pairs stored in the mapping m.
 * 
 * For example, if:
 * 
 * mapping m;
 * m = (["hp" : 35, "sp" : 42, "mass" : 100]);
 * 
 * then
 * 
 * keys(m) == ({"hp", "sp", "mass"})
 * 
 * Note:  the  keys  will not be returned in any apparent order.  However,
 * they will be returned in the same order  as  the  corresponding  values
 * (returned by the values() efun).
 *
 */
mixed *keys( mapping m );

/**
 * filter_mapping()  -  remove some elements of a mapping based on a
function
 *
 * Returns an mapping with the same keys as  map  whose  items  have  been
 * mapped  throught  'ob->fun()'  or 'f'.  The function is called for each
 * element in 'arr' and the return value is  put  back  in  that  spot  in
 * 'arr'.   'extra' and following are passed as parameters to the function
 * after the item.
 *
 */
mapping filter_mapping( mapping map,
                        string fun,
                        object ob,
                        mixed extra... );
mapping filter_mapping( mapping map, function f, mixed extra... );

/**
 * allocate_mapping() - pre-allocate space for a mapping
 *
 * Returns a mapping with space for 'size' elements preallocated.
 * 
 * For example:
 * 
 * mapping x;
 * int y = 200;
 * 
 * x = allocate_mapping(y);
 * 
 * where  y is the initial size of the mapping.  Using allocate_mapping is
 * the preferred way to initalize the mapping if you have some idea of how
 * many  elements  the map will contain (200 in this case).  The reason is
 * that allocating storage all at once is slightly more memory  efficient.
 * Thus  if  you  are using mappings to store a soul with 200 entries, the
 * above initialization would be quite appropriate.  Note, that the  above
 * initialization  does not restrict you to 200 entries.  It just that the
 * first 200 entries will be stored more efficiently.  Note: if  you  will
 * be  deleting many elements from the mapping, you should use x = ([]) to
 * initialize the mapping rather than using allocate_mapping().
 * 
 * Note: at this point in time, 'size' is meaningless, x  =  allocate_map‐
 * ping(200); is equivalent to x = ([ ]);
 * 
 * allocate_mapping(mixed *keys, mixed v):
 * - if value is an array, the returned array has keys 'keys' and values
 * 'value' (like 3.2.x's mkmapping)
 * - if it is a function, then the mapping has keys 'keys' and values
 * evaluate(value, key)
 * - otherwise, each key has the value 'value'
 *
 * allocate_mapping(0) ;
 * // ([ ])
 * 
 * allocate_mapping(25) ;
 * // ([ ])
 * 
 * allocate_mapping( ({ 1, 2, 3 }), ({ "one", "two", "three" }) )
 * // ([ 1 : "one", 2 : "two", 3 : "three" ])
 * 
 * allocate_mapping( users(), (: $1->query_name() :))
 * // ([
 * //     OBJ(karahd /std/user#9) : "Karahd",
 * //     OBJ(gesslar /std/user#2) : "Gesslar"
 * // ])
 * 
 * allocate_mapping( ({ "apple", "banana", "pear" }), 25)
 * // ([ "pear" : 25, "apple" : 25, "banana" : 25 ])
 *
 */
mapping allocate_mapping( int size );
mapping allocate_mapping(mixed *key, mixed value);

