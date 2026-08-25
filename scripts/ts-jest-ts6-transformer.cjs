/**
 * Jest transformer: ts-jest, compiling with the JS-API TypeScript pinned by
 * tools/ts-jest-compiler rather than the project's TypeScript 7.
 *
 * TypeScript 7's npm package is the native compiler and no longer exposes the JS API
 * (`transpileModule`, `createLanguageService`, ...) that ts-jest needs, so ts-jest has to
 * be pointed at an older one. Its `compiler` option only covers part of that -- ts-jest
 * also does a plain `require("typescript")` inside its transpiler -- so bare "typescript"
 * is redirected here, for the lifetime of the jest worker. Nothing under server/src or
 * client/src imports the `typescript` package, so only ts-jest sees the redirect.
 *
 * A type-aware compiler is what keeps the suite quick: the checker leans on cross-module
 * `const enum`s, and a per-file transpiler (swc, esbuild, ts.transpileModule) has to emit
 * those as runtime objects instead of inlined constants -- about 4x on the whole suite.
 */
const path = require("path");
const Module = require("module");

const jsApiTypeScript = require.resolve("typescript", {
    paths: [path.dirname(require.resolve("ts-jest-compiler/package.json"))],
});

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
    if (request === "typescript") {
        return jsApiTypeScript;
    }
    return resolveFilename.call(this, request, ...rest);
};

module.exports = require("ts-jest").default;
