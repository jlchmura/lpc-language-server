#ifndef __BAD_ASYNC_INCLUDE_H__
#define __BAD_ASYNC_INCLUDE_H__

// On a build without FluffOS coroutine support the scanner still produces AsyncKeyword
// and no declaration production accepts it, so this line is a parse error inside an
// include. It must be reported on the `#include` directive of whatever pulls it in.
async void broken_prototype();

#endif
