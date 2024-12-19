// external.h

/**
 * external_start() - 执行一个外部于驱动的shell命令
 *
 * 执行一个外部于驱动的shell命令。
 * 
 * 您希望执行的命令必须添加到运行时配置中。
 * 这些枚举的命令可以通过它们的编号作为第一个参数 `external_index` 调用 external_start。
 * 
 * 此函数返回您应该记录的套接字号码，以便后续处理外部命令的结果。
 * 
 * `args` - 传递给外部命令的参数数组。
 * `read_call_back` - 当数据可用时，此函数将被调用，参数是包含该数据的字符串。
 * `write_call_back` - 我不太确定会向外部命令写入什么，但这是一个必需的参数。
 * `close_call_back` - 当套接字关闭时，将调用此函数。
 *
 * 这是一个使用本文件提供的信息的非常基本的示例。
 *
 */
int external_start(int external_index,
                   string *args,
                   string|function read_call_back,
                   string|function write_call_back,
                   string|function close_call_back);
