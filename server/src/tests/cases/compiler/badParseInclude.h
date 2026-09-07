#ifndef __BAD_PARSE_INCLUDE_H__
#define __BAD_PARSE_INCLUDE_H__

// A LEXICAL error, so it fails to parse regardless of which language features the build
// supports. The first version of this fixture used `async void broken_prototype();`, which
// only fails on a build WITHOUT FluffOS coroutine support -- on a build that has them it
// parses cleanly, there is no error to report, and the test that asserts the `#include`
// line is flagged fails. Do not reintroduce a feature-dependent construct here.
int 1bad();

#endif
