# LPC Language Services

Language server and VSCode extension that provides rich language support for LPC (Lars Pensjö C) - an object-oriented programming language derived from C and developed originally by Lars Pensjö to facilitate MUD building on LPMuds.

Currently supports [LDMud](https://www.ldmud.eu/) and [FluffOS](https://www.fluffos.info/).

Install from the VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc

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

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Setting up your workspace

The VS Code LPC Language Services extension does not use your MUD driver to compile code. As such, several configuration options are available to help the language server understand the structure of your mudlib.

### Workspace Root vs Lib Root

LPC Language Services will use the location of your `lpc-config.json` file to determine the root folder of your mudlib. If no config file is found, the VS Code workspace root is used.

For example, see the [LIMA mudlib](https://github.com/fluffos/lima) in which the config file should be placed in the `lib` folder.

**Please note**: After creating (or moving) your `lpc-config` file, you will need to restart VS Code.

### Example

For an example mudlib, pre-configured to work with LPC Language Services, see this slightly modified version of the [LP 2.4.5 mudlib](https://github.com/jlchmura/lp-245). LPC Language Services can parse and validate this entire lib without errors.

### LPC Config

Language services can be customized by creating an `lpc-config.json` file in the root folder of your workspace. The available options are as follows:

#### Driver Options - `driver`

| Setting   | Description                                          |
| --------- | ---------------------------------------------------- |
| `type`    | Driver type. Valid options are `ldmud` or `fluffos`. |
| `version` | The driver version string, i.e. `"3.6.7"`            |

#### File Locations - `files`

| Setting          | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| `master`         | The location of your master object. Defaults to `"/obj/master.c"`       |
| `simul_efun`     | The location of your simul_efun file. Defaults to `"/obj/simul_efun.c"` |
| `init_files`     | An array of init files. Defaults to `["/room/init_files"]`              |
| `global_include` | When provided, will add this file as an `#include` to each file.        |
| `player`         | The location of your player file. Defaults to `"/obj/player.c"`         |

#### Include Dirs - `include`

An array of folders that are searched when including files via the `#include` directive.

Defaults to `["/sys", "/obj", "/room"]`

#### Exclude Dirs - `exclude`

An array of [glob patterns](https://code.visualstudio.com/docs/editor/glob-patterns) of directories and files that are excluded from language services. Excluded files will not report errors unless specifically opened in VS Code.

#### Predefined Macros - `defines`

Since your code is not being evaluating in the mud driver, you may need to simulate one or more defines that are normally provided by the driver's compiler. Values are an array of key value pairs. Example:

```json
"defines": [
  { "__HOST_NAME__": "\"localhost\"" },
  { "TLS_PORT": "5555" }
]
```

In the example above, `__HOST_NAME__` will be defined as the _string_ value `"localhost"`. `TLS_PORT` on the other hand, will be defined as an _int_ value `5555`.

#### Diagnostics - `diagnostics`

The severity level of several diagnostics can be controlled through this configuration option. When a LPC language services reports a diagnostic, the _code_ is printed at the end the message and enclosed in `lpc()`, i.e. `lpc(functionNotFound)`.

For example, to turn off the `functionNotFound` error completely:

```json
"diagnostics": {
  "functionNotFound": "none"
}
```

Valid severity levels are:

-   `error`
-   `warning`
-   `info`
-   `hint`
-   `none`

##### Disabling Code Diagnostics

All semantic diagnostics can be disabled by setting the config to `"off"`. Syntax errors will always be reported. Example:

```json
"diagnostics": "off"
```

## Grammar ToDo's

Language services is a work in progress. Some major areas that have yet to be implemented are:

-   LWObjects
-   Named object validation
-   Coroutines
-   Complete FluffOS specific syntax parsing

## Credits

Syntax highlighting is based on the [LPC Language](https://marketplace.visualstudio.com/items?itemName=undeadfish.vscode-lpc-lang) VS Code extension by Gwenn Reece, adjusted for LDMud.

Original inspiration for the structure of this project came from Mike Lischke's [ANTLR4 grammar syntax support](https://marketplace.visualstudio.com/items?itemName=mike-lischke.vscode-antlr4). This language server would not have been possible without Mike's work on the ANTLR4-ng package.

Many thanks for the fellow MUD admins, wizards, and LPC aficionados in the LPC Discord for their inspiration.

## Contact / Feature Requests / Bugs

Feedback welcome. You can open an issue in the [lpc-language-server repo](https://github.com/jlchmura/lpc-language-server/issues).
Otherwise, you can usually find me on the LPC Discord or idling on [Infinity Mud](https://infinitymud.com/).
