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


/**
 * set_notify_destruct() - et the object to be notified when it is destructed
 * @param flag If the flag is set to 1, the object will
 *  receive a call to the function on_destruct() when it is destructed. If the
 *  flag is set to 0, the object will not receive this notification.
 * @details
 *  Toggles a flag in an object that determines whether or not it will be
 *  notified when it is destructed. If the flag is set to 1, the object will
 *  receive a call to the function on_destruct() when it is destructed. If the
 *  flag is set to 0, the object will not receive this notification.
 *  Objects do not receive this notification by default. To receive the call to
 *  on_destruct(), the object must call set_notify_destruct(1) at some point
 *  during its lifetime.
 *  The set_notify_destruct() efun may only be called from within the object
 *  that would like to receive the notification.
 */
void set_notify_destruct(int flag);