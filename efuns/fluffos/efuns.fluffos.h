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

#define __MAX_READ_FILE_SIZE__ 1000000
#define __PORT__ 1
#define __VERSION__ "1.0"
#define __ARCH__ "x86_64"

#define MAX_INT                 2147483647  /* the largest integer number */
#define MIN_INT                 -2147483648 /* the smallest integer number */
#define MAX_FLOAT               1.0e+20     /* the largest (positive) float number */
#define MIN_FLOAT               0.00000     /* the smallest (positive) float number */

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

