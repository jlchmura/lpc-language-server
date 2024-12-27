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
 * efun definitions
 * 
 * The doc comments in the FluffOS efun files were created 
 * from the FluffOS source code.
 * https://github.com/fluffos/fluffos/tree/master/docs
 * 
 * See the https://github.com/fluffos/fluffos/blob/master/Copyright 
 * for license/copyright info. 
 */

#include "arrays.h"
#include "async.h"
#include "buffers.h"
#include "calls.h"
#include "contrib.h"
#include "db.h"
#include "ed.h" 
#include "external.h" 
#include "filesystem.h"
#include "floats.h"
#include "functions.h" 
#include "general.h"
#include "interactive.h"
#include "internals.h"
#include "mappings.h"
#include "misc.h"
#include "mudlib.h"
#include "numbers.h"
#include "objects.h"
#include "parsing.h"
#include "pcre.h"
#include "sockets.h"
#include "strings.h"
#include "system.h"

