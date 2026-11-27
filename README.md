<div align="center">

# LPC Language Services

[![VS Marketplace version](https://badgen.net/vs-marketplace/v/jlchmura.lpc)](https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc)
[![VS Marketplace installs](https://badgen.net/vs-marketplace/i/jlchmura.lpc)](https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc)
[![VS Marketplace rating](https://badgen.net/vs-marketplace/rating/jlchmura.lpc)](https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc&ssr=false#review-details)
[![Open VSX version](https://badgen.net/open-vsx/version/jlchmura/lpc?label=Open%20VSX)](https://open-vsx.org/extension/jlchmura/lpc)
[![Open VSX downloads](https://badgen.net/open-vsx/d/jlchmura/lpc?label=Open%20VSX%20downloads)](https://open-vsx.org/extension/jlchmura/lpc)
[![Node.js CI](https://github.com/jlchmura/lpc-language-server/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jlchmura/lpc-language-server/actions/workflows/node.js.yml)
[![npm @lpc-lang/core](https://img.shields.io/npm/v/@lpc-lang/core.svg?label=%40lpc-lang%2Fcore)](https://www.npmjs.com/package/@lpc-lang/core)
[![license](https://img.shields.io/github/license/jlchmura/lpc-language-server.svg)](https://github.com/jlchmura/lpc-language-server/blob/main/LICENSE)
[![LPC Discord](https://img.shields.io/badge/Discord-LPC-5865F2?logo=discord&logoColor=white)](https://discord.gg/wzUbBgs3AQ)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-FFDD00?logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/jlchmura)

</div>

**LPC Language Services** is a full language server, compiler front end and type checker for LPC, with a VS Code extension, for the [FluffOS](https://www.fluffos.info/) and [LDMud](https://www.ldmud.eu/) drivers. It is built on the architecture of the TypeScript compiler and language server, adapted for LPC, so it understands your whole mudlib: inherits, `#include`s, macros, `clone_object()` targets and `->` calls across files.

-   **VS Code Marketplace:** [jlchmura.lpc](https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc)
-   **Open VSX** (VSCodium, Cursor, Windsurf and other editors): [jlchmura/lpc](https://open-vsx.org/extension/jlchmura/lpc)
-   **npm:** the compiler and checker as a library, [`@lpc-lang/core`](https://www.npmjs.com/package/@lpc-lang/core)

LPC (Lars Pensjö C) is the object-oriented, C-like language of [LPMud drivers](https://en.wikipedia.org/wiki/LPMud), created by Lars Pensjö for building MUDs.

## Features

-   **IntelliSense / code completion** for local symbols, inherited functions, efuns, simul_efuns and lfuns as you type.
-   **Type checking** in two modes: a strict mode that checks more than your driver (like TypeScript checks JavaScript), or a [driver mode](#type-checking---typechecking) that reports only what FluffOS or LDMud would report. Includes type narrowing (`if (stringp(x))`) and checking that the target of a `->` call has the function.
-   **LPCDoc type annotations**: JSDoc-style comments that give the checker object and parameter types (see [LPCDoc Comments](#lpcdoc-comments)).
-   **Diagnostics**: syntax and preprocessor errors, type errors, unknown functions and wrong argument counts, as you type.
-   **Full preprocessor**: `#include`, `#define` and function-like macros, conditional compilation, `#pragma`, and your driver's predefined macros.
-   **Driver-aware**: efun signatures and syntax for each driver (FluffOS or LDMud), selected in `lpc-config.json`.
-   **Hover info** and **signature help**, with types and doc comments.
-   **Code navigation**:
    -   Go to definition (F12), including across inherits, includes and `->` calls
    -   Go to implementations (Ctrl/Cmd+F12)
    -   Find all references (Shift+F12)
    -   Go to symbol in file (Ctrl/Cmd+Shift+O)
    -   Workspace symbols (Ctrl/Cmd+T)
-   **Rename** a symbol across files (F2).
-   **Semantic highlighting**, code outline, and folding (with support for `// #region` blocks).
-   **Project-wide check**: `LPC: Check Project for Problems` checks the whole mudlib, not just the open files.
-   **Build task** to check a project from VS Code's task runner.
-   **No setup for `.c` and `.h` files**: the extension associates `.c`, `.h` and `.lpc` files with LPC, so you don't need a `files.associations` setting. (If another extension, such as a C/C++ extension, claims `.c` files in your workspace, add `"files.associations": { "*.c": "lpc", "*.h": "lpc" }` to `.vscode/settings.json`.)

## Using with FluffOS

1. Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc) or [Open VSX](https://open-vsx.org/extension/jlchmura/lpc).
2. Add an `lpc-config.json` file to your workspace root or your mudlib root. The driver type defaults to LDMud, so set it to `fluffos`:

```json
{
  "driver": { "type": "fluffos" },
  "libFiles": {
    "master": "/adm/obj/master.c",
    "simul_efun": "/adm/obj/simul_efun.c"
  },
  "libInclude": ["/include"],
  "diagnostics": "on"
}
```

Change the paths to match your mudlib. To mirror your driver's `DEFAULT_PRAGMAS` and see only the type errors FluffOS would report, add `"typeChecking": "driver"` and [`defaultPragmas`](#default-pragmas---defaultpragmas). See [Setting up your workspace](#setting-up-your-workspace) for every option.

For LDMud, use `"type": "ldmud"` and the same settings for your mudlib's paths.

## A note about type checking

By default the language server type checks more strictly than your driver, the way TypeScript checks JavaScript. It uses LPCDoc annotations and narrows types through `if (stringp(x))` and assignments. It also reports a `->` call whose target is not known to have the function. This catches real bugs, but on an existing mudlib it can also flag a lot of code that compiles and runs fine.

If you would rather see only the type errors your driver would report, set [`typeChecking`](#type-checking---typechecking) to `"driver"`. Hover, completion, go-to-definition and the other editor features work the same in either mode.


## Changelog

See [CHANGELOG.md](CHANGELOG.md).

**Attention v1.0 Users**
If you are updating from the 1.0.x version, please see [config-changes.md](config-changes.md) for required changes to your `lpc-config.json` file.

## Example

For an example mudlib, pre-configured to work with LPC Language Services, see the [Nightmare Residuum mudlib](https://github.com/michaelprograms/nightmare-residuum).
This mudlib has been fully annotated with [LPCDoc](#lpcdoc-comments) and can been successfully validated by the LPC Language Service and build task without errors.

## If you love this extension, you could

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >](https://www.buymeacoffee.com/jlchmura)

## Semantic Analysis

Semantic analysis (sometimes refered to as the _type checker_) will perform many useful checks on your code, but you must opt-in to this feature.
To enable semantic code analysis, set the [diagnostics](#diagnostics---diagnostics) options to `"on"`.

## LPCDoc Comments

LPC Language Services uses [JSDoc-style](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) comments to provide additional context during hover and signature help.

For in-depth LPCDoc conventions supported by the language server, please see the [LPCDoc spec](https://spec.gesslar.dev/lpcdoc/).

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
Similar to typed languages like TypeScript, the type annotations are optional but can provide valuable context to the language server. For more, see [Type Annotations](#type-annotations), below.


### Disable Checks on Per-File Basis

Semantic checks can be disabled for a single file by placing a nocheck directive at the top of the file:
```js
// @lpc-nocheck
```

### this_object()

By default, the type checker will assume `this_object()` refers to the file in which you are working. At runtime, that is
not always the case, in particular when the file is included in a larger object.  If needed, the type checker can be instructed to override the object type of `this_object()` by using a comment directive placed at the top of the file:
```js
// @this_object /std/living
```

### Ignoring a single line - `@lpc-ignore`
You can instruct the checker to ignore errors on a single line by adding the `@lpc-ignore` comment directive:

```c
// @lpc-ignore - ignore int to string assignment error
string foo = 123;
```

### Disabling checks for a single file - `@lpc-nocheck`
Diagnostics can be disabled for an entire file by addding a `@lpc-nocheck` comment directive to the top of the file.

```c
// @lpc-nocheck
... statements
```

### Expect an error - `@lpc-expect-error`
Indiciates that the next line is expected to return an error. If it does not, the directive will be flagged as an error

```c
// @lpc-expect-error: method does not exist
o->foo();
```

### Type Annotations

In many instance, the type checker can automatically infer the type of an object.  For example:
```c
object itm = clone_object("std/item");
```
However, often times a parameter or variable gives the type checker no information as to its type (other than object). Consider this example in which `->query_name()` will report an error, because it cannot validate that the function exists on object player:
```c
void welcomePlayer(object player) {
  write("Hi " + player->query_name());
}
```
This can be solved by using a type annotation in a doc comment:
```c
/**
 * @param {"/std/player.c"} player - The player to welcome
 */
void welcomePlayer(object player) {
  write("Hi " + player->query_name());
}
```
Annotations can also be used on variables and return statements:
```c
/**
 * @returns {"/std/player.c"} The current player object
 */
object getPlayer() {
  return lookupPlayer();
}

void testWeapon() {
  object player = getPlayer();
  /** @type {"/std/weapon.c"} */
  object weapon;

  if (player) {
    weapon = player->getWeapon();
    weapon->runTest();
  }
}
```

## Setting up your workspace

The VS Code LPC Language Services extension does not use your MUD driver to compile code. As such, several configuration options are available to help the language server understand the structure of your mudlib.

### Workspace Root vs Lib Root

First create an `lpc-config.json` file that is used to store setting for the language server. This file must be located in your workspace root, or in your lib root.
If no config file is found, the language server will still work but won't be able to take advante of global include files, include search dirs, etc.

For example, see this [GLPU Fork](https://github.com/jlchmura/glpu) in which the config file is placed in the workspace root.

#### Driver Options - `driver`

| Setting   | Description                                          |
| --------- | ---------------------------------------------------- |
| `type`    | Driver type. Valid options are `ldmud` or `fluffos`. |
| `version` | The driver version string, i.e. `"3.6.7"`            |

#### Include - `include`
Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the lpc-config.json file.

Default: `**/*`

Example:
```json
{
  "include": ["lib/**/*"]
}
```

#### Exclude - `exclude`

Specifies an array of filenames or patterns that should be skipped when resolving include.

Important: exclude only changes which files are included as a result of the include setting. A file specified by exclude can still become part of your codebase due to a statement in your code such as an include, a types inclusion, clone_object, etc.

It is not a mechanism that prevents a file from being included in the codebase - it simply changes what the include setting finds.

#### Lib File Locations - `libFiles`

| Setting          | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| `master`         | The location of your master object. Defaults to `"/obj/master.c"`       |
| `simul_efun`     | The location of your simul_efun file. Defaults to `"/obj/sefun.c"`      |
| `global_include` | When provided, will add this file as an `#include` to each file.        |
| `player`         | The location of your player file. Defaults to `"/obj/player.c"`         |

#### Lib Root Dir - `rootDir`
If your config file is located in a folder other than your lib's root directory, use this setting
to specify the location of the root folder.

#### Include Search Dirs - `libInclude`

An array of folders that are searched when including files via the `#include` directive.

There is no default: if `libInclude` is not set, no include search folders are used.

#### Predefined Macros - `defines`

Since your code is not being evaluated in the mud driver, you may need to simulate one or more defines that are normally provided by the driver's compiler. Values are an array of key value pairs. Example:

```json
"defines": [
  { "__HOST_NAME__": "\"localhost\"" },
  { "TLS_PORT": "5555" }
]
```

In the example above, `__HOST_NAME__` will be defined as the _string_ value `"localhost"`. `TLS_PORT` on the other hand, will be defined as an _int_ value `5555`.

#### Diagnostics - `diagnostics`

Semantic analysis is always run, but diagnostics are only reported if you opt in to receiving them. (Syntax errors will always be reported.) Example:

```json
"diagnostics": "on"
```

#### Type Checking - `typeChecking`

How strictly to type check. Valid options are `"strict"` (the default) or `"driver"`.

-   `"strict"`: type checks as described in [A note about type checking](#a-note-about-type-checking), stricter than your driver.
-   `"driver"`: reports only the type errors your driver's compiler would report. These follow the driver's own rules:
    -   A function body is type checked only if the function declares a return type. This is how both LDMud and FluffOS work, whatever the pragma.
    -   There is no narrowing: a variable has its declared type everywhere.
    -   A `->` call accepts any function name, its arguments are not checked, and its result is `mixed`.
    -   Under LDMud's `#pragma strict_types`, a `->` call's result must be cast before it is used, as in `(string)ob->query_name()`.
    -   `#pragma strict_types` (and LDMud's `strong_types`) requires every function to declare a return type.
    -   Argument counts and types are checked where the driver checks them. For example, an inherited function is checked only if its program was compiled with `save_types`.

```json
"typeChecking": "driver"
```

#### Default Pragmas - `defaultPragmas`

Pragmas every file starts with, as if each file began with a `#pragma` line for each entry. Use this to mirror FluffOS's `DEFAULT_PRAGMAS` or an LDMud auto-include. A file's own `#pragma` lines still apply after these, so `#pragma weak_types` (LDMud) or `#pragma no_strict_types` (FluffOS) opts a single file out. Only used when `typeChecking` is `"driver"`.

```json
"typeChecking": "driver",
"defaultPragmas": ["strict_types"]
```

Pragmas in a file are read where they appear, so a pragma applies to the code after it, including a pragma in an `#include`d header.

### Compiler Options - `compilerOptions`

Compiler options are specified under the `compilerOptions` object:
```json
{
  "compilerOptions": {
    ...
  }
}
```

#### Strict Object Type Checking - `strictObjectTypes`

Defaults to `false` unless `strict` is on.

When enabled, strick object checking will report an error when an untyped object is being assigned to a typed object.
For example:
```c
/**
 * @param {"std/player.c"} p
 */
void foo(object p) {
  tell_object(p, "hi");
}
void bar(object p)  {
  tell_object(p, "hi");
}

object player;
foo(p); /* p will report an error when strictObjectTypes is true, because it is an untyped object. */
bar(p); /* this call is ok because both objects are untyped */
```

## Extension Settings

The following settings are configured through your editor's settings (e.g. `settings.json`) rather than `lpc-config.json`, as they apply to the language server process rather than an individual mudlib.

| Setting                                  | Default    | Description                                                                                                                                                                          |
| ---------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LPC.locale`                             | `"auto"`   | The locale used to report LPC errors. Defaults to your editor's display language.                                                                                                   |
| `LPC.languageServer.maxLpcServerMemory`  | `3072`     | The maximum amount of memory (in MB) to allocate to the language server process.                                                                                                    |
| `LPC.languageServer.logVerbosity`        | `"normal"` | How much the language server writes to its log: `terse`, `normal`, or `verbose`. Use `verbose` to surface file-watcher activity that is otherwise suppressed when diagnosing watch behavior. |
| `LPC.checkProject.openProblemsPanel`     | `true`     | Open the Problems panel when `LPC: Check Project for Problems` finishes.                                                                                                             |

Changing any of the `LPC.locale` or `LPC.languageServer.*` settings requires restarting the language server (`LPC: Restart LPC Language Server`) to take effect.

## Grammar ToDo's

Language services is a work in progress. Some major areas that have yet to be implemented are:

-   LWObjects

## Credits

Syntax highlighting is based on the [LPC Language](https://marketplace.visualstudio.com/items?itemName=undeadfish.vscode-lpc-lang) VS Code extension by Gwenn Reece, adjusted for LDMud.

The guts of this language server is a heavily modified version of the [TypeScript](https://github.com/microsoft/typescript) compiler/server. None of it would be possible without the work of the many brilliant people working on that team.

Many thanks for the fellow MUD admins, wizards, and LPC aficionados in the LPC Discord for their inspiration.

## Contact / Feature Requests / Bugs

Feedback welcome. You can open an issue in the [lpc-language-server repo](https://github.com/jlchmura/lpc-language-server/issues).
Otherwise, you can usually find me on the [LPC Discord](https://discord.gg/wzUbBgs3AQ) or idling on [Infinity Mud](https://infinitymud.com/).
