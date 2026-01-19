This project is a vscode language server and compiler for the LPC language. It is based on the TypeScript compiler
but has been modified to support LPC-specific syntax and semantics.
The JSDoc comment syntax has also been adapted to accommodate LPC-specific annotations. Although this code still refers
to it as JSDoc, in practice we call it LPCDoc.

Github issues are used to track work items.

We use npm for package management, and esbuild to build and bundle. Jest is used for tests.

There are several .c and .h files in this project. Those contain `LPC` code, not `C`.
