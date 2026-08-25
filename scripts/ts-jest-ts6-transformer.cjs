/**
 * Jest transformer: ts-jest, but compiling with `@typescript/typescript6`.
 *
 * The project builds with TypeScript 7, whose npm package is the native compiler and no
 * longer exposes the JS API (`transpileModule`, `createLanguageService`, ...). ts-jest
 * needs that API, and reaches for it two ways: the configurable `compiler` option, and a
 * plain `require("typescript")` inside its transpiler. The `compiler` option covers the
 * first; this wrapper covers the second by resolving bare "typescript" to the JS-API
 * TypeScript 6 package for the lifetime of the worker.
 *
 * A type-aware compiler is what makes the suite fast: the checker leans on cross-module
 * `const enum`s, and any per-file transpiler (swc, esbuild, ts.transpileModule) has to
 * emit those as runtime objects instead of inlined constants -- roughly 4x on the suite.
 */
const Module = require("module");

const jsApiTypeScript = require.resolve("@typescript/typescript6");
const resolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, ...rest) {
    if (request === "typescript") {
        return jsApiTypeScript;
    }
    return resolveFilename.call(this, request, ...rest);
};

module.exports = require("ts-jest").default;
