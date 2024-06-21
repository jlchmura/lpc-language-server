# LPC Language Services Changelog

## 1.0.15

-   Fix: [FLUFFOS] Default parameters causing errors #9

## 1.0.14

-   Fix: [FLUFFOS] Case statements with no leading or trailing value #8

## 1.0.13

-   Show macro expansion in hover

## 1.0.12

-   Fix: Some Fluff-only keywords were being dropped from macro definitions
-   Fix: Super accessor was not allowing all valid identifiers as a prefix
-   Fix: Preprocessor did not recognize directives with a space after the `#` symbol.
-   Fix: Parser did not allow variable declarations inside an if statement's conditional expression

## 1.0.11

-   Fix: Remove comma expression ambiguity in grammar that caused an infinite loop when parsing large array initializers.

## 1.0.10

-   The `lpc-config.json` file is now used to determine the LPC _root_ folder.
    If no config file is found, the VS Code workspace root is used. See: [Workspace Root vs Lib Root](./README.md#file-locations---files)
-   Added the ability to [turn off all semantic diagnostics](./README.md#disabling-code-diagnostics).

## 1.0.9

-   Fix: Regression parsing struct initializers in LD.
-   Started added unit tests for the parser, lexer, and pre-processor.

## 1.0.8

-   Allow array type declaration without a primitive type
-   Added more diagnostic codes to lpc-config.
-   Allow variable declarations in switch body before first case.
-   Display current driver type in VSCode status bar
-   Fix: Parsing error when including a bracketed path with a forward slash
-   Fix: Struct member declarations can have multiple variables separated by commas
-   Fix: Multiline defines not tokenized correctly when lines end with `\r\n`
-   Fix: Global include filename resolves incorrectly in windows.
-   Fix: Goto def (f12) not working for macros defined in included files.
-   Fix: Multiline defines were not parsed correctly in windows.
-   Fix: Diagnostics would sometimes disappear when file is inherited by another file.

#### FluffOS

-   Allow spread operator in function forward declaration
-   Add struct modifiers (`private`)
-   Add global visibility modifiers

## 1.0.7

-   Allow whitespace between opening parent and square bracket of a mapping
-   Make `status` a reserved word for LD only.
-   Added `global_include` option to the [files section](README.md#file-locations---files) of lpc-config (mainly for FluffOS)
-   Refactor `clone_object` symbol creation so that it can be detected as a keyword in FluffOS.

#### FluffOS

-   Added support for string formatting preprocessor shortcuts (`@` and `@@`) - https://www.fluffos.info/concepts/general/preprocessor.html#text-formatting-shortcuts
-   Allow function forward defines without parameter variable names.
-   Allow SEMI at the end of `#include` statements
-   Add function argument spread operator (`...`)

## 1.0.3

Started adding support for FluffOS-specific syntax.

## 1.0.0

Initial release
