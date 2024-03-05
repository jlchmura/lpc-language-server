# lpc-language-server

LPC Language Server

## Running

There are currently two launch configs set up:

1. To launch the vscode extension host, which creates a language client, runs the server, and connects.
2. To run bin.ts using node - for quick debugging and testing of things.

Todo: Add a way to run just the language server, for use with editors other than VSCode.

## Includes / sefuns

When the language server encounters an `#include`, it will search for a `sys` folder in the root of your project, in addition to local folders.

In addition, the language server will attempt to load a file `sys/simul_efun.h` and add it as a reference to each LPC file opened. This will allow you to specify function headers for your sefuns, so that the language server can validate those function calls.

`this_object()` will evaluate to the current program.
`this_player()` will attempt to load `obj/player.c`.

All of these things will be user configurable in the future.

## Grammar ToDo's

-   Better support for #if/else/etc preprocessor directives
-   Coroutines

## Evaluation Engine Todo

-   Replace the current recursion protection in MethodSymbol with a real call stack.
