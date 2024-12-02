// mudlib.h

/**
 * wizardp()  - determines if a given object had enable_wizard() performed
in it
 *
 * Returns 1 if the arg had enable_wizard() performed on it.
 *
 */
int wizardp( object );

/**
 * seteuid() - set the effective user id (euid) of an object
 *
 * Set effective uid to 'str'.  valid_seteuid() in master.c controls which
 * values the euid of an object may be set to.
 * 
 * When this value is 0, then the current object's uid can be  changed  by
 * export_uid(), and only then.
 * 
 * But,  when  the  value is 0, no objects can be loaded or cloned by this
 * object.
 *
 */
int seteuid( string str );

/**
 * set_privs() - set the privs string for an object
 *
 * Sets the privs string for 'ob' to 'privs'.
 * 
 * This efun is only available if PRIVS is defined at driver compile time.
 *
 */
void set_privs( object ob, string privs );

/**
 * set_living_name() - set a living name for a living object
 *
 * Set  a  living  name  on  an object that is living. After this has been
 * done, the object can be found with "find_living()".
 *
 */
void set_living_name( string name );

/**
 * set_light() - update or query an object's light level
 *
 * Passing  <light_level_adjustment>  as  0  queries  the object's current
 * light level.  A positive number will increase the light level, while  a
 * negative number will decrease the light level.
 *
 */
int set_light( int light_level_adjustment );

/**
 * set_author - set the author associated with an object.
 *
 * Every object has both an author and a domain associated with it for the
 * purposes of tracking statistics for authors and domains.   Domains  may
 * only  be  set  in  the  master  object function domain_file(4), however
 * authors are different.  They can be initialized to some  default  value
 * by  author_file(4)  in the master object, but can also be changed using
 * the set_author efun.
 * 
 * set_author changes the author of the object that it is  called  within.
 * That  author will get credit for all future actions of that object that
 * affect mudlib statistics.  Note that this may cause some weird  numbers
 * to occur in the categories "objects" and "array_size", since the object
 * may have initialized arrays or been created under the original author's
 * credit,  but  it could be destructed or free the arrays that it's using
 * under another author, thus reducing numbers from a  count  that  didn't
 * have  those  same  numbers added previously.  To rememdy this, only use
 * set_author within create(4), and use it before any arrays are allocated
 * if at all possible.
 *
 */
void set_author( string author );

/**
 * query_privs() - return the privs string for an object
 *
 * Returns the privs string for an object.  The privs string is determined
 * at compile time via a call to privs_file() in the  master  object,  and
 * changeable via the set_privs() efun.
 * 
 * This efun is only available if PRIVS is defined at driver compile time.
 *
 */
varargs string query_privs( object ob );

/**
 * livings() - return an array of all living objects
 *
 * Returns  an  array of pointers to all living objects (objects that have
 * had enable_commands() called in them).
 *
 */
object *livings( void );

/**
 * living() - detects whether or not a given object is "living"
 *
 * @returns true if `ob` is a living object (that is, if `enable_commands()` has been called by `ob`).
 * @param ob - the object to check
 */
varargs int living( object ob );

/**
 * getuid() - return the user id (uid) of an object
 *
 * Returns  the  user id of an object.  The uid of an object is determined
 * at object creation by the creator_file() function.
 *
 */
string getuid( object ob );

/**
 * geteuid() - return the effective user id of an object or function
 *
 * If  given  an  object  argument,  geteuid returns the effective user id
 * (euid) of the object.  If given an  argument  of  type  'function',  it
 * returns  the  euid of the object that created that 'function' variable.
 * If the object, at the time of the function variable's construction, had
 * no euid, the object's uid is stored instead.
 *
 */
string geteuid( object|function );

/**
 * find_living() - find a living object matching a given id
 *
 * Find  first  the object that is marked as living, and answers to the id
 * <str>.  A living object is an object that has called enable_commands().
 * The  object  must  have  set a name with set_living_name(), so its name
 * will be entered into the hash table used to speed  up  the  search  for
 * living objects.
 *
 */
object find_living( string str );

/**
 * export_uid() - set the uid of another object
 *
 * Set  the  uid of <ob> to the effective uid of this_object(). It is only
 * possible when <ob> has an effective uid of 0.
 *
 */
int export_uid( object ob );

/**
 * enable_wizard() - give wizard priveleges to an object
 *
 * 
 *
 */
void enable_wizard( void );

/**
 * domain_stats() - returns statistics gathered on domains
 *
 * Both  domain_stats()  and author_stats() return information stored in a
 * mapping.  If no argument is specified, then information is returned  on
 * all  domains  (or  on  all  authors)  with  one map entry per domain or
 * author.  If an argument is specified, then a map is returned that  cor‐
 * responds  to  that  domain  or  author  with keys: moves, cost, errors,
 * heart_beats, worth, array_size, and objects.   Each  of  these  map  to
 * integer  values.   Moves  is the number of objects that have moved into
 * objects in the  given  domain.   Cost  is  the  number  of  evaluations
 * (eval_cost)  accumulated  by objects with the given domain (or author).
 * Errors is the number of errors  incurred  by  objects  with  the  given
 * domain.   Heart_beats  is the number of heartbeat calls made on objects
 * having the  given  domain.   Worth  is  the  value  maintained  by  the
 * add_worth(3)  efunction (this is usually used to keep track of how much
 * money a given wizard has given out vs. taken in).   Array_size  is  the
 * size  (in bytes) of the arrays allocated by the domain.  Objects is the
 * number of objects created by the given domain.   When  called  with  no
 * arguments, the returned mapping has a form like this:
 * 
 * ([ domain0 : info0, domain1 : info1, ... ])
 * 
 * while info0 has the form:
 * 
 * ([ "moves" : moves, "cost" : cost, "errors" : errors,
 * "heart_beats" : heart_beats, "worth" : worth,
 * "array_size" : array_size, "objects" : objects ])
 * 
 * When  called  with an argument, the returned mapping will have the form
 * of info0.
 *
 */
mapping domain_stats( void|string domain  );

/**
 * author_stats() - returns statistics gathered on authors
 *
 * Both  domain_stats()  and author_stats() return information stored in a
 * mapping.  If no argument is specified, then information is returned  on
 * all  domains  (or  on  all  authors)  with  one map entry per domain or
 * author.  If an argument is specified, then a map is returned that  cor‐
 * responds  to  that  domain  or  author  with keys: moves, cost, errors,
 * heart_beats, worth, array_size, and objects.   Each  of  these  map  to
 * integer  values.   Moves  is the number of objects that have moved into
 * objects in the  given  domain.   Cost  is  the  number  of  evaluations
 * (eval_cost)  accumulated  by objects with the given domain (or author).
 * Errors is the number of errors  incurred  by  objects  with  the  given
 * domain.   Heart_beats  is the number of heartbeat calls made on objects
 * having the  given  domain.   Worth  is  the  value  maintained  by  the
 * add_worth(3)  efunction (this is usually used to keep track of how much
 * money a given wizard has given out vs. taken in).   Array_size  is  the
 * size  (in bytes) of the arrays allocated by the domain.  Objects is the
 * number of objects created by the given domain.   When  called  with  no
 * arguments, the returned mapping has a form like this:
 * 
 * ([ domain0 : info0, domain1 : info1, ... ])
 * 
 * while info0 has the form:
 * 
 * ([ "moves" : moves, "cost" : cost, "errors" : errors,
 * "heart_beats" : heart_beats, "worth" : worth,
 * "array_size" : array_size, "objects" : objects ])
 * 
 * When  called  with an argument, the returned mapping will have the form
 * of info0.
 *
 */
mapping author_stats( void|string domain  );

