# LPC Language Services

Language server and VSCode extension that provides rich language support for LPC (Lars Pensjö C) - an object-oriented programming language derived from C and developed originally by Lars Pensjö to facilitate MUD building on LPMuds.

Currently supports [LDMud](https://www.ldmud.eu/), with [FluffOS](https://www.fluffos.info/) support coming soon.

## Features

-   Code Completion / [IntelliSense](#intellisense) - Results appear for symbols as you type, including lfuns.
-   Diagnostics
-   Hover info
-   Signature help, with type info
-   Code navigation - Jump to or peek at a symbol's declaration
    -   Go to definitions (f12)
    -   Go to implementations (ctrl/cmd+f12)
    -   Go to symbol (cltr/cmd+o)
-   Code outline
-   Code navigation
-   [Include / sefun support](#includes--sefuns)

### Includes / sefuns

When the language server encounters an `#include`, it will search for a `sys` folder in the root of your project, as well as local folders.

In addition, the language server will attempt to load a file `obj/simul_efun.c` and add it as a reference to each LPC file opened, so that the language server can validate those sefun calls.

### Intellisense

LPC Language Services uses [JSDoc-style](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) comments to provide IntelliSense support.

Example:

```c
/**
 * Attempts to run a command
 * @param {string} cmd - The command to run
 * @returns 1 if successful, otherwise 0
 */
int doCommand(string cmd) {
    return 1;
}
```

## Setting up your workspace

## Grammar ToDo's

-   LWObjects
-   Coroutines
-   FluffOS specific syntax

## Credits

Syntax highlighting is based on the [LPC Language](https://marketplace.visualstudio.com/items?itemName=undeadfish.vscode-lpc-lang) VS Code extension by Gwenn Reece, adjusted for LDMud.

Original inspiration for the structure of this project came from Mike Lischke's [ANTLR4 grammar syntax support](https://marketplace.visualstudio.com/items?itemName=mike-lischke.vscode-antlr4).

Many thanks for the fellow MUD admins, wizards, and LPC aficionados in the LPC Discord for their inspiration.
