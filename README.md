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

See `lpc-config.json`

### Example

For an example mudlib, pre-configured to work with LPC Language Services, see this slightly modified version of the [LP 2.4.5 mudlib](https://github.com/jlchmura/lp-245). LPC Language Services can parse and validate this entire lib without errors.

## Grammar ToDo's

-   LWObjects
-   Coroutines
-   FluffOS specific syntax

## Credits

Syntax highlighting is based on the [LPC Language](https://marketplace.visualstudio.com/items?itemName=undeadfish.vscode-lpc-lang) VS Code extension by Gwenn Reece, adjusted for LDMud.

Original inspiration for the structure of this project came from Mike Lischke's [ANTLR4 grammar syntax support](https://marketplace.visualstudio.com/items?itemName=mike-lischke.vscode-antlr4). This language server would not have been possible without Mike's work on the ANTLR4-ng package.

Many thanks for the fellow MUD admins, wizards, and LPC aficionados in the LPC Discord for their inspiration.

## Contact / Feature Requests / Bugs

Feedback welcome. You can open an issue in the [lpc-language-server repo](https://github.com/jlchmura/lpc-language-server/issues).
Otherwise, you can usually find me on the LPC Discord or idling on [Infinity Mud](https://infinitymud.com/).
