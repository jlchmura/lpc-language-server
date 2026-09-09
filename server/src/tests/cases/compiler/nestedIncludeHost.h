#ifndef __NESTED_INCLUDE_HOST_H__
#define __NESTED_INCLUDE_HOST_H__

// A header that includes another header. Reading this one through an #include used to
// leave the parse sitting on the newline that ended the nested directive, which
// parseList() has no production for -- so the header reported a "Declaration or statement
// expected" that its own standalone parse never produced. Everything below the nested
// include must still be seen, too.
#include "includeFile.h"

#define NESTED_HOST_MACRO 42

#endif
