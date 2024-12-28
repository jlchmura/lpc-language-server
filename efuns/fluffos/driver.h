/* These are not automatically provided by the driver */
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
