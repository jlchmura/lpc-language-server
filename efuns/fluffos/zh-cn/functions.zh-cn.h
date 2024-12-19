// functions.h

/**
 * functionp()  -  确定给定变量是否是函数指针，如果是，则返回其类型
 * @param arg - 要检查的变量
 * @returns {arg is function} 如果 arg 是函数指针，则返回 1，否则返回 0
 * 
 * 如果 'arg' 是一个函数指针，则返回非零值，否则返回零 (0)。
 * 函数指针是类型为 'function' 的变量，如文档中所述，例如：
 * ```c
 * f = (: obj, func :);
 * ```
 * 返回值使用在驱动程序包含文件 "include/function.h" 中给出的值来指示函数指针的类型。
 * 
 * 函数指针类型       值
 * ---------------------       -----
 * call_other                  FP_CALL_OTHER
 * lfun                        FP_LOCAL
 * efun                        FP_EFUN
 * simul_efun                  FP_SIMUL
 * functional                  FP_FUNCTIONAL
 * 
 * 此外，在某些情况下，将添加以下值：
 * FP_HAS_ARGUMENTS            提供了参数
 * FP_OWNER_DESTED             创建者已被销毁
 * FP_NOT_BINDABLE             不可重新绑定
 * 
 * 最后一组值是位值，可以使用位运算进行测试。 值 FP_MASK 用于忽略位值并测试函数指针的基本类型。
 * 
 * 示例：
 * 
 * 检查一个函数变量是否是 efun 指针：
 * ```c
 * if ((functionp(f) & FP_MASK) == FP_EFUN) ...
 * ```
 * 检查它是否有参数：
 * ```c
 * if (functionp(f) & FP_HAS_ARGUMENTS) ...
 * ```
 */
int functionp( mixed arg );

/**
 * evaluate() - 评估一个函数指针
 *
 * 如果 f 是一个函数，则使用其余参数调用 f。否则，返回 f。 evaluate(f, ...) 等同于 (*f)(...)。
 *
 */
mixed evaluate(mixed f... );

/**
 * defer() - 在当前函数结束后执行函数
 *
 * 在当前函数结束时调用函数指针 *f（即使是由于运行时错误导致的）。
 * 
 * 例如：
 * 
 * void create()
 * {
 * ::create();
 * 
 * defer( (: enable_commands :) );
 * }
 * 
 * defer() 函数的效果是它会导致 enable_commands() efun 在 create() 函数执行结束后被调用。传递给 defer() 的参数可以是任何函数类型。
 *
 */
void defer(function f);

/**
 * bind() - 更改函数指针的所有者
 *
 * 返回一个与 f 完全相同的函数指针，但属于对象 'ob'，而不是创建 f 的对象。 如果 'f' 的创建者已经被销毁，或者 f 是一个 efun 指针指向一个对 'this_object' 做某事的 efun，则很有用。
 * 
 * 例如：
 * 
 * void make_living(object ob) {
 * function f;
 * 
 * f = bind( (: enable_commands :), ob );
 * 
 * evaluate(f); }
 * 
 * 上述效果与 'ob' 自身评估 enable_commands() efun 的效果相同。 请注意，这涉及到安全风险，因为 bind() 允许您强制另一个对象运行一段代码。 为了防止这种情况，必须有一个有效的 valid_bind() 主应用程序返回 1，否则调用 bind() 将失败。
 *
 */
function bind(function f, object ob);
