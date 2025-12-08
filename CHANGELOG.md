# LPC Language Services Changelog

## 1.1.43

-   Fix: [macros expand on hover when in keys for a mapping, but not as values #278](https://github.com/jlchmura/lpc-language-server/issues/278)
-   Fix: [Macro in union type does not show quickinfo on hover #290](https://github.com/jlchmura/lpc-language-server/issues/290)
-   [Add FluffOS grammar support for new operators and syntax #292](https://github.com/jlchmura/lpc-language-server/pull/292) (thanks @gesslar!)

## 1.1.42

-   [Hash operator in macros does not parse correctly #286](https://github.com/jlchmura/lpc-language-server/issues/286)

## 1.1.41

-   Maintenance release - no user-facing changes.

## 1.1.40

-   [Parser does not allow mapping type nodes #280](https://github.com/jlchmura/lpc-language-server/issues/280)
-   [catch statement not being checked #284](https://github.com/jlchmura/lpc-language-server/issues/284)

## 1.1.39

-   [problem with ''' #276](https://github.com/jlchmura/lpc-language-server/issues/276)
-   [hover information does not love when the param description spans multiple lines #281](https://github.com/jlchmura/lpc-language-server/issues/281)

## 1.1.38

-   ['undefined' as a symbol name is reported as invalid #272](https://github.com/jlchmura/lpc-language-server/issues/272)
-   [Language server crashes when VSCode does not have a workspace open #274](https://github.com/jlchmura/lpc-language-server/issues/274)

## 1.1.37

-   [Return node does not include expression after newline, resulting in unreachable code warning #261](https://github.com/jlchmura/lpc-language-server/issues/261)
-   [Diagostic about unread variable not correct when being used in class instantiation #259](https://github.com/jlchmura/lpc-language-server/issues/259)
-   [Property types are not checked when using new(class) syntax #263](https://github.com/jlchmura/lpc-language-server/issues/263)
-   [Not getting hints when new()ing a class #260](https://github.com/jlchmura/lpc-language-server/issues/260)
-   [FluffOS diagnostic incorrect about parameters not being read in lambda #258](https://github.com/jlchmura/lpc-language-server/issues/258)
-   [LPCDoc variadic type indicator is on the wrong side #249](https://github.com/jlchmura/lpc-language-server/issues/249)
-   [diagnostic: after a catch block with a return in it, code after is determined to be unreachable #242](https://github.com/jlchmura/lpc-language-server/issues/242)
-   [Union types not parsed correctly when they contain NamedObjectType nodes #251](https://github.com/jlchmura/lpc-language-server/issues/251)
-   [array assignment losing flow type #190](https://github.com/jlchmura/lpc-language-server/issues/190)

## 1.1.36

-   [macros named null are not resolving correctly #245](https://github.com/jlchmura/lpc-language-server/issues/245)
-   [deprecation for enable_commands(void) may not be correct #244](https://github.com/jlchmura/lpc-language-server/issues/244)
-   [Update documentation and hinting for origin() following merge of FluffOS PR #250](https://github.com/jlchmura/lpc-language-server/issues/250)
-   [Efun signatures do not resolve their return type when access via inline closure #248](https://github.com/jlchmura/lpc-language-server/issues/248)
-   [efuns not displayed in autocomplete inside inline closure #254](https://github.com/jlchmura/lpc-language-server/issues/254)

## 1.1.35

-   Fix: `__DIR__` macro set to incorrectly path.
-   Added support for `file_size` efun in JS helper.

## 1.1.34

-   [Type predicates are not working on object declarations #238](https://github.com/jlchmura/lpc-language-server/issues/238)
-   Fix: Completions not displaying object-level variables
-   Fix: Object-level variables not shown as references

## 1.1.33

-   [LPCDoc param names garbled when forward define is in another file #233](https://github.com/jlchmura/lpc-language-server/issues/233)
-   [Feat: get it to stop counting forward declaration as an overload #229](https://github.com/jlchmura/lpc-language-server/issues/229)
-   Fix: Display `mapping` keyword instead of global mapping symbol name.
-   Fix: Function return type was not displayed in completions detail.
-   Fix: Signature help return type should be LPC-style, not TypeScript.
-   Fix: Incorrect node positions causing synthetic node warnings.
-   Fix: Semantic classifier skipping local tokens inside macro context.
-   Add `never` type to type checker node builder.

## 1.1.32

-   [Function macro with array arg parsed incorrectly. #220](https://github.com/jlchmura/lpc-language-server/issues/220)
-   [Inline closure should allow statements #206](https://github.com/jlchmura/lpc-language-server/issues/206)
-   [Class is not a reserved word in LD #224](https://github.com/jlchmura/lpc-language-server/issues/224)
-   [tooltip for typed object reference from a macro not showing completely or fully, when using LD's syntax #227](https://github.com/jlchmura/lpc-language-server/issues/227)
-   [`@type` not expanding macros in tooltip #228](https://github.com/jlchmura/lpc-language-server/issues/228)
-   Fix crash on signature help when typing a macro function without args.
-   Fix possible max call stack crash with large or open-ended code ranges that are disabled.
-   Fix: `buffer` and `in` are not reserved words in LD.
-   Fix name resolution in JSDocLink and JSDocNameReference nodes.
-   Fix: markdown link rendering in hover info.
-   Fix: hover not displayed for class/struct types.

## 1.1.31

-   [Allow deprecated modifier #209](https://github.com/jlchmura/lpc-language-server/issues/209)
-   [Function declaration can have an array indicator with no type #203](https://github.com/jlchmura/lpc-language-server/issues/203)
-   [Catch modifiers report parser error #207](https://github.com/jlchmura/lpc-language-server/issues/207)
-   Allow `&` in an LD foreach expression
-   Fix: Parser error reported in LD when function has struct parameters.

## 1.1.30

-   Fix LD struct parsing error introduced in 1.1.29.

## 1.1.29

-   Fix: [Mapping literal can have newline whitespace between `(` and `[` #202](https://github.com/jlchmura/lpc-language-server/issues/202)
-   Fix: [Signature hover does not display ref for parameters #210](https://github.com/jlchmura/lpc-language-server/issues/210)
-   Fix: [Support property access with runtime expression. #208](https://github.com/jlchmura/lpc-language-server/issues/208)
-   Fix: [Signature hover does not display class types for parameters #199](https://github.com/jlchmura/lpc-language-server/issues/199)
-   Fix: Circular include directives are now ignored and no longer report a diagnostic

## 1.1.28

-   Lazy Parsing: The language server will now only parse files that are open in the editor or are directly dependent on an open file. This should reduce the memory footprint of the language server and improve performance. Note that running a language feature that analyzes multiple files (such as "Find All References") can still cause a large number of files to be parsed, so it is still recommended that projects be scoped as narrowly as possible using "include" and "exclude" config options.
-   Performance Improvement: Include files will now only trigger a re-parse of dependent files
    if a) the dependent file is open in the editor or b) the number of dependent files is less than 25.
-   Fix some unhandled exceptions in the language server.

## 1.1.27

-   Fix: Scanner should allow whitespace in array/mapping literal
-   Fix: Properly handle parens in nested macro arguments

## 1.1.26

-   Package for deployment to NPM as [`@lpc-lang/core`](https://www.npmjs.com/package/@lpc-lang/core)
-   Parse and return default expression in LPCDoc `@param` tags.
-   Add parser/checker support for LDMud named objects.

## 1.1.25

-   Fix: [catch expression not checked #191](https://github.com/jlchmura/lpc-language-server/issues/191)

## 1.1.24

-   Fix: [Adjust handling of array of arrays #180](https://github.com/jlchmura/lpc-language-server/issues/180)
-   Fix: [Parser errors when last last is an include directive without a newline #184](https://github.com/jlchmura/lpc-language-server/issues/184)
-   Fix: [Macro parameter should not get substituted by other macros #186](https://github.com/jlchmura/lpc-language-server/issues/186)
-   Fix: [Class declarations should allow property declaration lists #188](https://github.com/jlchmura/lpc-language-server/issues/188)
-   Fix: Import with null text can crash program file load
-   Improved efun definitions:
    -   FluffOS [`shutdown`](https://github.com/jlchmura/lpc-language-server/pull/182)

## 1.1.23

-   Fix: [Add $() support to type checker #167](https://github.com/jlchmura/lpc-language-server/issues/167)
-   Fix: [FluffOS error() efun does not mark unreachable code #175](https://github.com/jlchmura/lpc-language-server/issues/175)
-   Resolve object names in `@typedef` tags.
-   FluffOS efun changes:
    -   Updated [query_num](https://github.com/jlchmura/lpc-language-server/pull/178)
    -   Added [notify_fail](https://github.com/jlchmura/lpc-language-server/issues/177)

## 1.1.22

-   Fix: [objectp should maintain typed object #168](https://github.com/jlchmura/lpc-language-server/issues/168)
-   Fix: [Incorrect return type for closure set to a function #170](https://github.com/jlchmura/lpc-language-server/issues/170)
-   Fix: [arrayp sefun is not changing the flow type to array #171](https://github.com/jlchmura/lpc-language-server/issues/171)
-   Added support for LPCDoc intersection types

## 1.1.21

-   Fix: [Foreach over an array always results in a string type #161](https://github.com/jlchmura/lpc-language-server/issues/161)
-   Fix: [Variable in foreach losing type #163](https://github.com/jlchmura/lpc-language-server/issues/163)
-   Fix: [Flow type lost inside inline closure #164](https://github.com/jlchmura/lpc-language-server/issues/164)
-   Improved efun typing:
    -   FluffOS `unique_array`
    -   Added type guards to several LD efuns

## 1.1.20

-   Fix: [FluffOS `ref` keyword not being parsed correctly. #155](https://github.com/jlchmura/lpc-language-server/issues/155)
-   Fix: [Object type not resolved when used in a union #156](https://github.com/jlchmura/lpc-language-server/issues/156)
-   `null` keyword was incorrectly parsed as a reserved word in LPC code.
-   FluffOS efun improvements (thanks @michaelprograms)

## 1.1.19

-   Fix: [catch blocks should not be block scoped #91](https://github.com/jlchmura/lpc-language-server/issues/91)
-   Fix: [Foreach with two variables should not report 2405 #94](https://github.com/jlchmura/lpc-language-server/issues/94)
-   Fix: [Parser error on mapping access with multi args inside a prefix unary expr #150](https://github.com/jlchmura/lpc-language-server/issues/150)
-   Fix: [Flow node incorrect for variables initialized at the object level #152](https://github.com/jlchmura/lpc-language-server/issues/152)
-   Fix: Node position incorrect when parsing a macro inside a nested include directive.

## 1.1.18

-   Fix: [Diagnostics are duplicated after running the build task #137](https://github.com/jlchmura/lpc-language-server/issues/137)
-   Fix: [LPCDoc comment should not be captured by #include #140](https://github.com/jlchmura/lpc-language-server/issues/140)
-   Fix: [Incorrect signature resolution when function decl does not have doc comment #139](https://github.com/jlchmura/lpc-language-server/issues/139)
-   Fix: [Editing an .h file should trigger a reparse of files that include it. #143](https://github.com/jlchmura/lpc-language-server/issues/143)
-   Fix: [Type predicates not working in inherited sefun files. #144](https://github.com/jlchmura/lpc-language-server/issues/144)
-   Fix: [Fix typings for filter efun and add unit test, closes #145](https://github.com/jlchmura/lpc-language-server/issues/145)
-   Fix: `#include` directives with a rooted path using workspace root instead of project root.
-   Fix: this_object() property access not able to resolve protected functions.
-   Added `.h` to the file extensions that will activate the language server.
-   Added support for [`@lpc-nocheck`](./README.md#disabling-checks-for-a-single-file---lpc-nocheck) and [`@lpc-ignore`](./README.md#ignoring-a-single-line---lpc-ignore) comment directives.

## 1.1.17

-   Fix: LPCDoc `@var` tag types were incorrectly linked to the original symbol
-   Performance improvement: reduced memory consumption by 17%
-   Code cleanup and v8-specific code optimizations
-   Macro hover now shown for global and pre-defined macros
-   New: VSCode build task - Run the `LPC: Build` task to validate all files in your project.

## 1.1.16

-   Fix: [Completion provider does not return defines #127](https://github.com/jlchmura/lpc-language-server/issues/127)
-   Fix: Syntax highlighting should allow whitespace after property access tokens
-   Fix: LPCDoc type predicates not working
-   Fixed a bug that could cause @ string blocks to cause the parser to run out of memory.
-   Performance improvements
-   Various grammar improvements with indenting, highlighting, and bracketing
-   Fenced code markdown blocks now highlight using LPC syntax.
-   Cleaned up server logging (removed TS reference, removed version number)

## 1.1.15

-   [Add localization support #43](https://github.com/jlchmura/lpc-language-server/issues/43) - Thanks to @serenez for contributing.
-   Remove duplicate import nodes from dependency graph - speeds up recompilation when editing files.

## 1.1.14

-   Fix: [.h file incorrectly marks code as disabled #122](https://github.com/jlchmura/lpc-language-server/issues/122)
-   Set default max heap size to 3072 and added the `LPC.languageServer.maxLpcServerMemory` configuration option to change.
-   Detect and report circular `#include` references.

## 1.1.13

-   Fix: Project info incorrectly reported driver type as FluffOS (see [FluffOS - Maybe classes aren't being parsed properly anymore #113](https://github.com/jlchmura/lpc-language-server/issues/113))
-   Fix: [Unable to open when going to definition on windows #118](https://github.com/jlchmura/lpc-language-server/issues/118)
-   Improve program file load order so that driver prefines are consistenly available to all files.
-   Source files will now reparse when config options that impact compilation are changed.

## 1.1.12

-   Fix: Driver predefined macros marked as undefined on initial startup

## 1.1.11

-   Fix: [Hover text garbled when type annotation uses a macro #110](https://github.com/jlchmura/lpc-language-server/issues/110)
-   Fix: [Function not recognized as callback #109](https://github.com/jlchmura/lpc-language-server/issues/109)
-   Enhancement: [Include file handler should read from ScriptSnapshot instead of disk #60](https://github.com/jlchmura/lpc-language-server/issues/60)
-   Moved #include resolution error to checker instead of parser
-   Added #include files to program dependency graph
-   LPCDoc `@var` tags now provide additional validation (must have a name, must be an inherited var)
-   Improved AST structure for include directives
-   Improved diagnostic reporting for errors inside include directive nodes

## 1.1.10

-   Fix: [Prefix unary expr is parsed incorrectly causing lpc2367 to be reported #104](https://github.com/jlchmura/lpc-language-server/issues/104)
-   Fix: [@var comment tag not working when placed before an inherit #105](https://github.com/jlchmura/lpc-language-server/issues/105)
-   Fix some errors introduced by #102

## 1.1.9

-   Fix: [efun:: prefix reports 9023 and should not #99](https://github.com/jlchmura/lpc-language-server/issues/99)
-   New: [Feature request: Annotate the type of variables declared in an inherited object](https://github.com/jlchmura/lpc-language-server/issues/102)

## 1.1.8

-   Fix: [Symbol is resolving to efun instead of sefun #95](https://github.com/jlchmura/lpc-language-server/issues/95)
-   Fix: [Symbols with super prefix do not resolve #97](https://github.com/jlchmura/lpc-language-server/issues/97)
-   Added ability to use `@callback` and `@template` tags in function signatures.
-   Properly resolve call expression to a function symbol when a block scoped variable by the same name also exists.
-   Enhance efun definitions

## 1.1.7

-   Fix: [v2 parse function ref in inline closure #72](https://github.com/jlchmura/lpc-language-server/issues/72)
-   Fix: [Function arguments inside catch() statement being flagged as unused #90](https://github.com/jlchmura/lpc-language-server/issues/90)
-   Fix: [Object resolution fails when file extension ends with .h #92](https://github.com/jlchmura/lpc-language-server/issues/92)
-   FluffOS - function shortcuts now validated, e.g. `(: call_other, ob, fun :)`
-   FluffOS call_other with array target shortcuts now validated
-   Array arithmetic ops no longer report an error
-   Finished support for doc comment templates and type inference
-   Completed type checking code for structured types (to check objects against each other)
-   Added [`strictObjectTypes`](./README.md#strict-object-type-checking---strictobjecttypes) compiler option.

## 1.1.6

-   Fix: Binary expression should allow bytes/buffer types
-   Fix: [Assignment with conditional expression reports type error #73](https://github.com/jlchmura/lpc-language-server/issues/73)
-   Fix: [String literals should allow newlines in FluffOS #85](https://github.com/jlchmura/lpc-language-server/issues/85)
-   Fix: Mapping elements were not getting type checked
-   Fix: Error when call expression had incorrect arity but signature has a rest parameter.
-   Fix: Inline closure body was not being consistently checked
-   Fix: Inline closure arguments were not resolved
-   Various efun definition tweaks

## 1.1.5

-   Add support for Fluff array property access shortcut (#70)
-   Better detection of Inferred to Configured projects
-   Correctly resolve protected inherited member visibility [#67](https://github.com/jlchmura/lpc-language-server/issues/67)
-   Hide variables from property access autocomplete

## 1.1.4

-   inline closures used as default params now resolve their return type and correctly report type mismatches
-   spread elements are properly checked
-   type predicates no longer override a function's declared return type
-   some efuns doc tweaks

## 1.1.3

-   Initial prelease of v2

## 1.0.30

-   Because 1.0.29 was incomplete

## 1.0.29

-   Fix: [Signature hint does not recognize function type #53](https://github.com/jlchmura/lpc-language-server/issues/53)
-   Fix: [Exception when typing foreach without variable name #54](https://github.com/jlchmura/lpc-language-server/issues/54)

## 1.0.28

-   Fix: Strings with just an emoji character get garbled on semantic highlight
-   Fix: [#define statements are not syntax highlighted correctly #50](https://github.com/jlchmura/lpc-language-server/issues/50)
-   Fix: [Error requesting textdocument failed #47](https://github.com/jlchmura/lpc-language-server/issues/47)

## 1.0.27

-   Fix: Find all references broken by a change in v26.
-   Fix: [The visible function reports an error. #46](https://github.com/jlchmura/lpc-language-server/issues/46)

## 1.0.26

-   Fix: undefined token exception during diagnostics generation
-   Fix: signature not being displayed when hovering over a function declaration (part 3 of #42)
-   Fix: crash caused by flushing change timer after document has been disposed
-   Fix: FluffOS global include file was not included in some instances.
-   Removed "Process All Files" command (it is no longer needed)

## 1.0.25

-   Fix: [Performance Degradation and Diagnostic Errors in VSCode 1.0.23 #42](https://github.com/jlchmura/lpc-language-server/issues/42)
-   Allow comments in init_file

## 1.0.24

-   Fix: [[FLUFFOS] keys() efun is missing #38](https://github.com/jlchmura/lpc-language-server/issues/38)
-   Fix: [Cannot destructure property 'fileHandler' exception reported in #37](https://github.com/jlchmura/lpc-language-server/issues/37)

## 1.0.23

-   Fix: Function signature was incorrect in symbol hover.

## 1.0.22

-   Fix: [Find All References not detecting sefun->fn() calls #35](https://github.com/jlchmura/lpc-language-server/issues/35)
-   Fix: sefun file not being loaded for code completion or symbol info.

## 1.0.21

-   Fix: [FLUFFOS] Handle whitespace before text formatting shortcut end.
-   Fix: Properly reset lexer state on error.
-   [FLUFFOS] Added double bang `!!` operator to grammar ([#31](https://github.com/jlchmura/lpc-language-server/issues/31)).
-   `lpc-config.json` now uses JSONC so comments can be added to the file ([#32](https://github.com/jlchmura/lpc-language-server/issues/32))
-   Find References no longer requires a user-initiated file scan and is much more memory efficient.

## 1.0.20

-   Fix: [[FLUFFOS] Parser does not like the ref keyword in function definitions #29](https://github.com/jlchmura/lpc-language-server/issues/29)
-   Fix: [FLUFFOS] Allow underscores in float literals (e.g. `1_000_000.0`)
-   Fix: Precedence of unary operation parsing was incorrect
-   Fix: Variables refs not correctly identified when declaration is a method parameter

## 1.0.19

-   Fix: [[FLUFFOS] Find All References quirks #18](https://github.com/jlchmura/lpc-language-server/issues/18)
-   Major improvements to symbol lookup in Find References and Goto Definition

## 1.0.18

-   Better handling of disposed contexts
-   Memory cleanup
-   Fix: [[FLUFFOS] Parser error on catch blocks #25](https://github.com/jlchmura/lpc-language-server/issues/25)
-   Fix: Parser error on variable declarations without types
-   Fix: Preprocessor included two many tokens when end of define ended with a \

## 1.0.17

-   Improvements to code evaluation (strings, operators, brackets, arrays)
-   Executes FluffOS `get_include_path` apply when evaluating files.
-   Fix: [Found reference range is too large #20](https://github.com/jlchmura/lpc-language-server/issues/20)
-   Fix: [[FLUFFOS] Class instantiation #19](https://github.com/jlchmura/lpc-language-server/issues/19)
-   Fix: [Reference incorrectly mapped to efun #23](https://github.com/jlchmura/lpc-language-server/issues/23)

## 1.0.16

-   Added `unknown` type to FluffOS parser
-   Removed `new` and `load_object` from parser. These are now handled as efuns.
-   Efuns are now read out of .h files packaged with the extension.
-   Added FluffOS efuns
-   Converted LD efuns to .h file format.
-   Various parser tweaks for missing types (lwobject, unknown, etc)

## 1.0.15

-   Fix: [[FLUFFOS] Default parameters causing errors #9](https://github.com/jlchmura/lpc-language-server/issues/9)
-   Fix: [[FLUFFOS] #undef inside a function #13](https://github.com/jlchmura/lpc-language-server/issues/13)
-   Fix: [[FLUFFOS] Syntactic sugar for evaluate() reporting diagnostic that can't be configured #10](https://github.com/jlchmura/lpc-language-server/issues/10)

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
