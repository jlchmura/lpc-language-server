// db.h

/**
 * db_status() - 返回包状态
 *
 * 返回描述当前数据库包状态的字符串。
 *
 */
string db_status( void );

/**
 * db_rollback() - 回滚上一个事务
 *
 * 对于事务性数据库，这将回滚最后一组操作。
 * 
 * 成功时返回1，否则返回0。
 *
 */
int db_rollback( int );

/**
 * db_fetch() - 获取结果集
 *
 * 获取给定行的最后执行的SQL结果集，使用传递的数据库句柄。
 * 
 * 成功时返回命名行的列数组，否则返回错误字符串。
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
 * write("没有返回行。");
 * else
 * if(stringp(rows))  /* 错误 *\/
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
 * db_exec() - 执行SQL语句
 *
 * 此函数将为给定的数据库句柄执行传递的SQL语句。
 * 
 * 成功时返回结果集中行的数量，否则返回错误字符串。
 *
 */
mixed db_exec( int handle, string sql_query );

/**
 * db_connect() - 关闭数据库连接
 *
 * 在给定主机上创建与数据库db的新连接。连接使用给定用户或编译时值作为登录ID。类型可以用于选择数据库服务器的类型。有效值取决于编译时设置，应通过mudlib中的相应头文件提供。
 * 
 * 成功时返回新连接的句柄，否则返回0。
 * 
 * 驱动程序将调用主对象的valid_database函数以检索此数据库的密码（字符串）或批准（正整数）。
 * 
 * FlufFOS支持MYSQL、SQLITE3和PostgreSQL。
 * 
 * 编译驱动程序时，需要传递-DPACKAGE_DB=ON和
 * -DPACKAGE_DB_MYSQL=X或
 * -DPACKAGE_DB_SQLITE=X或
 * -DPACKAGE_DB_POSTGRESQL=X
 * 同时还应传递-DPACKAGE_DB_DEFAULT_DB=X，该值应为上述其中一个。如果某个值为空字符串，则驱动程序对该数据库的支持将被禁用。
 * 
 * 这里的X代表表示db_connect()中“类型”参数的整数。
 * 
 * 驱动程序为lib提供以下预定义常量以供数据库类型使用。
 * 
 * __USE_MYSQL__   是-DPACKAGE_DB_MYSQL=<value>的值，默认值为1
 * __USE_SQLITE3__ 是-DPACKAGE_DB_SQLITE=<value>的值，默认未定义。
 * __USE_POSTGRE__ 是-DPACKAGE_DB_POSTGRESQL=<value>的值，默认未定义。
 * __DEFAULT_DB__  是-DPACKAGE_DB_DEFAULT_DB=<value>的值，默认值为1
 *
 */
int db_connect( string host, string db );
int db_connect( string host, string db, string user );
int db_connect( string  host, string db, string user, int type );

/**
 * db_commit() - 提交上一个事务
 *
 * 对于事务性数据库，这将提交最后一组操作。
 * 
 * 成功时返回1，否则返回0。
 *
 */
int db_commit(int handle );

/**
 * db_close() - 关闭数据库连接
 *
 * 关闭由给定句柄表示的数据库连接。
 * 
 * 成功时返回1，否则返回0。
 *
 */
int db_close( int handle );
