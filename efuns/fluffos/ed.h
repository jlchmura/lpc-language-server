// ed.h

/**
 * query_ed_mode() - find out the status of the current ed session
 *
 * Finds  the  status  of  the  ed  session for the current object, if one
 * exists.  It returns:
 * 
 * 0   - the current object is at a normal ed prompt (':')
 * 
 * -1  - the current object isn't in ed
 * 
 * -2  - the current object is at the more prompt in the middle of help
 * 
 * >0  - the object is at a prompt for a line.  The  number  is  the  line
 * number.
 *
 */
int query_ed_mode();

/**
 * ed_start() - start an ed session
 *
 * This efun is available only if __OLD_ED__ is not defined.
 * 
 * The  internal editor is started, optionally loading 'file' for editing.
 * The resulting output is returned.  The editor session  remains  active,
 * and further calls to ed_cmd() can be used to send commands to it.
 * 
 * If restricted is 1, the commands that change which file is being edited
 * will be disabled.
 * 
 * Only one ed session can be active per object at a time.
 *
 */
string ed_start(void|string file, void|int restricted);

/**
 * ed_cmd() - send a command to an ed session
 *
 * This efun is available only if __OLD_ED__ is not defined.
 * 
 * The  command  'cmd' is sent to the active ed session, and the resulting
 * output is returned.
 *
 */
string ed_cmd(string cmd);

