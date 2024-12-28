/** These objects must be here - they are used by the type checker for various non-primitive types */
object __LS__Array;
object __LS__Mapping;
object __LS__Object;
object __LS__Function;
object __LS__CallableFunction;
object __LS__NewableFunction;
object __LS__Int;
object __LS__ReadonlyArray;
object __LS__String;
object __LS__Closure;

// Driver Provided Defines 
// These are made available to each sourcefile
#define MUDOS                   1
#define FLUFFOS                 1
#define __GET_CHAR_IS_BUFFERED__ 1
#define __MAX_READ_FILE_SIZE__  1000000
#define __PORT__                1
#define __VERSION__             "1.0"
#define __ARCH__                "x86_64"
#define __COMPILER__            "gcc"
#define __CXXFLAGS__            "linux"
#define MUD_NAME                "FluffOS"

#define SIZEOFINT               4
#define MAX_INT                 2147483647  /* the largest integer number */
#define MIN_INT                 -2147483648 /* the smallest integer number */
#define MAX_FLOAT               1.0e+20     /* the largest (positive) float number */
#define MIN_FLOAT               0.00000     /* the smallest (positive) float number */
#define __LARGEST_PRINTABLE_STRING__ 8192
#define __CACHE_STATS__         1
#define __STRING_STATS__        1
#define __ARRAY_STATS__         1
#define __CLASS_STATS__         1
#define __CALLOUT_HANDLES__     1
#define __ARGUMENTS_IN_TRACEBACK__ 1
#define __LOCALS_IN_TRACEBACK__ 1
#define __DEBUG_MACRO__         1

/*
 * efun 定义
 * 
 * FluffOS efun 文件中的文档注释是从 FluffOS 源代码中生成的。
 * https://github.com/fluffos/fluffos/tree/master/docs
 * 
 * 请参阅 https://github.com/fluffos/fluffos/blob/master/Copyright 
 * 获取许可证/版权信息。
 */


#include "arrays.zh-cn.h"
#include "async.zh-cn.h"
#include "buffers.zh-cn.h"
#include "calls.zh-cn.h"
#include "contrib.zh-cn.h"
#include "db.zh-cn.h"
#include "ed.zh-cn.h" 
#include "external.zh-cn.h" 
#include "filesystem.zh-cn.h"
#include "floats.zh-cn.h"
#include "functions.zh-cn.h" 
#include "general.zh-cn.h"
#include "interactive.zh-cn.h"
#include "internals.zh-cn.h"
#include "mappings.zh-cn.h"
#include "misc.zh-cn.h"
#include "mudlib.zh-cn.h"
#include "numbers.zh-cn.h"
#include "objects.zh-cn.h"
#include "parsing.zh-cn.h"
#include "pcre.zh-cn.h"
#include "sockets.zh-cn.h"
#include "strings.zh-cn.h"
#include "system.zh-cn.h"

