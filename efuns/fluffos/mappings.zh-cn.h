// mappings.h

/**
 * values() - 返回映射中 (key, value) 对的值数组
 *
 * values() 返回一个数组，包含映射 m 中存储的 (key, value) 对的值元素。
 * 
 * 例如，如果：
 * 
 * mapping m;
 * 
 * m = (["hp" : 35, "sp" : 42, "mass" : 100]);
 * 
 * 那么
 * 
 * values(m) == ({35, 42, 100})
 * 
 * 注意：返回的值将与相应键的顺序相同。
 *
 */
mixed *values( mapping m );

/**
 * unique_mapping() - 基于函数从数组创建映射
 *
 * 返回一个按照以下方式构建的映射：
 * 
 * 'ob->fun()' 或 'f' 将对数组的每个成员进行评估。对于
 * 函数返回相同值的成员，将它们分组在一起，并将返回值作为键。
 * 
 * 返回的映射中的键/值顺序是一致的，但不能保证将来不会改变。
 *
 */
mapping unique_mapping( mixed *arr, string fun, object ob,
                          mixed extra... );
mapping unique_mapping( mixed *arr, function f, mixed extra... );

/**
 * match_path() - 在映射中搜索路径
 *
 * match_path() 在映射中搜索路径。每个键假定为字符串。
 * 值是完全任意的。该 efun 在映射中找到最大的匹配路径。
 * 以 '/' 结尾的键假定与 '/' 后面跟随的字符匹配，即 / 是
 * 该目录下任何内容的通配符。
 *
 */
mixed match_path( mapping m, string str );

/**
 * mapp() - 确定给定变量是否为映射
 *
 * 如果 'arg' 是一个映射，则返回 1。
 *
 */
int mapp( mixed arg );

/**
 * map_mapping() - 通过应用函数修改映射中的元素
 *
 * 返回一个与 map 具有相同键的映射，其中的项目已通过 'ob->fun()' 
 * 或 'f' 映射。该函数对 'map' 中的每个元素调用，返回值会
 * 重新放回该位置。'extra' 和后续参数作为参数传递给函数
 * 在项目之后。
 *
 */
mapping map_mapping( mapping map,
                     string fun,
                     object ob,
                     mixed extra... );
mapping map_mapping( mapping map, function f, mixed extra... );

/**
 * map_delete() - 基于键从映射中删除 (key, value) 对
 *
 * map_delete 从映射 m 中删除具有键等于 element 的 (key, value) 对。
 * 
 * 例如，给定：
 * 
 * mapping names;
 * 
 * names = ([]);
 * names["truilkan"] = "john";
 * names["wayfarer"] = "erik";
 * names["jacques"] = "dwayne";
 * 
 * 然后：
 * 
 * map_delete(names,"truilkan");
 * 
 * 将导致映射 'names' 等于：
 * 
 * (["wayfarer" : "erik", "jacques" : "dwayne"])
 * 
 * 在调用 map_delete(names,"truilkan") 之后，keys(names) 将
 * 不包含 "truilkan" [除非后续再次将 ("truilkan", *) 添加到
 * 映射中]。
 *
 */
void map_delete( mapping m, mixed element );

/**
 * keys() - 返回映射中 (key, value) 对的键数组
 *
 * keys() 返回一个与映射 m 中存储的 (key, value) 对的键相对应的
 * 键的数组。
 * 
 * 例如，如果：
 * 
 * mapping m;
 * m = (["hp" : 35, "sp" : 42, "mass" : 100]);
 * 
 * 那么
 * 
 * keys(m) == ({"hp", "sp", "mass"})
 * 
 * 注意：键不会以任何明显的顺序返回。但是，它们将与对应的值
 * （由 values() efun 返回）按相同顺序返回。
 *
 */
mixed *keys( mapping m );

/**
 * filter_mapping() - 根据函数移除映射中的某些元素
 *
 * 返回一个与 map 具有相同键的映射，其中的项目已通过
 * 'ob->fun()' 或 'f' 映射。该函数对 'arr' 中的每个元素调用，
 * 返回值会重新放回该位置。'extra' 和后续参数作为参数
 * 传递给函数在项目之后。
 *
 */
mapping filter_mapping( mapping map,
                        string fun,
                        object ob,
                        mixed extra... );
mapping filter_mapping( mapping map, function f, mixed extra... );

/**
 * allocate_mapping() - 预分配映射的空间
 *
 * 返回一个预分配了 'size' 元素空间的映射。
 * 
 * 例如：
 * 
 * mapping x;
 * int y = 200;
 * 
 * x = allocate_mapping(y);
 * 
 * 其中 y 是映射的初始大小。如果你对映射将包含的元素数量
 * （在这种情况下为 200）有一些了解，使用 allocate_mapping
 * 是初始化映射的首选方式。原因是一次性分配存储在内存
 * 上是稍微更高效的。因此如果你正在使用映射来存储 200 个条目的
 * 灵魂，上述初始化就非常合适。注意，上述初始化并不限制你只
 * 能有 200 个条目。它只是说前 200 个条目将存储得更有效。
 * 注意：如果你将从映射中删除许多元素，你应该使用 x = ([])
 * 来初始化映射，而不是使用 allocate_mapping()。
 * 
 * 注意：在这个时候，'size' 是没有意义的，x = allocate_mapping(200);
 * 相当于 x = ([ ]); 
 * 
 * allocate_mapping(mixed *keys, mixed v):
 * - 如果值是一个数组，返回的数组具有键 'keys' 和值
 * 'value'（像 3.2.x 的 mkmapping）
 * - 如果它是一个函数，则映射具有键 'keys' 和值
 * evaluate(value, key)
 * - 否则，每个键都有值 'value'
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
