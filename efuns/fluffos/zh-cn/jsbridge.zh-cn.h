// jsbridge.h

/**
 * js_eval() - 在宿主页面中同步执行 JavaScript
 *
 * 在承载 WASM 驱动的页面（或 node 进程）的上下文中将 code 作为
 * JavaScript 求值，并以字符串形式返回结果：基本类型会被转换为字符串，
 * 对象会被 JSON 编码，undefined/null 会变成 ""。抛出的 JavaScript
 * 异常会以字符串 "JS error: ..." 的形式返回——它永远不会传播到驱动内部。
 *
 * 仅在 WebAssembly 构建中可用（用 #ifdef __PACKAGE_JSBRIDGE__
 * 保护 LPC 代码）。
 *
 */
string js_eval(string code);

/**
 * js_call() - 调用宿主页面注册的 JavaScript 处理器
 *
 * 调用页面处理器表（JavaScript 中的 Module.fluffos.handlers）中的
 * func，并将 args 展开为单独的字符串参数传入。处理器可以返回一个值
 * 或一个 Promise；当其完成时，可选的 callback 会在稍后的驱动周期中
 * 运行：
 *
 * void callback(string result, int success, int id)
 *
 * success 为 1 时 result 是处理器返回值的字符串形式（对象会被 JSON
 * 编码）；为 0 时 result 是错误描述（处理器不存在、抛出异常、Promise
 * 被拒绝）。返回一个非负的调用 id，该 id 也会传递给回调。
 *
 * 仅在 WebAssembly 构建中可用（用 #ifdef __PACKAGE_JSBRIDGE__
 * 保护 LPC 代码）。
 *
 */
int js_call(string func, string *args, void|string|function callback);

/**
 * js_export() - 注册一个宿主页面可以调用的 LPC 函数
 *
 * 将 func 以 name 为名注册，使页面的 JavaScript 可以通过
 * Module.fluffos.callLPC(name, ...args) 调用 LPC。回调会在下一个
 * 驱动周期中运行：
 *
 * mixed callback(string *args, int id)
 *
 * 字符串形式的 func 表示在注册对象上调用的函数名。重新注册同一个
 * name 会替换之前的条目；只传入 name 则取消注册。注册了回调时返回 1，
 * name 已（或现在已）取消注册时返回 0。
 *
 * 仅在 WebAssembly 构建中可用（用 #ifdef __PACKAGE_JSBRIDGE__
 * 保护 LPC 代码）。
 *
 */
int js_export(string name, void|string|function func);
