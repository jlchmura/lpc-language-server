// floats.h

/**
 * to_int - convert a float or buffer to an int
 *
 * If 'x' is a float, the to_int() call returns the number of type 'int'
 * that is equivalent to 'x' (with any decimal stripped off, and floored).
 * 
 * If 'x' is a buffer, the call returns the integer (in network-byte-order)
 * that is embedded in the buffer.
 * 
 * If 'x' is a string, the call will attempt to convert the string to an
 * integer. The conversion will start at the first character and stop before
 * the last non-numeric string representation of a number and return.
 * If it was unsuccessful, it will return UNDEFINED.
 *
 */
int to_int( float | string | buffer x);

/**
 * tan() - return the tangent of a float
 *
 * Returns the tangent of its argument, 'f', measured in radians.
 *
 */
float tan( float f );

/**
 * sqrt() - returns the square root of a float
 *
 * sqrt()  returns the non-negative square root of its argument, 'f'.  The
 * value of 'f' must not be negative.
 *
 */
float sqrt( float f );

/**
 * sin() - return the sine of a float
 *
 * Returns the sine of its argument, 'f', measured in radians.
 *
 */
float sin( float f );

/**
 * round() - rounds a float
 *
 * returns the rounded value of `f` as a float.
 *
 */
float round( float f );

/**
 * pow() - find an exponent of a float
 *
 * pow() returns x to the y power.  If x is 0.0, y must be positive.  If x
 * is negative, y must be an integer.
 *
 */
float pow( float x, float y );

/**
 * log() - returns the natural logarithm of a float
 *
 * Returns  the natural logarithm of its argument, 'f'.  'f' must be posi‐
 * tive.
 *
 */
float log( float f );

/**
 * floor() - round a float down to the nearest integer
 *
 * Returns  (as  a  float)  the nearest integer number equal to or smaller
 * than f.
 *
 */
float floor( float f );

/**
 * floatp() - determine whether or not a given variable is a float
 *
 * Return 1 if 'arg' is a float number and zero (0) otherwise.
 *
 */
int floatp( mixed arg );

/**
 * exp() - find e to the power of a float
 *
 * exp() returns e^f.
 *
 */
float exp( float f );

/**
 * cos() - return the cosine of a float
 *
 * Returns the cosine of its argument, 'f', measured in radians.
 *
 */
float cos( float f );

/**
 * ceil() - round a float up to the nearest integer
 *
 * Returns  (as  a  float)  the nearest integer number equal to or greater
 * than f.
 *
 */
float ceil( float f );

/**
 * atan() - return the arctangent of a float
 *
 * Returns the arctangent of its argument, 'f', measured in radians.
 *
 */
float atan( float f );

/**
 * asin() - return the arcsine of a float
 *
 * Returns the arcsine of its argument, 'f', measured in radians.
 *
 */
float asin( float f );

/**
 * acos() - return the arccosine of a float
 *
 * Returns the arccosine of its argument, 'f', measured in radians.
 *
 */
float acos( float f );

