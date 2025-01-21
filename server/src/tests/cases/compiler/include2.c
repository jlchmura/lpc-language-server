// @files: includeFile.h

test() {}

// this include does not have a newline after it, which is legal
// https://github.com/jlchmura/lpc-language-server/issues/184

#include "includeFile.h"