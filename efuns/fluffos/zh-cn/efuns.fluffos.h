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

#define T_INT              "int"
#define T_STRING           "string"
#define T_ARRAY            "array"
#define T_OBJECT           "object"
#define T_MAPPING          "mapping"
#define T_FUNCTION         "function"
#define T_FLOAT            "float"
#define T_BUFFER           "buffer"
#define T_CLASS            "class"
#define T_INVALID          "*invalid*"
#define T_LVALUE           "*lvalue*"
#define T_LVALUE_BYTE      "*lvalue_byte*"
#define T_LVALUE_RANGE     "*lvalue_range*"
#define T_LVALUE_CODEPOINT "*lvalue_codepoint*"
#define T_ERROR_HANDLER    "*error_handler*"
#define T_FREED            "*freed*"
#define T_UNKNOWN          "*unknown*"

// https://github.com/fluffos/fluffos/blob/master/src/include/function.h
#define FP_LOCAL          2
#define FP_EFUN           3
#define FP_SIMUL          4
#define FP_FUNCTIONAL     5
#define FP_G_VAR          6
#define FP_L_VAR          7
#define FP_ANONYMOUS      8
#define FP_MASK           0x0f
#define FP_HAS_ARGUMENTS  0x10
#define FP_OWNER_DESTED   0x20
#define FP_NOT_BINDABLE   0x40

#define EESUCCESS         0
#define EEWOULDBLOCK      1
#define EECALLBACK        2
#define EEALREADY         3

// src/include/localtime.h
/*
 * Definitions for localtime() efun
 */
#define LT_SEC 0
#define LT_MIN 1
#define LT_HOUR 2
#define LT_MDAY 3
#define LT_MON 4
#define LT_YEAR 5
#define LT_WDAY 6
#define LT_YDAY 7
#define LT_GMTOFF 8
#define LT_ZONE 9
#define LT_ISDST 10

/* codes returned by the origin() efun */

#define ORIGIN_BACKEND "driver" /* backwards compat */
#define ORIGIN_DRIVER "driver"
#define ORIGIN_LOCAL "local"
#define ORIGIN_CALL_OTHER "call_other"
#define ORIGIN_SIMUL_EFUN "simul"
#define ORIGIN_INTERNAL "internal"
#define ORIGIN_EFUN "efun"
/* pseudo frames for call_other function pointers and efun pointer */
#define ORIGIN_FUNCTION_POINTER "function_pointer"
/* anonymous functions */
#define ORIGIN_FUNCTIONAL "functional"

#define ERR_IS_NOT 1
#define ERR_NOT_LIVING 2
#define ERR_NOT_ACCESSIBLE 3
#define ERR_AMBIG 4
#define ERR_ORDINAL 5
#define ERR_ALLOCATED 6
#define ERR_THERE_IS_NO 7
#define ERR_BAD_MULTIPLE 8
#define ERR_MANY_PATHS 9

#define EESUCCESS 1       /* Call was successful */
#define EESOCKET -1       /* Problem creating socket */
#define EESETSOCKOPT -2   /* Problem with setsockopt */
#define EENONBLOCK -3     /* Problem setting non-blocking mode */
#define EENOSOCKS -4      /* UNUSED */
#define EEFDRANGE -5      /* Descriptor out of range */
#define EEBADF -6         /* Descriptor is invalid */
#define EESECURITY -7     /* Security violation attempted */
#define EEISBOUND -8      /* Socket is already bound */
#define EEADDRINUSE -9    /* Address already in use */
#define EEBIND -10        /* Problem with bind */
#define EEGETSOCKNAME -11 /* Problem with getsockname */
#define EEMODENOTSUPP -12 /* Socket mode not supported */
#define EENOADDR -13      /* Socket not bound to an address */
#define EEISCONN -14      /* Socket is already connected */
#define EELISTEN -15      /* Problem with listen */
#define EENOTLISTN -16    /* Socket not listening */
#define EEWOULDBLOCK -17  /* Operation would block */
#define EEINTR -18        /* Interrupted system call */
#define EEACCEPT -19      /* Problem with accept */
#define EEISLISTEN -20    /* Socket is listening */
#define EEBADADDR -21     /* Problem with address format */
#define EEALREADY -22     /* Operation already in progress */
#define EECONNREFUSED -23 /* Connection refused */
#define EECONNECT -24     /* Problem with connect */
#define EENOTCONN -25     /* Socket not connected */
#define EETYPENOTSUPP -26 /* Object type not supported */
#define EESENDTO -27      /* Problem with sendto */
#define EESEND -28        /* Problem with send */
#define EECALLBACK -29    /* Wait for callback */
#define EESOCKRLSD -30    /* Socket already released */
#define EESOCKNOTRLSD -31 /* Socket not released */
#define EEBADDATA -32     /* sending data with too many nested levels */

#define ERROR_STRINGS 33 /* sizeof (error_strings) */

#define __MUD_NAME__ ""
#define __RC_STR_1__ ""
#define __MUD_LIB_DIR__ ""
#define __BIN_DIR__ ""
#define __LOG_DIR__ ""
#define __INCLUDE_DIRS__ ""
#define __RC_STR_2__ ""
#define __MASTER_FILE__ ""
#define __SIMUL_EFUN_FILE__ ""
#define __SWAP_FILE__ ""
#define __DEBUG_LOG_FILE__ ""
#define __DEFAULT_ERROR_MESSAGE__ ""
#define __DEFAULT_FAIL_MESSAGE__ ""
#define __GLOBAL_INCLUDE_FILE__ ""
#define __MUD_IP__ ""
#define __RC_WEBSOCKET_HTTP_DIR__ ""

#define RC_LAST_CONFIG_STR ""

// src/include/runtime_config.h
#define __MUD_PORT__ 1
#define __RC_INT_1__ 1
#define __TIME_TO_CLEAN_UP__ 1
#define __TIME_TO_RESET__ 1
#define __TIME_TO_SWAP__ 1
#define __COMPILER_STACK_SIZE__ 1
#define __EVALUATOR_STACK_SIZE__ 1
#define __INHERIT_CHAIN_SIZE__ 1
#define __MAX_EVAL_COST__ 1
#define __MAX_LOCAL_VARIABLES__ 1
#define __MAX_CALL_DEPTH__ 1
#define __MAX_ARRAY_SIZE__ 1
#define __MAX_BUFFER_SIZE__ 1
#define __MAX_MAPPING_SIZE__ 1
#define __MAX_STRING_LENGTH__ 1
#define __MAX_BITFIELD_BITS__ 1
#define __MAX_BYTE_TRANSFER__ 1
#define __MAX_READ_FILE_SIZE__ 1
#define __RC_INT_18__ 1
#define __SHARED_STRING_HASH_TABLE_SIZE__ 1
#define __OBJECT_HASH_TABLE_SIZE__ 1
#define __LIVING_HASH_TABLE_SIZE__ 1
#define __RC_INT_22__ 1
#define __RC_INT_23__ 1
#define __RC_GAMETICK_MSEC__ 1
#define __RC_HEARTBEAT_INTERVAL_MSEC__ 1
#define __RC_SANE_EXPLODE_STRING__ 1
#define __RC_REVERSIBLE_EXPLODE_STRING__ 1
#define __RC_SANE_SORTING__ 1
#define __RC_WARN_TAB__ 1
#define __RC_WOMBLES__ 1
#define __RC_CALL_OTHER_TYPE_CHECK__ 1
#define __RC_CALL_OTHER_WARN__ 1
#define __RC_MUDLIB_ERROR_HANDLER__ 1
#define __RC_NO_RESETS__ 0
#define __RC_LAZY_RESETS__ 1
#define __RC_RANDOMIZED_RESETS__ 1
#define __RC_NO_ANSI__ 0
#define __RC_STRIP_BEFORE_PROCESS_INPUT__ 1
#define __RC_THIS_PLAYER_IN_CALL_OUT__ 1
#define __RC_TRACE__ 1
#define __RC_TRACE_CODE__ 1
#define __RC_INTERACTIVE_CATCH_TELL__ 1
#define __RC_RECEIVE_SNOOP__ 1
#define __RC_SNOOP_SHADOWED__ 1
#define __RC_REVERSE_DEFER__ 1
#define __RC_HAS_CONSOLE__ 1
#define __RC_NONINTERACTIVE_STDERR_WRITE__ 1
#define __RC_TRAP_CRASHES__ 1
#define __RC_OLD_TYPE_BEHAVIOR__ 1
#define __RC_OLD_RANGE_BEHAVIOR__ 1
#define __RC_WARN_OLD_RANGE_BEHAVIOR__ 1
#define __RC_SUPPRESS_ARGUMENT_WARNINGS__ 1
#define __RC_ENABLE_COMMANDS_CALL_INIT__ 1
#define __RC_SPRINTF_ADD_JUSTFIED_IGNORE_ANSI_COLORS__ 1
#define __RC_APPLY_CACHE_BITS__ 1
#define __RC_CALL_OUT_ZERO_NEST_LEVEL__ 1
#define __RC_TRACE_CONTEXT__ 1
#define __RC_TRACE_INSTR__ 1
#define __RC_ENABLE_MXP__   0
#define __RC_ENABLE_GMCP__  0
#define __RC_ENABLE_ZMP__   0
#define __RC_ENABLE_MSSP__  0
#define __RC_ENABLE_MSP__   0
#define __RC_ENABLE_MSDP__  0

#define RC_LAST_CONFIG_INT 1

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

