// floats.h

/**
 * to_int - 将浮点数或缓冲区转换为整数
 *
 * 如果 'x' 是浮点数，to_int() 调用返回与 'x' 等效的整数类型的数字
 * （去掉小数部分，并向下取整）。
 * 
 * 如果 'x' 是缓冲区，调用返回在缓冲区中嵌入的整数（以网络字节顺序）。
 * 
 * 如果 'x' 是字符串，调用将尝试将字符串转换为整数。转换将从第一个字符开始，
 * 在最后一个非数字的字符串表示数字之前停止并返回。如果转换不成功，
 * 将返回 UNDEFINED。
 *
 */
int to_int( float | string | buffer x);

/**
 * tan() - 返回浮点数的正切
 *
 * 返回其参数 'f' 的正切值，单位为弧度。
 *
 */
float tan( float f );

/**
 * sqrt() - 返回浮点数的平方根
 *
 * sqrt() 返回其参数 'f' 的非负平方根。'f' 的值不能为负数。
 *
 */
float sqrt( float f );

/**
 * sin() - 返回浮点数的正弦
 *
 * 返回其参数 'f' 的正弦值，单位为弧度。
 *
 */
float sin( float f );

/**
 * round() - 四舍五入浮点数
 *
 * 返回 'f' 的四舍五入值，类型为浮点数。
 *
 */
float round( float f );

/**
 * pow() - 计算浮点数的指数
 *
 * pow() 返回 x 的 y 次方。如果 x 为 0.0，则 y 必须为正数。如果 x 为负数，
 * 则 y 必须为整数。
 *
 */
float pow( float x, float y );

/**
 * log() - 返回浮点数的自然对数
 *
 * 返回其参数 'f' 的自然对数。'f' 必须是正数。
 *
 */
float log( float f );

/**
 * floor() - 将浮点数向下舍入到最接近的整数
 *
 * 返回（作为浮点数）小于或等于 f 的最接近的整数。
 *
 */
float floor( float f );

/**
 * floatp() - 确定给定变量是否为浮点数
 *
 * 如果 'arg' 是浮点数，则返回 1，否则返回 0。
 *
 */
int floatp( mixed arg );

/**
 * exp() - 计算 e 的浮点数次方
 *
 * exp() 返回 e^f。
 *
 */
float exp( float f );

/**
 * cos() - 返回浮点数的余弦
 *
 * 返回其参数 'f' 的余弦值，单位为弧度。
 *
 */
float cos( float f );

/**
 * ceil() - 将浮点数向上舍入到最接近的整数
 *
 * 返回（作为浮点数）大于或等于 f 的最接近的整数。
 *
 */
float ceil( float f );

/**
 * atan() - 返回浮点数的反正切
 *
 * 返回其参数 'f' 的反正切值，单位为弧度。
 *
 */
float atan( float f );

/**
 * asin() - 返回浮点数的反正弦
 *
 * 返回其参数 'f' 的反正弦值，单位为弧度。
 *
 */
float asin( float f );

/**
 * acos() - 返回浮点数的反余弦
 *
 * 返回其参数 'f' 的反余弦值，单位为弧度。
 *
 */
float acos( float f );
