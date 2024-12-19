// test_bit.md.h

/**
 * test_bit
 * set_bit() - 在比特字符串中设置一个比特
 *
 * 如果比特 'n' 在字符串 'str' 中被设置，返回 0 或 1。
 *
 */
int test_bit( string str, int n );

// test_load.md.h

/**
 * test_load
 * test_load - 测试文件是否可加载
 *
 * 测试一个文件是否可加载。如果文件可加载，将返回 1，
否则返回 0。如果尝试加载的文件包含错误，
将会报告这些错误，在这种情况下，你可能需要将
函数调用包装在 catch 语句中以获取 0 的结果。
 *
 */
int test_load( string filename );


/**
 * set_notify_destruct() - 设置对象在被销毁时通知
 * @param flag 如果 flag 设置为 1，则对象将在被销毁时
 *  接收对函数 on_destruct() 的调用。如果 flag 设置为 0，
 *  对象将不会收到此通知。
 * @details
 *  切换对象中的一个标志，以决定它是否会在被销毁时
 *  接到通知。如果 flag 设置为 1，对象将在被销毁时
 *  接收对函数 on_destruct() 的调用。如果 flag 设置为 0，
 *  对象将不会收到此通知。
 *  默认情况下，对象不会收到此通知。要接收对
 *  on_destruct() 的调用，对象必须在其生命周期内
 *  的某个时刻调用 set_notify_destruct(1)。
 *  set_notify_destruct() efun 只能从希望接收
 *  通知的对象内部调用。
 */
void set_notify_destruct(int flag);
