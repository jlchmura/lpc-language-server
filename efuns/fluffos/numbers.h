// numbers.h

/**
 * to_float - convert an int to a float
 *
 * The  to_float() call returns the number of type 'float' that is equiva‐
 * lent to the int 'i'.
 *
 */
float to_float(int i);
float to_float(string i);

/**
 * secure_random() - return a pseudo-random number, this should be
unpredictable, but maybe slightly slow.
 *
 * Return a cryptographically secure random number from the range [0 .. (n -1)] (inclusive).
 * 
 * On Linux & OSX, this function explicitly use randomness from /dev/urandom,
 * on windows it is implementation defined.
 *
 */
int secure_random( int n );

/**
 * random() - return a pseudo-random number, this is suitable for general
simulation, but may be predictable.
 *
 * Return a pseudo-random number from the range [0 .. (n -1)] (inclusive).
 *
 */
int random( int n );

/**
 * intp() - determine whether or not a given variable is an integer
 *
 * Return 1 if 'arg' is an integer number and zero (0) otherwise.
 *
 */
int intp( mixed arg );

