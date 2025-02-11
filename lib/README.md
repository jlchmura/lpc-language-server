# LPC Language Compiler Library

Parser and checker API for LPC (Lars Pensjö C) - an object-oriented programming language derived from C and developed originally by Lars Pensjö to facilitate MUD building on LPMuds.

Currently supports [LDMud](https://www.ldmud.eu/) and [FluffOS](https://www.fluffos.info/).

If you are lookin for the VS Code language server, please visit: https://marketplace.visualstudio.com/items?itemName=jlchmura.lpc

See [CHANGELOG.md](https://github.com/jlchmura/lpc-language-server/blob/main/CHANGELOG.md).

## Example

For an example mudlib, pre-configured to work with LPC Language Services, see the [Nightmare Residuum mudlib](https://github.com/michaelprograms/nightmare-residuum). 
This mudlib has been fully annotated with [LPCDoc](#lpcdoc-comments) and can been successfully validated by the LPC Language Service and build task without errors.

## If you love this package, you could

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >](https://www.buymeacoffee.com/jlchmura)

## Semantic Analysis

Semantic analysis (sometimes refered to as the _type checker_) will perform many useful checks on your code, but you must opt-in to this feature. 
To enable semantic code analysis, set the [diagnostics](#diagnostics---diagnostics) options to `"on"`.

## LPCDoc Comments

LPC Language Services uses [JSDoc-style](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) comments to provide additional context during hover and signature help.

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
| `simul_efun`     | The location of your simul_efun file. Defaults to `"/obj/simul_efun.c"` |
| `global_include` | When provided, will add this file as an `#include` to each file.        |
| `player`         | The location of your player file. Defaults to `"/obj/player.c"`         |

#### Lib Root Dir - `rootDir`
If your config file is located in a folder other than your lib's root directory, use this setting
to specify the location of the root folder.

#### Include Search Dirs - `libInclude`

An array of folders that are searched when including files via the `#include` directive.

Defaults to `["/sys", "/obj", "/room"]`

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

## Grammar ToDo's

Language services is a work in progress. Some major areas that have yet to be implemented are:

-   LWObjects
-   Named object validation
-   Coroutines

## Credits

Syntax highlighting is based on the [LPC Language](https://marketplace.visualstudio.com/items?itemName=undeadfish.vscode-lpc-lang) VS Code extension by Gwenn Reece, adjusted for LDMud.

The guts of this language server is a heavily modified version of the [TypeScript](https://github.com/microsoft/typescript) compiler/server. None of it would be possible without the work of the many brilliant people working on that team.

Many thanks for the fellow MUD admins, wizards, and LPC aficionados in the LPC Discord for their inspiration.

## Contact / Feature Requests / Bugs

Feedback welcome. You can open an issue in the [lpc-language-server repo](https://github.com/jlchmura/lpc-language-server/issues).
Otherwise, you can usually find me on the [LPC Discord](https://discord.gg/wzUbBgs3AQ) or idling on [Infinity Mud](https://infinitymud.com/).