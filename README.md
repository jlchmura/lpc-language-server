# LPC Language Services

Language server and VSCode extension that provides rich language support for LPC (Lars Pensjö C) - an object-oriented programming language derived from C and developed originally by Lars Pensjö to facilitate MUD building on LPMuds.

Currently supports [LDMud](https://www.ldmud.eu/), with [FluffOS](https://www.fluffos.info/) support coming soon.

## Features

-   Code Completion
-   Diagnostics
-   Quick info
-   Signature help, with type info
-   Go to definitions (f12)
-   Go to implementations (ctrl/cmd+f12)
-   Go to symbol (cltr/cmd+o)
-   Code outline
-   Code navigation
-   [Include / sefun support](#includes--sefuns)
-   [IntelliSense](#intellisense) support

### Includes / sefuns

When the language server encounters an `#include`, it will search for a `sys` folder in the root of your project, in addition to local folders.

In addition, the language server will attempt to load a file `obj/simul_efun.c` and add it as a reference to each LPC file opened. This will allow you to specify function headers for your sefuns, so that the language server can validate those function calls.

`this_object()` will evaluate to the current program.
`this_player()` will attempt to load `obj/player.c`.

All of these things will be user configurable in the future.

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

## Development

There are currently two launch configs set up:

1. To launch the vscode extension host, which creates a language client, runs the server, and connects.
2. To run bin.ts using node - for quick debugging and testing of things.

Todo: Add a way to run just the language server, for use with editors other than VSCode.

## Grammar ToDo's

-   LWObjects
-   Coroutines
