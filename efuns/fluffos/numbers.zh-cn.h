// numbers.h

/**
 * to_float - 将一个整数转换为浮点数
 *
 * to_float() 调用返回与整数 'i' 等值的 'float' 类型的数字。
 *
 */
float to_float(int i);
float to_float(string i);

/**
 * secure_random() - 返回一个伪随机数，这个数应该是不可预测的，但可能略慢。
 *
 * 返回一个从范围 [0 .. (n -1)]（包括）内的密码学安全随机数。
 * 
 * 在 Linux 和 OSX 上，该函数显式使用来自 /dev/urandom 的随机性，在 Windows 上则是实现定义。
 *
 */
int secure_random( int n );

/**
 * random() - 返回一个伪随机数，这个数适合一般模拟，但是可能是可预测的。
 *
 * 返回一个从范围 [0 .. (n -1)]（包括）内的伪随机数。
 *
 */
int random( int n );

/**
 * intp() - 确定给定变量是否是整数
 *
 * 如果 'arg' 是一个整数，则返回 1，否则返回零（0）。
 *
 */
int intp( mixed arg );
