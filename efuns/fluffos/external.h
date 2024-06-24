// external.h

/**
 * external_start() - execute a shell command external to the driver
 *
 * Execute a shell command external to the driver.
 * 
 * Commands that you would like to execute must be added to the runtime config.
 * The enumerated commands may then be invoked by their number as the first
 * argument to external_start `external_index`.
 * 
 * This function returns the socket number which you should record for later
 * processing of the results from the external command.
 * 
 * `args` - An array of the arguments passed to the external command.
 * `read_call_back` - As data becomes available, this function will be called
 * with a string containing that data.
 * `write_call_back` - I am not 100% sure what would be written to the external
 * command, but, this is a required parameter.
 * `close_call_back` - When the socket closes, this function is called.
 *
 * This is a very basic example using the information provided in this document
 *
 */
int external_start(int external_index,
                   string *args,
                   string|function read_call_back,
                   string|function write_call_back,
                   string|function close_call_back);

