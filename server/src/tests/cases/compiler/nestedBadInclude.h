#ifndef __NESTED_BAD_INCLUDE_H__
#define __NESTED_BAD_INCLUDE_H__

// Pulls in a header that does not parse. The error is reported on whatever top-level
// #include reached this chain, but it belongs to badParseInclude.h -- that is the file the
// related info must point at.
#include "badParseInclude.h"

#endif
