// db.h

/**
 * db_status() - return package status
 *
 * Returns a string describing the current status of the database package.
 *
 */
string db_status( void );

/**
 * db_rollback() - rollback the last transaction
 *
 * For transactional databases this will rollback the last set of actions.
 * 
 * Returns 1 on success, 0 otherwise
 *
 */
int db_rollback( int );

/**
 * db_fetch() - fetches a result set
 *
 * Fetches  the result set for the given row of the last executeted sql on
 * the passed database handle.
 * 
 * Returns an array of columns of the named  row  upon  success  an  error
 * string otherwise.
 *
 * string *res;
 * mixed rows;
 * int dbconn, i;
 * 
 * dbconn = db_connect("db.server", "db_mud");
 * if(dbconn < 1)
 * return  0;
 * rows  =  db_exec(dbconn,  "SELECT player_name, exp FROM t_player");
 * if(!rows)
 * write("No rows return3d.");
 * else
 * if(stringp(rows))  /* error *\/
 * write(rows);
 * else
 * for(i = 1; i <= rows; i++)
 * {
 * res = db_fetch(dbconn, i);
 * write(res[0]);
 * write(res[1]);
 * }
 * 
 * db_close(dbconn);
 *
 */
mixed *db_fetch( int handle, int row );

/**
 * db_exec() - executes an sql statement
 *
 * This function will execute the passed sql statement for the given data‐
 * base handle.
 * 
 * Returns the number of rows in result set on success, or an error string
 * otherwise.
 *
 */
mixed db_exec( int handle, string sql_query );

/**
 * db_connect() - close the database connection
 *
 * Creates  a  new  connection  to the database db on the given host.  The
 * connection uses either the given user or a compile time value as  login
 * id.  type may be used to choose the type of database server. Valid val‐
 * ues depend on compile time settings should be made available through  a
 * corresponding header file within the mudlib.
 * 
 * Returns a handle to the new connection on success, 0 otherwise
 * 
 * Driver will call master object's valid_database function to reterive
 * password for this database (string) or approvals (positive intgeter).
 * 
 * FlufFOS supports MYSQL, SQLITE3 and PostgreSQL.
 * 
 * When compiling driver, you need to pass -DPACKAGE_DB=ON and
 * -DPACKAGE_DB_MYSQL=X or
 * -DPACKAGE_DB_SQLITE=X or
 * -DPACKAGE_DB_POSTGRESQL=X
 * and you should also pass -DPACKAGE_DB_DEFAULT_DB=X which should be one
 * of the value above. If one value is an empty string, the driver support for
 * that DB is disabled.
 * 
 * X here means an integer representing the "type" parameter in db_connect().
 * 
 * Driver prvoides following pre-defines constant to lib for DB types.
 * 
 * __USE_MYSQL__   is what -DPACKAGE_DB_MYSQL=<value> is, default to be 1
 * __USE_SQLITE3__ is what -DPACKAGE_DB_SQLITE=<value> is, default to be not defined.
 * __USE_POSTGRE__ is what -DPACKAGE_DB_POSTGRESQL=<value> is, default to be not defined.
 * __DEFAULT_DB__  is what -DPACKAGE_DB_DEFAULT_DB=<value> is, default to be 1
 *
 */
int db_connect( string host, string db );
int db_connect( string host, string db, string user );
int db_connect( string  host, string db, string user, int type );

/**
 * db_commit() - commits the last transaction
 *
 * For transactional databases this will commit the last set of actions.
 * 
 * Returns 1 on success, 0 otherwise
 *
 */
int db_commit(int handle );

/**
 * db_close() - close the database connection
 *
 * Closes the database connection represented by the given handle.
 * 
 * Returns 1 on success, 0 otherwise
 *
 */
int db_close( int handle );

