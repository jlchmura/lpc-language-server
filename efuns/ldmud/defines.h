// Driver-provided defines that are injected into each file

#define LPC3                        1 /* always defined */
#define __LDMUD__                   1 /* always defined */
#define __EUIDS__                   1 /* always (for compatibility) */
#define COMPAT_FLAG                 1 /* defined if the driver runs in compat mode */
#define __COMPAT_MODE__             1 /* ditto */
#define __STRICT_EUIDS__            1 /* defined if strict euid usage is enforced */
#define __FILENAME_SPACES__         1 /* defined if filenames may contain spaces */

// #define __MASTER_OBJECT__           "master_object" /* the name of the master object (in compat mode without leading '/') */
// #define __FILE__                    "compiled_file" /* the name of the compiled file (in compat mode without leading '/') */
#define __LINE__                    1 /* the current line number */
#define __FUNCTION__                "function" /* the current function name */
// #define __DIR__                     "directory_path" /* the directory path of the compiled file (in compat mode without leading '/') */
#define __PATH__(n)                 "/path/" /* the directory path of the compiled file without the <n> trailing elements (in compat mode without leading '/') */
// #define __VERSION__                 "version_string" /* the version string of the driver */
#define __VERSION_MAJOR__           3 /* the major version number of the driver */
#define __VERSION_MINOR__           6 /* the minor version number of the driver */
#define __VERSION_MICRO__           1 /* the micro version number of the driver */
#define __VERSION_PATCH__           1 /* the patchlevel of the driver; a 0 here means 'no patchlevel' */
#define __VERSION_COMMITID__        "commit_id" /* the commit ID of the source of the driver (attention: it might be <unknown>, if the driver was not compiled from a git repository) */
// #define __VERSION_LOCAL__           "local_level" /* the (optional) LOCAL_LEVEL, the user has defined */

#define __DOMAIN_NAME__             "domain_name" /* the domain the host is part of */
#define __HOST_IP_NUMBER__          "host_ip_number" /* the hosts IP number (as a string) */
#define __HOST_NAME__               "hostname" /* the full hostname */
#define __MAX_RECURSION__           1000 /* the max count of nested function calls (this is config.h:MAX_USER_TRACE) */
#define __MAX_EVAL_COST__           1000 /* the max evaluation cost */
#define __RESET_TIME__              1 /* default interval time between object resets */
#define __CLEANUP_TIME__            1 /* default interval time between object cleanups */
#define __ALARM_TIME__              1 /* the configured timing granularity */
#define __HEART_BEAT_INTERVAL__     1 /* the configured heartbeat time */
#define __SYNCHRONOUS_HEART_BEAT__  1 /* defined if synchronous heartbeats are enabled */
#define __MAX_COMMAND_LENGTH__      1 /* the maximum length a command from command(), execute_command() or H_MODIFY_COMMAND can have */
#define __EFUN_DEFINED__(name)      0 /* if the efun 'name' exists, this macro evaluates to " 1 ", else to " 0 " */
#define __DRIVER_LOG__              "driver_log" /* the name of the default debug.log file (within the mudlib); undefined if a different name has been specified on the commandline */
#define __WIZLIST__                 "wizlist" /* the name of the (mudlib) file from where the driver read the initial WIZLIST information. It is undefined if the driver was configured to not read the information */

#define __MAX_MALLOC__              1000 /* the internal upper limit for total memory usage */
#define __INT_MAX__                 2147483647 /* the largest integer number */
#define __INT_MIN__                 -2147483648 /* the smallest integer number */
#define __FLOAT_MAX__               1.0e+20 /* the largest (positive) float number */
#define __FLOAT_MIN__               0.00000 /* the smallest (positive) float number */

#define __LPC_NOSAVE__              1 /* always defined */
#define __LPC_STRUCTS__             1 /* always defined */
#define __LPC_LWOBJECTS__           1 /* always defined */
#define __LPC_INLINE_CLOSURES__     1 /* always defined */
#define __LPC_ARRAY_CALLS__         1 /* always defined */
#define __BOOT_TIME__               1 /* the time() the driver was started */

#define __ERQ_MAX_SEND__            1 /* the max size of the send buffer */
#define __ERQ_MAX_REPLY__           1 /* the max size of the reply buffer */

#define __IDNA__                    0 /* support for IDNA */
#define __IPV6__                    0 /* support for IP v.6 */
#define __MYSQL__                   0 /* support for mySQL */
#define __PGSQL__                   0 /* support for PostgreSQL */
#define __SQLITE__                  0 /* support for SQLite 3 */
#define __XML_DOM__                 0 /* support for XML parsing */
#define __MCCP__                    0 /* support for MCCP */
#define __ALISTS__                  0 /* support for alists */
#define __PCRE__                    0 /* support for PCRE (always defined) */
#define __TLS__                     0 /* support for TLS (internal) */
#define __GNUTLS__                  0 /* if __TLS__: TLS support provided by GnuTLS */
#define __OPENSSL__                 0 /* if __TLS__: TLS support provided by OpenSSL */
#define __GCRYPT__                  0 /* cryptographic routines provided by libgcrypt */
#define __DEPRECATED__              0 /* support for obsolete and deprecated efuns */
