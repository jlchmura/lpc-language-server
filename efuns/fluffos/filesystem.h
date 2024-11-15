// filesystem.h

/**
 * write_file() - appends a string to a file
 *
 * Append  the string 'str' into the file 'file'. Returns 0 or 1 for fail‐
 * ure or success.  If flag is 1, write_file overwrites instead of append‐
 * ing.
 *
 */
varargs int write_file( string file, string str, int flag );

/**
 * write_bytes() - writes a contiguous series of bytes to a file
 *
 * This  function  writes  the  bytes  in  'series' into the file named by
 * 'path' beginning at byte # 'start'.  It returns zero (0) upon  failure,
 * 1 otherwise.
 *
 */
int write_bytes( string path, int start, string series );

/**
 * stat() - returns information pertaining to a file or a directory
 *
 * If  str  is  the  name of a regular file (not a directory), then stat()
 * will return an array of information pertaining to that file.  The  form
 * of the array is as follows:
 * 
 * ({ file_size, last_time_file_touched, time_object_loaded, time_file_created })
 * 
 * If stat is called on a directory (not a regular file), or with a second
 * argument of -1, then stat() behaves identically to get_dir(3).
 *
 * @param {string} str - the file or directory to get information about
 * @param {int} flag defaults 0, if 0, return an array of information, if -1, return an array of subarrays
 */
mixed stat( string str, int flag );

/**
 * rmdir() - remove a directory
 *
 * Remove directory 'dir'.
 *
 */
int rmdir( string dir );

/**
 * rm() - remove a file
 *
 * Remove file 'file'. Returns 0 for failure and 1 for success.
 *
 */
int rm( string file );

/**
 * rename() - rename a file
 *
 * Renames the file <src> to <dst>.
 *
 */
int rename( string src, string dst );

/**
 * read_file() - read a file into a string
 *
 * Read  a  line  of text from a file into a string.  The second and third
 * arguments are optional.  If only the first argument is  specified,  the
 * entire file is returned (as a string).
 * 
 * The  start_line  is the line number of the line you wish to read.  This
 * routine will return 0 if you try to read past the end of the  file,  or
 * if you try to read from a nonpositive line.
 *
 */
varargs string read_file( string file, int start_line, int number_of_lines );

/**
 * read_bytes()  -  reads  a contiguous series of bytes from a file into a
string
 *
 * This function reads 'length' bytes beginning at byte # 'start'  in  the
 * file  named  'path'.   The  bytes  are returned as a string.  Note that
 * (start + length) must  not  be  past  the  end  of  the  file  or  else
 * read_bytes  will  fail.  If the second and third arguments are omitted,
 * the entire file is returned.
 *
 */
string read_bytes( string path, int start, int length );

/**
 * mkdir() - make a directory
 *
 * Creates the specified directory.  Returns 1 if successful, 0 if not.
 *
 */
int mkdir( string directory );

/**
 * link() - link a file to another
 *
 * Creates  a  link  <reference> to the file <original>.  This efun causes
 * valid_link(original, reference) to be called in the master object.   If
 * valid_link() returns 0, the link() call fails.  If valid_link() returns
 * 1 then the link() suceeds iff rename() would succeed if called with the
 * same arguments.
 * 
 * Note: This efun creates a hard link, not a symbolic one.
 * https://www.geeksforgeeks.org/difference-between-hard-link-and-soft-link/
 *
 */
void link( string original, string reference );

/**
 * get_dir() - returns information pertaining to a filesystem directory
 *
 * If  'dir' is a filename ('*' and '?' wildcards are supported), an array
 * of strings is returned containing all filenames that match the specifi‐
 * cation.   If 'dir' is a directory name (ending with a slash--ie: "/u/",
 * "/adm/", etc), all filenames in that directory are returned.
 * 
 * If called with a second argument equal to -1, get_dir  will  return  an
 * array of subarrays, where the format of each subarray is:
 * 
 * ({ filename, size_of_file, last_time_file_touched })
 * 
 * Where  filename  is  a  string and last_time_file_touched is an integer
 * being number of seconds since January 1, 1970 (same format as time(3)).
 * The  size_of_file  element  is  the  same  value  that  is  returned by
 * file_size(3); the size of the file in bytes, or -2 if it's a directory.
 * 
 * @param {string} dir - the directory to get information about
 * @param {int} flag defaults 0, if 0, return an array of strings, if -1, return an array of subarrays
 */
varargs mixed *get_dir(string dir, int flag);

/**
 * file_size() - get the size of a file
 *
 * file_size()  returns  the  size of file <file> in bytes.  Size -1 indi‐
 * cates that <file> either does not exist, or that it is not readable  by
 * you. Size -2 indicates that <file> is a directory.
 *
 */
int file_size( string file );

/**
 * cp() - copy a file
 *
 * Copies the file <src> to the file <dst>.
 *
 */
int cp( string src, string dst );

