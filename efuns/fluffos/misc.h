// test_bit.md.h

/**
 * test_bit
 * set_bit() - set a bit in a bitstring
 *
 * Return 0 or 1 of bit 'n' was set in string 'str'.
 *
 */
int test_bit( string str, int n );

// test_load.md.h

/**
 * test_load
 * test_load - test if a file is loadable
 *
 * Tests if a file is loadable. Will return 1 if a file is loadable,
otherwise 0. If a file attempting to be loaded contains errors,
they will be reported, in which case, you may need to wrap the
function call in a catch statement to retrieve the 0 result.
 *
 */
int test_load( string filename );

